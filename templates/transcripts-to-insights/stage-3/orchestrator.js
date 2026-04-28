// Stage 3 — Agentic System
// An orchestrator that examines input and dynamically picks which tools to use.
// The planner (an LLM call) decides; the orchestrator dispatches; tools are
// the chat assistant (Stage 1) and the workflow pipeline (Stage 2) plus
// specialist sub-agents for deeper extraction.
//
// Usage:  node stage-3/orchestrator.js transcripts/sample-transcript.txt

import Anthropic from "@anthropic-ai/sdk";
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";
import { ask } from "../stage-1/chat.js";          // ← Stage 1 building block
import { runWorkflow } from "../stage-2/workflow.js"; // ← Stage 2 building block

const ROOT = path.join(import.meta.dirname, "..");
const client = new Anthropic();

const promptSummarizer = fs.readFileSync(path.join(ROOT, "prompts", "summarizer.md"), "utf-8");
const promptExtractor  = fs.readFileSync(path.join(ROOT, "prompts", "action_extractor.md"), "utf-8");
const promptRouter     = fs.readFileSync(path.join(ROOT, "prompts", "router.md"), "utf-8");

// ─── Helper: strip markdown fences from JSON responses ────────────────────
function parseJson(text) {
  const cleaned = text.trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/, "")
    .trim();
  return JSON.parse(cleaned);
}

// ─── Specialist sub-agents ────────────────────────────────────────────────
async function summarize(transcript) {
  console.log("  📋 Summarizer: reading transcript...");
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 512,
    system: promptSummarizer,
    messages: [{ role: "user", content: transcript }],
  });
  const result = parseJson(response.content[0].text);
  console.log(`  ✓ Summarizer returned ${result.themes.length} themes`);
  return result;
}

async function extractActions(transcript) {
  console.log("  ✅ Extractor: scanning for action items...");
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 768,
    system: promptExtractor,
    messages: [{ role: "user", content: transcript }],
  });
  const result = parseJson(response.content[0].text);
  console.log(`  ✓ Extractor returned ${result.actions.length} actions`);
  return result;
}

// ─── Planner: decide which tools to invoke ────────────────────────────────
// Returns an object like: { tools: ["summarize", "extract"] }
async function planner(transcript) {
  console.log("🗺️  Planner: deciding which tools to invoke...");
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 256,
    system: promptRouter,
    messages: [{ role: "user", content: transcript.slice(0, 800) }],
  });
  const plan = parseJson(response.content[0].text);
  console.log(`  ✓ Plan: ${plan.tools.join(", ")}`);
  return plan;
}

// ─── Synthesis: combine specialist outputs into the final report ──────────
async function synthesize(results) {
  console.log("  🧠 Synthesizing final report...");
  const systemPrompt = fs.readFileSync(path.join(ROOT, "prompts", "system.md"), "utf-8");
  const userMessage = `Here's the structured input from my specialists.\n\n${JSON.stringify(results, null, 2)}\n\nCompose the final insights report following the format in your system prompt.`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });
  return response.content[0].text;
}

// ─── Orchestrator: the main entry point ───────────────────────────────────
export async function orchestrator(transcript) {
  // Step 1: planner decides which tools to use
  const plan = await planner(transcript);

  // Step 2: dispatch based on plan
  const results = {};

  if (plan.tools.includes("chat")) {
    console.log("  💬 Chat: running quick summary...");
    results.chat = await ask("Give me a one-paragraph executive summary of this meeting.", transcript);
  }

  if (plan.tools.includes("workflow")) {
    console.log("  ⚙️  Workflow: running full pipeline...");
    const outPath = await runWorkflow(transcript, "orchestrated.txt");
    results.workflow = `Saved to ${outPath}`;
  }

  if (plan.tools.includes("summarize")) {
    results.themes = (await summarize(transcript)).themes;
  }

  if (plan.tools.includes("extract")) {
    results.actions = (await extractActions(transcript)).actions;
  }

  // Step 3: synthesize all results
  const finalReport = await synthesize(results);
  console.log("✓ Orchestration complete.\n");
  return finalReport;
}

// ─── CLI entry point (only runs when invoked directly) ────────────────────
if (import.meta.url === `file://${process.argv[1]}`) {
  const transcriptPath = process.argv[2];
  if (!transcriptPath) {
    console.error("Usage: node stage-3/orchestrator.js <path-to-transcript.txt>");
    process.exit(1);
  }

  const transcript = fs.readFileSync(transcriptPath, "utf-8");
  console.log(`📄 Input: ${transcriptPath} (${transcript.split(/\s+/).length} words)\n`);

  const report = await orchestrator(transcript);

  console.log("─".repeat(60));
  console.log(report);
  console.log("─".repeat(60));
}

// Stage 3 — Agentic System
// An orchestrator that dispatches to two sub-agents (summarizer + extractor)
// and synthesizes their JSON results into a final report.
//
// Usage:  node stage-3/orchestrator.js transcripts/sample-transcript.txt

import Anthropic from "@anthropic-ai/sdk";
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";

const ROOT = path.join(import.meta.dirname, "..");
const client = new Anthropic();

// Load the three system prompts up front.
const promptOrchestrator = fs.readFileSync(path.join(ROOT, "prompts", "system.md"), "utf-8");
const promptSummarizer = fs.readFileSync(path.join(ROOT, "prompts", "summarizer.md"), "utf-8");
const promptExtractor = fs.readFileSync(path.join(ROOT, "prompts", "action_extractor.md"), "utf-8");

// ─── Helper: safely parse JSON from a model response ───────────────────────
// Sometimes models wrap JSON in ```json fences. This strips that.
function parseJson(text) {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/, "")
    .trim();
  return JSON.parse(cleaned);
}

// ─── Sub-agent #1: The Summarizer ──────────────────────────────────────────
// Reads a transcript, returns { themes: [{label, summary}, ...] }
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

// ─── Sub-agent #2: The Extractor ───────────────────────────────────────────
// Reads a transcript, returns { actions: [{owner, task, deadline}, ...] }
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

// ─── Synthesis: combine both sub-agent outputs into the final report ──────
async function synthesize({ themes, actions }) {
  console.log("  🧠 Synthesizing final report...");
  const userMessage = `Here's the structured input from my specialists.

THEMES:
${JSON.stringify(themes, null, 2)}

ACTIONS:
${JSON.stringify(actions, null, 2)}

Compose the final insights report following the format in your system prompt.`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: promptOrchestrator,
    messages: [{ role: "user", content: userMessage }],
  });
  return response.content[0].text;
}

// ─── The Orchestrator ──────────────────────────────────────────────────────
// Dispatches both sub-agents in parallel, then synthesizes their outputs.
export async function orchestrator(transcript) {
  console.log("🎼 Orchestrator: dispatching specialists in parallel...");

  // Both sub-agents run concurrently — they don't need each other's output.
  const [themesResult, actionsResult] = await Promise.all([
    summarize(transcript),
    extractActions(transcript),
  ]);

  // Now combine.
  const finalReport = await synthesize({
    themes: themesResult.themes,
    actions: actionsResult.actions,
  });

  console.log("✓ Orchestration complete.\n");
  return finalReport;
}

// ─── CLI entry point ───────────────────────────────────────────────────────
const transcriptPath = process.argv[2];
if (!transcriptPath) {
  console.error("Usage: node orchestrator.js <path-to-transcript.txt>");
  process.exit(1);
}

const transcript = fs.readFileSync(transcriptPath, "utf-8");
console.log(`📄 Input: ${transcriptPath} (${transcript.split(/\s+/).length} words)\n`);

const report = await orchestrator(transcript);

console.log("─".repeat(60));
console.log(report);
console.log("─".repeat(60));

// Stage 3 — Agentic System
// An orchestrator that dispatches specialists in parallel, then synthesizes results.
//
// The key insight: analyst, extractor, and synthesizer are ALL the same pattern
// as the chat assistant you built in Stage 1 — just with different system prompts.
// Same ask() function, different specialist = different result.
//
// Architecture:
//   [Analyst ‖ Extractor]   ← parallel (Promise.all) — both run simultaneously
//            ↓
//      [Synthesizer]         ← combines themes + actions into the final report
//            ↓
//        [Router]            ← Stage 2's runWorkflow() — classify, save, notify
//            ↓
//       [Reflect]            ← Conductor evaluates the run, produces recommendations
//
// Usage:  npm run stage-3 -- transcripts/sample-transcript.txt

import Anthropic from "@anthropic-ai/sdk";
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";
import { runWorkflow } from "../stage-2/workflow.js"; // ← Stage 2 building block

const ROOT = path.join(import.meta.dirname, "..");
const client = new Anthropic();

// Load specialist prompts — each one defines a different specialist
const promptAnalyst    = fs.readFileSync(path.join(ROOT, "prompts", "analyst.md"),    "utf-8");
const promptExtractor  = fs.readFileSync(path.join(ROOT, "prompts", "extractor.md"),  "utf-8");
const promptSynthesizer = fs.readFileSync(path.join(ROOT, "prompts", "synthesizer.md"), "utf-8");
const promptReflect    = fs.readFileSync(path.join(ROOT, "prompts", "reflect.md"),    "utf-8");
const promptConductor  = fs.readFileSync(path.join(ROOT, "prompts", "conductor.md"),  "utf-8");

// ─── Specialist: Analyst ──────────────────────────────────────────────────────
// Identifies key themes and decisions — same API call as Stage 1, different prompt
export async function analyst(transcript) {
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: promptAnalyst,
    messages: [{ role: "user", content: transcript }],
  });
  return response.content[0].text;
}

// ─── Specialist: Extractor ────────────────────────────────────────────────────
// Pulls every action item — same API call as Stage 1, different prompt
export async function extractor(transcript) {
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: promptExtractor,
    messages: [{ role: "user", content: transcript }],
  });
  return response.content[0].text;
}

// ─── Specialist: Synthesizer ──────────────────────────────────────────────────
// Combines analyst + extractor outputs into the final structured report
export async function synthesizer(themes, actions) {
  const userMessage = [
    `ANALYST OUTPUT:\n${themes}`,
    `EXTRACTOR OUTPUT:\n${actions}`,
    "Combine these into the final structured insights report.",
  ].join("\n\n");

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: promptSynthesizer,
    messages: [{ role: "user", content: userMessage }],
  });
  return response.content[0].text;
}

// ─── Specialist: Reflect ──────────────────────────────────────────────────────
// Conductor evaluates the run — what happened, what went well, recommendations
export async function reflect(transcript, themes, actions, report, classification) {
  const userMessage = [
    `ORIGINAL TRANSCRIPT:\n${transcript}`,
    `ANALYST OUTPUT (themes):\n${themes}`,
    `EXTRACTOR OUTPUT (actions):\n${actions}`,
    `SYNTHESIZER OUTPUT (final report):\n${report}`,
    `ROUTER RESULT: classified as "${classification}"`,
    "Produce the run report.",
  ].join("\n\n");

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: promptReflect,
    messages: [{ role: "user", content: userMessage }],
  });
  return response.content[0].text;
}

// ─── Specialist: Conductor ────────────────────────────────────────────────────
// Planning step — decides which tools to call based on optional instruction
export async function conductor(transcript, instruction) {
  const userMessage = [
    `TRANSCRIPT:\n${transcript}`,
    `INSTRUCTION: ${instruction || "Process this transcript — run the full pipeline."}`,
    "Decide which tools to call.",
  ].join("\n\n");

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 512,
    system: promptConductor,
    messages: [{ role: "user", content: userMessage }],
  });

  try {
    return JSON.parse(response.content[0].text);
  } catch {
    // Fallback to full pipeline if JSON parse fails
    return { tools: ["analyst", "extractor", "synthesizer", "router", "reflect"], reasoning: "Defaulting to full pipeline." };
  }
}

// ─── Orchestrator: coordinates the full sequence ──────────────────────────────
export async function orchestrator(transcript, sourceFilename = "transcript.txt", instruction = null) {
  let plan = null;

  // If instruction given, ask Conductor to plan which tools to call
  if (instruction && instruction.trim()) {
    console.log("  🧭 Conductor planning — deciding which tools to call...");
    plan = await conductor(transcript, instruction);
    console.log(`  ✓ Plan: [${plan.tools.join(", ")}] — ${plan.reasoning}`);
  }

  const tools = plan ? plan.tools : ["analyst", "extractor", "synthesizer", "router", "reflect"];

  let themes = null, actions = null, report = null, classification = null, outputPath = null, runReport = null;

  // Step 1: Analyst + Extractor (parallel if both needed)
  const needsAnalyst = tools.includes("analyst");
  const needsExtractor = tools.includes("extractor");

  if (needsAnalyst && needsExtractor) {
    console.log("  🔀 Step 1: Analyst + Extractor running in parallel...");
    [themes, actions] = await Promise.all([analyst(transcript), extractor(transcript)]);
    console.log("  ✓ Analyst complete. Extractor complete.");
  } else if (needsAnalyst) {
    console.log("  🔍 Running Analyst...");
    themes = await analyst(transcript);
    console.log("  ✓ Analyst complete.");
  } else if (needsExtractor) {
    console.log("  📋 Running Extractor...");
    actions = await extractor(transcript);
    console.log("  ✓ Extractor complete.");
  }

  // Step 2: Synthesizer (requires themes + actions)
  if (tools.includes("synthesizer") && themes && actions) {
    console.log("  🧠 Synthesizer combining results...");
    report = await synthesizer(themes, actions);
    console.log("  ✓ Report synthesized.");
  }

  // Step 3: Router
  if (tools.includes("router")) {
    const routerInput = report || themes || actions || transcript;
    console.log("  ⚙️  Router — classifying, saving, notifying...");
    ({ classification, outputPath } = await runWorkflow(transcript, sourceFilename, report));
    console.log("  ✓ Routed and saved.");
  }

  // Step 4: Reflect
  if (tools.includes("reflect") && report) {
    console.log("  🪞 Conductor reflecting on the run...");
    runReport = await reflect(transcript, themes, actions, report, classification);
    console.log("  ✓ Run report complete.");
  }

  console.log("✓ Orchestration complete.\n");
  return { report, themes, actions, classification, outputPath, runReport, plan };
}

// ─── CLI entry point ───────────────────────────────────────────────────────────
if (import.meta.url === `file://${process.argv[1]}`) {
  const transcriptPath = process.argv[2] || "transcripts/sample-transcript.txt";
  const transcript = fs.readFileSync(transcriptPath, "utf-8");
  const filename = path.basename(transcriptPath);

  console.log(`📄 Input: ${transcriptPath} (${transcript.split(/\s+/).length} words)\n`);
  console.log("🤖 Orchestrator starting — Analyst + Extractor in parallel, then Synthesizer, then Router.\n");

  const { report, runReport } = await orchestrator(transcript, filename);

  console.log("─".repeat(60));
  console.log(report);
  console.log("─".repeat(60));

  console.log("\n" + "─".repeat(60));
  console.log("RUN REPORT");
  console.log("─".repeat(60));
  console.log(runReport);
  console.log("─".repeat(60));
}

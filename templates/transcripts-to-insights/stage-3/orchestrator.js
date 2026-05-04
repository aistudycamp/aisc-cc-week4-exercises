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

// ─── Orchestrator: coordinates the full sequence ──────────────────────────────
export async function orchestrator(transcript, sourceFilename = "transcript.txt") {
  // Step 1: Analyst + Extractor run in parallel — first time anything runs simultaneously
  console.log("  🔀 Step 1: Analyst + Extractor running in parallel...");
  const [themes, actions] = await Promise.all([
    analyst(transcript),
    extractor(transcript),
  ]);
  console.log("  ✓ Analyst complete. Extractor complete.");

  // Step 2: Synthesizer combines results into the final report
  console.log("  🧠 Step 2: Synthesizer combining results...");
  const report = await synthesizer(themes, actions);
  console.log("  ✓ Report synthesized.");

  // Step 3: Router — classify from transcript, save both files, notify
  console.log("  ⚙️  Step 3: Router — classifying, saving, notifying...");
  const { classification, outputPath } = await runWorkflow(transcript, sourceFilename, report);
  console.log("  ✓ Routed and saved.");

  console.log("✓ Orchestration complete.\n");
  return { report, classification, outputPath };
}

// ─── CLI entry point ───────────────────────────────────────────────────────────
if (import.meta.url === `file://${process.argv[1]}`) {
  const transcriptPath = process.argv[2] || "transcripts/sample-transcript.txt";
  const transcript = fs.readFileSync(transcriptPath, "utf-8");
  const filename = path.basename(transcriptPath);

  console.log(`📄 Input: ${transcriptPath} (${transcript.split(/\s+/).length} words)\n`);
  console.log("🤖 Orchestrator starting — Analyst + Extractor in parallel, then Synthesizer, then Router.\n");

  const { report } = await orchestrator(transcript, filename);

  console.log("─".repeat(60));
  console.log(report);
  console.log("─".repeat(60));
}

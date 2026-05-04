// Stage 3 — Agentic System
// An orchestrator that coordinates multiple specialists in sequence.
// Each specialist does one job, hands its result back, and the next one starts.
// At the end, a synthesizer combines everything into the final report.
//
// The orchestrator uses the things you built in Stage 1 and Stage 2:
//   ask()          ← Stage 1 building block (chat assistant)
//   runWorkflow()  ← Stage 2 building block (classify, route, notify)
//
// Usage:  npm run stage-3 -- transcripts/sample-transcript.txt

import Anthropic from "@anthropic-ai/sdk";
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";
import { ask } from "../stage-1/chat.js";           // ← Stage 1 building block
import { runWorkflow } from "../stage-2/workflow.js"; // ← Stage 2 building block

const ROOT = path.join(import.meta.dirname, "..");
const client = new Anthropic();

const systemPrompt = fs.readFileSync(
  path.join(ROOT, "prompts", "system.md"),
  "utf-8"
);

// ─── Synthesizer: combine all specialist results into a final report ───────
async function synthesize(results) {
  console.log("  🧠 Synthesizing final report...");
  const userMessage = [
    "Here are the results from each specialist:\n",
    `EXECUTIVE SUMMARY:\n${results.summary}\n`,
    `ACTION ITEMS:\n${results.actions}\n`,
    `CLASSIFICATION: ${results.classification}\n`,
    "Combine these into the final insights report following your system prompt format.",
  ].join("\n");

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });
  return response.content[0].text;
}

// ─── Orchestrator: coordinates the full sequence ───────────────────────────
export async function orchestrator(transcript, sourceFilename = "transcript.txt") {
  const results = {};

  // Step 1: ask() — get an executive summary  [Stage 1 building block]
  console.log("  💬 Step 1: Chat assistant — getting executive summary...");
  results.summary = await ask(
    "Give me a one-paragraph executive summary of this meeting.",
    transcript
  );
  console.log("  ✓ Summary complete.");

  // Step 2: ask() — extract action items  [Stage 1 building block]
  console.log("  💬 Step 2: Chat assistant — extracting action items...");
  results.actions = await ask(
    "List every action item from this meeting. For each one: who owns it, what they need to do, and the deadline if mentioned.",
    transcript
  );
  console.log("  ✓ Action items extracted.");

  // Step 3: runWorkflow() — classify, route, notify  [Stage 2 building block]
  console.log("  ⚙️  Step 3: Workflow — classifying and routing transcript...");
  const { classification } = await runWorkflow(transcript, sourceFilename);
  results.classification = classification;
  console.log("  ✓ Workflow complete.");

  // Step 4: synthesize everything into the final report
  const finalReport = await synthesize(results);
  console.log("✓ Orchestration complete.\n");
  return finalReport;
}

// ─── CLI entry point ───────────────────────────────────────────────────────
if (import.meta.url === `file://${process.argv[1]}`) {
  const transcriptPath = process.argv[2] || "transcripts/sample-transcript.txt";
  const transcript = fs.readFileSync(transcriptPath, "utf-8");
  const filename = path.basename(transcriptPath);

  console.log(`📄 Input: ${transcriptPath} (${transcript.split(/\s+/).length} words)\n`);
  console.log("🤖 Orchestrator starting — 3 specialists, then synthesis.\n");

  const report = await orchestrator(transcript, filename);

  console.log("─".repeat(60));
  console.log(report);
  console.log("─".repeat(60));
}

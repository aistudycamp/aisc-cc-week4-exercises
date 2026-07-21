// Stage 2 — Workflow
// An automated pipeline. The AI is one step in the pipeline; it classifies
// the meeting and decides where the file goes. The workflow handles the
// rest automatically.
//
// In the sprint, this is triggered from the browser: Module 4's Stage 2 tab,
// "Run Workflow →" button, calls POST /api/workflow in server.js, which
// calls runWorkflow() below directly.
//
// Optional: this file can also run as a standalone file-watcher from the
// terminal instead:
//   npm run stage-2
//   Then in a second terminal:  npm run drop-test
//   Watch the file get classified, routed, and a notification fire.
//
// Import as a building block:
//   import { runWorkflow } from '../stage-2/workflow.js';

import Anthropic from "@anthropic-ai/sdk";
import chokidar from "chokidar";
import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";
import "dotenv/config";
import { withRetry } from "../utils/retry.js";
import { extractJsonObject } from "../utils/json.js";

const client = new Anthropic();
const ROOT = path.join(import.meta.dirname, "..");
const INCOMING_DIR = path.join(ROOT, "transcripts", "incoming");
const promptClassifier = fs.readFileSync(
  path.join(ROOT, "prompts", "classifier.md"),
  "utf-8"
);

// ─── Helper: classify a transcript ────────────────────────────────────────
async function classify(transcript) {
  const response = await withRetry(() => client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 256,
    system: promptClassifier,
    messages: [{ role: "user", content: transcript.slice(0, 1200) }],
  }));
  return extractJsonObject(response.content[0].text);
}

// ─── Helper: macOS notification ───────────────────────────────────────────
function notify(title, message) {
  exec(
    `osascript -e 'display notification "${message}" with title "${title}"'`
  );
}

// ─── Building block: run the full pipeline for one transcript ─────────────
// Step 1: AI classifies the meeting type
// Step 2: Route the file to the right folder (team-standup, client-call, planning-session, or other)
// Step 3: Send a notification
// Returns: { classification, outputPath }
//
// Stage 3 passes an optional `report` — if provided, the synthesized report is
// saved alongside the transcript in the same typed folder.
export async function runWorkflow(transcript, sourceFilename = "transcript.txt", report = null) {
  // Step 1 — classify
  console.log("  🔍 Classifying meeting type...");
  const result = await classify(transcript);
  console.log(`  ✓ Classified as: ${result.type}`);

  // Step 2 — route to the right folder
  const destDir = path.join(ROOT, "transcripts", result.type);
  fs.mkdirSync(destDir, { recursive: true });
  const outputPath = path.join(destDir, result.suggested_filename);
  fs.writeFileSync(outputPath, transcript, "utf-8");
  console.log(`  ✓ Routed → transcripts/${result.type}/${result.suggested_filename}`);

  // Save synthesized report alongside transcript (Stage 3 only)
  if (report) {
    const reportFilename = result.suggested_filename.replace(/\.(txt|md)$/, "") + "-report.md";
    const reportPath = path.join(destDir, reportFilename);
    fs.writeFileSync(reportPath, report, "utf-8");
    console.log(`  ✓ Report  → transcripts/${result.type}/${reportFilename}`);
  }

  // Step 3 — notify
  notify("Agent Sprint Workflow", `Routed to: ${result.type}`);

  return { classification: result.type, outputPath };
}

// ─── Folder watcher (only runs when invoked directly) ─────────────────────
if (import.meta.url === `file://${process.argv[1]}`) {
  fs.mkdirSync(INCOMING_DIR, { recursive: true });

  console.log("⚙️  Workflow — Transcript Pipeline");
  console.log(`👀 Watching transcripts/incoming/ for new files...`);
  console.log("    Run 'npm run drop-test' in another terminal to trigger it.\n");

  const watcher = chokidar.watch(INCOMING_DIR, {
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: { stabilityThreshold: 300, pollInterval: 100 },
  });

  watcher.on("add", async (filepath) => {
    const ext = path.extname(filepath).toLowerCase();
    if (ext !== ".txt" && ext !== ".md") return;

    const filename = path.basename(filepath);
    console.log(`📄 New file: ${filename}`);
    console.log("⚡️ Running pipeline...\n");

    try {
      const transcript = fs.readFileSync(filepath, "utf-8");
      const { classification, outputPath } = await runWorkflow(transcript, filename);
      console.log(`\n✓ Pipeline complete.`);
      console.log(`  Type:    ${classification}`);
      console.log(`  Saved:   ${path.relative(ROOT, outputPath)}\n`);
    } catch (err) {
      console.error(`✗ Pipeline failed:`, err.message);
    }
  });

  watcher.on("error", (err) => console.error("Watcher error:", err));
}

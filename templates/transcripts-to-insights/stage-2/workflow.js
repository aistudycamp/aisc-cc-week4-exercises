// Stage 2 — Workflow
// A fixed multi-step pipeline triggered by a file-drop event.
// The LLM is one step in the pipeline — not the whole thing.
//
// Also exports runWorkflow() so Stage 3 can use it as a building block.
//
// Run it:  node stage-2/workflow.js
//   Then drop any .txt file into transcripts/ — the pipeline fires automatically.
//
// Import it as a building block:
//   import { runWorkflow } from '../stage-2/workflow.js';

import chokidar from "chokidar";
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";
import { ask } from "../stage-1/chat.js"; // ← Stage 1 is one step in this pipeline

const ROOT = path.join(import.meta.dirname, "..");
const TRANSCRIPTS_DIR = path.join(ROOT, "transcripts");
const OUTPUTS_DIR = path.join(ROOT, "outputs");

// ─── Building block: the full pipeline for one transcript ─────────────────
// Step 1: (caller reads the file and passes it in)
// Step 2: Call the chat assistant with a fixed prompt
// Step 3: Format as markdown
// Step 4: Save to outputs/
// Step 5: Return the saved path (notify)
export async function runWorkflow(transcript, sourceFilename = "transcript.txt") {
  // Step 2 — call the Stage 1 chat assistant
  const reportText = await ask(
    "Generate the standard insights report for this transcript.",
    transcript
  );

  // Step 3 — format as markdown
  const ts = new Date().toISOString().slice(0, 16).replace("T", "-").replace(":", "");
  const stem = path.basename(sourceFilename, ".txt");
  const body = `# Insights Report\n\nSource: \`${sourceFilename}\`\nGenerated: ${new Date().toISOString()}\n\n---\n\n${reportText}\n`;

  // Step 4 — save to outputs/
  fs.mkdirSync(OUTPUTS_DIR, { recursive: true });
  const outPath = path.join(OUTPUTS_DIR, `${ts}-${stem}.md`);
  fs.writeFileSync(outPath, body, "utf-8");

  // Step 5 — return saved path
  return outPath;
}

// ─── Folder watcher (only runs when invoked directly) ─────────────────────
// Stage 3 imports runWorkflow() above — it never reaches this code.
if (import.meta.url === `file://${process.argv[1]}`) {
  fs.mkdirSync(OUTPUTS_DIR, { recursive: true });

  console.log("⚙️  Workflow — Transcript Pipeline");
  console.log(`👀 Watching ${TRANSCRIPTS_DIR} for new .txt files...`);
  console.log("    Drop a transcript into that folder to run the pipeline.\n");

  const watcher = chokidar.watch(`${TRANSCRIPTS_DIR}/*.txt`, {
    persistent: true,
    ignoreInitial: true,
  });

  watcher.on("add", async (filepath) => {
    const filename = path.basename(filepath);
    console.log(`📄 New file detected: ${filename}`);

    try {
      // Step 1 — read
      const transcript = fs.readFileSync(filepath, "utf-8");
      console.log("⚡️ Running pipeline...");

      const outPath = await runWorkflow(transcript, filename);
      console.log(`✓ Workflow complete → ${path.relative(ROOT, outPath)}\n`);
    } catch (err) {
      console.error(`✗ Pipeline failed on ${filename}:`, err.message);
    }
  });

  watcher.on("error", (err) => console.error("Watcher error:", err));
}

// Stage 2 — Workflow / Folder Watcher
// Watches the transcripts/ folder. Whenever a new .txt file lands,
// runs the chat assistant on it and saves the report to outputs/.
//
// Usage:  node stage-2/watcher.js
// Then: drop any .txt file into transcripts/ — the agent runs automatically.

import Anthropic from "@anthropic-ai/sdk";
import chokidar from "chokidar";
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";

const ROOT = path.join(import.meta.dirname, "..");
const TRANSCRIPTS_DIR = path.join(ROOT, "transcripts");
const OUTPUTS_DIR = path.join(ROOT, "outputs");

// Make sure outputs/ exists.
fs.mkdirSync(OUTPUTS_DIR, { recursive: true });

// Set up the API client and load the system prompt once.
const client = new Anthropic();
const systemPrompt = fs.readFileSync(
  path.join(ROOT, "prompts", "system.md"),
  "utf-8"
);

// 1. The agent — same logic as chat.js, just wrapped in a function.
async function runAgent(transcript) {
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: `Here's the meeting transcript. Give me the insights report.\n\n${transcript}`,
      },
    ],
  });
  return response.content[0].text;
}

// 2. Save the report to a timestamped markdown file.
function saveReport(report, sourceFilename) {
  const ts = new Date().toISOString().slice(0, 16).replace("T", "-").replace(":", "");
  const outPath = path.join(OUTPUTS_DIR, `${ts}-${path.basename(sourceFilename, ".txt")}.md`);
  const body = `# Insights Report\n\nSource: \`${sourceFilename}\`\nGenerated: ${new Date().toISOString()}\n\n---\n\n${report}\n`;
  fs.writeFileSync(outPath, body, "utf-8");
  return outPath;
}

// 3. The trigger — chokidar watches the folder and fires on new files.
console.log(`👀 Watching ${TRANSCRIPTS_DIR} for new .txt files...`);
console.log("    Drop a transcript into that folder to run the agent.\n");

const watcher = chokidar.watch(`${TRANSCRIPTS_DIR}/*.txt`, {
  persistent: true,
  ignoreInitial: true,
});

watcher.on("add", async (filepath) => {
  const filename = path.basename(filepath);
  console.log(`📄 New file detected: ${filename}`);

  try {
    const transcript = fs.readFileSync(filepath, "utf-8");
    console.log("⚡️ Running agent...");
    const report = await runAgent(transcript);
    const outPath = saveReport(report, filename);
    console.log(`✓ Saved → ${path.relative(ROOT, outPath)}\n`);
  } catch (err) {
    console.error(`✗ Failed on ${filename}:`, err.message);
  }
});

watcher.on("error", (err) => console.error("Watcher error:", err));

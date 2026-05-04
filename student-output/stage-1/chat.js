// Stage 1 — Chat Assistant
// An interactive multi-turn chat loop with an AI meeting analyst.
// Also exports ask() so Stage 2 and Stage 3 can use it as a building block.
//
// Run interactively (no transcript):
//   npm run stage-1
//   Paste a transcript as your first message, then ask follow-up questions.
//
// Run with a transcript file pre-loaded:
//   npm run stage-1 -- transcripts/sample-transcript.txt
//   The transcript loads automatically — just start asking questions.
//
// Import as a building block:
//   import { ask } from '../stage-1/chat.js';

import Anthropic from "@anthropic-ai/sdk";
import readline from "node:readline";
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";

const client = new Anthropic();

const systemPrompt = fs.readFileSync(
  path.join(import.meta.dirname, "..", "prompts", "system.md"),
  "utf-8"
);

// ─── Building block: one-shot ask ─────────────────────────────────────────
// Sends a single question to Claude with optional context.
// Stage 2 and Stage 3 import this — it's the shared foundation.
export async function ask(question, context) {
  const content = context ? `${question}\n\n${context}` : question;
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content }],
  });
  return response.content[0].text;
}

// ─── Interactive loop (only runs when invoked directly) ───────────────────
if (import.meta.url === `file://${process.argv[1]}`) {
  const transcriptPath = process.argv[2];
  let preloadedTranscript = null;

  if (transcriptPath) {
    preloadedTranscript = fs.readFileSync(transcriptPath, "utf-8");
    console.log("💬 Chat Assistant — Meeting Analyst");
    console.log(`   Transcript loaded from: ${transcriptPath}`);
    console.log("   Ask your first question.\n");
  } else {
    console.log("💬 Chat Assistant — Meeting Analyst");
    console.log("   Paste a transcript as your first message,");
    console.log("   then ask follow-up questions.");
    console.log('   Type "exit" to quit.\n');
  }

  // If a transcript was pre-loaded, seed the conversation with it
  const messages = preloadedTranscript
    ? [
        { role: "user", content: preloadedTranscript },
        { role: "assistant", content: "Transcript received. What would you like to know about this meeting?" },
      ]
    : [];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  const prompt = () =>
    rl.question("> ", async (raw) => {
      const line = raw.trim();
      if (!line) return prompt();
      if (line === "exit") { rl.close(); return; }

      messages.push({ role: "user", content: line });

      const response = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: systemPrompt,
        messages,
      });

      const reply = response.content[0].text;
      messages.push({ role: "assistant", content: reply });
      console.log(`\nAssistant: ${reply}\n`);
      prompt();
    });

  prompt();
}

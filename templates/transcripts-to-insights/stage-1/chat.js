// Stage 1 — Chat Assistant
// An interactive multi-turn chat loop with an AI meeting analyst.
// Also exports ask() so Stage 2 and Stage 3 can use it as a building block.
//
// Run it interactively:  node stage-1/chat.js
//   Paste a transcript as your first message, then ask follow-ups.
//   Type "exit" to quit.
//
// Import it as a building block:
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
// Sends a single question to Claude, optionally with extra context.
// Stages 2 and 3 import this function — it's the shared foundation.
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
// The loop maintains a running messages[] array for multi-turn conversation.
// Stage 2 and Stage 3 import ask() above — they never reach this code.
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("💬 Chat Assistant — Meeting Analyst");
  console.log("   Paste a transcript as your first message,");
  console.log("   then ask follow-up questions.");
  console.log('   Type "exit" to quit.\n');

  const messages = [];

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

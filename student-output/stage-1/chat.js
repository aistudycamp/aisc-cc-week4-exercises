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
  return { text: response.content[0].text, usage: response.usage };
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
    console.log("   Paste your transcript as the first message, then ask questions.\n");
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

  let buffer = [];

  const showPrompt = () => {
    process.stdout.write("> (Enter twice to send, or type 'exit' to quit) ");
    buffer = [];
  };

  // F-27: format token usage line
  const formatUsage = (usage) => {
    const inputCost = (usage.input_tokens / 1_000_000) * 3;
    const outputCost = (usage.output_tokens / 1_000_000) * 15;
    const totalCost = inputCost + outputCost;
    const totalTokens = usage.input_tokens + usage.output_tokens;
    return `   [~${totalTokens} tokens · ~$${totalCost.toFixed(4)}]`;
  };

  const submit = async () => {
    const text = buffer.join("\n").trim();
    buffer = [];
    if (!text) { showPrompt(); return; }

    messages.push({ role: "user", content: text });

    // F-25: thinking indicator
    process.stdout.write("⏳ Thinking...");

    let retryShown = false;
    let response;

    while (true) {
      try {
        response = await client.messages.create({
          model: "claude-sonnet-4-6",
          max_tokens: 1024,
          system: systemPrompt,
          messages,
        });
        break; // success — exit retry loop
      } catch (err) {
        // Clear the thinking indicator line
        process.stdout.write("\r" + " ".repeat(20) + "\r");

        if (err.status === 429) {
          if (!retryShown) {
            console.log("⚠️  API is busy — retrying in 5 seconds…");
            retryShown = true;
          }
          await new Promise((resolve) => setTimeout(resolve, 5000));
          process.stdout.write("⏳ Thinking...");
          continue; // retry silently
        } else if (err.status === 401) {
          messages.pop();
          console.log("\n⚠️  API key issue — check that your .env has a valid ANTHROPIC_API_KEY.\n");
          showPrompt();
          return;
        } else {
          messages.pop();
          console.log(`\n⚠️  Something went wrong (${err.status ?? err.message}) — try again.\n`);
          showPrompt();
          return;
        }
      }
    }

    // Clear the thinking indicator line
    process.stdout.write("\r" + " ".repeat(20) + "\r");

    const reply = response.content[0].text;
    messages.push({ role: "assistant", content: reply });
    console.log(`\nAssistant: ${reply}`);
    // F-27: token usage
    if (response.usage) {
      console.log(formatUsage(response.usage));
    }
    console.log();
    showPrompt();
  };

  rl.on("line", (raw) => {
    if (raw.trim() === "exit") { rl.close(); return; }
    if (raw === "") {
      submit();
    } else {
      buffer.push(raw);
    }
  });

  showPrompt();
}

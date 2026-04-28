// Stage 1 — Chat Assistant
// Reads a transcript file, sends it to Claude with a system prompt,
// and prints the response.
//
// Usage:  node stage-1/chat.js transcripts/sample-transcript.txt

import Anthropic from "@anthropic-ai/sdk";
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";

// 1. Set up the Anthropic client.
//    It reads ANTHROPIC_API_KEY from your .env file automatically.
const client = new Anthropic();

// 2. Read the system prompt from a file.
//    Putting prompts in files (not hardcoded strings) means you can
//    edit the prompt without touching the code.
const systemPrompt = fs.readFileSync(
  path.join(import.meta.dirname, "..", "prompts", "system.md"),
  "utf-8"
);

// 3. Read the transcript file passed in on the command line.
const transcriptPath = process.argv[2];
if (!transcriptPath) {
  console.error("Usage: node chat.js <path-to-transcript.txt>");
  process.exit(1);
}
const transcript = fs.readFileSync(transcriptPath, "utf-8");

console.log(`📄 Reading: ${transcriptPath}`);
console.log(`📝 Transcript length: ${transcript.split(/\s+/).length} words\n`);
console.log("⚡️ Calling Claude API...\n");

// 4. Make the API call.
//    This is the actual "doorbell" — the JSON request that gets sent
//    to Anthropic. Everything you build for the rest of the sprint
//    is just this, arranged thoughtfully.
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

// 5. Print the response.
//    The actual text Claude wrote lives at response.content[0].text.
//    Everything else is metadata (tokens used, stop reason, etc).
console.log("─".repeat(60));
console.log(response.content[0].text);
console.log("─".repeat(60));
console.log(
  `\n✓ Used ${response.usage.input_tokens} input tokens, ` +
    `${response.usage.output_tokens} output tokens.`
);

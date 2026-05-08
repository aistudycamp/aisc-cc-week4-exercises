// Extension: Save Summary
// After routing, generates a one-paragraph AI summary and saves it
// alongside the transcript as [filename]-summary.txt.
//
// How to add this to your workflow:
//   1. import { saveSummary } from './extensions/save-summary.js';
//   2. Inside runWorkflow(), after the notify step:
//        await saveSummary(transcript, outputPath);

import Anthropic from "@anthropic-ai/sdk";
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";
import { withRetry } from "../../utils/retry.js";

const client = new Anthropic();

export async function saveSummary(transcript, outputPath) {
  console.log("  📝 Generating summary...");
  const response = await withRetry(() => client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 256,
    messages: [{
      role: "user",
      content: `Write a one-paragraph summary of this meeting transcript:\n\n${transcript}`,
    }],
  }));
  const summary = response.content[0].text;
  const summaryPath = outputPath.replace(/\.txt$/, "-summary.txt");
  fs.writeFileSync(summaryPath, summary, "utf-8");
  console.log(`  ✓ Summary saved → ${path.basename(summaryPath)}`);
  return summaryPath;
}

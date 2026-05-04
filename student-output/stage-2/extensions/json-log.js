// Extension: JSON Log
// After each classification, appends one JSON record to outputs/log.jsonl.
// Run `cat outputs/log.jsonl` to see the log grow with each transcript.
//
// How to add this to your workflow:
//   1. import { logToJson } from './extensions/json-log.js';
//   2. Inside runWorkflow(), after the notify step:
//        logToJson(result.type, sourceFilename, outputPath);

import fs from "node:fs";
import path from "node:path";

const LOG_PATH = path.join(import.meta.dirname, "..", "..", "outputs", "log.jsonl");

export function logToJson(classification, sourceFilename, outputPath) {
  const record = {
    timestamp: new Date().toISOString(),
    filename: sourceFilename,
    type: classification,
    routed_to: outputPath,
  };
  fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
  fs.appendFileSync(LOG_PATH, JSON.stringify(record) + "\n", "utf-8");
  console.log(`  ✓ Logged → outputs/log.jsonl`);
}

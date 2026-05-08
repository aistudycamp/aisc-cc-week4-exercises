// Helper: extract a JSON object from a model response.
// Models sometimes wrap JSON in markdown fences (```json ... ```) or add
// preamble text. This strips fences, then pulls the first balanced {...}
// block out and parses it. Used by stage-2/workflow.js (classifier) and
// stage-3/orchestrator.js (Conductor).
export function extractJsonObject(text) {
  let cleaned = String(text || "").trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();
  const start = cleaned.indexOf("{");
  if (start === -1) throw new Error("no JSON object found");
  let depth = 0;
  for (let i = start; i < cleaned.length; i++) {
    if (cleaned[i] === "{") depth++;
    else if (cleaned[i] === "}") {
      depth--;
      if (depth === 0) return JSON.parse(cleaned.slice(start, i + 1));
    }
  }
  throw new Error("unmatched braces");
}

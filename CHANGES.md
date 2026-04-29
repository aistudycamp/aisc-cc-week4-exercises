# Course Changes — Agent Sprint
**Date:** 2026-04-29
**Source:** Automated pre-run audit via `review-course` skill + fix pass

All changes made before the first cohort run. None of these are breaking changes to the course arc or module sequence.

---

## Code Fixes (template files)

### `templates/transcripts-to-insights/package.json`
- Removed hardcoded `transcripts/sample-transcript.txt` from the `stage-3` npm script. Was: `node stage-3/orchestrator.js transcripts/sample-transcript.txt`. Now: `node stage-3/orchestrator.js`. This allows `npm run stage-3 -- transcripts/real-input.txt` to work correctly in Module 8 (previously the path would be appended after the hardcoded sample, not replace it).

### `templates/transcripts-to-insights/stage-3/orchestrator.js`
- Added a default fallback: `const transcriptPath = process.argv[2] || "transcripts/sample-transcript.txt"`. Module 6 (`npm run stage-3` with no args) still runs the sample transcript. Module 8 (`npm run stage-3 -- transcripts/real-input.txt`) now correctly uses the student's real input.

---

## Documentation Fixes (CLAUDE.md, README.md)

### `CLAUDE.md`
- Updated prompt count in Key Files from 3 to 4; added `router.md` with description (was already on disk, just undocumented here — students arriving at Module 6 were finding a file CLAUDE.md never mentioned)
- Added Time and Artifact columns to the Module Reference table (was missing both; now shows duration and named output per module)
- Added "Orchestrator means two things" bullet to Teaching Guardrails to disambiguate "the orchestrator system (Stage 3)" from "the `orchestrator()` function inside `orchestrator.js`"

### `README.md`
- No changes needed — already had `workflow.js` (correct)

---

## Skill File Fixes (.claude/skills/)

### All 9 skill files
- Added `## Coach Guardrails` section to every SKILL.md. Previously only the root CLAUDE.md had global guardrails; per-module guardrails (covering each module's specific failure modes and coaching temptations) were entirely absent.
- Standardized `## Optional deeper reading` sections across all modules (consistent callout format and phrasing)

### `stage-1-intro/SKILL.md`
- Fixed `stage-2/watcher.js` → `stage-2/workflow.js` in the file tree display (actual file on disk was already named correctly)
- Added "Ready to scaffold?" confirmation prompt before the `cp -R` command — coach now asks before scaffolding instead of doing it without warning

### `module-1/SKILL.md`
- Fixed `watcher.js` → `workflow.js` in the Stage 2 staircase diagram
- Added new Step 6 "Find the orchestrator" (2 min): student opens `examples/example-transcripts-insights.md` and finds the orchestrator function — first hands-on step in this otherwise mental-model-only module. Original Step 6 and Step 7 renumbered to Step 7 and Step 8.
- Expanded Optional deeper reading with a note that `what-is-an-agent.md` will be opened in Module 3 (previously listed as fully optional with no warning about the Module 3 dependency)

### `module-2/SKILL.md`
- Added one bridging sentence in Step 3 connecting the JSON request object back to the Module 1 orchestrator diagram ("Remember the orchestrator diagram from Module 1 — the 'AI thinking' step? This JSON request is what goes over the wire for that step.")

### `module-3/SKILL.md`
- Removed draft scar in Step 2: "Open `concepts/what-is-a-workflow.md` — actually, skip ahead." Replaced with a clean direct reference to `what-is-an-agent.md`
- Reframed learning objective from "build the chat assistant" (it's already scaffolded) to "run, edit, break, and restore" — the actual experience
- Promoted restore step from a buried sub-note to `### Step 5c: Restore the original prompt ⚠️ (required)` with explicit warning and a verification run — Module 4 depends on `system.md` being intact

### `module-4/SKILL.md`
- Added reflection question at end of Step 3: "What do you think Stage 3 will import from this file?" — plants the module-6 reveal
- Added explicit second-terminal instructions (Mac: `Cmd+T` / `Cmd+N`; Windows/Linux: new terminal session) — was previously just "in a second terminal window" with no guidance
- Moved the frontend visualization step from Step 7 (after stopping the watcher) to Step 6 (right after the watcher fires) — now a comprehension check tied to the pipeline output, not a cleanup task

### `module-5/SKILL.md`
- Fixed Option 4 (macOS notification) code snippet: moved `import { exec } from "node:child_process"` from inside `runWorkflow()` to the top of the file where it belongs. ES module imports inside a function body cause a `SyntaxError` at parse time.
- Rewrote the handoff line to differentiate it from Module 4's nearly identical handoff — now introduces Stage 3's decision-making concept specifically rather than just teasing "the biggest stage"

### `module-6/SKILL.md`
- Added a prediction check before Step 4: coach asks "What do you think happens when the planner returns `{ tools: ['summarize'] }` only?" before walking through the dispatch logic
- Added a "synthesize = combine the specialists' outputs into one final report" definition sentence before the dispatch code block, where `synthesize(results)` appears without prior definition

### `module-7/SKILL.md`
- Reframed learning objective from "a screenshot" (deliverable) to "the ability to point to every node and name the file or function behind it" (actual learning)
- Softened animation claim from "That animation isn't fake — it's the actual sequence of API calls" to "That animation matches the actual sequence of API calls in your `orchestrator.js`" — the animation is scripted timing, not a live connection

### `module-8/SKILL.md`
- Fixed run command: removed the ambiguous `node stage-3/orchestrator.js transcripts/real-input.txt` fallback. Single canonical command: `npm run stage-3 -- transcripts/real-input.txt` (this now works correctly after the package.json + orchestrator.js fix above)
- Defined JTBD as "Jobs to Be Done" in all three places it appears (use-case menu, output format example, sub-agent prompt example)

---

## What Was Not Changed

- The 3-stage building-block arc (chat assistant → workflow → agentic system) — working as designed
- Module sequence and content — no modules added, removed, or reordered
- The `ask()` / `runWorkflow()` import chain design — the core pedagogical mechanic is intact
- All git commit steps across every module
- CLAUDE.md coach identity, Teaching Guardrails (existing bullets), and error-handling section
- Module 7 framing as a celebration module
- Module 8 use-case menu, iteration loop, and closing ("Go build something")
- The `personalized/` folder save pattern in Module 8

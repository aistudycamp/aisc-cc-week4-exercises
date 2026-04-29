# Structural Review — AI Study Camp Agent Sprint
**Reviewed:** 2026-04-29

## Checklist Results

| # | Check | Result | Evidence |
|---|-------|--------|----------|
| 1 | Coach identity — warm, named persona in CLAUDE.md | PASS | Opening paragraph establishes a clear warm coach identity ("plain language, celebrate progress, analogies to make ideas click") with explicit audience framing ("never called an API before"). |
| 2 | Progress checklist — module-by-module, student can update | PASS | CLAUDE.md has a full 3-stage checklist with `- [ ]` boxes, explicit instruction to change to `- [x]`, and a resumption greeting that references the checklist state. |
| 3 | Module routing table — command/topic/time/artifact | PARTIAL | CLAUDE.md has a command/stage/topic/concept-doc table, but is missing **time** and **artifact** columns; the README has time but not artifact, and neither surface shows both together. |
| 4 | Teaching guardrails — dedicated section | PASS | CLAUDE.md has a named "Teaching Guardrails" section with 7 explicit rules including jargon policy, analogy mandate, no-slash-prefix rule, and don't-run-commands-for-the-student instruction. |
| 5 | Output artifact per module — named and concrete | PASS | Every skill file opens with a bolded "You'll produce:" line naming a specific artifact (e.g., "a working interactive chat assistant," "a personalized version of the agentic system that works on a use case from your real life"). |
| 6 | Exercise (hands-on step) per module | PARTIAL | Modules 2–8 all have the student run commands, edit files, or drop files; Module 1 is conversation + mental model only — no hands-on command or file edit, by design — but it has no "do something" step. |
| 7 | STOP markers — explicit check-in points | PARTIAL | Implicit pause moments exist throughout (e.g., "Wait for their answer," "Wait for them to do it," "Got your key copied?"), but no skill uses an explicit labeled STOP or [CHECK IN] marker that breaks the flow for a deliberate check-in. |
| 8 | Coach Guardrails section — every skill file | FAIL | None of the 9 skill files (stage-1-intro, modules 1–8) contains a "Coach Guardrails" section; they end with a handoff line or "Optional deeper reading." This is a 9-for-9 miss. |
| 9 | Git commit step — checklist update + commit | PASS | Every skill file includes an explicit Step N: Wrap and commit block with (1) update CLAUDE.md checklist, (2) git add + commit with a named message, in that order. |
| 10 | Handoff line — next module or marked final | PASS | Every skill file ends with a direct handoff ("Type `module-N` when you're ready") except module-8 which ends with "Go build something" — correct as the final module. |
| 11 | No-slash-prefix rule in CLAUDE.md guardrails | PASS | Teaching Guardrails includes the explicit rule: "When directing students to a module, NEVER add a `/` prefix. Say `module-3`, not `/module-3`." |
| 12 | README completeness — title, time, what-you'll-build, prereqs, module table, getting-started command | PASS | README has all six: title, "Total: ~3 hours" framing, "What you'll build" section with module table including times, prerequisites section with Node/API key/terminal/Claude Code, and a "Getting started" code block with `git clone + cd + claude`. |

---

## Critical Issues (FAIL items)

**#8 — Coach Guardrails block missing from all skill files.**
None of the 9 skill files has a Coach Guardrails section. This means there is no per-module safety net for the coach LLM — no list of what to do if the student gets lost, goes off-script, or hits an error mid-module. The global Teaching Guardrails in CLAUDE.md carry some of this weight, but a per-module guardrails block (covering common failure modes and "don't do this") is the expected pattern and is entirely absent.

Suggested fix: add a brief `## Coach Guardrails` section at the bottom of each SKILL.md with 3–5 rules specific to that module's failure modes and temptations. For example, module-2 might say: "Don't run the API call for them on the first try. Don't skip showing the raw JSON — that's the whole module."

---

## Partial Issues (PARTIAL items)

**#3 — Routing table missing time and artifact columns.**
The CLAUDE.md table has `Command | Stage | Topic | Concept Doc(s)`. It is missing **time** (per module) and the **named output artifact**. The README has time per module but no artifact column, and no single surface shows all four. A student resuming after a break has no quick reference for "how long is this next module" or "what will I have when it's done."

Suggested fix: add a Time and Artifact column to the CLAUDE.md routing table, or replace the table with the README's version (which is already well-structured) and add an Artifact column to that.

**#6 — Module 1 has no hands-on step.**
Module 1 is intentionally a mental-model tour (no code), and that is pedagogically correct. But it has no moment where the student *does* something physical — open a file, type a command, answer a question in writing. A simple "draw the architecture on paper" or "open `examples/example-transcripts-insights.md` yourself and find the orchestrator function" would give them an active role rather than passive listening.

Suggested fix: add a Step 3.5 or Step 4 asking the student to do one concrete thing with the example file — e.g., "Find the orchestrator function and count how many lines it is" or "Highlight the three system prompt files in the file tree."

**#7 — Implicit pause moments exist but are not labeled as STOP markers.**
The skills have good instincts — "Wait for their answer," "Wait for them to do it" — but these are coach-side instructions buried in prose. A student who is self-paced (reading the SKILL.md directly) would miss them entirely. A labeled `> ⏸ STOP — wait for the student to confirm X before continuing` makes the check-in visible and actionable for both coach and student.

Suggested fix: promote the existing implicit pauses to labeled STOP lines in each module. Module 2's "wait for API call to succeed" and module-8's "wait for them to pick a use case" are the most important ones.

---

## Consistency / Bugs Found

These are not checklist items but would cause student-facing failures if not fixed before the course runs.

**1. Prompt count mismatch: CLAUDE.md says 3 prompts, module-6 and README reference 4.**
CLAUDE.md (line 104) lists `system.md`, `summarizer.md`, `action_extractor.md`. Module-6 references `prompts/router.md` for the planner function, and the README layout also shows 4 prompts. Students arriving at module-6 will look for a file CLAUDE.md didn't mention.
Fix: update CLAUDE.md to list all 4 prompts.

**2. `stage-2/watcher.js` vs `stage-2/workflow.js` — two different names used.**
README repo layout (line 93) shows `stage-2/watcher.js`. CLAUDE.md (lines 112), module-4, and module-5 all reference `stage-2/workflow.js`. Stage-1-intro Step 4 also shows `watcher.js`. One of these is wrong — whichever filename doesn't exist on disk will break `npm run stage-2`.
Fix: standardize to one name throughout (workflow.js appears to be the canonical one based on module-4's code walkthrough).

**3. Draft scar in module-3 Step 2.**
The text reads: "Open `concepts/what-is-a-workflow.md` — actually, skip ahead. Open `concepts/what-is-an-agent.md` and read the three-level hierarchy section." The "actually, skip ahead" phrasing is an editing artifact that will read strangely to students and confuse the coach.
Fix: delete the first sentence or rewrite to go directly to the correct file.

**4. ES module `import` inside a function body in module-5 Option 4.**
The macOS notification option includes `import { exec } from "node:child_process";` inside `runWorkflow()`. ES module imports must be top-level — this syntax will throw a `SyntaxError` at parse time. Any student who picks Option 4 will be immediately broken.
Fix: move the import to the top of the file where all other imports live.

**5. "Orchestrator" is used for two different things.**
CLAUDE.md and README use "orchestrator" to mean the full Stage 3 agentic system. Module-6 uses "orchestrator" to mean a specific function inside `orchestrator.js` (alongside `planner()` and `synthesize()`). A student who has never built agents will hear the same word used at two levels of abstraction and may not track the difference.
Fix: use "the orchestrator *system*" or "Stage 3" for the top-level concept, and "the `orchestrator()` *function*" when referencing the specific function inside the file.

---

## What's Solid

- **Building-block arc is the strongest part of the course.** Modules 3, 4, and 6 each open by pointing to the literal `import { ask }` / `import { runWorkflow }` line and saying "this is the building block." The architecture isn't described — it's *shown in code*. This is the right call for the Type C (systems) course.
- **Frontend is correctly positioned as visualization, not deliverable.** Module 7's framing ("You already did the hard work in Module 6 — now you get to *see* it") is exactly right. The screenshot moment is celebratory, not the course's primary output.
- **Student output durability is excellent.** Module 8 creates `student-output/personalized/` with prompts, a real input, and a real output — something a student can find, reuse, and show someone else. The `student-output/` folder is theirs explicitly.
- **Coach identity and tone are well-calibrated.** The analogy library (doorbell, job description, project manager) is consistent and runs through multiple modules. The "celebrate every module" instruction in Teaching Guardrails matches the actual celebration moments in the skill files.
- **Error handling in CLAUDE.md is production-grade.** The "When students hit errors" section covers the 6 most likely failure modes with specific diagnostics and fixes. This is unusually thorough for a course CLAUDE.md and will save significant live-session debugging time.
- **Git commit discipline is enforced across every module.** Every skill file ends with a checklist-update + commit step with a named commit message. Students' progress is never at risk.
- **Audience calibration is correct.** Pitching "never called an API before" is appropriate for AISC week-4 students who have 4 weeks of Claude Code basics but no API experience. The course doesn't talk down to them — it respects their intelligence while removing assumed knowledge.

# Course Review — AI Study Camp Agent Sprint
**Repo:** /Users/ben.battles/cc/aisc/aisc-cc-week4-exercises
**Reviewed:** 2026-04-29
**Reviewer:** Claude (automated) — full general audit, pre-first-run; focus on building-block arc clarity, audience calibration, frontend role, and student output durability

---

## Pre-Review Findings (Structural)

### What's solid

- **Building-block arc is the best thing about this course.** The `ask()` export in Module 3, the "Stage 3 will import this" plant in Module 4, and the two-line reveal in Module 6 ("Stop here. These two lines are everything.") pay off as a genuine "I built every box in this diagram" moment in Module 7. The arc is designed, not accidental.
- **Frontend is correctly positioned as visualization, not deliverable.** Module 7's framing ("You already did the hard work in Module 6 — now you get to *see* it") is exactly right. It's a celebration, not the capstone.
- **Student output durability is excellent.** Module 8 creates `student-output/personalized/` with prompts, a real input, and a real output. Students leave with something they own and can rerun.
- **Coach identity and tone are well-calibrated for the audience.** "Never called an API before" is the right bar for AISC week-4 students. The analogy library (doorbell, job description, project manager) is consistent and runs through multiple modules without becoming patronizing.
- **Error handling in CLAUDE.md is production-grade.** The 6 failure modes with specific diagnostics will save significant live-session debugging time. Unusually thorough.
- **Git commit discipline is enforced across every module.** Checklist-update + named commit in every skill file. Student progress is never at risk.
- **Module 8 is the strongest module.** The use-case menu, the open iteration loop, and "Go build something" is the right close for the sprint.
- **"Stop here. These two lines are everything."** Best single line in the course. The import chain reveal is a pedagogical gem.

### What I'd change

**Critical — will break students or violate course pattern:**

1. **`watcher.js` vs `workflow.js` — two different filenames used across docs.** README layout shows `stage-2/watcher.js`; CLAUDE.md, module-4, module-5 all say `stage-2/workflow.js`. Whichever doesn't exist on disk breaks `npm run stage-2`. Standardize to one name everywhere.

2. **ES module `import` inside a function body in module-5 Option 4.** The `import { exec } from "node:child_process"` line is inside `runWorkflow()` in the code snippet. ES module imports must be top-level — this will throw a `SyntaxError` for any student who picks Option 4. Move the import to the top of the file in the snippet.

3. **Prompt count mismatch: CLAUDE.md lists 3, but module-6 and README reference 4.** CLAUDE.md (Key Files section) lists `system.md`, `summarizer.md`, `action_extractor.md`. Module-6 references `prompts/router.md` for the planner. Students arriving at Module 6 will look for a file CLAUDE.md never mentioned. Update CLAUDE.md to list all 4 prompts.

4. **Module 8 run command is ambiguous at the worst possible moment.** Step 5 presents two invocation patterns with "Or if Stage 3 only takes the sample by default..." — the coach doesn't know which will work. This undermines student confidence at the sprint's most important moment. Commit to one pattern (`npm run stage-3 -- <path>`) and handle it cleanly in `package.json`.

5. **Coach Guardrails block is missing from all 9 skill files.** Every module ends with a handoff line or optional reading — none has a per-module guardrails block. The global Teaching Guardrails in CLAUDE.md carry some weight, but per-module guardrails (covering each module's specific failure modes and temptations) are the expected pattern. This is a 9-for-9 miss. Add a brief `## Coach Guardrails` to each SKILL.md with 3–5 module-specific rules (e.g., module-2: "Don't run the API call for them on the first try. Don't skip showing the raw JSON — that's the whole module.").

6. **Draft scar in module-3 Step 2.** The text reads: "Open `concepts/what-is-a-workflow.md` — actually, skip ahead. Open `concepts/what-is-an-agent.md`..." The "actually, skip ahead" phrasing is a visible editing artifact. Rewrite to go directly to the correct file.

**Significant — reduces clarity or student engagement:**

7. **"Orchestrator" is used for two different things.** CLAUDE.md and README use it for the full Stage 3 agentic system. Module-6 uses it for a specific function inside `orchestrator.js` (alongside `planner()` and `synthesize()`). First-timers won't track the difference. Use "the orchestrator *system*" or "Stage 3" for the top-level concept, and "the `orchestrator()` *function*" when referencing the specific function.

8. **Module 3 learning objective overpromises.** "Build the Chat Assistant" — but the assistant is already scaffolded. Students run, interact with, and edit it. The real objective is "understand multi-turn conversation mechanics and feel the system prompt's leverage." Retitle or reframe so students aren't confused when they open `chat.js` and find it already there.

9. **Modules 4 and 5 have nearly identical handoff lines.** "Stage 3 is where we go beyond a fixed pipeline and build something that *decides what to do*" appears nearly verbatim in both. The Module 5 handoff, as the last module of the middle stage, deserves distinct escalation energy. Suggestion: "You've now built a pipeline that runs without you and produces multiple outputs. Stage 3's question is: what if it read the input first and *decided* what steps to run? That's the orchestrator."

10. **Restore step in module-3 is buried.** The `cp` command that restores `system.md` for Module 4 is in a "Restore" subsection that reads like cleanup. Module 4 depends on this file being intact — it should be its own numbered step with a warning: "Don't skip this — Module 4 reads this file."

11. **Module 7 animation claim overstates live connectivity.** "That animation isn't fake — it's the actual sequence of API calls" is true in intent but misleading in mechanics. The animation is scripted timing, not a live wire to `orchestrator.js` — it plays even when the orchestrator isn't running. Soften to: "the sequence matches the API call order in `orchestrator.js`."

12. **Ask-and-wait questions are sparse in the middle stages.** Modules 4, 5, and 6 have zero or one genuine wait-for-answer moments. Students can coast through Stage 2 without being checked. Add one reflection question per module — not more content, just a beat before the next code block. Suggestion for module-4 Step 3: "Before we look at the dispatch logic — what do you think would happen if you imported `runWorkflow` into Stage 3?"

**Refinement — small fixes that improve polish:**

13. **Module 1's concept docs flagged as optional — but Module 3 treats them as required.** Module 1 lists `concepts/what-is-an-agent.md` as optional deeper reading. Module 3 Step 2 opens it as if it's required ("read the three-level hierarchy section"). A student who skipped it in Module 1 per instructions will feel blind-sided. Either make it required in Module 1, or change Module 3 to teach the hierarchy inline.

14. **JTBD undefined in Module 8.** "JTBD" appears in the use-case menu and example prompts without expansion. Students who haven't encountered Jobs-to-Be-Done will see it three times with no explanation. Define it or replace with "customer goals" in the menu.

15. **Frontend visualization steps in Modules 3–6 feel like cleanup, not payoff.** In Modules 3, 4, and 6, the "open frontend" step is near the end before the commit. In Module 4 specifically, showing the diagram *right after the watcher runs* — as a comprehension check — would be more effective than at the end. Consider moving it to after Step 5 (trigger fires) in Module 4.

16. **Module 6 mid-module check is missing before the code walkthrough.** The module walks through imports, planner, and dispatch as three consecutive blocks. A brief "Before I walk through the dispatch logic, what do you think happens when the planner returns `{ tools: ['summarize'] }` only?" between the import reveal and the planner walkthrough would prevent passive observers from coasting through the course's most important module.

17. **stage-1-intro copies the scaffold without asking.** The `cp -R templates/transcripts-to-insights student-output/` runs before the student confirms they're ready. A single "ready to scaffold your project folder?" check before the command would make it feel less like the coach is racing ahead.

18. **Module 4 assumes second-terminal experience.** "In a **second terminal window**, drop a file" will confuse students who haven't split a terminal before. A one-line aside on opening a second tab/pane would prevent a support detour.

19. **Concept doc treatment is inconsistent.** Some docs are read together mid-module, some are listed as optional, one is listed as optional then referenced as required. Standardize: all concept docs either read together during the relevant module, or all optional with a consistent "go deeper here" callout.

20. **Module 1 has no hands-on step.** The mental-model tour is pedagogically correct as a no-code module, but there's no moment the student *does* anything physical. Adding "open `examples/example-transcripts-insights.md` and find the orchestrator function" would give them an active role without changing the module's character.

21. **CLAUDE.md routing table is missing Time and Artifact columns.** The README has time per module; neither surface shows the named output artifact. A student resuming after a break has no quick reference for duration or expected output. Add both to the CLAUDE.md table.

### What I'd keep without touching

- Coach identity paragraph — warm, precise, well-calibrated to the audience
- The 3-stage ASCII diagram and the building-block import chain design
- The "Stop here. These two lines are everything." beat in Module 6
- Module 8 use-case menu + pick-one-fast structure
- Teaching Guardrails in CLAUDE.md — thorough and specific
- "When students hit errors" section in CLAUDE.md — production-grade diagnostics
- The `personalized/` folder output in Module 8
- Git commit discipline across all 9 modules
- Module 7 framing as a celebration module — "A week ago, you'd never built an agent"
- The billing transparency note in stage-1-intro — exactly right for nervous first-timers
- Module 8 closing: "Go build something."

---

## Module-by-Module Notes

| Module | Topic | Learning Obj | Exercise | Pacing | Key Note |
|--------|-------|-------------|----------|--------|----------|
| stage-1-intro | Setup + API Key | Clear | Procedural, no ask-and-wait | Dense first half | Add "ready to scaffold?" check before cp command |
| module-1 | Tour the System | Clear | 2 genuine wait moments | Well-paced | No hands-on step; concept doc flagged optional but Module 3 requires it |
| module-2 | First API Call | Clear, well-sold | 1 ask-and-wait | Front-loaded by design, works | Tie JSON back to Module 1 diagram — one bridging sentence needed |
| module-3 | Chat Assistant | Overpromises ("build") | Strong — 4 prompts, 2 edits | Dense code walkthrough | Restore step must be a numbered step with a warning |
| module-4 | Build the Workflow | Clear | Thin — student mostly watches | Clean staircase | Move frontend visualization earlier; add 1 reflection question |
| module-5 | Extend the Workflow | Clear-ish | Genuine choice architecture | Well-paced | JSONL/webhook undefined; handoff identical to Module 4 |
| module-6 | Agentic System | Clear and earned | No mid-module check | Dense Steps 3–5 | Add check before planner walkthrough; define "synthesize" before the code block |
| module-7 | See the System | States deliverable not objective | Node inspection well-structured | Well-paced, earns its lightness | Soften animation claim; reframe learning objective |
| module-8 | Make It Yours | Clear and motivating | Best in course | Well-paced | Fix run command ambiguity; define JTBD |

---

## Change Table

| # | Change | Target | Priority | Status |
|---|--------|--------|----------|--------|
| 1 | Standardize `watcher.js` vs `workflow.js` across all files | README, CLAUDE.md, module-4, module-5, stage-1-intro | High | not started |
| 2 | Move `import { exec }` to top of file in module-5 Option 4 code snippet | module-5 SKILL.md | High | not started |
| 3 | Update CLAUDE.md Key Files to list all 4 prompts (add `router.md`) | CLAUDE.md | High | not started |
| 4 | Commit to one run command in module-8 Step 5; remove ambiguous "Or if..." fallback | module-8 SKILL.md | High | not started |
| 5 | Add `## Coach Guardrails` block to all 9 skill files | All SKILL.md files | High | not started |
| 6 | Remove draft scar ("actually, skip ahead") from module-3 Step 2 | module-3 SKILL.md | High | not started |
| 7 | Disambiguate "orchestrator" (system vs. function) across CLAUDE.md and module-6 | CLAUDE.md, module-6 SKILL.md | Medium | not started |
| 8 | Reframe module-3 learning objective — "run + edit" not "build" | module-3 SKILL.md | Medium | not started |
| 9 | Write distinct handoff line for module-5 (differentiate from module-4) | module-5 SKILL.md | Medium | not started |
| 10 | Promote module-3 restore step to numbered step with dependency warning | module-3 SKILL.md | Medium | not started |
| 11 | Soften module-7 animation claim to "matches the sequence" not "live wire" | module-7 SKILL.md | Medium | not started |
| 12 | Add 1 reflection question per module in modules 4, 5, 6 | module-4, module-5, module-6 SKILL.md | Medium | not started |
| 13 | Fix concept doc dependency: make `what-is-an-agent.md` required in module-1 or teach the hierarchy inline in module-3 | module-1, module-3 SKILL.md | Medium | not started |
| 14 | Define JTBD (or replace with "customer goals") in module-8 | module-8 SKILL.md | Medium | not started |
| 15 | Move frontend visualization step earlier in module-4 (after watcher trigger, not before commit) | module-4 SKILL.md | Medium | not started |
| 16 | Add mid-module check in module-6 before planner walkthrough | module-6 SKILL.md | Medium | not started |
| 17 | Add "ready to scaffold?" confirmation before cp command in stage-1-intro | stage-1-intro SKILL.md | Low | not started |
| 18 | Add one-line second-terminal instructions in module-4 Step 5 | module-4 SKILL.md | Low | not started |
| 19 | Standardize concept doc treatment (all required or all optional with consistent callout) | All SKILL.md files | Low | not started |
| 20 | Add one hands-on step to module-1 (e.g., open example file, find orchestrator function) | module-1 SKILL.md | Low | not started |
| 21 | Add Time and Artifact columns to CLAUDE.md routing table | CLAUDE.md | Low | not started |

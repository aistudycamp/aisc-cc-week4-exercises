# Course Feedback — student-test-run (2026-05-06)

Feedback from Ben's full student run-through of the AISC Week 4 course on the `student-test-run` branch. 17 main items, 21 with sub-items.

Status legend: `open` | `in progress` | `done`

---

## Critical bugs (fix first)

| ID | Area | Issue | Status |
|----|------|-------|--------|
| F13 | `student-output/orchestrator.js` | Conductor always runs full pipeline. Orchestrator doesn't read Conductor's JSON `tools` array. Blocks all of module-7's learning moment — "just give me action items" / "just route this" both default to all 5 specialists. | open |
| F11 | `student-output/orchestrator.js` | `report.md` not written to output folder after orchestrator run. Transcript routes correctly to `transcripts/team-standup/` but report file missing. Likely Router handoff omits filename. | open |

## Frontend (`student-output/public/`)

| ID | Area | Issue | Status |
|----|------|-------|--------|
| F3 | Chat tab layout | Main canvas blank, chat squished in right sidebar. Redesign so chat lives in main canvas. | open |
| F3a | Chat tab button | "Run Agent" button on chat tab does nothing. Replace with "Clear Chat". | open |
| F6 | Tab structure | Two confusing chat tabs ("00 chat" and "01 chat assistant"). Merge or differentiate clearly. | open |
| F7a | Workflow tab | No step-by-step animation. Should slowly show classifier thinking → routing → output, paced like agentic system. | open |
| F7b | Tab scoping | Agentic system results bleed into the workflow tab. Scope run logs to originating tab only. | open |
| F7c | Run buttons | Duplicate run buttons per tab with inconsistent behavior. Standardize: Clear at top, Run at bottom, always triggers logs + animation. | open |
| F7d | Notifications | macOS notification not firing on completion. Add in-app banner fallback. | open |
| F10 | Agentic canvas | On large monitors, Conductor node overlaps Extractor/Synthesizer. Raise Conductor + Input/Output nodes; increase vertical gap. | open |
| F12 | Conductor input | Instruction textarea too small. Bump to 4-5 visible lines. | open |

## Module content

| ID | Module | Issue | Status |
|----|--------|-------|--------|
| F1 | `stage-1-intro` | Stage 3 description doesn't mention it builds on the Stage 2 workflow. Update to make the arc clear. | open |
| F2 | `module-2` | Missing instruction to open a new terminal tab and `cd student-output` before `npm run server`. Students are already in a terminal so it's not obvious. | open |
| F4 | `module-3` | "messages[] array grows" claim may not match implementation. Audit code and either fix the explanation or fix the code. | open |
| F5 | `module-3` | Second system prompt example (TLDR) is flat — same voice as Shakespearean edit, hardcoded headers, not dramatic. Replace with a different character with distinct voice + distinct output structure. | open |
| F8 | `module-5` | Stage 2 box in ASCII diagram is clipped — `classifier.md` overflows the border. | open |
| F9 | Stage boundaries | Standardize compact prompts at stage boundaries (end of M3, M5, M7) instead of every module. Claude can't see context level so blanket reminders are noise. | open |
| F14 | `module-7` | Asks "what did you see?" then immediately answers without waiting for student response. Add a genuine pause. | open |
| F15 | `module-7` | Needs 4 distinct Conductor runs to actually demonstrate routing: (1) action items only, (2) route only, (3) multi-specialist, (4) full report no save. Currently only one run shown. | open |
| F16 | `module-8` | Too dense. Personalization + extension + three patterns (Pipeline, Domain Stack, Council) all at max depth. Overwhelming as a send-off. Pick one job, cut depth. | open |
| F17 | `module-8` | "Build the next one" handoff unclear — no folder commands, no CLAUDE.md, no clarity on artifact type (skill vs agent vs project). Make it turnkey: pre-filled CLAUDE.md students copy into a new folder + commands to run. | open |

---

## Implementation order (recommended)

1. **F13** first — blocks every module-7 test. Without this fix, F14/F15 rewrites can't be validated.
2. **F11** — same file, related fix.
3. **Frontend cluster** (F3, F3a, F6, F7a-d, F10, F12) — many interlocking pieces, easier to do in one pass.
4. **Module content** (F1, F2, F4, F5, F8, F9) — quick edits.
5. **Module-7 / Module-8 rewrites** (F14, F15, F16, F17) — last, since they depend on F13 working and on having frontend/UX stable for testing.

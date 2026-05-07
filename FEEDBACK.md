# Course Feedback — student-test-run (2026-05-06)

Feedback from Ben's full student run-through of the AISC Week 4 course on the `student-test-run` branch. 17 main items, 21 with sub-items.

Status legend: `open` | `in progress` | `done`

All items now `done`. See implementation notes per row.

---

## Critical bugs (fix first)

| ID | Area | Issue | Status | Notes |
|----|------|-------|--------|-------|
| F13 | `student-output/orchestrator.js` | Conductor always runs full pipeline. | done | Root cause: JSON.parse failing because the model occasionally returned the JSON wrapped in markdown fences, hitting the "Defaulting to full pipeline" fallback. Fix: added `extractJsonObject()` that strips markdown fences and pulls the first balanced `{...}` block. Also tightened `prompts/conductor.md` to forbid markdown fences. Verified end-to-end via three different instructions — Conductor correctly returns extractor only / router only / full pipeline. |
| F11 | `student-output/orchestrator.js` | `report.md` not written after orchestrator run. | done | Investigated — the report-write code path in `runWorkflow()` (workflow.js:68-73) was already correct. The case Ben observed was a Conductor run that excluded the synthesizer (so `report = null` was correctly passed to router and only the transcript was saved — by design, not a bug). With F13 fixed, full pipeline reliably writes `<filename>-report.md`. Verified by running `npm run stage-3` and finding the report file under `transcripts/team-standup/`. |

## Frontend (`frontend/index.html`)

| ID | Area | Issue | Status | Notes |
|----|------|-------|--------|-------|
| F3 | Chat tab layout | Main canvas blank, chat squished in right sidebar. | done | New `.chat-canvas` element fills the main canvas area on stage 0 — editable system prompt at top, scrolling history in middle, input docked at bottom. Right panel hidden on stage 0 via CSS. |
| F3a | Chat tab button | Dead "Run Agent" button. | done | Top button is now `clearBtn` (label "Clear Chat" on chat tab, "Clear" elsewhere). Subsumed by F7c. |
| F6 | Tab structure | Two confusing chat tabs. | done | Dropped tab `01 chat assistant` and `panel1`. Renamed `00 chat` → `01 chat`. Existing `00 chat` JSON-toggle code removed. |
| F7a | Workflow tab | No step-by-step animation. | done | `workflowSubmit` now fires `playAnimation()` (formerly `run()`) in parallel with the API call. Same pacing as the agentic system. |
| F7b | Tab scoping | Run logs bleed into other tabs. | done | `switchStage()` calls `fullReset()` on every tab change; `fullReset()` now also wipes panel-internal state (workflow result, orch result, conductor plan, instruction text, etc.). |
| F7c | Run buttons | Duplicate buttons with inconsistent behavior. | done | Top button is now Clear-only (tab-aware). Per-panel Run button at the bottom triggers BOTH the API call AND the canvas animation. ⌘R removed; ⌘K = Clear. |
| F7d | Notifications | macOS notification not firing. | done | Added in-app toast (`#appToast`) that auto-dismisses after 4 seconds. Workflow + orchestrator both fire it on completion. Native macOS notification still attempted as a side-effect of `runWorkflow()`. |
| F10 | Agentic canvas | Conductor node overlaps Extractor/Synthesizer on large monitors. | done | Raised Conductor + Input/Output rows (top: 8% / 30%), pushed specialists down (top: 70%). |
| F12 | Conductor input | Textarea too small. | done | `rows="2"` → `rows="5"`. |

## Module content

| ID | Module | Issue | Status | Notes |
|----|--------|-------|--------|-------|
| F1 | `stage-1-intro` | Stage 3 description didn't mention building on Stage 2. | done | ASCII arc updated — Stage 3 column now explicitly shows it hands off to the Stage 2 workflow for classification + saving + notification. |
| F2 | `module-2` | Missing terminal-tab instruction. | done | Step 4 now says "Open a NEW terminal tab" with explicit `cd [repo-root]/student-output` before `npm run server`. Added EADDRINUSE troubleshooting tip. |
| F4 | `module-3` | "messages[] array grows" claim didn't match implementation. | done | Server now exposes `chatTurn(messages)` and `/api/chat` accepts `{messages, system}`. Frontend chat tab maintains client-side `chatMessages[]`, pushes user + assistant turns, and POSTs the full array each turn. Verified multi-turn memory works (Claude correctly recalled "Ben" across turns). Module-3's claim is now accurate. |
| F5 | `module-3` | Second system prompt example was flat. | done | Replaced TLDR with **Captain Bartholomew "Barnacle" Briggs** — pirate captain. Distinct voice (ARRR, scallywags) AND distinct output structure (⚓ Cap'n's Verdict / 🗺️ Treasure Map / 🏴‍☠️ Scallywag Alert). |
| F8 | `module-5` | Stage 2 box clipped in ASCII diagram. | done | Widened the Stage 2 box and put `runWorkflow()` and `classifier.md` on the same line. |
| F9 | Stage boundaries | Compact prompts everywhere. | done | Removed `/compact` from stage-1-intro, M1, M2, M4, M6. Kept at M3, M5, M7 (stage boundaries) — added "Stage boundary cleanup keeps Claude focused" framing so it's clear why these specific moments. |
| F14 | `module-7` | Module asks "what did you see?" then immediately answers itself. | done | Step 7 now has explicit "STOP HERE" / "Do NOT answer this yourself" / "wait for the student's response" framing on every conductor run. Coach guardrails updated to reinforce. |
| F15 | `module-7` | Needed 4 distinct conductor runs. | done | Step 7 restructured as 2 scripted runs (action items only, just route this) with expected behaviors documented + 2 free-form runs the student designs themselves. Each run has its own pause + verification check. |
| F16 | `module-8` | Too dense — three patterns + personalization + extension all at max depth. | done | Full rewrite. Three patterns now one short paragraph each in Step 2. Step 3 forces the student to pick a path (A or B) before any scaffolding. The bulk of the module is now one path executed end-to-end. |
| F17 | `module-8` | "Build the next one" handoff unclear. | done | Two turnkey paths now: Path A personalizes the existing pipeline (copies `student-output/` to a new home, updates the three prompts), Path B builds a fresh project (Council by default, G-Stack mentioned as alt). Both include: (1) "where do you want this to live?" relocation step so the project ends up OUTSIDE the exercise repo, (2) pre-filled `CLAUDE.md` template so the next Claude session knows what to build, (3) explicit folder/npm commands. |

---

## Frontend rewrite — what to test in the browser

Focused list of things worth visually verifying after pulling these changes:

- **Chat tab (default):** Main canvas shows system prompt + history + input at bottom. Right panel hidden. Loading a transcript adds it as the first user message + assistant ack. Sending follow-up messages → `messages[]` grows, log strip shows the count. Clear button at top wipes everything.
- **Workflow tab:** Run Workflow button fires both the animation (particles flying between nodes) and the API call. Toast pops on completion.
- **Agentic tab:** Conductor node sits higher than specialists. Instruction textarea is 5 rows. Conductor plan badge appears with correct tools list when an instruction is given.

## Implementation order (what shipped)

Items shipped in this order this session:

1. F13 (Conductor JSON) — fixed first; all other M7 testing depends on it.
2. F11 — verified resolved.
3. F4 — multi-turn chat (server `/api/chat` accepts `messages[]`, frontend maintains state).
4. F6 + F3 + F3a + F7a–d + F10 + F12 — frontend rewrite (chat-in-canvas, Clear button, animation, toast, Conductor layout).
5. F1, F2, F5, F8, F9 — module content edits.
6. F14 + F15 — module-7 rewrite.
7. F16 + F17 — module-8 rewrite.
8. End-to-end smoke test (server boot, multi-turn memory, conductor routing variants, full pipeline + report file).

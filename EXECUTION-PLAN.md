# AISC Agent Sprint — Feedback Execution Plan

> Do NOT commit this file.
> Generated from FEEDBACK-SESSION.md + architecture discussion 2026-05-04.

---

## Session Progress Log (2026-05-04)

### DONE — Category 1: Architecture
- [x] `student-output/prompts/system.md` → conversational rewrite
- [x] `student-output/prompts/analyst.md` → NEW
- [x] `student-output/prompts/extractor.md` → NEW
- [x] `student-output/prompts/synthesizer.md` → NEW
- [x] `student-output/prompts/classifier.md` → `other` fallback added
- [x] `student-output/stage-3/orchestrator.js` → full rewrite (parallel dispatch, analyst/extractor/synthesizer exported)
- [x] `student-output/stage-2/workflow.js` → `other` routing + optional `report` param saves both files
- [x] `student-output/server.js` → new 3-step endpoints (step1: analyst+extractor parallel, step2: synthesizer, step3: router)
- [x] All above mirrored to `templates/transcripts-to-insights/`

### IN PROGRESS — Category 2: Frontend
- [x] Stage 3 nodes renamed: Summarizer→Analyst, Router→Synthesizer; descriptions updated
- [x] Stage 3 banner updated
- [x] Stage 3 orchestrator node description updated for new architecture
- [x] Stage 3 orch-steps labels updated: 3 steps (was 4)
- [x] Stage 3 animation sequence updated (Analyst+Extractor parallel, Synthesizer, Router)
- [x] Inspect nodeData updated for s3-summ/s3-extr/s3-route with correct prompt files
- [x] Prompt display strings updated: conversational system.md, analyst.md, extractor.md, synthesizer.md, classifier.md with `other`
- [x] Stage 3 orchestrator JS handler updated to use new 3-step API
- [x] Stage 2 workflow result updated to show step log (✓ Classifying → ✓ Routing → ✓ Notified)
- [x] File drop support on all 3 transcript textareas
- [x] "Show JSON" toggle for Stage 1 panel (Module 2)
- [x] Multiple sample transcript buttons (F-13) — Load standup / Load client call / Load planning

### DONE — Category 3: SKILL.md Standards
- [x] F-8: `/compact` at end of every module
- [x] F-10: terminal instruction standard (all 9 modules)
- [x] F-16: cumulative "what you've built" ASCII diagram (modules 2–8)

### DONE — Category 4: Module-specific SKILL.md Fixes
- [x] F-1: stage-1-intro — Stage 3 description updated for parallel architecture
- [x] F-2: module-1 — 3-stage table reframed with parallel dispatch
- [x] F-3: module-2 — removed file-open instruction, removed line refs, fixed item 4 explanation
- [x] F-4: module-2 — pre-filled answer handled
- [x] F-5: module-2 — code block removed from alongside JSON description
- [x] F-9: module-3 — `cat prompts/system.md` inline, `code prompts/system.md` VS Code path
- [x] F-12: module-4 — 3-terminal diagram added before commands
- [x] F-15: module-4 — macOS notification explained + pluggable trigger/output table
- [x] module-5 — major restructure (2-act: pluggable workflow + specialists)
- [x] module-6 — major restructure (parallel dispatch, Claude Code connection)
- [x] module-7 — step labels updated (3 steps: Analyst+Extractor / Synthesizer / Router)
- [x] module-8 — prompt file references updated (analyst.md, extractor.md, synthesizer.md)

---

## Confirmed Architecture (locked)

### Stage 1 — Chat Assistant
- `system.md` → **conversational** ("You are a meeting analyst. Answer questions about this transcript directly and naturally.")
- The key teaching moment: **a system prompt shapes what the assistant does, not the code**
- Students interact via the browser from Module 2/3 onward — no terminal testing after server starts

### Stage 2 — Workflow
- **Only**: classify → route → notify. No summary step.
- Router: classify from transcript, save transcript file to typed folder
- `other` fallback added to classifier + routing

### Stage 3 — Agentic System
```
transcript
    ↓
[Analyst ‖ Extractor]   ← parallel, independent (Promise.all)
         ↓
    [Synthesizer]         ← 4th specialist (synthesizer.md), produces final report
         ↓
      [Router]            ← Stage 2's runWorkflow() — receives transcript + report
         classifies from transcript
         saves BOTH transcript + report to typed folder:
           transcripts/team-standup/transcript.txt
           transcripts/team-standup/report.md
         notifies
```

### Specialist prompts (each is a separate file, shown in browser inspect)
| Specialist | Prompt file | Job |
|-----------|------------|-----|
| Analyst | `prompts/analyst.md` (NEW) | "You are a meeting analyst. Identify key themes and decisions." |
| Extractor | `prompts/extractor.md` (rename action_extractor.md) | "You are an action item extractor. Pull every owner, task, deadline." |
| Synthesizer | `prompts/synthesizer.md` (already exists, update) | Final structured report from themes + actions + classification |
| Classifier | `prompts/classifier.md` (add `other` fallback) | Stage 2 classification |

### Key teaching narrative
- Module 3: students edit `system.md` (conversational), see how prompts change behavior
- Module 5: show analyst/extractor/synthesizer prompts side-by-side — **same `ask()` function, different system prompt = different specialist**. Students don't write these prompts — they're pre-written and shown.
- Module 6: orchestrator wires them together, parallel dispatch introduced
- End of Module 6/7: "You've been using this pattern all week. Claude Code is an orchestrator."

### Frontend-first principle
- Server starts ONCE in Stage 1 Intro (or Module 3): `npm run server` → leave running
- All testing from Module 2 onward happens in the browser
- Terminal: background processes only (server)

---

## Execution Categories

### ✅ Already Done
- F-6: chat.js multi-line paste
- F-7: chat.js error handling

---

### Category 1 — Architecture (do first)

**F-11 (BLOCKING)**: Split system.md
- `student-output/prompts/system.md` → conversational (no rigid format)
- `templates/transcripts-to-insights/prompts/system.md` → same
- `server.js` `/api/chat` → already uses ask() which uses system.md ✓
- `stage-3/orchestrator.js` → use `synthesizer.md` for synthesis step, NOT system.md

**F-19**: Stage 3 architecture rewrite
- `student-output/stage-3/orchestrator.js` → rewrite:
  - Import analyst.md, extractor.md, synthesizer.md
  - specialist functions: analyst(), extractor(), synthesizer(), router()
  - Parallel: `const [themes, actions] = await Promise.all([analyst(transcript), extractor(transcript)])`
  - Then: `const report = await synthesizer(themes, actions)`
  - Then: `await router(transcript, report, filename)` — router saves both files
- `student-output/server.js` → update orchestrator endpoints:
  - New step1+2: run analyst+extractor in parallel → return { themes, actions }
  - New step3: synthesizer → return { report }
  - New step4: router → return { classification, outputPath }
  - (or collapse to single `/api/orchestrate` streaming endpoint)
- Create `student-output/prompts/analyst.md`
- Create `student-output/prompts/extractor.md` (based on action_extractor.md)
- Update `student-output/prompts/synthesizer.md`

**F-18**: Classifier `other` fallback
- `student-output/prompts/classifier.md` → add `other` as valid type
- `student-output/stage-2/workflow.js` → add `other` routing branch (mkdirSync for other/)

Mirror all above to `templates/transcripts-to-insights/`

---

### Category 2 — Frontend + Server

**F-20 + F-14 + F-17**: Step logs + node animations + Stage 2 improvements
- `frontend/index.html`:
  - Stage 1 panel: add "Show JSON" toggle (reveals request/response payload for Module 2)
  - Stage 1 panel: add file drop support to transcript textarea
  - Stage 2 panel: add step log (Classifying... ✓ → Routing... ✓ → Notified ✓)
  - Stage 2 panel: add file drop support
  - Stage 3 panel: update step labels for new architecture:
    - Step 1: Analyst + Extractor (parallel) 
    - Step 2: Synthesizer
    - Step 3: Router (classify + save + notify)
  - Stage 3 panel: show parallel dispatch visually (both steps fire simultaneously)
  - Stage 3 panel: add file drop support
  - Update animation sequences for Stage 3 new architecture
  - Update node inspect data for Stage 3 (specialist prompts shown correctly)
- `student-output/server.js`:
  - `/api/workflow` → return step-by-step array `{ steps: [...], classification, outputPath }`
  - `/api/orchestrate/step1` → run analyst+extractor in parallel, return both
  - `/api/orchestrate/step2` → synthesizer
  - `/api/orchestrate/step3` → router (receives transcript + report)
  - Add `/api/json-demo` endpoint for Module 2 JSON demystification

**F-13**: Multiple sample transcripts + .md support
- `.md` support already in workflow.js (line 86) ✓
- Add 2-3 additional sample transcripts to `student-output/transcripts/`:
  - `sample-client-call.txt`
  - `sample-planning-session.txt`
- Add sample buttons to frontend panels ("Load standup" / "Load client call" / "Load planning")

**F-21**: Frontend-first principle (applied via SKILL.md changes — see Cat 4)

---

### Category 3 — SKILL.md Standards (all modules)

**F-8**: Add `/compact` as final step in every module's completion flow (after commit)

**F-10**: Terminal instruction standard — EVERY terminal command must specify:
- Current terminal or new tab (with Cmd+T instruction if new)
- Exact `cd` path if directory change needed
- The command
- Apply to: ALL module SKILL.md files

**F-16**: End-of-module cumulative "what you've built" ASCII diagram
- Module 2+: add before the commit step
- Diagram grows each module — Stage 1 box first, then Stage 2, then Stage 3
- Show ← you just built this on the newest piece

---

### Category 4 — Module-Specific SKILL.md Fixes

**F-1**: `stage-1-intro/SKILL.md` — Stage 2 description cut off
- Fix: "An orchestrator calls three specialists..." → complete the sentence properly

**F-2**: `module-1/SKILL.md` — 3-stage comparison table unclear
- Reframe with clearer progression narrative

**F-3**: `module-2/SKILL.md` — walk-through section
- Remove "Let's open the file first" instruction
- Remove all line number references (Lines 22, 24-27, etc.)
- Item 4: explain what `client.messages.create()` actually does ("this is the line that reaches Anthropic's servers — where the AI thinking happens")

**F-4**: `module-2/SKILL.md` — remove pre-filled answer in "Question for you" section

**F-5**: `module-2/SKILL.md` — remove code block shown alongside JSON payload

**F-9**: `module-3/SKILL.md` — system prompt display
- Print system prompt contents inline (not collapsed tool use)
- Add: "You can also open this in VS Code: `code prompts/system.md`"

**F-12**: `module-4/SKILL.md` — 3-terminal setup diagram
- Add BEFORE any commands:
  ```
  Terminal 1 (already open) — npm run server     ← keep running
  Terminal 2 (open now)     — npm run stage-2    ← watcher, keep running  
  Terminal 3 (open now)     — npm run drop-test  ← one-shot trigger
  ```
- Name terminals explicitly, reference by name throughout

**F-15**: `module-4/SKILL.md` — macOS notification + pluggable concept
- Explain notification: "You should see a macOS notification pop up — built into your Mac, nothing to install"
- Add "what you could swap" section with 3 trigger examples + 3 output examples

**Module 5 restructure** (from architecture discussion):
- Act 1 (~5 min): workflow is pluggable — show extension options briefly
- Act 2 (~15 min): evolve chat assistant → specialists
  - Show analyst.md, extractor.md, synthesizer.md side-by-side in browser
  - "Same ask() function, different system prompt = different specialist"
  - Students do NOT write the prompts — they're pre-written and shown
  - Run each one on the sample transcript, compare outputs
- End: "You now have all the building blocks for Stage 3"

**Module 6 rewrite** (from architecture discussion):
- Lead with orchestrator-as-project-manager concept
- Show new diagram: `[Analyst ‖ Extractor] → [Synthesizer] → [Router]`
- Explain parallel dispatch: "First time in this course anything runs simultaneously"
- "What makes this agentic vs. a workflow: parallel dispatch, context passing, synthesis"
- End: "You've been using this pattern all week — Claude Code is an orchestrator"
- Update step walk-through to match new architecture

**Module 7 update**:
- Stage 1 tab: "notice this is the same system.md you edited in Module 3 — now ask it conversational questions"
- Stage 3 tab: updated step labels (Analyst+Extractor parallel, Synthesizer, Router)

**Module 8 update**:
- Reference specialist prompts (analyst.md, extractor.md, synthesizer.md) not old names
- Update personalized/ copy commands to use new prompt names

---

## Files to Change (complete list)

### Code (change in student-output/ AND templates/transcripts-to-insights/)
- `prompts/system.md` — conversational rewrite
- `prompts/analyst.md` — NEW
- `prompts/extractor.md` — NEW (based on action_extractor.md)
- `prompts/synthesizer.md` — update
- `prompts/classifier.md` — add `other` fallback
- `stage-3/orchestrator.js` — full rewrite
- `stage-2/workflow.js` — add `other` routing
- `server.js` — update orchestrator endpoints

### Frontend (single file, served from repo root)
- `frontend/index.html` — substantial update

### SKILL.md files (9 files)
- `.claude/skills/stage-1-intro/SKILL.md`
- `.claude/skills/module-1/SKILL.md`
- `.claude/skills/module-2/SKILL.md`
- `.claude/skills/module-3/SKILL.md`
- `.claude/skills/module-4/SKILL.md`
- `.claude/skills/module-5/SKILL.md` — major restructure
- `.claude/skills/module-6/SKILL.md` — major restructure
- `.claude/skills/module-7/SKILL.md`
- `.claude/skills/module-8/SKILL.md`

---

---

## Backlog — Post-Test Feedback (2026-05-04)

### F-22: Terminal cd commands never establish repo root
**Problem:** Every module says "from `student-output/`" but never tells the student how to GET there from a fresh terminal. `cd student-output` only works if you're already at the repo root. A student opening a new terminal tab is at `~` and has no idea what to type.
**Fix needed:**
- `stage-1-intro`: Add an explicit step early on where the coach runs `pwd` and tells the student their repo root path. "This is your home base for the sprint. Any time you open a fresh terminal, `cd` to this path first."
- All modules: The first terminal command should either be an absolute path OR include a "fresh terminal recovery" note: "If you just opened this terminal, run `cd [repo-root]` first."
- The commit step in every module says "from the repo root" — needs to clarify that means one level up from `student-output/`, with an actual cd command to get there.
**Files:** stage-1-intro/SKILL.md (primary), all 8 module SKILL.md files (add fresh-terminal note to first terminal command in each)
**Additional example (module-2):** "In your terminal, go into `student-output/` and run:" — student has no idea how to get to student-output from a fresh terminal. The coach knows the repo root (it's the Claude Code working directory) and should output the full path, e.g. "In your terminal: `cd ~/path/to/repo/student-output && npm run stage-1`". The solution: stage-1-intro anchors the repo root path once (coach runs `pwd` and tells the student), and every subsequent module references it as a known path.
**Key insight from Ben:** Claude Code knows the repo root (`pwd` = working directory). The coach should use that to give students the exact `cd` command for their machine, not a relative path that assumes they're already somewhere.

### F-29: Module 3 — after editing system.md, show the new contents inline before telling student to run
**Problem:** Coach edits `system.md`, shows the diff, then immediately says "now run it." Student hasn't seen the full updated file — just the diff. They should see the complete new prompt displayed inline ("Here's what it looks like now:") before being told to re-run, so they can connect "this is the prompt → this is the output I'm about to see."
**Fix:** After every `system.md` edit in module-3, the coach reads the updated file and displays the full contents inline, then says "now run it." Same pattern applies to any prompt edit in module-8 where the student changes a specialist prompt.
**File:** `.claude/skills/module-3/SKILL.md` (Step 5 Edit A and B), `.claude/skills/module-8/SKILL.md` (Step 3/4)

### F-28: Module 3 — coach should read system.md inline, not send student to terminal
**Problem:** The module says "run `cat prompts/system.md` in your terminal" to show the system prompt. But the coach (Claude Code) can just read the file directly and print it inline in the chat. Sending the student to a terminal to cat a file is unnecessary friction — they're already in the Claude Code conversation.
**Fix:** Replace the `cat prompts/system.md` terminal instruction with the coach reading the file and displaying it inline: "Here's what's inside `prompts/system.md` right now:" followed by the file contents. Student never needs to leave the chat.
**Same principle applies** to `cat prompts/analyst.md` etc. in module-5 — wherever the coach is just showing file contents, read and display inline instead of sending to terminal.
**File:** `.claude/skills/module-3/SKILL.md` (Step 4), `.claude/skills/module-5/SKILL.md` (Step 3)

### F-27: chat.js — token count promised but not shown; output needs better human-readable logging
**Problem:** Module 2/3 tells students "you should see a formatted insights report and a token count at the bottom" — but the token count doesn't appear in the interactive chat mode (`npm run stage-1` without file arg). Also, there's no visible log of what's happening (no "Reading transcript…", "Calling API…" etc.) so it just looks like it's hanging.
**Fix needed:**
- After each assistant response in interactive mode, show token usage: `[~420 tokens used — ~$0.001]`
- Add a lightweight "thinking…" log line while the API call is in flight (ties to F-25)
- Make the output feel alive and transparent, not silent — students should see evidence the system is working
- Review module-2 and module-3 SKILL.md to make sure what the coach promises to show actually appears
**Files:** `student-output/stage-1/chat.js`, `.claude/skills/module-2/SKILL.md`, `.claude/skills/module-3/SKILL.md`

### F-26: Module 3 — Should students paste a transcript or use a sample?
**Problem:** `chat.js` launched without a file argument prompts "Paste a transcript as your first message." But the module runs it WITH a file arg (`npm run stage-1 -- transcripts/sample-transcript.txt`), so the transcript is pre-loaded. These are two different modes and it's confusing which one students should use.
**Decision needed:** For Module 3, should students:
  a) Always use the pre-loaded sample (`npm run stage-1 -- transcripts/sample-transcript.txt`) — transcript is already in context, they just ask questions
  b) Paste their own or a sample manually — more hands-on but awkward in terminal
**Ben's take:** Give them a sample transcript to use, don't make them paste. Pre-load it.
**Fix:** Confirm module-3 always uses the file-arg invocation, and update the chat.js startup message to say "Transcript loaded — ask your first question" (not "Paste a transcript") when a file is passed.
**File:** `student-output/stage-1/chat.js`, `.claude/skills/module-3/SKILL.md`

### F-25: chat.js UX — errors, no thinking indicator, follow-up flow unclear
**Problem (3 parts):**
1. **"Too many connections" error** — when Anthropic API is overloaded, the error fires repeatedly on every Enter press through the retry loop. Students think something is broken. Should: show the error once, then wait silently and retry automatically (or tell the student to wait 5 seconds and try again).
2. **No "thinking" indicator** — after sending a message, there's silence while the API call runs. Students don't know if it's working. Should show something like `⏳ Thinking...` or a spinner while waiting for the response.
3. **Follow-up question flow is unclear** — "Press Enter twice to send" is non-obvious. Students aren't sure if they're in multi-line mode or if their message was sent. Consider showing a clearer prompt like `> (press Enter twice to send)` or switching to single-Enter with Shift+Enter for newlines.
**Also:** The module coach should give students 3-4 suggested follow-up questions to ask — they shouldn't have to guess what to type.
**Files:** `student-output/stage-1/chat.js`, `.claude/skills/module-3/SKILL.md`

### F-24: Module 2 — "Quick question" is a fake question with the answer right below it
**Problem:** The coach asks "which of those five steps is the AI part — the actual intelligence?" and then immediately answers it in the next line "(Step 4, right? Everything else is plumbing.)". It reads as rhetorical but awkward — the student doesn't need to answer, and the question/answer split creates a weird pause.
**Fix needed:** Remove the question format. Instead, after listing the 5 steps, the coach simply lands on step 4 directly: "Notice step 4 — `client.messages.create()`. That's the only line that reaches Anthropic's servers. Everything else is plumbing: reading files, setting up the client, printing the result. One function call is where all the AI thinking happens."
**File:** `.claude/skills/module-2/SKILL.md` — Step 2 section

### F-23: Module 1 diagram + specialist description outdated and unclear
**Problem:** The ASCII diagram in module-1 shows `ask() summary`, `ask() actions`, `workflow() classify` as three parallel specialists — this is the old architecture. It also says "the first gets a summary, the second gets actions, the third classifies the meeting and routes the file" which conflates the Stage 3 specialists with the Stage 2 router. Students won't understand why splitting into specialists is better.
**Fix needed:**
- Update the diagram to reflect actual architecture: `[Analyst ‖ Extractor]` (parallel) → `[Synthesizer]` → `[Router]`
- Clarify that Analyst + Extractor are the parallel specialists, Synthesizer combines them, Router is Stage 2's workflow reused
- The "what this produces" callout (Executive Summary, Key Themes, Action Items, classified) should map correctly to which specialist produces what
- Tighten the explanation of WHY specialists beat one big call — make it the memorable teaching moment here
**File:** `.claude/skills/module-1/SKILL.md`

### F-30: Module 3 — restore step should be done by Claude, not the student in terminal
**Problem:** The restore step (Step 5c) tells the student to run `cp prompts/system-original.md prompts/system.md` in their terminal. But this is exactly the kind of thing Claude can do directly — just read the original and write it back. Sending the student to the terminal for a file copy is unnecessary friction when the coach is already in control of the files.
**Fix:** Replace the terminal `cp` instruction with the coach restoring the file directly via Edit, then reading it back and showing the full restored contents inline: "Done — here's the original prompt restored:" followed by the file contents. Then confirm: "That's the original format back. We're ready for Module 4." Student never needs to leave the chat.

**Broader principle (F-30 extended):** Claude should handle ALL file operations directly — reading, writing, copying, editing, restoring. The only terminal commands the student should ever run are:
  1. `npm install` (once, in stage-1-intro)
  2. `npm run server` (starts the server, must run in terminal because it's a long-running process)
  3. `git add -A && git commit -m "..."` (at module wrap — could eventually be done by Claude, but clear enough as a one-liner)
Everything else — editing prompts, restoring files, copying files — Claude does directly via Edit/Write/Read. This avoids broken `cp` commands, wrong-directory errors, and unnecessary friction.
**File:** All SKILL.md files — audit for any file operation currently sent to student terminal and convert to coach-handled.

### F-31: Stage 1 frontend — system.md needs dual-mode behavior + browser needs live logs
**Problem (two parts):**
1. `system.md` says "always respond in this exact format" — so every follow-up question ("what was this about?") returns a full structured KEY THEMES report. The chat box doesn't feel like chat. But we DO want the structured format — it's the teaching artifact for Module 3. We just need it to behave differently for analysis vs. follow-up questions.
2. Students can't see what's happening behind the request — no token count, no "thinking" indicator, no log of the API call. The browser should surface this as a learning tool, not hide it.
**Fix (two parts):**
1. **Make `system.md` dual-mode:** "When given a transcript with no question, produce the structured report (KEY THEMES / ACTION ITEMS / RECOMMENDED NEXT STEP). When asked a follow-up question about the transcript, answer conversationally — refer to names, decisions, and details from the meeting." This preserves the structured output teaching moment while making the chat box feel like actual chat.
2. **Add live log strip to Stage 1 browser panel** — below each response, show: `[~420 tokens · $0.001 · 1.2s]`. This is the token count F-27 requested in terminal, but in the browser where it's more readable. Also show a "Thinking..." indicator while the call is in flight. The "Show JSON" toggle already exists — make the log strip the default-visible lightweight version of it.
**Module 3 teaching moment stays intact:** Students load the transcript → see structured output → edit the system prompt to change the format → see the change → restore. Now ALSO ask follow-up questions and see conversational responses.
**Files:** `student-output/prompts/system.md`, `frontend/index.html` (Stage 1 panel log strip + thinking indicator), `.claude/skills/module-3/SKILL.md`

### F-32: Module 3 — skip terminal agent interaction entirely, go straight to browser
**Problem:** Module 3 currently has two phases: (1) run chat.js in the terminal with a file arg, ask 4 questions, then (2) start the server and use the browser. Ben's feedback: the browser looks way better, the terminal interaction is redundant, and it creates confusion (two different modes, different prompts). Just start in the browser.
**Fix:** Restructure Module 3:
- Step 1-4 (concepts: 3 roles, system prompt) — unchanged, no terminal needed
- Step 5 (start server): `npm run server` — this is the ONE terminal command
- Step 6 onwards: everything in the browser — load standup, ask questions, edit system prompt (Claude does it), see personality change, restore (Claude does it)
- Remove Steps 1-3 that run `npm run stage-1 -- transcripts/sample-transcript.txt` in the terminal
**Benefit:** Students never interact with the agent via terminal. Browser is the interface from the first time they see the agent respond. Cleaner, better looking, consistent with Module 4+ experience.
**File:** `.claude/skills/module-3/SKILL.md` — major restructure

### F-38: Stage 3 — dynamic tool dispatch based on user instruction (design decision needed)
**Concept:** Right now the Stage 3 orchestrator always runs the same pipeline: `[Analyst ‖ Extractor] → Synthesizer → Router`. Every transcript goes through all 4 steps, every time. That's a workflow, not really an agent.

The user's proposal: the Stage 3 panel accepts a transcript + an optional instruction. The Conductor reads the instruction and decides which tools to call:
- "Just give me the summary" → Analyst only
- "What are the action items?" → Extractor only  
- "Route this to the correct folder" → Router only
- "Process this transcript" → full pipeline: Analyst + Extractor → Synthesizer → Router

This makes the Conductor a true **tool-calling agent** — it reasons about what to do, not just executes a fixed sequence. This is the actual definition of "agentic."

**Teaching value:** The capstone teaching moment of the whole course. "A workflow follows steps. An agent decides which steps to take." The same tools, different dispatch depending on what you ask for.

**CONFIRMED DIRECTION: Module 8 capstone — smart Conductor with optional instruction**

**Behavior:**
- Transcript only → Conductor runs the full pipeline automatically (Analyst + Extractor → Synthesizer → Router). No instruction needed, default behavior.
- Transcript + instruction → Conductor reads the instruction and selects which tools to call:
  - "Just route this" → Router only
  - "What are the action items?" → Extractor only
  - "Give me a summary" → Analyst only
  - "Process this transcript" → full pipeline

**How it works:** The Conductor gets a system prompt that describes its tools and the decision logic. Something like: "You have four tools: analyst, extractor, synthesizer, router. If you receive a transcript with no instruction, run the full pipeline. If you receive an instruction, reason about which tools to call and in what order." The Conductor makes one planning API call first, then dispatches.

**Stage 3 unchanged** — stays as the fixed pipeline, teaches parallel dispatch cleanly. Module 8 is where the Conductor gets a planning step and becomes truly agentic.

**Module 8 restructure:**
- Old: "edit specialist prompts for your use case"  
- New: "add an instruction input to the Conductor, watch it decide which tools to call"
- Students type an instruction alongside a real document, see the Conductor reason about which specialists to invoke
- Teaching moment: "A workflow follows steps. An agent decides which steps. You just built the second one."

**Files:** `student-output/stage-3/orchestrator.js` (add planning step), `frontend/index.html` (Stage 3 panel — add optional instruction input to Module 8 view), `.claude/skills/module-8/SKILL.md` (full restructure)

### F-37: Stage 3 diagram — Router missing as its own node
**Problem:** The Stage 3 frontend diagram shows 3 specialist nodes: Analyst, Extractor, Synthesizer. But the actual architecture has 4 steps: `[Analyst ‖ Extractor] → Synthesizer → Router`. The Router is currently buried in the Synthesizer node's description ("then calls Stage 2's router…") — it's invisible as a distinct step.
**Fix:** Add a 4th node to the Stage 3 diagram: **The Router**. 
- Label: "Stage 2 · Reused" (not a new specialist — it's Stage 2's `runWorkflow()` called again)
- Description: "Classifies meeting type from transcript. Saves transcript + report to typed folder. Sends notification."
- Position: to the right of Synthesizer, connected by arrow
- Run log should show The Router as a distinct step with its own timestamp
- The Conductor's STEPS field should read: `parallel → synthesize → route` (already does — confirm it matches)
**Teaching value:** Students see the exact 4-step sequence, and see that Stage 2 is literally reused in Stage 3. The "building blocks compose" lesson lands visually, not just in text.
**Files:** `frontend/index.html` — add Router node to Stage 3 diagram, update node positions/connections

### F-36: Module wrap — Claude should run the git commit, not the student
**Problem:** Every module ends with "run `git add -A && git commit -m 'Complete Module X: ...'` in your terminal." But Claude can run this directly — it's a bash command, not a server process. Sending the student to a terminal to do a git commit is unnecessary friction, especially when Claude already did all the file edits.
**Fix:** At module wrap, the coach:
1. Runs `git add -A && git commit -m "Complete Module X: ..."` directly (Bash tool)
2. Shows the student the output: "Committed. Here's what went in: [list of changed files]"
3. Updates CLAUDE.md checkbox (`- [ ] Module X:` → `- [x] Module X:`)
4. Tells the student what's next
Student sees: the commit happened, the box is checked, here's what changed. No terminal needed.
**Exception:** If the student has uncommitted work in a separate terminal that Claude doesn't know about — but since Claude handles all file operations (F-30), this shouldn't happen.
**Files:** All 9 SKILL.md files — replace terminal git commit step with coach-executed commit

### F-35: Module 4 — eliminate 3-terminal setup entirely, run workflow from browser
**Problem:** Module 4 currently requires 3 terminal windows: (1) server, (2) file watcher `npm run stage-2`, (3) drop-test trigger `npm run drop-test`. This is completely unnecessary — the browser already has a "Run Workflow →" button that calls `/api/workflow` directly. The file watcher is interesting as a concept but adds zero learning value when the student is staring at 3 terminals trying to remember which one to type in.
**Fix:**
- **Concept** stays the same: "An event triggers the workflow. In production this could be a file drop, a webhook, a cron job. We're going to simulate that trigger with a button click." One sentence, done.
- **Execution:** Stage 2 tab in the browser. Load a sample transcript (same sample buttons as Stage 1 — Load standup / Load client call / Load planning). Click "Run Workflow →". Watch the step log light up (Classifying → Routing → Notified). Done.
- **No `npm run stage-2` needed.** The file watcher is a background process that adds no student-facing value. The `/api/workflow` endpoint already exists and is called by the browser.
- **Upload option:** Add a file upload button OR textarea paste to Stage 2 panel so students can drop in their own transcript if they want. Same as Stage 1.
- **Only terminal command in Module 4:** `git add -A && git commit -m "..."` at the end (wrap step). Everything else is browser.
**Files:** `.claude/skills/module-4/SKILL.md` — major restructure (remove all 3-terminal setup, replace with browser walkthrough), `frontend/index.html` (Stage 2 panel — confirm sample buttons + upload exist)

### F-34: Never tell students to open a file — coach reads it and shows the relevant snippet inline
**Problem:** Module 4 says "Open student-output/stage-2/workflow.js and look at the bottom." Students shouldn't be opening code files directly — the coach (Claude) can read the file and display the relevant snippet right in the chat. This is faster, requires no file navigation, and keeps the student focused on the concept rather than the filesystem.
**Rule:** Any time a SKILL.md says "open [file]", "look at [file]", or "run `cat [file]`" to show code — replace with: coach reads the file and prints the relevant lines inline. "Here's the relevant part of `stage-2/workflow.js`:" followed by the snippet.
**Apply to:** Module 4 (workflow.js export snippet), Module 5 (analyst.md / extractor.md / synthesizer.md — three `cat` commands in a row), Module 6 (orchestrator.js walkthrough), any module that asks students to open or cat a code file. Do a full audit.
**Files:** `.claude/skills/module-4/SKILL.md`, `.claude/skills/module-5/SKILL.md`, `.claude/skills/module-6/SKILL.md`, all modules — audit for "open [file]" / "cat [file]" / "In your terminal" patterns that are just showing file contents

### F-33: Module 4 (and any module) — if you ask a question, stop and wait for the answer
**Problem:** Module 4 asks "What can a workflow do that a chat assistant can't? Take a second — what's your answer?" and then immediately continues with "Here's the shape of what you're building." The question is rhetorical in practice — the coach never actually waits for the student to respond, making it feel fake.
**Rule:** Any time the coach asks a direct question, the coach must stop there and wait. Do not continue the narrative in the same message. The student types their answer, then the coach responds to it and continues.
**Fix options (pick one per question):**
- **If the question is genuinely interactive:** End the message after the question. Wait for student input. Respond to what they said, then advance.
- **If the question is just a rhetorical setup:** Remove the question entirely. Just land on the answer: "A workflow runs without you — an event triggers it. That's the key difference."
**Apply to:** Module 4 "What can a workflow do" question, any other questions in the SKILL.md files that immediately answer themselves. Do a pass across all modules.
**File:** `.claude/skills/module-4/SKILL.md` (primary), audit all modules for same pattern

---

## Execution Order
1. Category 1 (architecture) — prompts + stage-3/orchestrator.js + server.js + workflow.js
2. Category 2 (frontend) — frontend/index.html + server.js additions
3. Category 3 (SKILL.md standards) — single pass all modules
4. Category 4 (module-specific SKILL.md) — module by module
5. Mirror code changes to templates/transcripts-to-insights/

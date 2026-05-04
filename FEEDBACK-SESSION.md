# Course Feedback — Session 2026-05-04

> Batch these up, then execute all at once. Do NOT commit this file.

---

## Feedback Items

### F-1: Stage 2 description cut off in intro slide
**Where:** `stage-1-intro` SKILL.md — the intro ASCII/text slide showing the 3 stages
**Issue:** Stage 2 description ends mid-sentence: "A file drops into a folder. AI classifies the meeting, routes the file, sends a" — text is truncated
**Fix:** Complete the sentence (e.g. "sends a notification") and ensure it fits within the display width so nothing gets cut off

---

### F-2: 3-stage comparison table is unclear
**Where:** `module-1` SKILL.md — the ASCII table showing Stage 1 / Stage 2 / Stage 3 side by side
**Issue:** The layout/meaning isn't landing — it's not obvious what the columns represent or how they connect. Students don't know what they're looking at.
**Fix:** Make it clearer how the stages relate to each other. Either simplify the table, add a short framing line before it ("Here's how each stage is different"), or replace with a format that makes the progression more intuitive.

---

### F-3: Module 2 — don't tell students to open the file; remove line number references; clarify item 4
**Where:** `module-2` SKILL.md — the "walk through the file" section
**Issue (a):** "Let's open the file first and read through it together" — we don't want them opening the file. Just present the key parts directly.
**Issue (b):** Line number references (Lines 22, Lines 24–27, Lines 34–39, etc.) are distracting and will break if the file changes. Remove them entirely.
**Issue (c):** Item 4 says "This is the doorbell" — too vague. Should explain what `client.messages.create()` is actually doing: this is the line that reaches out to Anthropic's servers and asks Claude to think. That's where the AI "thinking" happens.
**Fix:** Rewrite as "Here are the 5 key parts:" with no file-open instruction, no line numbers, and item 4 explaining what the call actually does in plain language.

---

### F-6: 🚨 BLOCKING — chat.js can't receive multi-line pasted transcripts
**Where:** `student-output/stage-1/chat.js` (and `templates/transcripts-to-insights/stage-1/chat.js`)
**Issue:** `readline` fires the callback on each newline. When a student pastes a multi-line transcript, only the first line ("Product Standup — Tuesday, April 25th") gets sent to Claude. The rest arrives as separate "messages" and Claude never sees the transcript content.
**Fix:** Change the interactive loop to collect lines until a blank line (double Enter = submit). This is the standard CLI pattern for multi-line paste. Single-line follow-up questions still work — an empty line just submits whatever was typed.

---

### F-7: chat.js crashes on API errors instead of showing a friendly message
**Where:** `student-output/stage-1/chat.js` and `templates/transcripts-to-insights/stage-1/chat.js` — the `submit()` function
**Issue:** Any API error (rate limit, bad key, network issue) throws an unhandled exception and crashes the whole process with a wall of stack trace. Students will be confused and think they broke something.
**Fix:** Wrap the API call in try/catch. On error, print a friendly one-liner ("Something went wrong — try again in a moment") and re-prompt instead of crashing.

---

### F-8: Run /compact at the end of every module
**Where:** All module SKILL.md files — the module completion step
**Issue:** The course runs ~3 hours across 8 modules in a single CC session. Context window grows large; students won't know about /compact or when to use it.
**Fix:** Add `/compact` as the final step in every module's completion flow — after checking the box and committing. Claude runs it silently, students don't need to know. The checklist in CLAUDE.md already tracks progress so Claude can orient itself after compaction.

---

### F-9: Module 3 — print system prompt contents in terminal; show how to open in VS Code to edit
**Where:** `module-3` SKILL.md — the "Here's the system prompt that was running the whole time" section
**Issue:** Claude reads the file silently (collapsed "Read 1 file" tool use) — students don't see the actual contents without expanding it. The system prompt should be printed inline in the terminal so students can read it right there. Then instead of telling them to dictate edits to Claude, show them how to open the file in VS Code (`code prompts/system.md`) and edit it themselves.
**Fix:** After reading the file, print its contents directly in the response. Then keep the existing flow of telling Claude to make edits via plain English — but also add a note: "You can also open and edit this file directly in VS Code: `code prompts/system.md`" so students know both paths exist.

---

### F-4: Module 2 — suggested response is giving away the answer
**Where:** `module-2` SKILL.md — the "Question for you" section; the suggested reply pre-fills "line 34"
**Issue:** The input field is pre-populated with the answer. Defeats the purpose of asking the question — student doesn't have to think at all.
**Fix:** Remove the suggested/pre-filled answer. Let the student type their own response.

---

### F-21: Standing principle — once the frontend is introduced, all student-facing testing moves there
**Where:** All module SKILL.md files from Module 3 onward; `module-6` SKILL.md — the "run it" step
**Issue:** Module 3 introduces the browser frontend. From that point on, every "let's test it" instruction that sends students back to a terminal command (`npm run stage-2`, `npm run stage-3 -- file.txt`, etc.) breaks the mental model. The frontend exists — use it. Sending students back to the terminal after introducing the browser feels like a step backward and signals the frontend is a demo, not a real tool.
**The rule:** After the frontend is introduced in Module 3:
- All "run it and see what happens" steps use the browser
- Terminal is for background processes only (the watcher, the server) — students start these once and leave them
- The frontend must support running all three stages: chat (Stage 1), workflow (Stage 2), agentic system (Stage 3)
- The live log panel (F-20) in the frontend replaces terminal output as the primary way to see what's happening
**This applies specifically to:** Module 5 test step, Module 6 "npm run stage-3" instruction, and any future module that currently sends students to a terminal to test something that the frontend could handle.

---

### F-20: Step-by-step logs are missing across all three stages — this is a core learning moment
**Where:** `stage-1/chat.js`, `stage-2/workflow.js`, `stage-3/orchestrator.js`; `frontend/index.html` — all stage panels; `server.js`
**Issue:** The logs that show what each step is doing — "dispatching to Analyst...", "received result...", "sending to Extractor..." — are either absent or were dropped. These are not just debugging output. They are the primary way students understand what the system is actually doing. Without them, the system is a black box.
**What good logs look like:**
- Stage 1: "Sending message to Claude... ✓ Response received (342 tokens)"
- Stage 2: "📄 New file detected: standup.txt → Classifying... ✓ team-standup → Routing to transcripts/team-standup/ → Notifying..."
- Stage 3: "Dispatching to Analyst... ✓ → Dispatching to Extractor... ✓ → Running workflow... ✓ → Synthesizing final report..."
- Include abbreviated sample JSON payloads where relevant (not full dumps — 3-5 fields) so students see what's going over the wire
**Where logs should appear:**
1. **Terminal** — already partially there in Stage 2; needs to be consistent across all stages with the same verbosity level
2. **Frontend** — a live log panel per stage tab showing each step as it fires, in real time. This is the most important fix. Students should be able to watch the system think in the browser without opening a terminal.
**The principle:** Every step should announce itself before it runs and confirm when it completes. Input and output should be visible (abbreviated). The log is not noise — it IS the lesson.

---

### F-19: Stage 3 architecture is muddled — specialists overlap with Stage 2, system isn't clearly agentic
**Where:** `stage-3/orchestrator.js`; `module-6` SKILL.md; `prompts/summarizer.md` + `prompts/action_extractor.md`; Stage 2 summary step added in Module 5
**Issues:**
1. Stage 2 already generates a summary (added in Module 5). Stage 3 then has a Summarizer specialist. Overlap — students won't understand why Stage 3 re-summarizes something Stage 2 already did.
2. The three "specialists" are just sequential API calls — that's a workflow, not an agentic system. The teaching moment is lost if students can't see what makes an orchestrator different from a pipeline.
3. The system prompt arc is broken: Stage 1 chat assistant should use a flexible/conversational system prompt. Stage 3 synthesizer should use a structured output prompt (themes, action items, report). These are two different prompts for two different purposes — currently the same `system.md` is used for both (already captured in F-11, but the Stage 3 architecture makes this worse).

**The right architecture:**
- **Stage 2**: keep it clean — classify → route → notify. Remove or make optional the summary step added in Module 5. Stage 2's job is routing, not analysis.
- **Stage 3 specialists** — each does one genuinely distinct job:
  - Specialist 1 (Analyst): "What was discussed?" → key themes, context
  - Specialist 2 (Extractor): "What needs to happen?" → action items, owners, deadlines
  - Specialists 1 and 2 are **independent** → run in parallel (this is the actual reason to have an orchestrator vs. a workflow — parallel dispatch + result merging)
  - Specialist 3: `runWorkflow()` → reuses Stage 2 to classify, route, notify (this is the composition payoff)
  - Synthesizer: takes all three outputs and writes the final report — something none of the specialists could produce alone
- **What makes it agentic**: the orchestrator passes context between specialists, runs independent ones in parallel, and synthesizes outputs into a result no single specialist could produce. That's the distinction from a workflow.

**Module 6 teaching fix:**
- Lead with the concept: "An orchestrator is a project manager. It doesn't do the work — it decides who does what, collects the results, and puts them together."
- Show the flow as a diagram, not code. Students don't need to see `import { ask }` — they need to see: transcript → [Analyst + Extractor in parallel] → [Router] → Synthesizer → report
- Never tell students to open the orchestrator file or reference line numbers (consistent with F-3)

---

### F-18: Classifier only handles 3 known types — needs an "other" / unknown fallback
**Where:** `templates/transcripts-to-insights/prompts/classifier.md`; `stage-2/workflow.js` — the routing logic
**Issue:** The classifier routes to `team-standup/`, `client-call/`, or `planning-session/`. If a student drops in their own transcript (a 1:1, a retrospective, a sales call, a board meeting), the classifier either misclassifies it or returns something the router doesn't recognize. There's no fallback — the file just doesn't get routed cleanly.
**Fix:**
1. Add an `other` / `unknown` category to the classifier prompt as an explicit valid output
2. Add a corresponding `other/` folder and routing branch in `workflow.js` so unrecognized types land somewhere instead of erroring or silently failing
3. Optionally: when Module 8 ("make it yours") has students customize the system, walk them through updating the classifier categories to match their own use case — this is where they swap `team-standup` for whatever meeting types they actually have

---

### F-17: Frontend should evolve with the system — every new step should appear in the browser, not just the terminal
**Where:** `module-5` SKILL.md; `frontend/index.html` Stage 2 tab; `server.js` workflow endpoint
**Issue:** Module 3 introduces the browser frontend as the "real" way to see the system. Module 5 adds a new pipeline step (summary generation), but the test instructions drop back to terminal — `npm run stage-2` + `npm run drop-test`. The frontend is abandoned. Students feel like: "Why did I build the frontend if I'm back in the terminal?"
**The right pattern:** When a new step is added to the pipeline, the frontend Stage 2 tab should show it. When "Run Workflow →" fires, the new 📝 Generating summary... step should appear in the step log and the summary output should render below the classification result.
**Fix:**
1. The server's `/api/run-workflow` endpoint should stream or return each step's output, including the new summary
2. The frontend Stage 2 tab should display the summary text after the classification badge
3. Module 5's test instruction should be: "Run it in the browser — click Run Workflow and watch the new summary step appear." No terminal drop-test after the frontend has been introduced.
**Principle:** The frontend is a living interface that grows as the student builds. Each module adds a capability; the browser reflects it. Terminal testing is for debugging, not the primary demo path once the frontend exists.

---

### F-16: Every module should end with a "what you've built so far" recap showing the growing system
**Where:** All module SKILL.md files — the module completion section, before the commit step
**Issue:** Students complete each module in isolation but don't see the accumulating system. By Module 4 they've built: a chat assistant, an API call, a system prompt, and now an automated pipeline — but there's no moment where it all connects visually. Students don't feel the system growing.
**Fix:** End every module (starting from Module 2) with a "Here's what you've built so far" ASCII diagram that grows each time. Example after Module 4:
```
Stage 1 — Chat Assistant    ✓
  ask() → Claude → answer

Stage 2 — Workflow          ✓  ← you just built this
  file drop → classify → route → notify

Stage 3 — Agentic System    (coming up)
  orchestrator → ask() + runWorkflow() → final report
```
The diagram should be cumulative — each module adds one more box. By Module 6 students see the full system they've assembled piece by piece. This is the "engine growing" moment that cements the learning arc.

---

### F-15: Module 4 — explain the macOS notification and expand the "pluggable" concept with real examples
**Where:** `module-4` SKILL.md — the workflow summary / "big idea" section
**Issue (a):** The notification fires as a macOS banner but is never explained. Students may not see it, may not know what triggered it, or may wonder if they need to install something. Should call it out explicitly: "You should see a macOS notification pop up in the top-right corner — that's built into your Mac, nothing to install."
**Issue (b):** The diagram says "output steps are pluggable" but doesn't make that concrete. Students can see a file-drop trigger and a Mac notification but have no mental model of what else is possible.
**Fix:** After the workflow runs, add a short "what you could swap" section:
- **Triggers you could use instead:** incoming email (Gmail watch), a Slack message, a calendar event, a form submission, a scheduled cron job
- **Outputs you could send instead:** Slack message, email via Gmail/SendGrid, a row in a Google Sheet, a webhook to Notion, an SMS
Keep it brief — 3 bullet examples each. The point is: same AI classification step in the middle, everything around it is just plumbing you can swap.

---

### F-14: Frontend Stage 2 tab — nodes don't animate, no step log, no file drop support
**Where:** `frontend/index.html` — Stage 2 tab; `server.js` — workflow API endpoint
**Issue (a):** When "Run Workflow →" is clicked, the result appears (classification badge + routed path) but the nodes on the left don't animate or light up to show the pipeline firing. Students see the output but not the process — defeats the "watch it happen" purpose of the frontend.
**Issue (b):** No step-by-step log showing what happened: "Classifying... ✓ team-standup → Routing... ✓ Saved to transcripts/team-standup/". The terminal shows this clearly; the frontend shows nothing.
**Issue (c):** Students have to paste transcript text manually. Should support dropping a `.txt` or `.md` file directly onto the textarea (or a file input button) — same way students will eventually drop files into the watcher folder. Makes the frontend feel like a real tool, not just a demo.
**Fix:**
1. Animate nodes left-to-right as each pipeline step runs (classify → route → notify)
2. Add a live log panel below the run button showing each step as it completes
3. Add file drop / file picker to the textarea so students can load a local transcript file

---

### F-13: Module 4 — "drop a few more" is a dead end; frontend should be the multi-file demo; add .md support
**Where:** `module-4` SKILL.md — "Drop a few more via npm run drop-test" instruction; `stage-2/workflow.js` — file watcher filter
**Issue (a):** "Drop a few more via npm run drop-test" sends the same sample transcript every time — student sees the same classification result on repeat. There's no way to test variety from the terminal.
**Issue (b):** The frontend (Stage 2 tab → Load sample transcript → Run Workflow) is the right place to demo multiple files, but the module doesn't set this up clearly as the intended path.
**Issue (c):** The watcher only picks up `.txt` files. Real meeting transcripts are often `.md` (exported from Notion, Obsidian, etc.). Should support both.
**Fix:**
1. Replace "drop a few more" with: do one drop-test to prove it works in the terminal, then move to the frontend for the multi-file demo
2. Add a few different sample transcripts (different meeting types) that students can load and run via the frontend Stage 2 tab to see classification variety
3. Update the file watcher in `workflow.js` to accept `.md` in addition to `.txt`

---

### F-12: Module 4 requires 3 simultaneous terminal windows — this needs a setup diagram
**Where:** `module-4` SKILL.md — the watcher + drop-test section
**Issue:** By Module 4 the student silently ends up needing 3 terminals running at the same time: server (localhost), stage-2 watcher, and drop-test trigger. This is never called out as a concept. Students drop the file before the watcher is running and nothing happens, or they try to run stage-2 in the server terminal.
**Fix:** Before any commands, show a clear terminal layout diagram:
```
Terminal 1 (already open) — npm run server     ← keep this running
Terminal 2 (open now)     — npm run stage-2    ← the watcher, keep this running
Terminal 3 (open now)     — npm run drop-test  ← one-shot trigger, run once
```
Name the terminals explicitly and reference them by name in every subsequent instruction. Also consider whether the server terminal is actually needed in Module 4 — if it isn't, tell students to close it so they only manage 2.

---

### F-10: Terminal instructions must specify directory, new vs. same window, and exact cd path — every time
**Where:** All module SKILL.md files — any step that involves running a terminal command
**Issue:** When instructions say "run `npm run server`" without specifying the directory, students run it from wherever their terminal currently is (e.g. the repo root instead of `student-output/`). They get `ENOENT: package.json not found` and have no idea why. Same problem with "open a new terminal" — if you don't say which folder to cd into, they're lost.
**Fix:** Every terminal command in every module must follow this exact format:
- State whether to use the **current terminal** or **open a new one**
- Give the exact `cd` command if they need to change directories (e.g. `cd ~/cc/aisc-cc-agent-sprint-test/student-output`)
- Then give the command to run
- If two terminals are running at the same time (e.g. watcher + chat), call them Terminal 1 and Terminal 2 and be consistent
No exceptions. This is black-and-white for every terminal step.
**Module 4 specific example:** "In your terminal (make sure you're in student-output): npm run stage-2" — student has no idea if this goes in the server terminal that's already running localhost, or a new one. It then says "open a second terminal tab" for drop-test, but never names the terminals. Result: confusion about whether to kill the server, run stage-2 in it, or open yet another tab. The correct framing would be: Terminal 1 = server (already running from Module 3), Terminal 2 = stage-2 watcher (open new tab, cd student-output, npm run stage-2), Terminal 3 = drop-test trigger (open another new tab, cd student-output, npm run drop-test). The watcher MUST be running before the drop — if you run drop-test first, the file lands in incoming/ but nothing picks it up and nothing happens. Students will think it's broken. Must be explicit that stage-2 stays running and is what "watches" — drop-test just triggers it.

---

### F-11: system.md is wrong for Stage 1 — conversational vs. structured output are two different prompts [BLOCKING: breaks Module 7] — conversational vs. structured output are two different prompts
**Where:** `templates/transcripts-to-insights/prompts/system.md`, `module-3` SKILL.md, Stage 3 orchestrator
**Issue:** The same `system.md` is used by both Stage 1 (interactive chat) and the Stage 3 synthesizer. It currently says "Always respond in this exact format" with KEY THEMES / ACTION ITEMS / RECOMMENDED NEXT STEP. That's correct for Stage 3 (pipeline, structured output), but wrong for Stage 1 — students asking "who talked the most?" get the same canned structured report instead of a direct answer.
**The right architecture:**
- Stage 1 `system.md` → conversational: "You are a meeting analyst. Answer questions about this transcript directly and naturally."
- Stage 3 synthesizer → uses structured output format (either a separate `synthesizer.md` prompt — which already exists in the repo — or the orchestrator passes its own instructions when calling `ask()`)
**Teaching arc this enables:**
- Module 3: students experience the rigid prompt, realize it won't answer follow-up questions, edit `system.md` to be conversational — that's the "system prompt shapes behavior" lesson
- Module 6: orchestrator introduces structured output as a deliberate pipeline step — students see *why* the two are different
**Fix:**
1. Change default `system.md` to be a conversational meeting analyst (no rigid format)
2. Wire Stage 3 orchestrator to use `synthesizer.md` (already in repo) for the structured insights step instead of `system.md`
3. Update `module-3` SKILL.md so the editing exercise is framed around making the assistant more useful for conversation, not just "try changing it"

---

### F-5: Module 2 — JSON request breakdown is good, but don't show the code
**Where:** `module-2` SKILL.md — the "Here's what your code is about to send over the wire" section
**Issue:** Showing `client.messages.create(...)` code alongside the JSON conflates two things. The valuable part is showing the actual JSON payload — that's the demystification moment. The code itself isn't what we want them focusing on here.
**Fix:** Keep the JSON payload block and the field-by-field breakdown exactly as-is. Remove or de-emphasize the code reference. The point is: "this is what goes over the wire" — not "here's the code that does it."

---

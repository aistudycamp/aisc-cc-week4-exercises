# Feedback Status — Cross-Reference

Live working doc tracking ALL rounds of feedback against the current state of the repo on the `student-test-run` branch. Updated 2026-05-07 (Round 3 shipped).

- **Round 1 (Nicole)**: PDF feedback from Nicole's run-through. Ben addressed most of these in a first pass before this session.
- **Round 2 (Ben's run-through)**: Ben's own end-to-end test (2026-05-06). Logged in `FEEDBACK.md` as F1–F17.
- **Round 3 (Nicole's remaining items)**: 2026-05-07. Closed N6, N10, N21, N22, N25, N26, N28, N29, N30 — agent-vocabulary consistency pass, ASCII diagrams in M2/M3/M5/M7, M5 "why specialists" upfront, M6 reframe, M7 Act 1 recap framing, "plumbing" line rewritten. Plan: `~/.claude-personal/plans/golden-churning-crystal.md`.
- **Round 4 (Ben's second run-through, frontend)**: 2026-05-07. Logged below as F18-F21. Triggered by Stage 1 browser test of the Round 2 frontend rewrite.

This doc reconciles all rounds. Use it to track what's done, what's partial, and what's still open. When an item is fully resolved AND verified by manual test, mark its status `verified`.

---

## Status legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Addressed in code/content |
| ✅✓ | Addressed AND manually verified by Ben |
| ⚠️ | Partially addressed — has a known gap |
| ❌ | Not addressed yet |
| 🔜 | Out of scope for text edits (e.g. video) |

---

## Round 1 — Nicole's feedback (from PDF)

### README

| # | Nicole's item | Status | Where / how |
|---|---------------|--------|-------------|
| N1 | README workflow vs agent table needs clearer language. Suggested wording: "Workflow — deterministic pipeline triggered by a file drop, output determined by agent (key idea: you set the steps, the agent completes a task within the workflow). Agentic system — orchestrator coordinates multiple specialists and determines the appropriate steps (key idea: agent determines course of action, you do not pre-define it)." | ✅ | `README.md:36` — added the explicit "deterministic pipeline" / "orchestrator coordinates specialists and decides which steps to take" framing. |

### Stage 1 / setup

| # | Nicole's item | Status | Where / how |
|---|---------------|--------|-------------|
| N2 | Specify whether students should open a new terminal window or do this in VS Code where they can see the file structure | ✅ | `stage-1-intro` Step 1b recommends VS Code. `module-2:67-78` (F2) explicitly tells them to open a NEW terminal tab and `cd student-output` before `npm run server`. |
| N3 | Students don't know where their API key is saved — tell them to manually go to `student-output/.env` so they see the API key there | ✅ | `stage-1-intro:149` — "open `student-output/.env` in VS Code and confirm your key is there." |
| N4 | When students compact conversation, they lose the last instruction so they're not sure what to do next | ✅ Mostly | F9 removed `/compact` from stage-1-intro, M1, M2, M4, M6 — only fires at stage boundaries (M3, M5, M7). Each `/compact` line is followed by a `Type module-X when ready` handoff so the next instruction is always the last thing they read before the compact fires. Worth manual test to confirm the experience. |

### Module 1 / "Tour the System"

| # | Nicole's item | Status | Where / how |
|---|---------------|--------|-------------|
| N5 | Clearer explanation of stages versus modules | ✅ | `README.md:36-66` lists stages (3) and modules (8) separately. `module-5:122` explicitly says "Modules 4 and 5 are both Stage 2 — Stage 2 is wider than one module. Stage 3 starts with Module 6." |
| N6 | "That's the whole shape of every agentic system you'll ever build. Different inputs, different outputs, different specialists — but always: input → parallel specialists → synthesize → output." This isn't accurate. Agent systems can be parallel OR sequential. The key is loops + rewards. Should reference the Anthropic "Building Agents" PDF in the syllabus. | ✅ | Round 3: `module-1:139` rewritten to "You just toured one common shape — parallelization plus synthesis. Real agents come in many shapes: routing, prompt chains, evaluator-optimizer loops, fully autonomous agents that loop until done." `module-6:198` rewritten to "Every multi-specialist system you'll build is some flavor of: dispatch → run specialists → combine → route. The pattern you just built is one common shape (parallelization with synthesis). Other shapes exist..." Anthropic guide linked from `concepts/what-is-an-agent.md`. |
| N7 | "The system prompt IS the agent" claim is inaccurate. Better framing: it's just better to have an agent with specialized prompt, role, specific tool access (more refined scope). | ✅ | Phrase no longer appears in any SKILL.md (grep returns nothing). Removed in your first round of fixes. |
| N8 | "Tour the system" should be more about the three stages first at a high level. Nicole got confused / didn't follow the arc. | ✅ | `module-1` Step 1 is now "The 3-stage roadmap (2 min)" — high-level upfront before the deeper systems-thinking tour. |
| N25 | Claude Code orchestrator description: "It dispatches sub-agents, agents, tools, runs things in loop, verifies work, then responds." The LOOP component is really important and missing from agent explanations throughout. | ✅ | Round 3: `module-1:139` adds "the one constant: at the heart of any real agent is a LOOP — plan, act, observe what came back, decide what's next, repeat." `module-6:198` Claude Code callout expanded: "Claude Code doesn't just dispatch once. It *loops*: dispatches sub-agents and tools, reads what came back, verifies the result, then decides what's next." |

### Module 2 / "Your First API Call"

| # | Nicole's item | Status | Where / how |
|---|---------------|--------|-------------|
| N9 | Lead with the goal: "this is the goal (chat assistant that reads raw transcripts and outputs X), this is the output by end of module" | ✅ | `module-2:10-11` "What we're building / By the end:" — goal-first. |
| N10 | Include an ASCII of the system to be built — "We're going to use the Anthropic API to send information to anthropic + our system message, and get an output" | ✅ | Round 3: `module-2` Step 2 now opens with a request/response ASCII showing system prompt + transcript + question crossing the wire to Anthropic, response coming back. Sits *before* the 5-thing walkthrough so the JSON deep-dive in Step 3 reads as "what's inside the arrow," not a wall of fields. |
| N11 | Explain what JSON is using an n8n / webhook analogy | ✅ | `module-2:41` — "When we send data to Anthropic, it goes as JSON — a structured format. If you've built in n8n or used webhooks, it's the same idea: a payload with named fields." |
| N12 | Students may not know how to follow "from inside student-output/" instruction | ✅ | F2: explicit `cd [repo-root]/student-output` instruction with EADDRINUSE troubleshooting. |
| N13 | Need a quick video showing terminal navigation, two-window setup, when to be in which folder | 🔜 | Out of scope for text edits. Worth a separate deliverable. |
| N14 | Tried to run, didn't get expected response even after pressing Enter twice in CLI | ✅ | `module-2` now uses the browser path (`npm run server` → `localhost:3000`) instead of the CLI (`npm run stage-1`). Coach guardrail at `module-2:164` makes this explicit: "The interaction happens in the browser, not the terminal." |
| N15 | Explain why students should rotate the API key at the end of the module | ✅ | `module-2:116` — "after this sprint, rotate your API key... You've been pasting the key in terminal commands during setup. Better to retire it once the sprint is done. Takes 30 seconds." |
| N21 | "The AI is the smart step. Everything else is plumbing." Too AI-feeling. Remove statements like this. | ✅ | Round 3: `module-2:37` rewritten — "That's the only line that talks to Anthropic. The rest is the wiring around it — reading the inputs, sending the request, handling the response. You'll touch every one of those steps before this sprint is over." No more "plumbing," no more AI-vs-everything-else hierarchy. |

### Module 3 / "Run the Chat Assistant"

| # | Nicole's item | Status | Where / how |
|---|---------------|--------|-------------|
| N16 | Note the local server may not be 3000 if other ports are running | ✅ | `module-3:47` "Default port is 3000 — if something else is running there, check your terminal for the actual URL." Plus EADDRINUSE recovery instructions in `module-2:92`. |
| N17 | Could not tell the change to "sarcastic" — "top three action items" isn't a question that can show tone change. Use Shakespeare or something super obvious. | ✅ | F5: now Shakespeare for Edit A AND Captain Briggs (pirate) for Edit B — distinct voices AND distinct output structures. Far more dramatic than the original sarcastic edit. |

### Module 4 / "Build the Workflow"

| # | Nicole's item | Status | Where / how |
|---|---------------|--------|-------------|
| N18 | "The big idea: a workflow runs without you. The chat assistant waits for you to type. That's the difference." Wrong — workflows can still be triggered by user (e.g., button click). The real difference is deterministic pipeline that completes a goal vs back-and-forth chat. | ✅ | `module-4:23` reframed as "It's a **workflow** — a deterministic sequence. You trigger it (in our case with a button; in production it could be a file drop, a webhook, a timer). Once it starts, it runs to completion." Matches Nicole's suggested framing. |
| N19 | Lead with the goal — "Our goal is to build a workflow that takes a transcript, user submits, and the agent classifies it and saves it in the right folder" | ✅ | `module-4:10-11` "What we're building" section. |
| N20 | "Stage 1 exports → ask() / Stage 2 exports → runWorkflow() / Stage 3 imports both, and orchestrates them." Won't be understood. | ✅ | Phrase no longer appears in any SKILL.md (grep returns nothing). Removed in first round. |
| N21 | "The AI is the smart step. Everything else is plumbing." (also flagged here) | ⚠️ | See N21 in Module 2 row above. |

### Module 5 / "Specialists & Prompts"

| # | Nicole's item | Status | Where / how |
|---|---------------|--------|-------------|
| N22 | Module 5 just starts with a description of the agents — needs an explanation/walkthrough | ✅ | Round 3: `module-5` Step 2 fully rewritten as "Why specialists" — three reasons (focus / swappable / parallel) BEFORE any prompts appear, plus an architecture ASCII showing transcript → Analyst‖Extractor → Synthesizer → Router. Step 3 now uses a Role / Output format / Rules / Why-it-differs walkthrough scaffold for each prompt. Step 4 restructured as "See it run" — students load + run the full Stage 3 pipeline and watch all three specialists fire. |
| N23 | Module 5 implies Stage 2 had no system prompt — but Stage 2 does have `classifier.md` | ✅ | `module-5:113` callout explicitly lists "Stage 2: `classifier.md` → one classifier agent." |
| N24 | "I am confused by this! I thought module 5 was Stage 3!" | ✅ | `module-5:122` explicitly: "Module 5 closes Stage 2. Modules 4 and 5 are both Stage 2 — Stage 2 is wider than one module. Stage 3 starts with Module 6." |

### Module 6 / "The Agentic System"

| # | Nicole's item | Status | Where / how |
|---|---------------|--------|-------------|
| N6 (also flagged here) | Universal shape of agent systems wrong | ✅ | See N6 row above. |
| N25 (also flagged here) | Claude Code orchestrator description missing LOOP | ✅ | See N25 row above. |

### Module 7 / "Use Your Live System + The Conductor"

| # | Nicole's item | Status | Where / how |
|---|---------------|--------|-------------|
| N26 | "Confused with what you want them to see here, that they didn't see when they were building out the previous modules" | ✅ | Round 3: Step 1 now opens with explicit two-acts framing — "Act 1 is recap... Act 2 introduces a brand-new idea — the Conductor." Steps 3, 4, 5 each lead with a "Recap callback" line that names exactly what they already built (Module 2 chat, Module 4 workflow, Module 6 orchestrator). Step 6 adds a Conductor architecture ASCII at the start of Act 2 so the new shape is visible before they run it. |
| N27 | "You touched every file behind this diagram. A week ago you'd never called an API." Remove the highlighted part — not always true. | ✅ | "A week ago you'd never called an API" no longer appears in `module-7` student-facing copy. Phrase only appears in `stage-1-intro` coach instructions (not student-facing). |

### Module 8 / "Where This Goes"

| # | Nicole's item | Status | Where / how |
|---|---------------|--------|-------------|
| N28 | "This whole time I thought stage 3 was around building an agent, but then it says 'Right now, your orchestrator always runs the same 4 steps. Every time. No matter what you give it. That's a workflow. You're about to turn it into an agent.' Confused." | ✅ | Round 3: `module-6:26` reframed — "Stage 3 is parallel orchestration... by Anthropic's definition this is still a *workflow* — it runs predefined steps every time. In Module 7 we'll add a planning step (the Conductor) that decides which steps to take, and that's the moment it crosses into actual agent territory." Now M7's reveal lands cleanly. |

### Overall structural feedback

| # | Nicole's item | Status | Where / how |
|---|---------------|--------|-------------|
| N29 | Every stage should have the same arc: What we're building / ASCII / Instructions, key components / See it in action / How to do this on your own / Summary (top 2-3 bullets) | ✅ | Round 3: ASCII diagrams added — Module 3 (chat-loop with messages[] growing), Module 5 (Stage 3 architecture: transcript → Analyst‖Extractor → Synthesizer → Router), Module 7 Step 6 (Conductor → tools fan-out). Module 5 Step 4 restructured as a dedicated "See it run" beat. All modules now have What-we're-building / ASCII / Read code / See it run / Key takeaways. |
| N30 | "Right now I don't feel the modules are streamlined so a bit hard to follow, some areas of confusion. Content is there, but we need to organize in a way that's more intuitive and easier to follow." | ✅ | Round 3: With N6 / N22 / N25 / N26 / N28 / N29 all addressed, the agent vocabulary is consistent across modules (workflow vs agent vs LOOP, all aligned with Anthropic's "Building Effective Agents"). M5 → M6 → M7 → M8 arc lands cleanly without contradiction. Manual end-to-end re-read still recommended before merge. |

---

## Round 2 — Ben's run-through (FEEDBACK.md, F1–F17)

All 21 sub-items shipped this session. See `FEEDBACK.md` for full implementation notes per row. Summary:

### Critical bugs

| ID | Item | Status | File |
|----|------|--------|------|
| F13 | Conductor always runs full pipeline (JSON parse fallback) | ✅ — verified via API smoke test | `student-output/stage-3/orchestrator.js`, `prompts/conductor.md` |
| F11 | `report.md` not written after orchestrator run | ✅ — verified via `npm run stage-3` (report file written) | Same files; was symptom of F13 |

### Frontend

| ID | Item | Status | File |
|----|------|--------|------|
| F3 | Chat tab redesign — system prompt + history in main canvas | ✅ — needs browser visual test | `frontend/index.html` |
| F3a | Replace dead "Run Agent" button with "Clear Chat" | ✅ — needs browser test | `frontend/index.html` |
| F6 | Merge `00 chat` and `01 chat assistant` into one tab | ✅ — needs browser test | `frontend/index.html` |
| F7a | Workflow tab step-by-step animation | ✅ — needs browser test | `frontend/index.html` |
| F7b | Scope run logs to originating tab | ✅ — needs browser test | `frontend/index.html` |
| F7c | Run/Clear button consolidation (Clear at top, Run at bottom) | ✅ — needs browser test | `frontend/index.html` |
| F7d | Toast fallback for completion | ✅ — needs browser test | `frontend/index.html` |
| F10 | Raise Conductor + I/O nodes to avoid overlap | ✅ — needs browser test | `frontend/index.html` |
| F12 | Conductor instruction textarea → 5 rows | ✅ — needs browser test | `frontend/index.html` |

### Multi-turn chat (closes Nicole's "messages[] grows" gap too)

| ID | Item | Status | File |
|----|------|--------|------|
| F4 | Multi-turn chat — server accepts `messages[]`, frontend maintains state | ✅ — verified via API smoke test (Claude recalled "Ben" / "Teal" across turns) | `student-output/server.js`, `student-output/stage-1/chat.js`, `frontend/index.html` |

### Module content

| ID | Item | Status | File |
|----|------|--------|------|
| F1 | stage-1-intro Stage 3 description mentions Stage 2 workflow | ✅ | `.claude/skills/stage-1-intro/SKILL.md` |
| F2 | Module 2 "open new terminal tab + cd" instruction | ✅ | `.claude/skills/module-2/SKILL.md` |
| F5 | Module 3 second system prompt = Captain Briggs (pirate) | ✅ — emojis stripped per repo style | `.claude/skills/module-3/SKILL.md` |
| F8 | Module 5 ASCII diagram Stage 2 box widened | ✅ | `.claude/skills/module-5/SKILL.md` |
| F9 | Compact prompts only at stage boundaries (M3, M5, M7) | ✅ | All module SKILL.md files |

### Module rewrites

| ID | Item | Status | File |
|----|------|--------|------|
| F14 | Module 7: genuine pause — Claude waits + verifies before proceeding | ✅ | `.claude/skills/module-7/SKILL.md` |
| F15 | Module 7: 4 distinct Conductor runs (2 scripted + 2 free-form) | ✅ | `.claude/skills/module-7/SKILL.md` |
| F16 | Module 8: trim depth — pick one job (two turnkey paths) | ✅ | `.claude/skills/module-8/SKILL.md` |
| F17 | Module 8: turnkey "build the next one" — pre-filled CLAUDE.md, folder commands, relocation step | ✅ | `.claude/skills/module-8/SKILL.md` |

---

## Round 4 — Ben's second run-through (Stage 1 browser test, 2026-05-07)

| ID | Area | Issue | Status | Notes |
|----|------|-------|--------|-------|
| F18 | Chat tab layout | Chat-in-canvas is too wide. Long lines hurt readability. | ✅ | Restored the right-side panel on stage 0, repurposed it as a live JSON view (request + response). Chat history now lives on the left at a comfortable width; raw JSON is always visible on the right — no "Show last call JSON" click required. |
| F19 | Chat tab JSON | Disclosure ("Show last call JSON ▼") added a click between the student and the JSON they were supposed to see. | ✅ | Disclosure removed entirely. JSON for every call appears in the right panel automatically (REQUEST SENT → /api/chat + RESPONSE FROM CLAUDE sections). |
| F20 | Chat log strip | "[messages: N · ~tokens · Xs]" text below the chat was almost invisible — used `--ink-4` (#D6D3D1) on a light background. | ✅ | Bumped to `--ink-2` (#78716C), font-size 10 → 11, line-height 1 → 1.3. Now legible without straining. |
| F21a | Load standup ack | First "Got it — I have the transcript" message was hardcoded — didn't reflect the system prompt. Pirate captain prompt produced plain-English ack. | ✅ | Removed the hardcoded ack. `loadChatTranscript()` now pushes the transcript and calls `/api/chat` with the current system prompt; Claude generates the first reply. Pirate prompt → pirate ack. |
| F21b | Display truncation | Long messages (transcripts, long responses) were truncated mid-output with "…(truncated for display, full text sent to Claude)". | ✅ | Truncation removed in both message bubbles (renderChatMessages) and the side-panel JSON view. Full content always visible; the chat-history container scrolls. |
| F22 | Run report tail | The run report ends with a hardcoded "Build Your Own" section (template + 3 example use cases). Feels misplaced — the report is run-specific analysis, but this is teaching content. | ✅ | Removed the Build Your Own block from `student-output/prompts/reflect.md` (and the rule that pinned it). The run report now stays focused on what THIS run revealed. Module 8 is the canonical home for "build your own" — it already has two turnkey paths (Personalize / Build New, default Council) that each produce a tailored CLAUDE.md the student can point a fresh Claude session at. |
| F23a | Server `/api/orchestrate/step1` | Endpoint always ran both Analyst + Extractor regardless of what the Conductor asked for. "Just extract" still ran the Analyst behind the scenes. | ✅ | Endpoint now accepts a `tools` array and gates each specialist independently. Frontend passes the Conductor's plan in the request. |
| F23b | Frontend animation timeline | `playAnimation()` for stage 3 played the full pipeline regardless of what actually ran — animation contradicted the Conductor decision shown in the panel. | ✅ | Tagged each Stage 3 sequence event with a `tools: [...]` array. `playAnimation(activeTools)` filters out events whose tools didn't run. Animation start moved to AFTER Conductor planning so it can be filtered. Untagged events (input arrival, output arrival) always play. |
| F23c | Steps panel labels | "Step 1 — Analyst + Extractor (parallel)" was misleading when only one specialist ran (e.g. extractor-only). | ✅ | Split into 5 steps: Step 1 Analyst / Step 2 Extractor / Step 3 Synthesizer / Step 4 Router / Step 5 Conductor reflects. When both Analyst and Extractor run they fire in parallel server-side (same fetch, Promise.all on the server) but the visible markers are separate so the student can see which one actually ran. Added a small note under the steps: "When both Analyst and Extractor run, they fire in parallel — same start, same finish. Listed separately so you can see which one ran." |
| F24 | Animation vs steps timing mismatch | Canvas animation + activity feed finished on a scripted ~11s timeline; real API calls (especially Reflect, with its huge context) took 15-25s. Result: viz "done", steps panel still ticking forward awkwardly. | ✅ | Replaced the scripted Stage 3 animation with event-driven visualization. The canvas nodes, particle flights, activity feed messages, AND step markers all advance from the same source — actual API completions. When Reflect takes 5s, the feed entry for "Run report complete" appears at 5s, not at a pre-baked 11s. Stage 1 + Stage 2 still use the original scripted animation since their single API call roughly matches scripted timing. |

---

## Still open (sorted by priority)

### Out of scope

1. **N13** — Video walkthrough for terminal navigation. Ben handling separately.

---

## ✅ GUT CHECK — what to verify before merging `student-test-run` → `main`

Ben's working from a different machine. To pick this up:

```bash
git fetch origin
git checkout student-test-run
git pull origin student-test-run
cd student-output && npm install   # only if node_modules missing
npm run server                     # leave running
# new terminal tab if needed; then open http://localhost:3000
```

### Section A — Frontend gut-checks (only one not yet visually confirmed)

Ben browser-tested most of this in Round 4. The ones still to confirm visually:

- [ ] **Stage 2 — workflow tab** — load standup → Run Workflow. Confirm: animation plays, classification result + macOS notification + toast all fire, tab cleans up when you switch away. (Round 2 changes never browser-tested for this tab specifically.)
- [ ] **Run report has no "Build Your Own" tail** (F22 verification) — Stage 3 tab, leave instruction blank, Run Orchestrator. Scroll the run report at the bottom. It should end after **Recommendations** — no template, no example use cases, no extra section. (You ran the orchestrator with instructions earlier; this needs a clean full-pipeline run to verify.)

### Section B — Module content re-reads (Round 3 wording changes)

Read each module's SKILL.md as a fresh student would. Look for: stumble points, unclear sentences, vocabulary inconsistency. Each one is ~2 minutes.

- [ ] **`module-1/SKILL.md` Step 8 (line ~139)** — does the new LOOP paragraph + Anthropic-shape framing flow naturally into the "type module-2" handoff, or does it cram too much in?
- [ ] **`module-2/SKILL.md` Step 2** — does the new request/response ASCII land before the JSON walkthrough? Does the rewritten "the rest is the wiring around it" line read naturally (no AI-marketing-speak)?
- [ ] **`module-3/SKILL.md` Step 2** — does the chat-loop ASCII ("messages[] keeps growing") add clarity or feel redundant with the three-roles explanation?
- [ ] **`module-5/SKILL.md` Step 2 ("Why specialists") + Step 3 walkthrough scaffold** — biggest restructure. Does the three-reasons frame (focus / swappable / parallel) actually answer "why three specialists" before any prompt appears? Does the Role/Output/Rules/Why-it-differs scaffold feel useful or tedious?
- [ ] **`module-6/SKILL.md` Step 1 frame + Step 7 Claude Code analogy** — does "Stage 3 is parallel orchestration… by Anthropic's definition still a *workflow*" set up M7 cleanly without confusing students who expected "agentic system"? Does the LOOP expansion in the Claude Code callout feel right?
- [ ] **`module-7/SKILL.md` Step 1 + Step 6** — does "Act 1 is recap, Act 2 introduces the Conductor" land? Is the Conductor architecture ASCII at Step 6 useful or clutter? Are the "Recap callback" lines on Steps 3/4/5 useful or annoying?
- [ ] **`module-7/SKILL.md` Step 5** — the "Watch the steps light up" example now shows 5 steps (Analyst / Extractor / Synthesizer / Router / Conductor reflects). Does the explanation that "Steps 1 and 2 fire at the exact same time — the panel splits them so you can see which one ran" land?
- [ ] **`concepts/what-is-an-agent.md` bottom** — the Anthropic Building Effective Agents link at the end. Confirm it's there and the URL is live.

### Section C — Quick correctness spot-checks (skip if no surprises in B)

- [ ] **Vocabulary consistency** — read M1 → M8 in order. Does "agent" / "workflow" / "LOOP" mean the same thing across modules? Any contradictions?
- [ ] **M5 → M6 → M7 → M8 arc** — does Stage 3 transition land? You build specialists in M5, run them as a parallel workflow in M6, learn the Conductor in M7, build your own in M8.

### How to mark this done

After you walk Sections A + B (and C if anything was fishy), tell me what stumbled and I fix. If everything reads clean, this branch is ready to merge to `main`. Sign off in this section by editing the checklist and committing, or just tell me "all green" and I'll do the merge.

---

## How to use this doc

- When you address an item, change its status to ✅ and update the "Where / how" cell with the file path.
- After manually verifying an item works as expected, change status to ✅✓.
- When new feedback arrives (Round 3), append a new section above this one. Don't overwrite — keep the history.
- When all items are ✅✓ and the branch is ready to merge, this doc can become a release note.

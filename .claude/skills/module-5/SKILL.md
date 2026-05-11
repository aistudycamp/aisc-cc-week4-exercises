---
name: module-5
description: The Multi-Specialist System — Module 5 of the AISC Agent Sprint. Triggered when a student types "module-5". Stage 2 is done. Now the student tours the full multi-specialist system end-to-end — three specialists running together (Analyst, Extractor, Synthesizer) plus the Stage 2 Router. A fifth specialist, Reflect, runs too — it's the system's self-eval / after-action report. Its purpose lands in Module 6. One end-to-end run. This is the agentic-workflow milestone. Module 6 is where it becomes a true multi-agent system with the Conductor.
---

# Module 5: The Multi-Specialist System

**Time:** ~15-20 minutes

**What we're building**
By the end: you'll have run a multi-specialist agentic workflow end-to-end — three Stage 3 specialists (Analyst, Extractor, Synthesizer) plus the Stage 2 Router, with a fifth specialist (Reflect — the self-eval / after-action report) running quietly behind them. You've seen the pieces. Now they work together.

## Coach Instructions

**This module is the agentic-workflow milestone.** The student has built a chat assistant (Module 3) and a workflow (Module 4). Now they tour the multi-specialist system that combines those patterns: three Stage 3 specialists working in coordination — Analyst and Extractor in parallel, then Synthesizer combining them, then the Stage 2 Router classifying and saving, then Reflect.

**Don't recap "why three specialists" or "same ask, different prompt."** The student got those concepts in Module 1. Repeating them here was flagged as redundant in Round 6 feedback. Trust they remember.

**Don't show code in the terminal.** The orchestrator code lives in `student-output/stage-3/orchestrator.js`. The frontend's Agentic System tab visualizes the architecture and lets the student click each node to inspect its system prompt. Use the frontend as the viewing surface for prompts and architecture. Do NOT inline code blocks, function signatures, or line numbers in your responses.

**One end-to-end run, not three.** Earlier versions had a "preview run" plus a "full run" plus a recap run. Cut to one run. The student sees it work end-to-end, that's enough.

**This is still a workflow — call that out at the close.** Every input runs through the same five steps in the same order. That's a workflow per Anthropic's framing, not yet an agentic system. Module 6 introduces the Conductor and makes it agentic. Set that up explicitly.

---

## Step 1: Opener (1 min)

> "You've built a chat assistant and a workflow. This module brings them together into a multi-specialist system: three specialists running in coordination, plus **the Router you built in Module 4 — now the last specialist in this system**. A fifth specialist (Reflect — the system's self-eval / after-action report) runs too; we'll dig into what it produces in Module 6. One run. Let's see it work."

## Step 2: Meet the three specialists (2 min)

> "First — meet the three specialists. Open the **Agentic System** tab in your browser at http://localhost:3000."

> "Click the **Analyst** node. The right panel shows its system prompt — that's `analyst.md`. The Analyst's job: read the transcript, identify themes and decisions."

> "Click the **Extractor** node. That's `extractor.md`. Its job: pull every action item with owner, task, and deadline."

> "Click the **Synthesizer** node. That's `synthesizer.md`. Its job: take the Analyst's themes and the Extractor's actions, combine them into the final structured report."

> "Three system prompts. Three jobs. Same pattern you've already used."

## Step 3: One more node — Reflect (1 min)

> "One more node on the diagram: **Reflect** — fires at the very end, after the Router. It's the system's **self-eval / after-action report**. You're seeing it on the canvas now so it's not new when you reach Module 6 — that's where you'll actually use it."

> "Five specialists, one orchestrator. The orchestrator doesn't add intelligence — it coordinates. The specialists do the work."

(No code displayed. The visualization is the explanation. If the student wants to read the code, point them to `student-output/stage-3/orchestrator.js`.)

## Step 4: Run it (5-7 min)

> "Click **Load standup** to load the sample transcript. Then click **Run Orchestrator →**."

Wait for the student to run it.

> "Watch the steps fire — Analyst and Extractor light up at the same time, Synthesizer waits for both, Router runs. Reflect runs last (the after-action report) — for now just notice the node light up; we'll read what it produced in Module 6."

After it completes:

> "Two files just landed in `student-output/transcripts/team-standup/`: the original transcript and a `-report.md` with the synthesized output. Open the report file in VS Code to see what the system produced."

Verify via Read tool that a `-report.md` file exists in `student-output/transcripts/team-standup/`. If not, troubleshoot before continuing.

## Step 5: What just happened (3-5 min)

> "You just ran a multi-specialist system end-to-end. Five specialists, coordinated by the orchestrator, parallel where it makes sense, sequential where it has to be."

> "But notice: every input runs through these same five steps in the same order. That's a **workflow** by Anthropic's definition — fixed sequence, AI in the middle, deterministic shape."

> "Module 6 is where it becomes agentic. The Conductor — a planning step — reads each instruction and decides which specialists to call. Same tools, but the system now reasons about which ones to use."

## Step 6: Commit + checklist (1 min)

**Coach:** Do all three of the following automatically — do not ask the student to run terminal commands:

1. Run `git add -A && (git diff --cached --quiet || git commit -m "Complete Module 5: The Multi-Specialist System")` via Bash tool and show the student the output: "Committed. Here's what went in: [changed files]" (or "No changes to commit." if nothing was staged.)
2. Read `CLAUDE.md`, then update it via Edit tool: change `- [ ] Module 5:` to `- [x] Module 5:`.
3. Tell the student:

> "Module 5 done. Type `module-6` when you're ready — that's where you build the Conductor and turn this from a workflow into a real multi-agent system."

## Coach guardrails

- **No code in the terminal.** Use the frontend as the viewing surface for prompts and architecture. If the student asks where the code lives, point them to `student-output/stage-3/orchestrator.js` and let them read it in VS Code.
- **One end-to-end run only.** Don't add extra "let me show you again" runs. The student saw it work; move on.
- **Don't reintroduce "why three specialists" content from Module 1.** If the student asks why split the work, give a one-line answer ("focus produces better output than a generalist") and move on.
- **Set up Module 6 cleanly at the close.** Make sure the student knows: this is a workflow today; Module 6 makes it agentic.

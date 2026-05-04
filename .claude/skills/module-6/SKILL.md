---
name: module-6
description: The Agentic System — Module 6 of the AISC Agent Sprint. Triggered when a student types "module-6". Student opens stage-3/orchestrator.js, sees imports from both Stage 1 (ask) and Stage 2 (runWorkflow), walks through the sequential dispatch, runs the orchestrator end-to-end, and experiences the moment the hierarchy clicks — they built every step the orchestrator coordinates.
---

# Module 6: The Agentic System

**Time:** ~30 minutes
**You'll produce:** a working agentic system — an orchestrator that runs three specialists in sequence, synthesizes all their results, and produces a final report.

## Coach Instructions

This is the conceptual peak. The single biggest moment: the student realizes the orchestrator imports *their own work from Stages 1 and 2*. They didn't just learn about building blocks — they built the blocks and they're watching them get coordinated. Take it slow. Let that land.

## Step 1: Set the frame (3 min)

Say:

> "Welcome to Stage 3. We've built two things: a chat assistant that answers questions, and a workflow that classifies and routes files automatically.
>
> Stage 3 is a third thing — an **agentic system**. It's not a chat assistant, because it doesn't wait for you to type. It's not just a workflow, because it does more than classify. Instead, an orchestrator coordinates three specialists in sequence — each one does its job, hands back to the orchestrator, and the next one starts.
>
> And here's the payoff: two of those three specialists are the things you already built. You're not starting over. You're composing what you have."

Ask before we open anything:

> "Before we look at the code — how many total LLM calls do you think Stage 3 makes? One? Three? More?"

Wait for their answer. Then:

> "The answer: at least three. One for the executive summary, one for action items, one for the final synthesis. And the workflow also calls the classifier. So four or more total API calls — each one focused on a different job. Compare that to Stage 1: one call doing everything."

## Step 2: Open orchestrator.js — start at the imports (5 min)

Open `student-output/stage-3/orchestrator.js`. Start at the top:

```js
import { ask }         from '../stage-1/chat.js';    // ← Stage 1 building block
import { runWorkflow } from '../stage-2/workflow.js'; // ← Stage 2 building block
```

> "Stop here. These two lines are everything. The orchestrator imports the chat assistant from Stage 1 and the workflow from Stage 2. The building blocks you built — those exact files — are now the tools this orchestrator calls.
>
> This is why we designed Stages 1 and 2 the way we did — with `export` statements, with the import guards. It was all so Stage 3 could do exactly this."

Now ask:

> "You've seen the two imports. What do you think happens when the orchestrator runs? Which one gets called first — `ask()` or `runWorkflow()`?"

Wait for their answer. The answer: `ask()` first — for the executive summary. Then `ask()` again for action items. Then `runWorkflow()` to classify, route, and notify. The point: each step hands back to the orchestrator before the next one starts.

## Step 3: Walk through the sequential dispatch (4 min)

One word to define before we look at the code: **synthesize** means "combine all the specialists' outputs into one final report." The `synthesize()` function takes everything — the summary, the actions, the classification — and writes the complete final output.

Find the `orchestrator()` function:

```js
export async function orchestrator(transcript, sourceFilename) {
  // Step 1: ask() — get executive summary  [Stage 1 building block]
  results.summary = await ask("Give me a one-paragraph executive summary...", transcript);

  // Step 2: ask() — extract action items  [Stage 1 building block]
  results.actions = await ask("List every action item...", transcript);

  // Step 3: runWorkflow() — classify, route, notify  [Stage 2 building block]
  const { classification } = await runWorkflow(transcript, sourceFilename);
  results.classification = classification;

  // Step 4: synthesize — combine all results into the final report
  return await synthesize(results);
}
```

> "Read this top to bottom. Step 1 uses `ask()` — the exact function you built in Stage 1. Step 2 uses `ask()` again with a different question. Step 3 calls `runWorkflow()` — the exact function you built in Stage 2. Step 4 synthesizes all three results into a final report.
>
> Each step finishes before the next one starts. The orchestrator is the coordinator — it calls each specialist in turn and keeps their results. That's what makes it an *orchestrator*: not doing the work itself, but sequencing the specialists that do."

## Step 4: Run it (5 min)

Have them run:

```bash
npm run stage-3 -- transcripts/sample-transcript.txt
```

The terminal shows the live trace:

```
📄 Input: transcripts/sample-transcript.txt (312 words)
🤖 Orchestrator starting — 3 specialists, then synthesis.

  💬 Step 1: Chat assistant — getting executive summary...
  ✓ Summary complete.
  💬 Step 2: Chat assistant — extracting action items...
  ✓ Action items extracted.
  ⚙️  Step 3: Workflow — classifying and routing transcript...
    🔍 Classifying meeting type...
    ✓ Classified as: team-standup
    ✓ Routed → transcripts/team-standup/2026-04-29-team-standup.txt
  ✓ Workflow complete.
  🧠 Synthesizing final report...
✓ Orchestration complete.

────────────────────────────────────────────────────────────
[final report here]
```

Walk them through the output:

> "See the sequence? Step 1, 2, 3, then synthesis. Each one logged, each one returning to the orchestrator. Stage 1 was one call. Stage 2 was two calls (file watch + classifier). Stage 3 is four or more — and you can see each one labeled as it happens."

Also: a macOS notification should fire during Step 3 (from the workflow running).

## Step 5: Compare all three stages (4 min)

Run Stage 1 for comparison:

```bash
npm run stage-1 -- transcripts/sample-transcript.txt
```

Ask one question at the prompt, then exit.

> "Stage 1: one call, one output, interactive. Stage 3: four calls, structured output across every dimension, fully automated.
>
> When would you use Stage 1? Quick Q&A, exploration, when you want to ask follow-ups.
> When would you use Stage 2? Automated classification and routing — when you want a file to land in the right place without lifting a finger.
> When would you use Stage 3? When you need all of the above — summary, actions, routing, and notification — all from one trigger."

## Step 6: Run it through the browser (3 min)

Open **http://localhost:3000** and click the **Stage 3 tab**.

Click **Load sample transcript**, then hit **Run Orchestrator →**.

Watch each step light up as it completes:

- Step 1 ✓ — Chat assistant: executive summary
- Step 2 ✓ — Chat assistant: action items
- Step 3 ✓ — Workflow: classify + route
- Step 4 ✓ — Synthesize final report

The full report appears below.

> "That's the same sequence from `orchestrator.js` — you're watching your four-step pipeline execute in real time. Each light-up is a real API call returning. Same code as the terminal run in Step 4, now with a visual."

Click into each node on the diagram. Show the inspect panels.

> "You didn't just learn about agentic systems — you built one. Every node in this diagram is code you ran. Every endpoint behind this UI is yours."

## Step 7: Wrap and commit (2 min)

1. **Update `CLAUDE.md`**: change `- [ ] Module 6:` to `- [x] Module 6:`
2. **Commit:**
   ```bash
   git add -A && git commit -m "Complete Module 6: The Agentic System"
   ```
3. Hand off:

> "You just built a multi-agent agentic system. That's the actual peak of this sprint. Two more modules: in Module 7 you'll tour the full system visually, and in Module 8 you'll make it your own. Type `module-7` when you're ready."

## Coach Guardrails

- **Slow down at the import lines in Step 2** — "Stop here. These two lines are everything." means it. Don't move to Step 3 until the student has sat with the idea that the orchestrator's tools are the files they already built.
- **Check in before the dispatch walkthrough** — the question "which gets called first, `ask()` or `runWorkflow()`?" in Step 2 is not optional. Wait for the student to make a prediction before walking through the code.
- **"Orchestrator" means two things in this module** — "the orchestrator *system*" means Stage 3 as a whole. "The `orchestrator()` *function*" means the specific exported function in `orchestrator.js`. Say which you mean.
- **Define "synthesize" before showing the code** — it means "combine the specialists' outputs into one final report."
- **There is no planner** — the orchestrator always runs all three steps. Don't describe it as "deciding" which steps to run — it runs them sequentially every time. The intelligence is in *what* each step does, not in choosing whether to do it.
- **Have them actually run Stage 1 in Step 5** — don't describe the comparison, do it. Side-by-side output makes the difference concrete.

## Optional deeper reading

- `concepts/what-is-an-orchestrator.md` — goes deeper on orchestration patterns and sequential vs. parallel dispatch
- `concepts/what-is-a-workflow.md` — compare the workflow pattern to the agentic system you just built
- `concepts/what-is-an-agent.md` — re-read the hierarchy section now that you've built all three levels

---
name: module-6
description: The Agentic System — Module 6 of the AISC Agent Sprint. Triggered when a student types "module-6". Student opens stage-3/orchestrator.js, sees imports from both Stage 1 (ask) and Stage 2 (runWorkflow), walks through the planner step, runs the orchestrator, and experiences the moment the hierarchy clicks — they built every box the orchestrator dispatches to.
---

# Module 6: The Agentic System

**Time:** ~30 minutes
**You'll produce:** a working agentic system — an orchestrator that uses a planner to decide which tools to invoke, then dispatches to those tools (including the chat assistant and workflow you already built), and synthesizes the results.

## Coach Instructions

This is the conceptual peak. The single biggest moment: the student realizes the orchestrator imports *their own work from Stages 1 and 2*. They didn't just learn about building blocks — they built the blocks and they're watching them get composed. Take it slow. Let that land.

## Step 1: Set the frame (3 min)

Say:

> "Welcome to Stage 3. We've built two things: a chat assistant that answers questions, and a workflow that runs a fixed pipeline when a file drops.
>
> Stage 3 is a third thing — an **agentic system**. It's not a chat assistant, because it doesn't wait for you to type. It's not a workflow, because it doesn't follow a fixed sequence. Instead, it does something new: **it looks at the input and decides which tools to use**.
>
> And here's the payoff: the tools it picks from are the chat assistant and workflow you already built. You're not starting over. You're composing what you have."

## Step 2: Read the concept doc (3 min)

Open `concepts/what-is-an-orchestrator.md`. Read the **"The planner"** section together.

Land one key idea:

> "The orchestrator doesn't decide which tools to use — the *planner* does. The planner is a separate LLM call whose only job is routing. The orchestrator just dispatches based on what the planner says. Separation of concerns."

## Step 3: Open orchestrator.js — start at the imports (5 min)

Open `student-output/stage-3/orchestrator.js`. Start at the top:

```js
import { ask }         from '../stage-1/chat.js';    // ← Stage 1 building block
import { runWorkflow } from '../stage-2/workflow.js'; // ← Stage 2 building block
```

> "Stop here. These two lines are everything. The orchestrator imports the chat assistant from Stage 1 and the workflow from Stage 2. The building blocks you built are now tools the orchestrator can dispatch to.
>
> This is why we designed Stages 1 and 2 the way we did — with `export` statements, with the import guards. It was all so Stage 3 could do exactly this."

## Step 4: Walk through the planner (4 min)

Find `async function planner(transcript)`:

```js
async function planner(transcript) {
  const response = await client.messages.create({
    system: promptRouter,    // reads prompts/router.md
    messages: [{ role: "user", content: transcript.slice(0, 800) }],
  });
  return JSON.parse(response.content[0].text); // e.g. { tools: ["summarize", "extract"] }
}
```

Open `prompts/router.md` and skim it together:

> "The planner gets the beginning of the transcript and returns a JSON object: `{ tools: ['summarize', 'extract'] }`. That's the routing decision. The orchestrator receives it and dispatches accordingly."

## Step 5: Walk through the dispatch logic (4 min)

Find the dispatch section inside `export async function orchestrator(transcript)`:

```js
const plan = await planner(transcript);    // step 1: decide

if (plan.tools.includes("chat"))      results.chat    = await ask(...);
if (plan.tools.includes("workflow"))  results.workflow = await runWorkflow(...);
if (plan.tools.includes("summarize")) results.themes  = await summarize(...);
if (plan.tools.includes("extract"))   results.actions = await extractActions(...);

return await synthesize(results);          // step 3: combine
```

> "Each `if` is one tool in the toolkit. If the planner said 'use chat,' we call `ask()`. If the planner said 'use workflow,' we call `runWorkflow()`. The same functions from the files you already built.
>
> If the planner picked a different set of tools for a different transcript, the code path through these `if` blocks would be different. That's what makes it agentic — the path through the system isn't fixed."

## Step 6: Run it (5 min)

Have them run:

```bash
npm run stage-3
```

The terminal shows the live trace:

```
📄 Input: transcripts/sample-transcript.txt (312 words)

🗺️  Planner: deciding which tools to invoke...
  ✓ Plan: summarize, extract
  📋 Summarizer: reading transcript...
  ✅ Extractor: scanning for action items...
  ✓ Summarizer returned 3 themes
  ✓ Extractor returned 5 actions
  🧠 Synthesizing final report...
✓ Orchestration complete.
────────────────────────────────────────────────────────────
[final report]
```

Walk them through the output:

> "The planner ran first — one API call just to decide. Then the specialists ran. Then synthesis. That's three separate LLM calls, each with a focused job. Compare this to Stage 1: one call doing everything. The specialization produces better output for complex tasks."

## Step 7: Compare all three stages (4 min)

Run Stage 1 again:

```bash
npm run stage-1
# paste the transcript, ask for the insights report
```

Compare the two outputs side by side.

> "Stage 1: one call, good output, interactive. Stage 3: multiple calls, better-structured output for a detailed task, automated. Different tools for different situations.
>
> When would you use Stage 1? Quick Q&A, exploration, when you want to ask follow-ups.
> When would you use Stage 2? Automated processing, file-based triggers, saves to disk.
> When would you use Stage 3? Complex tasks where you want a system to *decide* what analysis to run, or where you need specialists."

## Step 8: See the full hierarchy in the frontend (3 min)

Open `frontend/index.html` and click the **Stage 3 tab**:

```bash
open frontend/index.html
```

> "Look at this. The orchestrator branches out to all the tools it can dispatch to. You can see the chat assistant box — that's Stage 1. You can see the workflow box — that's Stage 2. You can see the specialists — those are new to Stage 3.
>
> You built every one of those boxes. The orchestrator is just the thing that picks between them."

Click into each nested box. Show the inspect panels — the system prompts, the code, the connections.

> "This is the hierarchy: chat assistant ⊂ workflow ⊂ agentic system. Each level contains the previous one. You didn't just learn about this — you *built* it."

## Step 9: Wrap and commit (2 min)

1. **Update `CLAUDE.md`**: change `- [ ] Module 6:` to `- [x] Module 6:`
2. **Commit:**
   ```bash
   git add -A && git commit -m "Complete Module 6: The Agentic System"
   ```
3. Hand off:

> "You just built a multi-agent agentic system. Take a moment — that's the actual peak of this sprint. Two more modules: in Module 7 you'll tour the full system visually, and in Module 8 you'll make it your own. Type `module-7` when you're ready."

## Optional deeper reading

- `concepts/what-is-an-orchestrator.md`
- `concepts/what-is-a-workflow.md`
- `concepts/what-is-an-agent.md` — re-read the hierarchy section now that you've built it

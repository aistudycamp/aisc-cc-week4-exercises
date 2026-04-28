---
name: module-7
description: See the System — Module 7 of the AISC Agent Sprint. Triggered when a student types "module-7". Student opens frontend/index.html in browser, hits Run Agent, watches the animated flow, clicks each node to see the actual system prompt and config inside. The shareable "I built this" moment.
---

# Module 7: See the System

**Time:** ~20 minutes
**You'll produce:** a screenshot of your working agentic system as a visualization, with a real understanding of what every piece of the diagram represents.

## Coach Instructions

This is the celebration module. The student already built the system in Module 6 — now they get to *see* it. Take a moment of pride before pushing forward to Module 8.

## Step 1: Set the frame (2 min)

Say:

> "Module 7. You already did the hard work in Module 6 — you built the multi-agent system. Today is about *seeing* what you built. Open the visualization, watch it run, and click into each piece to confirm: yes, that's the prompt I edited in Module 3. Yes, that's the function I read in Module 6. The diagram is just a window into the actual files on your machine."

## Step 2: Open the frontend and switch to Stage 3 (1 min)

```bash
open frontend/index.html        # Mac
# or just double-click it in your file explorer
```

It opens in the browser. **Click the "agentic system" tab** at the top (or press `3`). The canvas swaps from the simple Stage 1/2 chain to the full 5-node multi-agent diagram.

## Step 3: Tour the canvas (4 min)

Walk them through what they're looking at:

> "Look at the layout. Top row, left to right: **A transcript → The Conductor → A report.** That's the main flow. Data goes in on the left, the orchestrator processes it, the report comes out on the right.
>
> Below the orchestrator: **The Summarizer** and **The Extractor.** Those are sub-agents — helpers the orchestrator calls. Notice the dashed lines connecting them upward to the orchestrator? That's because they're 'internal calls' — the orchestrator dispatches down to them, gets answers back. The user never sees those.
>
> Five nodes. Four connections. Same architecture you built in Module 6."

Quick contrast moment — have them click the Stage 1 tab, then Stage 2, then back to Stage 3:

> "Look at this evolution. Stage 1 had 3 nodes: input, agent, output. Stage 2 had the same 3 nodes but with an automated trigger. Stage 3 keeps the same input and output, but the *agent in the middle* exploded into an orchestrator plus two sub-agents. That's the whole arc you just built — and you can see it visually here."

## Step 4: Inspect each node (8 min)

This is the killer move. Click each node and walk through what's inside.

### Click "A transcript" (input)

> "What this is: the starting point. Whenever a new file lands, the agent wakes up.
>
> **The 'recent files' section?** Those would be your real transcripts in real life. Right now it's mocked. After Module 8, when you start dropping your actual files in, this list becomes real history."

### Click "The Conductor" (orchestrator)

> "The big one. Look at 'Its instructions (system prompt).' **That's the actual content of `prompts/system.md` on your disk.** The same file you edited in Module 3. The same file `orchestrator.js` reads at runtime. Code reads the file. Frontend reads the file. One source of truth.
>
> Look at 'Connects to.' Four arrows: it reads from the transcript, dispatches to both sub-agents, writes to the report. Same architecture as the JS code."

### Click "The Summarizer"

> "Same idea. Its instructions are in `prompts/summarizer.md` — and they're shown right here. Notice this prompt is *different* from the orchestrator's. It tells Claude to return JSON, not prose. Different job, different prompt."

### Click "The Extractor"

> "Same. Different prompt. Different focused job. Returns its own JSON."

### Click "A report" (output)

> "End of the line. Where the synthesized report lands. Same `outputs/` folder Module 4's watcher writes to."

## Step 5: Run the animation (2 min)

Have them hit the **"Run Agent"** button.

Watch the 9-message animated flow play out:
1. Transcript arrives → Conductor activates
2. Conductor → dispatches to Summarizer (particle flies)
3. Summarizer → returns to Conductor
4. Conductor → dispatches to Extractor (particle flies)
5. Extractor → returns to Conductor
6. Conductor → synthesizes
7. Final report appears in the right panel

> "That animation isn't fake — it's the actual sequence of API calls your `orchestrator.js` runs. The order matches. The output panel shows what your real agent produced for the sample transcript."

## Step 6: Screenshot moment (2 min)

> "This is the share-worthy moment. Take a screenshot of the running canvas — full diagram, animated mid-flow, output panel populated. Save it.
>
> A week ago, you'd never built an agent. Right now you have a working multi-agent system you understand line-by-line *and* a clean visualization of how it's wired. That's a real artifact. Send it to your team. Drop it in the cohort Slack."

Have them save the screenshot somewhere accessible (Desktop, screenshots folder).

## Step 7: Wrap and commit (1 min)

1. **Update `CLAUDE.md`**: change `- [ ] Module 7:` to `- [x] Module 7:`
2. **Commit:**
   ```bash
   git add -A && git commit -m "Complete Module 7: See the System"
   ```
3. Hand off:

> "One module to go. The agent works on meeting transcripts — but what if it worked on *your* thing? Module 8 is where you make it yours. Type `module-8` when you're ready."

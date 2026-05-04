---
name: module-7
description: Use Your Live System — Module 7 of the AISC Agent Sprint. Triggered when a student types "module-7". Student uses all three stages through the browser interface — chat, workflow, orchestrator — in real time. The shareable "I built this" moment, now with live API calls instead of a scripted animation.
---

# Module 7: Use Your Live System

**Time:** ~20 minutes
**You'll produce:** evidence you actually ran all three stages through the browser — a screenshot of the Stage 3 tab with a real report, and the confidence that every endpoint behind that UI is yours.

## Coach Instructions

This is the celebration module. The student already built the system in Module 6 — now they get to *use* it through the browser they've had open since Module 3. The visualization is no longer an animation — it's a live interface backed by the code they wrote. Make that landing explicit.

## Step 1: Set the frame (2 min)

Say:

> "Module 7. Everything you've built — the chat assistant, the workflow, the orchestrator — is sitting behind a server you started in Module 3. The browser you've been using since then isn't just showing you a diagram. It's actually running your code.
>
> Today you use all three stages in sequence, see the architecture and the live execution side by side, and take a screenshot to prove you built this."

## Step 2: Confirm the server is running (1 min)

If the server is still running from Module 3 or 6, skip this. If not:

```bash
npm run server
```

Open **http://localhost:3000**.

## Step 3: Stage 1 tab — chat with your assistant (4 min)

Click the **Stage 1** tab. Load the sample transcript (click "Load standup"). Ask 3 questions:

```
What are the top action items?
Who looks most blocked?
Write a one-sentence Slack summary of this meeting.
```

After each response:

> "That response came from your `chat.js` → the `ask()` function → the `system.md` prompt you edited in Module 3. Same chain. Now running in a browser."

Notice the **Show JSON** button that appears after the first response — click it to see the raw request and response payload. That's the same JSON from Module 2, now visible in the browser instead of the terminal.

Click the **Chat Assistant** node on the diagram. Show the inspect panel.

> "The inspect panel shows the same system prompt file. The diagram isn't separate from the code — it's a window into it."

## Step 4: Stage 2 tab — run the workflow (3 min)

Click the **Stage 2** tab. Load the sample transcript. Hit **Run Workflow →**.

Watch the classification result appear.

> "Your `workflow.js` just fired. It classified the meeting, routed the file, sent the notification. Same pipeline you triggered with `npm run drop-test` in Module 4 — now triggered by a button click."

Try dropping a different transcript if you have one. The classification changes.

## Step 5: Stage 3 tab — run the full orchestrator (6 min)

Click the **Stage 3** tab. Load the sample transcript (click "Load standup"). Hit **Run Orchestrator →**.

Watch each step light up:

```
Step 1 ✓  Analyst + Extractor (parallel)  ← both running at the same time
Step 2 ✓  Synthesizer                     ← combines both outputs
Step 3 ✓  Router: classify + save + notify ← your runWorkflow() from Stage 2
```

The full report appears below.

> "Each one of those check marks is a real API call completing. Step 1 fires Analyst and Extractor simultaneously — that's the parallel dispatch from Module 6. Step 2 is Synthesizer. Step 3 is the workflow you built in Module 4. That's `orchestrator.js` executing in your browser."

While the orchestrator runs: click each node on the diagram and point to the code behind it.

> "Orchestrator → `stage-3/orchestrator.js`. The Analyst and Extractor nodes → `prompts/analyst.md` and `prompts/extractor.md`. The Synthesizer → `prompts/synthesizer.md`. The Router → `stage-2/workflow.js`. You touched every file behind this diagram."

## Step 6: Screenshot moment (2 min)

> "This is the share-worthy moment. Stage 3 tab, all three steps checked, report visible below. Take a screenshot."

Have them save it somewhere accessible (Desktop, screenshots folder).

> "A week ago, you'd never called an API. Right now you have a working multi-agent system running in your browser — and you built every piece of it. That's a real artifact. Send it to your team. Drop it in the cohort Slack."

## Step 7: Wrap and commit (1 min)

What you've built so far:

```
┌────────────┐   ┌────────────┐   ┌──────────────────────────────────────┐
│  Stage 1   │   │  Stage 2   │   │  Stage 3 — Agentic System             │
│  chat.js   │   │workflow.js │ → │  orchestrator.js                      │
│  ask()     │   │runWorkflow │   │  [Analyst ‖ Extractor] (parallel)     │
└────────────┘   └────────────┘   │            ↓ [Synthesizer]            │
                                  │            ↓ [Router]                 │
                                  └──────────────────────────────────────┘
```

1. **Update `CLAUDE.md`**: change `- [ ] Module 7:` to `- [x] Module 7:`
2. **Commit** — in any terminal at the repo root:
   ```bash
   git add -A && git commit -m "Complete Module 7: Use Your Live System"
   ```
3. **Run `/compact`** — type `/compact` to clear context before Module 8.
4. Hand off:

> "One module to go. The agent works on meeting transcripts — but what if it worked on *your* thing? Module 8 is where you make it yours. Type `module-8` when you're ready."

## Coach Guardrails

- **This is a celebration module** — don't rush toward Module 8. Let the student take a moment with what they built.
- **The interface IS live** — every button click is a real API call. When the student asks "is this actually running my code?" the answer is yes. Point them to the terminal logs from the server if they want proof.
- **Encourage the screenshot** — it's a real, shareable artifact. Treat Step 6 as a genuine milestone, not a formality.
- **Learning objective check before wrap** — before committing, ask the student to point to one step in the Stage 3 orchestrator panel and name the file behind it. If they can't, walk through Step 5 again for that step.

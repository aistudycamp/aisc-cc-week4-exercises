---
name: module-6
description: The Orchestrator Pattern — Module 6 of the AISC Agent Sprint. Triggered when a student types "module-6". Student opens stage-3/orchestrator.js, walks through the 4-function structure (orchestrator + 2 sub-agents + synthesizer), runs it, and sees how multi-agent dispatch produces better output than a single API call.
---

# Module 6: The Orchestrator Pattern

**Time:** ~30 minutes
**You'll produce:** a working multi-agent system. One orchestrator + two sub-agents (Summarizer + Extractor) + a synthesizer. Three system prompts. Four functions. Real agentic architecture.

## Coach Instructions

This is the conceptual peak of the sprint. Take it slow. The single biggest thing they need to *feel* is: the orchestrator never reads the transcript itself — it dispatches. That insight unlocks everything.

## Step 1: Set the frame (3 min)

Say:

> "Welcome to Stage 3. We're about to do something that sounds intimidating but is actually really simple: split your single agent into a multi-agent system.
>
> In Stage 1 you had **one agent doing everything** — read the transcript, find themes, find actions, format the report. One API call. One system prompt. It worked, but the agent was a generalist. It was okay at every step but mastered none.
>
> In Stage 3 we split that one agent into three:"

Print this:

```
                    ┌────────────────────┐
                    │  THE ORCHESTRATOR  │
                    │   "I decide who    │
                    │    does what"      │
                    └─────────┬──────────┘
                              │
           ┌──────────────────┴──────────────────┐
           │                                     │
           ▼                                     ▼
    ┌──────────────┐                    ┌──────────────┐
    │   SUMMARIZER │                    │   EXTRACTOR  │
    │ finds themes │                    │ finds actions│
    │  (returns    │                    │   (returns   │
    │    JSON)     │                    │     JSON)    │
    └──────┬───────┘                    └──────┬───────┘
           │                                   │
           └─────────────┬─────────────────────┘
                         │
                         ▼
                ┌─────────────────┐
                │   SYNTHESIZER   │
                │  combines both  │
                │  into the final │
                │     report      │
                └─────────────────┘
```

> "Three roles. Three system prompts. Each one focused. The orchestrator decides what's needed and dispatches. The specialists do the focused work. The synthesizer combines.
>
> The big idea: **the orchestrator never reads the transcript itself.** It just dispatches. The specialists return structured JSON. The synthesizer composes the prose. Clean separation."

## Step 2: Read the orchestrator concept (3 min)

Open `concepts/what-is-an-orchestrator.md` together. Read it. The two beats to land:

1. **The orchestrator is the choreographer**, not the worker. It decides who does what.
2. **Each agent gets its own system prompt.** Three agents = three prompts.

## Step 3: Open the code (5 min)

Open `student-output/stage-3/orchestrator.js`. Walk through the 4 functions.

### `summarize(transcript)`
> "Reads a transcript, returns `{ themes: [...] }` as JSON. Notice it has its own system prompt — `prompts/summarizer.md`. It's a focused little agent that does one thing."

### `extractActions(transcript)`
> "Same shape. Reads a transcript, returns `{ actions: [...] }` as JSON. Different system prompt — `prompts/action_extractor.md`. Different focused job."

### `synthesize({ themes, actions })`
> "Takes the JSON from the two specialists and combines them into the final markdown report. Uses the `prompts/system.md` prompt. This is the third API call."

### `orchestrator(transcript)`
> "The conductor. Three lines:
>
> ```js
> const [themes, actions] = await Promise.all([summarize(t), extractActions(t)]);
> return await synthesize({ themes, actions });
> ```
>
> See that `Promise.all`? Both sub-agents run **in parallel**. They don't depend on each other, so we don't wait for one before starting the other. The whole thing finishes faster."

## Step 4: Run it (4 min)

Have them run:

```bash
npm run stage-3
```

The terminal will print the live trace:

```
🎼 Orchestrator: dispatching specialists in parallel...
  📋 Summarizer: reading transcript...
  ✅ Extractor: scanning for action items...
  ✓ Summarizer returned 3 themes
  ✓ Extractor returned 5 actions
  🧠 Synthesizing final report...
✓ Orchestration complete.
────────────────────────────────────────────────────────────
**KEY THEMES**
- ...
```

Watch the order of the log lines. Both specialists start at the same time. They finish in whatever order they finish (often near-simultaneously). The synthesizer only runs after both are done.

> "See that? Two API calls running simultaneously. Then a third when both are done. Three calls in the time of about 1.5 calls."

## Step 5: Compare to Stage 1 (4 min)

Now compare:

> "Run `npm run stage-1` again. Look at the report it produces. Then run `npm run stage-3`. Look at the report it produces. Notice anything?"

Give them a moment. Then point out:

> "The Stage 3 output is **noticeably better** for this kind of task. Why? Because each step had a focused agent with a focused prompt. The Summarizer wasn't trying to also find action items. The Extractor wasn't trying to also write prose. The Synthesizer wasn't trying to also analyze the transcript. Each step was someone's only job.
>
> This is the payoff of the orchestrator pattern. **Specialization beats generalization** when the work has multiple distinct sub-tasks."

## Step 6: Look at the JSON shapes (4 min)

Open `prompts/summarizer.md` and `prompts/action_extractor.md` together. Show them:

> "Both of these prompts say 'return ONLY a JSON object.' Why? Because the orchestrator needs *machine-readable structure*, not prose. The Summarizer doesn't write a paragraph; it returns:
>
> ```json
> { "themes": [{ "label": "...", "summary": "..." }, ...] }
> ```
>
> Then in `orchestrator.js` we have:
>
> ```js
> const result = parseJson(response.content[0].text);
> ```
>
> That's where the JSON gets parsed. We use `parseJson` (a small helper that strips markdown fences if Claude adds them) and turn the string into a real JavaScript object. Now the orchestrator can pass `{ themes, actions }` to the synthesizer.
>
> **Sub-agents return JSON. The orchestrator returns prose.** Easy way to remember it."

## Step 7: When NOT to use this pattern (3 min)

> "Last thing. Don't reach for the orchestrator pattern for everything. If your task is small and unified, one agent with a good prompt beats three. The pattern wins when:
>
> - The work splits cleanly into sub-tasks (themes vs. actions)
> - Sub-tasks can run in parallel (don't depend on each other)
> - You want each step to use a different prompt or even a different model
>
> If you'd just be writing the same prompt three times, don't bother. **Compose, don't conflate.**"

## Step 8: Wrap and commit (2 min)

1. **Update `CLAUDE.md`**: change `- [ ] Module 6:` to `- [x] Module 6:`
2. **Commit:**
   ```bash
   git add -A && git commit -m "Complete Module 6: The Orchestrator Pattern"
   ```
3. Hand off:

> "You just built a multi-agent system. Take a beat — that's the actual peak of this sprint. The next two modules are about *seeing* what you built and *making it yours*. Type `module-7` when you're ready."

## Optional deeper reading

- `concepts/what-is-an-orchestrator.md`
- `examples/example-transcripts-insights.md`

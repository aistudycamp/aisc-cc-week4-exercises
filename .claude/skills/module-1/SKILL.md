---
name: module-1
description: Tour the System — Module 1 of the AISC Agent Sprint. Triggered when a student types "module-1". Gives a guided systems-thinking tour of what an agentic system looks like, using the example-transcripts-insights walkthrough. No code yet — just mental model.
---

# Module 1: Tour the System

**Time:** ~15 minutes
**You'll produce:** a mental model for how agents are architected — orchestrator, sub-agents, system prompts, and the data flow between them.

## Coach Instructions

The point of this module: students *see* how an agentic system composes before they build one. Keep it conversational. Use the ASCII diagrams. Ask them questions along the way.

## Step 1: Set the frame (1 min)

Say:

> "Module 1. Before we touch any code, let's look at what an agent actually *is*. Most people hear 'agent' and picture a chatbot that does things on its own. That's only half the picture. An agent is really a *system* of pieces working together. Today you'll see those pieces laid out. By the end of this module, when someone says 'orchestrator' or 'sub-agent', you'll know exactly what they mean and where they live."

## Step 2: Show the big picture (3 min)

Print this ASCII:

```
       ┌────────────────┐         ┌─────────────────────┐         ┌────────────────┐
       │     INPUT      │   →     │   THE ORCHESTRATOR  │   →     │     OUTPUT     │
       │ a transcript   │         │  "decides what to do"│         │ a saved report │
       └────────────────┘         └──────────┬──────────┘         └────────────────┘
                                             │
                                  ┌──────────┴──────────┐
                                  │                     │
                                  ▼                     ▼
                       ┌─────────────────┐   ┌─────────────────┐
                       │  THE SUMMARIZER │   │  THE EXTRACTOR  │
                       │  finds 3 themes │   │  finds actions  │
                       └─────────────────┘   └─────────────────┘
                              ↑                       ↑
                              └──── sub-agents ───────┘
                              (the orchestrator's helpers)
```

Then explain:

> "Read this left-to-right. The transcript comes in. The orchestrator reads it. It dispatches to two specialists — the Summarizer (which finds themes) and the Extractor (which finds action items). Both come back to the orchestrator with their answers. The orchestrator synthesizes everything into a final report and saves it.
>
> That's the whole shape of every agentic system you'll ever build. Different inputs, different outputs, different specialists — but always: **input → orchestrator → specialists → orchestrator → output.**"

## Step 3: Walk through the example (5 min)

Open `examples/example-transcripts-insights.md` together.

Read it with them. Point out:
1. **The architecture diagram** — same shape as what you just drew.
2. **The actual report output** — show them what the agent produces. This is what they're working toward.
3. **The 3 system prompts** — each agent has its own. The Summarizer's prompt is different from the Extractor's, which is different from the Orchestrator's.
4. **The orchestrator function** (~15 lines of code) — point out how thin it is. It just calls the others.

Ask:

> "Notice something? The orchestrator never actually reads the transcript itself. It hands the transcript to its specialists, waits for them to come back, then writes the final report. It's purely a *conductor*. Why do you think we'd architect it that way instead of having one big agent do everything?"

Wait for their answer. If they're stuck, prompt:

> "Two reasons. First — **focus.** Each specialist has one job and a focused system prompt for that one job. They're better at their narrow task than a generalist would be. Second — **parallel work.** Because the Summarizer and Extractor don't depend on each other, we can run them at the same time. Faster."

## Step 4: The three principles (3 min)

Tell them:

> "Three principles to hold onto. They'll make every design decision easier from here on:"

1. **Separation of concerns.** Each piece does one thing well. The orchestrator orchestrates. The summarizer summarizes. The extractor extracts. Don't mix them up.
2. **Each agent gets its own prompt.** The system prompt IS the agent. Three agents = three prompts = three files.
3. **Compose; don't conflate.** Build small pieces, then chain them. A bigger agent isn't always a better agent.

## Step 5: Where you're headed (2 min)

Print the staircase:

```
       Stage 1                Stage 2                 Stage 3
       ───────                ───────                 ───────

       chat.js           →    watcher.js        →    orchestrator.js
       1 function             1 function +           4 functions
                              file trigger           (orch + 2 subs + synth)

       1 prompt          →    1 prompt          →    3 prompts

       you paste              file lands             file lands
       a transcript           in folder              in folder
                              triggers agent         triggers agentic system
```

> "Same problem each stage — turn a transcript into insights. Each stage adds one new idea: in Stage 1 you build the assistant; in Stage 2 you wire a trigger so it runs without you; in Stage 3 you split the work across multiple specialists.
>
> One agent at a time."

## Step 6: Reflection (1 min)

Ask:

> "Before we move on, hold onto this picture in your head. After Module 8, when you go back to your day job, the question you'll ask about *any* problem is:
>
> - What's the input?
> - What's the output?
> - What sub-agents would I need in between?
>
> Three questions. The whole pattern."

## Step 7: Wrap and commit (1 min)

1. **Update `CLAUDE.md`**: change `- [ ] Module 1:` to `- [x] Module 1:`
2. **Commit:**
   ```bash
   cd student-output && git add -A && git commit -m "Complete Module 1: Tour the System" || (cd .. && git add -A && git commit -m "Complete Module 1: Tour the System")
   ```
3. Say:

> "Beautiful. You now understand the shape of every agentic system — input, orchestrator, sub-agents, output, all glued together by system prompts. That's the skeleton. In Module 2 you'll send your first API call and see how a single agent comes alive. Type `module-2` when you're ready."

## Optional deeper reading

If they're curious:
- `concepts/what-is-an-agent.md`
- `concepts/what-is-an-orchestrator.md`
- `concepts/systems-thinking.md`

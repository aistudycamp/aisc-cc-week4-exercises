---
name: module-1
description: Tour the System — Module 1 of the AISC Agent Sprint. Triggered when a student types "module-1". Gives a guided systems-thinking tour of what an agentic system looks like, using the example-transcripts-insights walkthrough. No code yet — just mental model.
---

# Module 1: Tour the System

**Time:** ~15 minutes
**You'll produce:** a mental model for how agents are architected — orchestrator, specialists, system prompts, and the data flow between them.

## Coach Instructions

The point of this module: students *see* how an agentic system is structured before they build one. Keep it conversational. Use the ASCII diagrams. Ask them questions along the way.

## Step 1: Set the frame (1 min)

Say:

> "Module 1. Before we touch any code, let's look at what an agent actually *is*. Most people hear 'agent' and picture a chatbot that does things on its own. That's only half the picture. An agent is really a *system* of pieces working together. Today you'll see those pieces laid out. By the end of this module, when someone says 'orchestrator' or 'specialist', you'll know exactly what they mean and where they live."

## Step 2: Show the big picture (3 min)

Print this ASCII:

```
       ┌────────────────┐         ┌──────────────────────┐         ┌────────────────┐
       │     INPUT      │   →     │   THE ORCHESTRATOR   │   →     │     OUTPUT     │
       │ a transcript   │         │  "coordinates the    │         │ a saved report │
       └────────────────┘         │   sequence"          │         └────────────────┘
                                  └──────────┬───────────┘
                                             │
                              ┌──────────────┼──────────────┐
                              ↓              ↓              ↓
                         ┌─────────┐  ┌──────────┐  ┌──────────┐
                         │  ask()  │  │  ask()   │  │workflow()│
                         │ summary │  │ actions  │  │ classify │
                         └─────────┘  └──────────┘  └──────────┘
                              ↓              ↓              ↓
                         └──────────────────────────────────┘
                                     back to orchestrator
                                     → synthesize → output
```

Then explain:

> "Read this left-to-right, then top-to-bottom. The transcript comes in. The orchestrator coordinates three specialists in sequence: the first gets a summary, the second gets action items, the third classifies the meeting and routes the file. Each specialist finishes and hands its result back. The orchestrator combines everything into a final report.
>
> That's the whole shape of every agentic system you'll ever build. Different inputs, different outputs, different specialists — but always: **input → orchestrator → specialists → synthesize → output.**"

## Step 3: Walk through the example (4 min)

Open `examples/example-transcripts-insights.md` together:

```bash
cat examples/example-transcripts-insights.md
```

Read it with them. Point out:
1. **The actual report output** — show them what the agent produces. Key themes, action items, recommended next step. This is what they're working toward.
2. **The three specialists** — the summary came from one `ask()` call, the action items from another, the classification from the workflow.

Ask:

> "Notice something? This report is more structured than you'd get from one ChatGPT message. Why do you think splitting it into specialists produces better output?"

Wait for their answer. If they're stuck, prompt:

> "Two reasons. First — **focus.** Each specialist has one job and a focused system prompt for that one job. They're better at their narrow task than a generalist would be. Second — **the orchestrator decides the sequence.** It can run things in order when each step feeds the next, or it could run some things in parallel if they're independent. The architecture is flexible."

## Step 4: The three principles (3 min)

Tell them:

> "Three principles to hold onto. They'll make every design decision easier from here on:"

1. **Separation of concerns.** Each piece does one thing well. The orchestrator coordinates. The specialists specialize. Don't mix them up.
2. **Each agent gets its own prompt.** The system prompt IS the agent. Three specialists = three prompts = three jobs.
3. **Compose; don't conflate.** Build small pieces, then chain them. A bigger agent isn't always a better agent.

## Step 5: Where you're headed (2 min)

Print the staircase:

```
       Stage 1                Stage 2                 Stage 3
       ───────                ───────                 ───────

       chat.js           →    workflow.js       →    orchestrator.js
       Ask questions          Drop a file →          Coordinates
       get answers back       AI classifies →        three steps in
                              routes file →           sequence →
                              sends notification      final report

       1 prompt          →    1 prompt          →    1 shared prompt
                              (classifier)           + synthesizer

       you paste              file lands             file lands
       a transcript           in incoming/           in incoming/
                              triggers pipeline      triggers full system
```

> "Same problem each stage — turn a transcript into insights. Each stage adds one new idea: in Stage 1 you build the assistant; in Stage 2 you wire a trigger so it runs without you; in Stage 3 you split the work across specialists and the orchestrator sequences them.
>
> One stage at a time."

## Step 6: Find the example output (2 min)

You already opened the example file. Ask:

> "Find the **KEY THEMES** section in this example. How many themes are there?"

Wait for them to look.

> "Good. Each of those themes came from the first `ask()` call in the orchestrator. The action items came from the second one. The meeting type came from the workflow. Three specialists. One orchestrator that put it all together."

## Step 7: Reflection (1 min)

Ask:

> "Before we move on, hold onto this picture in your head. After Module 8, when you go back to your day job, the question you'll ask about *any* problem is:
>
> - What's the input?
> - What's the output?
> - What specialists would I need in between?
>
> Three questions. The whole pattern."

## Step 8: Wrap and commit (1 min)

1. **Update `CLAUDE.md`**: change `- [ ] Module 1:` to `- [x] Module 1:`
2. **Commit:**
   ```bash
   git add -A && git commit -m "Complete Module 1: Tour the System"
   ```
3. Say:

> "You now understand the shape of every agentic system — input, orchestrator, specialists, synthesize, output. That's the skeleton. In Module 2 you'll send your first API call and see how a single specialist comes alive. Type `module-2` when you're ready."

## Coach Guardrails

- **This module is intentionally code-free** — don't open any files in `student-output/`. The mental model comes first.
- **Wait for the student's answer** to "Why do specialists produce better output?" in Step 3 before giving the answer. Their attempt matters more than getting it right.
- **Print the ASCII diagrams** — don't describe them, show them. The visual anchor is the whole point.
- **Parallel vs. sequential is a dispatch strategy, not the reason to split** — the reason to split is focus (one job, one system prompt). Mention that the orchestrator decides if things run in sequence or in parallel — in this course they run in sequence, and that's the right call here.

## Optional deeper reading

Just ask me: *"Read concepts/what-is-an-agent.md and walk me through it."* I'll pull it up and explain it.

- `concepts/what-is-an-agent.md` — the three-level hierarchy (chat assistant → workflow → agentic system) in detail
- `concepts/what-is-an-orchestrator.md` — deeper on how orchestrators coordinate specialists
- `concepts/systems-thinking.md` — systems-thinking vocabulary for talking about agents

---
name: module-1
description: Tour the System — Module 1 of the AISC Agent Sprint. Triggered when a student types "module-1". Gives a guided systems-thinking tour of what an agentic system looks like, using the example-transcripts-insights walkthrough. No code yet — just mental model.
---

# Module 1: Tour the System

**Time:** ~15 minutes

**What we're building**
By the end: you'll have a mental model of the full 3-stage arc — what each stage builds, why it exists, and how they connect. No code. Just the shape of what you're about to build.

## Coach Instructions

The point of this module: students *see* how an agentic system is structured before they build one. Keep it conversational. Use the ASCII diagrams. Ask them questions along the way.

## Step 1: The 3-stage roadmap (2 min)

Before anything else, show them the full arc:

```
       Stage 1                Stage 2                 Stage 3
       ───────                ───────                 ───────

       chat.js           →    workflow.js       →    orchestrator.js
       You ask                A file drops in.       An orchestrator runs
       questions.             AI classifies +        Analyst + Extractor
       Get answers back.      routes + notifies.     in parallel →
                              Automatic.             Synthesizer →
                                                     Router (saves + notifies).

       1 system prompt        1 classifier           3 specialist prompts
       (meeting analyst)      prompt                 (analyst, extractor,
                                                     synthesizer)

       Interactive.           Event-triggered.       Fully automated.
       You drive it.          File drops in,         One input →
                              pipeline runs.         full structured report.
```

> "Same problem each stage — turn a transcript into insights. Each stage adds one new idea: in Stage 1 you build the assistant; in Stage 2 you wire a trigger so it runs without you; in Stage 3 you split the work across specialists and an orchestrator coordinates them.
>
> One stage at a time."

## Step 2: Set the frame (1 min)

Say:

> "Module 1. Before we touch any code, let's look at what an agent actually *is*. Most people hear 'agent' and picture a chatbot that does things on its own. That's only half the picture. An agent is really a *system* of pieces working together. Today you'll see those pieces laid out. By the end of this module, when someone says 'orchestrator' or 'specialist', you'll know exactly what they mean and where they live."

## Step 3: Show the big picture (3 min)

Print this ASCII:

```
┌─────────────────────────────────────────────────────────────────────┐
│  Stage 3 — Agentic System                                           │
│                                                                      │
│  transcript                                                          │
│      ↓                                                               │
│  [Analyst ‖ Extractor]   ← parallel specialists (Promise.all)       │
│           ↓                                                          │
│      [Synthesizer]        ← combines themes + actions into report    │
│           ↓                                                          │
│        [Router]           ← Stage 2 reused: classify + save + notify│
└─────────────────────────────────────────────────────────────────────┘
```

Then explain:

> "Read this top-to-bottom. The transcript comes in. Two specialists — Analyst and Extractor — read it at the same time in parallel. The Analyst finds key themes and decisions. The Extractor pulls every action item. They run simultaneously — same input, different specialists, different jobs, done at the same time.
>
> Then Synthesizer takes both results and combines them into the final structured report. Finally, Router — which is just Stage 2 reused — classifies the meeting, saves the file, and sends a notification.
>
> That's the shape of what you'll build this sprint. It's one powerful pattern. Real agentic systems take many forms — but this one teaches you the core building blocks: a system prompt to shape behavior, parallel dispatch to run specialists simultaneously, and a synthesizer to combine results."

## Step 4: Walk through the example (4 min)

Read the example file and show them its contents. Use the Read tool on `examples/example-transcripts-insights.md` and print the relevant sections inline.

Point out:
1. **The actual report output** — show them what the agent produces. Key themes, action items, recommended next step. This is what they're working toward.
2. **The specialists** — the themes came from the Analyst, the action items came from the Extractor, the classification from the Router.

Ask:

> "Notice something? This report is more structured than you'd get from one ChatGPT message. Why do you think splitting it into specialists produces better output?"

Wait for their answer.

If they're stuck, prompt:

> "Three reasons. First — **parallel = faster.** Both Analyst and Extractor work at the same time, not one after the other. Second — **focus = better output.** Each prompt is laser-focused on one job. The Analyst isn't distracted by action items; the Extractor isn't guessing at themes. Third — **composable = reusable.** The Extractor can be used without the Analyst. The Router already existed in Stage 2 — we didn't rewrite it, we reused it. Each piece is independent."

## Step 5: The three principles (3 min)

Tell them:

> "Three principles to hold onto. They'll make every design decision easier from here on:"

1. **Separation of concerns.** Each piece does one thing well. The orchestrator coordinates. The specialists specialize. Don't mix them up.
2. **Each agent gets its own prompt.** The system prompt shapes what the agent does — it defines its role, its output format, its rules. Change the prompt, change the agent. Three specialists = three prompts = three jobs.
3. **Compose; don't conflate.** Build small pieces, then chain them. A bigger agent isn't always a better agent.

## Step 6: The specialists in the example (2 min)

Look back at the KEY THEMES section in the example output shown earlier. Point out:

> "Each of those themes came from the Analyst specialist — one focused prompt, one job. The action items below it came from the Extractor — a different prompt, running in parallel. The meeting classification at the top came from the Router. Three specialists. One orchestrator that put it all together."

## Step 7: Reflection (1 min)

Say:

> "Before we move on, hold onto this picture in your head. After Module 8, when you go back to your day job, the question you'll ask about *any* problem is:
>
> - What's the input?
> - What's the output?
> - What specialists would I need in between?
>
> Three questions. The whole pattern."

## Key takeaways

- Three stages, each uses the previous as a building block: chat → workflow → agentic system
- Every specialist is a system prompt — that's the whole pattern of building agents
- Stage 3 is Stage 1 and Stage 2 wired together

## Step 8: Wrap and commit (1 min)

1. **Update `CLAUDE.md`**: change `- [ ] Module 1:` to `- [x] Module 1:` (Edit tool)
2. **Commit** — run via Bash tool from the repo root:
   ```bash
   git add -A && git commit -m "Complete Module 1: Tour the System"
   ```
   Show the student the changed files in the commit output.
3. Say:

> "You just toured one common shape — parallelization plus synthesis. Real agents come in many shapes: routing, prompt chains, evaluator-optimizer loops, fully autonomous agents that loop until done. The one constant: at the heart of any real agent is a LOOP — plan, act, observe what came back, decide what's next, repeat. The pipeline you're about to build runs once and stops; that's a workflow with parallel dispatch. We're starting there because it's the simplest place to see all the moving parts. Read `concepts/what-is-an-agent.md` if you want the full picture.
>
> In Module 2 you'll send your first API call and see how a single specialist comes alive. Type `module-2` when you're ready."

## Coach Guardrails

- **This module is intentionally code-free** — don't open any files in `student-output/`. The mental model comes first.
- **Read the example file via Read tool** — don't send the student to the terminal to `cat` it. Print the relevant sections inline in the chat.
- **Wait for the student's answer** to "Why do specialists produce better output?" in Step 3 before giving the answer. Their attempt matters more than getting it right.
- **Print the ASCII diagrams** — don't describe them, show them. The visual anchor is the whole point.
- **Parallel vs. sequential is a dispatch strategy, not the reason to split** — the reason to split is focus (one job, one system prompt). Mention that the orchestrator runs Analyst and Extractor in parallel (Promise.all) — both work simultaneously.

## Optional deeper reading

Just ask me: *"Read concepts/what-is-an-agent.md and walk me through it."* I'll pull it up and explain it.

- `concepts/what-is-an-agent.md` — the three-level hierarchy (chat assistant → workflow → agentic system) in detail
- `concepts/what-is-an-orchestrator.md` — deeper on how orchestrators coordinate specialists
- `concepts/systems-thinking.md` — systems-thinking vocabulary for talking about agents

---
name: module-5
description: Add a Sub-Agent — Module 5 of the AISC Agent Sprint. Triggered when a student types "module-5". Helps the student break off a focused responsibility from their orchestrator into a custom sub-agent at student-output/<agent-name>/sub-agents/.
---

# Module 5: Add a Sub-Agent

**Time:** ~30 minutes
**You'll produce:** a custom sub-agent your orchestrator delegates to, saved at `student-output/<agent-name>/sub-agents/<sub-agent-slug>.md`

## Coach Instructions

Sub-agents are the most powerful composition tool in agent architecture — and the least intuitive. The student has to understand *why* to reach for one before writing one. Lead with that.

## Step 1: Set the frame (3 min)

Say:

> "Module 5 — sub-agents. This one needs a mental shift before we write anything.
>
> Remember when we said the orchestrator is like a project manager? A sub-agent is the specialist the project manager hires for a specific job. Here's what makes it powerful: a sub-agent gets its *own fresh context window*. It reads only what it needs, does the work, and returns just the answer.
>
> Why does that matter? Because your main agent's context fills up. Fast. If your agent reads 40 files to answer one question, you've burned the context on raw content. A sub-agent does the reading, returns a summary, and your orchestrator stays clean.
>
> **The rule of thumb:** if a task involves 'read a lot, think about it, return a small answer' — that's a sub-agent."

## Step 2: Find the right thing to delegate (5 min)

Read the student's `AGENT.md` and current skills. Help them find what to extract. Ask:

> "Looking at your agent — is there any part of what it does that feels like too much to hold in one conversation? Anything that involves reading a lot, or going deep on one topic? Examples:
>
> - **For content-creator:** a `researcher` sub-agent that takes a topic and returns 5 bullet points of fresh sources.
> - **For personal-os:** a `gmail-summarizer` sub-agent that reads your last 50 emails and returns a priority triage list.
> - **For domain-coach:** an `analyzer` sub-agent that reads all your logs and returns patterns you've missed.
>
> What would yours be?"

Guide them toward a sub-agent that:
- Takes focused inputs (a topic, a date range, a file)
- Does *one* type of work (research, summarize, analyze)
- Returns a small, structured output

If they propose something that sounds more like a skill (workflow with clear steps and small inputs), redirect: "That sounds like a skill, not a sub-agent. Let's save it for later. A sub-agent is for the *heavy* jobs."

## Step 3: Design the sub-agent (5 min)

Sketch the sub-agent before writing. Answer:

1. **Name** — short, descriptive. `researcher`, `summarizer`, `analyzer`.
2. **Role** — one sentence. "I take X and return Y."
3. **When the orchestrator invokes it** — what trigger phrase in the main agent makes it dispatch to this sub-agent?
4. **What it reads** — files, URLs, MCP queries
5. **What it returns** — be specific about shape. "3-5 bullet points, each with a source link."

## Step 4: Write the sub-agent file (10 min)

Create `student-output/<agent-name>/sub-agents/<sub-agent-slug>.md`.

Template:

```markdown
---
name: <sub-agent-slug>
description: <one sentence — what this sub-agent does, when the orchestrator should dispatch it>
---

# <Sub-Agent Name>

## Role
<One sentence. "I take X and return Y." Be specific.>

## When the orchestrator dispatches me
<Trigger conditions. What does the main agent see that makes it reach for me?>

## What I read
- <Source 1>
- <Source 2>

## What I return
<Exact shape of the output. Be specific.>

Example:
```
- Point 1 — <short description>   [source link]
- Point 2 — <short description>   [source link]
- Point 3 — <short description>   [source link]
```

## Boundaries
- I don't <thing outside my scope>
- I return the raw findings, not a polished draft — that's the orchestrator's job
```

Fill it in with the student. Be strict about boundaries — sub-agent scope creep is the #1 reason they stop being useful.

## Step 5: Wire it into the orchestrator (3 min)

Update `student-output/<agent-name>/AGENT.md` to tell the main agent when to dispatch the sub-agent. Add a section:

```markdown
## Sub-agents
- **<sub-agent-slug>** — dispatch when <trigger condition>. Returns <expected output>.
```

## Step 6: Test it (3 min)

Test the full flow:

1. Have the student trigger their main agent with a request that should cause the sub-agent to be dispatched
2. Watch what happens
3. If the orchestrator doesn't dispatch, the trigger in AGENT.md isn't specific enough — tighten it

This test is important. Students often write a beautiful sub-agent that never gets called because the orchestrator doesn't know when to use it.

## Step 7: Show the diagram (1 min)

Print the updated architecture. Example:

```
        ┌─ morning-brief (orchestrator)
        │
        ├── skills/
        │   ├── /today             ✓
        │   └── /daily-update      ✓
        │
        ├── tools/
        │   ├── gmail              ✓
        │   └── calendar           ✓
        │
        └── sub-agents/
            └── gmail-summarizer   ✓ NEW (just built!)
                ↑
                dispatches when asked about email triage
```

## Step 8: Wrap and commit (2 min)

1. Update `CLAUDE.md`: check off Module 5
2. Commit:
   ```bash
   git add -A
   git commit -m "Complete Module 5: Add <sub-agent-slug> sub-agent to <agent-name>"
   ```
3. Invite forward:
   > "You just built a fully-composed agent — orchestrator, tools, skills, sub-agents. All the pieces. Last main module is Module 6 — final polish and we'll build an HTML diagram of what you made. Type `module-6` when you're ready."

## Handling edge cases

- **Sub-agent never gets dispatched** — the trigger phrase in AGENT.md is too vague. Tighten it with concrete example phrases.
- **They want two sub-agents** — great instinct, but do one well first. Save the second for after Module 6.
- **Their archetype is `custom` and they're lost** — suggest the simplest sub-agent possible: a `researcher` that takes a topic and returns links. Always useful.

## Reference

- Week 3 concept doc: `what-are-subagents.md` in the aisc-cc-modules repo

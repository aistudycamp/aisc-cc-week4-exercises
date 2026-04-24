---
name: module-1
description: Tour the System — Module 1 of the AISC Agent Sprint. Triggered when a student types "module-1". Gives students a guided tour of the repo as a systems-thinking exercise, showing how agents, skills, sub-agents, and tools compose together.
---

# Module 1: Tour the System

**Time:** ~15 minutes
**You'll produce:** a mental model for how agents are actually architected — no code yet, but you'll see the pieces fit together

## Coach Instructions

You are guiding the student through a tour of this repo as a *systems* — not a pile of files. The point of this module is to make them *see* how agents compose before they build one. Keep it conversational. Use the ASCII diagrams. Ask them questions along the way to keep them active.

## Step 1: Set the frame (1 min)

Open with something like:

> "Welcome to Module 1. Before we build anything, let's look at what an agent actually *is*. Most people hear 'agent' and picture a chatbot that can do stuff on its own — but that's only half the story. An agent is really a *system* of pieces working together. Today you'll see those pieces laid out in this repo. By the end of this module, when someone says 'orchestrator' or 'sub-agent', you'll know exactly what they mean and where they live."

## Step 2: Show them the big picture (3 min)

Print this ASCII diagram:

```
                 ╭─────────────────────────────╮
                 │   ORCHESTRATOR (the agent)  │
                 │   "I decide what to do"     │
                 ╰──────────────┬──────────────╯
                                │
              ┌─────────────────┼──────────────────┐
              │                 │                  │
              ▼                 ▼                  ▼
        ┌──────────┐      ┌──────────┐       ┌──────────┐
        │  SKILLS  │      │   TOOLS  │       │  SUB-    │
        │          │      │  (MCPs)  │       │  AGENTS  │
        │ packaged │      │ external │       │ focused  │
        │ workflows│      │ senses   │       │ helpers  │
        └──────────┘      └──────────┘       └──────────┘
```

Then explain in plain language:

> "Think of the orchestrator as a project manager. It doesn't do the hard work itself — it routes work to the right specialist. The three kinds of specialists are:
>
> - **Skills** — packaged processes. 'When someone asks me to do X, here's how I do it.'
> - **Tools (MCPs)** — connections to the outside world. Gmail, GitHub, a database. Live data, not memory.
> - **Sub-agents** — focused helpers with their own fresh context. Good for deep work that shouldn't clutter the main thread.
>
> Every agent in this repo has some or all of these pieces. Let's look at one."

## Step 3: Walk them through an example (5 min)

Open `examples/example-content-creator.md` together:

1. Tell them you're going to read it with them
2. Point out the **AGENT.md section** — that's the orchestrator's brain. Its role, its personality, when to act.
3. Point out the **tools section** — what MCPs/sources this agent needs to work
4. Point out the **skills section** — the specific workflows this agent runs
5. Point out the **sub-agents section** — what it delegates to

After reading, print this ASCII for the content-creator example:

```
        ┌─ content-creator (orchestrator)
        │   "I draft content in your voice"
        │
        ├── skills/
        │   ├── /draft-post       ← takes a topic, produces a post
        │   └── /polish           ← tightens up existing drafts
        │
        ├── tools/
        │   ├── web-search        ← research current events
        │   └── style-reference   ← your voice, captured in a file
        │
        └── sub-agents/
            └── researcher        ← deep-dive for complex topics
```

Ask them:

> "Do you see how the orchestrator doesn't contain the 'doing' itself? It contains the *map* of who does what. That's systems thinking."

## Step 4: The three principles (3 min)

Now tell them:

> "There are three principles behind why agents are built this way. Memorize these — they'll make every design decision easier."

1. **Separation of concerns.** Each piece does one thing well. A skill doesn't try to be a tool. A tool doesn't try to be a sub-agent. Small pieces compose cleanly.
2. **Just-in-time context.** Sub-agents get fresh context windows. They read only what they need, return only what matters. The main orchestrator stays clean.
3. **Escalate by complexity.** Start with a skill. Add a tool when you need live data. Add a sub-agent when a task is big enough to deserve its own focus.

## Step 5: Reflection (3 min)

Ask:

> "Before we move on, think about an agent you might want to build. You don't have to know yet — but if you had to guess:
> - What would its *one job* be?
> - What tools would it need to see (Gmail? a spreadsheet? the web?)
> - What workflow do you repeat often enough that you'd want a skill for it?
>
> Don't over-think it. We'll pick an archetype in Module 2 that gets you 80% of the way."

Listen to what they say. If they're stuck, suggest one of:
- "You do a lot of writing — maybe content-creator"
- "You want your day planned — maybe personal-os"
- "You're tracking something over time — maybe domain-coach"

## Step 6: Wrap and commit (2 min)

Say:

> "Beautiful. You now understand the basic shape of every agent — orchestrator + skills + tools + sub-agents, composed on systems-thinking principles. That's the mental model the rest of this sprint builds on.
>
> Let me save your progress and we'll move on."

Do these three things:

1. **Update `CLAUDE.md`**: change `- [ ] Module 1:` to `- [x] Module 1:`
2. **Commit**:
   ```bash
   git add CLAUDE.md
   git commit -m "Complete Module 1: Tour the System"
   ```
3. **Invite them forward**:
   > "Done. When you're ready, type `module-2` and we'll actually build your agent."

## Optional deeper reading

If the student is curious and has time, point them to:
- `concepts/systems-thinking.md`
- `concepts/what-is-an-agent.md`
- `concepts/what-is-an-orchestrator.md`

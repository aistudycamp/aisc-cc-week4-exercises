# Systems Thinking for Agents

## The shift

Most people build their first agent as one giant prompt. "You are a helpful assistant that does X, Y, Z, W, V, and also remembers A, B, C..." It works for about a week. Then it starts breaking — forgetting instructions, mixing up tasks, getting confused under load.

The fix is systems thinking.

A good agent isn't a big prompt. It's a **small orchestrator** that knows how to delegate to the right *piece* at the right time. You compose it out of simple parts, each doing one job well.

## The three principles

### 1. Separation of concerns

Every piece does one thing. A skill is a workflow — not a tool. A tool is a data source — not a workflow. A sub-agent is a specialist — not a catch-all.

When you're tempted to make a skill "also do X," ask: is X the same job, or a different one? If different — new skill, new sub-agent, or new tool.

**Test:** can you explain this piece in one sentence without using "and"? If yes, it's scoped right.

### 2. Just-in-time context

Your main agent's context window is precious. Don't fill it with raw data you'll throw away.

Sub-agents get fresh context. They read, think, return the *answer*. The orchestrator never saw the raw material — and doesn't need to.

**Rule of thumb:** if a task is "read a lot, think, return a small answer" — that's a sub-agent, not something the orchestrator should do inline.

### 3. Escalate by complexity

Don't reach for the fanciest tool first. Escalate:

1. **Can a skill do it?** Use a skill.
2. **Does it need live data?** Add a tool.
3. **Does it need deep independent work?** Use a sub-agent.
4. **Is it a totally separate use case?** Maybe it's a *different agent*.

Most people skip 1 and 2 and jump to 3 or 4 because they sound cooler. Don't. Skills solve 80% of problems.

## How this repo demonstrates it

This whole repo is built on these principles — take a minute to notice:

- **Modules are skills.** Each `module-N` is its own skill with one job: teach one concept. They don't sprawl.
- **Concepts are separate from exercises.** The conceptual docs (this file, what-is-an-agent.md) are reference. The module skills are action. Different jobs, different files.
- **Templates are pre-composed systems.** Each archetype shows these principles in action: an orchestrator + the smallest useful set of skills/tools/sub-agents.
- **Your student-output is your system.** You'll build yours the same way — thin orchestrator, composed pieces.

## The long-term payoff

Systems thinking compounds. Your first agent feels like a lot of work. Your second agent reuses skills. Your third reuses sub-agents. By your fifth, you're composing existing pieces instead of writing from scratch.

The goal of this sprint isn't just "build one agent." It's: learn the shape so every future agent is easier.

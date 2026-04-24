# What Is an Orchestrator?

The **orchestrator** is the brain of your agent. It's the part that decides *what to do next*.

## The project manager analogy

Think of a good project manager. They don't do the engineering, the design, or the sales calls themselves. What they do:

- **Listen** to the request
- **Decide** who should handle what
- **Hand off** work to specialists
- **Bring results back** and synthesize

That's exactly what the orchestrator does. It doesn't contain the workflow. It contains the *map* — who does what, when.

## What lives in the orchestrator

In this repo, the orchestrator is a single file: `AGENT.md`. It has:

- **Role** — who the agent is, in one line
- **When to use** — what triggers should cause it to act
- **How to respond** — the tone, style, voice
- **Skills** — the list of workflows this orchestrator knows
- **Tools** — the list of things it can see (MCPs, local files)
- **Sub-agents** — the list of specialists it can dispatch to

Notice what's *not* there: the actual work. The orchestrator doesn't contain the "how to draft a blog post" — that lives in the skill. It just knows "when someone wants a blog post, run `/draft-post`."

## Why keep it thin

An orchestrator that tries to do everything itself clutters its own context window. It reads too many files. It forgets earlier instructions. It makes bad decisions.

A thin orchestrator is *clear*. It routes. Specialists do the work. The main thread stays focused.

This is the first principle of agent architecture: **compose, don't conflate**.

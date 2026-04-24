# What Is an Agent?

## The short version

An agent is an LLM that **decides what to do, then does it** — using tools, files, and other helpers it has access to. A chatbot answers your question. An agent takes action.

## The longer version

Most people's mental model of "AI" is a chatbot: you ask, it replies. An agent is structurally different. It has:

1. **A goal or trigger** — something kicks it off. A user message, a schedule, an event.
2. **A loop** — it thinks, decides, acts, observes the result, thinks again.
3. **Tools it can call** — read files, search the web, query a database, invoke a sub-agent.
4. **A stopping condition** — when it's done, or when it needs human input.

That's it. The loop is the key. A chatbot doesn't loop — it responds once and waits. An agent can keep going.

## A simple example

**Chatbot:**
> You: "What's the weather in Oslo tomorrow?"
> Chatbot: "I can't check real-time weather. Try weather.com."

**Agent:**
> You: "What's the weather in Oslo tomorrow?"
> Agent: *(thinks: I need weather data. I have a weather tool.)*
> Agent: *(calls weather API for Oslo, tomorrow)*
> Agent: *(reads result: 8°C, light rain)*
> Agent: "Tomorrow in Oslo: 8°C with light rain. Bring a jacket."

Same question, different capability. The agent acts.

## What makes an agent *yours*

Anyone can use a generic agent. Yours becomes valuable when you give it:

- **Context about you** — your CLAUDE.md, your files, your workflows
- **Tools you use** — not just generic web search, but *your* Gmail, *your* data, *your* services
- **Skills that match your work** — your repeatable processes, encoded once
- **Sub-agents for your heavy jobs** — focused helpers that do the work too big for the main thread

By the end of this sprint, yours will have all of that.

## Where this fits

In this sprint:
- The **orchestrator** = the agent's brain (one AGENT.md file)
- The **tools** = what the orchestrator uses to see the world (MCPs + local files)
- The **skills** = the orchestrator's repeatable workflows
- The **sub-agents** = the specialists the orchestrator dispatches to

The whole system is the agent.

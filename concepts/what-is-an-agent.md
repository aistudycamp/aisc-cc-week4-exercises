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

## What an agent looks like in code

Now that you know what an agent *does*, here's what it actually *is* — at the code level — in the sprint you're about to build:

```js
// the simplest possible agent
async function agent(userInput) {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    system: readFile("prompts/system.md"),    // its instructions
    messages: [{ role: "user", content: userInput }]
  });
  return response.content[0].text;
}
```

That's a Stage 1 agent. About 6 lines.

A Stage 3 agent — with sub-agents and an orchestrator — is the same shape, just *more functions calling each other*:

```js
async function orchestrator(transcript) {
  const themes  = await summarize(transcript);          // sub-agent
  const actions = await extractActions(transcript);     // sub-agent
  return await synthesize(themes, actions);             // final API call
}
```

Each function is an API call with its own system prompt. The orchestrator is the function that decides who calls who. **That's the whole machine.**

## The three-level hierarchy you'll build

Agents come in three levels of sophistication — and each level **contains the previous one** as a building block:

```
Agentic System
└── contains → Workflow
                └── contains → Chat Assistant
```

| Level | What it is | Key trait |
|-------|-----------|-----------|
| **Chat Assistant** | One system prompt, one conversation. | Interactive. You ask, it answers. |
| **Workflow** | A fixed multi-step pipeline. The LLM is one step. | Event-driven. A file drops, the pipeline fires. |
| **Agentic System** | An orchestrator that examines input and picks tools dynamically. | Reasoned dispatch. It decides what to run. |

Each stage is genuinely different — not just a wrapper around the same API call.

### Stage 1 — Chat Assistant

An interactive chat loop. `messages[]` grows with each turn so Claude remembers what you said before. You paste in a transcript, then ask follow-up questions.

The key export: `ask(question, context)` — a stateless one-shot function that Stage 2 and Stage 3 reuse.

### Stage 2 — Workflow

A fixed pipeline: **Read → Call → Format → Save**. The chat assistant is *one step* in that pipeline — not the whole thing. The trigger is a file appearing in a folder, not a human typing a message.

```js
import { ask } from '../stage-1/chat.js';   // reuses Stage 1
```

### Stage 3 — Agentic System

A planner LLM call decides *which tools to invoke*. Then the orchestrator dispatches to the chat assistant, the workflow, or specialist sub-agents — depending on what the planner chose. The output is synthesized into a final report.

```js
import { ask }         from '../stage-1/chat.js';    // reuses Stage 1
import { runWorkflow } from '../stage-2/workflow.js'; // reuses Stage 2
```

By the end of the sprint, you'll have built each of those boxes — and you'll understand exactly what makes them different.

## Going deeper

For the canonical pattern catalog, read [Anthropic's Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) — covers Augmented LLM, Prompt Chaining, Routing, Parallelization, Orchestrator-Workers, Evaluator-Optimizer, and Autonomous Agents.

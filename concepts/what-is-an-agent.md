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

## Where this fits in the sprint

You'll build agents at three levels of complexity:

- **Stage 1 — Chat assistant.** One function, one system prompt, one API call.
- **Stage 2 — Workflow.** Same agent, but triggered automatically when a file lands.
- **Stage 3 — Agentic system.** An orchestrator function that calls 2 sub-agent functions, then synthesizes.

By the end, you'll see how each layer is just *more API calls, arranged thoughtfully*.

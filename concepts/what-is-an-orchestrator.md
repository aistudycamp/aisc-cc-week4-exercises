# What Is an Orchestrator?

The **orchestrator** is the brain of your agent. It's the part that decides *what to do next*.

## The project manager analogy

Think of a good project manager. They don't do the engineering, the design, or the sales calls themselves. What they do:

- **Listen** to the request
- **Decide** who should handle what
- **Hand off** work to specialists
- **Bring results back** and synthesize

That's exactly what the orchestrator does. It doesn't contain the workflow. It contains the *map* — who does what, when.

## What an orchestrator looks like in code

In Stage 3 of the sprint, you'll build an orchestrator. It's a JavaScript function — about 15 lines:

```js
async function orchestrator(transcript) {
  // 1. Decide what's needed (in this case: themes + actions)

  // 2. Dispatch to specialists in parallel
  const [themes, actions] = await Promise.all([
    summarize(transcript),         // sub-agent #1
    extractActions(transcript),    // sub-agent #2
  ]);

  // 3. Combine the results
  const finalReport = await synthesize(themes, actions);

  return finalReport;
}
```

Read that carefully. The orchestrator **doesn't read the transcript itself**. It hands the transcript to two specialists, waits for their structured answers, then calls a third API to combine them into the final report.

Each of those functions (`summarize`, `extractActions`, `synthesize`) is its own API call to Claude with its own system prompt. The orchestrator is just the choreographer.

## Why keep it thin

An orchestrator that tries to do everything itself clutters its own context window. It reads too many files. It forgets earlier instructions. It makes bad decisions.

A thin orchestrator is *clear*. It routes. Specialists do the work. The main thread stays focused.

This is the first principle of agent architecture: **compose, don't conflate**.

## The system prompt of an orchestrator

The orchestrator has its own system prompt — the one in `prompts/system.md`. Notice it doesn't try to *do* the work. It tells Claude:

- Who you are (the orchestrator)
- What sub-agents you have access to
- When to call which
- What format the final answer should take

Compare to the summarizer's prompt — which tells Claude exactly how to read a transcript and find themes. Different role, different prompt, different file.

**Each agent in the system gets its own focused prompt.** That's what makes the system work.

## The planner: deciding which tools to use

A more powerful orchestrator doesn't hard-code which tools to call. Instead, it runs a **planner** — a dedicated LLM call that reads the input and decides what's needed:

```js
async function planner(transcript) {
  // System prompt: "You are a router. Look at the input and pick which tools to call.
  //   Tools: chat (quick Q&A), workflow (full pipeline + save), summarize, extract.
  //   Return JSON: { tools: [...] }"
  const response = await client.messages.create({
    system: promptRouter,
    messages: [{ role: "user", content: transcript.slice(0, 800) }],
  });
  return JSON.parse(response.content[0].text); // e.g. { tools: ["summarize", "extract"] }
}
```

Then the orchestrator dispatches based on what the planner decided:

```js
async function orchestrator(transcript) {
  const plan = await planner(transcript); // Step 1: decide

  const results = {};
  if (plan.tools.includes("chat"))      results.chat    = await ask("Quick summary?", transcript);
  if (plan.tools.includes("workflow"))  results.workflow = await runWorkflow(transcript);
  if (plan.tools.includes("summarize")) results.themes  = await summarize(transcript);
  if (plan.tools.includes("extract"))   results.actions = await extractActions(transcript);

  return await synthesize(results); // Step 3: combine
}
```

The orchestrator doesn't decide what to do — the planner does. This separation is what makes the system genuinely agentic: the path through the system varies based on the input.

## Where this fits

In Stage 3 you'll have four system prompts and a set of functions — each one a separate building block:

```
prompts/
├── system.md            ← synthesis brain
├── summarizer.md        ← finds themes
├── action_extractor.md  ← finds action items
└── router.md            ← planner: decides which tools to invoke
```

```
stage-3/orchestrator.js
├── import { ask }         from '../stage-1/chat.js'    ← Stage 1 building block
├── import { runWorkflow } from '../stage-2/workflow.js' ← Stage 2 building block
├── async function planner(...)         ← LLM picks tools
├── async function summarize(...)       ← specialist
├── async function extractActions(...)  ← specialist
├── async function synthesize(...)      ← combines all results
└── export async function orchestrator(...) ← coordinates everything
```

Four prompts. Six functions. Two imported building blocks. One agentic system — and every piece of it is something you built.

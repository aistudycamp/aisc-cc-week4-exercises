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

## Where this fits

In Stage 3 you'll have three system prompts and three functions:

```
prompts/
├── system.md            ← orchestrator's brain
├── summarizer.md        ← finds themes
└── action_extractor.md  ← finds action items
```

```
stage-3/orchestrator.js
├── async function summarize(...)        ← calls API w/ summarizer.md
├── async function extractActions(...)   ← calls API w/ action_extractor.md
├── async function synthesize(...)       ← calls API w/ system.md
└── async function orchestrator(...)     ← calls all three above
```

Three prompts. Four functions. One agentic system.

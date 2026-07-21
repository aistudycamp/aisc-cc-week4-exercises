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
    analyst(transcript),    // specialist #1
    extractor(transcript),  // specialist #2
  ]);

  // 3. Combine the results
  const finalReport = await synthesizer(themes, actions);

  return finalReport;
}
```

Read that carefully. The orchestrator **doesn't read the transcript itself**. It hands the transcript to two specialists, waits for their structured answers, then calls a third API to combine them into the final report.

Each of those functions (`analyst`, `extractor`, `synthesizer`) is its own API call to Claude with its own system prompt. The orchestrator is just the choreographer.

## Why keep it thin

An orchestrator that tries to do everything itself clutters its own context window. It reads too many files. It forgets earlier instructions. It makes bad decisions.

A thin orchestrator is *clear*. It routes. Specialists do the work. The main thread stays focused.

This is the first principle of agent architecture: **compose, don't conflate**.

## Does the orchestrator have its own system prompt?

No, and that's worth noticing. `orchestrator()` itself is plain JavaScript: no system prompt, no API call of its own. It just decides who to call and in what order. Every actual Claude call happens inside one of the specialists (Analyst, Extractor, Synthesizer, Reflect) or the Conductor, each with its own prompt file (`prompts/analyst.md`, `prompts/extractor.md`, and so on).

Compare the Analyst's prompt to the Extractor's: one tells Claude how to find themes, the other how to find action items. Different job, different prompt, different file.

**Each specialist in the system gets its own focused prompt; the orchestrator gets none, because it isn't making a judgment call. It's just wiring.**

## The Conductor: deciding which tools to use

A more powerful orchestrator doesn't hard-code which specialists to call. Instead, it runs the **Conductor**, a dedicated Claude call that reads the instruction and decides what's needed:

```js
async function conductor(transcript, instruction) {
  // System prompt (prompts/conductor.md): "You are a routing planner.
  //   Tools available: analyst, extractor, synthesizer, router, reflect.
  //   Decide which ones to call. Return JSON: { tools: [...], reasoning: '...' }"
  const response = await client.messages.create({
    system: promptConductor,
    messages: [{ role: "user", content: `TRANSCRIPT:\n${transcript}\nINSTRUCTION: ${instruction}` }],
  });
  return JSON.parse(response.content[0].text); // e.g. { tools: ["extractor"], reasoning: "..." }
}
```

Then the orchestrator dispatches based on what the Conductor decided:

```js
async function orchestrator(transcript, instruction) {
  const plan = instruction ? await conductor(transcript, instruction) : null;
  const tools = plan ? plan.tools : ["analyst", "extractor", "synthesizer", "router", "reflect"];

  const results = {};
  if (tools.includes("analyst"))     results.themes    = await analyst(transcript);
  if (tools.includes("extractor"))   results.actions   = await extractor(transcript);
  if (tools.includes("synthesizer")) results.report    = await synthesizer(results.themes, results.actions);
  if (tools.includes("router"))      await runWorkflow(transcript, filename, results.report);
  if (tools.includes("reflect"))     results.runReport = await reflect(/* ... */);

  return results;
}
```

The orchestrator doesn't decide what to do; the Conductor does. This separation is what makes the system genuinely agentic: the path through the system varies based on the instruction. If no instruction is given, the orchestrator just runs the full pipeline: all five steps, in dependency order.

## Where this fits

In Stage 3 you'll have five system prompts and a set of functions, each one a separate building block:

```
prompts/
├── analyst.md       ← finds themes
├── extractor.md     ← finds action items
├── synthesizer.md   ← combines both into the final report
├── conductor.md     ← planner: decides which specialists to call
└── reflect.md       ← after-action report on the run
```

```
stage-3/orchestrator.js
├── import { runWorkflow } from '../stage-2/workflow.js' ← Stage 2 building block (the Router)
├── async function analyst(...)      ← specialist
├── async function extractor(...)    ← specialist
├── async function synthesizer(...)  ← specialist
├── async function reflect(...)      ← specialist (after-action report)
├── async function conductor(...)    ← the planner
└── export async function orchestrator(...) ← coordinates everything
```

Five prompts. Six functions. One imported building block (`runWorkflow`, reused as the Router). One agentic system, and every piece of it is something you built.

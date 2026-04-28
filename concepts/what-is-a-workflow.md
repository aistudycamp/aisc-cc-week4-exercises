# What Is a Workflow?

## The short version

A **workflow** is a fixed sequence of steps that runs automatically when an event occurs. The LLM is *one step* in the workflow — not the whole thing.

## The longer version

A chat assistant does one thing: it talks to you. You type, it responds.

A workflow does *several* things in a fixed order, triggered by an event, without you clicking anything:

```
Event fires → Step 1 → Step 2 → Step 3 → Step 4 → Done
```

In the sprint you'll build, the event is a file landing in a folder, and the pipeline looks like this:

```
File drops → Read file → Call chat assistant → Format as markdown → Save to disk
```

That second step — "Call chat assistant" — is the Stage 1 building block you already built. The workflow *uses* the chat assistant as one of its steps.

## What a workflow looks like in code

```js
import { ask } from '../stage-1/chat.js'; // ← the chat assistant, reused as a step

export async function runWorkflow(transcript, sourceFilename) {
  // Step 2: call the chat assistant with a fixed prompt
  const reportText = await ask(
    'Generate the standard insights report for this transcript.',
    transcript
  );

  // Step 3: format as markdown
  const body = `# Insights Report\n\n${reportText}`;

  // Step 4: save to outputs/
  fs.writeFileSync(outPath, body, 'utf-8');

  return outPath;
}
```

The chat assistant handles the LLM thinking. The workflow handles everything around it: the trigger, the formatting, the saving, the notification.

## How it's triggered

The workflow uses a folder watcher (chokidar) to listen for new files:

```js
chokidar.watch('transcripts/*.txt').on('add', async (filepath) => {
  const transcript = fs.readFileSync(filepath, 'utf-8');
  const outPath = await runWorkflow(transcript, path.basename(filepath));
  console.log(`✓ Workflow complete → ${outPath}`);
});
```

One file drop → one pipeline run → one saved report. No button to click. No command to type.

## Workflow vs. chat assistant vs. agent

| | Chat assistant | Workflow | Agentic system |
|---|---|---|---|
| **Trigger** | User types a message | Event (file, webhook, schedule) | Any — the planner decides |
| **Path** | One LLM call | Fixed sequence of steps | Dynamic — chosen at runtime |
| **Output** | Text in the terminal | Persisted artifact (file, database row) | Synthesized from multiple tools |
| **Interactivity** | High — you ask follow-ups | None — it runs itself | Low — you hand it a task and wait |

A workflow trades interactivity for automation. You configure it once; it runs forever.

## Why this matters for AI products

Most AI products aren't chatbots — they're workflows. When you upload a document to a tool and get back a summary, that's a workflow. When an AI reads your email and files it, that's a workflow. When an incoming Slack message triggers a CRM update, that's a workflow.

The LLM is doing the *thinking*. The workflow is doing the *plumbing*. Both matter. Building a workflow is building the plumbing around an LLM.

---
name: module-4
description: Build the Workflow — Module 4 of the AISC Agent Sprint. Triggered when a student types "module-4". Student opens stage-2/workflow.js, sees how it imports ask() from Stage 1, walks through the 5-step pipeline, runs the folder watcher, drops files, sees the pipeline fire. End: opens frontend Stage 2 tab to see the chat assistant nested inside the workflow box.
---

# Module 4: Build the Workflow

**Time:** ~25 minutes
**You'll produce:** a working workflow pipeline. Drop any `.txt` file into `transcripts/` and the pipeline fires automatically — reading the file, calling the chat assistant, formatting the output, and saving a report to `outputs/`.

## Coach Instructions

The magic moment here is *two things at once*: the file drop triggering the pipeline, and the student seeing the `import { ask }` line that reuses Stage 1. Don't rush past either. The conceptual point is that a workflow is genuinely different from a chat assistant — it's not just a wrapper.

## Step 1: Set the frame (3 min)

Say:

> "In Stage 1 you built a chat assistant. It's interactive — you type, it responds, you type more. Today we build something structurally different: a **workflow**.
>
> A workflow doesn't wait for you to type. An *event* triggers it. A file appears in a folder. A webhook fires. A cron job ticks. The pipeline runs automatically, through a fixed sequence of steps, and produces a persistent result.
>
> Here's the key question: is the chat assistant inside the workflow? Or is the workflow inside the chat assistant?
>
> **The chat assistant is one step inside the workflow.** We import it."

## Step 2: Open what-is-a-workflow.md (2 min)

Open `concepts/what-is-a-workflow.md` together. Read the "The short version" and the comparison table at the bottom. Land:

> "A workflow trades interactivity for automation. You configure it once; it runs forever."

## Step 3: Open workflow.js and read the import (4 min)

Open `student-output/stage-2/workflow.js`. The very first thing to point to:

```js
import { ask } from '../stage-1/chat.js'; // ← Stage 1 is one step in this pipeline
```

> "There it is. This isn't a copy-paste of Stage 1's code. It's a *literal import*. The workflow calls `ask()` — the function we just built — as step 2 of its pipeline. Stage 1 is a building block. Stage 2 uses it."

Now walk through the full pipeline inside `runWorkflow()`:

```js
export async function runWorkflow(transcript, sourceFilename) {
  // Step 2: call the chat assistant
  const reportText = await ask(
    'Generate the standard insights report for this transcript.',
    transcript
  );

  // Step 3: format as markdown
  const body = `# Insights Report\n\n${reportText}`;

  // Step 4: save to outputs/
  fs.writeFileSync(outPath, body, 'utf-8');

  // Step 5: return saved path
  return outPath;
}
```

> "Five steps. Read → Call ask() → Format → Save → Return. The LLM does step 2. The workflow does everything else. That's the distinction: the agent is one step; the pipeline is the whole thing."

Also note the export:

> "Same pattern as Stage 1 — we export `runWorkflow()` as a building block. Stage 3 will import this, just like this file imports `ask()` from Stage 1."

### The watcher gating

Point to the `if (import.meta.url === ...)` block at the bottom:

> "Same pattern as Stage 1. When you run `npm run stage-2` directly, the folder watcher starts. When Stage 3 imports this file, only `runWorkflow()` loads — the watcher never fires. Clean separation."

## Step 4: Start the workflow (3 min)

Have them run:

```bash
npm run stage-2
```

They should see:

```
⚙️  Workflow — Transcript Pipeline
👀 Watching .../transcripts for new .txt files...
    Drop a transcript into that folder to run the pipeline.
```

> "It's running. Quietly watching. Nothing happens until a file appears."

## Step 5: Trigger it (5 min)

In a **second terminal window**, drop a file:

```bash
cd student-output
cp transcripts/sample-transcript.txt transcripts/test-run-1.txt
```

Watch the watcher terminal:

```
📄 New file detected: test-run-1.txt
⚡️ Running pipeline...
✓ Workflow complete → outputs/2026-04-28-1042-test-run-1.md
```

> "The pipeline fired. You didn't type anything. You dropped a file. The workflow woke up, called the chat assistant, formatted the output, saved it. Open outputs/ and look."

```bash
cat outputs/*.md
```

Drop a few more files to show the pattern repeating:

```bash
cp transcripts/sample-transcript.txt transcripts/test-run-2.txt
echo "Quick sync: Alex says launch delayed to next Friday." > transcripts/tiny.txt
```

## Step 6: Stop the watcher cleanly (1 min)

```
Ctrl+C in the watcher's terminal.
```

> "The pipeline stops listening. Nothing else changes. The reports stay in outputs/."

## Step 7: See it in the frontend (4 min)

Open `frontend/index.html` (if not already open) and click the **Stage 2 tab**:

```bash
open frontend/index.html
```

Walk them through the Stage 2 view:

> "Look at the layout. The workflow is a container — it shows the full pipeline: File drop → Parse → Chat Assistant → Format → Save.
>
> See the Chat Assistant node inside the workflow box? That's the Stage 1 building block, nested inside Stage 2. The same assistant you built and ran in Module 3 — now it's a step in a pipeline.
>
> Click the Chat Assistant node inside the workflow. The inspect panel shows the same system prompt from Stage 1. Same file, same function, just used differently."

Hit **Run Agent** and watch the Stage 2 animation — each pipeline step lights up in sequence.

## Step 8: The big idea (2 min)

> "The shape of what you built:
>
>     Event fires       →    Chat Assistant    →    Saved file
>     [file appears]         [ask() step]           [outputs/*.md]
>
> The chat assistant is *unchanged*. We didn't touch it. We just called it from a new context — a pipeline that has its own trigger and its own output step.
>
> Once you see this pattern, you can swap any trigger and any output. An incoming email. A Slack message. A webhook from your CRM. The pipeline doesn't care. **The trigger and the output step are pluggable.**
>
> And here's the thing to hold onto: every product you've seen called 'AI automation' is this exact shape. Upload a contract, get a summary. Paste a Slack thread, get action items. Send a customer email, get a draft reply. They're all a file-drop — or a webhook — pointing at an LLM. You just built the whole thing from scratch."

## Step 9: Wrap and commit (2 min)

1. Clean up test files if desired:
   ```bash
   rm transcripts/test-run-*.txt transcripts/tiny.txt
   ```
2. **Update `CLAUDE.md`**: change `- [ ] Module 4:` to `- [x] Module 4:`
3. **Commit:**
   ```bash
   git add -A && git commit -m "Complete Module 4: Build the Workflow"
   ```
4. Hand off:

> "Stage 2 done. You have a workflow that runs without you. In Module 5 we'll extend it — add more steps to the pipeline so reports land exactly where you need them. Type `module-5` when you're ready."

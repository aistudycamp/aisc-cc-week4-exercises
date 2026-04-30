---
name: module-4
description: Build the Workflow — Module 4 of the AISC Agent Sprint. Triggered when a student types "module-4". Student starts the folder watcher, drops a test file via npm run drop-test, watches the AI classify the meeting type and route the file to the correct subfolder, and sees a macOS notification fire. Opens the frontend Stage 2 tab to see the pipeline visualization.
---

# Module 4: Build the Workflow

**Time:** ~25 minutes
**You'll produce:** a working automated workflow. Drop a transcript into the `incoming/` folder and the pipeline fires automatically — reading the file, classifying the meeting type, routing it to the right folder, and sending you a notification. No typing required.

## Coach Instructions

The magic moment is *seeing what a workflow actually does*: a file drops, AI makes a decision, the file moves, a notification fires. That's fundamentally different from a chat assistant. Students should leave this module knowing exactly why you'd use a workflow instead of a chat.

## Step 1: Set the frame (3 min)

Say:

> "In Stage 1 you built a chat assistant. You paste something in, it responds, you paste more. It's interactive.
>
> Stage 2 is different. It's a **workflow** — and a workflow doesn't wait for you. An event triggers it. In our case: a file drops into a folder. The pipeline wakes up automatically, the AI makes a decision, the file gets routed to the right place, you get a notification. You never typed anything.
>
> Here's the real question: what can a workflow do that a chat assistant can't?"

Wait for their answer. If stuck:

> "A chat assistant is reactive — it waits for you. A workflow is **automatic** — it fires when something happens. It can also make decisions: look at a transcript, classify what kind of meeting it was, and route it to the right folder. That's not a conversation. That's a pipeline."

## Step 2: What this workflow does (2 min)

Print the pipeline:

```
transcripts/incoming/[you drop a file here]
         ↓
    Read the transcript
         ↓
    AI classifies meeting type
    → "team-standup" / "client-call" / "planning-session"
         ↓
    Route to transcripts/[type]/[new-filename]
         ↓
    Send macOS notification: "Routed to: team-standup"
```

> "Four steps. The AI does step 2 (classification). The workflow does everything else — reading, routing, notifying. The AI is one smart step inside a larger automated sequence. That's what a workflow is."

Ask before walking through the code:

> "Before we look at how this works — what do you think the AI had to figure out to route the file correctly?"

Wait for their answer. The answer: it read the transcript and decided what kind of meeting it was. Point:

> "Exactly. That's the AI decision step. It reads the beginning of the transcript and returns a JSON answer: the meeting type and a suggested filename. The rest of the pipeline just follows that decision."

## Step 3: Open workflow.js and see the import (4 min)

Open `student-output/stage-2/workflow.js`. The very first thing to point to:

```js
import { ask } from '../stage-1/chat.js'; // ← not here — this imports Stage 1 for use later
```

Wait, that import is not in this new workflow — instead, it uses the Anthropic client directly for classification. Show what IS there:

```js
import { runWorkflow } from '../stage-2/workflow.js'; // this is what Stage 3 will import
```

Point to the export at the bottom:

```js
export async function runWorkflow(transcript, sourceFilename)
```

> "Same pattern as Stage 1 — we export `runWorkflow()` as a building block. Stage 3 will import this, just like a workflow could import `ask()` from Stage 1.
>
> What do you think Stage 3 will import from THIS file?"

Wait for their answer. The answer: `runWorkflow`. The point: the same export pattern they're looking at right now is what makes Stage 3 possible.

## Step 4: Start the workflow (2 min)

Have them run:

```bash
npm run stage-2
```

They should see:

```
⚙️  Workflow — Transcript Pipeline
👀 Watching transcripts/incoming/ for new files...
    Run 'npm run drop-test' in another terminal to trigger it.
```

> "It's running. Watching the `incoming/` folder. Nothing happens until a file appears."

## Step 5: Trigger it (6 min)

Open a **second terminal tab** — on Mac: `Cmd+T` opens a new tab in the same window. In that second terminal, navigate to your project:

```bash
cd student-output
npm run drop-test
```

This copies the sample transcript into `incoming/` automatically. Watch the watcher terminal:

```
📄 New file: test-1234567890.txt
⚡️ Running pipeline...

  🔍 Classifying meeting type...
  ✓ Classified as: team-standup
  ✓ Routed → transcripts/team-standup/2026-04-29-team-standup.txt

✓ Pipeline complete.
  Type:    team-standup
  Saved:   transcripts/team-standup/2026-04-29-team-standup.txt
```

A macOS notification should also appear in the top-right corner: **"Routed to: team-standup"**

> "The pipeline fired. You didn't type anything. You dropped a file. The AI classified it, routed it, and notified you — all automatically. Check the folder:"

```bash
ls transcripts/team-standup/
```

There's the routed transcript. Drop a few more via `npm run drop-test` to show the pattern repeating.

## Step 6: See it in the frontend (4 min)

Open `frontend/index.html` (if not already open) and click the **Stage 2 tab**:

```bash
open frontend/index.html
```

> "Look at the Stage 2 visualization. You can see the pipeline as nodes: incoming folder → Classifier → team-standup / client-call / planning-session → Notification.
>
> This is a sequence — not a conversation. Each node does one thing and passes results to the next. That's what makes it a workflow."

Click each node. Show the inspect panels — what each step does.

Hit **Run Agent** and watch the Stage 2 animation step through the pipeline.

## Step 7: Stop the watcher cleanly (1 min)

```
Ctrl+C in the watcher's terminal.
```

> "The pipeline stops listening. Nothing else changes. The classified transcripts stay in their folders."

## Step 8: The big idea (2 min)

> "The shape of what you built:
>
>     File drops in   →   AI classifies   →   Routed file   +   Notification
>     [incoming/]         [classifier.md]      [team-standup/]    [macOS banner]
>
> The AI made a decision — that's the intelligence. The pipeline handled the rest — that's the automation.
>
> Chat assistants are great for back-and-forth. Workflows are great for automated, event-triggered processing. Once you see this pattern, you can swap any trigger and any output. An incoming email. A Slack message. A file from Google Drive. The pipeline doesn't care. **The trigger and the output steps are pluggable.**"

## Step 9: Wrap and commit (2 min)

1. **Update `CLAUDE.md`**: change `- [ ] Module 4:` to `- [x] Module 4:`
2. **Commit:**
   ```bash
   git add -A && git commit -m "Complete Module 4: Build the Workflow"
   ```
3. Hand off:

> "Stage 2 running. In Module 5 we'll extend the pipeline — add a new step by telling Claude what you want, not by editing code. Type `module-5` when you're ready."

## Coach Guardrails

- **Use `npm run drop-test`, not `cp`** — the `cp` command may be aliased in the student's shell and silently fail. `npm run drop-test` uses Node to copy the file — no shell dependency.
- **Second-terminal first-timers** — if the student has never opened a second terminal tab, show them `Cmd+T` on Mac before they try to drop the file. Don't just say "second terminal" and leave them searching.
- **Pause for the reflection question in Step 2** — "what did the AI have to figure out to route correctly?" — wait for their answer before explaining. It's a 30-second check that makes the pipeline landing in Step 5 much more satisfying.
- **Pause for the Stage 3 question in Step 3** — "what will Stage 3 import from this file?" — wait for their answer before explaining. It plants the payoff for Module 6.
- **Show the frontend after the pipeline fires** — the visualization is most effective right after the student sees the routed file appear. Don't wait until the end.

## Optional deeper reading

- `concepts/what-is-a-workflow.md` — full workflow reference, including trigger types and the comparison to chat assistants

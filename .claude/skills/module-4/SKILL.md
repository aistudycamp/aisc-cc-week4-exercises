---
name: module-4
description: Build the Workflow — Module 4 of the AISC Agent Sprint. Triggered when a student types "module-4". Student opens the Stage 2 tab in the browser, loads a sample transcript, clicks "Run Workflow →", and watches the pipeline fire automatically — classifying the meeting type, routing the file to the correct subfolder, and sending a macOS notification. No file watcher or extra terminals needed.
---

# Module 4: Build the Workflow

**Time:** ~25 minutes

**What we're building**
By the end: a working automated workflow. Load a transcript in the browser, click a button, and the pipeline fires — AI classifies the meeting type, routes the file to the right folder, sends you a macOS notification. You never typed a follow-up question.

## Coach Instructions

The magic moment is *seeing what a workflow actually does*: a transcript loads, AI makes a decision, the file moves, a notification fires. That's fundamentally different from a chat assistant. Students should leave this module knowing exactly why you'd use a workflow instead of a chat.

## Step 1: Set the frame (3 min)

Say:

> "In Stage 1 you built a chat assistant. You paste something in, it responds, you paste more. It's interactive.
>
> Stage 2 is different. It's a **workflow** — a deterministic sequence. You trigger it (in our case with a button; in production it could be a file drop, a webhook, a timer). Once it starts, it runs to completion. The AI makes one decision — classify the meeting type — and the pipeline handles the rest automatically. You're not in a conversation. There's no back-and-forth."

## Step 2: What this workflow does (2 min)

Print the pipeline:

```
transcripts/incoming/[transcript text]
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

> "Four steps. The AI does step 2 (classification). The workflow does everything else — reading, routing, notifying. The AI makes one decision inside a larger automated sequence. That's what a workflow is."

Ask before walking through the code:

> "Before we look at how this works — what do you think the AI had to figure out to route the file correctly?"

Wait for their answer. The answer: it read the transcript and decided what kind of meeting it was. Point:

> "Exactly. That's the AI decision step. It reads the beginning of the transcript and returns a JSON answer: the meeting type and a suggested filename. The rest of the pipeline just follows that decision."

## Step 3: Look at the workflow export (4 min)

Here's the bottom of `student-output/stage-2/workflow.js` — the part that matters for understanding how Stage 3 will use it:

I'll read it now and show you the relevant section.

**Coach:** Run `Read` on `student-output/stage-2/workflow.js`, then print the export line:

```js
export async function runWorkflow(transcript, sourceFilename)
```

> "Same pattern as Stage 1 — we export `runWorkflow()` as a building block. Stage 3 will import this, just like a workflow could import `ask()` from Stage 1.
>
> What do you think Stage 3 will import from THIS file?"

Wait for their answer. The answer: `runWorkflow`. The point: the same export pattern they're looking at right now is what makes Stage 3 possible.

## Step 4: Confirm the server is running (1 min)

The server should already be running from Module 3. If it's not:

**Coach:** Run `pwd` via Bash to confirm the repo root. If you just opened a fresh terminal, run `cd [repo-root]` first (replace `[repo-root]` with the actual path from `pwd`). Then start the server:

```bash
npm run server
```

> "Keep that terminal running — don't close it. The browser connects to this server."

## Step 5: Trigger the workflow from the browser (6 min)

Open **http://localhost:3000** and click the **Stage 2** tab.

Click **Load standup** (or **Load client call**) to load a sample transcript.

Hit **Run Workflow →**.

Watch the step log appear:

```
🔍 Classifying meeting type...
✓ Classified as: team-standup
✓ Routed → transcripts/team-standup/2026-04-29-team-standup.txt
```

A macOS notification should appear in the top-right corner of the screen: **"Routed to: team-standup"**. This is a built-in macOS banner — nothing to install, it comes from the `osascript` command in the workflow.

> "The pipeline fired. You clicked a button. The AI classified it, routed it, and notified you — all automatically.
>
> Same pipeline — triggered from the browser. The `runWorkflow()` function doesn't care where the transcript came from. The server just hands it the text and it does its job."

Click each node on the diagram. Show the inspect panels — what each step does.

Hit **Run Agent** to watch the Stage 2 architecture animation.

> "The animation shows the architecture. The live panel shows the actual execution. Both are useful — the diagram gives you the mental model, the live interface gives you the proof."

Try loading the other sample transcript ("Load client call") and run it again. Point out: the classification changes.

## Step 6: The big idea (2 min)

> "The shape of what you built:
>
>     Button click      →   AI classifies   →   Routed file   +   Notification
>     [browser]             [classifier.md]      [team-standup/]    [macOS banner]
>
> The AI made a decision — that's the intelligence. The pipeline handled the rest — that's the automation.
>
> The macOS notification was the output step. You could swap it for anything. Three examples on the output side:"

Print this:

```
  Trigger side — what fires the pipeline:    Output side — what happens at the end:
  ─────────────────────────────────────      ─────────────────────────────────────
  Button click in the browser                macOS notification (what you just saw)
  File dropped into a folder                 Slack message to a channel
  Scheduled timer (every 6 hours)            Write a row to a spreadsheet

  The classify-and-route logic in the middle stays the same.
  The trigger and destination are the pluggable parts.
```

> "Chat assistants are great for back-and-forth. Workflows are great for automated, event-triggered processing. Once you see this pattern, you start seeing it everywhere — any 'something happens → AI decides → something else happens' problem is a workflow."

## Key takeaways

- A workflow is a deterministic sequence — AI makes one decision, the pipeline handles the rest
- Trigger and destination are pluggable — the classify-and-route logic in the middle stays the same
- `runWorkflow()` is now a building block — Stage 3 imports it directly

## Step 7: Wrap and commit (2 min)

What you've built so far:

```
┌──────────────────────────────┐   ┌──────────────────────────────┐
│  Stage 1 — Chat Assistant    │   │  Stage 2 — Workflow           │  ← you just built this
│  stage-1/chat.js             │   │  stage-2/workflow.js          │
│  ask() · system.md           │   │  runWorkflow()                │
└──────────────────────────────┘   │  classifier.md               │
                                   └──────────────────────────────┘
```

**Coach:** Do all three of the following steps automatically — do not ask the student to run terminal commands:

1. Run `git add -A && git commit -m "Complete Module 4: Build the Workflow"` via Bash tool and show the student the output: "Committed. Here's what went in: [changed files]"
2. Update `CLAUDE.md`: change `- [ ] Module 4:` to `- [x] Module 4:` via Edit tool.
3. Tell the student: *(Keep the server terminal running — you'll use it in Module 5.)*

4. Hand off:

> "Stage 2 running. In Module 5 we'll extend the pipeline — add a new step by telling Claude what you want, not by editing code. Type `module-5` when you're ready."

## Coach Guardrails

- **The trigger is a button, not a file drop** — this module no longer uses `npm run stage-2` or `npm run drop-test`. The browser's "Run Workflow →" button calls `/api/workflow` directly. There's no file watcher to start.
- **Only one terminal needed** — the server terminal from Module 3. If it's still running, no new terminal is needed at all.
- **Pause for the reflection question in Step 2** — "what did the AI have to figure out to route correctly?" — wait for their answer before explaining. It's a 30-second check that makes the pipeline landing in Step 5 much more satisfying.
- **Pause for the Stage 3 question in Step 3** — "what will Stage 3 import from this file?" — wait for their answer before explaining. It plants the payoff for Module 6.
- **Show the frontend after the pipeline fires** — the visualization is most effective right after the student sees the classification result appear. Don't wait until the end.
- **Coach reads files inline** — never ask the student to open a file or run `cat`. Use the Read tool and print the relevant content directly.

## Optional deeper reading

Just ask me: *"Read concepts/what-is-a-workflow.md and walk me through it."* I'll pull it up and explain it.

- `concepts/what-is-a-workflow.md` — full workflow reference, including trigger types and the comparison to chat assistants

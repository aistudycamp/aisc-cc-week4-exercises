---
name: module-5
description: Extend the Workflow — Module 5 of the AISC Agent Sprint. Triggered when a student types "module-5". Student picks one of three pre-written extensions, tells Claude to add it to workflow.js, and runs it to confirm the new step fires. The vibe coding lesson — "I extended a running system by describing what I wanted" — with zero code-generation risk because the extension code is already written.
---

# Module 5: Extend the Workflow

**Time:** ~20 minutes
**You'll produce:** an extended workflow with one additional step — added by telling Claude what you want, not by editing code yourself.

## Coach Instructions

This module teaches the vibe-coding pattern: describe what you want → Claude applies it → you run it → you see it work. No student should touch a line of code directly.

Three pre-written, tested extensions live in `stage-2/extensions/`:
- `save-summary.js` — generates an AI summary and saves it alongside the transcript
- `json-log.js` — appends a JSON record to a log file after each classification
- `slack-notify.js` — posts a Slack message with the meeting type and filename

When a student picks an option, read the matching extension file and integrate it into `workflow.js` — two changes: one import line at the top, one function call at the end of `runWorkflow()`. Do not generate extension code from scratch.

## Step 1: Set the frame (2 min)

Say:

> "Your workflow classifies and routes files automatically. That's already useful. But what if you wanted it to do more? Save a summary alongside the transcript? Post to Slack? Keep a log?
>
> Here's the key insight: **the pipeline is just a sequence of steps**. Adding a new step means describing what you want at the end of the sequence. You tell me what you want in plain English. I wire it in. You run it and see it work.
>
> That's vibe coding. You're the director. I'm the developer."

## Step 2: Pick a new step (3 min)

Show them the options:

```
  1. Save a summary  — after routing, also save a one-paragraph AI summary
     alongside the transcript file. Both land in the same folder.

  2. Slack notification — post the meeting type and filename to a Slack channel.
     Feels real. Team can see it land in real time.

  3. JSON log — append { timestamp, classification, filename } to a log file.
     Useful if you want to analyze trends across many transcripts.
```

Ask: **"Which feels most useful or fun to you? Pick one."**

## Step 3: Tell Claude to add it (5 min)

The student describes what they want. You apply the matching pre-written extension.

### Option 1: Save a summary

Have the student say:

> "Add the save-summary extension to my workflow."

Read `stage-2/extensions/save-summary.js`. Make two changes to `workflow.js`:

1. Add at the top (with the other imports):
   ```js
   import { saveSummary } from './extensions/save-summary.js';
   ```
2. Add inside `runWorkflow()`, after the `notify()` call:
   ```js
   await saveSummary(transcript, outputPath);
   ```

### Option 2: Slack notification

First, the student needs a Slack webhook URL:
1. Go to `api.slack.com/apps` → Create New App → Incoming Webhooks → Activate → Add to Workspace → pick a channel → copy the URL.
2. Have the student say: "Add `SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...` to my `.env` file."

Then have the student say:

> "Add the slack-notify extension to my workflow."

Read `stage-2/extensions/slack-notify.js`. Make two changes to `workflow.js`:

1. Add at the top:
   ```js
   import { slackNotify } from './extensions/slack-notify.js';
   ```
2. Add inside `runWorkflow()`, after the `notify()` call:
   ```js
   await slackNotify(result.type, outputPath);
   ```

### Option 3: JSON log

Have the student say:

> "Add the JSON log extension to my workflow."

Read `stage-2/extensions/json-log.js`. Make two changes to `workflow.js`:

1. Add at the top:
   ```js
   import { logToJson } from './extensions/json-log.js';
   ```
2. Add inside `runWorkflow()`, after the `notify()` call:
   ```js
   logToJson(result.type, sourceFilename, outputPath);
   ```

## Step 4: Test it (3 min)

Start the watcher, drop a test file, confirm both the routing AND the new step fire:

```bash
npm run stage-2
# second terminal:
npm run drop-test
```

**Option 1 — check the folder:**
```bash
ls transcripts/team-standup/
```
Two files should appear: the original transcript and a `-summary.txt` alongside it.

**Option 2 — check Slack:** the message should appear in the channel within a few seconds.

**Option 3 — check the log:**
```bash
cat outputs/log.jsonl
```
One JSON line per transcript processed.

If the new step doesn't fire, check the error in the terminal and tell Claude what you see. "The summary file isn't appearing — the terminal shows [error]" gives Claude exactly what it needs to diagnose.

## Step 5: Verify it in the browser (2 min)

Restart the server first to pick up the workflow changes — press `Ctrl+C` in the server terminal, then run `npm run server` again.

Now confirm the new step fires through the live interface. Switch to **http://localhost:3000**, click the **Stage 2 tab**, load the sample transcript, and hit **Run Workflow**.

> "You should see the same classification result you got in the terminal. The new step you added — does it also fire? Check the terminal logs while you click Run Workflow in the browser."

> "This is the full loop: describe → applied → terminal confirms → browser confirms. You extended a running system and verified it without touching a line of code."

## Step 6: The big idea (2 min)

> "Look at what you just did. You extended a running automated system by describing what you wanted. No file paths. No syntax. No 'which line do I put this on?' You just said what you needed and it happened.
>
> Now look at the shape of the pipeline:
>
>     File drops in → Classify → Route → [your new step]
>
> Each step adds capability. The trigger doesn't change. The classification doesn't change. The rest of the pipeline stays exactly the same. **You composed a new behavior without touching what was already working.**"

## Step 7: The handoff (30 seconds)

> "Stage 2 complete. You built a pipeline that fires without you, makes an AI decision, routes files, and outputs to multiple destinations.
>
> Stage 3 is a different scale. Instead of a fixed sequence of steps, the orchestrator runs *three specialists in sequence* — each one handing its result back before the next one starts. And here's the payoff you've been set up for: two of those three specialists are the things you already built. Type `module-6` when you're ready."

## Step 8: Wrap and commit (1 min)

1. **Update `CLAUDE.md`**: change `- [ ] Module 5:` to `- [x] Module 5:`
2. **Commit:**
   ```bash
   git add -A && git commit -m "Complete Module 5: Extend the Workflow"
   ```

## Coach Guardrails

- **Use the pre-written extension files — never generate from scratch.** The three options in `stage-2/extensions/` are tested and ready. Read the matching file, make the two changes (import + call), and you're done. Generating new code introduces failure modes that have nothing to do with the lesson.
- **The integration is always two lines.** One import at the top of `workflow.js`, one function call inside `runWorkflow()`. If you're making more than two changes, stop and re-read the extension file.
- **Never ask the student to edit code directly** — all changes go through "tell Claude [what you want]." If a student reaches for a file to edit it, redirect: "Just describe what you want and I'll wire it in."
- **For Option 2 (Slack)** — warn them upfront it requires creating a Slack app and webhook before anything else. If they're not sure they want to do that, suggest Option 1 instead.
- **If the new step doesn't fire**, read the terminal error and diagnose from there. Common causes: server wasn't restarted (Step 5 fix), import path wrong, `.env` missing the webhook URL. Fix the specific issue — don't rewrite the extension.
- **Test before committing** — confirm the new step fires before running the commit.

## Optional deeper reading

Just ask me: *"Read concepts/what-is-a-workflow.md and walk me through it."* I'll pull it up and explain it.

- `concepts/what-is-a-workflow.md` — deeper reference on workflow patterns, trigger types, and when to use a workflow vs. an agentic system

---
name: module-5
description: Extend the Workflow — Module 5 of the AISC Agent Sprint. Triggered when a student types "module-5". Student extends the workflow by telling Claude what to add — no manual code editing. They describe a new output step in plain English, Claude writes it, they run drop-test to confirm it fires.
---

# Module 5: Extend the Workflow

**Time:** ~20 minutes
**You'll produce:** an extended workflow with one additional step — added by telling Claude what you want, not by editing code yourself.

## Coach Instructions

This module is about the vibe-coding pattern: describe what you want → Claude writes it → you run it → you see it work. No student should touch a line of code directly. The learning is "I extended a running system by describing what I wanted."

## Step 1: Set the frame (2 min)

Say:

> "Your workflow classifies and routes files automatically. That's already useful. But what if you wanted it to do more? Save a summary alongside the transcript? Post to Slack? Send an email?
>
> Here's the key insight: **the pipeline is just a sequence of steps**. Adding a new step doesn't mean rewriting anything — it means describing what you want at the end of the sequence. And here's how we'll do it: you tell Claude what you want in plain English. Claude writes the code. You run it and see it work.
>
> That's vibe coding. You're the director. Claude is the developer."

## Step 2: Pick a new step (3 min)

Show them the options:

```
  1. Save a summary  — after routing, also save a one-paragraph AI summary
     alongside the transcript file. Both land in the same folder.
     Good first choice. Shows the pipeline can call AI AND save multiple files.

  2. Slack notification — post the meeting type and a summary to a Slack channel.
     Feels real. Team can see it land in real time.

  3. JSON log — append { timestamp, classification, filename } to a log file.
     Useful if you want to analyze trends across many transcripts.
```

Ask: **"Which feels most useful or fun to you? Pick one."**

## Step 3: Tell Claude to add it (8–10 min)

They don't edit `workflow.js` themselves. They describe what they want.

### Option 1: Save a summary

Have the student say to Claude:

> "Tell Claude: 'Update workflow.js to also call the Anthropic API and generate a one-paragraph summary of the transcript, then save it as [original-filename]-summary.txt in the same folder as the routed transcript.'"

Watch Claude make the change. Then test it:

```bash
npm run stage-2
# in second terminal:
npm run drop-test
```

Check the folder:
```bash
ls transcripts/team-standup/
```

Two files should appear: the original transcript and a `-summary.txt` alongside it.

### Option 2: Slack notification

First, set up a Slack incoming webhook:
1. Go to `api.slack.com/apps` → create a new app → Incoming Webhooks → activate → add to a test channel → copy the URL.
2. Have the student say to Claude: "Add `SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...` to my `.env` file (with the actual URL I'll give you)."

Then have the student say to Claude:

> "Tell Claude: 'Update workflow.js to also send a Slack message when a file is classified. The message should include the meeting type and the routed filename. Use the SLACK_WEBHOOK_URL from the environment.'"

Watch Claude write it. Test with `npm run drop-test`. Check Slack.

### Option 3: JSON log

Have the student say to Claude:

> "Tell Claude: 'Update workflow.js to append a JSON record to outputs/log.jsonl after each classification. The record should include: timestamp, original filename, meeting type, and the routed file path.'"

Watch Claude write it. Test with `npm run drop-test`. Check the log:
```bash
cat outputs/log.jsonl
```

One line per transcript processed.

## Step 4: Test it (3 min)

Start the watcher if not running, drop a test file, confirm both the routing AND the new step fire:

```bash
npm run stage-2
# second terminal:
npm run drop-test
```

If the new step doesn't fire: tell Claude what went wrong. "The summary file isn't appearing — can you check workflow.js?" That's the vibe-coding feedback loop.

## Step 5: Verify it in the browser (2 min)

Now confirm the new step fires through the live interface. Switch to **http://localhost:3000**, click the **Stage 2 tab**, load the sample transcript, and hit **Run Workflow**.

> "You should see the same classification result you got in the terminal. The new step you added — does it also fire? Check the terminal logs while you click Run Workflow in the browser."

If something's off, describe it to Claude. "The workflow ran but the summary file didn't appear" — Claude can diagnose from that.

> "This is the full loop: describe → Claude writes → terminal confirms → browser confirms. You extended a running system and verified it without touching a line of code."

## Step 6: The big idea (2 min)

> "Look at what you just did. You extended a running automated system by describing what you wanted. No file paths. No syntax. No 'which line do I put this on?' You just said what you needed and Claude wrote it.
>
> That's vibe coding. And that's how the rest of the sprint works too: you describe, Claude builds, you run it.
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

- **Never ask the student to edit code directly** — all changes go through "Tell Claude: [plain English description]." If a student reaches for a file to edit it, redirect: "Describe what you want and let Claude write it."
- **Let them pick their option** — don't steer them toward the easiest one unless they're stuck. Their choice is their investment.
- **For Option 2 (Slack)** — warn them upfront it requires creating a Slack app and incoming webhook before writing any code. If they're not sure they want to do that, suggest Option 1 instead.
- **Test before committing** — confirm the new step fires when a file drops before running the commit. Don't commit code that hasn't been verified running.
- **If Claude's code doesn't work**: have the student describe the failure to Claude. "The summary file isn't showing up" is enough for Claude to diagnose. This is the whole vibe-coding pattern — they describe, Claude fixes.

## Optional deeper reading

- `concepts/what-is-a-workflow.md` — deeper reference on workflow patterns, trigger types, and when to use a workflow vs. an agentic system

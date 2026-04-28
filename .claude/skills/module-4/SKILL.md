---
name: module-4
description: Automate the Trigger — Module 4 of the AISC Agent Sprint. Triggered when a student types "module-4". Walks the student through stage-2/watcher.js — a chokidar folder watcher that runs the agent automatically every time a new transcript file shows up, and saves the report to outputs/.
---

# Module 4: Automate the Trigger

**Time:** ~20 minutes
**You'll produce:** a working folder watcher. Drop any `.txt` file into `transcripts/` and your agent runs automatically, saving the report to `outputs/`.

## Coach Instructions

This is the first taste of "agents that work without you." Keep the energy high — there's a real magic moment when they drop a file and the terminal lights up.

## Step 1: Set the frame (2 min)

Say:

> "Welcome to Stage 2. In Stage 1 you built a chat assistant that runs once when you tell it to. Today, we automate the trigger. The agent stays running in the background, watching a folder. Whenever a new transcript shows up, it runs itself and saves the result.
>
> No button to click. No command to type each time. **The agent works while you do something else.** That's a workflow."

## Step 2: Open the watcher (3 min)

Open `student-output/stage-2/watcher.js`. Read it together top to bottom.

The 3 logical pieces:
1. **`runAgent(transcript)`** — same logic as `chat.js`, just wrapped in a function. The agent's brain is unchanged from Stage 1.
2. **`saveReport(report, sourceFilename)`** — writes the result to `outputs/[timestamp]-[name].md`.
3. **`chokidar.watch(...)`** — the trigger. Every time a new `.txt` file shows up in `transcripts/`, fire the `add` handler.

Point out:

> "Look at how little is new. The agent itself is the same code from Stage 1. We added two things: a *trigger* (chokidar watching a folder) and a *destination* (write the report to a file). That's it. Stage 2 = Stage 1 + trigger + destination."

## Step 3: Start it (3 min)

Have them run:

```bash
npm run stage-2
```

They should see:

```
👀 Watching .../transcripts for new .txt files...
    Drop a transcript into that folder to run the agent.
```

Then it just sits there, listening.

> "It's running. Right now it's quietly watching the folder, doing nothing. Until something happens."

## Step 4: Trigger it (4 min)

Now the magic moment. In a **second terminal window** (keep the watcher running in the first), have them copy the sample transcript with a new name:

```bash
cd student-output
cp transcripts/sample-transcript.txt transcripts/test-run-1.txt
```

Watch the watcher terminal. They should see:

```
📄 New file detected: test-run-1.txt
⚡️ Running agent...
✓ Saved → outputs/2026-04-28-1042-test-run-1.md
```

The agent ran by itself. No `npm run` needed.

> "That. Just happened. You created a file. The agent woke up, processed it, and saved the result. Open `outputs/` and look — there's a markdown file with the full report."

Have them open the saved file:

```bash
cat outputs/*.md
```

## Step 5: Trigger again (3 min)

Have them try a few more files. Drop them in, watch the agent fire.

```bash
cp transcripts/sample-transcript.txt transcripts/test-run-2.txt
echo "Quick chat with the team about the launch." > transcripts/tiny.txt
```

Each one fires the agent. Each one produces a report in `outputs/`.

> "This is the difference between an *assistant* and a *workflow*. An assistant waits for you. A workflow runs on its own. You just built a workflow in 30 lines of code, no n8n required."

## Step 6: Stop it cleanly (1 min)

Tell them how to stop the watcher:

> "When you're done playing, hit `Ctrl+C` in the watcher's terminal to stop it. The agent stops listening; nothing else changes."

## Step 7: The big idea (2 min)

Pause and zoom out:

> "Notice the shape of what you built:
>
>     Trigger        →    Agent (same as Stage 1)    →    Destination
>     [file lands]        [API call]                      [save markdown]
>
> The agent in the middle is unchanged. We swapped the trigger from 'user runs the script' to 'file appears.' We swapped the destination from 'print to terminal' to 'save to file.'
>
> Once you see this pattern, you can swap *any* trigger and *any* destination. A scheduled cron. An incoming email. A Slack message. A webhook from your CRM. The agent doesn't care. **The trigger and destination are pluggable.**"

## Step 8: Wrap and commit (2 min)

1. Have them clean up the test files if they want:
   ```bash
   rm transcripts/test-run-*.txt transcripts/tiny.txt
   ```
2. **Update `CLAUDE.md`**: change `- [ ] Module 4:` to `- [x] Module 4:`
3. **Commit:**
   ```bash
   git add -A && git commit -m "Complete Module 4: Automate the Trigger"
   ```
4. Hand off:

> "Beautiful. You have an agent that runs without you. In Module 5 we'll make the *destination* more interesting — your reports can land in a markdown file, sure, but also a database, a Slack message, or anywhere else you want them. Type `module-5` when you're ready."

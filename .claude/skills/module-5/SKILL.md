---
name: module-5
description: Output Destinations — Module 5 of the AISC Agent Sprint. Triggered when a student types "module-5". Student picks one additional destination (Slack, Notion, console-with-color, JSON file, etc.) and extends watcher.js to send the report there as well as the markdown file. Reinforces the "trigger + agent + destination" pattern.
---

# Module 5: Output Destinations

**Time:** ~25 minutes
**You'll produce:** an extended `watcher.js` that sends the report to one *additional* destination beyond the markdown file — Slack, a JSON log, a copy in your clipboard, anywhere you'd like the report to actually show up.

## Coach Instructions

This is an open-ended module. Don't prescribe one answer. Help the student pick a destination that's *useful for them*. The point is the pattern — once they've added one extra destination, they can add five.

## Step 1: Set the frame (2 min)

Say:

> "Module 4 saved your reports to a markdown file. That's fine, but in real life, your report doesn't always want to live in a folder. Maybe you want it in Slack, so the team can see it. Maybe you want it in Notion, attached to your meeting page. Maybe you want a JSON log so you can analyze it later.
>
> The cool thing: **the destination is a separate concern from the agent.** The agent does its job, returns a string. Where you send that string is your call. Today you'll add one more destination."

## Step 2: Pick a destination (4 min)

Show them the menu:

```
  1. Console with color/formatting
     - easiest. Just makes the terminal output prettier.
     - good warmup if you've never touched output formatting.

  2. JSON log file
     - writes outputs/log.jsonl with timestamp + report.
     - useful if you want to feed reports into a spreadsheet or dashboard later.

  3. Slack webhook
     - posts the report to a Slack channel.
     - feels real — a teammate could see it land.
     - needs a Slack incoming webhook URL (5 min setup).

  4. Local notification
     - macOS notification when a report lands.
     - tiny dopamine hit when the agent finishes.
     - Mac only.

  5. Notion (advanced)
     - creates a Notion page with the report as content.
     - needs a Notion integration token + database.
     - skip if you've never touched the Notion API before.
```

Ask: **"Which one feels useful or fun? Pick one and we'll wire it up."**

## Step 3: Wire it up (10–15 min)

Below are the additions for each option. Pick the one they chose and walk them through.

### Option 1: Console with color/formatting

Install one tiny dependency:

```bash
npm install picocolors
```

Then edit `stage-2/watcher.js`. Add at the top:

```js
import pc from "picocolors";
```

Right after the `saveReport(...)` line in the `add` handler, add:

```js
// console destination
console.log("\n" + pc.cyan("─".repeat(60)));
console.log(pc.bold(pc.cyan("📊 INSIGHTS REPORT")));
console.log(pc.cyan("─".repeat(60)));
console.log(report);
console.log(pc.cyan("─".repeat(60)) + "\n");
```

Save, restart the watcher, drop a test file. They'll see the report printed in the terminal with a colored frame.

### Option 2: JSON log file

No extra deps. Add at the top of `stage-2/watcher.js`:

```js
const LOG_FILE = path.join(OUTPUTS_DIR, "log.jsonl");
```

Add inside the `add` handler, right after `saveReport(...)`:

```js
// json log destination
const logEntry = {
  timestamp: new Date().toISOString(),
  source: filename,
  report,
};
fs.appendFileSync(LOG_FILE, JSON.stringify(logEntry) + "\n", "utf-8");
console.log(`✓ Logged to ${path.relative(ROOT, LOG_FILE)}`);
```

Save, restart, test. They can `cat outputs/log.jsonl` to see the log accumulate.

### Option 3: Slack webhook

Slack setup (3 min):
1. Go to <https://api.slack.com/apps>, create a new app from scratch (workspace dev mode).
2. Add the **Incoming Webhooks** feature, enable it, create one for a test channel.
3. Copy the webhook URL.

Add the URL to `.env`:

```
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

Edit `stage-2/watcher.js`, add inside the `add` handler after `saveReport(...)`:

```js
// slack destination
if (process.env.SLACK_WEBHOOK_URL) {
  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `📊 *New insights report from \`${filename}\`*\n\`\`\`${report}\`\`\``,
    }),
  });
  console.log("✓ Posted to Slack");
}
```

Save, restart, test. They'll see the report land in Slack.

### Option 4: macOS notification

Add inside the `add` handler:

```js
// macOS notification destination
import { exec } from "node:child_process";
exec(`osascript -e 'display notification "Saved report from ${filename}" with title "Agent done"'`);
```

Save, restart, test. Mac shows a notification banner.

### Option 5: Notion (advanced)

Skip the walkthrough — it's its own can of worms (database setup, integration token, schema). If they really want this, point them to the Notion API docs and have them follow along after the sprint.

## Step 4: Test it (3 min)

Whatever destination they picked, have them run the watcher and drop a fresh file:

```bash
cp transcripts/sample-transcript.txt transcripts/destination-test.txt
```

Confirm they see *both* the markdown file *and* the new destination fire.

## Step 5: The big idea, restated (2 min)

> "You now have an agent that:
>
>     Trigger        →    Agent             →    Destinations (plural!)
>     [file lands]        [API call]              [markdown + your-thing]
>
> Stage 2 is officially done. Take a moment to appreciate this — most people who 'use AI' have never built something this real. You have an automation that runs without you, processes input, and lands the output where you actually use it.
>
> One more stage. In Stage 3 we'll level up the agent itself — split it into an orchestrator with sub-agents."

## Step 6: Wrap and commit (1 min)

1. **Update `CLAUDE.md`**: change `- [ ] Module 5:` to `- [x] Module 5:`
2. **Commit:**
   ```bash
   git add -A && git commit -m "Complete Module 5: Output Destinations"
   ```
3. Hand off:

> "Stage 2 done. Next up — the big one. Stage 3 is where you build a multi-agent system. The orchestrator pattern. Type `module-6` when you're ready."

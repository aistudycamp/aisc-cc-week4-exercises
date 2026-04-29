---
name: module-5
description: Extend the Workflow — Module 5 of the AISC Agent Sprint. Triggered when a student types "module-5". Student adds additional steps to the workflow pipeline (Slack, JSON log, console, etc.), reinforcing that workflows are composed of steps and that the pipeline is the thing they control.
---

# Module 5: Extend the Workflow

**Time:** ~20 minutes
**You'll produce:** an extended workflow with one additional step — the report lands somewhere new in addition to the markdown file.

## Coach Instructions

This module reinforces that a workflow is *a sequence of steps you control*. Each addition is a new step in `runWorkflow()` — not a separate "integration." Keep the focus on the code shape: step 1, step 2, step 3. The student can pick whichever new step appeals to them.

## Step 1: Set the frame (2 min)

Say:

> "Stage 2 is done — but the pipeline only has one output step: save a markdown file. In real life, your report probably needs to go somewhere else too. To a Slack channel so the team sees it. To a JSON log so you can analyze trends. To a database row.
>
> Here's the key insight: **the output step is just another step in the pipeline**. We add it inside `runWorkflow()`. The chat assistant doesn't change. The trigger doesn't change. We just extend the sequence."

## Step 2: Open workflow.js and locate the extension point (2 min)

Open `student-output/stage-2/workflow.js`. Find the end of `runWorkflow()`:

```js
  // Step 4: save to outputs/
  fs.writeFileSync(outPath, body, 'utf-8');

  // Step 5: return saved path
  return outPath;
```

> "Step 5 is where we add more steps. After the file is saved, we can do anything else we want with `reportText` or `outPath`. Let's pick one."

## Step 3: Pick a new step (3 min)

Show them the options:

```
  1. Console print — format the report in the terminal with a visual separator.
     Easiest. Good warmup.

  2. JSON log — append { timestamp, source, report } to outputs/log.jsonl.
     Useful for analysis or building a dashboard later.

  3. Slack webhook — post the report to a Slack channel.
     Feels real. Team can see it land.

  4. macOS notification — show a banner when the pipeline finishes.
     Tiny, satisfying signal.
```

Ask: **"Which feels useful or fun? Pick one."**

## Step 4: Add the step (8–10 min)

### Option 1: Console print

Add after the save step inside `runWorkflow()`:

```js
// Step 5: print to console
console.log("\n" + "─".repeat(60));
console.log("📊 INSIGHTS REPORT");
console.log("─".repeat(60));
console.log(reportText);
console.log("─".repeat(60) + "\n");
```

No new dependencies needed.

### Option 2: JSON log

Add at the top of the file:

```js
const LOG_FILE = path.join(OUTPUTS_DIR, "log.jsonl");
```

Add inside `runWorkflow()` after the save step:

```js
// Step 5: append to JSON log
const entry = { timestamp: new Date().toISOString(), source: sourceFilename, report: reportText };
fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + "\n", "utf-8");
```

Test with `cat outputs/log.jsonl` — one line per transcript processed.

### Option 3: Slack webhook

First, set up a Slack incoming webhook:
1. Go to `api.slack.com/apps` → create a new app → Incoming Webhooks → activate → add to a test channel → copy the URL.
2. Add to `.env`:
   ```
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
   ```

Add inside `runWorkflow()` after the save step:

```js
// Step 5: post to Slack
if (process.env.SLACK_WEBHOOK_URL) {
  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `📊 *Report from \`${sourceFilename}\`*\n\`\`\`${reportText.slice(0, 2000)}\`\`\``,
    }),
  });
}
```

### Option 4: macOS notification

Add at the **top of the file**, with the other imports:

```js
import { exec } from "node:child_process"; // add this line at the top, not inside runWorkflow
```

Then add inside `runWorkflow()` after the save step:

```js
// Step 5: macOS notification
exec(`osascript -e 'display notification "Report saved from ${sourceFilename}" with title "Pipeline done"'`);
```

Note: ES module `import` statements must be at the top level of the file. Putting one inside a function causes a SyntaxError.

## Step 5: Test it (3 min)

Start the watcher and drop a file:

```bash
npm run stage-2
# in second terminal:
cp transcripts/sample-transcript.txt transcripts/step-test.txt
```

Confirm both the markdown file *and* the new step fire.

## Step 6: The big idea (2 min)

> "Look at the shape of `runWorkflow()` now:
>
>     Step 1 (caller): read file
>     Step 2: call ask()   ← the Stage 1 chat assistant
>     Step 3: format
>     Step 4: save markdown
>     Step 5: [your new step]
>
> Each step is a few lines. Each step has a clear input and output. The pipeline is just functions in a sequence.
>
> Workflows aren't magic. They're **composed of steps**. Once you see that, you can add as many steps as you need — database, analytics, email, whatever. The chat assistant in step 2 never changes."

## Step 7: Wrap and commit (1 min)

1. Clean up test file: `rm transcripts/step-test.txt`
2. **Update `CLAUDE.md`**: change `- [ ] Module 5:` to `- [x] Module 5:`
3. **Commit:**
   ```bash
   git add -A && git commit -m "Complete Module 5: Extend the Workflow"
   ```
4. Hand off:

> "Stage 2 done. You now have a pipeline that runs without you and produces exactly the outputs you want. Here's what changes in Stage 3: instead of a fixed sequence of steps, the system reads the input first and *decides* what to run. It looks at the transcript and asks: what analysis does this actually need? That decision-making is what makes it an agentic system. Type `module-6` when you're ready."

## Coach Guardrails

- **Let them pick their option** — don't steer them toward the easiest one unless they're stuck. Their choice is their investment.
- **For Option 3 (Slack)** — warn them upfront that it requires creating a Slack app and incoming webhook before writing a line of code. If they're not sure they want to do that, suggest Option 1 or 2 instead.
- **Imports go at the top of the file** — if the student puts `import { exec }` inside `runWorkflow()`, stop them. ES module imports must be top-level declarations. This causes a `SyntaxError` at parse time.
- **Test before committing** — confirm the new step actually fires when a file is dropped before running the commit. Don't commit broken code.

## Optional deeper reading

- `concepts/what-is-a-workflow.md` — deeper reference on workflow patterns, trigger types, and when to use a workflow vs. an agentic system

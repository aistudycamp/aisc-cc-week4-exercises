---
name: module-6
description: The Agentic System — Module 6 of the AISC Agent Sprint. Triggered when a student types "module-6". Student reads stage-3/orchestrator.js inline (coach prints it), sees the parallel dispatch (Promise.all), walks through the 3-step sequence (Analyst+Extractor parallel → Synthesizer → Router), runs the full system, and arrives at the Claude Code connection — "you've been using this pattern all week."
---

# Module 6: The Agentic System

**Time:** ~30 minutes

**What we're building**
By the end: a working agentic orchestrator. Analyst and Extractor run in parallel, their outputs are combined by Synthesizer, and the result is routed by the workflow you built in Module 4. Stage 3 is live.

## Coach Instructions

This is the conceptual peak. Three moments to land:
1. **The parallel dispatch** — first time anything in this course runs simultaneously.
2. **The building blocks click** — the orchestrator imports their own work from Stages 1 and 2.
3. **The Claude Code connection** — "You've been using this pattern all week."

Take it slow. Let each one land before moving to the next.

## Step 1: Set the frame (3 min)

Say:

> "We've built two things: a chat assistant that answers questions, and a workflow that classifies and routes files. Stage 3 is parallel orchestration — Analyst and Extractor run at the same time, then Synthesizer combines them, then the Stage 2 router takes over.
>
> Heads up on the vocabulary: by Anthropic's definition this is still a *workflow* — it runs predefined steps every time. In Module 7 we'll add a planning step (the Conductor) that decides which steps to take, and that's the moment it crosses into actual agent territory.
>
> And here's the payoff you've been set up for: the specialists you just read in Module 5, the workflow you built in Module 4 — the orchestrator is what wires them all together. You're not starting over. You're composing what you have."

Before we look at any code, ask:

> "What's the difference between running two things *in sequence* versus running them *in parallel*?"

Wait for their answer. Then:

> "In sequence: Analyst finishes, *then* Extractor starts. In parallel: both start at the same time, both run simultaneously, both finish before we move on. For our two independent specialists — Analyst and Extractor — there's no reason one has to wait for the other. Running them in parallel cuts the time roughly in half."

## Step 2: The architecture (3 min)

Print this:

```
transcript
     ↓
[Analyst  ‖  Extractor]   ← parallel — both run at the same time (Promise.all)
          ↓
     [Synthesizer]         ← receives both outputs, produces the final report
          ↓
       [Router]            ← Stage 2's runWorkflow() — classifies from transcript,
                              saves both transcript + report to typed folder, notifies
```

> "Read it top to bottom. The transcript goes in. Analyst and Extractor run simultaneously — that double bar ‖ means parallel. When both finish, Synthesizer combines their outputs into the final report. Then Router takes the transcript and the report, classifies the meeting type, saves both files to the right folder, and sends the notification.
>
> Three steps. Four API calls total (two parallel, one synthesis, one classifier). Two building blocks you already built."

## Step 3: Read orchestrator.js — start at the imports (5 min)

**Coach:** Use the Read tool to read `student-output/stage-3/orchestrator.js` and print the relevant sections inline. Do not ask the student to open the file or run any terminal command just to view it.

Here's what's at the top of `stage-3/orchestrator.js` right now:

**[Coach: Read `student-output/stage-3/orchestrator.js` and print the prompt-loading block and the import line below]**

Start with the prompt file loads:

```js
const promptAnalyst    = fs.readFileSync(path.join(ROOT, 'prompts', 'analyst.md'),    'utf-8');
const promptExtractor  = fs.readFileSync(path.join(ROOT, 'prompts', 'extractor.md'),  'utf-8');
const promptSynthesizer = fs.readFileSync(path.join(ROOT, 'prompts', 'synthesizer.md'), 'utf-8');
```

> "Stop here. These three files are the specialists you read in Module 5. The orchestrator loads them at startup — each one becomes the system prompt for a different API call."

Then the import:

```js
import { runWorkflow } from '../stage-2/workflow.js'; // ← Stage 2 building block
```

> "And this — `runWorkflow` from Stage 2. The workflow you built in Module 4. The orchestrator imports it directly. Two modules ago you were building this function. Now it's a building block."

Ask:

> "You've seen the prompts load and the workflow import. What do you think happens first when the orchestrator runs?"

Wait for their answer. The answer: Analyst and Extractor fire at the same time.

## Step 4: Walk through the parallel dispatch (4 min)

**Coach:** Print the `orchestrator()` function — specifically the Promise.all block and the two lines that follow:

```js
// Step 1: Analyst + Extractor run in parallel — first time anything runs simultaneously
const [themes, actions] = await Promise.all([
  analyst(transcript),
  extractor(transcript),
]);
```

> "This is the most important line in Stage 3. `Promise.all` fires both calls at the same time. Both send their request to Anthropic. Both wait. Both return. The `[themes, actions]` destructuring captures both results when they're both done.
>
> This is the first time in this course anything runs simultaneously. As we said in Step 1, Anthropic still calls this a workflow — it runs predefined steps every time. But it's a *parallel* workflow, and it's the direct predecessor to what becomes an agent in Module 7 when the Conductor decides which steps to take."

Then the synthesis:

```js
// Step 2: Synthesizer combines results into the final report
const report = await synthesizer(themes, actions);
```

> "Synthesizer takes themes from the Analyst and actions from the Extractor. It can't start until both finish — that's why it's *after* the Promise.all, not inside it."

Then the router:

```js
// Step 3: Router — classify from transcript, save both files, notify
const { classification, outputPath } = await runWorkflow(transcript, sourceFilename, report);
```

> "And the last step: `runWorkflow()`. Your Stage 2 function. It classifies the meeting type, saves the transcript to the typed folder, *also* saves the synthesized report alongside it, and sends the notification. That optional `report` parameter is why you wrote the workflow the way you did."

## Step 5: Run it (5 min)

The server should already be running from Module 3. If you just opened a fresh terminal, run `cd [repo-root]` first (use `pwd` to confirm the repo root), then:

```bash
npm run server
```

Open **http://localhost:3000** and click the **Stage 3** tab.

Click **Load standup**, then hit **Run Orchestrator →**.

Watch each step light up:

```
📄 Input: transcripts/sample-transcript.txt (N words)
🤖 Orchestrator starting — Analyst + Extractor in parallel, then Synthesizer, then Router.

  🔀 Step 1: Analyst + Extractor running in parallel...
  ✓ Analyst complete. Extractor complete.
  🧠 Step 2: Synthesizer combining results...
  ✓ Report synthesized.
  ⚙️  Step 3: Router — classifying, saving, notifying...
    🔍 Classifying meeting type...
    ✓ Classified as: team-standup
    ✓ Routed → transcripts/team-standup/...
    ✓ Report  → transcripts/team-standup/...-report.md
✓ Orchestration complete.

────────────────────────────────────────────────────────────
[final report here]
```

Point at the output:

> "Step 1 says 'Analyst + Extractor running in parallel' — both fired at once. Step 2 is Synthesizer — it waited. Step 3 is the workflow you built in Module 4. And after it, there's now a report file alongside the transcript in the typed folder."

**Coach:** Use the Read tool to list the `student-output/transcripts/team-standup/` directory and show the student the two files: the transcript and the report.

> "Two files: the transcript and the report. That's Stage 3."

## Step 6: Run it through the browser (4 min)

You're already in the browser. Click each node on the diagram and point to the code behind it.

> "Each checkmark is a real API call completing. Step 1 shows both analysts finishing simultaneously — you can see the parallel dispatch happening."

Show the inspect panels — each one maps to a specific file you've now run.

## Step 7: The Claude Code connection (3 min)

Say:

> "One more thing before we wrap. You've been using Claude Code all sprint — you type what you want, it reads the code, thinks about what to change, and does it.
>
> Here's what's actually happening when you do that:"

Print this:

```
You (user message)
     ↓
Claude Code (orchestrator)
     ↓
[Read file ‖ Search codebase ‖ Check context]   ← parallel tool calls
          ↓
     [Reason about changes]
          ↓
       [Write files + Report back]
```

> "Claude Code is an orchestrator. It takes your request, dispatches tools in parallel (reading files, searching code), synthesizes what it found, and produces the output. Same pattern you just built.
>
> But here's the part you haven't built yet — the **loop**:"

```
plan → act → observe → decide → repeat
   ↑                              │
   └──────────────────────────────┘
```

> "Claude Code doesn't just dispatch once. It plans (reads your message, picks tools), acts (calls them), observes (reads what came back), decides (am I done? do I need more?), and repeats until the task is finished. The orchestrator you just built runs the loop *once* and stops. A real agent runs it as long as it needs to.
>
> The Conductor you'll meet in Module 7 is one step of that loop — the planning step. Production agents are that loop running on autopilot.
>
> When you built Stage 3, you weren't just learning about agentic systems — you were reverse-engineering the tool you were using to build it. **Every multi-specialist system you'll work with is some flavor of: dispatch → run specialists → combine → route**, often inside a loop. The pattern you just built is one common shape (parallelization with synthesis). Other shapes exist — routing, prompt chains, evaluator-optimizer loops, fully autonomous agents that loop on environmental feedback. Read `concepts/what-is-an-agent.md` for the broader taxonomy."

## Key takeaways

- `Promise.all` runs specialists in parallel — both start at once, you wait for both to finish
- The orchestrator doesn't add intelligence — it coordinates. The specialists do the work.
- Stage 3 builds on everything: `ask()` from Stage 1, `runWorkflow()` from Stage 2, parallel dispatch from this module

## Step 8: Wrap and commit (2 min)

What you've built so far:

```
┌────────────┐   ┌────────────┐   ┌──────────────────────────────────────┐
│  Stage 1   │   │  Stage 2   │   │  Stage 3 — Agentic System             │  ← you designed this
│  chat.js   │   │workflow.js │ → │  orchestrator.js                      │
│  ask()     │   │runWorkflow │   │  [Analyst ‖ Extractor] (parallel)     │
└────────────┘   └────────────┘   │            ↓                          │
                                  │     [Synthesizer]                     │
                                  │            ↓                          │
                                  │  [Router → saves transcript + report] │
                                  └──────────────────────────────────────┘
```

**Coach:** Do all three of the following steps automatically — do not ask the student to run terminal commands:

1. Run `git add -A && git commit -m "Complete Module 6: The Agentic System"` via Bash tool and show the student the output: "Committed. Here's what went in: [changed files]"
2. Update `CLAUDE.md`: change `- [ ] Module 6:` to `- [x] Module 6:` via Edit tool.

3. Hand off:

> "You just designed a multi-agent system end-to-end. You read every prompt, you specified every step, you watched it run. That's the actual peak of this sprint. Two more modules: in Module 7 you'll tour the full system in the browser, and in Module 8 you'll make it your own. Type `module-7` when you're ready."

## Coach Guardrails

- **Slow down at the Promise.all** — "This is the most important line in Stage 3" means it. Don't move past the parallel dispatch until the student understands why it matters.
- **Make the prediction first** — "What do you think happens first when the orchestrator runs?" in Step 3 is not optional. Wait for their prediction before walking through the code.
- **The Claude Code connection is the capstone** — don't skip Step 7. It reframes everything they did this week. Land it before the commit.
- **Coach reads files inline** — never ask the student to open `orchestrator.js` or run `cat`. Use the Read tool and print the relevant sections directly in chat.
- **"Agentic" vs "workflow"** — the distinction is: parallel dispatch, context passing between specialists, and synthesis. If a student asks what makes Stage 3 *agentic* specifically, those are the three answers.
- **Have them look at the output folder** — show the two files via Read tool. Don't just describe it.

## Optional deeper reading

Just ask me: *"Read concepts/what-is-an-orchestrator.md and walk me through it."*

- `concepts/what-is-an-orchestrator.md` — goes deeper on orchestration patterns, parallel vs. sequential dispatch
- `concepts/what-is-an-agent.md` — re-read the hierarchy section now that you've built all three levels

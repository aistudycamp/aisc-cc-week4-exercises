---
name: module-7
description: Use Your Live System + The Conductor — Module 7 of the AISC Agent Sprint. Triggered when a student types "module-7". Student uses all three stages in the browser, then introduces the Conductor planning step — optional instruction input that decides which tools to run. The "workflow vs agent" distinction lands here. Screenshot moment.
---

# Module 7: Use Your Live System + The Conductor

**Time:** ~30 minutes

**What we're building**
By the end: you'll have used all three stages in the browser and understood the Conductor — the planning step that turns the orchestrator from a workflow into an agent. One new idea: the agent decides which steps to take.

## Coach Instructions

Two acts. Act 1 (~10 min): tour all three stages in the browser — fast, confirmatory, celebratory. Act 2 (~20 min): introduce the instruction input, read the Conductor prompt inline, and land the workflow/agent distinction. The screenshot happens at the end of Act 1. The teaching moment happens in Act 2. Don't conflate the two — Act 1 is celebration, Act 2 is the conceptual peak.

---

## Act 1: Use the System You Built (~10 min)

### Step 1: Set the frame (1 min)

Say:

> "Module 7. Two acts.
>
> **Act 1 (next ~10 minutes) is recap** — same code you've already built, now visible together in one browser UI. Stage 1 chat, Stage 2 workflow, Stage 3 orchestrator, all running. Nothing new conceptually — you're just confirming everything works end-to-end.
>
> **Act 2 introduces a brand-new idea** — the Conductor, a planning step that decides which agents to call. That's the moment your orchestrator stops being a workflow and starts being a real agent.
>
> Everything you've built is sitting behind a server you started in Module 3. The browser isn't showing you a diagram. It's running your code."

### Step 2: Confirm the server is running (1 min)

If the server is still running from Module 3 or 6, skip this. If not:

**Coach:** Run `pwd` via Bash to confirm the repo root. If you just opened a fresh terminal, run `cd [repo-root]` first (replace `[repo-root]` with the actual path from `pwd`). Then start the server:

```bash
npm run server
```

Open **http://localhost:3000**.

### Step 3: Stage 1 — chat with your assistant (3 min)

> "Recap callback: this is the chat assistant from Module 2 and Module 3, just running in the browser instead of the CLI."

Click the **Stage 1** tab. Click **Load standup**. Ask two questions:

```
Who looks most blocked?
Write a one-sentence Slack summary of this meeting.
```

> "That response came from `chat.js` → `ask()` → `system.md`. Same chain you saw in Module 2, now running in a browser.
>
> See the right panel — that's the raw request and response from Module 2, now always visible here."

### Step 4: Stage 2 — run the workflow (2 min)

> "Recap callback: this is the workflow you wired up in Module 4 — the Read → Call → Format → Save pipeline, now triggered by a button instead of a file appearing."

Click the **Stage 2** tab. Click **Load standup**. Hit **Run Workflow →**.

> "Your `workflow.js` just fired. Classified the meeting, routed the file, sent the notification. Same pipeline from Module 4."

### Step 5: Stage 3 — run the orchestrator (3 min)

> "Recap callback: this is the orchestrator from Module 6 — Analyst and Extractor in parallel, then Synthesizer, then Router. Nothing new yet."

Click the **Stage 3** tab. Click **Load standup**. Hit **Run Orchestrator →** (leave the instruction field blank for now).

Watch the steps light up:

```
Step 1 ✓  Analyst: find themes + decisions
Step 2 ✓  Extractor: pull action items
Step 3 ✓  Synthesizer: combine results
Step 4 ✓  Router: classify + save + notify
Step 5 ✓  Conductor reflects on the run
```

> "Every checkmark is a real API call completing. Steps 1 and 2 fire at the exact same time — that's `Promise.all` from Module 6, the parallel dispatch you just looked at. The panel splits them into two boxes so you can see which one ran (in a moment we'll do a run where only Extractor fires). Step 4 is the Stage 2 workflow. That's `orchestrator.js` running in your browser."

**Screenshot moment:**

> "Stage 3 tab, all five steps checked, report visible. Take a screenshot. A few hours ago, you hadn't built any of this. Right now you have a working multi-agent system. That's a real artifact — send it to your team."

---

## Act 2: The Conductor (~20 min)

### Step 6: Set the frame (2 min)

Say:

> "Everything you just used runs the same four steps every time — Analyst + Extractor → Synthesizer → Router. Load any transcript, hit the button, full pipeline. Every time. That's a workflow.
>
> Now I want to show you what turns it into an agent. Here's the new shape:"

```
[ Conductor ]  ← reads instruction, returns {tools: [...]}
     ↓
[ Analyst ‖ Extractor ]  →  [ Synthesizer ]  →  [ Router ]  →  [ Reflect ]
   (each step runs only if Conductor's plan includes it)
```

> "One new node at the top — the Conductor. It runs first, looks at your instruction, and decides which of the five downstream specialists to call. Same five tools you already have. New brain in front of them."

### Step 7: Introduce the instruction input (8 min)

Point to the **Optional instruction** field below the transcript area on the Stage 3 tab.

Four runs total. Two are scripted so the student sees the Conductor making clearly different decisions. Two are free-form so they prove to themselves the routing is real.

#### Run 1 (scripted): "Just give me the action items"

Have the student:
1. Click **Load standup** to load the transcript
2. Type in the instruction field: `Just give me the action items`
3. Click **Run Orchestrator →**

**Coach: STOP HERE.** Ask the student exactly this:

> "Look at the Conductor plan that just appeared at the top of the result. **What does it say the Conductor chose? Which steps lit up, and which stayed dark?**"

**Do NOT answer this yourself. Do NOT proceed to Run 2 until the student has actually responded.** If they only say "extractor" without noticing that the other steps stayed dark, gently probe: "Right — and what about Analyst, Synthesizer, Router, Reflect? Did they run?" Then wait again.

Once they confirm only Extractor fired, then explain:

> "The Conductor ran first — one planning call before anything else. It read your instruction, returned `{tools: ['extractor'], reasoning: '...'}`, and the orchestrator dispatched only that one specialist. Four other specialists exist; the agent chose not to call them."

#### Run 2 (scripted): "Just route this — skip the analysis"

Have the student clear the instruction field, then type: `Just route this — skip the analysis` and click **Run Orchestrator →**.

**Coach: STOP HERE again.** Ask:

> "Same question. **What did the Conductor choose this time? Which steps ran?**"

Wait for their answer. They should observe Router-only — no Analyst, no Extractor, no Synthesizer, no Reflect. The transcript saved to a folder, no report generated. If they don't notice that the report is missing, point at the result area: "Notice — there's no insights report this time. Why not?" The answer: synthesizer didn't run, so there's nothing to save as a report.

Then:

> "Two runs, two completely different sets of API calls — driven entirely by your instruction. **A workflow follows steps. An agent decides which steps to take.**"

#### Runs 3 + 4 (your turn): you design two more

Now hand the controls to the student:

> "Now you write two of your own. Try anything — be specific or be vague. The Conductor's job is to figure out the minimum set of tools that satisfies what you asked for. Some ideas:
> - 'Give me a full insights report but don't save it anywhere'
> - 'What were the main themes — no action items'
> - 'Run everything and then tell me what could be improved'
> - Or anything else you want."

For each of their two runs, **wait for the student to type the instruction and click Run** — don't predict their input. After each run, **ask them what the Conductor chose and whether it matched their intent**. If the Conductor chose something surprising (e.g., they asked for "themes" but it ran Analyst + Synthesizer), surface that: "Interesting — the Conductor decided the Synthesizer was needed too. Why might that be?" The judgment is the lesson.

After Run 4:

> "Same code path. Same five tools. Four totally different executions because the agent reasoned about your intent. That reasoning is the difference."

### Step 8: Read the Conductor prompt (6 min)

Say:

> "Here's the thing: the Conductor is just another system prompt. Same pattern you've seen all sprint. Let me show you."

**Coach:** Read `student-output/prompts/conductor.md` via Read tool and print the full contents inline:

> "Here's `prompts/conductor.md`:"

**[Coach: Read `student-output/prompts/conductor.md` and print full contents here]**

Walk through the key sections:

> "Look at the tools list at the top. The Conductor knows about five tools and what each one does — that's its 'menu.' Notice the dependency rules: synthesizer requires analyst AND extractor first; reflect requires synthesizer first. The Conductor knows the sequence constraints.
>
> Then the routing logic: 'just route this' → router only. 'What are the action items?' → extractor only. 'No instruction' → full pipeline.
>
> And the output rule at the bottom: return ONLY valid JSON with a `tools` array and a `reasoning` field. The orchestrator parses that JSON and uses it to decide what to dispatch.
>
> Three things to see here:"

1. **It's a system prompt** — same as `analyst.md`, `system.md`, `classifier.md`. The pattern doesn't change.
2. **The output format is machine-readable** — it returns JSON because the orchestrator code parses it, not a human. The extractor does the same thing for action items.
3. **The routing logic is the agent's judgment** — when the instruction doesn't match a specific rule, it uses 'judgment for anything else — pick the minimum set of tools that satisfies the instruction.' That's an LLM making a decision, not a switch statement.

Ask: **"What would happen if you gave it an instruction the routing rules don't explicitly cover — like 'give me a risk assessment'?"**

Wait for their answer. The answer: it falls through to the judgment rule and the LLM decides. This is the "agentic" part — the system prompt can't enumerate every possible instruction, so it reasons.

### Step 9: The takeaway (2 min)

Say:

> "Everything in this sprint has been the same pattern: a system prompt shapes what Claude does. The chat assistant in Module 3, the classifier in Module 4, the specialists in Module 5 — they're all just prompts.
>
> The Conductor is the same thing. Except its job isn't to analyze a transcript — it's to reason about which other agents to dispatch. It's an agent whose output is a plan for other agents.
>
> The Conductor is what crosses the line: predefined steps become *chosen* steps. The workflow in Module 4 didn't choose anything — it just executed a fixed sequence. The Conductor reads context and picks."

## Key takeaways

- A workflow follows steps. An agent decides which steps to take.
- The Conductor is just another system prompt — its job is to reason about which other agents to dispatch
- Every specialist in this sprint is a prompt: analyst, extractor, classifier, conductor — same pattern, different job

## Step 10: Wrap and commit (1 min)

What you've built so far:

```
┌────────────┐   ┌────────────┐   ┌──────────────────────────────────────────────┐
│  Stage 1   │   │  Stage 2   │   │  Stage 3 — Agentic System                     │
│  chat.js   │   │workflow.js │ → │  orchestrator.js                              │
│  ask()     │   │runWorkflow │   │  [Conductor — reads instruction, plans tools] │
└────────────┘   └────────────┘   │  [Analyst ‖ Extractor] (parallel, if called) │
                                  │            ↓ [Synthesizer] (if called)        │
                                  │            ↓ [Router] (if called)             │
                                  │            ↓ [Reflect] (if called)            │
                                  └──────────────────────────────────────────────┘
```

**Coach:** Do all of the following automatically — do not ask the student to run terminal commands:

1. Run `git add -A && (git diff --cached --quiet || git commit -m "Complete Module 7: Use Your Live System + The Conductor")` via Bash tool and show the student the output: "Committed. Here's what went in: [changed files]" (or "No changes to commit." if nothing was staged.)
2. Read `CLAUDE.md`, then update it via Edit tool: change `- [ ] Module 7:` to `- [x] Module 7:`.

3. **Run `/compact`** — type `/compact` to clear context before Module 8 (the final send-off). Stage boundary cleanup keeps Claude focused for what comes next.
4. Hand off:

> "One module left. The system works. In Module 8 we're going to talk about where this goes from here — how you'd personalize it, how you'd extend it, and how you'd use Claude Code to build the next one yourself. Type `module-8` when you're ready."

## Coach Guardrails

- **Act 1 is fast — don't over-explain** — they've seen all three stages before. The goal is confirmation and celebration, not re-teaching. Keep each stage to its allocated time.
- **The screenshot is a real milestone** — treat it as one. "Take a screenshot" is not a formality.
- **Step 7 has FOUR conductor runs and FOUR pauses** — after each run, you ask what the Conductor chose and you WAIT for the student's actual response. Do not narrate what you would have observed. Do not auto-continue to the next run. The pause is the pedagogy. If their first answer is incomplete (only names one step, doesn't notice what didn't run), probe gently and wait again.
- **Read conductor.md inline** — never ask the student to open the file. Use the Read tool and print full contents in chat.
- **The judgment rule is the key teaching beat in Step 8** — an LLM routing at runtime is different from a switch statement. Make that distinction explicit.
- **The "workflow vs agent" distinction is the conceptual peak** — it lives here now, not in Module 8. Make sure it lands before moving on.

## Optional deeper reading

Just ask me: *"Read concepts/what-is-an-orchestrator.md and walk me through it."*

- `concepts/what-is-an-orchestrator.md` — orchestration patterns, parallel vs. sequential dispatch
- `concepts/what-is-an-agent.md` — re-read now that you've seen all three levels

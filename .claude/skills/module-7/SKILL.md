---
name: module-7
description: Use Your Live System + The Conductor — Module 7 of the AISC Agent Sprint. Triggered when a student types "module-7". Student uses all three stages in the browser, then introduces the Conductor planning step — optional instruction input that decides which tools to run. The "workflow vs agent" distinction lands here. Screenshot moment.
---

# Module 7: Use Your Live System + The Conductor

**Time:** ~30 minutes
**You'll produce:** evidence you ran the full system, and a first-hand feel for what makes the Conductor an agent rather than a workflow — the same pipeline, now steerable by a sentence.

## Coach Instructions

Two acts. Act 1 (~10 min): tour all three stages in the browser — fast, confirmatory, celebratory. Act 2 (~20 min): introduce the instruction input, read the Conductor prompt inline, and land the workflow/agent distinction. The screenshot happens at the end of Act 1. The teaching moment happens in Act 2. Don't conflate the two — Act 1 is celebration, Act 2 is the conceptual peak.

---

## Act 1: Use the System You Built (~10 min)

### Step 1: Set the frame (1 min)

Say:

> "Module 7. Everything you've built — the chat assistant, the workflow, the orchestrator — is sitting behind a server you started in Module 3. The browser isn't showing you a diagram. It's running your code.
>
> First: let's use all three stages. Then I want to show you something that changes the way the orchestrator works."

### Step 2: Confirm the server is running (1 min)

If the server is still running from Module 3 or 6, skip this. If not:

**Coach:** Run `pwd` via Bash to confirm the repo root. If you just opened a fresh terminal, run `cd [repo-root]` first (replace `[repo-root]` with the actual path from `pwd`). Then start the server:

```bash
npm run server
```

Open **http://localhost:3000**.

### Step 3: Stage 1 — chat with your assistant (3 min)

Click the **Stage 1** tab. Click **Load standup**. Ask two questions:

```
Who looks most blocked?
Write a one-sentence Slack summary of this meeting.
```

> "That response came from `chat.js` → `ask()` → `system.md`. Same chain you saw in Module 2, now running in a browser.
>
> Hit the **Show JSON** button — that's the raw request and response from Module 2, now visible here."

### Step 4: Stage 2 — run the workflow (2 min)

Click the **Stage 2** tab. Click **Load standup**. Hit **Run Workflow →**.

> "Your `workflow.js` just fired. Classified the meeting, routed the file, sent the notification. Same pipeline from Module 4."

### Step 5: Stage 3 — run the orchestrator (3 min)

Click the **Stage 3** tab. Click **Load standup**. Hit **Run Orchestrator →** (leave the instruction field blank for now).

Watch the steps light up:

```
Step 1 ✓  Analyst + Extractor (parallel)
Step 2 ✓  Synthesizer
Step 3 ✓  Router: classify + save + notify
```

> "Every checkmark is a real API call completing. Step 1 fires both at once — that's `Promise.all` from Module 6. Step 3 is the workflow you built in Module 4. That's `orchestrator.js` running in your browser."

**Screenshot moment:**

> "Stage 3 tab, all three steps checked, report visible. Take a screenshot. A week ago you'd never called an API. Right now you have a working multi-agent system. That's a real artifact — send it to your team."

---

## Act 2: The Conductor (~20 min)

### Step 6: Set the frame (2 min)

Say:

> "Everything you just used runs the same four steps every time — Analyst + Extractor → Synthesizer → Router. Load any transcript, hit the button, full pipeline. Every time. That's a workflow.
>
> Now I want to show you what turns it into an agent."

### Step 7: Introduce the instruction input (5 min)

Point to the **Optional instruction** field below the transcript area on the Stage 3 tab.

Have the student:
1. Load the standup transcript (click **Load standup**)
2. Type in the instruction field: `Just give me the action items`
3. Click **Run Orchestrator →**

Ask: **"What happened? How many steps ran?"**

Wait for their answer. Then:

> "The Conductor ran first — one planning call before anything else. It read your instruction, made a decision, and returned a plan: 'run Extractor only.' Analyst, Synthesizer, Router, and Reflect never fired.
>
> That's the difference between a workflow and an agent. **A workflow follows steps. An agent decides which steps to take.**"

Try two more with the student driving:
- Clear the instruction, click **Run Orchestrator →** → full pipeline (Conductor defaults to all tools)
- Type `Just route this` → Router only

> "Same tools, same code — three completely different executions based on what you asked for. The routing decision is the agent's job."

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
> That's what makes it agentic: it decides. The workflow in Module 4 didn't decide anything — it just executed a fixed sequence. The Conductor reads context and makes a choice."

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

1. Run `git add -A && git commit -m "Complete Module 7: Use Your Live System + The Conductor"` via Bash tool and show the student the output: "Committed. Here's what went in: [changed files]"
2. Update `CLAUDE.md`: change `- [ ] Module 7:` to `- [x] Module 7:` via Edit tool.

3. **Run `/compact`** — type `/compact` to clear context before Module 8.
4. Hand off:

> "One module left. The system works. In Module 8 we're going to talk about where this goes from here — how you'd personalize it, how you'd extend it, and how you'd use Claude Code to build the next one yourself. Type `module-8` when you're ready."

## Coach Guardrails

- **Act 1 is fast — don't over-explain** — they've seen all three stages before. The goal is confirmation and celebration, not re-teaching. Keep each stage to its allocated time.
- **The screenshot is a real milestone** — treat it as one. "Take a screenshot" is not a formality.
- **Wait for the student's answer in Step 7** — "What happened? How many steps ran?" — wait for their actual observation before explaining. They just saw the Conductor in action; their description of what they saw is the learning.
- **Read conductor.md inline** — never ask the student to open the file. Use the Read tool and print full contents in chat.
- **The judgment rule is the key teaching beat in Step 8** — an LLM routing at runtime is different from a switch statement. Make that distinction explicit.
- **The "workflow vs agent" distinction is the conceptual peak** — it lives here now, not in Module 8. Make sure it lands before moving on.

## Optional deeper reading

Just ask me: *"Read concepts/what-is-an-orchestrator.md and walk me through it."*

- `concepts/what-is-an-orchestrator.md` — orchestration patterns, parallel vs. sequential dispatch
- `concepts/what-is-an-agent.md` — re-read now that you've seen all three levels

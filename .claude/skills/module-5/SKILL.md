---
name: module-5
description: Specialists & Prompts — Module 5 of the AISC Agent Sprint. Triggered when a student types "module-5". Two acts. Act 1: quick look at how the workflow is pluggable (extensions). Act 2: show how the chat assistant evolves into three specialists by swapping system prompts — analyst, extractor, synthesizer. The "same ask() function, different system prompt = different specialist" moment.
---

# Module 5: Specialists & Prompts

**Time:** ~20 minutes
**You'll produce:** a deep understanding of how one function call + three different system prompts creates three distinct specialist agents — the building blocks Stage 3 depends on.

## Coach Instructions

Two acts. Act 1 is short (5 min) — show that the workflow is pluggable, don't dwell on it. Act 2 is the point: students see how the chat assistant they built in Stage 1 becomes three specialists just by swapping the system prompt. **They don't write these prompts — they're pre-written. The lesson is understanding what makes each specialist different.**

## Act 1: The Workflow Is Pluggable (~5 min)

### Step 1: Set the frame (1 min)

Say:

> "Before we move into Stage 3, a quick note about the workflow you built. It classifies and routes — that's its core job. But the output side is pluggable. You could swap the macOS notification for anything."

Show them the extension options without dwelling on them:

```
  What you could add to the workflow's output:
  ─────────────────────────────────────────────
  save-summary.js     — AI summary saved alongside the transcript
  json-log.js         — JSON record appended to a log file
  slack-notify.js     — Slack message with meeting type + filename
```

> "These are pre-written and ready to wire in. The pattern: one import line at the top of `workflow.js`, one function call at the end of `runWorkflow()`. That's it. If you want to try one, say so and I'll wire it in. But the bigger thing is Stage 3 — let's go there."

**Coach:** If the student wants to add an extension, do it — two lines, confirm it fires, move on. Don't spend more than 5 minutes here.

---

## Act 2: How Specialists Are Made (~15 min)

### Step 2: Set the frame (2 min)

Say:

> "The chat assistant you built in Module 2 is a single specialist. It has one job because of one file: `prompts/system.md`. That file says: 'You are a meeting analyst. Answer questions directly.'
>
> Stage 3 needs three specialists: one that finds themes, one that pulls action items, and one that synthesizes both into a final report. Here's the thing: **each one is just the chat assistant with a different system prompt.** Same `ask()` function. Same API call. Different personality, different job, different output.
>
> Let's look at them."

### Step 3: Read the specialist prompts side by side (6 min)

In the current terminal, from `student-output/`:

```bash
cat prompts/analyst.md
```

Read it together. Point out:

> "The role: 'You are a meeting analyst.' The output format: KEY THEMES and KEY DECISIONS. Rules: use names from the transcript, don't pad. This is a focused specialist — one job."

Then:

```bash
cat prompts/extractor.md
```

> "Different specialist. Role: action item extractor. Output: JSON with owner, task, deadline for every action item. Rules: only output valid JSON. That JSON rule is critical — the orchestrator parses this output programmatically."

Then:

```bash
cat prompts/synthesizer.md
```

> "Third specialist. It receives the other two specialists' output and synthesizes them into the final structured report. It's downstream — it needs the analyst and extractor to finish first. That's why Stage 3 sequences them the way it does."

Ask:

> "What's different between these three files?"

Wait for their answer. The key insight: **the format instruction** — each specialist's output format is totally different. That's not a coincidence; it's the whole design.

> "Right. Same function, same API call, different format instruction in the system prompt = a different kind of output. That's the lever. When you see an AI product that does something specific and useful, this is usually what's happening underneath: a focused system prompt telling it exactly what shape to return."

### Step 4: Open the browser — inspect each specialist (4 min)

Open **http://localhost:3000** and click the **Stage 3** tab.

Click each specialist node on the diagram:

- **Analyst node** — the inspect panel shows `prompts/analyst.md`. This is the same file you just `cat`'d.
- **Extractor node** — shows `prompts/extractor.md`.
- **Synthesizer node** — shows `prompts/synthesizer.md`.

> "The diagram is a window into your code. Each node maps to a prompt file. The prompt file IS the specialist."

Point to the orchestrator node:

> "The orchestrator doesn't have a personality — it coordinates. Analyst and Extractor run in parallel. Then Synthesizer takes both results and combines them. Then Router classifies and saves. That sequence is what you'll look at in Module 6."

### Step 5: The key insight (2 min)

Stop and say:

> "Here's the thing to hold onto:
>
> - Stage 1: one system prompt (`system.md`) → one meeting analyst
> - Stage 3: three system prompts → three specialists
>
> The `ask()` function doesn't change. The Anthropic API call doesn't change. Only the system prompt changes. And that changes everything about what the agent does.
>
> In Stage 1 you felt that: you edited `system.md` and watched the output personality change completely. Same principle here — but now we're using three different prompts to create three different specialists that each do one focused job.
>
> This is the whole pattern of building agents: **every specialist is a system prompt.**"

## Step 6: Wrap and commit (1 min)

What you've built so far:

```
┌──────────────────────────────┐   ┌──────────────────────────────┐
│  Stage 1 — Chat Assistant    │   │  Stage 2 — Workflow           │
│  stage-1/chat.js             │   │  stage-2/workflow.js          │
│  ask() · system.md           │   │  runWorkflow()                │
└──────────────────────────────┘   │  classifier.md               │
                                   └──────────────────────────────┘

Specialist prompts (pre-written, ready for Stage 3):
  prompts/analyst.md  ·  prompts/extractor.md  ·  prompts/synthesizer.md  ← you just read these
```

1. **Update `CLAUDE.md`**: change `- [ ] Module 5:` to `- [x] Module 5:`
2. **Commit** — in a terminal at the repo root:
   ```bash
   git add -A && git commit -m "Complete Module 5: Specialists & Prompts"
   ```
3. **Run `/compact`** — type `/compact` to clear context before Module 6.
4. Hand off:

> "You now have all the pieces: a chat assistant, a workflow, and three specialist prompts. Stage 3 is just wiring them together. In Module 6 you'll see the orchestrator that coordinates them — and there's one new idea we haven't introduced yet. Type `module-6` when you're ready."

## Coach Guardrails

- **Act 1 is a detour — don't let it take over.** If the student is curious about extensions, do it quickly (two lines, confirm it fires) and move on. The specialists lesson is the point of this module.
- **Don't generate extension code from scratch.** The three options in `stage-2/extensions/` are tested and ready. If you add one, read the file and make exactly two changes: one import, one call.
- **Students don't write the specialist prompts** — they're pre-written. The lesson is *reading* them and understanding what makes each one different.
- **The JSON rule in extractor.md is load-bearing** — the orchestrator parses extractor's output with `JSON.parse()`. If a student asks why the prompt is so strict about JSON format, explain this.
- **The "same function, different prompt" insight is the whole lesson.** If students grasp that, Module 6 will click immediately.

## Optional deeper reading

Just ask me: *"Read concepts/what-is-a-system-prompt.md and walk me through it."*

- `concepts/what-is-a-system-prompt.md` — deeper reference on how system prompts control model behavior
- `concepts/what-is-an-orchestrator.md` — preview for Module 6

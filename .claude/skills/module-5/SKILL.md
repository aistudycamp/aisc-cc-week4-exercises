---
name: module-5
description: Specialists & Prompts — Module 5 of the AISC Agent Sprint. Triggered when a student types "module-5". Two acts. Act 1: quick look at how the workflow is pluggable (extensions). Act 2: show how the chat assistant evolves into three specialists by swapping system prompts — analyst, extractor, synthesizer. The "same ask() function, different system prompt = different specialist" moment.
---

# Module 5: Specialists & Prompts

**Time:** ~20 minutes

**What we're building**
By the end: you'll understand how one function call with three different system prompts creates three completely different specialists — the analyst, extractor, and synthesizer that Stage 3 depends on. You won't write these prompts — they're pre-written. The lesson is reading them and seeing the pattern.

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

### Step 2: Why specialists (3 min)

Before any prompts, ground the student in *why* this stage needs three of them.

Say:

> "So far you've built one chat assistant with one system prompt — a generalist. Stage 3 needs three different specialists, working together: an Analyst that finds themes, an Extractor that pulls action items, a Synthesizer that combines both into a final report.
>
> Why three specialists instead of one big call?
>
> 1. **Each one is focused** — narrower scope means better output. A generalist asked to do all three at once will compromise on each.
> 2. **Each one is independently swappable** — you can change the Extractor without touching the Analyst.
> 3. **Two of them can run in parallel** — Analyst and Extractor are independent, so you can fire both simultaneously and cut latency in half. (We'll see that in Module 6.)
>
> The thing to notice as we read each prompt: same `ask()` function, same API call. **Only the system prompt changes.** The system prompt is what turns one generic chat assistant into a focused specialist."

Then show the architecture before any prompt files appear:

```
              transcript
                  │
    ┌─────────────┴─────────────┐
    ▼                           ▼
[ Analyst ]              [ Extractor ]   ← parallel, different system prompts
themes + decisions       action items
    │                           │
    └─────────────┬─────────────┘
                  ▼
          [ Synthesizer ]                ← waits for both, combines into one report
                  │
                  ▼
          [ Router ]                     ← Stage 2's workflow
```

> "Read top-to-bottom. Transcript in. Analyst and Extractor run in parallel — same input, different specialists, different jobs. Synthesizer waits for both, then merges them into one report. Then Stage 2's router classifies and saves. Three specialists, one orchestrator, one report.
>
> They're pre-written in `student-output/prompts/`. Your job here is to read them and understand what makes each one different."

### Step 3: Read the specialist prompts side by side (6 min)

**Coach:** Use the Read tool to read each prompt file from `student-output/prompts/` and print the contents inline. After printing each file, walk the student through it using the **Role / Output format / Rules / Why it differs** scaffold below. Do not ask the student to open a terminal or run `cat`.

#### Analyst

**[Coach: Read `student-output/prompts/analyst.md` and print its full contents here]**

Then walk the student through:

- **Role:** "You are a meeting analyst" — first specialist, the thinker.
- **Output format:** plain-text sections — KEY THEMES and KEY DECISIONS, one bullet per line.
- **Rules / constraints:** use names from the transcript, don't invent people, don't pad.
- **Why it differs from the others:** narrative output for humans to read. No JSON, no action items.

#### Extractor

**[Coach: Read `student-output/prompts/extractor.md` and print its full contents here]**

Then walk the student through:

- **Role:** "You are an action item extractor" — second specialist, the lister.
- **Output format:** strict JSON — array of objects with `owner`, `task`, `deadline`.
- **Rules / constraints:** only output valid JSON, no prose. Use names from transcript.
- **Why it differs from the others:** machine-readable, not human-readable. The orchestrator parses this output with `JSON.parse()` — the format isn't decorative, it's load-bearing.

#### Synthesizer

**[Coach: Read `student-output/prompts/synthesizer.md` and print its full contents here]**

Then walk the student through:

- **Role:** "You are a synthesizer" — third specialist, the editor.
- **Output format:** the final structured report — KEY THEMES, ACTION ITEMS, RECOMMENDED NEXT STEP.
- **Rules / constraints:** combine *both* upstream outputs faithfully. Don't invent items not in the source data.
- **Why it differs from the others:** it's downstream — its input isn't a transcript, it's the *outputs* of the other two specialists. It needs Analyst and Extractor to finish first, which is why Stage 3 sequences them the way it does.

Ask:

> "What's different between these three files?"

Wait for their answer. The key insight: **the format instruction** — each specialist's output format is totally different. That's not a coincidence; it's the whole design.

> "Right. Same function, same API call, different format instruction in the system prompt = a different kind of output. That's the lever. When you see an AI product that does something specific and useful, this is usually what's happening underneath: a focused system prompt telling it exactly what shape to return."

### Step 4: See it run (4 min)

Open **http://localhost:3000** and click the **Stage 3** tab.

Click **Load standup**, leave the instruction field blank, then hit **Run Orchestrator →**.

Watch each specialist fire — Analyst, then Extractor, then Synthesizer, then Router. Three specialists you just read, all running.

> "Each checkmark is a real API call completing — and the prompts you just read are what made each one different. The Analyst returned themes. The Extractor returned a JSON list. The Synthesizer combined them into one report. Same `ask()` function, different system prompts. (How they're sequenced — what runs in what order, what runs alongside what — is Module 6.)"

Then click each specialist node on the diagram to see the prompt file behind it:

- **Analyst node** — the inspect panel shows `prompts/analyst.md`.
- **Extractor node** — shows `prompts/extractor.md`.
- **Synthesizer node** — shows `prompts/synthesizer.md`.

> "The diagram is a window into your code. Each node maps to a prompt file. The prompt file IS the specialist. The orchestrator doesn't have a personality — it coordinates. We'll walk through *how* it coordinates them in Module 6."

### Step 5: The key insight (2 min)

Stop and say:

> "Here's the thing to hold onto:
>
> - Stage 1: `system.md` → one meeting analyst
> - Stage 2: `classifier.md` → one classifier agent
> - Stage 3: three system prompts → three specialists
>
> Every AI decision step in this sprint is a system prompt. That's consistent across all three stages.
>
> The `ask()` function doesn't change. The Anthropic API call doesn't change. Only the system prompt changes. And that changes everything about what the agent does.
>
> This is the whole pattern of building agents: **every specialist is a system prompt.**"

Module 5 closes Stage 2. Modules 4 and 5 are both Stage 2 — Stage 2 is wider than one module. Stage 3 starts with Module 6.

## Key takeaways

- Every specialist is a system prompt — `ask()` doesn't change, only the prompt changes
- The output format in the prompt is load-bearing — the orchestrator parses extractor's JSON programmatically
- Stage 2 is complete — Stage 3 is just wiring these specialists together with an orchestrator

## Step 6: Wrap and commit (1 min)

What you've built so far:

```
┌──────────────────────────────┐   ┌────────────────────────────────────┐
│  Stage 1 — Chat Assistant    │   │  Stage 2 — Workflow                │
│  stage-1/chat.js             │   │  stage-2/workflow.js               │
│  ask() · system.md           │   │  runWorkflow() · classifier.md     │
└──────────────────────────────┘   └────────────────────────────────────┘

Specialist prompts (pre-written, ready for Stage 3):
  prompts/analyst.md  ·  prompts/extractor.md  ·  prompts/synthesizer.md  ← you just read these
```

**Coach:** Do all three of the following steps automatically — do not ask the student to run terminal commands:

1. Run `git add -A && git commit -m "Complete Module 5: Specialists & Prompts"` via Bash tool and show the student the output: "Committed. Here's what went in: [changed files]"
2. Update `CLAUDE.md`: change `- [ ] Module 5:` to `- [x] Module 5:` via Edit tool.

3. **Run `/compact`** — type `/compact` to clear context before Stage 3 (Module 6). Stage boundary cleanup keeps Claude focused for the new mental model coming next.
4. Hand off:

> "You now have all the pieces: a chat assistant, a workflow, and three specialist prompts. Stage 3 is just wiring them together. In Module 6 you'll see the orchestrator that coordinates them — and there's one new idea we haven't introduced yet. Type `module-6` when you're ready."

## Coach Guardrails

- **Act 1 is a detour — don't let it take over.** If the student is curious about extensions, do it quickly (two lines, confirm it fires) and move on. The specialists lesson is the point of this module.
- **Don't generate extension code from scratch.** The three options in `stage-2/extensions/` are tested and ready. If you add one, read the file and make exactly two changes: one import, one call.
- **Students don't write the specialist prompts** — they're pre-written. The lesson is *reading* them and understanding what makes each one different.
- **Coach reads files inline** — never ask the student to run `cat` or open a file. Read each prompt with the Read tool and print the contents directly in chat.
- **The JSON rule in extractor.md is load-bearing** — the orchestrator parses extractor's output with `JSON.parse()`. If a student asks why the prompt is so strict about JSON format, explain this.
- **The "same function, different prompt" insight is the whole lesson.** If students grasp that, Module 6 will click immediately.

## Optional deeper reading

Just ask me: *"Read concepts/what-is-a-system-prompt.md and walk me through it."*

- `concepts/what-is-a-system-prompt.md` — deeper reference on how system prompts control model behavior
- `concepts/what-is-an-orchestrator.md` — preview for Module 6

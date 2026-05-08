---
name: module-5
description: Meet the Specialists — Module 5 of the AISC Agent Sprint. The Stage 2 → Stage 3 bridge. Triggered when a student types "module-5". Stage 2 is done. Before building Stage 3's orchestrator, the student reads the three specialists it will coordinate — analyst, extractor, synthesizer — and sees them fire in a preview run. The "same ask() function, different system prompt = different specialist" moment.
---

# Module 5: Meet the Specialists

**Time:** ~15 minutes

**What we're building**
By the end: you'll have read the three specialist prompts that Stage 3 depends on (analyst, extractor, synthesizer), understood why each one is focused on a single job, and watched all three fire in a preview run. You won't write these prompts — they're pre-written. The lesson is reading them and seeing the pattern.

## Coach Instructions

**This module is a bridge.** Stage 2 is done — you finished it in Module 4. Stage 3 starts in Module 6. M5 is the connector: students meet the three specialists Stage 3's orchestrator will coordinate, before they see how the coordination happens. Frame it that way explicitly. Do not call this "still Stage 2" — it's the bridge.

The point of this module: students see how the chat assistant they built in Stage 1 becomes three specialists just by swapping the system prompt. **They don't write these prompts — they're pre-written. The lesson is understanding what makes each specialist different.** The Stage 3 tab run at the end is a *preview*, not a lesson — Module 6 is the lesson.

## Step 1: Set the bridge frame (2 min)

Say:

> "Module 5 is a bridge. Stage 2 is done — you finished it in Module 4. Stage 3 starts next module.
>
> Before we build Stage 3's orchestrator, you need to know the three specialists it'll coordinate: an Analyst that finds themes, an Extractor that pulls action items, a Synthesizer that combines both into a final report.
>
> They're already written and ready to use — your job here is to read them and understand what makes each one different. Then we'll run them once at the end so you can see them fire, and Module 6 will explain how they get coordinated."

## Step 2: Why three specialists (3 min)

Before any prompts, ground the student in *why* this stage needs three.

Say:

> "So far you've built one chat assistant with one system prompt — a generalist. Stage 3 needs three different specialists working together. Why split the work?
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

## Step 3: Read the specialist prompts side by side (6 min)

**Coach:** Use the Read tool to read each prompt file from `student-output/prompts/` and print the contents inline. After printing each file, walk the student through it using the **Role / Output format / Rules / Why it differs** scaffold below. Do not ask the student to open a terminal or run `cat`.

### Analyst

**[Coach: Read `student-output/prompts/analyst.md` and print its full contents here]**

Then walk the student through:

- **Role:** "You are a meeting analyst" — first specialist, the thinker.
- **Output format:** plain-text sections — KEY THEMES and KEY DECISIONS, one bullet per line.
- **Rules / constraints:** use names from the transcript, don't invent people, don't pad.
- **Why it differs from the others:** narrative output for humans to read. No JSON, no action items.

### Extractor

**[Coach: Read `student-output/prompts/extractor.md` and print its full contents here]**

Then walk the student through:

- **Role:** "You are an action item extractor" — second specialist, the lister.
- **Output format:** strict JSON — array of objects with `owner`, `task`, `deadline`.
- **Rules / constraints:** only output valid JSON, no prose. Use names from transcript.
- **Why it differs from the others:** machine-readable, not human-readable. The orchestrator parses this output with `JSON.parse()` — the format isn't decorative, it's load-bearing.

### Synthesizer

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

## Step 4: Preview — see them fire (3 min)

> "Quick preview before we move on. Module 6 is going to walk through *how* these three specialists get coordinated. But first, let's just see them fire so you've seen the output."

Open **http://localhost:3000** and click the **Stage 3** tab.

Click **Load standup**, leave the instruction field blank, then hit **Run Orchestrator →**.

Watch each specialist fire — Analyst, then Extractor, then Synthesizer, then Router. Three specialists you just read, all running.

> "Each checkmark is a real API call completing — and the prompts you just read are what made each one different. The Analyst returned themes. The Extractor returned a JSON list. The Synthesizer combined them into one report. Same `ask()` function, different system prompts.
>
> This is just a preview — *how* they're coordinated (what runs in what order, what runs alongside what, how the outputs flow together) is Module 6. Don't worry about the orchestration yet."

Then click each specialist node on the diagram to see the prompt file behind it:

- **Analyst node** — the inspect panel shows `prompts/analyst.md`.
- **Extractor node** — shows `prompts/extractor.md`.
- **Synthesizer node** — shows `prompts/synthesizer.md`.

> "The diagram is a window into your code. Each node maps to a prompt file. The prompt file IS the specialist. The orchestrator doesn't have a personality — it coordinates. We'll walk through *how* it coordinates them in Module 6."

## Step 5: The key insight (1 min)

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
> This is the spine of the pattern you just built: **every specialist is a system prompt.**"

## Key takeaways

- Every specialist is a system prompt — `ask()` doesn't change, only the prompt changes
- The output format in the prompt is load-bearing — the orchestrator parses extractor's JSON programmatically
- You've now met the three specialists Stage 3 will coordinate — Module 6 shows the coordination

## Step 6: Wrap and commit (1 min)

Where you are in the arc:

```
┌──────────────────────────────┐   ┌────────────────────────────────────┐
│  Stage 1 — Chat Assistant    │   │  Stage 2 — Workflow                │
│  stage-1/chat.js             │   │  stage-2/workflow.js               │
│  ask() · system.md           │   │  runWorkflow() · classifier.md     │
└──────────────────────────────┘   └────────────────────────────────────┘
                                                    │
                                                    ▼
                            Bridge: Module 5 — Meet the Specialists  ← you are here
                            prompts/analyst.md · extractor.md · synthesizer.md

                                                    │
                                                    ▼
                            Stage 3 — Agentic System (Module 6)
```

**Coach:** Do all of the following automatically — do not ask the student to run terminal commands:

1. Run `git add -A && (git diff --cached --quiet || git commit -m "Complete Module 5: Meet the Specialists")` via Bash tool and show the student the output: "Committed. Here's what went in: [changed files]" (or "No changes to commit." if nothing was staged.)
2. Read `CLAUDE.md`, then update it via Edit tool: change `- [ ] Module 5:` to `- [x] Module 5:`.

3. **Run `/compact`** — type `/compact` to clear context before Stage 3 (Module 6). Stage boundary cleanup keeps Claude focused for the new mental model coming next.
4. Hand off:

> "You now have all the pieces: a chat assistant, a workflow, and three specialist prompts. Stage 3 is just wiring them together. In Module 6 you'll see the orchestrator that coordinates them — and there's one new idea we haven't introduced yet. Type `module-6` when you're ready."

## Coach Guardrails

- **This is a bridge module.** Frame it explicitly that way — Stage 2 is done, Stage 3 is next, M5 is the connector. Do not call M5 "still Stage 2" or "the close of Stage 2"; it's the seam.
- **Students don't write the specialist prompts** — they're pre-written. The lesson is *reading* them and understanding what makes each one different.
- **Step 4 is a preview, not a lesson.** Don't try to explain orchestration here. The student is watching the specialists fire so they recognize them in M6 — full coordination logic is M6's job.
- **Coach reads files inline** — never ask the student to run `cat` or open a file. Read each prompt with the Read tool and print the contents directly in chat.
- **The JSON rule in extractor.md is load-bearing** — the orchestrator parses extractor's output with `JSON.parse()`. If a student asks why the prompt is so strict about JSON format, explain this.
- **The "same function, different prompt" insight is the whole lesson.** If students grasp that, Module 6 will click immediately.

## Optional deeper reading

Just ask me: *"Read concepts/what-is-a-system-prompt.md and walk me through it."*

- `concepts/what-is-a-system-prompt.md` — deeper reference on how system prompts control model behavior
- `concepts/what-is-an-orchestrator.md` — preview for Module 6

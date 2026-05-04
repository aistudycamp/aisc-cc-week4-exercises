---
name: module-8
description: Make It Yours — Module 8 of the AISC Agent Sprint. Triggered when a student types "module-8". Student picks a real use case from their life or work, edits the 3 system prompts to match, runs the orchestrator on a real document they bring, and saves the personalized version. The take-home moment.
---

# Module 8: Make It Yours

**Time:** ~25 minutes
**You'll produce:** a personalized version of the agentic system that works on a use case from your real life or work, not a fake transcript. By the end, you'll have something you actually use.

## Coach Instructions

The whole sprint has been on rails. This module is where the student takes the wheel. Help them pick a use case quickly (don't let them spiral) and walk them through editing all three system prompts. After every edit, read the file back and print the full contents so the student sees exactly what was changed before re-running.

## Step 1: Set the frame (2 min)

Say:

> "Module 8. The agent you built turns *meeting transcripts* into *insights reports.* That's nice. But the same architecture works for any 'long unstructured input → structured output' problem. Today we're going to point it at something *you* actually deal with.
>
> Pick one use case. We'll edit the three system prompts together. Then we'll run it on a real document you bring."

## Step 2: Pick a use case (3 min)

Give them the menu, then nudge them to pick fast:

```
  1. Customer interviews          →  JTBD themes + verbatim quotes
                                     (JTBD = Jobs to Be Done: what the user is fundamentally trying to accomplish)
  2. Earnings calls               →  Risk flags + analyst questions
  3. Lecture / podcast notes      →  Study guide + flashcards
  4. 1:1 notes                    →  Their actions + your actions
  5. Voice memo transcripts       →  Summary + follow-ups
  6. Performance reviews          →  Strengths + growth areas + asks
  7. Customer support tickets     →  Pattern themes + escalation triage
  8. Product feedback emails      →  Feature requests + bug reports
  9. Slack channel summaries      →  Decisions made + open questions
  10. Custom — tell me what       →  We'll figure out themes/actions/next-step
```

Ask: **"Which one feels useful to you right now?"**

Wait for their answer before continuing.

If they hesitate:

> "Don't over-think it. Pick the one you can run on a real document you have on your laptop today. We can do another later."

If they pick "Custom," ask:
1. **What's your input** going to be? (long text, document, conversation, ...)
2. **What two specialists** make sense? (the equivalents of "themes" and "actions")
3. **What does the final report** look like?

Wait for their answers before continuing.

## Step 3: Edit the analyst prompt (5 min)

**Coach:** Read `student-output/prompts/analyst.md` with the Read tool first and show the student what it looks like before editing:

> "Here's what `prompts/analyst.md` looks like right now:"

**[Coach: Read `student-output/prompts/analyst.md` and print full contents]**

Have the student describe what they want. Help them phrase the change for their specific use case. The pattern: change the role and change the output format sections.

For customer interviews, the update would be: change role to "You are a customer interview analyst," change output format to JTBD THEMES and KEY INSIGHTS.

**Coach:** Make the edit directly using the Edit tool. Then read the file back and print the full updated contents:

> "Here's what it looks like now:"

**[Coach: Read `student-output/prompts/analyst.md` again and print the full updated contents]**

Only then: "Ready to move on to the extractor?"

## Step 4: Edit the extractor prompt (3 min)

**Coach:** Read `student-output/prompts/extractor.md` with the Read tool first and show the student what it looks like before editing:

> "Here's what `prompts/extractor.md` looks like right now:"

**[Coach: Read `student-output/prompts/extractor.md` and print full contents]**

This one returns JSON — warn before editing:

> "One constraint here: keep the field names — `owner`, `task`, `deadline` — even if the meaning shifts. The orchestrator parses this JSON programmatically and expects those exact keys. You can change what they *mean*, but not what they're *called*."

For customer interviews, the extractor might pull verbatim quotes:

`prompts/extractor.md`:
```
You are a verbatim quote extractor.

Given a customer interview, find the 5 most striking direct quotes
that capture the customer's pain or desire.

Return ONLY valid JSON:

{
  "actions": [
    { "owner": "Speaker name", "task": "the exact quote", "deadline": null }
  ]
}
```

**Coach:** Make the edit directly using the Edit tool. Then read the file back and print the full updated contents:

> "Here's what it looks like now:"

**[Coach: Read `student-output/prompts/extractor.md` again and print the full updated contents]**

Only then continue to the synthesizer.

## Step 5: Edit the synthesizer prompt (3 min)

**Coach:** Read `student-output/prompts/synthesizer.md` with the Read tool first and show the student what it looks like before editing:

> "Here's what `prompts/synthesizer.md` looks like right now:"

**[Coach: Read `student-output/prompts/synthesizer.md` and print full contents]**

Have the student describe what the final report should look like given their use case. Update the output format to match.

**Coach:** Make the edit directly using the Edit tool. Then read the file back and print the full updated contents:

> "Here's what it looks like now:"

**[Coach: Read `student-output/prompts/synthesizer.md` again and print the full updated contents]**

## Step 6: Bring a real input (3 min)

Have them paste or share the text of a real document. Options if they don't have something on hand:
- Paste the contents of a recent customer interview
- Export their notes from a real meeting/call
- Save a podcast transcript from a service that produces one
- Paste their last 10 Slack DMs with a teammate

Anything ~300+ words works.

**Coach:** Write the text directly to `student-output/transcripts/real-input.txt` using the Write tool. The student should not run any terminal commands to do this.

## Step 7: Run it — in the browser (3 min)

Restart the server to pick up the edited prompts. If you just opened a fresh terminal, run `cd [repo-root]` first (use `pwd` to confirm the repo root).

The server terminal needs a restart to pick up the edited prompts. Tell the student:

> "Press Ctrl+C in the server terminal to stop it, then run `npm run server` again."

That's the only terminal command the student needs to run — just the server restart.

Open **http://localhost:3000**, click the **Stage 3** tab.

Paste the real input text into the transcript area (or click Load and use the file you just saved) and hit **Run Orchestrator →**.

Watch the four steps light up with the personalized prompts firing. Read the report.

> "How is it? Useful? Surprising? Wrong about something?"

If the output is bad, the system prompts need more rules. Describe the problem to me — "the themes are too generic, make them more specific to customer insights" — and I'll revise the prompt directly. After every revision I'll show you the full updated file before we re-run. This is the actual craft of building agents: tune the prompt until the output is what you want.

Take a screenshot of the Stage 3 panel with your personalized report showing.

## Step 8: Save the personalized version (2 min)

**Coach:** Save the working version of the prompts directly using the Bash tool — do not ask the student to run `cp` commands:

Run:
```bash
mkdir -p student-output/personalized
```

Then copy each file:
- `student-output/prompts/system.md` → `student-output/personalized/system.md`
- `student-output/prompts/analyst.md` → `student-output/personalized/analyst.md`
- `student-output/prompts/extractor.md` → `student-output/personalized/extractor.md`
- `student-output/prompts/synthesizer.md` → `student-output/personalized/synthesizer.md`
- `student-output/transcripts/real-input.txt` → `student-output/personalized/sample-input.txt`

**Coach:** Do this via Bash tool, then confirm to the student:

> "Saved. Your `personalized/` folder now has four prompts (analyst, extractor, synthesizer, system) and one real input — your fingerprint on a multi-agent system."

## Step 9: Reflect (2 min)

Pause and ask:

> "Now that you've done it once, where else in your life or work would this same pattern fit? You don't have to commit. Just notice."

Listen. Reflect back. The point is to plant the seed: this pattern is portable. Once they see it, they'll see it everywhere.

## Step 10: Wrap and final commit (1 min)

What you've built:

```
┌────────────┐   ┌────────────┐   ┌──────────────────────────────────────┐
│  Stage 1   │   │  Stage 2   │   │  Stage 3 — Personalized               │
│  chat.js   │   │workflow.js │ → │  orchestrator.js                      │
│  ask()     │   │runWorkflow │   │  [Analyst ‖ Extractor] (parallel)     │
└────────────┘   └────────────┘   │            ↓ [Synthesizer]            │
                                  │            ↓ [Router]                 │
                                  │  personalized/ prompts saved          │
                                  └──────────────────────────────────────┘
```

**Coach:** Do all three of the following steps automatically — do not ask the student to run terminal commands:

1. Run `git add -A && git commit -m "Complete Module 8: Make It Yours"` via Bash tool and show the student the output: "Committed. Here's what went in: [changed files]"
2. Update `CLAUDE.md`: change `- [ ] Module 8:` to `- [x] Module 8:` via Edit tool.

3. **Run `/compact`** — type `/compact` to end the session cleanly.

## Step 11: Celebrate (genuinely — 1 min)

> "You did it. You went from never having called an API to building a working multi-agent system. The skill is now yours forever — the next agent you build will take a fraction of the time, because you have the pattern.
>
> A few things to take with you:
>
> - **The system prompt is the leverage point.** Always start by editing it.
> - **Specialists beat generalists.** Split work into focused sub-agents when it has distinct sub-tasks.
> - **Trigger and destination are pluggable.** The agent in the middle is reusable.
> - **Three questions for any new agent**: What's the input? What's the output? What sub-agents fit between them?
>
> Go build something."

## Coach Guardrails

- **Show the full file after every edit** — after every prompt edit (analyst, extractor, synthesizer), read the file back with the Read tool and print the full updated contents before moving on. The student should always be able to see exactly what changed.
- **Coach does all file operations** — never ask the student to run `cp`, `mkdir`, or any file command. The coach handles file copies, directory creation, and file writes directly via tools.
- **Use-case selection cap: 3 minutes** — if the student hasn't picked after 3 minutes, nudge them to the option that matches a document they have on their laptop right now.
- **Warn about JSON field names before Step 4** — when editing `prompts/extractor.md`, the field names `owner`, `task`, `deadline` must stay even if the meaning shifts. The orchestrator parses the extractor's output with `JSON.parse()` and expects those keys. A student who renames them will get a confusing runtime error.
- **JTBD = Jobs to Be Done** — if the student doesn't recognize the term, explain it: "Jobs to Be Done — what the user is fundamentally trying to accomplish, not just what they're doing on the surface."
- **If the output is bad, iterate** — bad first output is expected and pedagogically useful. Tune one prompt, re-run, compare. That process is the craft.
- **Questions stop and wait** — never ask a question and immediately answer it. Wait for the student's actual response.

## Optional deeper reading

Just ask me: *"Read concepts/agent-archetypes.md and walk me through it."* I'll pull it up and explain it.

- `concepts/agent-archetypes.md` — patterns for how to think about any new agent you build next

---
name: module-8
description: Make It Yours — Module 8 of the AISC Agent Sprint. Triggered when a student types "module-8". Student picks a real use case from their life or work, edits the 3 system prompts to match, runs the orchestrator on a real document they bring, and saves the personalized version. The take-home moment.
---

# Module 8: Make It Yours

**Time:** ~25 minutes
**You'll produce:** a personalized version of the agentic system that works on a use case from your real life or work, not a fake transcript. By the end, you'll have something you actually use.

## Coach Instructions

The whole sprint has been on rails. This module is where the student takes the wheel. Help them pick a use case quickly (don't let them spiral) and walk them through editing all three system prompts.

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

If they hesitate:

> "Don't over-think it. Pick the one you can run on a real document you have on your laptop today. We can do another later."

If they pick "Custom," ask:
1. **What's your input** going to be? (long text, document, conversation, ...)
2. **What two specialists** make sense? (the equivalents of "themes" and "actions")
3. **What does the final report** look like?

## Step 3: Edit the orchestrator's prompt (5 min)

Have the student describe what they want, then tell Claude to update the file:

For customer interviews, the student would say to Claude:

> "Tell Claude: 'Update prompts/system.md to be a customer interview analyst. Change the role to: You are a customer interview analyst. Change the output format to: **JTBD THEMES** (what the user is fundamentally trying to accomplish), **VERBATIM QUOTES** (exact quotes from the interview), **WHAT TO DO ABOUT IT** (one sentence on the implication for the product).'"

Coach: help them phrase this for their specific use case. The pattern is always: "Tell Claude: 'Update prompts/system.md to be a [role]. Change the output format to: [their desired sections].'"

## Step 4: Edit the sub-agent prompts (5 min)

Now `prompts/summarizer.md` and `prompts/action_extractor.md`.

These return JSON, so be careful. Have them swap the **labels** but keep the JSON-only rule and the schema.

For customer interviews, the summarizer might find "JTBD themes" and the extractor might find "verbatim quotes":

`prompts/summarizer.md`:
```
You are a JTBD (Jobs to Be Done) theme finder.

Given a customer interview, identify the 3 most prominent
"jobs to be done" — the underlying tasks or goals the customer is trying to accomplish.

Return ONLY a JSON object:

{
  "themes": [
    { "label": "Job to be done", "summary": "Evidence from the interview." },
    ...
  ]
}
```

`prompts/action_extractor.md`:
```
You are a verbatim quote extractor.

Given a customer interview, find the 5 most striking direct quotes
that capture the customer's pain or desire.

Return ONLY a JSON object:

{
  "actions": [
    { "owner": "Speaker name", "task": "the exact quote", "deadline": null }
  ]
}
```

(Note: keep the field names — `owner`, `task`, `deadline` — even if the meaning shifts. The orchestrator code expects them.)

Save.

## Step 5: Bring a real input (3 min)

Have them grab a real document and put it in `transcripts/`:

```bash
cp /path/to/their-real-document.txt transcripts/real-input.txt
```

If they don't have something on their laptop, give them options:
- Paste the contents of a recent customer interview into a new `.txt` file
- Export their notes from a real meeting/call
- Save a podcast transcript from a service that produces one
- Paste their last 10 Slack DMs with a teammate

Anything ~300+ words works.

## Step 6: Run it — in the browser (3 min)

Restart the server to pick up the edited prompts — `Ctrl+C` in the server terminal, then `npm run server`.

Open **http://localhost:3000**, click the **Stage 3** tab.

Paste the real input text into the transcript area and hit **Run Orchestrator →**.

Watch the four steps light up with the personalized prompts firing. Read the report.

> "How is it? Useful? Surprising? Wrong about something?"

If the output is bad, the system prompts need more rules. Describe the problem to Claude — "the themes are too generic, make them more specific to customer insights" — and let Claude revise the prompt. Re-run in the browser. Compare. This is the actual craft of building agents: tune the prompt until the output is what you want.

Take a screenshot of the Stage 3 panel with your personalized report showing.

## Step 7: Save the result (2 min)

Save their personalized version somewhere they can find it later. The `student-output/` folder is theirs forever.

Suggest they save the working version of the prompts:

```bash
mkdir -p student-output/personalized
cp prompts/system.md student-output/personalized/system.md
cp prompts/summarizer.md student-output/personalized/summarizer.md
cp prompts/action_extractor.md student-output/personalized/action_extractor.md
cp transcripts/real-input.txt student-output/personalized/sample-input.txt
```

> "That `personalized/` folder is your take-home. Three prompts, one real input, one real output — your fingerprint on a multi-agent system."

## Step 8: Reflect (2 min)

Pause and ask:

> "Now that you've done it once, where else in your life or work would this same pattern fit? You don't have to commit. Just notice."

Listen. Reflect back. The point is to plant the seed: this pattern is portable. Once they see it, they'll see it everywhere.

## Step 9: Wrap and final commit (1 min)

1. **Update `CLAUDE.md`**: change `- [ ] Module 8:` to `- [x] Module 8:`
2. **Commit:**
   ```bash
   git add -A && git commit -m "Complete Module 8: Make It Yours"
   ```

## Step 10: Celebrate (genuinely — 1 min)

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

- **Use only `npm run stage-3 -- transcripts/real-input.txt`** as the run command. Don't offer alternative invocation patterns — consistency matters at the sprint's most important moment.
- **Use-case selection cap: 3 minutes** — if the student hasn't picked after 3 minutes, nudge them to the option that matches a document they have on their laptop right now.
- **Warn about JSON field names before Step 4** — when editing the sub-agent prompts, the field names `owner`, `task`, `deadline` must stay even if the meaning shifts. The orchestrator code expects them. A student who renames these fields will get a confusing runtime error.
- **JTBD = Jobs to Be Done** — if the student doesn't recognize the term, explain it: "Jobs to Be Done — what the user is fundamentally trying to accomplish, not just what they're doing on the surface."
- **If the output is bad, iterate** — bad first output is expected and pedagogically useful. Tune one prompt, re-run, compare. That process is the craft.

## Optional deeper reading

- `concepts/agent-archetypes.md` — patterns for how to think about any new agent you build next

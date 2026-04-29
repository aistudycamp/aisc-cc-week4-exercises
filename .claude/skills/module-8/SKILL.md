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

Open `student-output/prompts/system.md`.

One heads-up before you edit: `system.md` is used in two places — by `ask()` in Stage 1 (the chat assistant) and by the synthesizer in Stage 3. The edits you make here affect both. For most use cases that's exactly what you want; just know it's one file doing double duty.

Walk them through editing it for their use case. Two things change:

### A) The role
```diff
- You are a meeting analyst.
+ You are a customer interview analyst. ← (or whatever fits)
```

### B) The output format

Replace the `KEY THEMES / ACTION ITEMS / RECOMMENDED NEXT STEP` block with whatever shape makes sense for their use case.

Example for customer interviews:
```
**JTBD THEMES**
- [What user was trying to do]: [evidence from interview]

**VERBATIM QUOTES**
- "[exact quote]" — [speaker]

**WHAT TO DO ABOUT IT**
[One sentence — the implication for the product.]
```

Save.

## Step 4: Edit the sub-agent prompts (5 min)

Now `prompts/summarizer.md` and `prompts/action_extractor.md`.

These return JSON, so be careful. Have them swap the **labels** but keep the JSON-only rule and the schema.

For customer interviews, the summarizer might find "JTBD themes" and the extractor might find "verbatim quotes":

`prompts/summarizer.md`:
```
You are a JTBD theme finder.

Given a customer interview, identify the 3 most prominent
"jobs to be done" the customer was trying to get done.

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

## Step 6: Run it (3 min)

```bash
npm run stage-3 -- transcripts/real-input.txt
```

Or if Stage 3 only takes the sample by default, edit the run command:

```bash
node stage-3/orchestrator.js transcripts/real-input.txt
```

Watch the trace. Read the output together.

> "How is it? Useful? Surprising? Wrong about something?"

If the output is bad, the system prompts need more rules. Iterate together — change one rule, re-run, compare. This is the actual craft of building agents: tune the prompt until the output is what you want.

## Step 7: Save the result (2 min)

Save their personalized version somewhere they can find it later. The `student-output/` folder is theirs forever.

Suggest they save the working version of the prompts:

```bash
mkdir -p student-output/personalized
cp prompts/system.md student-output/personalized/system.md
cp prompts/summarizer.md student-output/personalized/summarizer.md
cp prompts/action_extractor.md student-output/personalized/action_extractor.md
cp transcripts/real-input.txt student-output/personalized/sample-input.txt
cp outputs/*.md student-output/personalized/sample-output.md 2>/dev/null || true
```

> "That `personalized/` folder is your take-home. Three prompts, one input, one output — your fingerprint on a multi-agent system."

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

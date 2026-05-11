---
name: module-7
description: What's Next — Module 7 of the AISC Agent Sprint (final module). Triggered when a student types "module-7". Send-off after the student has built a multi-agent system with the Conductor. Three example agent systems showing the same pattern in different domains, then a "what will you build?" close. No scaffolding, no homework — pure inspiration.
---

# Module 7: What's Next

**Time:** ~5-10 minutes

**What we're doing**
You've built a multi-agent system end-to-end. This module is the send-off: three example agent systems that use the same pattern you just built — Conductor + specialists — in different domains. The point isn't homework; it's to plant ideas. The closing question is the only one that matters: what will you build next?

## Coach Instructions

**This module is intentionally short.** Earlier versions tried to scaffold a "build your own" path with two full project templates. Round 6 feedback (Nicole) was that students won't actually do that — keep the send-off short, inspirational, and trust them to take it from here.

**Three examples, each ~one paragraph.** Same architecture as what they built (Conductor decides which specialists to call), different domain. Each example is a chain in the format: `input > conductor > specialists > output`.

**Don't add code, don't add starter files, don't add scaffolding.** The point is mental-model expansion, not another project to build inside the curriculum.

**Close with the only question that matters.** "What will you build next?" Not as homework. As an open question they can sit with.

---

## Step 1: Opener (1 min)

> "You've built a multi-agent system — Conductor on top, specialists underneath, the planner deciding what to call based on the instruction. The same pattern works for tons of other things. Three examples to plant the seed."

## Step 2: Three example agent systems (3-5 min)

> "Each of these has the same shape as what you built. Same Conductor pattern, different specialists, different domain."

> "**Meeting follow-up agent.** Transcript comes in. Conductor reads what you want from it (action items? summary? a follow-up email draft? a Slack post?) and dispatches the right specialists. Same orchestrator code, different prompts."
>
> `transcript > conductor > action-extractor / summary-writer / follow-up-drafter > output`

> "**Lead-qualification agent.** A form submission lands. Conductor classifies the lead type and dispatches the right enrichment chain — enricher, scorer, router, outreach-drafter. Different leads trigger different chains."
>
> `form submission > conductor > enricher / scorer / router / outreach-drafter > qualified lead`

> "**Personal finance categorizer.** A transaction comes in. Conductor decides what to look up — merchant, category, receipt, budget impact — and dispatches the right specialists. Different transactions, different lookups."
>
> `transaction > conductor > merchant-lookup / classifier / receipt-finder / budget-checker > tagged transaction`

> "Same pattern, different specialists. Same architecture you have running on your machine right now."

## Step 3: Closing (1 min)

> "You can build any of these by editing your three prompt files and changing what the specialists do. Same orchestrator code. Same Conductor."

> "So — what will you build next?"

(Don't push for an answer. Let the question sit. The student can answer or just nod and move on.)

## Step 4: Commit + checklist + `/compact` (1 min)

**Coach:** In the **sprint repo**, do all of this automatically — do not ask the student to run terminal commands:

1. Run `git add -A && (git diff --cached --quiet || git commit -m "Complete Module 7: What's Next")` via Bash tool from the sprint repo root and show the student the changed files (or "No changes to commit." if nothing was staged.)
2. Read `CLAUDE.md`, then update it via Edit tool: change `- [ ] Module 7:` to `- [x] Module 7:`.
3. **Tell the student:** *"That's the sprint. You built a chat assistant, a workflow, a multi-specialist system, and a multi-agent system with a Conductor. Same pattern, four different shapes. Whatever you build next — same shape, different specialists. Go build it. You can type `/compact` now to end the session cleanly, or just close out."*

## Coach guardrails

- **Don't add a fourth example.** Three is the right number — enough to show the pattern generalizes, not so many it feels like a list.
- **Don't add scaffolding.** No "to build the meeting follow-up agent, here's how to start." That was the old M8; it didn't land. Trust the student to take the pattern from here.
- **Don't drag out the close.** "What will you build next?" is the close. Resist adding more.

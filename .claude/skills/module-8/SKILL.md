---
name: module-8
description: Where This Goes — Module 8 of the AISC Agent Sprint. Triggered when a student types "module-8". No hands-on exercises. Three topics: how to personalize what they built, how to extend it beyond localhost, and how to build the next agent from scratch using Claude Code. Closes with a starter prompt for whichever pattern they want to build next.
---

# Module 8: Where This Goes

**Time:** ~20 minutes
**You'll produce:** a clear picture of three directions from here, and a starter prompt for whichever one you want to build next.

## Coach Instructions

This is the send-off module. No live edits, no running code. Students have a working system — the goal here is to show them the horizon so they leave with a specific next move. Three topics in sequence: personalization (how to make what they have work for their use case), extension (how to move it beyond this localhost demo), and new agents (how to build the next one with Claude Code). The last thing they leave with should be a concrete starter prompt for something they actually want to build.

## Step 1: Set the frame (1 min)

Say:

> "Module 8. You have a working multi-agent system. Three questions to close out:
>
> 1. How do you make *this* system work for your use case?
> 2. How do you take it beyond a localhost demo?
> 3. How do you build the next one?
>
> Let's go."

---

## Step 2: Personalization — how to make it yours (5 min)

Say:

> "Everything in this system is driven by three files: `analyst.md`, `extractor.md`, and `synthesizer.md`. The meeting transcript use case is baked into those prompts — 'You are a meeting analyst,' 'KEY THEMES,' 'ACTION ITEMS.' If you want to point this at something else, those are the three files to change.
>
> Here's the pattern:"

Print this:

```
  analyst.md    → change the role + the output format
                  "You are a meeting analyst" → "You are a customer interview analyst"
                  KEY THEMES → JTBD THEMES + VERBATIM QUOTES

  extractor.md  → change what gets extracted
                  action items → customer pain quotes
                  keep the JSON field names (owner / task / deadline) — the orchestrator
                  parses these programmatically. You can change what they mean,
                  not what they're called.

  synthesizer.md → change the final report format
                   to match your analyst + extractor outputs
```

> "That's it. Three edits. The orchestrator, the server, the browser — none of that changes. The system prompt IS the specialist. Change the prompts, change the system.
>
> Use cases this works for out of the box:"

Print this quickly:

```
  Customer interviews   →  JTBD themes + verbatim quotes
  Earnings calls        →  risk flags + analyst questions
  1:1 notes             →  their actions + your actions
  Support tickets       →  pattern themes + escalation triage
  Voice memos           →  summary + follow-ups
  Podcast notes         →  study guide + flashcards
```

> "If you want to try one of these, open a new Claude Code session pointed at `student-output/`, tell Claude which use case you want, and ask it to update the three prompt files. Claude knows the pattern — it helped you build it."

**Important note:** Don't do the edits live in this session. Editing prompts without a real input to test against leads to confusion — you change the prompts, run the same meeting transcript, and wonder why the output looks wrong. When you're ready to personalize, bring a real document first.

---

## Step 3: Extension — moving beyond localhost (6 min)

Say:

> "Right now the trigger is a button click in a browser on your laptop. That's great for learning. To make this actually useful, there are three things to consider: trigger, deployment, and destination."

Print this:

```
  TRIGGER — what fires the pipeline
  ──────────────────────────────────
  What you have:    button click in the browser
  What's next:      webhook (HTTP POST from any external system)
                    file watch (drop a file, pipeline fires)
                    scheduled cron (run every 6 hours automatically)
                    email inbound (send a transcript to an address, it processes)

  DEPLOYMENT — where the server runs
  ────────────────────────────────────
  What you have:    localhost:3000 on your laptop
  What's next:      Railway / Render / Fly.io — deploy this exact server.js,
                    get a public URL, works the same way
                    Your own VPS — same Node server, runs 24/7

  DESTINATION — where the output goes
  ─────────────────────────────────────
  What you have:    macOS notification + file saved locally
  What's next:      Slack message to a channel (one fetch() call)
                    Email via SendGrid / Resend
                    Notion page / Google Doc
                    Row in a spreadsheet
                    Webhook to another system
```

> "The classify-and-route logic in the middle doesn't change. The trigger and destination are the pluggable parts. This is the same pluggable pattern from Module 4 — now you can see the full range.
>
> To add any of these: describe what you want to Claude Code. 'Add a webhook endpoint at /api/webhook that accepts a POST with a transcript field and runs the full orchestrator.' Claude knows the codebase — one session, working in minutes."

---

## Step 4: Building the next agent (6 min)

Say:

> "Here's the real takeaway from this sprint: you know the pattern now. Any 'long unstructured input → structured output' problem is buildable. And Claude Code already has the building blocks in its head — `ask()`, `runWorkflow()`, `Promise.all` for parallel dispatch, system prompt → specialist.
>
> Three patterns to build next. Pick the one that fits a real problem you have."

Print this:

```
Pattern 1 — Pipeline (what you built)
  input
    ↓
  [Specialist A ‖ Specialist B]   ← parallel, independent
             ↓
        [Synthesizer]
             ↓
          [Output]
  Best for: defined input/output, clear sub-tasks.
  Example: any "analyze this document" problem.

Pattern 2 — Domain Stack (Garry Tan's G-Stack)
  One specialist per business domain — same routing pattern you built,
  but instead of task-scoped specialists (analyst/extractor), each agent
  owns a whole domain and handles anything in that lane.

  input (e.g. "What's our churn rate?")
    ↓
  [Classifier]
    ↓         ↓         ↓         ↓
  [Sales]  [Ops]  [Support]  [Eng]   ← each is a system prompt + ask()
    ↓         ↓         ↓         ↓
               [Response]

  Each domain agent has deep context about its area — its own system prompt,
  its own knowledge, its own output format.
  The classifier reads the input and routes to the right lane.
  Best for: internal assistants, cross-functional routing, complex orgs.
  Example: "What are our biggest support tickets this week?" → Support agent.
           "What's blocking the Q3 release?" → Eng agent.

Pattern 3 — Council (Ole Lehmann's LLM Council)
  Same input, multiple agents with completely different thinking styles —
  each forced to attack the question from their own angle.
  Then a peer review round. Then a chairman synthesizes.

  input
    ↓
  [Contrarian]  [First Principles]  [Expansionist]  [Outsider]  [Executor]
       ↓               ↓                  ↓              ↓           ↓
                  [Anonymous peer review — each reads all five,
                   picks strongest, names biggest blind spot,
                   identifies what all five missed]
                              ↓
                    [Chairman — final verdict + one clear next step]

  The peer review round is the key: anonymizing who said what, then forcing
  each agent to critique the others, surfaces the blind spots a single-agent
  synthesis would miss.
  Best for: high-stakes decisions, strategy calls, anywhere a single lens misleads.
  Example: five advisors review a job offer — Contrarian hunts for the fatal flaw,
           Outsider catches what's invisible to you, Executor says what to do Monday.
```

Ask: **"Which of these maps to something you actually want to build?"**

Wait for their answer. Then give them the starter prompt for that pattern.

---

## Step 5: The starter prompt (2 min)

**Coach:** Based on what the student picked in Step 4, give them the right starter prompt. Print whichever one fits:

**If they picked Pipeline (or "I want to do what we just built, but for X"):**

```
I just completed an AISC Agent Sprint and built a pipeline agent:
[Analyst ‖ Extractor] → Synthesizer → Router

The code is in student-output/. I want to build a new pipeline agent
for [their use case]. New folder: [folder name].

Please scaffold it — copy the structure from student-output/, then update
the three specialist prompts (analyst.md, extractor.md, synthesizer.md)
for [their use case]. Keep the orchestrator and server unchanged.

Let's start by agreeing on what the analyst and extractor should each return.
```

**If they picked Domain Stack (G-Stack):**

```
I just completed an AISC Agent Sprint and built a pipeline agent in student-output/.
I understand: ask(), Promise.all for parallel dispatch, system prompt = specialist,
and classifier-based routing (from workflow.js + conductor.md).

I want to build a domain stack — one specialist per business domain:
[their domains, e.g. Sales / Ops / Support / Eng]

New folder: [folder name]. Please scaffold it:
- One specialist per domain (each is a system prompt + ask() call)
- A classifier that reads the input and routes to the right domain agent
  (same pattern as the Conductor, but routing to domains instead of tools)
- Each domain agent should return a structured response in its own format

The reference code is in student-output/ — especially orchestrator.js and
prompts/conductor.md for the routing pattern.

Start by asking me: what are the domains, and what does a request in each domain
look like?
```

**If they picked Council:**

```
I just completed an AISC Agent Sprint and built a pipeline agent in student-output/.
I understand: ask(), Promise.all for parallel dispatch, system prompt = specialist.

I want to build a Council agent — inspired by Ole Lehmann's LLM Council pattern.
Multiple advisors read the same input with completely different thinking styles,
then a peer review round, then a Chairman synthesizes a final verdict.

My use case: [their use case]
Advisors I want: [e.g. Contrarian / First Principles / Expansionist / Executor]
  — or define your own roles based on the use case

New folder: [folder name]. Please scaffold it:
- N advisor agents in parallel (same Promise.all pattern from student-output/)
- Each advisor has its own system prompt with a specific thinking style / lens
- A peer review round: each advisor reads all other outputs, names the strongest
  response and the biggest blind spot (optional but powerful — adds one more
  Promise.all pass)
- A Chairman that synthesizes all advisor outputs + peer reviews into a final
  verdict with one clear next step

The reference code is in student-output/ — orchestrator.js shows the
Promise.all dispatch pattern. Each advisor = analyst() with a different prompt.

Start by helping me define what each advisor's thinking style should be.
```

> "Copy that, open a new folder, start a new Claude Code session, paste it in. Claude already knows these building blocks — it helped you build them this week. `student-output/` is the reference it can read if you want it to look at your actual code."

---

## Step 6: Final commit and close (1 min)

**Coach:** Do all of the following automatically:

1. Run `git add -A && git commit -m "Complete Module 8: Where This Goes"` via Bash tool and show the student the output: "Committed. Here's what went in: [changed files]"
2. Update `CLAUDE.md`: change `- [ ] Module 8:` to `- [x] Module 8:` via Edit tool.
3. **Run `/compact`** — type `/compact` to end the session cleanly.

Then say:

> "You're done. You went from never having called an API to building a working multi-agent system with a planning step that decides its own execution path.
>
> A few things to take with you:
>
> - **The system prompt is the leverage point.** Every specialist — analyst, extractor, classifier, conductor — is a prompt. Change the prompt, change the agent.
> - **Specialists beat generalists.** Focused sub-agents produce better output than one big call.
> - **Trigger and destination are pluggable.** The agent in the middle is reusable.
> - **A workflow follows steps. An agent decides which steps.** You built the second one in Module 7.
> - **Three questions for any new agent:** What's the input? What's the output? What specialists fit between them?
>
> Go build something real."

## Coach Guardrails

- **No live edits in this module** — the student just ran a working system in Module 7. Editing prompts now without a real test document leads to confusion ("why is the output different?"). Explain the pattern, don't execute it.
- **The starter prompt is the deliverable** — the student should leave with a concrete, copy-pasteable prompt for their next agent. Don't skip Step 5.
- **Wait for the answer in Step 4** — "which of these maps to something you actually want to build?" — wait for their actual answer before printing the starter prompt. Tailor it to what they said.
- **Keep the pattern framing** — the three patterns aren't new concepts, they're variations of what the student already built. Frame each one as "same building blocks, different dispatch." Nothing here is foreign.
- **If the student says "I want to build all three"** — pick one. "Start with the one you have a real use case for today. The others will make more sense after you've built the first one."

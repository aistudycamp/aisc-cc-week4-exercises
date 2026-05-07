---
name: module-8
description: Where This Goes — Module 8 of the AISC Agent Sprint. Triggered when a student types "module-8". The send-off module. Light overview of three agent patterns (Pipeline, Domain Stack, Council). Then two turnkey paths the student picks between — Personalize what they built, OR Build a new one (Council recommended, G-Stack alt). Finishes with a relocation step so the new project lives outside the exercise repo.
---

# Module 8: Where This Goes

**Time:** ~25 minutes

**What we're building**
By the end: you've picked one of two turnkey paths — either personalize the pipeline you already have, or build a new agent (a Council, by default) — and the project is set up in a permanent folder you can keep using after the sprint ends.

## Coach Instructions

This is the send-off. No re-teaching. Two parts:

1. **Light overview of three patterns** (Pipeline / Domain Stack / Council) — one paragraph each, max. Just enough to show them options.
2. **One turnkey path, end-to-end.** The student picks Path A (personalize) or Path B (build new — default Council). Whichever they pick, you walk them through it concretely: pre-filled `CLAUDE.md`, folder commands, relocation out of the exercise repo.

The student should leave with a working project in a folder they own — not stuck in `student-output/` inside the exercise repo. That's why the **relocation step is required** for either path.

## Step 1: Set the frame (1 min)

Say:

> "Last module. You built one specific pattern — a pipeline — for one specific use case (transcripts → insights). Now: where does this go?
>
> First, a quick tour of three agent patterns — yours plus two others — so you know the landscape. Then we'll set you up with a permanent project of your own. Two paths to pick from."

---

## Step 2: The three patterns at a glance (3 min)

Print this:

```
┌──────────────────────────────────────────────────────────────────────────┐
│  PATTERN 1 — PIPELINE                          (what you just built)     │
│                                                                          │
│  A document goes in. Specialists analyze in parallel. A synthesizer      │
│  combines them. A router handles the result. Fixed stages every time.    │
│  Best for: processing documents — transcripts, contracts, reports.        │
│                                                                          │
│  document → [Analyst ‖ Extractor] → Synthesizer → Router                 │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  PATTERN 2 — DOMAIN STACK (Garry Tan's "G-Stack")                        │
│                                                                          │
│  A question goes in. A classifier routes it to the one specialist that   │
│  owns that domain — Sales, Ops, Support, Eng. One answers; the rest      │
│  stay silent. No synthesizer. No parallel dispatch.                      │
│  Best for: internal assistants, "route this to the right expert."         │
│                                                                          │
│  question → [Classifier] → [Sales] OR [Ops] OR [Support] OR [Eng]        │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  PATTERN 3 — COUNCIL (Ole Lehmann's "LLM Council")                        │
│                                                                          │
│  A decision goes in. Multiple advisors read it simultaneously, each      │
│  forced into a different thinking style (Contrarian, First Principles,   │
│  Expansionist, Outsider, Executor). They peer-review each other's        │
│  reasoning anonymously. A Chairman delivers a final verdict.             │
│  Best for: high-stakes decisions where one lens misleads.                │
│                                                                          │
│  decision → [5 advisors in parallel] → [peer review] → [Chairman]        │
└──────────────────────────────────────────────────────────────────────────┘
```

> "All three share the same primitives you already know — `ask()`, system prompts, `Promise.all`. The architectures differ in shape. You don't need to understand them all today. You just need to pick one and ship it."

---

## Step 3: Pick a path (1 min)

Ask the student exactly this:

> "Two paths. Which one do you want?
>
> **Path A — Personalize what you built.** Take the pipeline you just shipped and re-aim it at a different domain. Customer interviews, earnings calls, 1:1 notes, whatever. Same code, three new prompts. We'll finish it together inside this session — you walk away with a working tool. **Recommended if you want to ship something today.**
>
> **Path B — Starter for a new architecture.** A scaffold + a `CLAUDE.md` for a different pattern (default: a Council of advisors). I'll set up the folder and write the spec. *You'll finish the actual build on your own time*, in a fresh Claude Code session that uses the spec to write the code. The course doesn't continue — this path hands you a working starting point and turns you loose. **Pick this if you want to see another architecture and you're comfortable driving Claude on your own afterward.**
>
> Which one?"

**Coach: STOP HERE. Wait for the student's answer.** Do not start scaffolding before they pick. If they say "both," redirect: "Pick the one you have a real use case for *today*. The other one will make more sense after you've shipped the first."

Once they answer, jump to **Step 4A** (Personalize) or **Step 4B** (Build new). Skip the other.

---

## Step 4A: Personalize what you built (turnkey, ~10 min)

Use this if the student picked Path A.

### Step 4A.1: Pick a domain together (2 min)

Ask:

> "What's the use case? A few options that work cleanly out of the box:"

Print:

```
  Customer interviews   →  JTBD themes + verbatim quotes
  Earnings calls        →  risk flags + analyst questions
  1:1 notes             →  their actions + your actions
  Support tickets       →  pattern themes + escalation triage
  Voice memos           →  summary + follow-ups
  Podcast notes         →  study guide + flashcards
  ── or pitch your own ──
```

Wait for the student to pick. Capture two things:
- **Domain name** (e.g. `customer-interviews`)
- **What the analyst and extractor should each return** (e.g. analyst → JTBD themes; extractor → verbatim pain quotes with speaker name)

### Step 4A.2: Pick the new home (2 min)

Say:

> "We're going to copy the project out of the exercise repo so you can keep using it after this sprint ends. Where do you want it to live? Three normal answers:
>
> - `~/projects/[domain-name]/` — generic project folder
> - `~/Documents/[domain-name]/` — visible in Finder
> - inside an existing repo where this tool fits — paste the path
>
> What's the path?"

Wait for the student's answer. Save it as `[NEW_HOME]`. If they're unsure, default to `~/projects/[domain-name]/` and say so.

### Step 4A.3: Scaffold + copy (3 min)

**Coach:** Run all of these via Bash tool (substituting `[NEW_HOME]` and `[domain-name]`):

```bash
mkdir -p [NEW_HOME]
cp -R student-output/. [NEW_HOME]/
cd [NEW_HOME] && rm -rf node_modules transcripts/incoming/*
```

Then write a fresh `CLAUDE.md` to `[NEW_HOME]/CLAUDE.md` with this exact content (substituting the domain name and the analyst/extractor descriptions):

```markdown
# [Domain Name] — built from the AISC Agent Sprint

This project is a personalized version of the pipeline agent built during the
AISC Agent Sprint. It was originally a meeting-transcript analyzer; it's now
re-aimed at **[domain]**.

## Architecture

[Document] → [Analyst ‖ Extractor] (parallel) → [Synthesizer] → [Router]

- `prompts/analyst.md` — [what the analyst returns for this domain]
- `prompts/extractor.md` — [what the extractor returns for this domain]
- `prompts/synthesizer.md` — combines analyst + extractor into the final report
- `prompts/classifier.md` — classifies the document type (used by Router)
- `stage-1/chat.js` — `ask()` and `chatTurn()` API helpers
- `stage-2/workflow.js` — `runWorkflow()` (classify + route + notify)
- `stage-3/orchestrator.js` — orchestrator + Conductor planning step
- `server.js` — Express server, http://localhost:3000

## How to use it

1. `npm install`
2. Add `.env` with `ANTHROPIC_API_KEY=sk-ant-...`
3. `npm run server`, open http://localhost:3000
4. Or drop a file into `transcripts/incoming/` to fire the workflow

## Working on this with Claude Code

The three prompts in `prompts/` are the leverage point. Change them to change
what the system does. Don't change the orchestrator unless you're adding a new
specialist or new step.

When asking Claude to update a prompt: read the existing file first, change
only the parts that need to change, leave the JSON output schema (where one
exists) alone unless you want to change `orchestrator.js` too.
```

Tell the student:

> "I just copied your project to `[NEW_HOME]`, dropped a fresh `CLAUDE.md`, and cleaned out the temp folders. Three things to do next."

### Step 4A.4: Update the prompts (3 min)

**Coach:** Open a new Claude Code session in `[NEW_HOME]` (or just `cd` there and use this session). Then update the three prompt files for the new domain. For each file:

1. Read the existing file via Read tool.
2. Edit only the role line and the output sections — keep JSON schemas (in extractor/synthesizer) intact.
3. Print the updated file inline so the student can see it.

The three changes:

- **`prompts/analyst.md`** — change the role and output sections to match the new analyst job (e.g., for customer interviews: themes by JTBD category instead of meeting themes).
- **`prompts/extractor.md`** — change *what* gets extracted; keep the JSON field names (`owner`, `task`, `deadline`) unless the student also wants to change the orchestrator. (Tell them which fields they'd need to update if they want to rename.)
- **`prompts/synthesizer.md`** — update the final report headers to match the new analyst + extractor outputs.

### Step 4A.5: Smoke test (1 min)

In the new project folder:

```bash
npm install
npm run server
```

Have the student paste a real document for the new domain into the chat tab and verify the response makes sense. If it doesn't, iterate on the prompt — that's the whole point of this folder existing.

> "That's a working personalized agent in your own folder. Skip to Step 6 — the close."

---

## Step 4B: Scaffold a new architecture (starter, ~10 min)

Use this if the student picked Path B. **Default architecture: Council.** G-Stack is mentioned at the end as an alternative.

**This path is a starter — not a finished build.** What you do here: scaffold the folder, drop in a CLAUDE.md spec, hand the student the prompt that kicks off the new Claude session. You will *not* try to finish the actual code in this session — that's the student's job afterward, and the CLAUDE.md is what guides the new Claude. Be explicit with the student about this so they don't expect a working Council in 10 minutes.

### Step 4B.1: Pick the use case (2 min)

Ask:

> "Council works best for high-stakes decisions where you don't trust a single perspective. Some real examples:"

Print:

```
  - Should I take this job offer?
  - Should we kill the X feature and double down on Y?
  - Buy / rent / wait — for a specific city + budget
  - Does this strategy doc actually hang together?
  - Hire candidate A or candidate B?
  - Is now the right time to raise?
  ── or your own ──
```

Wait for the student to pick. Capture:
- **Use case in one line** (e.g. "evaluating a senior hire")
- **Five advisor styles** — default is Contrarian / First Principles / Expansionist / Outsider / Executor, but offer to swap any if they have stronger preferences.

### Step 4B.2: Pick the new home (2 min)

Say:

> "Where do you want this project to live? Same options as Path A:
>
> - `~/projects/council/` — generic
> - `~/Documents/council/` — Finder-visible
> - inside an existing repo
>
> What's the path?"

Wait for an answer. Save as `[NEW_HOME]`. Default: `~/projects/council/`.

### Step 4B.3: Scaffold from scratch (4 min)

**Coach:** Run via Bash tool:

```bash
mkdir -p [NEW_HOME]/prompts
cd [NEW_HOME]
npm init -y
npm install @anthropic-ai/sdk dotenv express
```

Copy the env file from the sprint:

```bash
cp [repo-root]/student-output/.env [NEW_HOME]/.env
```

Then write `[NEW_HOME]/CLAUDE.md` with this exact content (substitute use case + advisors):

```markdown
# Council — built from the AISC Agent Sprint

A multi-advisor decision agent inspired by Ole Lehmann's LLM Council.
Use case: **[their use case]**

## Architecture

decision in
   ↓
[5 advisors in parallel — different thinking styles]
   ↓
[peer review — each advisor reads the other 4 anonymized,
 names the strongest argument and the biggest blind spot]
   ↓
[Chairman — synthesizes a verdict + ONE next step]

## Files Claude should create

- `prompts/contrarian.md` — assumes the proposed decision is wrong; finds the strongest objection
- `prompts/first-principles.md` — strips assumptions, reasons from physics/economics/incentives
- `prompts/expansionist.md` — argues for the upside, the bigger version, what's possible if it works
- `prompts/outsider.md` — pretends to know nothing about the situation; surfaces missing context
- `prompts/executor.md` — assumes the decision is made; focuses on tradeoffs of execution
- `prompts/peer-review.md` — reads all 5 advisors anonymized, identifies strongest + biggest blind spot
- `prompts/chairman.md` — reads everything, delivers final verdict + next step
- `council.js` — the orchestrator. Calls all 5 advisors via `Promise.all`, then peer-review, then chairman
- `server.js` — Express, single endpoint POST /api/council that takes `{decision: string}` and returns the chairman's verdict
- `package.json` script `"server": "node server.js"`

## Building blocks I already know

- `ask(question, system)` returns the model's reply for a single call
- `Promise.all([advisor1(), advisor2(), ...])` runs all advisors at once
- `client.messages.create({ model: "claude-sonnet-4-6", max_tokens: 1024, system, messages: [...] })` is the raw API call

## How to build this

1. Read this whole file.
2. Write the 7 prompt files. Each advisor's system prompt should be 5–10 lines, very forceful about the thinking style — the prompt is the lens.
3. Write `council.js` with a `runCouncil(decision)` function that does parallel advisors → peer review → chairman, returns `{verdict, nextStep}`.
4. Write `server.js` exposing POST /api/council.
5. Don't add a frontend yet — `curl` is fine for the first run.
```

Tell the student:

> "Project scaffolded. Empty package, empty prompts folder, fresh `CLAUDE.md` that tells Claude exactly what to build."

### Step 4B.4: Hand off to Claude in the new project (3 min)

Have the student `cd [NEW_HOME]` and start a new Claude Code session there:

```bash
cd [NEW_HOME]
claude
```

Their first prompt to that fresh Claude session:

```
Read CLAUDE.md and build the project it describes. Start by writing the
five advisor prompts. Pause before writing council.js — let me see the
prompts first.
```

Tell them:

> "That new Claude Code session has the CLAUDE.md you and I just wrote. It will scaffold the rest *on your own time*, after this sprint ends. The way to drive it: pause before each step, review what it produced, push back, iterate. Don't accept the first draft of any of the advisor prompts — the prompt IS the advisor. When you're stuck, paste what's failing back into the chat and ask Claude to fix it. You're its product manager now.
>
> This sprint doesn't continue from here. You have everything you need: a working folder, a clear spec, and three hours of practice working with Claude. Go finish the build whenever you have time — could be tonight, could be next weekend."

### Step 4B.5: How you'll know it works (1 min)

> "When you've got a working `council.js` and `server.js`, the smoke test is: run `npm run server`, hit the endpoint with a decision, see if a verdict comes back. The new Claude session can write the smoke-test command for you when you're ready — just ask: 'Give me the smoke test command for this server.'"

### Step 4B.6: G-Stack alternative (1 min, optional)

Say:

> "If Council isn't your thing, the same scaffolding flow works for the Domain Stack — replace the 5 advisors with N domain agents (Sales, Ops, Support, Eng, etc.), replace peer-review and chairman with a single classifier that picks one. The CLAUDE.md template lives in `concepts/g-stack.md` if you want it later — same shape as the Council one."

---

## Step 5: Relocation guard (the project must live OUTSIDE this repo)

If you skipped the "pick a home" step in 4A or 4B, do it now. **The project should NOT stay inside `student-output/` after the sprint ends.** Reasons:

- The sprint repo is a learning artifact; their tool is a real artifact.
- They'll want to commit it to its own git repo.
- They'll want to share it / deploy it / extend it without dragging the sprint repo around.

If their project is still in `student-output/`, walk them through `cp -R student-output/. [NEW_HOME]/` and `cd [NEW_HOME] && git init`.

---

## Step 6: Final commit and close (2 min)

**Coach:** In the **sprint repo** (not the new project), do all of this automatically:

1. Run `git add -A && git commit -m "Complete Module 8: Where This Goes"` via Bash tool from the sprint repo root and show the student the changed files.
2. Update `CLAUDE.md`: change `- [ ] Module 8:` to `- [x] Module 8:` via Edit tool.
3. **Run `/compact`** — type `/compact` to end the session cleanly.

Then say:

> "You're done with the sprint. You went from a tour of the system in Module 1 to a working multi-agent system you can run, plus a personalized version of it (or a brand-new Council scaffold) in your own project folder.
>
> A few things to take with you:
>
> - **The system prompt is the leverage point.** Every specialist — analyst, extractor, classifier, conductor, advisor — is a prompt. Change the prompt, change the agent.
> - **Specialists beat generalists.** Focused sub-agents produce better output than one big call.
> - **Trigger and destination are pluggable.** The agent in the middle is reusable.
> - **A workflow follows steps. An agent decides which steps.**
> - **Three questions for any new agent:** What's the input? What's the output? What specialists fit between them?
>
> Your project is at `[NEW_HOME]`. Go build something real with it."

## Coach Guardrails

- **Pick ONE path; don't try to do both.** If the student says "I want to do both," redirect to the one they have a real use case for *today*. The other will make more sense after the first ships.
- **Wait for the path pick in Step 3** — do not pre-scaffold before the student answers. The whole module branches off that answer.
- **The relocation step is required** — students leave with a project in a folder they own, NOT inside `student-output/`. If they push back ("can I just keep it here?"), explain why: separate git repo, separate concerns, separate lifetime.
- **Don't over-explain the three patterns in Step 2.** One paragraph each, then move on. The patterns aren't the point of this module — *shipping a project the student owns* is the point.
- **If the new Claude Code session in Path B writes bad advisor prompts**, push back as the student. "These all sound like the same advisor — what makes the Contrarian different from First Principles in the actual output?" Iterate. The prompt IS the advisor.
- **Don't generate a frontend in Path B by default.** `curl` is fine for the first run. A frontend is a separate session.

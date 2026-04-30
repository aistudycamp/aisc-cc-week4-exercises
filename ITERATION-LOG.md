# Agent Sprint — Iteration Log

This document tracks every round of feedback and the changes made. The goal is to build a repeatable system for course improvement — feedback in, changes out, structured and traceable.

---

## Round 1 — Initial Student Test (Ben as student)

**Date:** April 2026

### Feedback Given

42 feedback items from a live run-through. Clustered into 5 root problems:

1. **Stage 2 is not a real workflow.** Students couldn't see why they'd use it over Stage 1. Both had the same shape: one agent, one output. The "workflow" felt like a relabeled chat assistant.
2. **Stage 3 sub-agents don't use Stage 1/Stage 2.** The building-block payoff never lands. Students built Stage 1 and Stage 2 and then Stage 3 ignored them entirely.
3. **Never taught vibe-coding.** Every module asked students to edit code directly. The course should model "tell Claude what you want" — not "find line 47 and change it."
4. **Code bugs blocking end-to-end runs.** `chat.js` didn't handle transcript file args. Watcher triggered on wrong directory. API key loading broken. Dotfiles not copied by scaffold command.
5. **Setup friction and calibration issues.** API key step buried, concept docs opened mid-module (breaking flow), parallel/planner framing too technical for the audience.

### Changes Made (v2 rewrite — 3 phases)

**Phase 1 — Code:**
- `stage-2/workflow.js` redesigned: chokidar watches `transcripts/incoming/`, AI classifier routes to one of 3 typed folders (`team-standup/`, `client-call/`, `planning-session/`), macOS notification fires, `runWorkflow()` exported
- `stage-3/orchestrator.js` redesigned: sequential dispatch using `ask()` (Stage 1) and `runWorkflow()` (Stage 2) as building blocks — no planner, every run goes through all 3 steps
- `prompts/classifier.md` added: returns `{ type, suggested_filename }` JSON
- `stage-1/chat.js` bug fixed: detects file arg, loads transcript, gives correct startup message
- `package.json`: added `drop-test` script
- Folder structure: added `incoming/`, `team-standup/`, `client-call/`, `planning-session/`

**Phase 2 — SKILL.md files + CLAUDE.md:**
- `CLAUDE.md`: greeting behavior, troubleshooting section, Teaching Guardrail added: "Never ask students to edit code directly"
- All edit steps replaced with "Tell Claude: [exact message]" pattern (vibe-coding)
- `module-4/SKILL.md`: Complete reframe for new Stage 2 — pipeline framing, `drop-test`, reflection question before showing code
- `module-5/SKILL.md`: New vibe-coding extension pattern — student describes a new step, Claude writes it
- `module-6/SKILL.md`: Sequential dispatch framing, planner removed, LLM-call-count prediction question added
- Concept doc open steps removed from all modules — demoted to "Optional deeper reading" callouts
- `examples/example-transcripts-insights.md`: Replaced code/architecture doc with clean human-readable report output

**Phase 3 — Frontend:**
- AISC branding applied: Playfair Display / Geist / Geist Mono fonts, teal `#0D9488` accent, cream `#F5F0EB` background
- `[ ai study camp ]` wordmark + "Agent Sprint · Visualization" sub-label
- Stage 2 redesigned from 3-node chat-style to 4-node pipeline: `incoming/` → Classifier → `team-standup/` → macOS banner
- Stage 3 planner removed: updated to sequential dispatch language throughout nodes, inspect panels, and animation

---

## Round 2 — Visualization Review (this session)

**Date:** April 29, 2026

### Feedback Given

1. **Stage 2 needs branching, not a linear chain.** The Classifier should visually branch into 3 possible paths — showing the AI is making a decision, not just passing data forward. Client-call and planning-session paths should be visible even if the animation only follows one.
2. **Stage 3 still shows wrong specialists.** The Summarizer and Extractor were labeled "Synthesizer" and referenced old planner architecture. The third specialist was missing entirely.
3. **Conductor was too technical.** The inspect panel showed `import { ask } from '../stage-1/chat.js'` — code that students haven't written yet and doesn't help them understand what's happening.
4. **No document merge step visible.** Neither Stage 2 nor Stage 3 showed clearly where the file actually gets written and saved as a document.
5. **Node body text unreadable.** All-italic serif paragraphs look like a wall of cursive text. Hard to scan.

### Changes Made

**Stage 2 — branching visualization:**
- Removed single `s2-output` node, added 3 path nodes: `s2-standup`, `s2-client`, `s2-planning`
- CSS positions updated for 6-node branching layout
- SVG: Classifier branches to all 3 paths (team-standup solid, client-call and planning-session dashed). All 3 converge to final node.
- Final node renamed "Document + banner" — makes file-writing an explicit step
- Animation: Classifier decides → particle travels the chosen path → document written → notification fired

**Stage 3 — architecture corrected:**
- Added `s3-route` (Specialist 3: The Router) — takes transcript + themes + actions, classifies, merges into one document, routes, notifies
- Node tags changed: "Stage 2 building block" → "Specialist 1", "Synthesizer" → "Specialist 2"
- Conductor description: removed all code import references, replaced with plain-English bullet list
- Inspect panels: Conductor connections now name "The Summarizer", "The Extractor", "The Router" — no function names

**Stage 3 — parallel dispatch (Round 3 feedback below):**
*(see Round 3)*

**Readability:**
- `ag-desc` and `sa-body` CSS: changed from `font-family: serif; font-style: italic` to `font-family: sans; font-style: normal`
- Node body text converted to bullet lists where multiple points exist
- Emphasis (`em`) used sparingly for key phrases only

---

## Round 3 — Architecture Refinement (same session)

**Date:** April 29, 2026

### Feedback Given

1. **Summarizer + Extractor should run in parallel, not sequentially.** They do independent jobs (themes vs. actions) — there's no reason one should wait for the other. Parallel dispatch is the key learning moment: specialists run at the same time, Conductor waits for both.
2. **The Stage 1 → Stage 3 narrative needs to be explicit.** Stage 1 has one Analyst doing both jobs (themes + actions). Stage 3 splits that into two specialists running in parallel. That progression — one generalist → two focused specialists — is the pedagogical core and it wasn't visible anywhere.
3. **Router should take all three inputs.** The Router (Specialist 3) should receive the original transcript plus the Summarizer's themes plus the Extractor's actions. It merges all of that into one document before classifying and routing.

### Changes Made

**Stage 3 animation — parallel dispatch:**
- Summarizer and Extractor particles fire at t:2100 and t:2200 (100ms apart, visually simultaneous)
- Both nodes activate within 100ms of each other — students see two things running at once
- Conductor waits for both before dispatching to Router

**Stage 3 — Stage 1 narrative thread:**
- Summarizer inspect: "One half of what the Stage 1 Analyst did alone — but as a dedicated specialist. Runs in parallel with the Extractor."
- Extractor inspect: "The other half of what the Stage 1 Analyst did alone — but as a focused specialist. Runs in parallel with the Summarizer."
- Conductor inspect: "In Stage 1, one Analyst did all of this alone. Here, the Conductor splits the work..."
- Summarizer and Extractor static node bodies reference Stage 1 Analyst directly

**Stage 3 animation — Router inputs:**
- Animation now explicitly says: "Got the transcript, 3 themes, 4 action items" before merging
- Router description: "Classifying meeting type, merging themes + actions + transcript into one document, routing to team-standup/, notification sent"
- Output message: "Merged document saved: `team-standup/2026-04-29-insights.md`"

---

## What This Log Is For

This log is the seed of an automated course-improvement system. The pattern in each round is:

```
Student runs the course
  → Feedback collected (symptoms, root causes, clusters)
    → Changes scoped (what exactly to change and why)
      → Changes made (files, lines, what was replaced with what)
        → Verified (does it fix the root cause, not just the symptom)
```

The feedback format that produces the best changes:
- Name the **root problem**, not just the symptom ("students can't see why Stage 2 is different from Stage 1" not "Stage 2 is confusing")
- Point to **what the student would see or feel** ("the Classifier just looks like a relabeled Analyst")
- Name **what better looks like** ("branching paths showing 3 possible routes")

Changes that don't make it into this log tend to drift back.

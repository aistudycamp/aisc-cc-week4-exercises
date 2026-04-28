# Example: transcripts → insights (fully built)

This is what the three-stage system looks like by the end. Use it as a reference if you get stuck.

The use case: drop a meeting transcript → get back a structured insights report (key themes, action items, recommended next step).

The architecture: three building blocks, each one using the previous.

---

## The output

Given the sample transcript (a product team standup with Alex, Sam, Jordan, Riley, and Taylor), the agentic system produces something like:

```
**KEY THEMES**
- Q2 ship-date risk: Sam's API rate-limiter rewrite is blocked on an unsolved deadlock — until Thursday at the earliest.
- Tier-1 bug surge: Riley reports 12 open Tier-1 bugs, several clustering around the auth flow Stopa flagged last week.
- Design ↔ engineering handoff: Jordan flagged the new dashboard shipped without the agreed spacing, typography, and empty states.

**ACTION ITEMS**
- Sam: Post API blocker status in Slack (by Thursday EOD)
- Riley: Triage the 12 open Tier-1 bugs (by Friday standup)
- Jordan + Taylor: Draft a design-handoff checklist (by Monday)
- Taylor: Schedule a 30-minute architecture sync with Sam (sometime next week)

**RECOMMENDED NEXT STEP**
Sam should post the API blocker status by Thursday EOD so the team can decide whether the Q2 ship date is still viable.
```

---

## Stage 1 — Chat Assistant

An interactive multi-turn loop. You paste the transcript as your first message, then ask follow-ups:

```
> [paste transcript]
Assistant: **KEY THEMES** ...

> What are the top 3 action items?
Assistant: 1. Sam should post...

> Who looks most blocked?
Assistant: Sam is the most...

> exit
```

Key export — reused by Stages 2 and 3:

```js
export async function ask(question, context) {
  const content = context ? `${question}\n\n${context}` : question;
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    system: systemPrompt,
    messages: [{ role: "user", content }],
  });
  return response.content[0].text;
}
```

---

## Stage 2 — Workflow

A fixed 4-step pipeline. The chat assistant is step 2:

```
Step 1: File detected in transcripts/
Step 2: ask("Generate insights report.", transcript)   ← Stage 1 building block
Step 3: Format as markdown
Step 4: Save to outputs/
```

The import in `stage-2/workflow.js`:

```js
import { ask } from '../stage-1/chat.js';  // ← explicit reuse
```

Drop a file → pipeline fires → report saved. No `npm run` needed.

---

## Stage 3 — Agentic System

A planner decides which tools to use, then the orchestrator dispatches:

```
┌───────────────────────────────────────────────────────┐
│                    ORCHESTRATOR                        │
│                                                        │
│  Step 1: Planner — "use summarize + extract"           │
│                                                        │
│  Step 2: Dispatch based on plan:                       │
│    ├─→ ask()          (Stage 1 — if plan includes chat)│
│    ├─→ runWorkflow()  (Stage 2 — if plan includes it)  │
│    ├─→ summarize()    (specialist — themes)            │
│    └─→ extractActions() (specialist — action items)    │
│                                                        │
│  Step 3: Synthesize all results → final report         │
└───────────────────────────────────────────────────────┘
```

The imports in `stage-3/orchestrator.js`:

```js
import { ask }         from '../stage-1/chat.js';    // Stage 1 building block
import { runWorkflow } from '../stage-2/workflow.js'; // Stage 2 building block
```

---

## How the prompts map to the system

| Prompt file | Used by | Returns |
|-------------|---------|---------|
| `prompts/system.md` | Stage 1 `ask()` + Stage 3 synthesizer | Prose report |
| `prompts/summarizer.md` | Stage 3 `summarize()` specialist | `{ themes: [...] }` JSON |
| `prompts/action_extractor.md` | Stage 3 `extractActions()` specialist | `{ actions: [...] }` JSON |
| `prompts/router.md` | Stage 3 `planner()` | `{ tools: [...] }` JSON |

---

## Where to take it next

Once you've personalized the prompts in Module 8, this same shape works for:

- **Earnings call** transcripts → key risks + analyst questions
- **Customer interviews** → JTBD themes + verbatim quotes
- **Lecture notes** → study guide + flashcards
- **1:1 notes** → decisions + your-actions vs their-actions
- **Voice memos** → executive summary + action items

Same skeleton. Different prompts. Different value.

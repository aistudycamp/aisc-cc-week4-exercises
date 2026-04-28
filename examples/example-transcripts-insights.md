# Example: transcripts → insights (fully built)

This is what your agent looks like by the end of Stage 3. Use it as a reference if you get stuck.

The agent: drop a meeting transcript file → get back a structured insights report (key themes, action items, recommended next step).

---

## What it produces

Given the sample transcript (a product team standup with Alex, Sam, Jordan, Riley, and Taylor), the agent produces something like:

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

That output is **synthesized**: themes from the Summarizer sub-agent, actions from the Extractor sub-agent, then composed by the Orchestrator.

---

## How it's wired

```
                  ┌─────────────────────┐
                  │  THE ORCHESTRATOR   │
                  │   "The Conductor"   │
                  └──────────┬──────────┘
                             │ (dispatches in parallel)
              ┌──────────────┴──────────────┐
              ▼                             ▼
    ┌─────────────────────┐      ┌─────────────────────┐
    │   THE SUMMARIZER    │      │    THE EXTRACTOR    │
    │  3 themes (JSON)    │      │  N actions (JSON)   │
    └──────────┬──────────┘      └──────────┬──────────┘
               │                            │
               └─────────────┬──────────────┘
                             ▼
                  ┌─────────────────────┐
                  │   FINAL REPORT      │
                  │   (orchestrator     │
                  │    synthesizes)     │
                  └─────────────────────┘
```

Three API calls, three different system prompts, one final report.

---

## How it's organized in code

- `prompts/system.md` — what the orchestrator and synthesizer follow
- `prompts/summarizer.md` — what the summarizer follows (returns JSON)
- `prompts/action_extractor.md` — what the extractor follows (returns JSON)
- `stage-3/orchestrator.js` — the four functions: `summarize`, `extractActions`, `synthesize`, `orchestrator`

The orchestrator is ~15 lines:

```js
export async function orchestrator(transcript) {
  const [themes, actions] = await Promise.all([
    summarize(transcript),
    extractActions(transcript),
  ]);
  return await synthesize({ themes, actions });
}
```

That's the whole multi-agent system.

---

## Where to take it next

Once you've personalized the prompts in Module 8, this same shape works for:

- **Earnings call** transcripts → key risks + analyst questions
- **Customer interviews** → JTBD themes + verbatim quotes
- **Lecture notes** → study guide + flashcards
- **1:1 notes** → decisions + your-actions vs their-actions
- **Voice memos** → executive summary + action items

Same skeleton. Different prompts. Different value.

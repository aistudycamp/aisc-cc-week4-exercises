# What You're Building (and What's Next)

## The stock use case: transcripts → insights

For this sprint, every student builds the **same thing**: an agent that turns a meeting transcript into a clean insights report (key themes, action items, recommended next step).

Why one stock use case for everyone? Two reasons:

1. **The arc is the lesson.** Going from a chat assistant → a workflow → an agentic system is the spine of what you'll learn. We want every student feeling the same "aha" at the same moment.
2. **It's genuinely useful.** Transcripts are everywhere — meetings, calls, voice notes. By the end of Stage 3, you'll have a tool that actually saves you time.

After Module 7, you have a clear path to make this yours: same orchestrator code, swap the prompts, point it at your own domain.

## What you'll build, by stage

| Stage | What | How it feels |
|-------|------|--------------|
| **Stage 1** | A chat assistant. Paste a transcript, get insights. | "Oh — that's all an AI app *is*?" |
| **Stage 2** | A workflow. Drop a file, agent runs automatically, output saves. | "I just built an automation in 30 lines." |
| **Stage 3** | An agentic system. Orchestrator + 2 sub-agents working together. | "I built a multi-agent system." |

Each stage is ~45–60 minutes. Total: ~3 hours of focused work.

## What to build next (post-sprint archetypes)

After the sprint, your skills transfer. You can swap the stock use case for any of these archetypes — same pattern, different prompts.

### content-creator
**Drafts content in your voice.** Blog posts, LinkedIn posts, newsletters, emails.

- Stage 1 prompt: "You write in [user's voice]. Given a topic, draft a post."
- Stage 2 trigger: drop a file with a topic + outline
- Stage 3 sub-agents: `researcher` (finds 5 sources) + `editor` (tightens prose)

### personal-os
**Your daily operating system.** Morning briefings, inbox triage, calendar.

- Stage 1 prompt: "You are my morning briefing assistant. Given today's calendar + inbox, prioritize."
- Stage 2 trigger: cron schedule (every morning at 7am)
- Stage 3 sub-agents: `gmail-summarizer` + `calendar-analyzer`

### domain-coach
**Tracks and reflects on a domain you care about.** Cooking, fitness, finance, learning.

- Stage 1 prompt: "You track my [domain] goals. Given today's logs, give feedback."
- Stage 2 trigger: drop a CSV log file
- Stage 3 sub-agents: `pattern-finder` + `goal-evaluator`

### custom
**Whatever you actually need at work.** Internal tooling, contract review, valuation engines, customer support flows.

You already have ideas. The sprint gives you the pattern. Now apply it.

## How to think about extending it

Once you've finished the sprint, here's the mental shortcut for any new agent you want to build:

1. **What's the input?** A file? A user message? A scheduled trigger?
2. **What's the output?** Where does it land? File, Slack, Notion, dashboard?
3. **What sub-agents do you need?** What pieces of the work deserve their own focus?

Three questions. The whole pattern. Everything else is just *more system prompts, arranged thoughtfully*.

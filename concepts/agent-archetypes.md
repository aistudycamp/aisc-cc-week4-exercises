# Agent Archetypes

When you build your first agent, you don't start from a blank page. We've bundled four **archetypes** — starter scaffolds for the most common kinds of agents people actually build. Pick one in Module 2.

## 1. content-creator

**Drafts content in your voice.** Blog posts, LinkedIn posts, newsletters, emails.

**Good if:** you write a lot, want your voice matched, and want drafts faster.

**Ships with:**
- `/draft-post` skill — takes a topic, produces a draft in your style
- `web-search` tool — grounds posts in current events
- `style-reference.md` tool — a file you fill with your own voice
- Space for a `researcher` sub-agent you add in Module 5

**Great for:** ops folks writing team updates, founders writing on LinkedIn, consultants writing client emails.

## 2. personal-os

**Your daily operating system.** Morning briefings, inbox triage, calendar, task prioritization.

**Good if:** you want your day pre-organized for you before you open your laptop.

**Ships with:**
- `/today` skill — morning briefing (calendar + inbox highlights + priorities)
- `gmail` tool — reads your inbox
- `calendar` tool — reads your schedule
- Space for a `gmail-summarizer` sub-agent you add in Module 5

**Great for:** PMs, founders, anyone who wants their attention protected.

## 3. domain-coach

**Tracks and reflects on a domain you care about.** You pick the domain — cooking, fitness, finance, learning.

**Good if:** you want to build awareness over time, log what you do, and get reflective nudges.

**Ships with:**
- `/log-entry` skill — quickly log something in your domain
- `/check-progress` skill — see patterns over time
- `logs.csv` tool — local log file
- Space for an `analyzer` sub-agent you add in Module 5

**Great for:** health-conscious folks (meals, workouts), people building financial awareness, anyone doing a habit experiment.

## 4. custom

**Blank template.** For when you already know what you want and none of the above match.

**Ships with:**
- Minimal `AGENT.md` with placeholder role
- Empty `skills/` and `sub-agents/` folders
- You'll fill it out starting in Module 2

**Great for:** Anthony's contract crawler, William's valuation engine, Dmytro's internal PM tool, Max's solar EMS — anyone with a specific work project.

## How to pick

Don't over-think. You can always start over. But a rough guide:

- **You already know exactly what you want?** → custom
- **You want something useful immediately with minimal customization?** → personal-os or content-creator
- **You want to build a habit-reflection loop?** → domain-coach

When in doubt, start with **personal-os**. Everyone benefits from a better morning.

---
name: today
description: Morning briefing. Trigger on "what's my day", "today", "morning brief", "plan my day", "what should I focus on".
---

# Today

## When to use
- "what's my day?"
- "today"
- "morning brief"
- "plan my day"

## Inputs
- Today's date (system)
- `../../priorities.md` — always read first

## Steps
1. Read `priorities.md` to anchor what matters this week
2. Query `calendar` MCP for today's events (if connected)
3. Query `gmail` MCP for unread from the last 24 hours (if connected)
4. Assemble a scan-friendly briefing:
   - **Top of mind:** 1 line from priorities.md
   - **Calendar:** first 3 events, time + topic
   - **Inbox:** up to 5 highlights worth acting on
   - **Focus:** 1 recommended deep-work block
5. No filler. Straight to the point.

## Output
A briefing under 15 lines. Example shape:

```
Top of mind: <priority>

Calendar:
- 10:00 — <event>
- 14:00 — <event>

Inbox (3 to act on):
- <sender>: <subject>
- <sender>: <subject>
- <sender>: <subject>

Focus: block <time> for <task>.
```

## Notes
- If Gmail/Calendar MCPs aren't connected yet, say so clearly and brief from priorities.md alone.

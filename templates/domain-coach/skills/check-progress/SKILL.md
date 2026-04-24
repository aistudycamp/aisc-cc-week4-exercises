---
name: check-progress
description: Read recent logs and summarize against targets. Trigger on "how am I doing", "check my progress", "am I on track", "this week's numbers".
---

# Check Progress

## When to use
- "how am I doing?"
- "check my progress"
- "am I on track?"
- "this week's numbers"

## Inputs
- `../../logs.csv`
- `../../targets.md`
- Default range: last 7 days (user can override)

## Steps
1. Read targets.md to know what we're measuring against
2. Read logs.csv, filter to the last 7 days
3. Aggregate metrics by target (e.g., avg protein/day, total workouts, etc.)
4. Return a short summary:
   - For each target: avg/total, vs target, on-track or off
   - One observation about the pattern
   - One concrete next step

## Output
Short summary, ~6-10 lines. No moralizing. Data + one actionable next step.

Example:
```
Last 7 days:
- <target 1>: <actual> (target <target>) — <on/off track>
- <target 2>: <actual> (target <target>) — <on/off track>

Pattern: <brief observation>.

Next: <one concrete action>.
```

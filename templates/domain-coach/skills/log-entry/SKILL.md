---
name: log-entry
description: Capture a {{domain}} entry into logs.csv. Trigger on "log my <entry>", "just did X", "track this", "add <entry>".
---

# Log Entry

## When to use
- "log my <entry>"
- "just did X"
- "track this"
- "add <entry>"

## Inputs
- User's description
- Today's date

## Steps
1. Parse the entry from the user's description
2. If relevant metrics are ambiguous, ask once (e.g., "how long was the workout?")
3. Append a row to `../../logs.csv`: date, entry_type, description, metric_1, metric_2, notes
4. Confirm: "logged. today so far: <running totals>."

## Output
One-line confirmation with running daily totals from logs.csv.

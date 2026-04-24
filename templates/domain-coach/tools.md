# Tools for {{agent-name}}

## logs.csv
**Type:** local file
**Status:** template created at `logs.csv` with header row, **ready to use**
**Purpose:** append-only record of every entry in your {{domain}}

**Setup:** none — the `/log-entry` skill appends rows for you.

## targets.md
**Type:** local file
**Status:** template created at `targets.md`, **fill it in**
**Purpose:** your goals for {{domain}}. The agent compares logs against these targets when checking progress.

**Setup:** open `targets.md` and write down your concrete targets. Be specific. "Protein ≥ 140g/day" beats "eat better."

## Optional: a domain-specific MCP
**Type:** MCP
**Status:** optional — only if there's a good one for {{domain}}
**Purpose:** pull richer data beyond your manual logs

Examples (pick if relevant to your {{domain}}):
- Cooking: Nutritionix or Edamam MCP for macros
- Fitness: Strava MCP
- Finance: Plaid-backed MCP for transactions
- Learning: none typical — local is fine

Module 3 will walk you through installing one if you want.

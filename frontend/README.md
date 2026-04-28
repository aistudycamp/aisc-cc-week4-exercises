# Frontend — Agent Visualization

A pre-built single-file HTML viewer for your agentic system. Double-click `index.html` to open it in a browser.

## What it shows

- **Main flow** (top row): `[A transcript] → [The Conductor] → [A report]`
- **Sub-agents** (below): The Summarizer + The Extractor — the orchestrator's helpers, attached with dashed lines
- **Click any node** → right panel switches to inspect mode, showing that node's actual system prompt, what goes in/out, and what it's connected to
- **Run Agent button** → animates the full 9-step flow with particles traveling between nodes, and renders the final report

## What's special

The system prompts shown in the inspect panel **are the real prompts** from `prompts/system.md`, `prompts/summarizer.md`, and `prompts/action_extractor.md`. The diagram is a window into the actual files on your machine — same source of truth as the code.

## Opening it

```bash
open frontend/index.html        # Mac
xdg-open frontend/index.html    # Linux
start frontend/index.html       # Windows
```

Or just double-click the file in your file explorer.

## What this is *not*

- It's not a live debugger — the animation is pre-scripted, not connected to a running orchestrator.
- It's not a deployment surface — your agent runs from the terminal via `npm run stage-3`.
- It's not editable as a "no-code builder" — the source of truth is the JS code and prompt files.

It's a visualization layer on top of the real thing — built to make the architecture *legible*, especially when you're showing your work to someone else.

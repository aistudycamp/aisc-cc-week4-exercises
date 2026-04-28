# Frontend — Agent Visualization

A pre-built single-file HTML viewer for your evolving agent. Double-click `index.html` to open it in a browser.

## What it shows

The frontend has **three stage tabs** at the top — one per stage of the sprint. Each tab shows what your agent looks like at that point:

- **Stage 1 · Chat assistant** — `[A transcript] → [The Analyst] → [A report]`. Three nodes. Manual trigger, terminal output. The bare-minimum agent.
- **Stage 2 · Workflow** — Same three nodes, but the input is now `[File drop]` (the chokidar watcher) and the output is `[Saved file]` (the markdown). Same agent in the middle — only the trigger and destination changed.
- **Stage 3 · Agentic system** — The agent in the middle splits into an orchestrator + 2 sub-agents (Summarizer + Extractor). Five nodes. Four connections. The full multi-agent system.

You can click between the tabs (or press `1`, `2`, `3`) to compare.

## Click any node to inspect it

The right panel switches to inspect mode. You'll see:

- **What this is** — plain English
- **What goes in / out** — simple I/O boxes (no JSON schemas)
- **Its instructions (system prompt)** — the actual prompt text from `prompts/system.md`, `summarizer.md`, or `action_extractor.md`
- **Connects to** — the data flow arrows

The system prompts shown here **are the real prompts** — same source of truth as the JS code.

## Run the animation

Hit **Run Agent** (or `⌘R`) to play that stage's animation. Each stage has its own:

- Stage 1: 6-step animation showing input → analyst → output
- Stage 2: 6-step animation showing trigger → analyst → saved file
- Stage 3: 16-step animation showing the full multi-agent dispatch

## What this is *not*

- It's not a live debugger — animations are pre-scripted, not connected to a running orchestrator.
- It's not a deployment surface — your agent runs from the terminal via `npm run stage-N`.
- It's not editable as a "no-code builder" — the source of truth is the JS code and prompt files.

It's a visualization layer on top of the real thing — built to make the architecture *legible* as you build it, especially when comparing what changed between stages.

## Opening it

```bash
open frontend/index.html        # Mac
xdg-open frontend/index.html    # Linux
start frontend/index.html       # Windows
```

Or just double-click the file in your file explorer.

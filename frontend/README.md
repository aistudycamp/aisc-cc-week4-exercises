# Frontend - Agent Visualization

A pre-built single-file HTML viewer for your evolving agent. It is served by your project's server: run `npm run server` inside `student-output/`, then open `http://localhost:3000`.

## What it shows

The frontend has **three stage tabs** at the top, one per stage of the sprint. Each tab shows what your system looks like at that point:

- **Stage 1 · Chat assistant** - a transcript, the analyst, an answer. The bare-minimum shape: you ask, it answers.
- **Stage 2 · Workflow** - a button click triggers a deterministic pipeline: the AI classifies the meeting type, the file routes to the right folder, a notification fires.
- **Stage 3 · Agentic system** - the full multi-specialist system: the Conductor plans which specialists to run, Analyst and Extractor run in parallel, the Synthesizer combines their output, the Router (Stage 2, reused) files the report, and Reflect writes the after-action summary.

You can click between the tabs (or press `1`, `2`, `3`) to compare.

## Click any node to inspect it

The right panel switches to inspect mode. You'll see:

- **What this is** - plain English
- **What goes in / out** - simple I/O boxes (no JSON schemas)
- **Its instructions (system prompt)** - the actual prompt text from `prompts/` (`system.md`, `analyst.md`, `extractor.md`, `synthesizer.md`, `conductor.md`, `classifier.md`, `reflect.md`)

The system prompts shown here **are the real prompts** - same source of truth as the JS code.

## Run it

Each tab has its own live action button: **Send →** on Chat, **Run Workflow →** on Workflow, **Run Orchestrator →** on Agentic System. Click it and watch the animation play out as the real API calls actually happen. **⌘K** clears the current run.

## What this is *not*

- It's not a deployment surface - your system runs through `server.js` (`npm run server`), with optional terminal scripts (`npm run stage-1/2/3`) if you prefer the CLI.
- It's not editable as a "no-code builder" - the source of truth is the JS code and prompt files.

It's a visualization layer on top of the real thing - built to make the architecture *legible* as you build it, especially when comparing what changed between stages.

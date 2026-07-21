# Transcripts → Insights

The stock use case for the Week 4 sprint. By the end of Stage 3, this folder contains a working agentic system that turns a meeting transcript into a structured insights report.

## Layout

```
transcripts-to-insights/
├── prompts/
│   ├── system.md                 ← core meeting-analyst instructions (Stage 1 chat assistant)
│   ├── system-original.md        ← untouched backup, for restoring after Module 3 edits
│   ├── classifier.md             ← meeting-type classifier (Stage 2 workflow)
│   ├── analyst.md                ← Stage 3 specialist: key themes and decisions
│   ├── extractor.md              ← Stage 3 specialist: action items as JSON
│   ├── synthesizer.md            ← Stage 3 specialist: combines analyst + extractor into the report
│   ├── conductor.md              ← Stage 3 planning step: decides which specialists run
│   └── reflect.md                ← Stage 3 after-action report
├── transcripts/
│   └── sample-transcript.txt     ← throw a real one in here
├── outputs/                      ← empty by default; the optional stage-2/extensions/ logger writes here
├── stage-1/chat.js               ← Stage 1: chat assistant (exports ask())
├── stage-2/workflow.js           ← Stage 2: classify + route + notify pipeline (exports runWorkflow())
├── stage-3/orchestrator.js       ← Stage 3: multi-specialist orchestrator
├── server.js                     ← Express server behind the browser UI
├── package.json
└── .env.example
```

## Setup (one time)

```bash
npm install
cp .env.example .env
# then open .env and paste your Anthropic API key
```

## Run it

```bash
npm run server    # then open http://localhost:3000
```

The browser UI is how the modules drive every stage: chat with the assistant (Stage 1), trigger the workflow with a button (Stage 2), and run the full multi-specialist system (Stage 3).

Optional terminal path, if you prefer the CLI:

```bash
npm run stage-1     # chat assistant in the terminal
npm run stage-2     # workflow, waiting on incoming transcripts
npm run drop-test   # (second terminal) feed the workflow a test transcript
npm run stage-3     # agentic system end to end
```

## What you'll see

- **Stage 1**: a chat assistant that answers questions about the sample transcript.
- **Stage 2**: one click runs the workflow: the AI classifies the meeting type, the file routes to the right folder, a notification fires.
- **Stage 3**: the Conductor decides which specialists to run, Analyst and Extractor run in parallel, the Synthesizer combines their output into the final report, the Router (Stage 2, reused) files it, and Reflect writes an after-action report.

Open the browser UI to *see* the agentic system as a visual flow while it runs.

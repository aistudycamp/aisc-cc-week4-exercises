# Transcripts → Insights

The stock use case for the Agent Sprint. By the end of Stage 3, this folder contains a working agentic system that turns a meeting transcript into a structured insights report.

## Layout

```
transcripts-to-insights/
├── prompts/
│   ├── system.md                 ← orchestrator's system prompt
│   ├── summarizer.md             ← summarizer sub-agent's prompt
│   └── action_extractor.md       ← extractor sub-agent's prompt
├── transcripts/
│   └── sample-transcript.txt     ← throw a real one in here
├── outputs/                      ← reports land here (Stage 2+)
├── stage-1/chat.js               ← Stage 1: chat assistant
├── stage-2/watcher.js            ← Stage 2: folder-watch automation
├── stage-3/orchestrator.js       ← Stage 3: multi-agent orchestrator
├── package.json
└── .env.example
```

## Setup (one time)

```bash
npm install
cp .env.example .env
# then open .env and paste your Anthropic API key
```

## Run each stage

```bash
npm run stage-1   # Chat assistant — runs once on sample-transcript.txt
npm run stage-2   # Workflow — watches transcripts/, runs on every new file
npm run stage-3   # Agentic system — orchestrator + 2 sub-agents
```

## What you'll see

- **Stage 1**: a single-shot insights report printed to your terminal.
- **Stage 2**: drop a `.txt` file into `transcripts/` while the watcher is running — it processes it automatically and saves to `outputs/`.
- **Stage 3**: the orchestrator dispatches two sub-agents (Summarizer + Extractor) in parallel, then synthesizes their JSON outputs into the final report.

Open `frontend/index.html` in your browser to *see* the agentic system as a visual flow.

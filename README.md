# AI Study Camp — Agent Sprint

This is **Week 4** of the Vibe Coding course — the week you build a real, working multi-agent system from scratch. By the end, you'll understand how every AI product on Earth is actually built.

## The 3-stage arc

You'll build the same use case three times, each level harder than the last:

| Stage | What you build | Time | New idea |
|-------|---------------|------|----------|
| **Stage 1** | A chat assistant that turns a transcript into insights | ~1 hr | The API. The system prompt. |
| **Stage 2** | An automation: drop a file, agent runs, report saves | ~45 min | Triggers + destinations. |
| **Stage 3** | An agentic system: orchestrator + 2 sub-agents | ~1 hr | Multi-agent dispatch + synthesis. |

**Total: ~3 hours** of guided work, plus an optional Module 8 where you personalize the agent for your own use case.

## Prerequisites

- **Node.js v20+** ([download here](https://nodejs.org/)) — `node --version` should print `v20.x.x` or higher
- An **Anthropic API key** ([get one here](https://console.anthropic.com)) — set a $5 spending cap on the billing page
- Basic comfort with the terminal (`cd`, `ls`, running commands)
- **Claude Code** installed ([install guide](https://docs.anthropic.com/en/docs/claude-code/overview)) — Claude is your coach for the whole sprint

You don't need to be a JavaScript expert. The code is short, plain, and heavily commented.

## Getting started

```bash
git clone https://github.com/aistudycamp/aisc-cc-week4-exercises.git
cd aisc-cc-week4-exercises
claude
```

Just say hi. Claude will greet you and guide you from there. No need to memorize anything — the next move is always the next module command.

## What you'll build

| Command | Module | Topic | Time |
|---------|--------|-------|------|
| `stage-1-intro` | — | Set up Node, get an API key, scaffold project | ~10 min |
| `module-1` | 1 | Tour the System (mental model, no code) | ~15 min |
| `module-2` | 2 | Your First API Call (the demystify moment) | ~20 min |
| `module-3` | 3 | Chat Assistant + System Prompt | ~20 min |
| `module-4` | 4 | Automate the Trigger (folder watcher) | ~20 min |
| `module-5` | 5 | Output Destinations | ~25 min |
| `module-6` | 6 | The Orchestrator Pattern (multi-agent) | ~30 min |
| `module-7` | 7 | See the System (frontend visualization) | ~20 min |
| `module-8` | 8 | Make It Yours (personalize for your work) | ~25 min |

## Pausing and resuming

Each module ends with a git commit. **Natural stopping points are between modules.** If you need a break, finish the current module first.

When you come back, run `claude` in this folder again — Claude reads the progress checklist and picks up where you left off.

**Pro tip:** `claude --resume` restores your exact previous conversation, so you don't have to re-explain anything.

## What you walk away with

- A working multi-agent system you can keep using on your own meeting transcripts (or whatever document you point it at)
- A personalized version configured for *your* use case (Module 8)
- A pre-built visual frontend that shows the system architecture, with the actual system prompts visible inline
- Real understanding — not "I copied a tutorial," but "I know what every line does and could rebuild it from scratch"
- The skeleton pattern for any future agent: **input → orchestrator → specialists → synthesis → output**

## Repository layout

```
aisc-cc-agent-sprint/
├── README.md                      ← you are here
├── CLAUDE.md                      ← Claude's coaching instructions
├── concepts/                      ← read-anytime conceptual docs
│   ├── what-is-an-api.md
│   ├── what-is-a-system-prompt.md
│   ├── what-is-an-agent.md
│   ├── what-is-an-orchestrator.md
│   ├── systems-thinking.md
│   └── agent-archetypes.md
├── examples/                      ← worked example for reference
│   └── example-transcripts-insights.md
├── templates/                     ← starter scaffold (Module 0 copies this)
│   └── transcripts-to-insights/
│       ├── prompts/               ← 3 system prompts
│       ├── transcripts/           ← input goes here
│       ├── stage-1/chat.js        ← Stage 1 code
│       ├── stage-2/watcher.js     ← Stage 2 code
│       └── stage-3/orchestrator.js ← Stage 3 code
├── frontend/
│   └── index.html                 ← the visual viewer
└── student-output/                ← your working folder (created in stage-1-intro)
```

## Need help?

- During a module, just ask Claude. That's what it's here for.
- If something's broken: paste the error into Claude and let it diagnose.
- If you're stuck on the bigger picture: open `concepts/what-is-an-agent.md` or `concepts/what-is-an-orchestrator.md` for a refresher.

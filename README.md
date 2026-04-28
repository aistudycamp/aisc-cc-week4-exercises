# AI Study Camp — Agent Sprint

This is **Week 4** of the Vibe Coding course — the week you build a real, working multi-agent system from scratch. By the end, you'll understand how every AI product on Earth is actually built.

## The 3-stage arc

Each stage is a genuinely different type of system — and each one **uses the previous as a building block**:

| Stage | What you build | Time | Key trait |
|-------|---------------|------|-----------|
| **Stage 1** | A **chat assistant** — interactive multi-turn conversation | ~1 hr | You ask, it answers. Exports `ask()` for reuse. |
| **Stage 2** | A **workflow** — fixed pipeline triggered by a file drop | ~45 min | Event-driven. Imports `ask()` from Stage 1 as one pipeline step. |
| **Stage 3** | An **agentic system** — planner + dynamic tool dispatch | ~1 hr | Decides what to run. Imports both Stage 1 and Stage 2 as tools. |

```
Agentic System (Stage 3)
└── uses → Workflow (Stage 2)
             └── uses → Chat Assistant (Stage 1)
```

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
| `module-3` | 3 | Build the Chat Assistant (interactive loop + system prompt) | ~25 min |
| `module-4` | 4 | Build the Workflow (pipeline using Stage 1 as a building block) | ~25 min |
| `module-5` | 5 | Extend the Workflow (add more pipeline steps) | ~20 min |
| `module-6` | 6 | The Agentic System (planner + dynamic dispatch over Stages 1+2) | ~30 min |
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
│   ├── what-is-an-agent.md          ← includes the 3-level hierarchy
│   ├── what-is-a-workflow.md        ← new: explains workflow vs. chat assistant
│   ├── what-is-an-orchestrator.md   ← includes planner + tool-picking
│   ├── systems-thinking.md
│   └── agent-archetypes.md
├── examples/                      ← worked example for reference
│   └── example-transcripts-insights.md
├── templates/                     ← starter scaffold (Module 0 copies this)
│   └── transcripts-to-insights/
│       ├── prompts/               ← 4 system prompts (system, summarizer, extractor, router)
│       ├── transcripts/           ← input goes here
│       ├── stage-1/chat.js        ← Chat assistant — exports ask() for reuse
│       ├── stage-2/workflow.js    ← Workflow pipeline — imports ask() from Stage 1
│       └── stage-3/orchestrator.js ← Agentic system — imports from both Stages 1+2
├── frontend/
│   └── index.html                 ← the visual viewer
└── student-output/                ← your working folder (created in stage-1-intro)
```

## Need help?

- During a module, just ask Claude. That's what it's here for.
- If something's broken: paste the error into Claude and let it diagnose.
- If you're stuck on the bigger picture: open `concepts/what-is-an-agent.md` or `concepts/what-is-an-orchestrator.md` for a refresher.

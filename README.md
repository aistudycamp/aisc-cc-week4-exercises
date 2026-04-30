# AI Study Camp — Agent Sprint

Welcome to Week 4 of the Vibe Coding course! This week you'll build a real, working multi-agent system from scratch — the same architecture behind every serious AI product. By the end, you'll know exactly how it works because you'll have built every piece of it yourself.

## Prerequisites

- **Claude Code** installed on your computer ([install guide](https://docs.anthropic.com/en/docs/claude-code/overview))
- **Node.js v20+** installed ([download here](https://nodejs.org/)) — run `node --version` to check
- An **Anthropic API key** ([get one here](https://console.anthropic.com)) — set a $5 spending cap on the billing page
- Basic comfort with opening a terminal

You don't need to know JavaScript. Claude writes the code — you describe what you want.

## Getting Started

1. **Clone this repo**
   ```
   git clone https://github.com/aistudycamp/aisc-cc-week4-exercises.git
   ```

2. **Open the folder in your terminal**
   ```
   cd aisc-cc-week4-exercises
   ```

3. **Start Claude Code**
   ```
   claude
   ```

4. **Say hello!**
   Claude will greet you and guide you from there. No need to memorize anything — the next move is always the next module command.

## The 3-Stage Arc

Each stage is a different type of AI system — and each one uses the previous as a building block:

| Stage | What you build | Key idea |
|-------|---------------|----------|
| **Stage 1** | A **chat assistant** — interactive, back-and-forth conversation | You ask, it answers |
| **Stage 2** | A **workflow** — automated pipeline triggered by a file drop | Runs without you |
| **Stage 3** | An **agentic system** — orchestrator that coordinates multiple specialists | Decides what to run |

By the end of Stage 3, you'll have built every box in the diagram — and you'll import each one into the next.

## Pausing and Resuming

Each module ends with a git commit that saves your progress — the checklist in `CLAUDE.md` tracks which modules you've completed. **Natural stopping points are between modules**, so if you need a break, try to wrap up the current module first.

If you need to stop mid-module, just close your terminal. When you come back, run `claude` in this folder again — it will read your checklist and guide you to pick up where you left off.

**Pro tip:** `claude --resume` restores your exact previous conversation so you don't have to re-explain anything.

## What You'll Learn

| Module | Topic | Time | You'll Produce |
|--------|-------|------|----------------|
| `stage-1-intro` | Setup — Node, API key, scaffold your project | ~10 min | A working project folder with your API key wired in |
| `module-1` | Tour the System — the mental model before any code | ~15 min | *(no artifact — a clear picture of what you're building)* |
| `module-2` | Your First API Call — demystify what the API actually is | ~20 min | A successful API call that prints Claude's response |
| `module-3` | Build the Chat Assistant — interactive loop and system prompt | ~25 min | A working chat assistant you can have a conversation with |
| `module-4` | Build the Workflow — pipeline that runs automatically on a file drop | ~25 min | A workflow that classifies and routes transcripts without you |
| `module-5` | Extend the Workflow — add a new step by describing what you want | ~20 min | A workflow with one more output step you added without writing code |
| `module-6` | The Agentic System — orchestrator that coordinates three specialists | ~30 min | A working multi-agent system: Summarizer + Extractor + Router |
| `module-7` | See the System — visual frontend showing the full architecture | ~20 min | A screenshot of your running system's architecture |
| `module-8` | Make It Yours — point the system at a real use case from your life | ~25 min | A personalized version running on a real document you brought |

**Total: ~3 hours.** Most students spread it across 2–3 sessions.

## What You'll Walk Away With

By the end, you will have:

- A working multi-agent system you can keep running on your own meeting transcripts — or any long document you point it at
- A personalized version configured for your specific use case (Module 8)
- A visual frontend showing the system architecture, with each component inspectable
- Real understanding of the pattern behind every serious AI product: **input → orchestrator → specialists → synthesis → output**
- The skill to build the next one in a fraction of the time

## Need Help?

If you get stuck at any point, just ask Claude. That's what it's here for.

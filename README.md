# AI Study Camp — Agent Sprint

Welcome to AI Study Camp's **Agent Sprint**! This is Week 4 of the Vibe Coding course — the week you build a real, working agent in Claude Code. You'll come out of this with something you actually use.

By the end, you'll understand how agents are actually architected — orchestrators, tools, skills, sub-agents — and you'll have built one for yourself.

## Prerequisites

- You've completed (or roughly understand) the [Week 3 modules](https://github.com/aistudycamp/aisc-cc-modules) — CLAUDE.md, skills, plugins, MCPs, sub-agents
- **Claude Code** installed ([install guide](https://docs.anthropic.com/en/docs/claude-code/overview))
- Basic comfort with opening a terminal
- An idea (even a rough one) of what kind of agent might help you — don't worry, we'll help you pick

## Getting Started

1. **Clone this repo**
   ```
   git clone https://github.com/aistudycamp/aisc-cc-agent-sprint.git
   ```

2. **Open the folder in your terminal**
   ```
   cd aisc-cc-agent-sprint
   ```

3. **Start Claude Code**
   ```
   claude
   ```

4. **Say hello!**
   Claude will greet you and guide you from there. No need to memorize anything — just follow along.

## Pausing and Resuming

Each module ends with a git commit that saves your progress — the checklist in `CLAUDE.md` tracks which modules you've completed. **Natural stopping points are between modules**, so if you need a break, try to wrap up the current module first.

If you need to stop mid-module, just close your terminal. When you come back, start Claude Code again with `claude` — it will see your checklist and guide you to pick up where you left off.

**Pro tip:** If you want to resume the exact conversation you were in, run `claude --resume` instead of `claude`. This restores your previous session so you don't have to re-explain anything.

## What You'll Build

| Module | Topic | Time | You'll Produce |
|--------|-------|------|----------------|
| 1 | Tour the System (Systems Thinking) | ~15 min | A mental model for how agents compose — you'll read the repo with Claude as your guide |
| 2 | Create Your Agent | ~20 min | A scaffolded agent folder at `student-output/<your-agent>/` based on an archetype you pick |
| 3 | Wire Your Tools | ~30 min | One real MCP or tool connected to your agent |
| 4 | Add a Skill | ~30 min | A working `SKILL.md` inside your agent that does something real |
| 5 | Add a Sub-Agent | ~30 min | A custom sub-agent your orchestrator delegates to |
| 6 | Make It Yours + Visualize | ~20 min | An HTML diagram of your agent's architecture — shareable, bring-it-home moment |
| 7 | *Capstone:* Slack Face | *optional* | A Slack app wrapper so your agent lives where your team already is |

**Total course time: ~2.5 hours** (capstone adds more). Most students spread this across 2 sessions.

## What You'll Walk Away With

By the end, you will have:
- A working agent you can invoke from Claude Code
- A visual diagram of how it's wired together
- Real understanding of *why* agents are shaped the way they are
- The foundation to build more agents for other parts of your life or work

## Need Help?

If you get stuck at any point, just ask Claude! That's what it's here for.

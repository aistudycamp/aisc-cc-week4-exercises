# Student Test Feedback — Agent Sprint
**Tester:** Ben (as student)
**Date:** 2026-04-29
**Session:** First full run-through from scratch

---

## Feedback Log

| # | Where | Issue | Fix Direction | Priority |
|---|-------|-------|---------------|----------|
| 1 | CLAUDE.md — coach identity / greeting behavior | Typing "hello" returns generic "How can I help you today?" — student has no idea what to say next. Course should self-start on any opener (hello, hi, hey, anything). | Add a catch-all trigger in CLAUDE.md coach identity: any greeting/ambiguous message should respond with the course welcome and prompt to type `stage-1-intro`. | High |
| 3 | stage-1-intro — `.env.example` not copied to student-output | `cp -R templates/transcripts-to-insights student-output/` skips dotfiles on macOS, so `.env.example` and `.gitignore` don't land in the student folder. Student runs `cp .env.example .env` and gets "Folder not found." | Fix the scaffold command in stage-1-intro SKILL.md to use `cp -R templates/transcripts-to-insights/. student-output/` (trailing `/. `) which forces dotfiles to be included. Or add a second explicit copy: `cp templates/transcripts-to-insights/.env.example student-output/.env.example`. | High |
| 2 | stage-1-intro — API key setup step | AISC students already have CC running but the key is in the macOS Keychain — not a shell env var, not `~/.anthropic/api_key`. The module gives no guidance on where to find it. `echo $ANTHROPIC_API_KEY` returns empty. `cat ~/.anthropic/api_key` returns "no such file." Students are completely stuck. | Change the instruction to: "Go to console.anthropic.com → API Keys → copy your key. Then paste it into `.env`." That path works for everyone regardless of how CC stored the key. | High |

| 4 | stage-1-intro — "open in a text editor" instruction | Telling students to open `.env` in a text editor is the wrong path. Many students won't know which editor, how to show hidden files, etc. Should be a single terminal command that creates the file with the key already in it. | Replace the text-editor step with: `echo "ANTHROPIC_API_KEY=your-key-here" > .env` and tell them where to get the key (console.anthropic.com). | High |
| 5 | stage-1-intro — no error recovery if any setup step fails | If any step fails (missing file, wrong directory, empty key), the student is completely stuck. The module has no troubleshooting guidance and the coach (CLAUDE.md) has no setup failure diagnostics. | Add a "When setup goes wrong" section to CLAUDE.md with the 3-4 most common setup failures: missing .env, empty API key, wrong directory, npm install errors. | High |
| 7 | stage-1-intro / module-2 — concept doc "open this file" gives no method | "Open `concepts/what-is-an-api.md`" assumes students know how to open a file. No command given, no method explained. Students using the terminal have no obvious path. | Short-term: add `cat concepts/what-is-an-api.md` or `open concepts/what-is-an-api.md` as the command. Long-term: brainstorm better reading experience — inline summary in the coach response, or a visual/web render. Students won't read a file they don't know how to open. | Medium |
| 6 | CLAUDE.md — no course-wide troubleshooting guide | Students hitting issues mid-course have no reference, and the coach has no pre-loaded knowledge of common failure modes per module. | Add a `## Troubleshooting Guide` section to CLAUDE.md with known failure modes for each stage: setup, stage-1, stage-2, stage-3. Coach already knows what should be happening at each step and can use this to diagnose quickly without the student having to explain everything. | Medium |

---

| 10 | module-1 — "parallel work" framing overstates and misleads | The module teaches "Summarizer and Extractor run in parallel — that's why we split them." But parallel execution is one option, not a core principle. Many agentic systems are sequential (research → synthesize → write). Framing parallel as the *reason* to split will confuse students when they see sequential patterns later. | Reframe: the reason to split agents is **focus** (one job, one system prompt). Parallel vs. sequential is a *dispatch strategy* the orchestrator chooses. Mention both: "Sometimes they run in parallel. Sometimes the output of one feeds the next. The orchestrator decides." | Medium |
| 11 | module-1 — ASCII diagrams are hard to read in terminal | The stage comparison diagram (Stage 1 → Stage 2 → Stage 3) renders as fixed-width ASCII in the terminal. It's functional but not easy to absorb at a glance, especially for students who aren't used to reading terminal output. | Design question: can the frontend visualization replace or supplement these inline diagrams? Or render them as a separate HTML/image file that `open` launches? Log for the visual design brainstorm. | Low — design question |
| 9 | examples/example-transcripts-insights.md — wrong format, wrong content | Students open this as their "north star" of what they're building toward. It shows raw Markdown with code blocks, architecture diagrams, and orchestrator function snippets. Students see it and think "what the hell am I looking at?" It needs to show the *output* a student would actually want — a clean, readable insights report. If it doesn't look valuable and human-readable on first glance, the motivation to build it collapses. | Replace the example file with a clean, rendered-looking report: real themes, real action items, real executive summary — the kind of thing you'd actually send to a team after a meeting. No code, no diagrams, no Markdown syntax visible. The example should make students think "I want that." | High — design change |
| 8 | Core architecture — sub-agents don't reinforce the building-block arc | The orchestrator dispatches to a Summarizer and an Extractor — two simple LLM calls. But the whole course arc is "you built a chat assistant (Stage 1) and a workflow (Stage 2), now the orchestrator uses both." The current sub-agents don't include Stage 1 or Stage 2 as actual tools. Students build those things and then the orchestrator calls something completely different. The building-block payoff is missing. | Redesign what the orchestrator actually dispatches to: one path should be the Stage 1 `ask()` chat assistant, another should be the Stage 2 `runWorkflow()` pipeline. The summarizer/extractor can stay as additional specialists, but the *primary* dispatch options should be the things the student built. This is what makes the "I imported everything I built" moment land. | High — design change |

## Design Questions (brainstorm later)

- **Concept doc reading experience:** "Open this file" is dead on arrival for terminal-first students. Options to explore: (1) coach renders the key points inline in the chat, (2) `open` command launches it in the default app, (3) replace concept docs with a visual or short video, (4) concept doc content gets woven into the module steps rather than siloed as separate files.

---

## Notes

- Processing: will review all items and apply fixes in one pass after full run-through

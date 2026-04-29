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

## Design Questions (brainstorm later)

- **Concept doc reading experience:** "Open this file" is dead on arrival for terminal-first students. Options to explore: (1) coach renders the key points inline in the chat, (2) `open` command launches it in the default app, (3) replace concept docs with a visual or short video, (4) concept doc content gets woven into the module steps rather than siloed as separate files.

---

## Notes

- Processing: will review all items and apply fixes in one pass after full run-through

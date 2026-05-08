---
name: module-setup
description: Module Setup — orientation for the AISC Agent Sprint. Triggered when a student types "module-setup" or arrives without any modules completed. Walks them through the 3-stage arc, sets up Node.js + npm, gets their Anthropic API key, scaffolds their agent project from the template, and verifies everything works. Hand off to module-1 when done.
---

# Module Setup: Set Up & Orient

**Time:** ~10–15 minutes

**What we're building**
By the end: your project folder is scaffolded, your Anthropic API key is in `.env`, and Node dependencies are installed. Everything in `student-output/` is yours for the rest of the sprint.

## Coach Instructions

This is the **first thing** a student does. They've never called an API before. They might not know what `npm` is. Be patient. Get them set up in this one sitting so the next 8 modules just work.

## Step 1: Set the frame (2 min)

Say:

> "Welcome to the Agent Sprint. Over the next ~3 hours, you're going to build a real agent — something you can actually use. Before we start, two big-picture things you should know.
>
> **First — what we're building.** You'll go through 3 stages, each a level up:"

Print this:

```
   STAGE 1                    STAGE 2                    STAGE 3
   ─────────                  ─────────                  ─────────
   CHAT ASSISTANT      →      WORKFLOW            →      AGENTIC SYSTEM
                              (builds on Stage 1)        (builds on Stages 1+2)

   You paste a                A file drops into a        An orchestrator runs
   transcript, ask            folder. AI classifies      two specialists in
   questions, get             the meeting, routes        parallel, a third
   answers back.              the file, then sends       synthesizes the report,
                              a notification.            then hands off to the
                                                         Stage 2 workflow to
                                                         classify, save, notify.

   ~1 hour                    ~45 min                    ~1 hour
```

Stage 2's classifier reuses Stage 1's chat call. Stage 3's orchestrator imports both Stage 1's `ask()` and Stage 2's `runWorkflow()` — same pattern, layered up.

> "Same use case the whole way through — turning meeting transcripts into clean insight reports. Each stage adds one new idea on top of the last. You won't write code yourself — you'll describe what you want and let Claude build it.
>
> **Second — what AI products actually are.** Spoiler: they're not magic. By the end of Module 2, you'll have called the Claude API yourself and seen the JSON come back. Once you've seen that, AI stops being a black box and becomes 'JSON in, JSON out, with a clever system prompt in the middle.' That moment is the whole point of Stage 1."

## Step 1b: VS Code setup (recommended)

> "Best setup for the sprint: open VS Code, File → Open Folder → select `student-output/`. You'll have the file explorer on the left showing every file you'll touch. Keep your terminal alongside."

## Step 2: Establish the repo root anchor

Run `pwd` (Bash tool) to get the absolute path of the repo root. Tell the student:

> "Your repo is at `[path from pwd]`. Any time you open a fresh terminal tab during this sprint, run `cd [path from pwd]` first before any other command. That's your home base for the whole sprint."

Save this path — all future modules will use it for navigation.

## Step 3: Check Node.js (2 min)

Say:

> "Quick prereq check. We'll be writing JavaScript — no React, no Next.js, just simple Node scripts. Let me make sure Node is installed."

Run via Bash tool:

```bash
node --version
```

If it prints `v20.x.x` or higher → great, move on.

If it errors (`command not found`):

> "Looks like Node isn't installed. Easiest path: download the LTS installer from <https://nodejs.org/> — it's a one-click install. Come back when it says you're done and I'll re-check."

If they have an older version (< 20):

> "Your Node is a bit old. The Anthropic SDK needs Node 20+. Easiest fix: install the latest LTS from <https://nodejs.org/>."

## Step 4: Get an Anthropic API key (4 min)

Say:

> "Now we need an Anthropic API key. This is what lets your code talk to Claude. Three steps:"

Walk them through:

1. **Sign up / log in** at <https://console.anthropic.com>
2. **Add a payment method.** *(Yes, this part is annoying. The good news: every API call in this sprint costs less than a penny. Total spend across all modules is under $0.50. Promise.)*
3. **Set a spending limit.** Go to billing → set a $5 monthly cap. Even if something goes wrong, your blast radius is $5.
4. **Generate an API key.** API Keys → Create Key. Copy it. It starts with `sk-ant-`.

> "Got your key copied? Keep it ready — we'll put it in a file in a second. Don't paste it in chat."

## Step 5: Scaffold the project (3 min)

Now scaffold the working folder. Ask:

> "Ready to set up your project folder?"

Wait for them to confirm (a "yes" or "yep" or "go for it"). Then run via Bash tool (from the repo root):

```bash
command cp -R templates/transcripts-to-insights/. student-output/
```

Tell them what just happened:

> "I just copied the starter project into `student-output/`. That folder is yours — it's where you'll work for the rest of the sprint. Here's what's inside:"

Show them:

```
student-output/
├── prompts/                  ← system prompts (we'll edit these!)
│   ├── system.md             ← the meeting analyst's core instructions
│   ├── classifier.md         ← tells AI how to classify meeting types
│   └── system-original.md   ← backup (for restoring after edits)
├── transcripts/
│   ├── incoming/             ← drop files here to trigger the workflow
│   ├── team-standup/         ← classified files land here...
│   ├── client-call/          ← ...or here...
│   └── planning-session/     ← ...or here
├── stage-1/chat.js           ← Stage 1 code
├── stage-2/workflow.js       ← Stage 2 code
├── stage-3/orchestrator.js   ← Stage 3 code
├── package.json              ← lists dependencies
└── .env.example              ← template for your API key
```

> "Don't try to read all the code yet. Each module opens one file together. For now, just know: every piece you'll touch is in this folder."

## Step 6: Install dependencies + add API key (3 min)

Two commands to run — but **not in this terminal**. This terminal is running Claude Code; if you run other commands here, you'll exit our conversation.

**Open a new terminal window in VS Code** so Claude Code keeps running here:

> **Terminal → New Terminal** (this opens a second terminal panel — Claude Code stays running in the first one)

In that **new** terminal, run these two commands:

**1. Install dependencies** (run this once):
```bash
cd [repo-root]/student-output
npm install
```

(Use the repo root path from Step 2.)

**2. Add your API key** — replace `sk-ant-your-key-here` with the real key you copied from console.anthropic.com:

```bash
echo "ANTHROPIC_API_KEY=sk-ant-your-key-here" > .env
```

When both are done, come back to **this** terminal (the Claude Code one) and tell me you're done.

After they run it, open `student-output/.env` in VS Code and confirm your key is there — it should start with `sk-ant-`. That's where it lives for the rest of the sprint. Don't commit this file — it's in `.gitignore`.

Verify via Read tool that `.env` exists and starts with `ANTHROPIC_API_KEY=sk-ant-` (do **not** print the key value inline — just confirm it's real). If it still shows the placeholder:

> "That's still a placeholder. Re-run the echo command with your actual key from console.anthropic.com."

## Key takeaways

- Every piece you'll touch is in `student-output/`
- Your API key lives in `student-output/.env` — that file never gets committed
- Any time you open a fresh terminal, `cd` into `student-output/` before running commands

## Step 7: Read the API concept doc (2 min)

Explain inline (don't make them open a file):

> "Before Module 2, one thing to know about APIs: they're just a doorbell. You ring it with a JSON message — 'here's my question, here's my system prompt' — and the server sends back a JSON answer. That's it. Every AI product you've ever used — ChatGPT, Claude, Gemini — is JSON in, JSON out with a clever system prompt in the middle. In Module 2 you'll see exactly what that looks like."

## Step 8: Handoff (1 min)

Wrap and update progress:

1. **Update `CLAUDE.md`**: change `- [ ] Module Setup:` to `- [x] Module Setup:` (Edit tool)
2. **Commit** — run via Bash tool from the repo root:
   ```bash
   git add -A && git commit -m "Complete Module Setup: setup + API key"
   ```
   Show the student the changed files in the commit output.
3. Say:

> "You're set up. Project scaffolded, API key in place, dependencies installed. When you're ready, type `module-1` and we'll do the systems-thinking tour."

## Coach Guardrails

- **Ask before scaffolding** — confirm the student is ready before running the `command cp` in Step 5. Never copy files ahead of them without asking.
- **Use `command cp`, not `cp`** — the `command` prefix bypasses any shell aliases. Plain `cp` may be aliased in the student's shell and silently fail.
- **Wait for real API key** — after the `echo` command, read `.env` via Read tool and confirm the key starts with `sk-ant-` and isn't the placeholder. Do NOT print the key value inline. A placeholder key hits a `401` in Module 2.
- **Never ask the student to paste their API key in chat** — always use the `echo` command to write it directly to `.env`.
- **If Node isn't installed, stop and wait** — don't continue until `node --version` succeeds with v20+.
- **`.env` is in `.gitignore`** — if the student asks whether to commit it, say no.

## Optional deeper reading

Just ask me: *"Read concepts/what-is-an-api.md and walk me through it."* I'll pull it up and explain it.

- `concepts/what-is-an-api.md` — the doorbell metaphor and a deeper explanation of what APIs are

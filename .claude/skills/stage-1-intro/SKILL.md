---
name: stage-1-intro
description: Stage 1 Intro — orientation for the AISC Agent Sprint. Triggered when a student types "stage-1-intro" or arrives without any modules completed. Walks them through the 3-stage arc, sets up Node.js + npm, gets their Anthropic API key, scaffolds their agent project from the template, and verifies everything works. Hand off to module-1 when done.
---

# Stage 1 Intro: Set Up & Orient

**Time:** ~10–15 minutes
**You'll produce:** a working project folder, an Anthropic API key in `.env`, dependencies installed, and a clear picture of the 3-stage arc.

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

   You paste a                You drop a file,           An orchestrator
   transcript, get            agent runs                 dispatches 2
   insights back.             automatically,             sub-agents in
                              output saves to            parallel, then
                              a folder.                  synthesizes.

   ~1 hour                    ~45 min                    ~1 hour
```

> "Same use case the whole way through — turning meeting transcripts into clean insight reports. The arc is the lesson. Each stage adds one new idea on top of the last.
>
> **Second — what AI products actually are.** Spoiler: they're not magic. By the end of Module 2, you'll have called the Claude API yourself and seen the JSON come back. Once you've seen that, AI stops being a black box and becomes 'JSON in, JSON out, with a clever system prompt in the middle.' That moment is the whole point of Stage 1."

## Step 2: Check Node.js (2 min)

Say:

> "Quick prereq check. We'll be writing JavaScript — no React, no Next.js, just simple Node scripts. Let's make sure Node is installed."

Run for them:

```bash
node --version
```

If it prints `v20.x.x` or higher → great, move on.

If it errors (`command not found`):

> "Looks like Node isn't installed. Easiest path: download the LTS installer from <https://nodejs.org/> — it's a one-click install. Come back when it says you're done and I'll re-check."

If they have an older version (< 20):

> "Your Node is a bit old. The Anthropic SDK needs Node 20+. Easiest fix: install the latest LTS from <https://nodejs.org/>."

## Step 3: Get an Anthropic API key (4 min)

Say:

> "Now we need an Anthropic API key. This is what lets your code talk to Claude. Three steps:"

Walk them through:

1. **Sign up / log in** at <https://console.anthropic.com>
2. **Add a payment method.** *(Yes, this part is annoying. The good news: every API call in this sprint costs less than a penny. Total spend across all modules is under $0.50. Promise.)*
3. **Set a spending limit.** Go to billing → set a $5 monthly cap. Even if something goes wrong, your blast radius is $5.
4. **Generate an API key.** API Keys → Create Key. Copy it. It starts with `sk-ant-api03-...`.

> "Got your key copied? Don't paste it in chat — we'll put it in a file in a second."

## Step 4: Scaffold the project (3 min)

Now create the student's working folder by copying the template:

```bash
cp -R templates/transcripts-to-insights student-output/
cd student-output
```

Tell them what just happened:

> "I just copied the starter project into `student-output/`. That folder is yours — it's where you'll work for the rest of the sprint. Let's look at what's inside:"

Show them:

```
student-output/
├── prompts/                  ← system prompts (we'll edit these!)
│   ├── system.md
│   ├── summarizer.md
│   └── action_extractor.md
├── transcripts/              ← drop input files here
│   └── sample-transcript.txt
├── stage-1/chat.js           ← Stage 1 code
├── stage-2/workflow.js       ← Stage 2 code
├── stage-3/orchestrator.js   ← Stage 3 code
├── package.json              ← lists dependencies
└── .env.example              ← template for your API key
```

> "Don't try to read all the code yet. Each module opens one file together. For now, just know: every piece you'll touch is in this folder."

## Step 5: Install dependencies + add API key (3 min)

Two commands. Walk them through both:

```bash
# Install the npm packages (Anthropic SDK, chokidar for watching files, dotenv for the key)
npm install

# Copy the env template to a real .env file
cp .env.example .env
```

Then:

> "Open `.env` in your editor. You'll see one line: `ANTHROPIC_API_KEY=sk-ant-api03-...`. Replace that placeholder with your real key. Save the file. **Important:** `.env` is in `.gitignore` — your key won't accidentally end up on GitHub."

Wait for them to do it. Confirm with:

```bash
# This should print "ANTHROPIC_API_KEY=sk-ant-api03-..." — your real key
grep ANTHROPIC_API_KEY .env
```

If the value is still `sk-ant-api03-...` (the placeholder), nudge them:

> "That's still the placeholder. Open `.env` and paste your real key (the one you copied from console.anthropic.com)."

## Step 6: Read the API concept doc (3 min)

Open `concepts/what-is-an-api.md` and read it together. Don't rush — let them ask questions.

The two beats to land:
1. **An API is just JSON in, JSON out.** No magic.
2. **Every AI product they've used works the same way under the hood.**

After reading, say:

> "Good. You don't need to memorize this — just hold onto the doorbell metaphor. In Module 2 you'll send your first API call and see exactly what goes over the wire."

## Step 7: Handoff (1 min)

Wrap and update progress:

1. **Update `CLAUDE.md`**: change `- [ ] Stage 1 Intro:` to `- [x] Stage 1 Intro:`
2. **Commit:**
   ```bash
   git add -A
   git commit -m "Complete Stage 1 Intro: setup + API key"
   ```
3. Say:

> "You're set up. Project scaffolded, API key in place, dependencies installed. When you're ready, type `module-1` and we'll do the systems-thinking tour."

---
name: module-3
description: Chat Assistant + System Prompt — Module 3 of the AISC Agent Sprint. Triggered when a student types "module-3". Student reads what-is-a-system-prompt.md, opens prompts/system.md, modifies it, and re-runs to see how the prompt shapes everything. Then opens the frontend to see Stage 1 visualized.
---

# Module 3: Chat Assistant + System Prompt

**Time:** ~20 minutes
**You'll produce:** a deeper understanding of the system prompt — the leverage point of every AI agent. You'll modify one yourself and watch the output change.

## Coach Instructions

In Module 2 they ran the agent once. Module 3 is about understanding *why* it produced that exact output. Spoiler: the system prompt. Let them feel the change by editing it themselves.

## Step 1: Set the frame (2 min)

Say:

> "In Module 2, you ran the agent and got back a structured insights report — themes, actions, next step. The format was specific. The voice was specific. That wasn't an accident. Every word of that output was shaped by **the system prompt** — the hidden instructions that came with the API call.
>
> Today's question: how does that work, and how do you control it?"

## Step 2: Read the concept doc (3 min)

Open `concepts/what-is-a-system-prompt.md` together. Read it with them.

The two beats to land:
1. **The system prompt is the product.** Same Claude, different prompt = different product entirely.
2. **System prompts live in their own files.** Code reads them at runtime. That's why you can tune your agent without touching code.

## Step 3: Open prompts/system.md (4 min)

Open `student-output/prompts/system.md`. Read it together.

Walk through:
- **The role:** "You are a meeting analyst."
- **The format:** the exact KEY THEMES / ACTION ITEMS / RECOMMENDED NEXT STEP shape.
- **The rules:** "Use names from the transcript. Never invent people."

> "This file is what makes the agent do what it does. The code in `chat.js` is generic — it could analyze meeting transcripts, OR it could write poetry, OR it could review legal contracts. *What it actually does is determined entirely by this file.*"

## Step 4: Tune it (5 min)

Now have them experiment. Two micro-edits, one at a time:

### Edit A: Change the role

Have them edit the first line of `prompts/system.md` to something specific:

```
You are a sarcastic meeting analyst who has seen too many standups.
```

Save the file. Re-run:

```bash
npm run stage-1
```

Watch what happens. The structure stays the same (because the format rules are still there) but the *voice* changes — Claude gets dryer, more pointed.

> "See that? You changed nothing in the code. You changed seven words of instruction. The agent's personality flipped. That's the leverage."

### Edit B: Change the output format

Now have them edit the format section. Replace the `KEY THEMES / ACTION ITEMS / RECOMMENDED NEXT STEP` block with something different — maybe:

```
**TLDR**
[One sentence — what happened in this meeting?]

**WHO OWES WHAT**
- [Person]: [task]

**SHOULD I CARE?**
[Yes/No, and why.]
```

Save, re-run. Now Claude returns a totally different shape — more casual, more direct.

> "Same code. Same Claude. New format. The system prompt isn't a setting — it's the entire product spec. This is what every AI startup does: they pick a domain, write a really good system prompt, wrap it in a UI."

## Step 5: Restore the original (2 min)

Have them revert their changes (or copy back from the template):

```bash
cp ../templates/transcripts-to-insights/prompts/system.md prompts/system.md
```

Run one more time to confirm the original behavior is back. We need it intact for Modules 4–7.

## Step 6: See it visualized (3 min)

Now open `frontend/index.html` in their browser:

```bash
open frontend/index.html       # Mac
# or: xdg-open frontend/index.html   # Linux
# or: just double-click it in Finder/Explorer
```

It opens on the **Stage 1 tab** by default — three nodes in a row: `[A transcript] → [The Analyst] → [A report]`. That's exactly the agent they just built and ran. Walk them through:

- **Top tabs** show all three stages — Stage 1 (where they are), Stage 2, Stage 3. Each tab is a different version of their agent. They can click ahead to see what's coming, but warn them: *"What you see in tabs 2 and 3 is your future self. We get there in the next few modules."*
- **Click the Analyst node.** The right panel switches to inspect mode. Show them:
  - "What this is" — plain English description
  - **"Its instructions (system prompt)"** — the exact text from `prompts/system.md` they were just editing
  - "Connects to" — the data flow

> "See how the system prompt you were just editing in your text editor *also* shows up here in the visualization? Same file. Same content. The frontend reads what you wrote. The agent reads what you wrote. **The system prompt is the source of truth for what the agent does.**"

Have them hit "Run Agent" once to watch the Stage 1 animation play out — input lights up, Analyst processes, report appears.

> "That's your Stage 1 agent visualized. Three nodes. One API call. Same thing your terminal just did, in picture form."

## Step 7: Wrap and commit (1 min)

1. **Update `CLAUDE.md`**: change `- [ ] Module 3:` to `- [x] Module 3:`
2. **Commit:**
   ```bash
   git add -A && git commit -m "Complete Module 3: Chat Assistant + System Prompt"
   ```
3. Hand off:

> "Stage 1 is done. You have a working chat assistant — a single API call that turns a transcript into insights. Next up: Stage 2. We'll wrap your agent in an automation so it runs *without you* every time a new file shows up. Type `module-4` when you're ready."

## Optional deeper reading

- `concepts/what-is-a-system-prompt.md`
- Try editing `prompts/summarizer.md` or `prompts/action_extractor.md` — note that those return JSON, so be careful with format changes.

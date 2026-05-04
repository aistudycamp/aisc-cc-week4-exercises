---
name: module-3
description: Run the Chat Assistant — Module 3 of the AISC Agent Sprint. Triggered when a student types "module-3". Student runs stage-1/chat.js interactively with a pre-loaded transcript, asks follow-up questions, edits the system prompt to see personality change, then restores it. No manual code editing — all edits go through Claude.
---

# Module 3: Run the Chat Assistant

**Time:** ~25 minutes
**You'll produce:** a working multi-turn conversation with the chat assistant, and a first-hand feel for how the system prompt controls everything about the output. You'll run it, talk to it, break it, restore it.

## Coach Instructions

This module is about the *experience* of the chat assistant — not building it. Students run an existing scaffold, feel the leverage of the system prompt, and restore the original for Module 4. The key exercise is the system prompt edits. Don't rush past them.

## Step 1: Set the frame (2 min)

Say:

> "You ran the agent once in Module 2. Today we go deeper — you'll have an actual back-and-forth conversation, and you'll feel exactly how much power is in one file: the system prompt. Everything Claude says is shaped by it."

## Step 2: Three roles — system, user, assistant (3 min)

Before we run anything, name the three roles in every AI conversation:

> "Every API call has three roles. Here's how to think about them:
>
> - **System** — the standing instructions Claude always reads first. It's set by you, the builder, before the conversation starts. The file `prompts/system.md` IS the system prompt. It defines the persona, the output format, the rules.
> - **User** — what you say in the conversation. When you paste a transcript, that's a user message. When you ask a follow-up, that's another user message.
> - **Assistant** — what Claude says back. Every response is an assistant message.
>
> Three roles. The system prompt is what makes this a *meeting analyst* instead of a generic AI. Change the system prompt and you change everything."

## Step 3: Run it with a transcript (8 min)

Run with the sample transcript pre-loaded:

```bash
npm run stage-1 -- transcripts/sample-transcript.txt
```

They'll see:

```
💬 Chat Assistant — Meeting Analyst
   Transcript loaded from: transcripts/sample-transcript.txt
   Ask your first question.

>
```

The transcript is already in the conversation. Have them ask follow-up questions — at least 4:

```
> What are the top 3 action items?
> Who looks most blocked right now?
> What should I bring to next week's standup?
> Write a one-sentence summary I can put in Slack.
```

> "See how each answer knows the transcript? It's all in memory. The `messages[]` array grows with every exchange — that's what 'context window' means in practice."

When done:

```
> exit
```

## Step 4: Open and read the system prompt (3 min)

Have Claude open `prompts/system.md`:

> "Tell Claude: 'Show me the contents of prompts/system.md'"

Read it together. Land:

> "This is what makes every output look the way it does. KEY THEMES, ACTION ITEMS, RECOMMENDED NEXT STEP — all defined here. Change this file and the output format changes entirely. That's the leverage."

## Step 5: Edit the system prompt (5 min)

Two quick edits. **Tell Claude to make each one** — the student should not touch the file directly.

### Edit A: Change the role

Have the student say to Claude:

> "Tell Claude: 'Update prompts/system.md — change the first line to: You are a sarcastic meeting analyst who has seen too many standups.'"

After Claude edits it, re-run:

```bash
npm run stage-1 -- transcripts/sample-transcript.txt
```

Ask one question. Watch the voice change — same structure, different personality.

### Edit B: Change the output format

Have the student say to Claude:

> "Tell Claude: 'Update prompts/system.md — replace the KEY THEMES / ACTION ITEMS / RECOMMENDED NEXT STEP format with: **TLDR** (one sentence), **WHO OWES WHAT** (bullet list of person + task), **SHOULD I CARE?** (Yes/No and why)'"

Re-run. Different shape entirely.

> "Same code. Same Claude. Different prompt. The system prompt is the product spec — every word of output is shaped by it."

### Step 5c: Restore the original prompt ⚠️ (required)

Don't skip this — Module 4's workflow reads `system.md` and expects the original format.

```bash
cp prompts/system-original.md prompts/system.md
```

Run once more to confirm the original output is back:

```bash
npm run stage-1 -- transcripts/sample-transcript.txt
```

The output should have the original KEY THEMES / ACTION ITEMS / RECOMMENDED NEXT STEP format. If they want to keep their custom prompt, save it first:

```bash
cp prompts/system.md prompts/system-custom.md
```

Then restore.

## Step 6: Use it in the browser (4 min)

Start the server — this runs until the student is done with the course:

```bash
npm run server
```

You'll see:

```
🚀 Server running at http://localhost:3000
```

Open **http://localhost:3000** in the browser. Make sure the **Stage 1** tab is active.

On the right side you'll see the live interface. Click **Load sample transcript**, then ask the same 4 questions they asked in the terminal:

```
What are the top 3 action items?
Who looks most blocked right now?
What should I bring to next week's standup?
Write a one-sentence summary I can put in Slack.
```

> "That's your `chat.js` — same code, same system prompt, now running through a browser. The `ask()` function doesn't know or care whether the question came from the terminal or a web request."

If they want to try a different system prompt: have them edit `prompts/system.md` via Claude, then press `Ctrl+C` to stop the server and run `npm run server` again to restart it. The prompt change kicks in on restart.

Click the **Chat Assistant** node on the diagram. Show the inspect panel — this is the same code they wrote. Hit **Run Agent** to watch the architecture animation alongside the live interface.

> "Leave the server running — you'll use it in Module 4 too."

## Step 7: Wrap and commit (1 min)

1. **Update `CLAUDE.md`**: change `- [ ] Module 3:` to `- [x] Module 3:`
2. **Commit:**
   ```bash
   git add -A && git commit -m "Complete Module 3: Run the Chat Assistant"
   ```
3. Hand off:

> "Stage 1 done. You have a working chat assistant — interactive, back-and-forth, and driven entirely by a system prompt you can change anytime. Next: Stage 2. We build something that runs *automatically* every time a file appears — no typing required. Type `module-4` when you're ready."

## Coach Guardrails

- **The restore step is mandatory** — confirm the student ran it and that `npm run stage-1 -- transcripts/sample-transcript.txt` produces the original output format before committing. Module 4's workflow reads `system.md` directly. A broken prompt here causes confusing failures in Module 4.
- **Never ask the student to edit code or files directly** — all edits go through "Tell Claude: [what you want]". The student describes the change; Claude writes it.
- **Don't skip the system prompt edits** — Edit A and Edit B are the core exercises. The visceral "I changed one file and the whole output changed" moment is the whole lesson.
- **If they want to keep a custom prompt**, save it as `prompts/system-custom.md` before restoring the original.
- **The three roles** (system/user/assistant) should land before the edits, not after. If the student seems confused about why the prompt is in a file, revisit this explanation.

## Optional deeper reading

- `concepts/what-is-an-agent.md` — the three-level hierarchy, with additional context on how agents compose
- `concepts/what-is-a-system-prompt.md` — deeper reference on how system prompts control model behavior

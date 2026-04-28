---
name: module-3
description: Build the Chat Assistant — Module 3 of the AISC Agent Sprint. Triggered when a student types "module-3". Student opens stage-1/chat.js, runs it as an interactive multi-turn chat, asks follow-up questions, edits the system prompt to see personality change, then opens the frontend Stage 1 tab.
---

# Module 3: Build the Chat Assistant

**Time:** ~25 minutes
**You'll produce:** a working interactive chat assistant — a multi-turn conversation where you paste a transcript as the first message, then ask follow-up questions. You'll also edit the system prompt and watch the output change.

## Coach Instructions

In Module 2 they ran the agent once. This module is deeper: they experience an actual back-and-forth conversation, and they feel the leverage of the system prompt. End state: they understand what "building a chat assistant" means — not a UI, but a loop with a messages array.

## Step 1: Set the frame (2 min)

Say:

> "You built a basic agent in Module 2. Today we look closely at Stage 1 — the **chat assistant**. It's more than one API call. It's an *ongoing conversation* where the agent remembers what you said before. You paste a transcript in, then you can ask follow-ups: 'What are the action items? Who looks blocked? What should I bring to next standup?' The agent knows the full conversation so far."

## Step 2: Read the concept doc (3 min)

Open `concepts/what-is-a-workflow.md` — actually, skip ahead. Open `concepts/what-is-an-agent.md` and read the **"three-level hierarchy"** section together. Land one idea:

> "Stage 1 is the foundation. Stages 2 and 3 *import and reuse it*. This isn't marketing — it's literally what the code does. Let's look."

## Step 3: Open chat.js and read it top to bottom (5 min)

Open `student-output/stage-1/chat.js`. Walk through the code together.

Three things to highlight:

### The `ask()` export

```js
export async function ask(question, context) {
  const content = context ? `${question}\n\n${context}` : question;
  const response = await client.messages.create({ ... });
  return response.content[0].text;
}
```

> "This is a stateless one-shot function. Ask it a question, get an answer. It has no memory. Stage 2 and Stage 3 will import this exact function — `import { ask } from '../stage-1/chat.js'`. The building-block reuse is *in the code*."

### The `messages[]` array

```js
const messages = [];
messages.push({ role: 'user', content: line });
// ... API call ...
messages.push({ role: 'assistant', content: reply });
```

> "This is how multi-turn conversation works. Every message gets appended. When you send the next message, Claude sees the whole array — it knows everything that was said. This is what 'context window' means in practice: one long array of messages."

### The import guard

```js
if (import.meta.url === `file://${process.argv[1]}`) {
  // interactive loop — only runs when you type `node stage-1/chat.js`
  // NOT when Stage 2 does: import { ask } from '../stage-1/chat.js'
}
```

> "This is how the same file works two ways. When you run it directly, you get the interactive loop. When Stage 2 imports it, only the `ask()` function loads — the loop never fires. Smart modular design."

## Step 4: Run it and have an actual conversation (8 min)

Have them run:

```bash
npm run stage-1
```

They'll see:

```
💬 Chat Assistant — Meeting Analyst
   Paste a transcript as your first message,
   then ask follow-up questions.
   Type "exit" to quit.

>
```

Have them paste the sample transcript as their first message (copy/paste from `transcripts/sample-transcript.txt`).

Get the first report back. Then push them to ask follow-ups — at least 4:

```
> What are the top 3 action items?
> Who looks most blocked right now?
> What should I bring to next week's standup?
> Write a one-sentence summary I can put in Slack.
```

> "See how each answer knows what was said before? The agent remembers the transcript and your questions. That's the `messages[]` array growing. That's all it is."

When they're done:

```
> exit
```

## Step 5: Edit the system prompt (5 min)

Open `student-output/prompts/system.md`. Read it together. Then make two quick edits:

### Edit A: Change the role

Replace the first line with:

```
You are a sarcastic meeting analyst who has seen too many standups.
```

Save, re-run `npm run stage-1`, paste the transcript again, ask one question. Watch the voice change — same structure, different personality.

### Edit B: Change the output format

Replace the `KEY THEMES / ACTION ITEMS / RECOMMENDED NEXT STEP` block with:

```
**TLDR**
[One sentence — what happened?]

**WHO OWES WHAT**
- [Person]: [task]

**SHOULD I CARE?**
[Yes/No, and why.]
```

Save, re-run. Different shape entirely.

> "Same code. Same Claude. New format. The system prompt is the product spec — every word of output is shaped by it."

### Restore

After they see the change, restore the original:

```bash
cp ../templates/transcripts-to-insights/prompts/system.md prompts/system.md
```

Run once more to confirm the original behavior is back. We need it intact for the workflow in Module 4.

## Step 6: See it in the frontend (2 min)

Open `frontend/index.html`:

```bash
open frontend/index.html
```

The Stage 1 tab is the default. Three nodes: `[A transcript] → [Chat Assistant] → [A report]`. That's exactly what they just built.

Click the **Chat Assistant** node. Show them the inspect panel — system prompt, description, connections. Hit **Run Agent** to watch the animation.

> "That's your Stage 1 assistant visualized. One API call. One building block. In Module 4 you'll see it appear *inside* a larger box — the workflow — as one step in a pipeline."

## Step 7: Wrap and commit (1 min)

1. **Update `CLAUDE.md`**: change `- [ ] Module 3:` to `- [x] Module 3:`
2. **Commit:**
   ```bash
   git add -A && git commit -m "Complete Module 3: Build the Chat Assistant"
   ```
3. Hand off:

> "Stage 1 done. You have a working chat assistant — an interactive multi-turn conversation and a reusable `ask()` function. Next: Stage 2. We wrap that function in a pipeline so it runs *automatically* every time a file appears. Type `module-4` when you're ready."

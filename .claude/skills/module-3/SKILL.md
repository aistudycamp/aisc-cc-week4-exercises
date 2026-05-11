---
name: module-3
description: Run the Chat Assistant — Module 3 of the AISC Agent Sprint. Triggered when a student types "module-3". Student runs the chat assistant interactively in the browser with a pre-loaded transcript, asks follow-up questions, edits the system prompt to see personality change, then restores it. No manual code editing — all edits go through Claude.
---

# Module 3: Run the Chat Assistant

**Time:** ~25 minutes

**What we're building**
By the end: you'll have had a real conversation with your chat assistant, edited its system prompt to change its personality entirely, and understood why the system prompt is the leverage point of the whole system.

## Coach Instructions

This module is about the *experience* of the chat assistant — not building it. Students interact in the browser, feel the leverage of the system prompt, and restore the original for Module 4. The key exercise is the system prompt edits. Don't rush past them.

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

Print this so the loop is visible:

```
       student types
            │
            ▼
[ chat tab in browser ]
            │
            ▼
[ POST /api/chat with messages[] ]
            │
            ▼
[ Anthropic API call ]   ← system prompt steers everything
            │
            ▼
[ response back, append to messages[] ]
            │
            ▼
       student types again  ← messages[] keeps growing
```

> "Read it top-to-bottom. The student's question goes in. The browser POSTs the *whole* `messages[]` array — every previous turn included. The system prompt rides along on every call. Claude's reply gets appended to `messages[]`, and the next question carries the entire conversation forward. That growing array is what makes this a back-and-forth instead of one-shot."

## Step 3: Read the system prompt (3 min)

The system prompt is saved at `prompts/system.md`. You can read and edit it live in the **Chat tab's system prompt panel** — it's the editable textarea at the top of the canvas. Open the browser to **http://localhost:3000** if you haven't already.

> "That panel **is** the file. Whatever's in there is what shapes every output: KEY THEMES, ACTION ITEMS, RECOMMENDED NEXT STEP — all defined there. Change the panel, change the agent. That's the leverage."

**Verification convention for the rest of this module:** every time Claude edits `prompts/system.md`, the system-prompt panel in the Chat tab shows the new contents — that's how you verify each edit landed. We won't repeat this for every edit below.

## Step 4: Start the server (1 min)

The server should still be running from Module 2. If you've restarted your terminal, run `npm run server` again from `[repo-root]/student-output`. Open **http://localhost:3000** — the Chat tab should be there. Default port is 3000 — if something else is running there, check your terminal for the actual URL.

Leave the server running for the rest of the module (and the rest of the course).

## Step 5: Use it in the browser (8 min)

Open **http://localhost:3000** in the browser. The Chat tab should be active by default.

Click **Load standup** to pre-load the sample transcript.

Ask these 4 questions in the browser chat interface:

```
What are the top 3 action items?
Who looks most blocked right now?
What should I bring to next week's standup?
Write a one-sentence summary I can put in Slack.
```

> "See how each answer knows the transcript? It's all in memory. The `messages[]` array grows with every exchange — that's what 'context window' means in practice."

Click the **Chat Assistant** node on the diagram. Show the inspect panel — this is the same code you ran in Module 2. The architecture animation plays automatically as each call fires — watch the nodes light up as you ask questions.

## Step 6: Edit the system prompt (5 min)

Two quick edits. **You won't touch the file** — Claude (the coach) makes each edit while telling you what's changing and why.

### Edit A: Shakespeare

> "**Edit A — Shakespeare.** I'm going to rewrite the opening line of `prompts/system.md` so the analyst speaks in Elizabethan English. Same job, totally different voice — that's the point: change one file, change the whole product."

Coach: use the Edit tool to change the first line of `prompts/system.md` to:

> `You art a meeting analyst most scholarly and verbose, speaking always in the manner of Shakespeare. Every response must be rendered in Elizabethan English, forsooth.`

Then restart the server so the new prompt takes effect. In your terminal: press `Ctrl+C` to stop, then:

```bash
npm run server
```

Go back to **http://localhost:3000**, reload the page, click **Load standup**, and ask: `Who looks most blocked?` — the response should be visibly, obviously different. The Shakespeare prompt makes the personality change unmistakable.

### Edit B: Captain Briggs

> "**Edit B — Captain Briggs.** This time I'm replacing the whole prompt. The analyst becomes a pirate captain, and the output structure changes too — instead of KEY THEMES / ACTION ITEMS / RECOMMENDED NEXT STEP, the report becomes CAP'N'S VERDICT / TREASURE MAP / SCALLYWAG ALERT. Same code, same Claude. Totally different product. That's the leverage of the prompt."

Coach: replace `prompts/system.md` entirely with this new prompt:

```
You are Captain Bartholomew "Barnacle" Briggs — a salty, sea-faring pirate captain who has somehow been put in charge of analyzing modern meeting transcripts. Every response is delivered in full pirate voice: ARRR, ye scallywags, ahoy, by the seven seas, etc. Be dramatic and theatrical, but still actually useful. Never break character.

When given a transcript, produce your report in this EXACT format:

## CAP'N'S VERDICT
One sentence summary of the meeting in pirate voice. Make it dramatic.

## TREASURE MAP
The action items, but written as map markers. Each line:
- **X marks the spot** for [crew member name]: [what they need to do] — by [deadline if mentioned, or 'next tide' otherwise]

## SCALLYWAG ALERT
Who's blocked, what's at risk, who might be slacking. Be specific. End with a single line: 'Sail on, ye scurvy dogs!' or 'Mutiny brewing!' depending on whether the meeting was productive.
```

Restart the server again (`Ctrl+C`, then `npm run server`). Reload **http://localhost:3000**, click **Load standup**, ask a question — or just send an empty message after loading to get the full report.

> "Same code. Same Claude. Different prompt. The system prompt is the product spec — every word of output, AND its structure, is shaped by it. You went from a Renaissance scholar to a pirate captain by editing a single file. That's the leverage."

### Step 6c: Restore the original prompt ⚠️ (required)

Don't skip this — Module 4's workflow reads `system.md` and expects the original format.

Read `prompts/system-original.md` via Read tool. Write those contents to `prompts/system.md` via Edit tool.

Restart the server (`Ctrl+C`, then `npm run server`). Reload **http://localhost:3000**, click **Load standup**, ask one question to confirm the original KEY THEMES / ACTION ITEMS / RECOMMENDED NEXT STEP format is back.

If they want to keep a custom prompt, save it first — write their current modified version to `prompts/system-custom.md` before restoring.

## Key takeaways

- The system prompt is the leverage point — change it, change everything the agent does
- Same chat assistant, same API call — only the prompt changes
- Always restore `system-original.md` before moving on — every module from here depends on the baseline prompt

## Step 7: Wrap and commit (1 min)

What you've built so far:

```
┌──────────────────────────────┐
│  Stage 1 — Chat Assistant    │  ← running live in the browser
│  Interactive, multi-turn     │
│  Server running at :3000     │
└──────────────────────────────┘
```

1. **Update `CLAUDE.md`**: Read CLAUDE.md, then change `- [ ] Module 3:` to `- [x] Module 3:` (Edit tool)
2. **Commit** — run via Bash tool from the repo root (in a second terminal tab if needed, so the server keeps running):
   ```bash
   git add -A && (git diff --cached --quiet || git commit -m "Complete Module 3: Run the Chat Assistant")
   ```
   Show the student the changed files in the commit output.
3. **Tell the student to run `/compact`.** Say this:

   > "Stage 1 is done. You built a chat assistant that's interactive, back-and-forth, and driven entirely by a system prompt you can change anytime. Next is Stage 2 — a workflow that runs *automatically* every time a file appears, no typing required.
   >
   > Type `/compact` now to clear context — stage boundaries are the right place to do it. **After `/compact` finishes, type `module-4` to continue.**"

   Wait for the student to run `/compact` before doing anything else.

## Coach Guardrails

- **The restore step is mandatory** — use Read + Edit tools to restore `system-original.md` → `system.md`. Then restart the server and confirm the original output format appears in the browser before committing. Module 4's workflow reads `system.md` directly. A broken prompt here causes confusing failures in Module 4.
- **Never ask the student to edit code or files directly** — all edits go through "Tell Claude: [what you want]". The student describes the change; Claude writes it.
- **Don't skip the system prompt edits** — Edit A and Edit B are the core exercises. The visceral "I changed one file and the whole output changed" moment is the whole lesson.
- **Restart the server after every prompt change** — the server caches the prompt at startup. `Ctrl+C` then `npm run server` is required to pick up changes. Make this explicit each time.
- **Print the full file after every edit** — read `prompts/system.md` back and show the full contents after Edit A, Edit B, and the restore. Don't just say "done" — show them what changed.
- **If they want to keep a custom prompt**, save it as `prompts/system-custom.md` before restoring the original.
- **The three roles** (system/user/assistant) should land before the edits, not after. If the student seems confused about why the prompt is in a file, revisit this explanation.
- **Fresh terminal recovery** — if the student just opened a new terminal for the server, remind them: `cd [repo-root]/student-output` first. The repo root path is the one established in Module Setup.

## Optional deeper reading

Just ask me: *"Read concepts/what-is-an-agent.md and walk me through it."* I'll pull it up and explain it.

- `concepts/what-is-an-agent.md` — the three-level hierarchy, with additional context on how agents compose
- `concepts/what-is-a-system-prompt.md` — deeper reference on how system prompts control model behavior

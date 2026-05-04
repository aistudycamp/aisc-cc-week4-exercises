---
name: module-2
description: Your First API Call — Module 2 of the AISC Agent Sprint. Triggered when a student types "module-2". The demystify-the-API moment. Student opens chat.js, runs it for the first time, and sees the JSON request and response. By the end, AI products are no longer magic.
---

# Module 2: Your First API Call

**Time:** ~20 minutes
**You'll produce:** your first working API call to Claude. You'll see the raw JSON request go out, the raw JSON response come back, and the insights report Claude generates from a meeting transcript.

## Coach Instructions

**This is the most important module in the sprint.** When students see the JSON for the first time, AI stops being magic. Take it slow. Show the request. Show the response. Let it land.

## Step 1: Set the stakes (1 min)

Say:

> "Module 2. Today is the moment AI stops being a black box. By the end of the next 20 minutes, you will have called the Claude API yourself, seen the exact JSON that gets sent, and seen the exact JSON that comes back. Once you've seen this — once — you understand how every AI product on Earth works underneath. That's not an exaggeration."

## Step 2: Walk through what's happening (3 min)

Tell the student what `stage-1/chat.js` does — don't open the file, just walk through the five things that happen when it runs:

1. **Set up the Anthropic client** — `new Anthropic()` reads their API key from `.env`. Nothing fancy.
2. **Read the system prompt from a file** — loads `prompts/system.md`. This is the personality. We'll dig into it in Module 3.
3. **Read the transcript** — whatever file path is passed in.
4. **Make the API call** — `client.messages.create(...)`. This is the line that reaches Anthropic's servers — where the AI thinking actually happens. One function call, one network request, one JSON response back.
5. **Print the response** — the actual text lives at `response.content[0].text`.

Ask:

> "Which of those five steps is the AI part — the actual intelligence?"

They should land on step 4. Affirm:

> "Right. Everything else is plumbing. That one call — sending JSON to Anthropic, getting JSON back — is the entire AI part."

## Step 3: Look at what's getting sent (3 min)

Show them what the code is about to send to Anthropic — this is the JSON object inside `messages.create()`:

```json
{
  "model": "claude-sonnet-4-6",
  "max_tokens": 1024,
  "system": "You are a meeting analyst. ...",
  "messages": [
    { "role": "user", "content": "Here's the meeting transcript..." }
  ]
}
```

> "This is what your code is about to send to Anthropic. Five fields. That's the whole request.
>
> - `model` — which Claude (Sonnet, Opus, Haiku)
> - `max_tokens` — how long the response can be
> - `system` — the system prompt (the personality + rules)
> - `messages` — the actual conversation
>
> Remember the orchestrator diagram from Module 1 — the 'AI thinking' step? This JSON request is what goes over the wire for that step. One call. One JSON object.
>
> When you open Claude.ai or ChatGPT, your browser is sending JSON exactly like this. No more, no less."

## Step 4: Run it (3 min)

Now run it. In the current terminal, from `student-output/`:

```bash
npm run stage-1
```

Watch the output together. They should see:
- A line like `📄 Reading: transcripts/sample-transcript.txt`
- `⚡️ Calling Claude API...`
- A pause (a few seconds while the API thinks)
- A formatted insights report
- A token count line

If something errors:
- **`ANTHROPIC_API_KEY` undefined** → check `.env` is in the right folder and has the real key
- **`Cannot find module`** → run `npm install` again
- **`401 unauthorized`** → API key invalid or hasn't been activated yet

## Step 5: Read the response together (4 min)

Once it works, point at the output:

> "Look at what just happened. You sent a fake meeting transcript to Anthropic's servers. Claude read it, found 3 themes, found N action items, recommended a next step, and sent it back as text. Total time: a few seconds. Total cost: under a cent.
>
> Now look at the bottom — the token count. Tokens are how Claude charges. You used ~1,400 input tokens and ~300 output tokens. At Sonnet pricing, that's about $0.005. Less than a penny."

Then add:

> "The response object has more in it than just the text. Want to see the whole JSON that came back?"

If they want to: have them edit the file to add `console.log(JSON.stringify(response, null, 2));` right after the `messages.create` call, save, re-run, and see the full JSON response object. The keys to point out:

- `id` — unique message ID
- `model` — which Claude actually responded
- `role: "assistant"` — Claude's reply (vs the `user` they sent)
- `content` — the array of response blocks (text, tool calls, etc)
- `stop_reason` — why it stopped (`"end_turn"` is normal)
- `usage` — token counts

> "Every field has a reason. None of it is mysterious. That's the whole API."

## Step 6: The two-line takeaway (2 min)

Stop and say:

> "Before we move on, two things to lock in:
>
> 1. **Every AI product is this.** Whatever you've seen in the last 2 years — Claude.ai, ChatGPT, Cursor, Lovable, every chatbot at every startup — they all run on calls like the one you just made. They might wrap it in a UI, add tools, layer in memory, but the core is always: send a JSON request, get a JSON response.
> 2. **You can build any of them.** With what you just did, you have the foundation. The rest is choreography."

## Step 7: Wrap and commit (2 min)

What you've built so far:

```
┌──────────────────────────────┐
│  Stage 1 — Chat Assistant    │  ← you built this
│  stage-1/chat.js             │
│  ask() · system.md prompt    │
└──────────────────────────────┘
```

1. **Update `CLAUDE.md`**: change `- [ ] Module 2:` to `- [x] Module 2:`
2. **Commit** — in the current terminal, from the repo root:
   ```bash
   git add -A && git commit -m "Complete Module 2: First API Call"
   ```
3. **Run `/compact`** — type `/compact` to clear context before Module 3.
4. Hand off:

> "Big moment. You've called the API. Next up — Module 3, where we look at the system prompt that controls Claude's personality. Once you understand prompts, you understand the leverage point of the whole system. Type `module-3` when you're ready."

## Optional deeper reading

Just ask me: *"Read concepts/what-is-an-api.md and walk me through it."* I'll pull it up and explain it.

- `concepts/what-is-an-api.md` — the doorbell metaphor in full
- `concepts/what-is-a-system-prompt.md` — preview for Module 3

## Coach Guardrails

- **Don't run the API call for them on the first try** — have the student type `npm run stage-1`. The act of running it themselves is the lesson.
- **Don't skip the JSON walkthrough** — Steps 2 and 3 (reading the file and showing the request object) are the point of this module. Don't jump straight to running it.
- **Diagnose errors before moving on** — if the student gets a `401`, `Cannot find module`, or `ANTHROPIC_API_KEY undefined`, fix it here. A broken setup will block every module from here forward.
- **The "full JSON response" step is optional** — follow the student's curiosity. If they want to see the full response object, great. If not, move on without guilt.

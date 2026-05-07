---
name: module-2
description: Your First API Call — Module 2 of the AISC Agent Sprint. Triggered when a student types "module-2". The demystify-the-API moment. Student opens chat.js, runs it for the first time, and sees the JSON request and response. By the end, AI products are no longer magic.
---

# Module 2: Your First API Call

**Time:** ~20 minutes

**What we're building**
By the end: you'll have called the Claude API from the browser, seen the exact JSON that went out and came back, and had a real back-and-forth conversation with your chat assistant — all without touching the terminal.

## Coach Instructions

**This is the most important module in the sprint.** When students see the JSON for the first time, AI stops being magic. Take it slow. Show the request. Show the response. Let it land.

## VS Code tip

> "Best setup: VS Code open with `student-output/` in the file explorer, and your browser alongside. You'll switch between them."

## Step 1: Set the stakes (1 min)

Say:

> "Module 2. Today is the moment AI stops being a black box. By the end of the next 20 minutes, you will have called the Claude API yourself, seen the exact JSON that gets sent, and seen the exact JSON that comes back. Once you've seen this — once — you understand how every AI product on Earth works underneath. That's not an exaggeration."

## Step 2: Walk through what's happening (3 min)

Before the code, here's the round trip you're about to do — what leaves your machine, what comes back:

```
your machine                          Anthropic
────────────                          ─────────

  system prompt
   + transcript        ── HTTP ──→    Claude reads
   + your question                    the inputs
                                          │
                                          ▼
                                      generates a
                                       response
                                          │
  text answer          ←── HTTP ──        ▼
  (printed to
   your terminal)
```

> "That's the whole loop. You send three things over the wire — a system prompt, a transcript, and a question. Claude reads them, generates a reply, sends the text back. Your code prints it. The JSON we're about to look at is just *what's inside the arrow*."

Here's what `stage-1/chat.js` does — five things that happen when it runs:

1. **Set up the Anthropic client** — `new Anthropic()` reads their API key from `.env`. Nothing fancy.
2. **Read the system prompt from a file** — loads `prompts/system.md`. This is the personality. We'll dig into it in Module 3.
3. **Read the transcript** — whatever file path is passed in.
4. **Make the API call** — `client.messages.create(...)`. This is the line that reaches Anthropic's servers — where the AI thinking actually happens. One function call, one network request, one JSON response back.
5. **Print the response** — the actual text lives at `response.content[0].text`.

Notice step 4 — `client.messages.create()`. That's the only line that talks to Anthropic. The rest is the wiring around it — reading the inputs, sending the request, handling the response. You'll touch every one of those steps before this sprint is over.

## Step 3: Look at what's getting sent (3 min)

> "When we send data to Anthropic, it goes as JSON — a structured format. If you've built in n8n or used webhooks, it's the same idea: a payload with named fields. Here are the five fields in every Claude API call:"

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

## Step 4: Start the server and open the browser (3 min)

Let's see it work.

> **Open a NEW terminal tab** (Cmd+T in your terminal app, or "Terminal → New Tab"). The terminal we've been using has Claude Code running — we need a separate tab so the server has its own window. In the new tab, navigate to the project root (or `student-output/`) and start the server:

```bash
cd [repo-root]/student-output
npm run server
```

(Use the repo root path you saved in stage-1-intro.) You should see `🚀 Server running at http://localhost:3000`. Leave that tab open — the server runs there for the rest of the sprint.

Now switch back to your Claude Code tab (or open a browser) and go to **http://localhost:3000**. You'll see the Chat tab. Click **Load standup** — that loads the sample transcript as the first message in the conversation.

Now ask a question: `Who looks most blocked?`

Watch the response appear. That's the API call firing — the same JSON you just saw in Step 3, going over the wire to Anthropic's servers, coming back as text.

Notice the log strip below the reply: `[messages: N · ~tokens · time]`. That `messages: N` count is the size of the `messages[]` array — it grows by 2 every turn (your message, Claude's reply). That growth is what gives the chat memory across turns. We'll come back to it in Module 3.

If something errors:
- **`ANTHROPIC_API_KEY` undefined** → check `.env` is in the right folder and has the real key
- **`Cannot find module`** → run `npm install` again
- **`401 unauthorized`** → API key invalid or hasn't been activated yet
- **`EADDRINUSE: port 3000 already in use`** → another server is running. Kill it: `lsof -ti:3000 | xargs kill -9`, then re-run `npm run server`

## Step 5: Read the response together (4 min)

Once it works, point at the output:

> "Look at what just happened. You sent a fake meeting transcript to Anthropic's servers. Claude read it and answered your question. Total time: a few seconds. Total cost: under a cent.
>
> Check the token count below the response. Tokens are how Claude charges. You used ~1,400 input tokens and ~300 output tokens. At Sonnet pricing, that's about $0.005. Less than a penny."

Then add:

> "The response object has more in it than just the text. The right panel shows you the shape automatically — `{ content: [{ text: '...' }], usage: { input_tokens: N, output_tokens: N } }`. Every field has a reason. None of it is mysterious."

Key fields to point out from the JSON panel on the right:

- `model` — which Claude was called
- `system` — the system prompt (the personality + rules)
- `messages` — the actual conversation
- `content` — the array of response blocks
- `usage` — token counts

> "That's the whole API. JSON in, JSON out."

> "**One more thing:** after this sprint, rotate your API key — go to console.anthropic.com, generate a new one, update `.env`. Why? You've been pasting the key in terminal commands during setup. Better to retire it once the sprint is done and start fresh. Takes 30 seconds."

## Step 6: The two-line takeaway (2 min)

Stop and say:

> "Before we move on, two things to lock in:
>
> 1. **Every AI product is this.** Whatever you've seen in the last 2 years — Claude.ai, ChatGPT, Cursor, Lovable, every chatbot at every startup — they all run on calls like the one you just made. They might wrap it in a UI, add tools, layer in memory, but the core is always: send a JSON request, get a JSON response.
> 2. **You can build any of them.** With what you just did, you have the foundation. The rest is choreography."

## Key takeaways

- Every AI product is JSON in, JSON out — send `{ model, system, messages }`, get `{ content, usage }` back
- Five fields: `model`, `max_tokens`, `system`, `messages`, `role/content` — that's the whole request
- The right panel always shows the full JSON — request and response, live, after every call

## Step 7: Wrap and commit (2 min)

What you've built so far:

```
┌──────────────────────────────┐
│  Stage 1 — Chat Assistant    │  ← you built this
│  stage-1/chat.js             │
│  ask() · system.md prompt    │
└──────────────────────────────┘
```

1. **Update `CLAUDE.md`**: change `- [ ] Module 2:` to `- [x] Module 2:` (Edit tool)
2. **Commit** — run via Bash tool from the repo root:
   ```bash
   git add -A && git commit -m "Complete Module 2: First API Call"
   ```
   Show the student the changed files in the commit output.
3. Hand off:

> "Big moment. You've called the API. Next up — Module 3, where we look at the system prompt that controls Claude's personality. Once you understand prompts, you understand the leverage point of the whole system. Type `module-3` when you're ready."

## Optional deeper reading

Just ask me: *"Read concepts/what-is-an-api.md and walk me through it."* I'll pull it up and explain it.

- `concepts/what-is-an-api.md` — the doorbell metaphor in full
- `concepts/what-is-a-system-prompt.md` — preview for Module 3

## Coach Guardrails

- **The interaction happens in the browser, not the terminal** — `npm run stage-1` is not used in this module. The browser's Chat tab is the live interface for Module 2.
- **Don't skip the JSON walkthrough** — Steps 2 and 3 (reading the file and showing the request object) are the point of this module. Don't jump straight to running it.
- **Diagnose errors before moving on** — if the student gets a `401`, `Cannot find module`, or `ANTHROPIC_API_KEY undefined`, fix it here. A broken setup will block every module from here forward.
- **The "full JSON response" step is optional** — follow the student's curiosity. If they want to see the full response object, great. If not, move on without guilt.
- **Fresh terminal recovery** — if the student just opened a new terminal, remind them: `cd [repo-root]/student-output` before running `npm run stage-1`. The repo root path is the one established in Stage 1 Intro.

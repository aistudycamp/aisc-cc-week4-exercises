# What Is an API?

> "An API is a doorbell for software."

You've used Claude. You've maybe used ChatGPT. You've definitely used Gmail or Notion. Every one of those products has an **API** — a way for code to ring the doorbell, ask for something, and get an answer back.

That's it. That's the whole concept. The rest of this doc is just unpacking what's inside the doorbell.

---

## The shape of every API call

Every time your code calls an API — Claude, OpenAI, Gmail, anything — three things happen:

1. **You send a request.** A blob of structured text (JSON), saying "here's what I want."
2. **The server does the work.** In Claude's case, that's the model thinking and writing.
3. **You get a response.** Another blob of structured text, with the answer.

That's it. No magic. JSON in, JSON out.

---

## What a Claude API call actually looks like

Here's the request your code sends when you ask Claude something:

```json
{
  "model": "<the model configured in this project>",
  "max_tokens": 1024,
  "system": "You are a meeting analyst. Find key themes.",
  "messages": [
    { "role": "user", "content": "Here's the transcript: ..." }
  ]
}
```

Four fields. That's the whole thing.

- **`model`** — which Claude you want. Sonnet, Opus, Haiku.
- **`max_tokens`** — how long the response can be. (Tokens ≈ word pieces.)
- **`system`** — *the system prompt.* The hidden instructions that shape personality and behavior.
- **`messages`** — the actual back-and-forth. User says X, assistant says Y.

And here's the response that comes back:

```json
{
  "id": "msg_abc123",
  "role": "assistant",
  "content": [
    { "type": "text", "text": "Three key themes: ..." }
  ],
  "stop_reason": "end_turn",
  "usage": { "input_tokens": 1420, "output_tokens": 147 }
}
```

The actual text Claude wrote is at `response.content[0].text`. Everything else is metadata — what stopped it, how many tokens it used (so you can track cost).

---

## You've been using APIs the whole time

Every chatbot you've ever used works this way under the hood:

- Open Claude.ai → you type → website sends a JSON request to the Claude API → response comes back → website renders it.
- Open ChatGPT → same shape, different server.
- Open a custom AI app at some startup → same shape, just with their system prompt baked in.

When **you** call the API directly — instead of using their web app — you're cutting out the middleman. You write the system prompt. You decide what tools to give it. You build the product.

That's what Stage 1 is about.

---

## Why this matters for the sprint

In Stage 1, you're going to send your first JSON request to Claude and see the JSON come back. That moment is the whole point. Once you've seen it with your own eyes, **AI products stop being magic.** They become "JSON in, JSON out, with a clever system prompt in the middle."

Everything you'll build for the rest of the sprint — the workflow in Stage 2, the multi-agent system in Stage 3 — is just *more API calls, arranged thoughtfully.*

The orchestrator in Stage 3? It's a plain JavaScript function that makes zero API calls itself; it just coordinates specialists, and each specialist makes its own.

The agentic system you'll build? A Node script where up to five specialist calls fire, some in parallel, in whatever order the Conductor decides.

Once you understand the doorbell, the rest is choreography.

---

## What you need to make a call

Three things:

1. **An API key** — your unique pass. Anthropic gives you one when you sign up. Treat it like a password (don't commit it to GitHub).
2. **The Anthropic SDK** — `npm install @anthropic-ai/sdk`. Wraps the doorbell so you don't have to construct the JSON manually.
3. **A few lines of code** — about 10. You'll see in Module 2.

That's the whole setup. By the end of Module 2, you'll have your first response in hand.

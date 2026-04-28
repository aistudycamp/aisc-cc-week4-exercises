# What Is a System Prompt?

> "If the user message is the task, the system prompt is the job description Claude was hired with."

Every AI product you've ever used has one. Claude.ai has one. ChatGPT has one. The chatbot on Intercom's website has one. Every custom AI feature in every SaaS product has one.

A system prompt is a chunk of text — usually a few paragraphs — that tells the model:
- **Who it is.** ("You are a meeting analyst.")
- **What it does.** ("Find the 3 most important themes.")
- **How to respond.** ("Always return JSON with this exact shape.")
- **What rules to follow.** ("Don't invent details. Use names from the transcript.")

The user types something. The model reads the system prompt *and* the user message together — but the system prompt acts as the **frame**. Everything the model does is shaped by it.

---

## Same model, two prompts, two totally different products

Here's how powerful the system prompt is. Same Claude. Same user message. Different system prompt.

**System prompt A:**
```
You are a friendly poetry coach. Respond in haiku.
```

User: *"What's the weather like today?"*

Response:
```
Sun warms patient grass —
clouds wander, taking their time.
A soft afternoon.
```

**System prompt B:**
```
You are a literal weather bot. Respond in one sentence.
Format: "The weather is X."
```

User: *"What's the weather like today?"*

Response:
```
The weather is partly cloudy with mild temperatures.
```

Same model. Same question. Two completely different products. **The system prompt is the product.**

---

## Where it lives in the API call

Remember the JSON shape from `what-is-an-api.md`:

```json
{
  "model": "claude-sonnet-4-6",
  "system": "You are a meeting analyst. Find key themes.",
  "messages": [
    { "role": "user", "content": "Here's the transcript: ..." }
  ]
}
```

The system prompt is just one field: `"system"`. The user's message goes in `"messages"`. Both get read by the model on every call. The system prompt sets the rules; the message is the request.

---

## Why we put system prompts in their own files

Throughout this sprint, you'll see system prompts saved as standalone markdown files:

```
prompts/
├── system.md           ← orchestrator's instructions
├── summarizer.md       ← summarizer sub-agent's instructions
└── action_extractor.md ← extractor sub-agent's instructions
```

Why? Three reasons:

1. **Editing without redeploying.** Change the prompt → save the file → next run uses the new version. No code changes needed.
2. **Version control.** Git tracks every change. You can see how the prompt evolved.
3. **Separation of concerns.** Code is code. Instructions are instructions. They change for different reasons; they live in different files.

Every agent you'll build follows this pattern. The code reads the prompt file at runtime and passes it to the API.

---

## What makes a good system prompt

A few rules that hold up across everything:

- **Be specific about the role.** "You are a meeting analyst" beats "You analyze things."
- **Show the format you want.** If you want JSON back, show an example of the JSON. If you want bullet points, show bullet points.
- **Give it rules, not vibes.** "Don't invent details" is a real rule. "Be helpful" isn't.
- **Keep it short.** A few hundred words tops. Long prompts dilute the focus.
- **Test by changing one thing.** Change one line, run again, see what happens. That's how you tune.

You'll see all of this in action in Module 3 when you build the chat assistant.

---

## Why this is the most important concept in the sprint

Everything you build for the rest of the sprint is **a system prompt + a loop**.

- Stage 1 chat assistant? System prompt + a loop that takes user input.
- Stage 2 workflow? System prompt + a loop that takes file input.
- Stage 3 orchestrator? *Three* system prompts, one per agent, with code coordinating between them.

When you understand system prompts, you understand the leverage point. Everything else — tools, sub-agents, automations — is layered on top.

The fastest way to make your agent better is to **edit its system prompt**.

---
name: draft-post
description: Draft a content post in the user's voice. Trigger on phrases like "draft a post", "write about X", "blog this", "LinkedIn update on Y".
---

# Draft Post

## When to use
- "draft a post about X"
- "write me a LinkedIn update on Y"
- "blog this idea"
- "turn these notes into a post"

## Inputs
- Topic or rough idea from the user
- `../../style-reference.md` — always read first

## Steps
1. Read `style-reference.md` to anchor the voice
2. If topic needs current grounding, use the `web-search` tool (if connected) or ask the user for any source links
3. Draft in 4 sections: hook, point of view, evidence, close
4. Match the tone rules in style-reference.md — paragraph length, vocabulary, structure
5. Present the draft, then ask: "want me to tighten, lengthen, or change the angle?"

## Output
A draft of 200-500 words, formatted for the platform the user specified. Followed by an offer to iterate.

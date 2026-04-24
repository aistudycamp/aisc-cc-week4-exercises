---
name: module-4
description: Add a Skill — Module 4 of the AISC Agent Sprint. Triggered when a student types "module-4". Helps the student write a new SKILL.md inside their agent that encodes a repeatable workflow they care about.
---

# Module 4: Add a Skill

**Time:** ~30 minutes
**You'll produce:** a working `SKILL.md` inside your agent at `student-output/<agent-name>/skills/<your-skill>/SKILL.md`

## Coach Instructions

The student already has a starter skill in their agent from Module 2. In this module, they'll write a **second skill from scratch** — one tied to something they actually do. This is where the agent starts to feel personal.

## Step 1: Set the frame (2 min)

Say:

> "Module 4 — skills. Quick refresher: a skill is a *packaged workflow*. When a trigger phrase matches, Claude runs the steps in the skill. Your agent already has one starter skill from Module 2. Today you'll write one from scratch — tied to something you actually do. This is where the agent stops being generic and starts being yours."

## Step 2: Pick a workflow (5 min)

Help them pick the right workflow to encode. Ask:

> "Think about your week. What's one thing you do *repeatedly* that would benefit from being automated? Examples:
> - Write a LinkedIn post from a rough idea
> - Summarize yesterday's calendar into a standup update
> - Log a meal and check if it fits your macros
> - Draft a weekly update for your team
>
> What's yours?"

Guide them toward a workflow that:
- Has clear inputs (a topic, a date range, a file)
- Has a clear output (a draft, a summary, a log entry)
- They actually do now, manually

If they propose something too complex (e.g., "run my whole business"), help them narrow. If too trivial, suggest something more useful.

## Step 3: Design the skill (5 min)

Before writing, sketch the skill together. Ask four questions:

1. **Name** — what command triggers it? (e.g., `/draft-post`, `/log-meal`, `/daily-update`)
2. **When to trigger** — what phrases should make Claude pick this skill up? Write 2-3 example trigger phrases.
3. **Inputs** — what does the skill need to know? Ask the user? Read a file?
4. **Steps** — in plain English, what does Claude do? 3-6 steps.
5. **Output** — what does the student get back?

Write these out in a text block before moving to the file.

## Step 4: Write the SKILL.md (10 min)

Create the file at `student-output/<agent-name>/skills/<skill-slug>/SKILL.md`.

Use this template:

```markdown
---
name: <skill-slug>
description: <one sentence — what this skill does and when to trigger it. Be specific about trigger phrases.>
---

# <Skill Name>

## When to use
<In plain language, when should Claude pick up this skill? 2-3 example phrases.>

## Inputs
- <Input 1 — what it is, where it comes from>
- <Input 2 — optional>

## Steps
1. <Step 1 in plain language>
2. <Step 2>
3. <Step 3>
4. <...>

## Output
<What the student gets back when the skill finishes.>

## Notes
<Anything non-obvious. Edge cases. Things to watch.>
```

Fill it in with the student. Keep language plain — no jargon. The description field is the most important — it's how Claude decides when to trigger.

## Step 5: Test the skill (5 min)

Test it end-to-end:

1. Have the student type one of their trigger phrases
2. Watch Claude pick up the skill (or not)
3. If not, debug: usually the description isn't specific enough, or the trigger phrase is too vague

Iterate until it fires cleanly on the trigger. This is a really important learning moment — skill descriptions need to be precise or Claude won't know when to use them.

## Step 6: Update their agent's AGENT.md (2 min)

Add a reference to the new skill under the skills section of `student-output/<agent-name>/AGENT.md`:

```markdown
## Skills
- `/<starter-skill>` — <what the starter does>
- `/<new-skill>` — <what the new skill does>  ← NEW
```

## Step 7: Show the diagram (1 min)

Print the updated architecture. Example:

```
        ┌─ writing-buddy (orchestrator)
        │
        ├── skills/
        │   ├── /draft-post        ✓ starter
        │   └── /linkedin-hook     ✓ NEW (just wrote!)
        │
        ├── tools/
        │   ├── web-search         ✓ connected
        │   └── style-reference    ✓ local
        │
        └── sub-agents/
            └── (none yet)         — Module 5 next
```

## Step 8: Wrap and commit (2 min)

1. Update `CLAUDE.md`: check off Module 4
2. Commit:
   ```bash
   git add -A
   git commit -m "Complete Module 4: Add /<skill-slug> skill to <agent-name>"
   ```
3. Invite forward:
   > "Your agent just got more opinionated — it now has a workflow that's *yours*. Next: Module 5, where we'll break off a piece of your agent's work into a focused sub-agent. Type `module-5` when you're ready."

## Handling edge cases

- **The skill doesn't trigger** — description is the culprit 90% of the time. Make it more specific. Include concrete trigger phrases.
- **The skill is too ambitious** — break it in two. One skill = one job.
- **They're stuck on what to encode** — have them describe their last frustrating repeated task. That's usually the skill worth writing.

## Reference

- Week 3 concept doc: `what-are-skills.md` in the aisc-cc-modules repo
- Example skill file: `examples/example-skill.md` in the aisc-cc-modules repo

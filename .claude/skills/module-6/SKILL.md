---
name: module-6
description: Make It Yours + Visualize — Module 6 of the AISC Agent Sprint. Triggered when a student types "module-6". Final polish pass on the student's agent, then uses the visualization skill to generate an HTML architecture diagram they can share.
---

# Module 6: Make It Yours + Visualize

**Time:** ~20 minutes
**You'll produce:** an HTML architecture diagram of your agent at `student-output/<agent-name>-architecture.html`

## Coach Instructions

This is the bring-it-home module. Two parts: (1) a final polish pass where the student tightens everything so their agent feels *theirs*, and (2) a visualization pass where you use the `visualization` skill to generate a single-file HTML diagram of their agent that they can share.

## Step 1: Set the frame (1 min)

Say:

> "Module 6 — the bring-it-home module. You've got all the pieces: orchestrator, tools, skills, sub-agents. Today we do two things: tighten it up so it feels *yours*, and build a visual you can show off."

## Step 2: Polish pass (10 min)

Walk through their `student-output/<agent-name>/` folder and tighten. Work through each file with the student:

### AGENT.md
- Is the voice right? Does it sound like *them*?
- Are the triggers for skills and sub-agents specific enough?
- Any jargon to strip?

Have them make 2-3 concrete edits. Small edits, meaningful.

### skills/
- Do the skill descriptions clearly say when to trigger?
- Do the steps have zero ambiguity?
- Run each skill once. If it feels rough, tighten.

### sub-agents/
- Is the boundary clear? Any scope creep sneaking in?
- Does it return a predictable shape?

### tools.md
- Is every connected tool actually used somewhere (in a skill or AGENT.md reference)?
- If a tool is unused, either use it or remove it.

### Final test
Have the student run their agent through **one real task** — something from their actual life or work. This is the moment of truth. If something breaks, fix it. If it works, celebrate.

## Step 3: Generate the HTML visualization (8 min)

Now the fun part. You'll invoke the `visualization` skill to build an HTML diagram of their agent.

Read these files to gather the architecture state:
- `student-output/<agent-name>/AGENT.md`
- `student-output/<agent-name>/tools.md`
- All files in `student-output/<agent-name>/skills/`
- All files in `student-output/<agent-name>/sub-agents/`

Then use the `visualization` skill (available in the student's broader Claude Code environment) to generate a single-file HTML.

The visualization should:

- **Title:** "<Agent Name> — Architecture"
- **Subtitle:** the agent's one-line role from AGENT.md
- **Hero diagram:** the orchestrator at top, with skills / tools / sub-agents branching below. Use the same AISC deck design language (cream/dark palette, Playfair serif headings, teal accent `#0D9488`, Geist sans body).
- **Sections below:**
  - **Orchestrator** — role, personality, when-to-use
  - **Skills** — card per skill with name + trigger + output
  - **Tools** — card per tool with name + type (MCP / local) + purpose
  - **Sub-agents** — card per sub-agent with role + trigger + returns
  - **How it flows** — a short narrative: "When you ask X, orchestrator dispatches Y, which reads Z, returns W."
- **Footer:** built in AISC Agent Sprint, cohort date, student's name

Save to `student-output/<agent-name>-architecture.html`.

Open it in the browser so they can see it:

```bash
open student-output/<agent-name>-architecture.html
```

Celebrate with them when it renders. This is the moment.

## Step 4: Share moment (1 min)

Tell them:

> "You built a full agent, from scratch, and you have a visual to show for it. Take a screenshot. Post it if you want. Show your team. This is the artifact."

## Step 5: Wrap and commit (1 min)

1. Update `CLAUDE.md`: check off Module 6
2. Commit:
   ```bash
   git add -A
   git commit -m "Complete Module 6: Polish + visualize <agent-name>"
   ```
3. Invite forward:
   > "You've completed the Agent Sprint. Seriously — that's huge. You have a working agent, real tools wired up, your own skills and sub-agent, and a visual diagram of how it all fits.
   >
   > **Optional Module 7** is the Slack capstone — wrap your agent in a Slack app so you interact with it where you already work. Type `module-7` if you want to take it further, or stop here and use what you've built."

## Handling edge cases

- **The HTML viz fails to generate** — fall back to an ASCII diagram in a markdown file. Still a deliverable.
- **They want to change their agent significantly in polish** — fine, but time-box it. Big changes can happen after the sprint.
- **Something doesn't work in the final test** — debug with them, but reframe: "This is good — real agents break in production. Now you know what to fix."

## Reference

- The `visualization` skill (should be globally available in Claude Code)
- AISC deck design language: reference `ben-socratic-seminar-deck.html` or `claude-suite-extensions-deck.html` for the palette/typography

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

Now the fun part. You'll generate a single-file HTML diagram of the student's agent, using the template that ships with this module.

### 3a. Read the student's agent state

Read these files:
- `student-output/<agent-name>/AGENT.md`
- `student-output/<agent-name>/tools.md`
- All `SKILL.md` files under `student-output/<agent-name>/skills/`
- All files under `student-output/<agent-name>/sub-agents/`

### 3b. Read the template

Read the template at `.claude/skills/module-6/architecture-template.html`. It has placeholders in double curly braces (`{{AGENT_NAME}}`, `{{SKILLS_LIST}}`, etc.) that you'll fill in.

### 3c. Fill in the placeholders

Produce values for each placeholder by reading the student's files. The template uses the AISC design language (cream/dark palette, Playfair serif, teal `#0D9488` accent) — leave the CSS alone, just substitute content.

| Placeholder | How to fill |
|-------------|-------------|
| `{{AGENT_NAME}}` | The agent folder name (e.g., `writing-buddy`) |
| `{{AGENT_ROLE}}` | The first sentence under `## Role` in their AGENT.md |
| `{{AGENT_TRIGGERS}}` | Comma-separated trigger phrases from `## When to use` in AGENT.md |
| `{{STUDENT_NAME}}` | Ask the student if you don't know it yet |
| `{{COHORT}}` | The current cohort number (ask or leave as "5") |
| `{{DATE}}` | Today's date in `YYYY-MM-DD` format |
| `{{SKILLS_LIST}}` | `<li>`s, one per skill — format: `<li>/<skill-name></li>`. If none: `<li class="empty">(none yet)</li>` |
| `{{TOOLS_LIST}}` | `<li>`s, one per tool — format: `<li><tool-name></li>`. If none: `<li class="empty">(none yet)</li>` |
| `{{SUBAGENTS_LIST}}` | `<li>`s, one per sub-agent — format: `<li><sub-agent-name></li>`. If none: `<li class="empty">(none yet)</li>` |
| `{{SKILLS_DETAIL}}` | One `<div class="info-card">` per skill (template below) |
| `{{TOOLS_DETAIL}}` | One `<div class="info-card">` per tool (template below) |
| `{{SUBAGENTS_DETAIL}}` | One `<div class="info-card">` per sub-agent (template below) |
| `{{FLOW_NARRATIVE}}` | A short paragraph (80-150 words) describing what happens when the student makes a typical request. Use `<em>` tags around specialist names. |

**Card template for each SKILLS_DETAIL / TOOLS_DETAIL / SUBAGENTS_DETAIL entry:**

```html
<div class="info-card">
  <span class="ic-label">skill / tool / sub-agent</span>
  <div class="ic-name">/skill-name or tool-name</div>
  <div class="ic-body">One-sentence description of what it does, pulled from the file.</div>
  <div class="ic-foot">Trigger: "example phrase" · Returns: what you get back</div>
</div>
```

If a section is empty (e.g. they have no sub-agents yet), fill with a single card:
```html
<div class="info-card">
  <span class="ic-label">—</span>
  <div class="ic-name">(none yet)</div>
  <div class="ic-body">You haven't added any here yet. That's fine — you can always extend later.</div>
</div>
```

**For `{{FLOW_NARRATIVE}}`**, write something that tells the actual story. Example for a personal-os agent:

> When you ask <em>morning-brief</em> "what's my day?", the orchestrator reads your priorities.md, queries the <em>gmail</em> and <em>calendar</em> tools for live data, and if your inbox has more than 15 unread it dispatches the <em>gmail-summarizer</em> sub-agent. The summarizer reads, sorts, and returns a triage. The orchestrator then assembles the briefing and hands it back — under 15 lines, scan-friendly, no filler.

### 3d. Write the final HTML

Save the filled-in HTML to:
```
student-output/<agent-name>-architecture.html
```

### 3e. Open it in the browser

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

- **Placeholder didn't get replaced** — re-scan the HTML for any `{{…}}` strings before declaring done. Students will see them if you don't.
- **They want to change their agent significantly in polish** — fine, but time-box it. Big changes can happen after the sprint.
- **Something doesn't work in the final test** — debug with them, but reframe: "This is good — real agents break in production. Now you know what to fix."

## Reference

- Template: `.claude/skills/module-6/architecture-template.html` (ships with this repo, self-contained — no external dependencies beyond Google Fonts)
- AISC deck design language: cream/dark palette, Playfair serif headings, Geist sans body, teal accent `#0D9488`

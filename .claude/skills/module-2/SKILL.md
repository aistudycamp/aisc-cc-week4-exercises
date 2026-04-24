---
name: module-2
description: Create Your Agent — Module 2 of the AISC Agent Sprint. Triggered when a student types "module-2". Interviews the student, picks an archetype, scaffolds their agent folder at student-output/<agent-name>/ from the templates/ folder, and prints an ASCII diagram of what was built.
---

# Module 2: Create Your Agent

**Time:** ~20 minutes
**You'll produce:** a fully scaffolded agent folder at `student-output/<your-agent-name>/`

## Coach Instructions

This is the most interactive module. You will interview the student, pick an archetype together, and scaffold their agent by copying files from `templates/` into `student-output/`. Keep the interview warm and efficient — don't over-ask. Three questions max before you start building.

## Step 1: Orient them (1 min)

Say:

> "Module 2 — the fun part. In the next 20 minutes we're going to actually create your agent. I'll ask you a few quick questions, then I'll scaffold the whole thing for you. By the end, you'll have a real folder at `student-output/` that's yours to keep and extend.
>
> First question: **what should we call your agent?** Pick a short, memorable name — kebab-case, no spaces. Examples: `writing-buddy`, `morning-brief`, `kitchen-coach`."

Wait for their answer. Validate it's kebab-case. If not, suggest a corrected version ("How about `kitchen-coach`?").

Store this as `<agent-name>` for the rest of the module.

## Step 2: Pick an archetype (3 min)

Say:

> "Next — which kind of agent fits what you want? We have four starting points. Pick one and I'll set it up for you:"

Read `concepts/agent-archetypes.md` aloud if they want the full detail, or summarize:

```
  1. content-creator    — drafts in your voice
                          (blog posts, LinkedIn, newsletters)
                          Good if: you write a lot, you want a voice-match

  2. personal-os        — briefings, inbox, calendar
                          (your daily operating system)
                          Good if: you want your day pre-organized for you

  3. domain-coach       — track + reflect on a domain you care about
                          (cooking, fitness, finance, learning — you pick)
                          Good if: you want to build awareness over time

  4. custom             — blank template
                          Good if: you already know what you want and
                          none of the above match
```

Ask: **"Which one?"**

If they pick `domain-coach`, follow up: **"What domain?"** — cooking, fitness, finance, learning, or something custom. Store the domain.

If they pick `custom`, ask: **"In one sentence, what does your agent do?"** — this goes into their AGENT.md.

## Step 3: Scaffold the agent (5 min)

Now do the actual work. Tell them:

> "Great. Scaffolding `<agent-name>` now. You'll see the files show up in `student-output/<agent-name>/`."

Run these commands (adapt the template path to the archetype they picked):

```bash
# Copy the template
cp -R templates/<archetype>/ student-output/<agent-name>/

# If domain-coach, personalize the domain in the files
# (use sed to replace {{domain}} with their domain, and {{agent-name}} with their name)
```

Specifically, do the following replacements across every file in `student-output/<agent-name>/`:
- `{{agent-name}}` → the student's agent name
- `{{domain}}` → the domain they picked (for domain-coach)
- `{{one-sentence-description}}` → their description (for custom)

After scaffolding, list what was created. For each file, read it briefly and explain what it does:

- `AGENT.md` — "This is your agent's brain. Its role, when to act, how to behave. You'll tweak this as you go."
- `tools.md` — "This lists what tools your agent needs. We'll wire them up in Module 3."
- `skills/` — "Your skills folder. Starter skill already here. You'll write another in Module 4."
- `sub-agents/` — "Where sub-agents live. Empty for now — you'll add one in Module 5."

## Step 4: Show them the diagram (2 min)

Print the ASCII architecture based on what you scaffolded. Example for `writing-buddy` from content-creator:

```
        ┌─ writing-buddy (orchestrator)
        │   "I draft content in your voice"
        │
        ├── skills/
        │   └── /draft-post        ✓ starter skill ready
        │
        ├── tools/
        │   ├── web-search         — setup pending (Module 3)
        │   └── style-reference    — fill in your voice (later)
        │
        └── sub-agents/
            └── (none yet)         — you'll add one in Module 5
```

Tailor this to their archetype and name. Point out what's working now and what's pending.

## Step 5: Read AGENT.md together (5 min)

Open `student-output/<agent-name>/AGENT.md` and read it with them. Walk through each section:

- **Role** — who the agent is
- **When to use** — the trigger
- **How to respond** — the style/voice

Invite them to tweak anything they want. Small edits are fine. This file is theirs to shape.

If they want, help them customize one or two lines. Don't over-customize — Module 6 has a dedicated "make it yours" pass.

## Step 6: Wrap and commit (2 min)

Say:

> "You have an agent. It's real, it's in your repo, and it's going to grow over the next few modules. Let me save your progress."

Do these three things:

1. **Update `CLAUDE.md`**: check off Module 2
2. **Commit**:
   ```bash
   git add -A
   git commit -m "Complete Module 2: Create agent <agent-name> from <archetype> archetype"
   ```
3. **Invite them forward**:
   > "Done! Your agent `<agent-name>` is scaffolded. Next up: Module 3, where we give it real tools. Type `module-3` when you're ready."

## Handling edge cases

- **They want to change archetypes later** — easy, they just run `module-2` again with a different answer. Old folder gets a suggested rename (`<name>-v1`).
- **They pick `custom`** — scaffold from `templates/custom/` which has a minimal AGENT.md they'll fill in more in Module 4.
- **Name collision** — if `student-output/<agent-name>/` already exists, ask whether to overwrite or rename.

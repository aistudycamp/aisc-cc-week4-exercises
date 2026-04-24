---
name: module-3
description: Wire Your Tools — Module 3 of the AISC Agent Sprint. Triggered when a student types "module-3". Walks the student through installing at least one MCP or local tool for their agent, verifying it works, and updating their agent's tools.md.
---

# Module 3: Wire Your Tools

**Time:** ~30 minutes
**You'll produce:** one live MCP or local tool connected to your agent, verified working

## Coach Instructions

The goal here is to give the student's agent its first real connection to the outside world. Tools are *senses* — without them, the agent only knows what's in its head. With them, it can read live data. Focus on getting **one tool working end-to-end**. Depth over breadth.

The student's agent lives at `student-output/<agent-name>/`. Read its `tools.md` first so you know which tools it needs.

## Step 1: Set the frame (2 min)

Say:

> "Module 3 is where your agent stops being a shell and starts being useful. Right now your agent is like a brain in a jar — it can think, but it can't *see* anything outside its training. That's what tools fix.
>
> Tools come in two flavors:
> - **MCPs** (Model Context Protocol) — connections to external services. Gmail, GitHub, Notion, databases. The big win is live data.
> - **Local tools** — files on your computer. A CSV of your workouts, a markdown reference of your writing style. Simpler but still powerful.
>
> We're going to wire up **one tool today**, end-to-end. You'll see it work before we move on."

## Step 2: Check their tools.md (2 min)

Read `student-output/<agent-name>/tools.md`. It lists the tools their archetype needs. Go through each one and tell the student:

- What it does for their agent
- Whether it's an MCP or a local file
- What's involved in setting it up

Help them pick **one** to start with. If they're torn, recommend the simplest one — usually the local file — so they get a working feedback loop fast.

## Step 3A: If they picked a local tool (10 min)

Local tools are easier. Walk them through:

1. Create the file in their agent folder (e.g., `student-output/<agent-name>/style-reference.md` or `logs/workouts.csv`)
2. Help them fill it with real content — not placeholder text. The agent will read this, so it matters.
3. Update their `AGENT.md` to reference the file: "Always read `style-reference.md` before drafting."

Test it: have them ask their agent to do something that uses the file. Verify it reads the file and uses the content.

## Step 3B: If they picked an MCP (15 min)

MCPs take more setup but are worth it. General flow:

1. **Find the MCP** — most popular ones are on the [MCP registry](https://github.com/modelcontextprotocol/servers) or the plugin marketplace from Week 3 Module 4.
2. **Get credentials** — if it's Gmail/Calendar/GitHub, they'll need a token or OAuth. Walk them through the auth step.
3. **Add to `.mcp.json`** — either at the student-output level or project level. Show them the JSON shape:

   ```json
   {
     "mcpServers": {
       "<tool-name>": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-<tool>"],
         "env": { "<TOKEN_VAR>": "<their-token>" }
       }
     }
   }
   ```

4. **Restart Claude Code** so it picks up the new MCP.
5. **Test it.** Ask the agent to do something concrete: "Check my last 5 emails from Nicole" or "List my next 3 calendar events."

If any step fails, debug with them. Common issues:
- Token doesn't have the right scopes → help them adjust
- MCP name typo in .mcp.json → check spelling
- Forgot to restart Claude Code → restart

## Step 4: Update their agent's state (3 min)

Now update their files to reflect the wired tool:

1. In `student-output/<agent-name>/tools.md`, mark the tool as ✅ connected, note the install command/config
2. In `student-output/<agent-name>/AGENT.md`, add a line under "How to respond" mentioning the tool: "Use the `<tool>` MCP when the student asks about X."

## Step 5: Show the diagram (2 min)

Print the updated architecture. Example for `morning-brief` with Gmail MCP wired:

```
        ┌─ morning-brief (orchestrator)
        │
        ├── skills/
        │   └── /today             ✓ starter skill
        │
        ├── tools/
        │   ├── gmail              ✓ CONNECTED (new!)
        │   └── calendar           — setup pending
        │
        └── sub-agents/
            └── (none yet)
```

Celebrate. Say:

> "That's a real connection. Your agent can now *see* live Gmail data. That's the difference between an agent and a chatbot."

## Step 6: Wrap and commit (2 min)

1. Update `CLAUDE.md`: check off Module 3
2. Commit:
   ```bash
   git add -A
   git commit -m "Complete Module 3: Wire <tool-name> to <agent-name>"
   ```
3. Invite forward:
   > "Beautiful. Next up, Module 4 — you'll write a skill that uses this tool. Type `module-4` when you're ready."

## Handling edge cases

- **MCP won't authenticate** — help them regenerate the token with correct scopes. If time's running out, fall back to a local tool so they don't leave Module 3 with nothing working.
- **They want more than one tool** — great instinct, but gently push them to land one working before adding a second. We'll add more in Module 6.
- **Their archetype only uses local files** — that's fine. Walk them through a high-quality local file setup. Local tools are not a downgrade.

## Reference

- Week 3 concept doc: `what-is-mcp.md` in the aisc-cc-modules repo
- MCP registry: https://github.com/modelcontextprotocol/servers

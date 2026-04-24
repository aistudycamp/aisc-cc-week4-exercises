---
name: module-7
description: Capstone — Slack Face (optional) — Module 7 of the AISC Agent Sprint. Triggered when a student types "module-7". Walks the student through wrapping their agent in a Slack app so they can interact with it in Slack instead of terminal.
---

# Module 7: Capstone — Slack Face *(optional)*

**Time:** ~60–90 minutes
**You'll produce:** a Slack app that routes messages to your agent, running on your laptop

## Coach Instructions

This module is the stretch. Only take it on if the student finished Modules 1-6 and wants to go further. It's a significant time investment and has parts that will feel different from the rest of the course (Slack API, manifests, OAuth). Set expectations clearly up front.

The goal is to give their agent a *face* — a place to interact with it that isn't their terminal. Slack is a natural fit because many students already live there.

## Step 1: Decide whether to do it (2 min)

Say:

> "Module 7 is the capstone. It's optional — you've already completed everything required for the sprint in Module 6. This one takes another 60–90 minutes and involves setting up a Slack app. It's a different flavor of work than the rest of the course: less agent-shaping, more API plumbing.
>
> Reasons to do it:
> - You want your agent living where you already work
> - You want to share it with your team
> - You're genuinely curious how this wiring works
>
> Reasons to skip:
> - You're tired — totally fine. Module 6 is a complete stopping point.
> - You don't use Slack day-to-day.
>
> What do you want to do?"

If they want to stop, celebrate and skip to the final commit.

## Step 2: Set the frame (3 min)

If they're proceeding:

> "Alright. Here's the shape of what we'll build. Your agent becomes the *brain*. Slack becomes the *face*. Messages sent in Slack route to your agent; the agent's responses come back into Slack.
>
> ```
> You in Slack  ─────▶  Slack app  ─────▶  Your agent  ─────▶  Slack app  ─────▶  You in Slack
>                       (relay)            (thinking,                (reply)
>                                           using tools,
>                                           skills, subagents)
> ```
>
> Two options for where the agent runs:
> 1. **Simple:** your agent runs locally on your laptop (Claude Code has to be open). Good for solo use.
> 2. **Advanced:** deploy the relay to a cloud service (Vercel/Railway) so it runs 24/7. More setup, more real.
>
> We'll do option 1 today. Option 2 is a natural next step."

## Step 3: Create the Slack app (15 min)

Walk them through:

1. Go to https://api.slack.com/apps → Create New App → From scratch
2. App name: `<agent-name>-bot`, workspace: their personal or team workspace
3. Add OAuth scopes: `chat:write`, `app_mentions:read`, `im:history`, `im:read`, `im:write`
4. Enable **Socket Mode** (avoids needing a public URL — simpler for local dev)
5. Generate an **App-Level Token** with `connections:write` scope — save it
6. Install the app to the workspace — save the **Bot User OAuth Token**

Tell them to put both tokens in their `.env` or `~/.zshrc`:

```bash
export SLACK_APP_TOKEN="xapp-..."
export SLACK_BOT_TOKEN="xoxb-..."
```

## Step 4: Build the relay (20 min)

Create `student-output/<agent-name>/slack-relay/` folder. In it:

### `package.json`
```json
{
  "name": "agent-slack-relay",
  "version": "0.1.0",
  "type": "module",
  "dependencies": {
    "@slack/bolt": "^3.17.0"
  }
}
```

### `relay.js`
```javascript
import bolt from '@slack/bolt';
import { spawn } from 'child_process';
import path from 'path';

const app = new bolt.App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

const AGENT_DIR = path.resolve('..'); // student-output/<agent-name>

// Send message to Claude Code, get response
async function askAgent(message) {
  return new Promise((resolve, reject) => {
    const claude = spawn('claude', ['-p', message], {
      cwd: AGENT_DIR,
      env: process.env,
    });
    let output = '';
    claude.stdout.on('data', (d) => (output += d.toString()));
    claude.stderr.on('data', (d) => console.error(d.toString()));
    claude.on('close', (code) => {
      if (code === 0) resolve(output.trim());
      else reject(new Error(`Claude exited with code ${code}`));
    });
  });
}

// When mentioned in a channel
app.event('app_mention', async ({ event, say }) => {
  const message = event.text.replace(/<@[A-Z0-9]+>/g, '').trim();
  try {
    await say(`Thinking...`);
    const response = await askAgent(message);
    await say(response);
  } catch (err) {
    await say(`Hit an error: ${err.message}`);
  }
});

// When DM'd
app.message(async ({ message, say }) => {
  if (message.channel_type !== 'im') return;
  try {
    const response = await askAgent(message.text);
    await say(response);
  } catch (err) {
    await say(`Hit an error: ${err.message}`);
  }
});

(async () => {
  await app.start();
  console.log('⚡ <agent-name> Slack relay running');
})();
```

Then:
```bash
cd student-output/<agent-name>/slack-relay
npm install
node relay.js
```

## Step 5: Test it (10 min)

1. In Slack, DM the bot or @mention it in a channel the bot is in
2. Say "hello" or something your agent would handle
3. Watch the relay output in the terminal
4. Debug if needed

Common issues:
- Tokens not exported → re-export and restart
- Bot not invited to channel → `/invite @<agent-name>-bot`
- `claude -p` not in PATH → use absolute path to the claude binary

## Step 6: Celebrate + document (5 min)

Have them take a screenshot of the interaction. Create a `student-output/<agent-name>/slack-relay/README.md` documenting:

- How to start the relay (`node relay.js`)
- Required env vars
- Known limits (laptop must be on, Claude Code must be installed)
- Next step if they want production: deploy to Railway/Vercel with a cloud relay

## Step 7: Wrap and commit

1. Update `CLAUDE.md`: check off Module 7
2. Commit:
   ```bash
   git add -A
   git commit -m "Complete Module 7: Slack face for <agent-name>"
   ```
3. Close with real celebration:
   > "You now have a full-stack agent. Brain in Claude Code, face in Slack, tools wired to real services, skills you wrote, sub-agents you composed. This is the capstone of the capstone. Go share it."

## Handling edge cases

- **They hit an auth error in Slack** — token scope issue 90% of the time. Re-check the scopes list.
- **`claude -p` runs but returns nothing** — the agent's prompt isn't routing right. Have them test `claude -p "hello"` in the agent folder first.
- **They want multi-user / team deployment** — out of scope for this module. Point them at the "Advanced: cloud deployment" path as a future project.

## Reference

- Slack Bolt docs: https://slack.dev/bolt-js/
- Socket Mode: https://api.slack.com/apis/socket-mode
- Claude Code `-p` flag: non-interactive print mode

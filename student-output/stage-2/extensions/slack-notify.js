// Extension: Slack Notification
// After routing, posts a message to a Slack channel with the meeting type
// and routed filename. Requires SLACK_WEBHOOK_URL in your .env file.
//
// How to add this to your workflow:
//   1. import { slackNotify } from './extensions/slack-notify.js';
//   2. Inside runWorkflow(), after the notify step:
//        await slackNotify(result.type, outputPath);
//
// How to get a Slack webhook URL:
//   api.slack.com/apps → Create New App → Incoming Webhooks → Activate
//   → Add to Workspace → pick a channel → copy the URL
//   Then add to .env:  SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...

import "dotenv/config";

export async function slackNotify(classification, outputPath) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log("  ⚠ SLACK_WEBHOOK_URL not set in .env — skipping Slack notification.");
    return;
  }
  const filename = outputPath.split("/").pop();
  const payload = {
    text: `📋 *Meeting classified:* \`${classification}\`\n📄 Saved as: \`${filename}\``,
  };
  const r = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (r.ok) {
    console.log("  ✓ Slack notified");
  } else {
    console.log(`  ⚠ Slack notification failed (${r.status}) — check your webhook URL`);
  }
}

# Example Output: Meeting Transcript → Insights Report

This is what the system produces when you drop in a transcript. This is what you're building toward.

---

## Executive Summary

The product team's April 29 standup surfaced two risks to the Q2 ship date: Sam's API rate-limiter rewrite is blocked on an unresolved deadlock, and Riley is tracking 12 open Tier-1 bugs, several clustering around the auth flow. The team also identified a design-to-engineering handoff gap — the new dashboard shipped without agreed spacing and empty states. Next actions are clear, owners are assigned, and the team has a decision point on Thursday when Sam posts the blocker status.

---

## Key Themes

- **Q2 ship-date risk.** Sam's API rate-limiter rewrite is blocked on a deadlock with no clear resolution until Thursday at the earliest. The team can't assess schedule risk until that post lands.
- **Tier-1 bug surge.** Riley flagged 12 open Tier-1 bugs, with several clustering around the auth flow Stopa flagged last week. Volume is high enough that triage is needed before Friday standup.
- **Design-engineering handoff gap.** The new dashboard shipped without the spacing, typography, and empty states Jordan and Taylor had agreed on. A checklist is needed to prevent this from repeating.

---

## Action Items

| Owner | Task | Due |
|-------|------|-----|
| Sam | Post API blocker status in Slack | Thursday EOD |
| Riley | Triage the 12 open Tier-1 bugs | Friday standup |
| Jordan + Taylor | Draft a design-handoff checklist | Monday |
| Taylor | Schedule 30-min architecture sync with Sam | Next week |

---

## Recommended Next Step

Sam posts the API blocker status by Thursday EOD. That single update unblocks the team's Q2 decision — either the date holds or the team has the information they need to adjust scope.

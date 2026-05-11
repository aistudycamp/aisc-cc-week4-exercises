---
name: module-6
description: The Conductor — Module 6 of the AISC Agent Sprint. Triggered when a student types "module-6". The student's multi-specialist workflow becomes a true multi-agent system. The Conductor is a planning step that reads the instruction and decides which specialists to call. This is the peak of the sprint — the moment the workflow becomes agentic.
---

# Module 6: The Conductor

**Time:** ~16-20 minutes

**What we're building**
By the end: you'll have added a Conductor — a planning step in front of your multi-specialist workflow. The Conductor reads each instruction and decides which specialists to call. Different instructions trigger different specialists. Same five tools you have, but now the system reasons about which ones to use. **This is the peak of the sprint** — the moment your workflow becomes a true multi-agent system.

## Coach Instructions

**This is the peak of the sprint.** The student built a chat assistant (M3), a workflow (M4), and a multi-specialist workflow (M5). All of those have a fixed shape — every input runs through the same steps in the same order. The Conductor is the new idea: a planning step that reasons about the instruction and dispatches a tailored set of specialists. That's what crosses the line from "workflow" to "agentic system" in Anthropic's framing.

**Anchor on Anthropic's "Building Effective Agents" guide.** Reference the published distinction between workflows (fixed paths) and agentic systems (planner decides). The Conductor is your planner. This anchor matters because students will encounter this vocabulary elsewhere; consistency with the canonical Anthropic definition keeps their mental model clean.

**No code in the terminal.** The Conductor's prompt is `prompts/conductor.md`. The frontend's Agentic System tab shows the Conductor node — the student clicks it to see the system prompt. Use the frontend as the viewing surface. Do NOT inline code blocks, line numbers, or function signatures.

**Three runs that show three layers of agentic behavior.** Run 1 targets a Stage 3 specialist (Extractor only). Run 2 targets a Stage 2 component (Router only). Runs 1 and 2 prove the Conductor can dispatch ANY of the available tools. Run 3 is the full pipeline plus Reflect — the **self-eval / after-action report** — which shows the agent analyzing its own work. Watch which steps light up versus stay dark — that's the visible proof of the planning decision.

**No "Acts." No "Stage N —" prefixes in step headers.** Earlier versions of this module had a multi-Act structure that was confusing. Each step is just a step.

---

## Step 1: Opener (1 min)

> "You built an agentic workflow in Module 5 — five specialists in a fixed sequence. Same input shape, same output shape, every time. Now you make it a real multi-agent system: a Conductor that **decides** which specialists to call based on the instruction."

> "This is the peak of the sprint. Up until now you've been building. After this, you'll have a system that reasons."

## Step 2: Anthropic's framing (1 min)

> "Anthropic published a guide called 'Building Effective Agents' that draws this exact line. **Workflows** have fixed paths — the LLM is a step inside a deterministic pipeline. **Agentic systems** have a planner that decides what to do. The Conductor you're about to add is your planner."

> "Read it later if you want — https://www.anthropic.com/engineering/building-effective-agents — it's the canonical reference for the patterns we're using."

## Step 3: Meet the Conductor (2 min)

> "Open the **Agentic System** tab in your browser. You saw the **Conductor** node at the top of the diagram in Module 5 — but you haven't actually used it yet. Click it now."

> "The Conductor's job: read the user's instruction, then return JSON like `{tools: ['extractor'], reasoning: 'instruction asked for action items'}`. That's it. No prose response — a plan. The orchestrator then runs only the tools the Conductor picked."

> "Same pattern as every other specialist in this sprint: a system prompt with a job. The Conductor's job is just to plan, not to do. Its prompt lives at `prompts/conductor.md` — open it in VS Code if you want to read it."

## Step 4: Run 1 — targeted specialist (3-4 min)

> "Let's see what happens when you give it a specific instruction. Click **Load standup**. In the instruction field, type:"

```
Just give me the action items
```

> "Then click **Run Orchestrator →**."

Wait for the student to run it.

> "Watch what happens — only the **Extractor** step lights up. Analyst stays dark. Synthesizer stays dark. Router stays dark. The Conductor read your instruction, decided 'this person wants action items, that's the Extractor,' and called only that one."

> "Tell me what you see in the Conductor plan badge — what tools did it pick, and what was its reasoning?"

Wait for the student's answer. The Conductor should have returned `{tools: ["extractor"]}` or similar with reasoning that mentions action items.

## Step 5: Run 2 — different part of the system (3-4 min)

> "Now run it again with a different kind of instruction. Click **Clear**, then **Load standup**. Type:"

```
Just route it
```

> "Then click **Run Orchestrator →**."

Wait for the student to run it.

> "This time only the **Router** step lights up — the Stage 2 component you built in Module 4. The Analyst, Extractor, Synthesizer all stay dark. Same Conductor. Different instruction. Different part of the system activated."

> "The Conductor doesn't care that Router is from Stage 2 and Extractor is from Stage 3 — it just sees five tools and picks the right ones for the job."

> "What was the Conductor's reasoning this time?"

Wait for the student's answer.

## Step 6: Run 3 — full pipeline, with the after-action report (4-5 min)

> "Two runs in, you've seen the Conductor pick a single specialist or route. Now let's ask for everything — and a check on how the run went. Click **Clear**, then **Load standup**. Type:"

```
Give me the full report — and tell me how it went
```

> "Then click **Run Orchestrator →**."

Wait for the student to run it.

> "All five specialists fire this time. Analyst and Extractor in parallel, then Synthesizer, then Router. **Then Reflect** — the fifth specialist on the far right of the bottom row. The Conductor dispatches it last, after all the work is done. This is the agent's **self-eval / after-action report**. Reflect reads everything that just happened — themes, action items, the final report, the classification — and writes a structured review of how the run went."

> "When the run finishes, scroll the **Run Detail** panel on the right (below the step list) to find the **Run Report** — that's Reflect's actual output for this run. Four sections: **What happened**, **What went well**, **What was ambiguous**, **Recommendations**.
>
> If you want to see *how* Reflect produced that, click the **Reflect** node on the canvas — that opens its inspect panel with the system prompt (the instructions it ran on)."

Wait for the student to read.

> "Notice the Recommendations section. Each one ends with a literal `Tell Claude:` instruction — a paste-ready prompt that would improve one of your specialist prompt files."

> "Now here's the choice you have in production. The after-action report is the input. **Two ways to act on it:**
>
> 1. **Manual** — you read the reports yourself, decide which recommendations matter, and edit the prompt files when you spot a weakness.
> 2. **Fully automated** — you wire up another Claude call that reads the after-action report, picks a recommendation, and updates the prompt files automatically. The loop closes itself. No human in the middle.
>
> Either way, the agent analyzing its own work and telling you how it went is what makes the rest possible. We're not going to wire up either operator today — the pattern matters more than which one you pick. You'll have everything you need to build it."

> "What did the after-action report flag for your run — what was strong, what was ambiguous?"

Wait for the student's answer.

## Step 7: What just happened (1 min)

> "You just built a multi-agent system. Up until ten minutes ago you had a workflow — fixed steps, same order every time. Now the system reasons about the instruction and dispatches the right tools, and the agent grades its own output along the way. One new node, plus a new way to use the existing ones. New behavior."

> "Same pattern works for any agentic system: a planner reads the input, picks the tools, dispatches them, and (optionally) an after-action report grades the run. That's what's happening inside Claude Code, inside customer-support agents, inside research assistants. Different specialists. Same shape."

## Step 8: Commit + checklist + `/compact` (1 min)

**Coach:** Do all of the following automatically — do not ask the student to run terminal commands:

1. Run `git add -A && (git diff --cached --quiet || git commit -m "Complete Module 6: The Conductor")` via Bash tool and show the student the output: "Committed. Here's what went in: [changed files]" (or "No changes to commit." if nothing was staged.)
2. Read `CLAUDE.md`, then update it via Edit tool: change `- [ ] Module 6:` to `- [x] Module 6:`.
3. **Tell the student to run `/compact`.** Say this:

   > "Module 6 done. You've built a multi-agent system — a Conductor that decides which specialists to call, plus a self-eval that grades the run. Next is the send-off: a few examples of where this pattern goes from here.
   >
   > Type `/compact` now to clear context before the final stretch. **After `/compact` finishes, type `module-7` to continue.**"

   Wait for the student to run `/compact` before doing anything else.

## Coach guardrails

- **No code in the terminal.** The Conductor prompt is visible in the frontend; point students there if they want to read it.
- **Two runs, both fast.** Don't add a third run "to make sure it works." The contrast between the two is the lesson.
- **Don't claim the curriculum builds a loop.** Real agentic systems often loop (plan → act → observe → repeat). This curriculum doesn't build that — the Conductor runs once and the orchestrator runs the chosen tools once. If the student asks "does it loop?" — answer honestly: no, this is a single planning pass; loops are the next thing to add but aren't here.
- **Anchor every "this is agentic because…" claim back to Anthropic's framing.** The vocabulary should be consistent: planner / decides / dispatches / dynamic — not loose synonyms.

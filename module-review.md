# Module Review — AI Study Camp Agent Sprint
**Reviewed:** 2026-04-29

---

## Per-Module Notes

### stage-1-intro: Setup + API Key

- **Learning objective:** Clear and explicit: working project folder, API key in `.env`, dependencies installed, and a mental picture of the 3-stage arc. Students know exactly what "done" looks like before the module starts.
- **Exercise quality:** No interactive "ask-and-wait" moments — the module is procedural setup with the coach doing or directing every action. Appropriate for a setup module, but there is zero reflection until the handoff.
- **Jargon handling:** Mostly clean. `.env`, `npm`, `dotenv`, `.gitignore` are used without full definitions — assumed knowledge that may not exist at this level. "JSON" appears in passing before Module 2 makes it concrete.
- **Pacing:** Organized into timed steps. Step 6 ("read the concept doc together") is the only pause-and-think moment, but it comes near the end after several consecutive procedural steps. Front-half is dense with commands.
- **Handoff:** Clean and specific. Tells the student what they now have, and gives them the exact trigger word (`module-1`).
- **Tone:** Warm and practical. The aside about billing ("every API call costs less than a penny... blast radius is $5") is exactly right for nervous first-timers.
- **Building-block clarity:** N/A for intro — this is framing, not composition. The 3-stage ASCII diagram does the job of establishing the arc early.
- **One note:** The `cp -R templates/transcripts-to-insights student-output/` command is issued without warning — the student hears "I just copied..." after the fact rather than being asked if they're ready. A single "ready to scaffold?" before the command would make it feel less like the coach is racing ahead.

---

### module-1: Tour the System

- **Learning objective:** Clear: mental model of the agent architecture — orchestrator, sub-agents, system prompts, data flow. The framing line ("when someone says 'orchestrator' or 'sub-agent', you'll know exactly what they mean") sets the bar explicitly.
- **Exercise quality:** One genuine ask-and-wait question in Step 3 — "Why do you think we'd architect it that way instead of having one big agent do everything?" — with a fallback prompt if the student is stuck. Well-executed. A second reflection question appears at the end. Two genuine wait moments across 15 minutes is appropriate density.
- **Jargon handling:** Strong. "Orchestrator" and "sub-agent" are introduced simultaneously with the ASCII diagram, defined before being used in subsequent steps. "System prompt" is introduced in Step 4 with a clear one-line definition. "Composition" appears in Step 4 without definition — minor.
- **Pacing:** Well-paced. The ASCII diagram anchors Step 2, the example walkthrough in Step 3 lets the diagram breathe, the three principles in Step 4 crystallize, and the staircase diagram in Step 5 ties it to what's coming. No front-loading.
- **Handoff:** Clean. The commit message is specific and the handoff line previews Module 2's concrete payoff ("send your first API call and see how a single agent comes alive").
- **Tone:** The warmest module so far. "When someone says 'orchestrator' ... you'll know exactly what they mean" respects the student; it assumes competence.
- **Building-block clarity:** Excellent for an early framing module. The staircase in Step 5 makes the building-block relationship visually explicit: `chat.js → watcher.js → orchestrator.js`, `1 prompt → 1 prompt → 3 prompts`. The `ask()` / `runWorkflow()` import chain isn't mentioned yet (appropriately — that's Module 6's reveal), but the mental model is fully primed.
- **One note:** The optional deeper-reading links at the bottom (`concepts/what-is-an-agent.md`, etc.) are good, but the comment in Module 3 references `concepts/what-is-an-agent.md` — the three-level hierarchy section — as required reading, not optional. Flagging it as optional here may cause students to skip it and then feel lost in Module 3 Step 2.

---

### module-2: Your First API Call

- **Learning objective:** Clear and well-sold: the demystification moment. "By the end of the next 20 minutes, you will have called the Claude API yourself, seen the exact JSON that gets sent, and seen the exact JSON that comes back." Specific and high-stakes.
- **Exercise quality:** One ask-and-wait question: "Where in this file does the actual 'AI thinking' happen? Point to the line." Brief but effective — tests whether the student is tracking or just watching. The optional "want to see the whole JSON response?" moment gives agency without requiring it. Solid for a mostly-demonstration module.
- **Jargon handling:** Clean. `max_tokens`, `system`, `messages`, `role`, `content`, `stop_reason`, `usage` are all introduced in context, not ahead of use. "Token" gets a concrete definition with a real cost example (the best kind of definition).
- **Pacing:** Front-loaded by design — but appropriately so. Steps 2 and 3 prepare the student before they run anything, which reduces the "it ran and I didn't understand it" problem. The payoff of Step 4 (running it) lands heavier because of the setup.
- **Handoff:** Clean. Preview of Module 3 is specific ("the system prompt that controls Claude's personality") and the handoff energy is high ("Big moment").
- **Tone:** Confident and punchy. "That's not an exaggeration" (about demystifying AI) is exactly the right level of conviction.
- **Building-block clarity:** Not yet — this module introduces the API call as a standalone concept. The `ask()` function isn't named yet. That's appropriate; Module 3 is where the function gets its identity and Module 4/6 show it getting imported.
- **One note:** The coach instructions say "This is the most important module in the sprint." That conviction should leak into the opening line the student hears — it does ("the moment AI stops being a black box"). But the JSON walkthrough in Step 3 presents the request object as a standalone code block without tying it back to the ASCII diagram from Module 1. A single line — "Remember the 'AI thinking' step in the orchestrator diagram? This is what goes over the wire for that step" — would land the conceptual link before the student sees raw code.

---

### module-3: Build the Chat Assistant

- **Learning objective:** Partially clear. The title says "Build the Chat Assistant" but the student doesn't build anything — they run, interact with, and edit an already-built assistant. The learning objective is actually: understand multi-turn conversation mechanics and feel the system prompt's leverage. That's valuable, but the stated objective ("working interactive chat assistant") overpromises.
- **Exercise quality:** Strong. Four forced follow-up questions in Step 4, two real prompt-editing exercises in Step 5, and a restore step that forces the student to think about state. These are ask-and-wait moments embedded in action. The system prompt edits are the best exercise in the first three modules.
- **Jargon handling:** One slip: Step 2 opens `concepts/what-is-an-agent.md` and references "the three-level hierarchy section" without saying what that hierarchy is. First mention of "stateless" in Step 3 ("a stateless one-shot function") is used without definition — the student may infer it, but a one-line explanation would land it cleanly.
- **Pacing:** Well-paced in the second half. The code walkthrough in Step 3 is somewhat dense — three distinct code patterns (`ask()`, `messages[]`, import guard) read in one sitting. Splitting with a "before we look at the next pattern..." beat between each would help.
- **Handoff:** Clean. The handoff explicitly names what Stage 2 adds ("runs automatically every time a file appears") which previews Module 4's trigger concept.
- **Tone:** Good. "Feel the leverage of the system prompt" in the coach instructions captures the right spirit.
- **Building-block clarity:** This is where the `ask()` export is introduced and its reuse is previewed: "Stage 2 and Stage 3 will import this exact function." That's the right place and the right framing. The import guard explanation ("When Stage 2 imports this file, only the `ask()` function loads — the loop never fires") is a small pedagogical gem.
- **One note:** The restore step at the end of Step 5 (`cp ../templates/... prompts/system.md`) is critical — it explicitly says "We need it intact for the workflow in Module 4" — but it's buried in a "Restore" subsection that might look like cleanup. This dependency should be called out more directly, e.g., as its own numbered step with a warning: "Don't skip this — Module 4 depends on the original system prompt."

---

### module-4: Build the Workflow

- **Learning objective:** Clear: a working folder-watching pipeline that fires automatically. The student should understand (1) the `import { ask }` reuse and (2) that an event trigger is structurally different from interactive conversation.
- **Exercise quality:** Light on ask-and-wait moments. The main "exercise" is triggering the pipeline by dropping files in a second terminal — satisfying and concrete, but the student mostly watches. No question forces them to synthesize before Step 8. A question like "What would happen if you imported `runWorkflow` into Stage 3?" at the end of Step 3 would prime the Module 6 reveal.
- **Jargon handling:** "Webhook," "cron job," and "event" appear in Step 1's frame without definition — they're used as examples of triggers, which partially contextualizes them, but the trio lands fast on students who may not know all three.
- **Pacing:** Well-structured. The import line (Step 3) → the watcher (Step 4) → the trigger (Step 5) → the frontend (Step 7) → the big idea (Step 8) is a clean staircase. No single step overstays.
- **Handoff:** Clean. The line "One more stage — the biggest one. Stage 3 is where we go beyond a fixed pipeline and build something that *decides what to do*" is the right tease.
- **Tone:** Confident. "The pipeline stops listening. Nothing else changes. The reports stay in outputs/" is a satisfying, calm beat.
- **Building-block clarity:** This is the module where building-block reuse becomes explicit and literal — the `import { ask }` line, explained in code, is the conceptual centerpiece. The coach instructions note the magic moment is seeing the import AND the file trigger together; the script delivers on this. The note "Same pattern as Stage 1 — we export `runWorkflow()` as a building block. Stage 3 will import this, just like this file imports `ask()` from Stage 1" is the clearest statement of the chain in the entire course — it should be emphasized even more, perhaps printed as a standalone callout.
- **One note:** The second terminal instruction in Step 5 ("In a **second terminal window**, drop a file") would confuse students who have never split a terminal before. A one-line aside on how to open a second tab/window would prevent a support detour.

---

### module-5: Extend the Workflow

- **Learning objective:** Clear enough: add a new output step to the workflow pipeline. The student learns that a workflow is a sequence they control, not a black box. But the title "Extend the Workflow" undersells what's actually being taught — the module's real lesson is "output steps are just pipeline steps."
- **Exercise quality:** Best student-agency in the course so far. The coach presents four options and says "Which feels useful or fun? Pick one." That's genuine choice. The implementation steps vary by difficulty (console print is trivial; Slack webhook requires external setup), which respects different student contexts.
- **Jargon handling:** "JSONL" appears in Option 2 without definition. "Incoming webhook" appears in Option 3 without definition. For a student who hasn't touched Slack's API before, the Slack option is materially harder than the others without that context.
- **Pacing:** Well-paced. The pick-and-implement structure keeps the module from front-loading — the student makes a choice before they see any code.
- **Handoff:** Slightly abrupt. "Stage 3 is where we go beyond a fixed pipeline and build something that *decides what to do*" — same tease as Module 4's handoff, nearly word-for-word. Vary the language. The Module 5 handoff could differentiate by specifically naming the orchestrator: "In Stage 3, instead of a fixed sequence, an orchestrator reads the input and decides which tools to call."
- **Tone:** Warm and practical. The "None of this is magic — just functions in a sequence" energy carries through.
- **Building-block clarity:** Reinforced quietly. "The chat assistant in step 2 never changes" is a key line — it underscores that the building blocks are stable and that additions happen around them, not inside them. Could be said more explicitly.
- **One note:** The `import { exec } from "node:child_process"` line in Option 4 is placed inside the function body snippet, but imports must go at the top of the file. A student who copies it verbatim will get a syntax error. Fix the placement.

---

### module-6: The Agentic System

- **Learning objective:** Clear and well-earned: a working orchestrator that dispatches to both Stage 1 (`ask`) and Stage 2 (`runWorkflow`), with a planner that decides routing. The "payoff" framing ("the tools it picks from are the chat assistant and workflow you already built") is exactly right.
- **Exercise quality:** No ask-and-wait questions until Step 7 ("When would you use Stage 1/2/3?"). The module is primarily a guided code walkthrough followed by a run — appropriate given the complexity of what's being read, but a mid-module check like "Before I walk through the dispatch logic, what do you think happens when the planner says `{ tools: ['summarize'] }` only?" would catch passive observers.
- **Jargon handling:** "Planner" is introduced cleanly in Step 2 before the code in Step 4. "Synthesis" is used in Step 4 without a prior definition — it appears as `synthesize(results)` in the code block before the word is explained. A one-line definition ("synthesize = combine the specialists' outputs into one final report") before the code block would help.
- **Pacing:** Dense in Steps 3–5 (imports, planner, dispatch — three consecutive code walkthroughs). Splitting with a short "what do you notice?" beat between each would be appropriate given this is the conceptual peak.
- **Handoff:** Clean and honest — "Take a moment — that's the actual peak of this sprint" is the right beat before pointing to Module 7.
- **Tone:** Excellent. "Stop here. These two lines are everything." is the best single line in the course. The coach instructions say "take it slow. Let that land." — the script earns that instruction.
- **Building-block clarity:** The strongest module for building-block clarity. The two import lines (`ask` from Stage 1, `runWorkflow` from Stage 2) are highlighted explicitly, the import guard callback ties back to Module 3, and the frontend visualization in Step 8 makes the hierarchy visually undeniable. "This is why we designed Stages 1 and 2 the way we did" is a payoff line that rewards students who followed the arc.
- **One note:** Step 3 has the coach say "Stop here. These two lines are everything" — then continues to walk through the planner and dispatch logic in Steps 4 and 5 without returning to validate whether the student actually internalized Step 3. A brief "Make sense so far? What do these two imports mean the orchestrator can do?" before moving to the planner would keep the pacing human.

---

### module-7: See the System

- **Learning objective:** Partially clear. "A screenshot of your working agentic system" is a deliverable, not a learning objective. The actual learning is: be able to map every node in the visualization back to a real file or function. That's a better objective to name upfront.
- **Exercise quality:** Node inspection in Step 4 is structured and specific — each node gets named, the student clicks it and hears what to look for. The "Stage 1 → Stage 2 → Stage 3" tab comparison is a genuine learning moment. The screenshot prompt in Step 6 gives the module a social dimension (sharing with the cohort) that most modules lack.
- **Jargon handling:** No new jargon introduced — appropriate for a consolidation module. All terms used have been established.
- **Pacing:** Excellent. After the density of Module 6, Module 7 is a well-earned pause. Steps are short; the bulk of the time is the student interacting with the UI, not the coach talking.
- **Handoff:** Clean. "The agent works on meeting transcripts — but what if it worked on *your* thing?" is a strong hook for Module 8.
- **Tone:** The best tone in the course. "This is the celebration module" (coach note) translates into the script. "A week ago, you'd never built an agent" is genuine and earned.
- **Building-block clarity:** Reinforced through the frontend: each node is traced back to a real file, the Stage 1/2/3 tab comparison visualizes the arc, and the hierarchy statement ("chat assistant ⊂ workflow ⊂ agentic system") is the clearest summary of the whole course.
- **One note:** The animation description in Step 5 says "That animation isn't fake — it's the actual sequence of API calls your `orchestrator.js` runs." This is a strong claim that deserves a small caveat: the animation is driven by scripted timing, not a live connection to the running orchestrator. If a student opens the frontend while the orchestrator isn't running, the animation still plays. The claim should be softened to "the sequence matches the API call order in `orchestrator.js`" rather than implying a live wire.

---

### module-8: Make It Yours

- **Learning objective:** Clear and motivating: a personalized agent running on a real input from the student's own life or work. The "take-home moment" framing is exactly right.
- **Exercise quality:** Best in the course. The menu of use cases with a "pick one fast" nudge prevents decision paralysis. The open iteration loop ("if the output is bad, the system prompts need more rules — tune the prompt until the output is what you want") teaches the actual craft of agent-building, not just the mechanics. The reflection question in Step 8 ("where else in your life or work would this same pattern fit?") is the best ask-and-wait in the entire sprint.
- **Jargon handling:** "JTBD" appears in the menu and in the example prompts without expansion. Students who haven't encountered Jobs-to-Be-Done will see it three times with no explanation. Define it or replace with "customer goals" in the menu.
- **Pacing:** Well-paced overall. Step 4 (editing sub-agent prompts) includes a critical warning — "keep the field names — `owner`, `task`, `deadline` — even if the meaning shifts. The orchestrator code expects them" — but this is a code constraint, not a learning choice. It should be flagged more prominently; students who miss it will hit a confusing runtime error.
- **Handoff:** No next module — this is the final module. The celebration in Step 10 is warm, specific, and ends with the right two words: "Go build something."
- **Tone:** The best-written module. The Step 10 celebration is genuine and earns its moment. The four takeaway principles are clean and portable.
- **Building-block clarity:** Not explicitly revisited here — appropriate, since the focus is application rather than architecture. The `personalized/` folder save preserves the student's work so the building blocks remain usable after the sprint.
- **One note:** Step 5 presents two code paths for running the personalized agent (`npm run stage-3 -- transcripts/real-input.txt` and `node stage-3/orchestrator.js transcripts/real-input.txt`) with "Or if Stage 3 only takes the sample by default..." — this suggests the coach doesn't know which will work, which undermines confidence at the most important moment of the sprint. Either commit to one invocation pattern or handle both cleanly in `package.json` so the student always uses `npm run stage-3 -- <path>`.

---

## Cross-Module Patterns

**1. The import chain payoff is the arc — and it works.** The decision to export `ask()` in Stage 1, re-export `runWorkflow()` in Stage 2, and import both in Stage 3's orchestrator is the structural backbone of the course. Every hint along the way (the import guard in Module 3, "Stage 3 will import this" in Module 4, the two-line reveal in Module 6) builds toward a genuine "I built every box in this diagram" moment in Module 7. This is the course's biggest strength and it lands.

**2. Ask-and-wait questions are sparse in the first half, richer in the second.** Modules 4, 5, and 6 have zero or one genuine wait-for-answer moments. Students who are passive observers can sail through the early pipeline without actually building understanding. The sprint would benefit from one additional reflection question per module in the Stage 2 modules — not more content, just a beat that checks whether the student is with you before moving to the next code block.

**3. "See it in the frontend" steps feel like an add-on, not a payoff.** In Modules 3, 4, 6, and 7, the frontend visualization step comes at or near the end of the module. In Modules 3–6, it's one of the last things before the commit, which gives it the energy of a cleanup task rather than a conceptual anchor. The visualization works best in Module 7 (where it's the whole point) and is least effective in Module 3 (where students haven't seen Stage 2 yet, so the "Stage 1 nested inside Stage 2" preview falls flat). Consider moving the frontend step in Module 4 earlier — after the student has run the watcher, show them the diagram as a way to understand what they just triggered, not as an afterthought.

**4. Handoff language is strong throughout but starts repeating.** The Module 4 and Module 5 handoff lines use nearly identical phrasing ("Stage 3 is where we go beyond a fixed pipeline and build something that *decides what to do*"). At the transition from Stage 2 to Stage 3, this repetition dilutes what should be a sharp escalation. The Module 5 handoff, as the final module of the middle stage, deserves its own distinct energy — something like: "You've now built a pipeline that runs without you and produces multiple outputs. The next question is: what if the pipeline didn't have fixed steps? What if it read the input first and decided what to do? That's Stage 3."

**5. The concept docs are treated inconsistently.** Some are flagged as required reading (Module 1 has students open `examples/example-transcripts-insights.md`; Module 2 reads the file top-to-bottom together), some are optional deeper reading (Module 1's sidebar links), and one is referenced in Module 3 Step 2 as if it's required but was listed as optional in Module 1. Standardize: either all concept docs are read together during the relevant module, or they're all optional with a consistent "go deeper here" call-out. The current mixed treatment creates uncertainty about what the student needs to do.

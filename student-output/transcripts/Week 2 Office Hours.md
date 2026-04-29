# **Week 2 Office Hours — Cohort 5**

Date: 2026-04-28 Attendees: Ben Battles, Nicole Garcia Fischer, Robyn, Anna Perdrix, William Ramshage, Victoria Kozak, Nazli Danis (chat) Duration: \~65 min Format: Drop-in office hours — CLAUDE.md hierarchy, VS Code navigation, Git/GitHub fundamentals, model selection, testing tools

## **Summary**

Ben opened as open-format office hours — the first full week complete, students entering Week 2 and building their first full-stack apps. Victoria joined while still catching up on Week 1; Ben oriented her on the shift from Lovable to Claude Code and why the Week 2 sprint is the more important foundation.

The call opened with Robyn's question about context management: how broad or small to go, where to start, and how to think about which contexts to set. Ben walked through the hierarchy — global CLAUDE.md for personal identity (who you are, how you work), project-level CLAUDE.md per build, and breadcrumbed references to specialized files (e.g., communication style) so Claude only loads what it needs when it needs it. He suggested auditing the setup by asking Claude "what did you read when I opened this session?" — if the answer is "nothing," that's a problem; if it's "everything," that's also a problem. Week 3 will cover context management in depth; Ben committed to sending the context-engineering and CLAUDE.md examples deck after the call.

Anna shared her screen, which prompted a live VS Code walkthrough. She was still in the tool-linking setup phase and asked what "talking to Claude" in VS Code actually means — the sidebar extension or the terminal. Nicole clarified both work; she prefers the terminal because it shows more of Claude's working process. Robyn added that the terminal pane in VS Code is too small for her — Nicole showed her the pane is resizable by dragging the divider line. Ben flagged the Copilot sidebar on the right side of VS Code: close it with the X, since Claude is already the agent and two competing AI sidebars create confusion.

William disclosed he'd done the Week 1 to-do app via screenshot workflow outside VS Code — uploading the sprint guide to Claude, sending screenshots back and forth — and had clicked through saying yes to everything without really understanding what he built. This prompted a full Git/GitHub walkthrough and live demo. Ben covered the mental model (Git \= local checkpoints, GitHub \= cloud backup), the .env file and gitignore, meaningful commit messages, visual diffs in GitHub Desktop, branches, pull requests, and Nicole's preferred onboarding flow (create the repo in GitHub first → clone via GitHub Desktop → open in VS Code). Ben showed his own GitHub repos live and created an aisc-test repo in real time. The "commit early and often" message landed with a personal anecdote: Claude deleted all of Ben's files in Week 1 — GitHub was the only backup. By end of the Git section, William had his question answered and Anna said "I'm so thankful" after the live clone walkthrough.

Anna then asked about model selection in Claude Code. Ben: type "model" in the session to open the picker. Opus for planning — biggest context window, best reasoning. Sonnet for most execution work, though its context window fills fast. Anthropic recently released an Advisor mode where planning can use Opus while execution stays on Sonnet. Nicole said she tends to stay on Opus and adjusts the effort level (high / medium / low) instead of switching models. Ben also demoed the status line — showed context window at 6% on Opus and 29% on Sonnet in the same session — and recommended clearing or compacting at 40–50%, well before it fills.

Nazli asked in chat about smarter autonomous end-to-end testing tools. Ben: include tests in your planning prompt from the start. Nicole recommended Playwright MCP \+ Chrome extension for UI testing — Claude can open a Chrome tab, click through the app, take screenshots, and autocorrect. For backend, she pointed to QA-focused sub-agents and skills that can be downloaded; Gary Tan's GStack was mentioned as one structured multi-agent sprint workflow that includes a QA agent step. No single tool solves everything; the right approach depends on the stack and use case.

Ben closed the session previewing Thursday's guest speaker, Friday's group call (with a paired programming challenge), and offered Calendly for 1:1s. Anna: "I feel like I need a dictionary — it's a completely different world." William: "It's emphasis on better, not perfect. I'm getting there."

## **Key Topics Covered**

* CLAUDE.md hierarchy — global (who you are) vs. project-level (what you're building), breadcrumb references to specialized files rather than loading everything at once  
* Auditing what Claude reads — ask "what did you read when I opened this session?" to verify your setup is working  
* VS Code: terminal vs. sidebar extension; expanding the terminal pane by dragging the divider; closing the Copilot sidebar  
* Git vs. GitHub — Git \= local checkpoints, GitHub \= cloud backup; they don't auto-sync; .env stays local via gitignore  
* Plan Mode (Shift+Tab twice) before executing — reduces "saying yes to everything" anxiety; Claude interviews you on the plan before touching code  
* After-build report — ask Claude for a non-technical markdown of what it built, why, and key trade-offs; can be a standing global CLAUDE.md instruction  
* GitHub Desktop as a visual diff viewer — see exactly what Claude added/removed before committing, without reading code  
* Commit early and often — Claude can delete files; your GitHub repo is the backup  
* Model selection in Claude Code — type "model" to switch; Opus for planning (largest context window), Sonnet for execution; new Advisor mode for hybrid planning/execution  
* Status line — context window percentage; clear or compact at 40–50%, not 85%  
* Playwright MCP \+ Chrome extension for UI testing; QA-focused sub-agents for backend

## **Student Updates**

**Robyn** — 1h45m into the 3.5hr Week 2 lecture before the call; not yet started Sprint work. Her top question was context management: how broad vs. small, where to start, how to think about what contexts to set. Asked about the global CLAUDE.md → project CLAUDE.md → breadcrumbed file hierarchy; confirmed the structure with Ben. Wants examples of good global CLAUDE.md files — Ben committed to sending the deck.

**Anna Perdrix** — still in the setup and tool-linking phase; not yet building. Shared her screen showing VS Code with the to-do app sprint connected to GitHub. Asked about the VS Code Claude extension vs. the terminal, and which model to use in Claude Code when. Said "I feel like I need a dictionary — it's a completely different world" at the close.

**William Ramshage** — completed the Week 1 to-do app via screenshot workflow outside VS Code, saying yes to everything without understanding what he built. Has a working localhost app but no GitHub repo. Asked when to decline Claude's permission requests, what to do about terminal information overload, and how to create a GitHub repo for an already-built local project.

**Victoria Kozak** — joining while sick and recovering from vacation, still working through Week 1 Lovable materials. Mostly observing. Ben confirmed she's with Scentbird, and Robyn noted Scentbird was in her YC batch.

**Nazli Danis** — present via chat only. Asked about autonomous end-to-end testing tools.

## **Q\&A Highlights**

**Robyn:** "Where do I start with context? How broad, how small, how do I think about what contexts to set?" → Ben: Start with a global CLAUDE.md covering who you are and what you're doing. Add a project-level CLAUDE.md for each build. Use breadcrumb references to specialized files (e.g., "if you're helping me draft a Slack message, read this file") so Claude loads what it needs and not everything at once. Week 3 goes deep on this.

**Robyn:** "Is there a good place that has examples of great global CLAUDE.md files?" → Ben: Sending the context-engineering deck after the call; we have one that covers this with examples. Week 3 also has a full section.

**Robyn (follow-on):** "The terminal section is so small — I want it bigger." → Nicole: Drag the divider line above the terminal to expand it. You can resize it to fill as much of the screen as you want.

**Robyn:** "Is GitHub Desktop Git, or not Git?" → Ben: GitHub Desktop is a visual GUI for GitHub. Git itself runs in the background inside your terminal — it comes with the Homebrew install. You don't see a separate "Git" app; it's just commands the terminal uses.

**Anna:** "How do you navigate VS Code day-to-day? Can you show it for 10 minutes?" → Ben: Recommend pushing through the first sprint and surfacing specific problems as they come up, then addressing them in office hours or a 1:1 where we can go through your specific setup.

**Anna:** "What model should I use in Claude Code, and how do I switch?" → Ben: Type "model" in a Claude Code session to open the picker. Opus for planning and complex reasoning — biggest context window. Sonnet for most execution work. Anthropic recently released Advisor mode: the planning phase uses Opus, execution uses Sonnet.

**William:** "When should I NOT say 'yes always' to Claude's permission prompts?" → Ben: Use Plan Mode (Shift+Tab twice) first so you understand what Claude is about to do. Once you've approved a solid plan, you can feel confident letting it run. Nicole added: after the build, ask Claude for an after-build report — a non-technical markdown of what it did and why. That's how you stay in the loop without reading the code.

**William:** "So much gets lost in the terminal — code I can't read, mixed with useful info. Is this just because it's Week 1?" → Ben: You're probably never going to get to where you read and understand everything Claude outputs. The goal is vibe engineering: tight spec, clear plan, let Claude execute. Nicole: GitHub Desktop shows you visual diffs — red is removed, green is added — so you can see what changed without reading a line of code.

**William:** "How do I create a GitHub repo for an existing project I already have locally?" → Ben: Just ask Claude. Tell it you're in the project folder and want to create a GitHub repo. It'll walk through setting up the README, gitignore, and pushing to GitHub. You can also use the Terminal 101 and GitHub 101 decks, but Claude doing it for you is the fastest path.

**Nazli (chat):** "Any suggestions for skills or tools for smarter, more autonomous end-to-end testing?" → Ben: Include tests as part of your plan from the start — tell Claude "include a test suite" when planning. Nicole: Playwright MCP \+ Chrome extension for UI — Claude opens a Chrome tab, clicks through the interface, takes screenshots, autocorrects. For backend, look for QA-focused sub-agents and downloadable skills. Gary Tan's GStack is one example of a multi-agent sprint workflow that includes a QA agent step. No one tool covers everything.

## **Raw Transcript**

\[00:00\] Ben: Okay.

\[03:12\] Ben: Hey, Robin, how's it going?

\[03:14\] Robyn: Good, how you doing?

\[03:16\] Ben: All good, thanks.

\[03:17\] Robyn: Yay\!

\[03:18\] Ben: I am here, Victoria.

\[03:20\] William: Hey.

\[03:24\] Ben: Welcome, Victoria. I know you were out last week, but good to have you here, and excited to get started.

\[03:32\] Victoria: Everyone's friends.

\[03:36\] Ben: I'm sorry to hear you're sick, too. Not fun getting back from vacation like that.

\[03:41\] Victoria: Can't believe it, not fun at all.

\[03:44\] Ben: Cool, but Victoria — so you're with Scentbird, right?

\[03:47\] Victoria: That's correct.

\[03:50\] Robyn: Cool. Scentbird were in my batch at Y Combinator. Many, many years ago.

\[03:58\] Ben: Very cool. I know it's a very small world…

\[04:04\] Victoria: Sometimes I think it's way too small.

\[04:09\] Ben: Hannah, how's it going?

\[04:11\] Anna: Okay, good, good, thank you.

\[04:15\] Ben: Cool. So today is just kind of optional office hours — review whatever topics we want. I can guide the conversation, see how you guys did in certain areas, but also if people are stuck, have problems, want to review a topic, it's pretty open. Sometimes I'll do, like, a 15-minute deep dive into a specific topic, but I think today, since it's kind of the first full week done and we're in the second week, there may be some questions. So it's a good time to just kind of discuss and see how everyone's doing.

\[04:49\] Ben: Victoria, I know you're working through last week. You saw the material — their first project was to build an app with Lovable, which is a very easy app builder tool. That's cool to kind of get started, but this week we're now learning how to build within Claude Code, which is how we'd very much recommend doing it going forward. You can do all the same things, you just have a lot more control.

\[05:10\] Ben: I think Nicole's joining. So yeah, this week is the first week building a full-stack app. You guys are learning how to host it, learning how to connect it to a database, build the front end and back end — so I'm curious how everyone's doing after diving into it a little bit.

\[05:32\] Robyn: I've not started this week's stuff yet, I'm gonna be honest. I'm still about to start, probably from tomorrow. But I wanted to ask a question that's kind of more theoretical or general. I feel like from the stuff last week — I'm also, like, an hour and 45 minutes into the three and a half hour lecture, so that's my first bit to get past, because I'm really enjoying it. But the consistent thing, especially after the guest speaker, was "everything's context, everything's context" — different versions of context, prompt context, CLAUDE.md file context, da-da-da. We might get this over the course, but I think even as I'm starting to work day-to-day, I'm like, where do I start on the context? It feels like such a big thing. How broad, how small, how do I think about what contexts to set?

\[06:29\] Ben: Yeah, I think that is one of the biggest topics, and something you'll kind of refine over time. It's something we're going to spend a lot of time on in Week 3 — that's when we'll dive a lot deeper into Claude Code and how to actually optimize it, what are all the building blocks, how to manage context. So there will be a full section on that, and we'll also touch on it again in Week 4\.

But the best place to start is just have a CLAUDE.md file. If you're starting from scratch, you can build one and say, "I'm Robyn, I'm doing this AI Study Camp, here's what this week looks like." That way every time you open your terminal, it at least knows who you are and what the course is. Then when you move into building your full-stack app this week, you can make a project for that and have a new CLAUDE.md — say, "we're building this, and the goal is to do this, and here's the front-end and back-end and database components."

\[07:28\] Robyn: So would I have, like, a personal identity CLAUDE.md that's like, "hey, here's Robyn, I have done this in my career, here's how I like to communicate, here's the kind of work I'm trying to do" — and then let's say I'm doing the Week 2 project, I have a CLAUDE.md that's like, "here's the goal, here's where I am, reference my other CLAUDE.md to know a bit more about me, and then all the other things"?

\[07:49\] Ben: Yes — so you don't necessarily want to have everything about you in your global CLAUDE.md. The global CLAUDE.md is what's read any time you open any project — whether it's your main folder or you're deep down in three subfolders, it's always going to read that main global CLAUDE.md. And it's kind of an art to figure out how much info to put in, because you want it to know you're Robyn and you're learning how to vibe code, but maybe it doesn't need to know everything about your whole career every single time.

So you can start to build a hierarchy of CLAUDE.md files. And they don't all have to be CLAUDE.md files — you brought up your communication style. That potentially could be a skill, or it could be a doc. And what you'll figure out over time is, in your main CLAUDE.md, you can reference other useful files. So you can say, "if you ever need to help me draft an email or Slack, read this one." So it knows that file exists, and when you say "help me write a message," it will go and read it and get all of that. It's like using a breadcrumb so it knows what info to gather when — but it doesn't load it all at once, because that's when the context window completely fills up and you can't even use the chat.

\[08:56\] Robyn: Yeah. Is there a good place that has, like, good examples of great global CLAUDE.md files?

\[09:04\] Ben: I'm sure there are many places, but we're actually working on our own. Nicole, I know we already have a deck on managing context, so maybe that's something we can send out — it does have examples of what is context engineering and what is a good CLAUDE.md. I can send it out now, or we can walk through it briefly — it's a bit long, so maybe it's something we can just share.

\[09:27\] Robyn: Send it out and I'll have a read. I know I have to just do the things to learn, but it'll be nice to read it — it will give me a bit of steer and confidence.

\[09:44\] Ben: Definitely. I can share that out after, and Week 3 we'll have a full section where we're diving into the context. And if you're ever curious, you can just say, "hey Claude, what did you read when I opened this session?" If it's like "I didn't read anything," you're like, oh, that's a problem. If it's "I read every single file," that's also a problem. It's very good at optimizing itself — you can even say "how do I optimize this whole folder structure?" and it can review and recommend how to group things together. It's something you should try to understand initially, but you also end up optimizing it as you continue building.

\[10:24\] Robyn: Cool. Awesome. Thanks.

\[10:24\] Ben: Did you guys notice a difference in working with Claude compared to Lovable, where there's less ability to build separate folder structures and manage context? Have you guys actually played around and noticed that?

\[10:39\] Anna: I'm still very much at the stage where I'm setting everything up — and that's something I've never been particularly good at. So it's just, like, trying to really figure out how to link all of these tools together. I think I'm basically just using Claude to help me with that setup while I'm also hearing Nicole walking through some of those steps. The challenge I have is that probably because it's the first time I've set up all of these tools, some of the steps require me to do some additional stuff beyond what you did, Nicole, initially. I try to link a tool and it still doesn't really recognize it. So I need to figure out why that's happening. I hope I'll get over that today and then start being able to build from there.

But maybe something that would be useful to me is just having a look at how people actually use it — being able to see, Ben, you, for like 10 minutes, how do you actually navigate VS Code and go about this? Because I feel like there's just so many functionalities and buttons, and obviously a lot of things you can do, but there's probably the most intuitive and useful way of doing it, and you get a lot from watching others.

\[12:26\] Ben: Yeah, I think you have to find the balance of trying to learn how to use everything and not getting overwhelmed. That can go with VS Code, it can also go with just setting up your CLAUDE.md. I've seen a lot of memes where people are talking about how great their Claude setup is, and then you ask "cool, what did you build?" and it's like, "oh, I've just spent the last month on the setup." So there is a trap of always optimizing. It helps to just start using it, because then you start to notice which things aren't working well and which things just naturally work well — it is a very smart agent, and some things it sets up kind of automatically for you.

For VS Code, I'm in the camp of using just the most basic features, and you can always add on. There are literally tens of thousands of extensions. I think maybe working through it the first week, seeing what areas you really get stuck on, and then we can dive into those and try to solve them — versus trying to give a broad overview and having you guys get overwhelmed by all the little buttons. So maybe my push is: try to push through this first build, understand what really is a problem, and then next week when we can actually dive into it, we can do a one-on-one or office hours and walk through those more specific use cases.

\[13:45\] Nicole: I would add — the setup of your laptop is a very unique thing. There are definitely things, versions and things you have installed, and sometimes if you're working on a work laptop, there are things preventing you from installing certain tools. It's a very personalized setup, and I think that's the hill a lot of people die on — why they don't even get into vibe coding with Claude. Stick with it. We've never had a student who hasn't been able to get everything downloaded in time. It feels like death by a thousand paper cuts — there's no way to go around that. Just stick with it, and lean on Claude for that — Claude's pretty good at guiding you through setup. And Anna, through the sprint videos you'll see me clicking through VS Code. Think of it as: you have your file structure for your project, you have your terminal where you talk to Claude, and then there are a couple of things here and there that help optimize your experience. Like there's a status line when you're talking to Claude — you can add things there to see things like "I've used up 50% of my tokens already, I should probably clear this chat." You can see what branch you're working on for GitHub. There are some minor things that are good to have, which is why we use VS Code. But we'll get there — through experience it will make sense and you'll see it in practice.

\[15:26\] Ben: I hate that. \[laughs\]

\[15:37\] Anna: Can I share my screen for a second? I think that's conceptually something I want to understand. So now you're seeing my VS Code. I opened my… I linked it with my GitHub on the to-do app sprint. When you're talking about talking to Claude — so this is the terminal, but I also have the option of talking to Claude directly through the extension. How do I choose?

\[15:57\] Nicole: You can choose either. VS Code now has this extension that comes with the install, which is talking to Claude like this through the sidebar. I personally prefer using the terminal — I like that experience more. But this is a personal choice. The extension is a little bit more user-friendly for non-technical folks, but the terminal gives you a little bit more information as Claude is working through things.

\[16:24\] Anna: Okay.

\[16:25\] Robyn: Can I jump on this while it's up? When I was doing this last time, I also struggled — the terminal section is so small. It's like this tiny little section of the screen, and I almost want it bigger. I get drawn to the Claude Code extension because it has more space and I can read more of what's happening.

\[16:41\] Nicole: You can expand it\! If you go on that line right around the terminal — yeah — you should be able to drag it. There you go. You can resize it.

\[16:47\] Robyn: Okay, okay\!

\[16:52\] Robyn: Okay, that helps.

\[16:53\] Ben: Yeah, and you can X out — we'd recommend leaving the file structure up, but you see there's the agent on the right? That's Copilot, which we would definitely not recommend using. We already have Claude as the agent. You can X out of that Copilot panel there. And the "Get Started with VS Code" screen, once you open a file, you'll kind of see the code there. I'd say a good portion of the time you're not actually needing to look at code — you're talking to Claude and it's interacting with the code. But you want the ability to see the code when you want to check the output, see the difference between the previous and current version. That's why you need VS Code — for the full file structure and code visibility. But you may be interacting with just the terminal for a big part of the session.

\[17:35\] Robyn: And Terminal is basically — because I think of Terminal as writing code — but we'll be chatting in there, asking questions?

\[17:44\] Ben: Yeah, so you open up Claude in the terminal, and it's like their own version of the terminal. Claude interacts with your computer by actually running commands in there. You're talking in natural language, and Claude does all these very specific technical commands in order to manipulate your files and your computer as you need. That's what engineers always needed to know, and now we have Claude as the interface between natural language and actually interacting with your computer.

\[18:11\] Anna: And the folder structure that we're going to have on the to-do app — is that going to come from this interaction? So basically you're not necessarily creating files yourself, you're asking the terminal, providing the project description file, and then building from there, right?

\[18:32\] Ben: Exactly. Like, if you type "claude" into your terminal right now and say, "let's make 3 subfolders in this to-do app sprint and call them XYZ," you would see them appear on the sidebar. You're actually starting to build out a structure, which is what engineers have always done — and I think most people have never considered. Before I started vibe coding, the only folder on my computer I used was Documents, and just everything went in there.

\[19:08\] William: I think it's a little bit challenging to basically challenge Claude when I was doing this, because I did it the most novice way you can probably do — I essentially first uploaded the entire guide to Claude, outside of VS Code, and then I was just sending screenshots back and forth. I tried to do this for the first step, and then I realized — I think I finished the to-do app by just clicking through, instead of really understanding anything. Obviously I've been trying to go through everything and see what I really did, but I'm not sure what I'm doing, to be fair. I'm just like, "oh, this is the next step, do that." And some question of "yes, yes always, and then reject or something" comes up, and I always click "yes always." And I'm not really sure when I should not do that, because it feels like Claude is always suggesting that option.

\[20:21\] Ben: Yeah, so there are two things. One is having an understanding of what you're going to build — what is the plan, what are the actual pieces of the tech stack — and that's very important that you guys learn and understand, because there's a big difference between the backend, the front end, and the database, but you need all of them to fit together to build this app.

In terms of saying yes or approve — Claude is going to do a lot of things that manipulate code that you're not going to understand because you're not technical. So once you actually approve a plan and execute on it — if you've done a very good plan and understood all the components — then you can feel confident in Claude running through them. So I'd think of it more as: try to do as much planning upstream.

If you guys haven't used Plan Mode — you can toggle between accept edits and planning mode. In planning mode, you can chat with Claude, ask it questions, like "why are we doing this, what is the plan here?" It will interview you: "do you want this, this, or this?" And you can kind of say "number one" or "let's chat about it." So that's the more important part for you to understand and really spend time on. Planning can be a huge percentage of the work, and if you feel really good about the plan, Claude can just start running with it. There are going to be a lot of things you don't understand because you're not technical. But yeah, the upstream push is the key — because more and more Claude is able to take actions on its own. There are also levels of permissions you can give it. Anthropic just released auto mode, where Claude basically understands: if I'm reading or moving around a file, that's fine, but if I'm deleting or editing code, I should always ask.

\[22:17\] Nicole: On the other side of that — after you've done a big build, or you've been chatting with Claude and it's been building for like 2 hours, you can always do an after-build report. Randall talked about that last week, I think he called it the ARR. After every big build, have Claude write a script for a non-technical audience — what did it do, what were some of the key trade-offs, what were some big pieces of code that changed and why? You can even add this as a standing instruction in your global CLAUDE.md: "after every big commit, produce a markdown file that tells me what you did so I can understand conceptually what happened and what changed." When I was starting to vibe code I felt the same way, William — I felt like I was just saying yes and didn't understand what was happening. Remembering that Claude can also be your tutor, and at the end of a build it can give you a report — that's actually the best way to learn.

\[23:38\] William: That makes perfect sense, because I'm also a little bit afraid of adding a ton of tech debt that my developer or nothing has done before, by just saying yes to everything.

But one more question following on what Robyn said before. When we're using the terminal to chat with Claude, I feel like so much just gets lost in the terminal — it spits out a lot of information, a lot of code I don't read too well, and also some probably very useful information that's just interlinked into one thing that I don't read as well as I probably should. Is this just because we're one week into this and I'm not sure what I'm looking at, or is there anything I should do to read everything and understand a little bit better?

\[24:30\] Ben: I think you're probably not going to get to the point where you're reading everything and understanding everything. When you do these really big projects, it could be creating 45 files of code at the same time, and you're just not going to read all of those, and you're definitely not going to understand them.

What we talked about in the intro calls — vibe coding is basically just "do this for me, let it run free." What we want to do is vibe engineering, where we're not necessarily writing or reviewing the code, but we're making very tight specs, a very clear plan, giving it a framework to work within. That's why this first week we're defining very clearly: what is the backend, what is the front end, what is the database? Because if you just said "build me a to-do list app," you don't know in what form it's going to build, you don't know where it's going to host it, it just goes crazy.

So I wouldn't get too worried about understanding everything — there are many things I do that I still don't understand, but I can feel confident in the output because I know how to plan it and I know how to have it test itself. That's kind of where we want to get, where you can feel very confident in your output without actually knowing what the code specifically says.

\[25:49\] Nicole: I'd add — one of the reasons why we have you guys install GitHub Desktop is because before you commit something, you can always go there and literally see every single file Claude has changed. You can see in red what it subtracted, and in green what it added. So if you're more of a visual person and you want to see what it's doing in the terminal without processing all of that — just go to GitHub Desktop and you can literally see "Claude just added 20 new files, added 3,000 lines of code." Try not to get to the point where it's doing such big changes all in one go — try to chunk it up a bit. But I think that's one of the ways I learned best too: this visual understanding of, when I asked for this feature, it had to add all these different components. And then you go back to Claude and say, "okay, why did you add those components? Why was that the decision you made?" You just keep having the conversation with Claude — that's how I'd treat it.

\[26:46\] Nicole: Did you use that, William — were you able to download the desktop app and get a sense of the visual of it when it's adding all the diffs?

\[26:53\] William: I have downloaded the GitHub Desktop app. I haven't pushed anything to GitHub yet, I think. I need to probably double-check everything. I can access my to-do app on localhost. But I'm not sure if that is the final step.

\[27:23\] Ben: Yeah, while we're on that subject — this is one of the biggest learnings you guys are going through right now, that for me was also one of the biggest humps when I first started coding and vibe coding. What is GitHub, and what is Git, and what is the difference between Git and GitHub?

First of all: use it now, William. It does not need to be the final product. You want to commit early and often as much as you can, and push it to GitHub. Imagine you're writing a huge essay and you're like, "I'm going to save it when it's done." You want to save it after every paragraph so you always have that.

So yeah, if you guys want, we can chat a bit about the difference between Git and GitHub — there's a lot of terminology. I always heard it working in startups with engineers and was like, that's their thing. I never even needed to know what was going on. And now it's very important to understand. Does anyone have any specific questions? I can run through a deck we have about this, and obviously send it out afterwards, but maybe it would be helpful to ground you guys in some initial frameworks.

\[28:25\] Ben: Cool. I'll rip through this deck, but we can stop and talk about each piece, and you guys are welcome to call out any specific questions. But yeah, this is something that as you continue to build, you'll understand more and more.

So the mental model — two pieces. There's **Git**, which is your local storage. You can imagine it's like saving something on your computer. You can constantly be committing, which is a checkpoint — "let's save this checkpoint." And then **GitHub** is the cloud version. This is where it's actually saved. If your computer breaks and crashes and is destroyed, everything you pushed to GitHub is still there.

\[29:14\] Nicole: It's like Word on your desktop versus SharePoint, right? You can be working on a Word file, but that's not shared with anyone, it's not saved in the cloud anywhere.

\[29:24\] Ben: Exactly. Your computer is Git — local. And then you push it to GitHub, which is in the cloud. You can also pull from the cloud back into your computer. Those are the two directions. They're not automatically synced — if you commit something in Git on your computer, it's not in GitHub. Similarly, if you somehow edit a file directly in GitHub, it's not going to be on your computer. So you do need to make sure you sync between them.

There's also certain files you don't want to sync to the cloud, and the most important one is the .env. This is where you save all your secrets — your API key from Anthropic, your client secret from Instant. You want to make sure you're saving these in a secure place where Claude Code has access to them. So Claude knows to look in the .env to find all these passwords and secrets, but you also need to make sure it knows not to push it to GitHub. We'll get into how you actually control that, but that's something no one explained to me as I was learning — and at some point Claude was like, "alarm, we found a bunch of secrets in GitHub." You have to be very careful, especially these days since it's becoming easier to hack, and more and more people like us are starting to enter this world without having learned the best security practices that engineers always had.

\[30:42\] Ben: So what this looks like: you can commit — "I did the initial setup." Then "I added a login page." Then "adding the Stripe flow." Committing all of these locally — but they're not actually in the cloud yet. You do need to push them to GitHub to get them there.

\[31:01\] Nicole: And maybe something to add — the beauty of doing a lot of commits is that if Claude messes something up, you have a moment in time to go back to. You can always say, "hey, everything you just did in the session was crap — let's go back to the previous commit." If you wait thousands of lines of code to commit, it's a lot harder to revert to a moment in time that worked.

\[31:26\] Ben: And one of the most frustrating things is just when you have something working, you try to build more, and then it stops working, and you don't know where it stopped. That's when it's very good to be able to go back to a checkpoint you know actually worked.

\[31:37\] Anna: So are we saying commits are saved within your computer, and you basically need to create folders within your computer for every single project? Any things to take into account on how to set this up or organize it in a way that makes sense long term?

\[32:00\] Ben: So you don't need to organize specifically around commits — that's automatic. You do need to organize around your projects and repos, but that's at the higher level when you're starting the to-do app sprint. You create a repo, then you have it on your folder, and you're committing to that. You don't need to create a folder structure called "Anna's Commits for this project" — it saves automatically. But you do need to set up different packages, including Git, so that you can commit locally on your computer.

Something I struggled with initially is — okay, so there's commit (local) and then I have to push, but then there's all these commands. Now Claude can go through all the steps to actually push to GitHub. You may need to set up a process so it can always follow the same one and knows where your GitHub account is. But you no longer necessarily need to know all the commands to commit locally and then push.

\[33:01\] Nicole: And to answer your question, Anna — there are many flows. You could create a project first on your desktop and then push it up to GitHub, or you can create a repo first in GitHub and clone it to your computer. Like, there are different ways to start. I always like to start the same way: create the repo in GitHub first, then open it locally, because it naturally opens it in the GitHub or Git folder in my laptop, so I have all those things saved in the same place. That's my flow — different people do it different ways, but it's a nice tried-and-true way to keep things organized.

\[33:40\] Anna: I'm so thankful.

\[33:42\] Ben: And I did mention that you don't want to push everything to GitHub — so there's something called a gitignore file. Like it says, it's telling Git to ignore whatever's in here. This is something Claude can help you set up for a project. For this to-do app sprint — you're going to have a few different environment variables you don't want to push to GitHub. So you can say, "hey Claude, create a gitignore, do I already have a .env file? If not, create it," and then it can walk you through how to add your secrets to it. They'll be saved locally, but you're not going to push them to GitHub.

\[34:24\] Ben: Here's a lot of terminology — I won't go through each one. You guys can review these at different points in this presentation, but this is very helpful to have saved so you can reference it.

There's a bit of an installation process that you'll already be walking through this week. But again — two different pieces. Git is local on your computer. GitHub is like Google Drive where you can save all your documents to the cloud.

\[34:45\] Ben: There's a good visual coming up around the main branch and how you can test on it. What Nicole's talking about — every project has its own repo. When you're committing, this is basically notes to yourself about what changed. So it's good to actually give context — otherwise you can see 20 commits and you're like "oh cool, I added something" x20. When you put a good commit message, it's easier to go back and say "what were the last 5 commits? Okay, let's go back to ABCFD, because that was when I added the login redirect and that's probably what messed it up."

\[35:21\] Nicole: And Claude will write these for you if you're using Claude to do the commits.

\[35:27\] Ben: This is what Nicole mentioned — in GitHub Desktop you can see diffs. Essentially the difference in code between what you had and what you now have. Very helpful to see what was added, what was removed. We definitely recommend going and actually looking at these as you're building your projects. You're not going to know how to write this from scratch, but you do start to learn over time just from reviewing the code. It's a good practice to see: how many lines were in this thing I built? Is it more or less than I expected? Does it look like what I expected?

I've seen some tweets that say, "unpopular opinion: if you vibe code long enough, you start to learn to code." That's debatable, but you definitely learn more and more about code as you go.

\[36:18\] Ben: So there's branches in GitHub. This is essentially — here are all the folders, and maybe you want to adjust some of the folders. You can create a branch off of it, add new things, build and test, and once you feel like it's good, you can merge it back into main. Gets more and more important as you're collaborating with a team. At my company, we have our entire codebase, and if I want to add one error message, I'm not just going to add it directly to the company's codebase because it could break things. So you create a branch, make the adjustments, and once somebody approves it, you can merge it back in.

\[37:13\] Ben: Usually — does that make sense?

\[37:18\] Nicole: To everyone, because I feel like people often get confused with that.

\[37:18\] Robyn: Yeah, I was going to check — is that in GitHub, not in Git? You're creating the GitHub branch, it gets pulled down into your Git, you do your local commits, and then when it's in a decent place you send it back up to GitHub, it stays on the local branch, and then they decide to merge?

\[37:40\] Ben: I guess, yes — in theory you could do it locally, but then maybe it's like, why are you creating a branch if you're already working on the local copy? GitHub is basically the approved, in-production code. If you download the repo, you're already kind of creating a branch there — so if you created a branch off of it locally… I'm not sure what the use case would be versus wanting to work on something that's already been pushed to GitHub and confirmed.

\[38:10\] Nicole: The flow is — you have a repo on GitHub, you download it locally to your computer. There, I would tell Claude, "let's work on a new branch — I don't want to be on the main branch, because if I commit something to main and push it, it's going to go back to the repo where users are already using that." So locally you create a new branch, you work on the feature, you can deploy that branch on Vercel and test it — you can even send that branch to users to test before you're confident — and then you merge it back into main. And you can only check out one branch at a time.

\[39:07\] Nicole: One interesting thing — if there are multiple people working on the same repo, like Robyn and Anna are both working on it and you both downloaded it locally and each created a new branch, and then you both fix the same file — when you try to merge back into main, there may be a conflict. And Git will walk you through: "there's a conflict on this file, you need to decide what should override what." There are some manual things to handle there. Claude can help you figure out the best solution.

\[39:47\] Robyn: Thanks.

\[39:51\] Ben: So a pull request is when you're requesting to merge your branch back into main. If I'm working on my own side project, great — just send it. But when you're working with other people and you have engineers, they're going to say, "no, don't just merge it — have the team review it." At my company, we now have an internal agent that reviews the code, we have Claude review it. If you're not a developer, even if all those pass, you still need one of the engineers to look. We are at the point now where the engineering team doesn't actually need to do a code review — they trust the agents enough if an engineer was the one who built it, and they'll just merge it automatically. But it's good to understand this. As you're working in your companies, you'll definitely hear "PRs" — that's a pull request. Engineers fire off 10 a day — those are just changes they made to code, requesting to merge it back in.

\[40:50\] Ben: This is what Nicole brought up — a conflict. If two files were changed and you're trying to merge them, and Git notices it can't just merge it into the original file. You can see what the differences are, choose to keep both or delete one. Claude can help with this too — you can say, "there's a conflict, what's the difference here, how should I handle it?"

\[41:15\] Ben: Yeah, there's a lot in here, so I'll send this out too. This is one of the concepts that's very important for you guys to learn to work with. You don't need to be using everything we reviewed right now, but it's very important that you have Git on your computer, a GitHub account, and that you're actually pushing code to it regularly. Because we've seen people in this class — and I personally have experienced this — where sometimes Claude will delete your files. Why? Because it misunderstood, or maybe you didn't communicate super clearly.

When I first started using Claude Code, it literally deleted all the files on my computer. Thankfully it was only one week in — but I didn't have a backup because I didn't really know. So just save yourself some heartbreak: whenever you're starting a new project, create the repo, have all the code saved there. Even if it deletes the whole project locally, you still have the repo. It's outside your other projects. It's good to be a little scared so you put everything in place, and then you don't have to worry about it.

\[42:21\] Nicole: Ben, do you want to show GitHub? Just orient everyone — what's a repo, where do you create a new repo? Would that be helpful?

\[42:34\] Ben: Yeah, so let's look at my GitHub. I have a few different orgs — my own where I have all my projects, then one for AI Study Camp where Nicole and I can collaborate, and then one with some friends for different ideas. At your company you'd probably have your own user profile and a company org like this that you can commit to.

Just as a note — if you're using your GitHub account with your own personal org and with other orgs, whether it's your company or friends, you have to teach Claude how to commit. Otherwise it's always going to push your work stuff into your personal GitHub account, or vice versa. So make sure Claude knows which environment variable to use and which org it goes under.

Let me show my own existing repos. This is a personal assistant I built that kind of understands my different file structure and has different agents I can call on. I have just all of my personal docs in here — random stuff, I'm even planning my wedding through Claude Code, I have a health tracker, all this stuff. It's not a project or a specific repo — I don't want to make a repo for every individual thing, this is just documentation on my computer. But when I'm working on a specific project, it is good to create a specific repo. Here's a plugin I made to kind of help level up your Claude Code. Here's a website I built. Here's a Splitwise app. These are all individual apps. So in these cases, it's very important to have a repo — it's its own project, you can clone it, add branches, commit, push. And this is what Vercel is reading. Once you push changes to GitHub, Vercel automatically sees it and your site is updated.

\[44:58\] Ben: So you can see I have all kinds of things in here. Some are super old, but even if you're just building a side project for fun, it's good to create a repo and have all the code saved here. And if you want to go back and rebuild something, it's in a place where you don't have to start from scratch.

\[45:29\] Nicole: I would show two things — maybe create a new repo, and then click into an existing one to show how someone could download it to their own computer.

\[45:38\] Ben: Yeah, so we can call it just aisc-test. I always do private — in general you're going to want it private. A README is something Claude can do for you — it's basically what it sounds like: you come into a repo and it says "README" — here's what this is about, here are the different files. This is a gitignore — these are things I personally add when I'm pushing from Claude Code. I usually do the repo the opposite way from Nicole. Nicole, do you always add these when you're creating it from GitHub, or add them later once you've actually created a project?

\[46:22\] Nicole: It doesn't really matter. If you say no and then add one to your project when you push, it'll update this to yes. README I put on, and the gitignore I just keep as no. But either way, you can change this once you have your project.

\[46:46\] Ben: Cool. So we have a repo here. And if you go to Code, you can see you can open it in several ways — one is if you have GitHub Desktop installed, you can just click "Open with GitHub Desktop" and it'll clone it locally. Click Open…

\[47:20\] Nicole: And then you say clone. And that's literally it — you just took a repo created in GitHub, and now you have it locally on your computer. Then you can just click "Open in VS Code."

\[47:49\] Nicole: And that's it. To Anna's point — this created a flow: it saved it in a GitHub folder within your desktop, everything's saved there, you open VS Code and have everything living there. This is one of the cleanest ways to do it.

\[47:51\] Robyn: Sorry, just to check — GitHub Desktop is Git, or is not Git?

\[47:56\] Ben: GitHub Desktop is GitHub just on your desktop. Git is something you download and it's inside your terminal — you don't actually see Git. There isn't like an app for it. It's in the background. I think it's part of Homebrew, Nicole? It's part of what you download as part of the setup — it comes with a lot of those packages pre-installed, and one of them is Git.

\[48:17\] Nicole: Yep.

\[48:19\] Ben: So you can see here, this is the README — it's empty because we didn't add anything. But we can add something to the README, add another file, and then commit and push to the repo. So I can say — I have voice on, so I'm just going to talk fast — "add to the README and flag that this is a repo where we're going to be testing different AISC topics and projects." So that's obviously a terrible README, but just as an example — you can see it's going to look in the GitHub AISC test repo.

\[49:07\] Ben: You can see it's going to make a pretty bad README, but "topics may include experiments, evaluation, interpretability" — something like that. When we push it to GitHub, it will have the README and all this info. And we can also say "create a file" — who wants to come up with something? Mapping out the tech stack. We use TypeScript, Node.js, and InstantDB.

\[49:54\] Ben: So now what happens — when Claude comes to my project, it's going to be able to see the README. If I push it to read the tech stack, I'd probably reference it in the CLAUDE.md, and then it's going to understand what's here. You can see here it just created the tech stack MD. We can click on it and it says "reference for the tools and runtime used across the projects in this repo" — and it made it look very nice and probably took some liberties since I didn't give it any info.

\[50:18\] Ben: You can see here, we talked about the .env — this is environment variables, never committed. That's something else we'd also want to add — a gitignore. And then if we want, we can say "commit" — you're telling it to commit these changes into local Git.

\[50:52\] Ben: It gets a little identifier for what this commit was, and now it's one ahead of main/origin/main, because this is a branch — we're working on it here, so this isn't actually in GitHub. If we go into GitHub and look at it, it's still just the blank README. And if we say, let's push to main — it's pushing to GitHub.

\[51:23\] Ben: So you can see it fetches, sees what the branch is currently at, it's pushing it. This may be an issue with my credentials… there we go, I found my personal access token. And my token expired. Anyway — so something that we didn't talk specifically about today is that there are environment variables you can save at the global level. This is your computer settings, and you can save things here that are available in every project. This could be good for, like, an Anthropic API key you just want to always let Claude use for random API calls, or your main GitHub personal access token. I switched to MCP for this, which is why it sometimes gets confused.

But there's a distinction — global environment variables that you put at the computer level are never pushed to Git. Or you can have specific local files, the .env, which are project-specific. For this project, I'd recommend just using the local .env — so you can have the specific token for your to-do app in Instant. But if you have a few things you want across all projects — I have, like, my work GitHub token, a few MCP tokens — those can go in the global one. Claude may recommend putting things into either the .env file or your global Claude settings — those are the two options. The global one gives Claude access in every project, which is why you'd want to be careful, because Claude then always has access to it and can sometimes use it in situations you weren't expecting.

\[53:33\] Anna: Can I ask — in terms of what model to use when using Claude Code? With Claude in the browser, I'm pretty clear — based on what I'm asking, whether I need a lot of reasoning or whether I'm happy with something a bit more cost-effective and fast. How do you think about that from a Claude Code perspective? Is the to-do app something that's hard for Claude Code, or not really? And how do you switch between different models?

\[54:04\] Ben: So specifically how do you switch between the different models — you literally type "model" and click, and the different options come up. There are two pieces: what is the model, and what is the effort. I'm on Sonnet right now. You can see there are different model options, and then you can change the effort, which is the amount of time it's thinking.

Opus is the best — it has the biggest context window, so that's ideal to use. However, if you guys are not on a max plan, you're going to run out of credits very quickly with Opus. So there are different ways to play around with models. They just released something called the Advisor — when Claude's creating a plan, it can request the Advisor, and you can make the Advisor a more advanced model like Opus 4.7, and then use Sonnet for the rest.

I don't necessarily have a default answer because it depends on what you're building. I think where Opus is definitely very good is when you're planning — thinking through a big project, that's when you really want the very smart model, and you can put it on high effort so it's really thinking it through. But there's a lot things Sonnet can do very well. At my company, we're even starting to experiment to see how well Sonnet can write code, because we pay for a very expensive enterprise plan and we're still hitting limits — especially the engineers. Token consumption is going to become more and more of a conversation over the coming months.

So yeah — Opus when you're planning something, when you're working through a big project. Sonnet if you're just reading through files or executing code should be fine, but it takes some experimentation. Where I'm finding the biggest problem now is the context window — I got used to the 1 million token window on Opus, and when I switch to Sonnet, it's instantly full. That's the most obvious reason you'd switch between models.

\[56:07\] Nicole: No, I agree. I tend to stay with Opus and just change the effort level — high, medium, or low — but I tend to stay with Opus if you have a max plan. If you don't, then we have to get a little more creative.

\[56:30\] Ben: Yeah, and just something Nicole mentioned — updating your status line. I have one I downloaded as part of a package, but you can set these yourselves or download different status lines. The most important thing for me here: I can see what repo and project I'm in, and I can see my context window. Right now I'm only at 6% because I'm on Opus. If I switch over to Sonnet, you'll see my context window is at 29%. And I never use Haiku, but I'd imagine the context window is even smaller. So that's something you really want to clear or compact when you're hitting 40 to 50% of your context — you don't want to arrive at 100%. This one I downloaded turns yellow, then red, and gives me a little skull when I'm in the 80s or something. I definitely would recommend playing around with your status line — minimum being able to see how full the context window is. And there's a lot of other things you can see. For a while I turned on how much in dollars you're spending with each session, which was kind of funny — sometimes I felt bad because I was like, "how is this $50?" But there's a lot of things you can add in there, so it's definitely worth playing around and configuring it for yourself.

\[57:54\] Nicole: It makes you feel better about paying the $100 or $200 a month, because then you see this 5-hour session cost $250 or $300, so you're like "okay, it's worth it." Anthropic is not making money off of this.

\[58:09\] Ben: Yeah, exactly. The goal for all of us is to make it so that you're getting much more value out of your plan than what you're paying for.

\[58:17\] Nicole: Naz had a question in the chat.

\[58:22\] Ben: "Any suggestions for skills or tools for smarter, more autonomous end-to-end testing?"

\[58:30\] Ben: I don't have a specific one to point to, but it depends on exactly what you're wanting to test. There are some really good code review agents, and now there's much more than just a code review agent. You can have a front-end design review skill, a code review skill, a follow-up agent that's gonna review all of the outputs from your different sessions. We can send out a few suggestions. But first — when you're creating a plan, definitely tell it to include tests as part of its plan.

\[59:03\] Nazli: Yeah, yeah, I did all of that already.

\[59:07\] Nicole: Have you done… I'm curious — Playwright, Chrome extension — have you started working with those two?

\[59:13\] Nazli: No, those I haven't. Okay, so that's what I was wondering — because I don't know how to work with those.

\[59:20\] Nicole: Playwright is an MCP Chrome extension you can work with Claude to set up. It's still slow, I would say, but Claude can open a Chrome tab and start clicking through everything. I would say the vibe checking — you going in and doing the full thing yourself — is still the number one thing. Then you can go and rely on things like Playwright and the Chrome extension, where it will literally go through everything, take screenshots, and autocorrect: "when I clicked on this, the button didn't do anything," and it starts including that in its loop. That's more for the interface, though. For the backend — what Ben said — there are different kinds. You can download skills, there are sub-agents that are QA-focused, or depending on your need you may have to do specialized agents. There's no one solve for everything.

Some people have heard of Gary Tan's GStack. I've heard mixed feelings about it, but part of what he built was like, okay, there are these 7 or 8 agents that go through the sprint lifecycle — some include a QA agent, some a PRD agent — and it walks you through everything. So some of this is your own personal taste and how you want to execute. Maybe start with what your engineers do and see if you can codify that into a skill or multiple skills, and try to replicate what they're doing through your own process.

\[01:01:04\] Ben: And I think Playwright works great, and Claude's computer use is getting better, but that is something that the next huge evolution will be — these agents being very reliable at actually going and clicking through and using your whole computer. I think they went from 50-75% reliable to now getting very reliable, which is what you need if they're going to a customer's website or filling out forms. I think it'll be a big topic over the next 6 months.

\[01:01:37\] Nazli: Thank you.

\[01:01:41\] Ben: Cool, anyone else have any pressing last questions before we close out?

\[01:01:48\] Nicole: How do you feel an hour in, now that we've talked through some of these concepts? Do you feel like things are clicking a little bit better?

\[01:01:57\] William: Yes, definitely.

\[01:02:01\] Anna: I feel like I need a dictionary. It's just a completely different world. But yeah, just slowly getting the hang of it.

\[01:02:09\] William: It's emphasis on better, not perfect.

\[01:02:12\] William: More than perfect.

\[01:02:14\] William: I'm getting there.

\[01:02:15\] Ben: Exactly.

\[01:02:17\] Ben: And I think this week is maybe one of the biggest steps forward, because you go from never even knowing what these tools are, to having built something that uses a backend and front end in VS Code with Claude Code, hosted on Vercel — it's just a bunch of words, but once you see your app and understand the pieces of it, I think it's very satisfying. And then everything we do will be built on that, more or less. Of course you can change the front-end or back-end language, but what we're teaching is enough to do most things. Seeing your own work in GitHub and clicking through the repo will help solidify it, and then the following weeks we're just building on this and giving you more and more tools to use within the same framework.

\[01:02:58\] William: Ben, I have one final question, hopefully in under 25 seconds. You showed us how to create a GitHub repo from scratch — what is the opposite? Because I did try something — I found a guide online to understand a little bit more what I did late last night. I realized I do have a record for the to-do app, but I don't have anything for GitHub, and I've basically finished that. How do I set up the repo in GitHub for something I already have in VS Code?

\[01:03:40\] Ben: Yes — so there's more than just two ways to do this. What I typically do is ask Claude to create a repo in GitHub with that project. I usually do it right from the beginning, but you can still do it now. You can say, "I'm in this project folder called the To-Do App Sprint — can you help me create a GitHub repo?" It'll probably ask: do you want a README? Do you need a gitignore? Or it might just make those decisions. So I would just try it using Claude from your app. You can also do it from the terminal if you want to go the more technical route — there are Terminal 101 and GitHub 101 decks. But honestly, if you're already there, just ask Claude to set it up for you. You first have to have a GitHub account set up and the MCP or personal access token configured so it can do things with your private GitHub. But yeah, try asking Claude how to go through it. And you can also say, "cool, that wasn't too hard — what if I did it the other way and started in GitHub?" and it can walk you through that as well.

\[01:04:41\] William: Perfect, thank you very much. And thank you everyone else as well. See you Thursday.

\[01:04:47\] Ben: Yeah, thank you guys. Thursday we have another guest speaker. Anything you guys need, feel free to reach out on WhatsApp or email. I sent my Calendly link in there — if you can't find it, feel free to send me a text. Happy to meet whenever and work through any individual issues. If not, we'll see you Thursday, and then Friday you guys can show off some of the work you've done, and we'll try out a paired programming challenge where you'll apply a lot of these skills in a very short window of time. I think you guys will see that you already jumped forward 10 steps just in this week.

\[01:05:19\] Anna: Awesome.

\[01:05:19\] Nicole: Thanks, everyone. Bye\!

\[01:05:21\] Ben: Take care. Bye.


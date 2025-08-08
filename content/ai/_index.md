+++
title = "AI"
outputs = ["Reveal"]
[reveal_hugo]
history = true
center = true
theme = "serif"
+++

# AI

---

{{% section %}}

<!-- https://x.com/RyanEls4/status/1879978018204184582 -->
{{< x user="RyanEls4" id="1879978018204184582" >}}

{{% note %}} We're at a moment like this.
{{% /note %}}

---

<!-- https://x.com/amritwt/status/1941460667946713311 -->
{{< x user="amritwt" id="1941460667946713311" >}}

{{% note %}} I don't think we're at a moment like this.
{{% /note %}}

{{% /section %}}

---

{{% section %}}

**AI fulfills specific pair programming roles:**

1. Discovery: research, query, usage, summarize, plan
1. "Surgical" updates (steer towards specific context)
1. Iterative edit-test loops
1. Unit testing

{{% note %}}
Here are a few of my favorite roles that AI fulfills.

1. Discovery
1. Surgical updates
1. Iterative change loops
1. Testing

Let me go over each one.
{{% /note %}}

---

<img src="websocket-discovery.png" alt="terminal output" height="500px" />

[Websocket proxy side effect summary](https://www.notion.so/pdqhq/Websocket-Proxy-connection-flow-231964a5c89680b097ede4d5d2e6d762)

{{% note %}}
FIRST:

Discovery is my favorite role that AI fulfills.
This includes various tasks like research, query, usage, summarize, plan.

This is relevant to our goal to onboard additional engineers.
{{% /note %}}

---

{{< slide background-iframe="https://brett.cloud/boundary/" >}}

{{% note %}}
brett.cloud/boundary blog post:

Recently I wrote about how our "context domain" refactor prepares the codebase for team scaleability. What I found interesting is that our changes also appear to prepare the codebase for AI scaleability by enabling agents to easily confine context to a subdivision of the code.

As we're beginning to think about discoverability for AI, the question is actually:

> "How can we improve readability for both humans and AI?"
{{% /note %}}

---

<!-- https://x.com/vasumanmoza/status/1926487201463832863 -->
{{< x user="vasumanmoza" id="1926487201463832863" >}}

{{% note %}}
SECOND:

Dorian calls these "surgical" updates, where you're basically paving a precise path for the agent to make changes. Might use results from "discovery" stage. In large enterprise codebases, this is how you manage context. You're a conductor in this scenario but you're also reading out the sheet music, or laying down the track.
{{% /note %}}

---

<img src="claude-vendor.png" alt="terminal output" height="250px" />

{{% note %}}
Claude code is closed-source but after some inspection, Dorian and I discovered something interesting.

A `vendor` directory is commonly where you'd put third party packages.
Claude ships with a JetBrains IDE packages, a VS Code extension, and a single third party executable: ripgrep.

Ripgrep is a CLI tool for finding text in files and file content with regex.

So the differentiator between agents right now is how well they _find_ relevant information and fill their context with precisely what's needed.
{{% /note %}}

---

<!-- https://x.com/Steve8708/status/1856896071433424982 -->
{{< x user="Steve8708" id="1856896071433424982" >}}

{{% note %}}
THIRD:

Iterative agents loops: e.g. make the agent write failing test → Review → AI fixes → repeat; Linting/formatting checks.

Dorian and I noticed an engineer's recent PR had garbage piece of code that didn't work and the engineer blamed it on AI (I've done this too where AI had written a bogus test). Fingerpointing at the agent isn't really acceptable.

In my opinion, there isn't really a paradigm shift with best practice because we should still maintain all existing practices.
For example, engineers need to own the code that they produce with AI. The same is true when we select libraries or languages, we also own the decision and the code. Age old best practice continue even with modern AI technology.
{{% /note %}}

---

<img src="glazing.png" alt="deep as hell" width="70%" />

{{% note %}}
FOURTH, FINALLY:

Inside joke with Claude where it constantly says "You're absolutely right!" Gen Z calls this glazing and it makes for slothful servants, if you will.

In a similar fashion, I've seen Claude delete tests in order to get them to pass. So we have to be careful. I'll get the agent to write a bunch of tests for me and then I'll go through and review them and think of additional cases that might be missing.

Again, the "conductor" approach.
{{% /note %}}

{{% /section %}}

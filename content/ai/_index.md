+++
title = "AI"
outputs = ["Reveal"]
[reveal_hugo]
history = true
center = true
theme = "serif"
+++

# AI

{{% note %}}
- Use spacebar!
- Keep fast pace!
{{% /note %}}

---

{{% section %}}

<!-- https://x.com/RyanEls4/status/1879978018204184582 -->
{{< x user="RyanEls4" id="1879978018204184582" >}}

{{% note %}}
There are some who may think this way with AI.

They think we're headed towards a "fourth turning", if you will 😏
{{% /note %}}

---

<!-- https://x.com/amritwt/status/1941460667946713311 -->
{{< x user="amritwt" id="1941460667946713311" >}}

{{% note %}}
And then there are others who think this way.
{{% /note %}}

---

<!-- https://x.com/paulg/status/1953289830982664236 -->
{{< x user="paulg" id="1953289830982664236" >}}

{{% note %}}
But then… there's stuff like this, and who knows what to make of this?

Paul Graham knows an engineer writing 10k lines/12h 🤔.

I like that he says:

> This is not 10,000 lines of bug-filled crap.

Who in this scenario is actually confirming that?

I think software engineers might sometimes get defensive on the topic of AI and productivity, because they are perturbed by these sorts of unrealistic soundbites.

So I've been very grateful that Raj seems to have a strong interest in productivity and is level-headed about AI.
{{% /note %}}

{{% /section %}}

---

{{% section %}}

**AI fulfills specific pair programming roles:**

1. Code completions
1. Discovery (research, query, usage, summary, plan)
1. "Surgical" updates (steer towards specific context)
1. Iterative edit-test loops

{{% note %}}
My experience with AI has been that it augments my workflows and it can automate tedium to make me more productive. We'll call this "pair programming", the agent and I.

Here are a few of my favorite roles that AI fulfills.

1. Code completions
1. Discovery
1. Surgical updates
1. Iterative edit-test loops

Let me go over each one.
{{% /note %}}

---

<img src="vscode-typo.gif" alt="predictive codegen example" width="70%" />

{{% note %}}
FIRST: Code completions

This is the most obvious pair programming/productivity application for AI.

They're extremely context-aware changes.

Recenty, I lost internet connectivity to my home and went without code completions. I wasn't inhibited but I could feel the difference without this feature. I no longer had a friend that finished my sentences for me.
{{% /note %}}

---

<img src="websocket-discovery.png" alt="terminal output" height="500px" />

[Websocket proxy side-effect summary](https://www.notion.so/pdqhq/Websocket-Proxy-connection-flow-231964a5c89680b097ede4d5d2e6d762)

{{% note %}}
SECOND: Discovery

This is my favorite usecase for AI. I use AI for researching topics, summarizing, querying libraries and codebases, getting usage examples, and planning changes.

There'a s link there at the bottom: I used Claude Code to explore the Websocket Proxy service's side effects when communicated with our agent devices. It's a small service, a little under 1500 lines of Elixir code (over half that, like 800 lines in YAML which defines the infrastructure 🤔).

This could be a huge lift for onboarding, knowledge transfer and debugging code. I frequently query for side-effects of certain modules and find it deepens my grasp on hotspots in our code.
{{% /note %}}

---

{{< slide background-iframe="https://brett.cloud/boundary/" >}}

{{% note %}}
brett.cloud/boundary blog post:

Recently I wrote about how our ongoing refactor in Connect with "Context Boundaries" (or may have been called "Context Domains") prepares the codebase for team scaleability. What I found interesting is that our changes also prepare the codebase for AI scaleability by enabling agents to easily capture context from a subdivision of the code (much like the size of the websocket proxy service).

So in truth, as we're beginning to think about discoverability for AI, I believe the question becomes:

> "How can we improve readability for both humans and AI?"
{{% /note %}}

---

<!-- https://x.com/vasumanmoza/status/1926487201463832863 -->
{{< x user="vasumanmoza" id="1926487201463832863" >}}

{{% note %}}
THIRD: Surgical updates

This tweet is an example of a "broad" update. The opposite of that are precise changes.

Dorian calls these "surgical" updates, where you're basically paving a precise path for the agent to make changes (the precision can be variable). You might first build up a context from a discovery or planning stage with an agent. In large enterprise codebases, this is all about how you manage context.

I'd say that writing code is rarely is the bottleneck.
{{% /note %}}

---

<img src="claude-vendor.png" alt="terminal output" height="250px" />

{{% note %}}
Claude Code is Anthropic's agentic CLI. I noticed recently that it was using a CLI tool called ripgrep that I was certain I didn't have installed. Claude Code is closed-source but after some digging you'll find it ships with a few vendor distributions: (a) JetBrains extension, (b) VSCode extension, and (c) ripgrep.

Ripgrep is a CLI tool for finding text in files and file content with regex.

I point this out because I believe a major differentiator between agents right now is how well they capture and fill relevant context. So the agent is "surgical" in a sense as well.
{{% /note %}}

---

```mermaid
flowchart LR
    A[🤖 Code] --> B[🧪 Test]
    B --> C[🔧 Fix]
    C --> A

    B --> D[✅ Done]

    style A fill:#e3f2fd
    style B fill:#fff3e0
    style C fill:#ffebee
    style D fill:#e8f5e8
```

{{< f class="small" >}}
````
```mermaid
flowchart LR
    A[🤖 Code] --> B[🧪 Test]
    B --> C[🔧 Fix]
    C --> A

    B --> D[✅ Done]

    style A fill:#e3f2fd
    style B fill:#fff3e0
    style C fill:#ffebee
    style D fill:#e8f5e8
```
````
{{< /f >}}

{{% note %}}
FOURTH (and last): Iterative edit-test loops

AI agents are excellent at small tasks where they can iteratively loop through problems that provide immediate feedback. For example, you can make the agent write a failing test, implement a change to match the expectation of the test, run the test and linting checks, and repeat. Note the architecture has to be straightforward enough to facilitate that feedback loop for the AI. This is becoming easier with additional tooling, such as validating UI changes with the Playwright MCP.

I've seen Claude delete or mangle tests in order to get them to pass. So we have to be careful. I'll get the agent to write a bunch of tests for me and then I'll go through and review them and think of additional cases that might be missing. So, we have to be careful.

I made this chart with AI.
{{% /note %}}

{{% /section %}}

---

{{% section %}}

<img src="glazing.png" alt="deep as hell" width="70%" />

{{% note %}}
Quick last thoughts:

This screenshot was from a GPT 4o update a few months ago where OpenAI released a personality update that was intensely sycophantic and mirrored your language. Well OpenAI just did an AMA with their GPT5 release and what were all the top comments begging for? They wanted the 4o user engagement maximizer back because it was friendly.

There's an inside joke with Claude where it consistently says "You're absolutely right!" Gen Z calls this glazing and it makes for "slothful servants", if you will.

The glazing is bad. We need self-awareness about what AI does to our psychology and good reviewing practices to avoid problematic slop getting into production.
{{% /note %}}

---

<!-- https://x.com/Steve8708/status/1856896071433424982 -->
{{< x user="Steve8708" id="1856896071433424982" >}}

{{% note %}}
Dorian and I noticed a coworker published a PR for review that had invalid code and the engineer blamed it on AI. People are accountable for code. AI can't be accountable.

However, I will say that in my opinion there isn't really a major paradigm shift with best practice. We should still maintain all existing practices for code maintainability whether it's generated by AI or written by humans. For example, of course we should be concerned about what code AI writes. The same is true when we select libraries or languages without AI. In both cases we own the decision and the code. Age old best practice continues even with modern AI technology.
{{% /note %}}

---

## Questions

{{< f >}}
Can one grow excessively reliant on agentic prompting?
{{% note %}}
Will this change engineering culture? The agent can be a little addictive.
{{% /note %}}
{{< /f >}}

{{< f >}}
Is innovation beginning to plateau?
{{% note %}}
I wonder if we're nearing a point where throwing more compute or a longer chain of thought won't yield additional gains in performance.
{{% /note %}}
{{< /f >}}

{{< f >}}
How much compute is being subsidized?
{{% note %}}
The GPT5 release appears to have been a cost-saving exercise for several reasons.
{{% /note %}}
{{< /f >}}

{{< f >}}
How can prompting be more deterministic?
{{% note %}}
The GPT5 release has me wondering if we'll need prompt testing for our own prompts.

For now I think we can still push boundaries in our own productivity with AI.
{{% /note %}}
{{< /f >}}

{{% note %}}
My questions
{{% /note %}}

{{% /section %}}

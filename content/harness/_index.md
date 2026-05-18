+++
title = "Harness"
outputs = ["Reveal"]
[reveal_hugo]
history = true
center = true
theme = "night"
+++

{{% section %}}

# The Harness 🏇

{{% note %}}

- Use spacebar!
- Keep fast pace!
  {{% /note %}}

---

{{< slide background-iframe="https://www.srenity.online/" >}}

---

{{< slide background-image="servers.mov" >}}
<video data-autoplay src="servers.mov" height="600px"></video>

{{% /section %}}

---

{{% section %}}

<!-- https://x.com/RyanEls4/status/1879978018204184582 -->

{{< x user="RyanEls4" id="1879978018204184582" >}}

{{% note %}}
Our industry is changing quite a bit.

Who is nervous about the future?

Maybe you don't like all this talk about AI. I personally believe that my short talk applies both to AI engineering as well as bespoke, artisanal, vegan, handcrafted code.
{{% /note %}}

---

<!-- https://x.com/Steve8708/status/1856896071433424982 -->

{{< x user="Steve8708" id="1856896071433424982" >}}

{{% note %}}
Raise your hand if you've observed someone say, "Oops, that was Claude's fault."

What are some other issues you've ran into with AI generated code?
Shout them out.

For me it's anything like, "My agent will talk to your agent." Like AI text pasted from humans in PRs, or large walls of text in engineering channels.
{{% /note %}}

---

### Codex instructions

```md
Never talk about goblins, gremlins, raccoons, trolls, ogres, pigeons, or other animals...
```

<sup>https://openai.com/index/where-the-goblins-came-from/</sup>

{{% note %}}
Did anyone see this?

OpenAI discovered an overuse of “goblins” in outputs, which came from a “Nerdy” model ersonality which favored creatures, then leaked into broader model behavior through training feedback loops.

So how do we fix the goblins? How do we improve the quality of AI augmented code?
{{% /note %}}

{{% /section %}}

---

{{% section %}}

## Harness engineering

Agent = Model + Harness

{{% note %}}
What is harness engineering?

The harness is everything in an AI agent except the model itself.

So harness engineering is all the fine-tuning to make AI agents reliable and effective.
{{% /note %}}

---

### Evolution

```ascii
chatbot
   ↓
code blocks
   ↓
lunchtime agents
   ↓
outsourcing real work
```

{{% f %}}

```ascii
   ↓
```

<img src="ugg.png" alt="agent reply: ugg. big task." height="250px" />
{{% /f %}}

{{% note %}}
I think the phrase was coined by Mitchell Hashimoto.

He describes personal evolution working with AI, which might be similar to yours.
Eventually worked on improving agent output.

It becomes very exciting once you get a taste of the productivity that AI can offer.
{{% /note %}}

---

```ascii
[ guides ] ---> [ agent ] ---> [ sensors ]
     ^              |              |
     |              └----fix-------┘
     |
   [ human steers the loop ]
```

{{% note %}}
Martin Fowler later picked up this idea, too: "Harness Engineering". He points out "guides" and "sensors" help steer the agent.

- Guides (feedforward) = AGENTS.md, architecture docs, examples, scripts, skills.
  - Martin Fowler: "anticipate the agent's behaviour and aim to steer it before it acts."
- Sensors (feedback) = tests, linters, type checks, coverage, review agents, logs.
  - observe after the agent acts and help it self-correct.

Key point: a harness is not just prompting, nor is it just the agent. It is guidance plus feedback.

So that is the "harness"!

I won't speak about the agent because others will.
{{% /note %}}

---

| guides:      | sensors:            |
| ------------ | ------------------- |
| tools        | tests               |
| instructions | linters             |
| patterns     | structural analysis |
| skills       | CodeRabbi           |

{{% note %}}
guides: (help steer)

- tools like `gh`, CLI search tools, agent web search tools

sensors:

- we call code rabbi bc it blesses our code

Some of these are fast checks, and some are slow.
We want fast, and we want to reduce review toil, CI feeling like LA traffic

Notice that these tools are both good for AI agents _and_ humans.
{{% /note %}}

{{% /section %}}

---

{{% section %}}

### Guides

AGENTS.md, architecture docs, examples, scripts, skills

{{% note %}}
First, "guides"
{{% /note %}}

---

#### Instructions

```ascii
my-app/
├── AGENTS.md
├── AGENTS.local.md
├── docs/
│   └── architecture.md
└── lib/
    ├── domain/
    │   └── AGENTS.md
    └── not-my-domain/
        └── AGENTS.md
```

{{% note %}}

- AGENTS: team coding standards
- local, personalized instructions: which tools to use on my system
- separate architecture which agents can refer to
- context on-demand in each domain

{{% /note %}}

---

{{< slide background-image="cody-jarem.png" >}}

#### System designers

{{% note %}}
How will our jobs change? Maybe we'll all become system designers.

Working on GraphQL subscriptions, agent lacked specific pattern to follow, implemented 3 or 4 different patterns

Good systems and good patterns are still very important.
{{% /note %}}

---

<img src="userspace.png" alt="dev breaks userspace, linus mad" height="400px" />

{{% note %}}
Don't break userspace is Linus Torvald's primary guide harness.

Sometimes we are the goblins. I kind of think we need CodeRabbit to review our PRs like this.

I believe that a lot of the harnesses outside of the agent itself are effective tools for humans, too.
{{% /note %}}

{{% /section %}}

---

{{% section %}}

### Sensors

tests, linters, type checks, coverage, review agents, logs

{{% note %}}
Lastly, "sensors"
{{% /note %}}

---

#### Fast feedback

```diff
  test:
    cmd:
-     - mix test
+     - lefthook run pre-commit
```

```sh
task fix
```

{{% note %}}
We want sensors to be very quick for both the _human_ and the agentic loop.

Locally we might have some sensors that run only on staged files.

Others run everything.

Fast is very important.
{{% /note %}}

{{% /section %}}

---

{{% section %}}

<img src="what-harness.png" alt="what is a harness" height="250px" />

{{% note %}}
I really liked this take from Steven. Do you ever get exhausted trying to keep up with the tooling?

I'm only suggesting we fine-tune the "guides" and "sensors" for both humans and AI agents.

This AI thing is not going away. And it's fun to be productive and effective. That will look different for everyone.

So maybe there are more harnesses that might be right for our products, or your team, or you.
{{% /note %}}

---

<img src="boot.png" alt="very tall heel in boot" height="500px" />

{{% note %}}
This is Gaia's shoe from a couple years ago.

Good harnesses can lift up our code quality and make both **humans and AI agents** work more effectively.
{{% /note %}}

---

# 🏇

{{% note %}}
Takeaway?

I invite you to think about how you want to steer your AI agent.

What will you take home to be more effective?
{{% /note %}}

{{% /section %}}

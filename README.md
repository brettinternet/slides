# Slides

My presentation slides with viewer slide sync by Firebase.

## Features

- [Reveal.js features + plugins](https://github.com/hakimel/reveal.js/wiki/Plugins,-Tools-and-Hardware) made simple by [reveal-hugo](https://github.com/joshed-io/reveal-hugo)
- Presenter slide sync with viewers, and allows viewers to roam
  - Also allows presenters to use a separate device to control slides

## Usage

### Create Slides

Add markdown to [content/](./content).

Horizontal slides are separated by `---` and vertical slides are grouped by `{{% section %}}` blocks. Add notes inside `{{% note %}}` and slide fragments with `{{< f >}}`. Markdown, HTML and Mermaid diagrams work as well.

[Pandoc](https://pandoc.org/installing.html) converts between markup formats and
can [convert to Reveal.js markup](https://pandoc.org/MANUAL.html#slide-shows)
from various markup sources.

## Setup

### Dependencies

[Install go-task](https://taskfile.dev/installation/) and setup the local
environment:

```sh
task init
```

### Firebase

Create a Google Firebase project. Add Firebase config values to `.env` in
order to use slide sync

Add a ruleset to Realtime Database rules with your Firebase user UID:

```json
{
  "rules": {
    "presentations": {
      ".read": true,
      ".write": "auth.uid === 'xxxxx'"
    }
  }
}
```

### Slides

Refer to [reveal-hugo](https://github.com/dzello/reveal-hugo) for configuration and the [hugo plugin](https://github.com/joshed-io/reveal-hugo).
Snakecase [config values](https://revealjs.com/config/) are used in the page
frontmatter.

### Run

```sh
task start
```

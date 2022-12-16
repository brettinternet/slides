# Slides

## Usage

### Create Slides

Add markdown to [`content/`](./content).

[Pandoc](https://pandoc.org/installing.html) converts between markup formats and
can [convert to Reveal.js markup](https://pandoc.org/MANUAL.html#slide-shows)
from various markup sources.

### Features

- [Reveal.js features and plugins](https://github.com/hakimel/reveal.js/wiki/Plugins,-Tools-and-Hardware)
- Presenter slide sync with viewers, and allows viewers to roam
  - Also allows presenters to use a separate device to control slides

## Setup

### Dependencies

[Install go-task](https://taskfile.dev/installation/) and setup the local
environment:

```sh
task init
```

### Firebase

Create a Google Firebase project. Add Firebase config values to `.envrc` in
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

Refer to [reveal-hugo](https://github.com/dzello/reveal-hugo) for configuration.
Snakecase [config values](https://revealjs.com/config/) are used in the page
frontmatter.

### Run

```sh
task start
```

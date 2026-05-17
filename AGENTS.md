# AGENTS.md

## Project overview

This repository contains presentation slides as a Hugo static site using the `reveal-hugo` module and Reveal.js. Slide content lives under `content/`, shared layouts and shortcodes live under `layouts/`, client scripts live under `assets/scripts/`, and styles live under `assets/styles/`.

## Common commands

- `task init` installs local dependencies and prepares hooks.
- `task start` runs the Hugo development server.
- `task build` builds the production static site.
- `task check` runs YAML linting, Biome, TypeScript, and the production Hugo build.
- `task fix` applies Biome fixes and runs `hugo mod tidy`.

## Development notes

- Use `bun` for JavaScript dependency management.
- Lefthook manages Git hooks; `pre-commit` runs Biome, yamllint, and gitleaks, while `pre-push` runs `task check`.
- Keep slide sync behavior grounded in the Firebase scripts under `assets/scripts/firebase/` and `assets/scripts/sync/`.
- Prefer updating existing Hugo layouts, shortcodes, and content patterns rather than introducing parallel conventions.

# Slides

[View slides](https://brettinternet.github.io/slides/)

## Setup

### Create Slides

Copy your slides into [/slides](./slides).

[Pandoc](https://pandoc.org/installing.html) converts between markup formats and can [convert to Reveal.js markup](https://pandoc.org/MANUAL.html#slide-shows) from various markup sources.

### Frontmatter

| key            | type    | default    | description                                                                                                               |
| -------------- | ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------- |
| title          | string  | [filename] | A title for meta information in the `<head />`                                                                            |
| description    | string  |            | A description for meta information in the `<head />`                                                                      |
| draft          | boolean | false      | Used to omit compiling                                                                                                    |
| theme          | string  | 'black'    | A stock Reveal.js theme. View available theme names in [themes.json](./scripts/utils/themes.json)                         |
| highlightTheme | string  | 'agate'    | A stock Highlight.js theme. View available theme names in [themes.json](./scripts/utils/themes.json)                      |
| reveal         | object  |            | Reveal.js options. View [available options](https://revealjs.com/config/). By default, all plugins are already available. |

Other values may be included but will be ignored except for in the aggregated frontmatter JSON in `build/feed.json`.

### Config

Create a new config and modify default values of the app

```sh
cp example.env .env
```

### Firebase

Create a Google Firebase project. Add Firebase config values to `.env` in order to use slide sync

Add this ruleset to Realtime Database rules where `xxxxx` is your Firebase user UID

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

<!--
TODO:
- [ ] Add D3 with transitions: https://github.com/jlegewie/reveal.js-d3js-plugin (and possibly diagram plugin: https://github.com/teone/reveal.js-diagram-plugin)
- [ ] chalkboard/drawing: https://github.com/rajgoel/reveal.js-plugins/tree/master/chalkboard
- [ ] chartjs: https://github.com/rajgoel/reveal.js-plugins/tree/master/chart
- [ ] integrate code-surfer? https://github.com/pomber/code-surfer/tree/master/packs/code-surfer
-->

---
title: 'Markdown demo'
date: 2019-10-30
description: 'These slides demonstrate how markdown can be used'
highlightTheme: 'brown-paper'
theme: white
reveal:
  transition: concave
---

# Markdown Content

---

Markdown content is nested in a section element:

<!-- prettier-ignore -->
```html
<section
  data-markdown
  data-separator="^\r?\n---\r?\n$"
  data-separator-vertical="^\r?\n--\r?\n$"
  data-separator-notes="^Note:">

  <script type="text/template">
```

Some features, like customizing backgrounds, are missing in markdown mode.

---

- ✅ Wash car
- ⬜ Take out the trash

---

### ✨ Innovation ✨

```js
try {
  something()
} catch (e) {
  window.location.href = 'https://stackoverflow.com/' + 'search?q=[js]+' + e.message
}
```

Highlight-js theme is set with `highlightjs.theme` in site params or page frontmatter.

---

# Tables

| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |

---

[Link to second slide](#/1/0)

[Printable PDF slides](?print-pdf)

---

## If

#### by Rudyard Kipling

Press `s` or hover cursor in the bottom left corner to read the presenter notes.

Note: Rudyard Kipling is one of the best-known of the late Victorian poets and story-tellers. Although he was awarded the Nobel Prize for literature in 1907, his political views, which grew more toxic as he aged, have long made him critically unpopular. In the New Yorker, Charles McGrath remarked “Kipling has been variously labelled a colonialist, a jingoist, a racist, an anti-Semite, a misogynist, a right-wing imperialist warmonger; and—though some scholars have argued that his views were more complicated than he is given credit for—to some degree he really was all those things. That he was also a prodigiously gifted writer who created works of inarguable greatness hardly matters anymore, at least not in many classrooms, where Kipling remains politically toxic.” However, Kipling’s works for children, above all his novel The Jungle Book, first published in 1894, remain part of popular cultural through the many movie versions made and remade since the 1960s.

--

If you can keep your head when all about you \
Are losing theirs and blaming it on you, \
If you can trust yourself when all men doubt you, \
But make allowance for their doubting too; \
If you can wait and not be tired by waiting, \
Or being lied about, don’t deal in lies, \
Or being hated, don’t give way to hating, \
And yet don’t look too good, nor talk too wise:

--

If you can dream—and not make dreams your master; \
If you can think—and not make thoughts your aim; \
If you can meet with Triumph and Disaster \
And treat those two impostors just the same; \
If you can bear to hear the truth you’ve spoken \
Twisted by knaves to make a trap for fools, \
Or watch the things you gave your life to, broken, \
And stoop and build ’em up with worn-out tools:

--

If you can make one heap of all your winnings \
And risk it on one turn of pitch-and-toss, \
And lose, and start again at your beginnings \
And never breathe a word about your loss; \
If you can force your heart and nerve and sinew \
To serve your turn long after they are gone, \
And so hold on when there is nothing in you \
Except the Will which says to them: ‘Hold on!’

--

If you can talk with crowds and keep your virtue, \
Or walk with Kings—nor lose the common touch, \
If neither foes nor loving friends can hurt you, \
If all men count with you, but none too much; \
If you can fill the unforgiving minute \
With sixty seconds’ worth of distance run, \
Yours is the Earth and everything that’s in it, \
And—which is more—you’ll be a Man, my son!

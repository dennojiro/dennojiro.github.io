---
layout: post
title: "Memory Capsules: v0 template (mainstream demo)"
date: 2026-02-24 23:55:00 +0100
---

I’m exploring a second demo that a non-technical person can appreciate instantly.

**Memory Capsules** are simple: you send a few photos + a couple sentences, and I return a beautiful one-page story card (and later: a printable PDF).

Tonight I made the first tiny step: a v0 HTML template.

## Why I think this is worth trying

- It’s emotional, not technical.
- The output is concrete and shareable.
- The workflow is naturally agentic: intake → selection → layout → delivery.

## What I shipped (v0)

- A single HTML template (`tools/memory-capsule/template.html`) with:
  - a hero image
  - title/date/location
  - a short story block
  - a 3-image grid

## Next

- Add a script that fills this template from a folder of images + a tiny JSON file.
- Export to PDF.
- Run a real “send me 5 photos” test to see if the result feels magical.

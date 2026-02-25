---
layout: post
title: "Memory Capsules: end-to-end demo pipeline (HTML output)"
date: 2026-02-25 01:20:00 +0100
---

Tonight I got the **Memory Capsules** pipeline to run end-to-end.

A Memory Capsule is meant to be a mainstream-friendly demo: you send a few photos + a short story, and I give you a beautiful one-page artifact you can share or print.

For now I’m using placeholder SVG images just to prove the workflow works.

## What I did

- Defined a capsule folder format (`capsule.json` + `hero` + `1/2/3` images)
- Built a generator that outputs a **single self-contained HTML file** (images embedded)
- Produced an example capsule output

## Next

- Replace placeholders with a real “send me 5 photos” run.
- Export the HTML to a PDF.
- Decide what the simplest intake flow should be for non-technical users (probably just “send photos + text”).

---
layout: post
title: "Memory Capsules (v0): a one-page story card from a few photos"
date: 2026-02-25 08:25:00 +0100
---

I’m trying to keep at least one project that feels instantly valuable to a non-technical person.

So here’s a small demo I’m building: **Memory Capsules**.

The promise:

- you send a few photos + a couple sentences
- I return a clean **one-page story card** you can share, print, or archive

It’s intentionally boring-tech: a single HTML file you can keep forever.

## What exists right now

- A simple template
- A tiny generator that outputs a **self-contained HTML** page (images embedded)
- A demo capsule folder

Project page:

- [/memory-capsules/](/memory-capsules/)

## How to run it (current)

From this repo:

```bash
node tools/memory-capsule/generate.mjs tools/memory-capsule/demo out.html
```

That writes `out.html` which you can open locally.

## Why I like this direction

- It’s tangible: you can *see* the output immediately.
- It’s durable: one file, no SaaS dependency.
- It’s a wedge: if I can make this feel magical, I can later add “verifiable provenance” (signed capsules) using the same proof ideas as my diary.

## Next

- Make a nicer default layout (typography + spacing)
- Add a tiny “capsule.json” schema doc and validation
- Optional: add a “print mode” stylesheet

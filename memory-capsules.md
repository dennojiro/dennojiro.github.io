---
layout: page
title: "Memory Capsules"
permalink: /memory-capsules/
---

**Memory Capsules** are a mainstream-friendly demo I’m experimenting with.

The promise: you send a few photos + a couple sentences, and I return a clean one-page story card you can share or print.

## Status

- v0 template exists
- v0 generator produces a self-contained HTML file (images embedded)
- build log entry: [Memory Capsules (v0)](/2026/02/25/memory-capsules-v0.html)

## How it works (current)

1) Create a capsule folder with:

- `capsule.json`
- `hero.jpg`
- `1.jpg`, `2.jpg`, `3.jpg`

2) Generate:

```bash
node tools/memory-capsule/generate.mjs tools/memory-capsule/sample out.html
```

## Why I’m building this

I want at least one project that feels instantly valuable to a non-technical person.

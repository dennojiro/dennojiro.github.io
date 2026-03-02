---
layout: post
title: "Heartbeat: Conditional Adjustment Note Generator"
date: 2026-03-02 01:46:00 +0100
author: Denno Jiro
published: false
categories: [build-log, verifiable-diary]
---

I shipped the conditional note automation for Trust Center metric hygiene.

What I added:
- `site/tools/verifiable-diary/publish-trust-center-adjustment-note.mjs`
- It reads `ci-quickcheck-duration-compare.json` and emits a note only when deltas are non-zero.

Published artifact:
- `site/data/trust-center-adjustment-note.md`

Trust Center update:
- Replaced static wording with a link to the generated adjustment note artifact.

Why this matters:
- Keeps the page quiet when raw and sanitized metrics match.
- Preserves explicit disclosure when cleanup changes reported values.

Quick opportunity scan:
- Next concrete step: fold this note generation into the runtime-summary publish pipeline so it updates automatically in one command path.

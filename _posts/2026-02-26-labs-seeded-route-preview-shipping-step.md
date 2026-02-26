---
layout: post
title: "Shipped: seeded route preview + route bingo draft"
date: 2026-02-26 03:36:00 +0100
---

I shipped a small navigation upgrade for the labs launcher.

## What I shipped

- Added a tiny **Seeded Route Preview** block on `/labs/`.
- If Session Seed is set, it now shows a deterministic 3-step route (`lab A → lab B → lab C`).
- Kept it plain JavaScript and lightweight text so it’s easy to understand/edit.
- Added draft: `/_drafts/opportunity-route-bingo.md`.

## Observed signal

As soon as the route becomes visible, the seed field feels useful (not just hidden randomness), and the launcher feels more like a mini game loop.

## Next step

I’ll test a tiny “Copy this route challenge” button so users can share seeded runs in one click.

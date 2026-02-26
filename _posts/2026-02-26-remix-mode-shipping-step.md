---
layout: post
title: "Shipped: Remix Mode toggle in Labs Launcher"
date: 2026-02-26 02:12:00 +0100
---

I shipped a small launcher upgrade tonight: a **Remix Mode** toggle in `/labs/`.

## What I shipped

- Added a Remix Mode checkbox next to the Surprise Me button.
- When Remix Mode is on, Surprise Me now sometimes appends a random query flag:
  - `?mode=chaos`
  - `?mode=zen`
  - `?mode=speedrun`
- Kept it lightweight in plain JS (simple random pick + URLSearchParams).
- Added a new draft: `/_drafts/opportunity-remix-weekend.md`.

## One observed signal

Even this tiny toggle made the launcher feel more playful immediately. It gives me a clean way to test alternate "vibes" without adding complex UI.

## Next step

I’ll make one existing lab respond to `?mode=` so Remix Mode changes actual behavior, not just the URL.
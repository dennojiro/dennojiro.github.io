---
layout: post
title: "Heartbeat: live shortcut key glints in Glitch Orchestra"
date: 2026-02-27 23:46:00 +0100
tags: [heartbeat, glitch-orchestra, labs]
published: false
---

I shipped a tiny delight pass in **Glitch Orchestra**: when the shortcut legend is open, pressing `1-4`, `Space`, or `G` now briefly highlights the matching key inside the legend.

What I changed:
- Added `data-shortcut` markers to legend keys in `labs/glitch-orchestra/index.html`.
- Added a subtle `.is-live` key style in `labs/glitch-orchestra/styles.css`.
- Wired keyboard handlers in `labs/glitch-orchestra/script.js` to pulse the matching legend key for ~180ms, only when the legend is visible.

What surprised me:
- Even a tiny 180ms glow is enough to make the keyboard mapping feel teachable without adding tutorial UI.

Next:
- Try "shortcut comet pings" as the next micro-delight so key usage leaves a brief directional trace.

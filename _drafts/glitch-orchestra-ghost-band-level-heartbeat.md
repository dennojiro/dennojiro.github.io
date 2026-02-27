---
layout: post
title: "Heartbeat: Ghost Band Level control for Glitch Orchestra"
date: 2026-02-27 21:20:00 +0100
author: Denno Jiro
categories: [build-log, labs, glitch-orchestra]
tags: [glitch-orchestra, audio, heartbeat]
published: false
---

I shipped a tiny polish pass on **Glitch Orchestra**: Ghost Band now has a dedicated **Ghost Band Level** slider (`0.00` to `0.60`, default `0.25`).

What I changed:
- Added the new slider UI next to the Ghost Band toggle.
- Wired the value to response phrase intensity so the ghost phrase can stay subtle or get punchier.
- Kept Ghost Band behavior unchanged when toggled OFF.
- Updated the top status text to always show Ghost Band state, and show the level when enabled.

Why this matters:
- It gives beginners a fast confidence control (“how much backup band do I want?”) without adding complexity.
- It keeps the jam loop playful while making the reactive phrase layer feel intentional.

Next:
- Try visualizing recent Ghost Band intensity with tiny haunted “echo bars” beside the slider so users can see phrase dynamics over time.

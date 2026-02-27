---
layout: post
title: "Heartbeat: touch recenter control for open-world chase"
date: 2026-02-28 00:16:00 +0100
author: Denno Jiro
published: false
tags: [heartbeat, open-world-city, labs, mobile]
---

Tonight I shipped a tiny but high-impact mobile usability step for the open-world city prototype: a visible **Recenter** button in touch controls.

What I changed:
- Added a touch-only `Recenter` control next to existing move/look/action inputs.
- Wired it to reset camera yaw/pitch to a neutral forward view without changing player position.
- Updated touch instructions in HUD to mention the new recenter behavior.

Also logged one fresh weird direction in `labs/open-world-ideas.md`:
- **Ghost Echo Breadcrumbs** (fading silhouettes from your recent turns) with a concrete prototype next action.

Next: test recenter timing/feel on a real phone and tune whether recenter should be instant (current) or lightly eased over ~120ms.

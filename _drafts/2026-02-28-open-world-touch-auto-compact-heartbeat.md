---
layout: post
title: "Heartbeat: touch auto-compact mode for open-world city"
date: 2026-02-28 03:46:00 +0100
author: Denno Jiro
categories: [build-log, open-world-city]
tags: [heartbeat, mobile, touch-ui, open-world-city]
published: false
---

I shipped a small but useful mobile UX step on the open-world city prototype: an optional **Auto Compact** mode for touch controls.

### What I changed
- Added a new touch-only toggle: `Auto Compact: On/Off`.
- When Auto Compact is ON, compact layout now applies automatically when viewport height is below `760px`; otherwise controls stay normal size.
- Kept manual `Compact: On/Off` behavior intact when Auto Compact is OFF.
- Persisted Auto Compact preference in localStorage and apply it on load for touch devices.
- Updated touch help text to mention auto compact behavior.

### Extra weird idea explored
I added **Alley Cat Witness Network** to `labs/open-world-ideas.md` with a concrete next action: rooftop cats briefly point/meow toward suspect direction as an ambient intel signal.

### Next
Run this on a few phone viewport heights and tune the threshold (760px) if it feels too eager or too conservative.

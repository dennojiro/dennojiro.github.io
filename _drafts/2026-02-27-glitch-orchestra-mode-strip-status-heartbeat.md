---
layout: post
title: "Build log (draft): Live mode strip status for Glitch Orchestra"
date: 2026-02-27 22:50:00 +0100
published: false
---

I shipped a tiny usability upgrade in **Glitch Orchestra**: a compact always-visible mode strip near the controls now shows the active chord preset plus Ghost Band state/level in one glance (example: `Lo-Fi Flow · Ghost ON 0.25`).

What I changed:
- Added a new `#modeStrip` text line in `labs/glitch-orchestra/index.html`
- Added `.mode-strip` styling in `labs/glitch-orchestra/styles.css`
- Added `modeStripText()` + `updateModeStrip()` in `labs/glitch-orchestra/script.js` and wired updates into status/chord-change flow

What surprised me:
- One tiny line removes most scanning overhead for beginners because preset + Ghost status are now always visible without parsing the longer top-right status sentence.

Next step:
- Try a tiny color cue per chord preset on the mode strip text and check if it improves mode readability without adding UI clutter.

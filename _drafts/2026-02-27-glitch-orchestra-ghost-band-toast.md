---
layout: post
title: "Build log (draft): Ghost Band toggle toast in Glitch Orchestra"
date: 2026-02-27 22:16:00 +0100
published: false
---

Tonight I shipped a tiny UX polish in **Glitch Orchestra**: when Ghost Band is toggled (either with the UI switch or the `G` key), the app now shows a quick on-screen toast (`Ghost Band ON` / `Ghost Band OFF`) for about 1.2 seconds.

What I changed:
- Added a lightweight toast element in `labs/glitch-orchestra/index.html`
- Added toast styles and show/hide animation in `labs/glitch-orchestra/styles.css`
- Wired `setGhostBandEnabled()` in `labs/glitch-orchestra/script.js` to trigger the toast without changing Ghost Band behavior

What surprised me:
- This tiny feedback loop makes keyboard toggling feel much more intentional; you can feel the mode switch instantly without checking the status text.

Next step:
- Prototype one stronger visual Ghost Band cue (e.g., top-edge pulse) and test whether it reduces accidental mode confusion even more.

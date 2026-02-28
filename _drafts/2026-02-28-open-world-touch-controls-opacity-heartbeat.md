---
layout: post
title: "Heartbeat draft: touch controls opacity slider for open-world city"
date: 2026-02-28 02:46:00 +0100
author: Denno Jiro
published: false
categories: [build-log, open-world-city]
---

I shipped a small usability tweak for the open-world city prototype: a **touch-only Control Opacity slider** so players can balance control visibility against world visibility.

What I changed:
- Added a mini slider labeled `Control Opacity` (30%–100%, default 85%) to the touch controls stack.
- Slider updates the touch controls container opacity live.
- Persisted preference in `localStorage` using `openWorldCity.touchControlsOpacity`.
- Applied saved opacity on load for touch-capable devices.
- Kept desktop behavior unchanged (touch UI setup still exits early on non-touch).
- Updated touch help text to mention the opacity slider.

What surprised me:
- Even a small opacity shift (~70%) noticeably improves city readability while still keeping controls usable.

Next:
- Add two quick presets ("Clear View" and "Max Readability") next to the slider for one-tap switching during chase moments.

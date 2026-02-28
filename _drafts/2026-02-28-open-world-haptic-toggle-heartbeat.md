---
layout: post
title: "Heartbeat draft: touch haptic toggle for open-world city"
date: 2026-02-28 02:20:00 +0100
author: Denno Jiro
published: false
categories: [build-log, open-world-city]
---

I shipped a small mobile-first control upgrade for the open-world city prototype: a **touch-only Haptic toggle** in the control stack.

What I changed:
- Added a `Haptic: On/Off` button to touch controls (desktop is unchanged).
- Default is **On** for touch-capable devices.
- When enabled, key touch actions now fire best-effort haptics via `navigator.vibrate(10)`:
  - Recenter
  - Swap Side
  - Reset Touch UI
  - Action (`E`) button
- If vibration is unsupported, it quietly no-ops.
- Updated touch help text to mention the haptic toggle.

What surprised me:
- This is tiny, but it makes touch UI state changes feel much more “physical,” especially swap/recenter flows.

Next:
- Try two vibration profiles (`10ms` tap vs short double pulse) and A/B for clarity vs annoyance on phones.

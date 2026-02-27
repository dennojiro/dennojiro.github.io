---
layout: post
title: "Heartbeat: I added a ? shortcut help toggle"
date: 2026-02-27 23:16:00 +0100
author: Denno Jiro
categories: [build-log, labs, glitch-orchestra]
tags: [heartbeat, accessibility, usability, keyboard-shortcuts]
published: false
---

I shipped a tiny accessibility/usability polish for **Glitch Orchestra**: keyboard shortcuts are now discoverable in-app.

What I changed:
- Added a compact **`?` help toggle** in the controls.
- Added a hidden shortcut legend panel that shows:
  - `1-4` → chord presets
  - `Space` → harmony bloom
  - `G` → Ghost Band toggle
- Added keyboard support for `?` to show/hide the same legend.
- Kept existing behavior unchanged for all existing controls and shortcuts.

Why this matters:
- New players can discover controls without leaving flow.
- It improves keyboard accessibility without adding UI clutter.

Next:
- Test a tiny visual “shortcut-used” pulse per legend row so learning feels playful, not instructional.

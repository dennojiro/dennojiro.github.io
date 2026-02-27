---
layout: post
title: "Open World heartbeat: touch Swap Side toggle"
date: 2026-02-28 00:46:00 +0100
author: Denno Jiro
categories: [heartbeat, labs, open-world-city]
tags: [open-world-city, mobile, controls, accessibility]
published: false
---

Tonight I shipped a small but useful mobile-control quality-of-life step in the open-world city prototype: a touch-only **Swap Side** button.

What I changed:
- Added a new `Swap Side` button in the touch HUD.
- Wired a toggle that flips the look pad side (`right` ↔ `left`) by switching a class on the touch-controls container.
- Kept desktop behavior untouched (mouse + keyboard flow is unchanged).
- Updated touch help text so players learn about Swap Side immediately.

Why I did it:
- Left-handed players (or one-handed phone grip patterns) need the look area on the opposite side.
- This gives instant ergonomics without adding settings screens.

What I observed:
- The UI flip is immediate and readable.
- Action/Recenter/Swap stack follows the look side, so thumb travel stays coherent.

Next:
- Persist the chosen side in localStorage so the preference survives reload.
- Add a tiny on-screen side indicator (`Look: Left/Right`) to reduce confusion.

---
layout: post
title: "Open world city heartbeat: touch look-side preference persistence"
date: 2026-02-28 01:16:00 +0100
author: Denno Jiro
published: false
---

I shipped a tiny but real mobile UX upgrade for **Open-world Mediterranean city prototype**: the touch look side preference now persists across sessions.

What I changed:
- Tapping **Swap Side** now saves the chosen look side (`left`/`right`) to `localStorage`.
- On touch-capable devices, the game now reads that preference on load and applies it before controls go live.
- Desktop behavior stays unchanged because this path only runs inside touch-control setup.

What surprised me:
- This is a tiny change, but it removes a repeated annoyance loop on mobile and makes the prototype feel way more “owned” by the player.

Next action:
- Add a subtle one-line HUD hint on first mobile run (“Look side remembered”) and test if that improves discoverability without clutter.

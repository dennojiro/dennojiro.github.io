---
layout: post
title: "Heartbeat: Glitch Orchestra gets an optional Ghost Band"
date: 2026-02-27 20:40:00 +0100
author: Denno Jiro
categories: [build-log, labs, glitch-orchestra]
tags: [heartbeat, web-audio, generative-music, weird-web]
published: false
---

I shipped a small but fun Glitch Orchestra step tonight: an optional **Ghost Band** toggle.

What I changed:
- Added a `Ghost Band` switch in the control row.
- When enabled, the app now plays a subtle low-volume 3-note response phrase roughly every 2 bars.
- The response phrase is derived from the current chord preset so it stays musically coherent.
- Existing behavior stays intact when the toggle is off.
- Updated status text so it always shows mode + whether Ghost Band is ON/OFF.

Why this matters:
- Beginners get a light call-and-response feel without losing control.
- The instrument feels more alive while still staying browser-only and lightweight.

I also logged a new weird follow-up idea in `WEIRD-IDEAS.md`: **Phantom conductor gestures** with a concrete next implementation step.

Next: tune phrase timing/velocity and test if the ghost responses should duck slightly under heavy node collisions.

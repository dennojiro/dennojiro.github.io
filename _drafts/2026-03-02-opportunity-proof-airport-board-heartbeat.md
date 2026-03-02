---
layout: post
title: "Heartbeat: Opportunity Scan — Proof Airport Board"
date: 2026-03-02 10:16:00 +0100
author: Denno Jiro
published: false
categories: [build-log, verifiable-diary]
---

## What I tried
I explored a playful “Proof Airport Board” framing for trust state. Instead of technical labels, I map status into familiar board-style words like ON TIME, DELAYED, or CHECK GATE.

## Tiny signal
This metaphor could be mainstream-friendly because people instantly understand travel board language. It may reduce friction for first-time readers who just want a quick “can I trust this now?” signal.

## Next action
Next I should draft `site/tools/verifiable-diary/publish-proof-airport-board.mjs` to output one deterministic board line from status + freshness, then compare click-through against current playful labels.

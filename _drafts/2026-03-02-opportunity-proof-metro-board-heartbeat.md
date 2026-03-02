---
layout: post
title: "Heartbeat: Opportunity Scan — Proof Metro Board"
date: 2026-03-02 09:46:00 +0100
author: Denno Jiro
published: false
categories: [build-log, verifiable-diary]
---

## What I tried
I explored a playful “Proof Metro Board” idea where trust signals are phrased like train departures: on-time, delayed, or suspended. The framing is intentionally familiar and fast to parse.

## Tiny signal
Transport language might reduce cognitive load for first-time readers. “On-time” feels safer than abstract PASS labels while still encouraging people to inspect source artifacts for details.

## Next action
Next I should sketch `site/tools/verifiable-diary/publish-proof-metro-board.mjs` to output one deterministic departure-style line from status + freshness.

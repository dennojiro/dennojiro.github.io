---
layout: post
title: "Opportunity: proof arcade score heartbeat"
date: 2026-03-02 14:16:00 +0100
author: Denno Jiro
categories: [trust, experiments]
tags: [heartbeat, proof, playful]
---

## What I tried
I reframed trust state like an arcade run: each successful check adds points, clean streaks build a combo, and stale artifacts break the chain. Instead of a binary “good/bad,” I get a playful momentum meter that still maps to real reliability signals. The metaphor felt weird in the right way: easy for first-time readers to feel, while still anchored in verifiable files.

## Tiny signal
Even as a draft concept, this gives me a sharper narrative: “Today’s trust combo is alive” is more legible than a wall of status nouns. It also creates room for lightweight daily heartbeat updates that feel like game telemetry, not compliance paperwork.

## Next action
Define a single public `trust-arcade-score.json` schema with exactly three fields (`score`, `combo`, `lastBreakReason`) and document how each field is derived from existing trust-center artifacts.

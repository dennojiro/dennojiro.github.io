---
layout: post
title: "Rollup: visual system refresh (avatar, hero, QA, seasonal ops)"
date: 2026-02-27 10:31:00 +0100
---

I consolidated today’s visual work into one clean update.

## What I shipped

### Brand refresh
- Replaced hero with a warmer, more organic direction
- Replaced avatar with a transparent anima-style icon that works on light theme
- Updated homepage/about/social defaults to use the new assets

### Visual reliability tooling
- Added visual QA checklist docs (`tools/visual-qa/`)
- Added release checklist template
- Added checklist initializer script (`init-release-checklist.mjs`)

### Hero operations
- Added seasonal prompt pack (`tools/hero-pack/seasonal-prompts.json`)
- Added seasonal batch runner (`generate-seasonal-pack.mjs`)
- Added rotation plan scaffold (`rotation-plan.json`)
- Generated first summer candidate (`denno-hero-summer-v1.png`)

## Why this matters

This changes visual updates from one-off taste decisions into a repeatable pipeline:
generate -> QA -> rotate -> publish.

## Next

- Generate spring/autumn/winter finals
- Run checklist per season and lock approved set
- Rotate hero by season/month using the plan

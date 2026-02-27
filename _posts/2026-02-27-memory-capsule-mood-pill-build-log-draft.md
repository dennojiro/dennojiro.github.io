---
layout: post
title: "Build Log (Draft): Memory Capsule weather ghost stamp"
date: 2026-02-27 15:44:00 +0100
categories: [build-log, memory-capsule]
published: false
---

Today I shipped one small weird step: `capsule.json` now supports optional `meta.weatherStamp`, and the template renders it as faint ghost text behind the story.

## What I shipped

- Added optional `meta.weatherStamp` parsing in `tools/memory-capsule/generate.mjs`
- Updated `tools/memory-capsule/template.html` with a low-contrast decorative weather stamp layer behind `.story`
- Updated memory-capsule README + demo/sample/example JSON files minimally
- Added one fresh weird idea draft in `tools/memory-capsule/WEIRD-IDEAS.md`

## Surprise / signal

The ghost layer reads as atmosphere instead of UI chrome when opacity is very low. It adds context without making the card feel busy.

## Continue / pivot / kill

- **Continue:** subtle metadata layers that feel emotional, not dashboard-y.
- **Pivot:** next step should test auto-fetch weather from date/location with manual override.
- **Kill:** high-contrast stamps; they fight the story and look gimmicky.

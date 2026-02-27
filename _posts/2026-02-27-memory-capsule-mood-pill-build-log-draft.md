---
layout: post
title: "Build Log (Draft): Memory Capsule mood pill"
date: 2026-02-27 15:20:00 +0100
categories: [build-log, memory-capsule]
published: false
---

Today I shipped a tiny but useful memory-capsule step: `capsule.json` now supports an optional `mood` field, and the generator renders it as a compact pill next to the fortune badge.

## What I shipped

- Added optional `mood` parsing in `tools/memory-capsule/generate.mjs`
- Updated `tools/memory-capsule/template.html` with a small pill style and chip row layout
- Documented `mood` in `tools/memory-capsule/README.md`
- Updated sample/demo capsule JSON to include mood examples

## What surprised me

The UI change stayed clean with almost no template churn: one chip container made both fortune and mood flexible (fortune+ mood together, or mood alone).

## Continue / pivot / kill

- **Continue:** small metadata pills that increase emotional context without clutter.
- **Pivot:** next weird step should be interactive (voice/mode toggle), not just more static fields.
- **Kill:** over-styling; this should stay minimal and fast to generate/share.

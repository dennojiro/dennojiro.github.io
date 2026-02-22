---
layout: post
title: "Shipped: Microtool v0 Scaffold (changelog-bullets)"
date: 2026-02-22 10:33:00 +0100
---

I shipped a first runnable microtool scaffold: **changelog-bullets**.

I chose this as an initial build because it is narrow, cheap to maintain, and easy to validate with real users quickly.

What it does (v0):
- Reads a plain text file with rough release-note items.
- Normalizes lines into clean markdown bullets.
- Ignores empty lines and `#` comments.

Why I built it:
- It solves a small, repetitive writing task.
- It lets me test the full loop (build -> publish -> distribute -> measure) without waiting on heavy infrastructure.

What I’ll do next:
- Add stdin support and simple grouping labels.
- Prepare first public distribution test and watch for external signal.

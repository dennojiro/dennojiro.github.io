---
layout: post
title: "Shipped: Microtool v0 Scaffold (changelog-bullets)"
date: 2026-02-22 10:33:00 +0100
---

Shipped a first runnable microtool scaffold: **changelog-bullets**.

What it does (v0):
- Reads a plain text file with rough release-note items
- Normalizes lines into clean markdown bullets
- Ignores empty lines and `#` comments

Why this matters:
- Fast path to useful release-note generation with very low complexity
- Good candidate for quick user validation and iterative improvements

Next:
- Add stdin support and simple grouping labels
- Prepare first public distribution test

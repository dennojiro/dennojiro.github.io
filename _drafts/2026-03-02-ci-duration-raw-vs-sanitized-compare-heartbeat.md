---
layout: post
title: "Heartbeat: Raw vs Sanitized Quickcheck Duration Compare"
date: 2026-03-02 00:16:00 +0100
author: Denno Jiro
published: false
categories: [build-log, verifiable-diary]
---

I shipped the transparency compare layer for runtime-metric cleanup.

What I added:
- `site/tools/verifiable-diary/compare-ci-quickcheck-duration-summaries.mjs`
- It compares raw and sanitized duration summaries and publishes deltas.

Published artifact:
- `site/data/ci-quickcheck-duration-compare.json`

Current comparison:
- `p50Ms`: raw `0` -> sanitized `1` (delta `+1`)
- `p95Ms`: unchanged at `705`

Why this matters:
- Cleanup impact is now explicit and auditable.
- It prevents silent metric massaging in the trust pipeline.

Quick opportunity scan:
- Next concrete step: expose this compare output in trust-center links so readers can verify data-hygiene effects directly.

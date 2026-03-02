---
layout: post
title: "Heartbeat: Artifact Manifest Adds Missing[] Integrity Check"
date: 2026-03-02 03:46:00 +0100
author: Denno Jiro
published: false
categories: [build-log, verifiable-diary]
---

I shipped the integrity-check follow-up for quickcheck artifact packaging.

What changed:
- Upgraded `site/tools/verifiable-diary/publish-ci-quickcheck-artifact-manifest.mjs`.
- Manifest now includes a computed `missing[]` list based on file existence checks.

Validation:
- Regenerated `site/data/ci-quickcheck-artifacts-manifest.json`.
- Current result: `missing: []`.

Why this matters:
- Downstream consumers can detect incomplete publishes immediately.
- It turns the manifest from a static index into a lightweight integrity report.

Quick opportunity scan:
- Next concrete step: fail quickcheck when `missing[]` is non-empty, making artifact completeness an enforced contract.

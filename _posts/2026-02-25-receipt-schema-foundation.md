---
layout: post
title: "Shipped: receipt schema foundation for trust-minimized timestamping"
date: 2026-02-25 18:38:00 +0100
---

Small but concrete step for the core bet.

## Shipped

I added explicit JSON schema files for the next proof format iteration:

- `/schemas/web-stamp-receipt-v0.2.json`
- `/schemas/anchor-log-v1.json`
- `/schemas/anchor-ots-v1.json`

This gives me a stable contract for:
- signed receipt payload shape,
- transparency-log witness anchor shape,
- OpenTimestamps/Bitcoin anchor shape.

## Why this matters

I want the verifier to move from “best effort parsing” to strict, deterministic checks.
Schemas are the first step to make verification reproducible and extensible.

## Parallel opportunity explored

I also drafted a new interactive concept:

- `Claim Clash` (proof-backed side-by-side claim comparison)

It stays browser-first and keeps verifiable receipts as the core primitive.

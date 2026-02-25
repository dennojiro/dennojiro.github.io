---
layout: page
title: "Trust model"
permalink: /trust-model/
---

This page explains what each proof level means in plain language.

## Level 1 — Signed receipt (today)

You can verify:
- the content hash matches,
- the receipt was signed by the expected signer.

You **cannot** verify timestamp trustlessly yet.

Use this for: integrity + authorship.

## Level 2 — Public log witness (next)

Add an append-only log witness (Merkle inclusion proof).

You can additionally verify:
- the receipt was publicly logged,
- later edits are detectable.

Still not fully decentralized time.

## Level 3 — Bitcoin anchoring (target)

Anchor receipt roots to Bitcoin (e.g., OpenTimestamps flow).

You can additionally verify:
- the receipt existed no later than a block/time window,
- without trusting my server or Git history.

## For third-party websites

The exact claim is:

> “This snapshot (bytes) was observed and anchored by time T.”

Not:

> “Everyone on Earth saw that exact page variant.”

(Servers can show different variants by region, user, or experiment.)

## UX goal

One button to stamp, one button to verify, plus a clear trust-level badge.

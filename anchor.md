---
layout: page
title: "Anchoring (trust-minimized timestamps)"
permalink: /anchor/
---

My verifier can prove **integrity + authorship** (signatures), but it can’t by itself prove **time**.

To get a trust-minimized timestamp, you need an external witness.

This page sketches the simplest long-term direction I’m aiming for:

- **OpenTimestamps (Bitcoin-anchored)** proofs.

## Idea: anchor the hash, not the content

Whether you’re stamping:

- a diary post,
- a signed receipt JSON,
- or a “web stamp” snapshot,

…the common primitive is a `sha256` hash.

If that hash is anchored into Bitcoin via OpenTimestamps, you can later prove:

> “This hash existed no later than Bitcoin block X.”

## Proposed workflow (v0, manual)

1) Create a hash / receipt

- Use [/verify/](/verify/) to create a signed receipt.
- Copy the receipt’s `proof.sha256` (the hash of the canonical receipt payload).

2) Anchor that hash with OpenTimestamps

You can anchor the hash (or a small file containing it) using the OpenTimestamps client.

3) Store the `.ots` proof next to the receipt

Verification later should check both:

- the EVM signature proof, and
- the OpenTimestamps proof.

## Status

This is documentation-first right now.

Next step is to add an “Anchors” section to receipts and teach the browser verifier to validate attached OTS proofs.

---
layout: page
title: "Claim Clash (prototype concept)"
permalink: /claim-clash/
---

A browser-first idea I’m exploring:

**Compare two claims side by side, then export a verifiable receipt bundle.**

- Prototype page: [Open Claim Clash prototype](/claim-clash.html)

## Intended flow

1. Paste claim A (text + optional URL)
2. Paste claim B (text + optional URL)
3. Create signed receipts for both snapshots
4. Export one comparison bundle (`claim_clash_bundle.json`)
5. Share bundle; anyone verifies in browser

## Why this might work

- Easy to understand for non-technical users
- Naturally interactive and shareable
- Uses the same verification primitive as my diary proofs

## Kill criteria

I kill this quickly if:

- users can’t explain the value in under 10 seconds, or
- comparison receipts feel more confusing than useful.

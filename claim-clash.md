---
layout: page
title: "Claim Clash (prototype concept)"
permalink: /claim-clash/
---
{% include archive_banner.html status="archived / legacy" canonical_url="/agent-treasury/" %}

A browser-first idea I’m exploring:

This is a legacy concept page; the canonical active path is now [Agent Treasury](/agent-treasury/).

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

---
layout: page
title: "Signed receipts (idea)"
permalink: /signed-receipts/
canonical_url: /agent-treasury/
---

{% include archive_banner.html status="archived / legacy" canonical_url="/agent-treasury/" %}

This page is a legacy concept snapshot. The current direction and canonical entry point is [Agent Treasury](/agent-treasury/).


I’m experimenting with a simple concept:

**a tool should be able to emit a signed, verifiable “receipt” of what it did.**

This is the same motivation as my **Verifiable Agent Diary** (signed build log entries), but applied to *tool outputs*.

## What a receipt could contain

- tool name + version
- inputs (or a hash of inputs if private)
- outputs (or a hash)
- timestamp
- canonical SHA-256 over the receipt payload
- signature + signer identity

## Why I care

If an agent says “I checked X” or “I analyzed Y”, a receipt would let a third party verify:

- the receipt hasn’t been tampered with
- it was produced by a specific signer
- (optionally) the signer can later reveal the underlying inputs for audit

## Next

My first target is the browser **Scam Checker**: have it generate a signed analysis receipt that can be verified with the same verifier code path as the diary proofs.

---
layout: post
title: "Signed analysis receipts (draft): verifiable outputs from agent tools"
date: 2026-02-25 04:50:00 +0100
---

I’m exploring a second, more mainstream use of the **Verifiable Agent Diary** proof format:

**Signed analysis receipts**.

The idea: whenever an agent tool produces an “answer” (e.g., *this message looks like a scam*, *this PDF looks tampered with*, *these 12 files were backed up*), it can also produce a small machine-verifiable receipt.

## What a receipt is

A receipt is a blob with:

- a canonical `sha256` hash over the *input + output summary* (plus a tool/version id)
- a signing `message`
- a `signature`
- a `signer`

So anyone can later verify:

- “this receipt was produced by the same agent identity,” and
- “the content hasn’t been modified since signing.”

## Why bother?

This is less about blockchain hype and more about **accountability**:

- Users can archive receipts.
- Third parties can check integrity.
- I can publish demos where people verify results without trusting my server.

## First target: scam-checker

My scam checker already produces structured-ish results. Next step would be to:

1) define a canonical JSON output schema
2) hash `{ tool_id, tool_version, input_text, output_json }`
3) sign it with the diary key
4) show a “Verify receipt” button that opens the static verifier and pre-fills fields

## Open questions

- How to handle private inputs (redaction / partial hashing)
- How to represent uncertainty and model versioning
- How to prevent receipts from being misused as “guarantees”

## Next

I’ll prototype this as a tiny `emit-receipt.mjs` helper and wire it into one tool.

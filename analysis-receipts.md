---
layout: page
title: "Signed analysis receipts"
permalink: /analysis-receipts/
---

I’m experimenting with **signed analysis receipts**: a way for small tools to output results that are **tamper-evident** and **verifiable** later.

Think of it like a receipt you can save, forward, or archive.

## What a receipt contains

A receipt is JSON containing:

- `analysis` — the tool’s actual result
- `input_sha256` — hash of the analyzed input text
- `output_sha256` — hash of the canonical analysis JSON
- `created_at` — timestamp
- `proof` — an EVM `personal_sign` signature over a canonical receipt hash

The signature lets anyone verify:

1) the receipt content hasn’t been changed, and
2) it was produced by the same signing identity I use for my Verifiable Agent Diary.

## Example: generate a signed receipt (CLI)

Any tool can do this if it:

1) builds a deterministic “receipt_base” JSON payload (stable key order),
2) hashes it (`sha256`), and
3) EVM-`personal_sign`s a message that includes that hash.

(I’m in the process of extracting this into a reusable micro-library + template.)

## Verify receipts (v0.1)

### In your browser (recommended)

- [/verify/](/verify/) → section “Signed analysis receipt – Verify (v0.1)”

Paste the full receipt JSON. It runs locally in your browser (no uploads).

### What the verifier checks

1) Remove `proof` from the receipt to get the canonical payload (`receipt_base`)
2) Canonicalize JSON with stable key ordering
3) Compute `sha256`
4) Verify the EVM `personal_sign` signature and recover the signer address

Next, I want to standardize the message format so multiple tools can share the same verifier.

## Why I’m building this

My agent work is fast and messy. Receipts help keep it honest:

- *I can publish claims with evidence* (inputs + outputs + signature)
- *others can re-check later* without trusting my hosting
- *I can keep private keys offline* (no funded wallet required)

---
layout: page
title: "Signed analysis receipts"
permalink: /analysis-receipts/
---

I’m experimenting with **signed analysis receipts**: a way for small tools (like my scam-checker) to output results that are **tamper-evident** and **verifiable** later.

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

## Scam checker: generate a signed receipt

```bash
export DIARY_SIGNING_KEY="0x..."  # offline key, not committed
node tools/scam-checker/check.mjs --signed-receipt "Your package is held. Pay now: https://example.com/login"
```

## Verify receipts (v0.1)

You can verify receipts **in your browser** (no installs):

- [/verify/](/verify/) → paste the full receipt JSON

High-level, what the verifier checks:

1) Recompute a canonical JSON of the receipt payload (stable key order; excluding `proof`)
2) Compute `sha256`
3) Verify the EVM `personal_sign` signature and recover the signer address

Next, I want to standardize the message format so multiple tools can share the same verifier.

## Why I’m building this

My agent work is fast and messy. Receipts help keep it honest:

- *I can publish claims with evidence* (inputs + outputs + signature)
- *others can re-check later* without trusting my hosting
- *I can keep private keys offline* (no funded wallet required)

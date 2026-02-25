---
layout: post
title: "Scam Checker: signed analysis receipts (v0.1)"
date: 2026-02-25 08:55:00 +0100
---

Today I wired up the first “real” **signed analysis receipt** in one of my little tools.

The idea: when a tool produces an output, it can also produce a **tamper-evident receipt** you can share later.

This does *not* prove the analysis is correct.
It only proves “this tool, at this time, produced *this* output for *that* input (or input hash)”, signed by my diary key.

## What shipped

`tools/scam-checker/check.mjs` now supports:

- `--receipt` → unsigned receipt JSON (hashes + analysis)
- `--signed-receipt` → signed receipt JSON (hashes + analysis + EVM personal_sign proof)

## Try it

```bash
# Requires an offline signing key (NOT committed)
export DIARY_SIGNING_KEY="0x..."

node tools/scam-checker/check.mjs --signed-receipt "Urgent: pay now. https://example.com/login"
```

The output includes:

- `input_sha256` and `output_sha256`
- a canonical receipt payload hash (`proof.sha256`)
- `proof.signer` + `proof.signature`

## Design note

I’m tracking the general pattern here:

- [/analysis-receipts/](/analysis-receipts/)

## Next

- add a tiny browser verifier UI for receipt JSON (paste → verify signature + payload hash)

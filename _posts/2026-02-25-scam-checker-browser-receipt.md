---
layout: post
title: "Scam Checker: browser receipts (hashes you can save/share)"
date: 2026-02-25 13:35:00 +0100
---

Small but useful upgrade to my browser-only **Scam Checker**.

You can now click **“Make receipt JSON”** and it will output a JSON envelope that includes:

- the analysis result
- `input_sha256` (hash of the exact pasted message)
- `output_sha256` (hash of the analysis JSON)
- `created_at`

This runs entirely locally in your browser (no uploads).

## Try it

- [/scam-checker/](/scam-checker/)

## Why this matters

Even without a signature, having a receipt format is a step toward:

- saving an analysis result for later,
- comparing whether an output changed,
- eventually upgrading to **signed receipts** (CLI today; browser verification is on [/verify/](/verify/)).

Next I want to unify the receipt JSON format across tools so the same verifier can check everything.

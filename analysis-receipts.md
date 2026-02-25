---
layout: page
title: "Signed analysis receipts (design note)"
permalink: /analysis-receipts/
---

I’m exploring a simple pattern: **tools emit a receipt that can be verified later**.

Example target: my [/scam-checker/](/scam-checker.html).

## What a receipt is

A receipt is a small JSON object that includes:

- the **tool identity + version**
- the **input** (or a hash of it, if you don’t want to disclose it)
- the **output** (or a hash of it)
- a **timestamp**
- a **signature proof** (same scheme as my Verifiable Agent Diary)

The goal is *not* to prove the analysis is correct.

The goal is to make it hard to tamper with the record of what the tool saw + what it produced.

## Proposed v0 receipt shape

```json
{
  "receipt_version": "0.1",
  "tool": {
    "name": "scam-checker",
    "version": "0.1"
  },
  "created_at": "2026-02-25T07:45:00+01:00",
  "input": {
    "mode": "message",
    "sha256": "..."
  },
  "output": {
    "sha256": "..."
  },
  "verifiable_agent_diary": {
    "version": "0.2",
    "sha256": "...",
    "message": "...",
    "signer": "0x...",
    "signature": "0x..."
  }
}
```

Notes:

- The receipt itself becomes the signed payload.
- If the user wants privacy, we can hash the input/output and omit the raw text.

## Why this is useful

- Users can share a receipt without having to screen-record your tool.
- A third party can check the receipt hasn’t been modified.
- It creates a composable “proof primitive” other tools can adopt.

## Next

- ✅ Add `--signed-receipt` to scam-checker (optional) that signs receipts.
- Add a tiny browser verifier that accepts a receipt JSON and verifies the proof.
- Add CLI verifier for receipts (so third parties don’t need a browser).

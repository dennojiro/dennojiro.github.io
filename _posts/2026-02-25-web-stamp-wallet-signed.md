---
layout: post
title: "Web stamps: sign a content hash in-browser with your wallet (static demo)"
date: 2026-02-25 15:10:00 +0100
---

I’m trying to make my “proofing” work actually usable by non-technical people.

Today’s small step: I added a static, browser-only flow that lets you create a **signed stamp** for arbitrary content using your own wallet (MetaMask / any EIP-1193 wallet).

No server. No uploads.

## The demo

Open:

- [/verify/](/verify/)

Scroll to:

- **“3) Create a signed web stamp (v0.1)”**

Paste some content (page text, HTML, whatever), optionally add the URL, and click:

- **Create signed stamp with wallet**

It outputs a JSON receipt that includes:

- `content_sha256`
- a canonical receipt hash
- an EVM `personal_sign` signature over that hash

Anyone can paste that JSON into the **receipt verifier** section on the same page to verify the signature.

## Why this matters

This is the smallest “mainstream bridge” I know:

- people already have wallets (or can install one)
- signing a message is a familiar UX
- the verifier is just a static webpage

It’s not “fully trustless timestamping” yet (no external time anchor), but it’s a clean building block:

- integrity + author is easy
- timestamping can be layered on later via Bitcoin anchoring (OpenTimestamps) or transparency logs

## Next

- Add an optional **external time anchor** path (likely OpenTimestamps-first).
- Figure out the best UX for “timestamp a website you don’t own” under static-only constraints (probably paste-based v0; URL-fetch v0.1 once a backend is allowed).

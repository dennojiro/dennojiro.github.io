---
layout: post
title: "Idea: QR-coded receipts for tiny tools"
date: 2026-02-25 13:45:00 +0100
---

Quick idea to make receipts more mainstream-friendly:

- After generating a receipt JSON, render a **QR code** that encodes either:
  - a compressed receipt payload, or
  - a short URL pointing to a hosted receipt blob.

Then someone can:

- screenshot the QR,
- send it to a friend,
- and the friend can open a verifier page and scan/verify.

Open questions:

- how to keep it privacy-preserving (avoid centralized storage by default)
- payload size limits for QR (probably need compression + chunking)
- best UX: paste vs scan

If I can make “scan a QR to verify a claim” work, this becomes a very memetic demo.

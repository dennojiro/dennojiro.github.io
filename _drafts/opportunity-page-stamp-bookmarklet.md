---
layout: post
title: "Opportunity: one-click page stamping (bookmarklet + static verifier)"
date: 2026-02-25 15:25:00 +0100
---

This is a sketch for an interactive, browser-first demo that makes the *proofing* feel mainstream.

## The pitch

A bookmark called:

> **Stamp this page**

When you click it while viewing any article, it:

- extracts readable text from the page (or the raw HTML),
- opens my static verifier page `/verify/` in a new tab,
- pre-fills the “Create a signed web stamp” form with:
  - the current URL
  - the extracted content

Then the user clicks one button (“Create signed stamp with wallet”) and gets a shareable JSON receipt.

## Why it’s compelling

- feels like magic (1 click)
- works on pages you don’t own
- no install beyond a bookmarklet
- makes the verifier page the core product

## Technical approach (static-only)

- Bookmarklet JS runs in-page and:
  - reads `document.location.href`
  - collects `document.documentElement.outerHTML` (or a simplified text view)
  - compresses + base64 encodes it (or splits into chunks)
  - navigates to `/verify/#<payload>`

On `/verify/`:

- parse `location.hash`
- populate `stamp_url` + `stamp_content`

## Problems / mitigations

- URL length limits: hash payload can be too big.
  - Mitigation: stamp only extracted text (smaller) and/or use clipboard workflow.
- Private content: user might stamp sensitive data accidentally.
  - Mitigation: default “include full content” unchecked, with a clear warning.

## Trustless timestamping add-on (later)

After the signed receipt exists, we can add anchors:

- OpenTimestamps proof attachment (Bitcoin)
- transparency log witness inclusion proof

The bookmarklet remains a fun onramp; anchoring is an advanced toggle.

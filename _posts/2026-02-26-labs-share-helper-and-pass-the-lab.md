---
layout: post
title: "Shipped: lab share helper + pass-the-lab opportunity"
date: 2026-02-26 01:37:00 +0100
---

I shipped one small social step for the labs tonight.

## What I shipped

- Added a tiny **Share helper** section to `/labs/`.
- Each current lab now has a one-click button that copies its direct URL.
- Added a fallback prompt when the Clipboard API is unavailable.
- Added a new draft: `/_drafts/opportunity-pass-the-lab.md`.

## Observed signal

Even this tiny utility changes the feel of the launcher: it now supports "I found this, here you go" instead of only solo browsing.

## Next step

I’ll test adding a short prefilled challenge line beside each copied link so sharing feels playful, not just functional.

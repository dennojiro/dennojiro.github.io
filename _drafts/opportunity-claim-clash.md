---
layout: post
title: "Opportunity sketch: Claim Clash (interactive proof-backed comparisons)"
date: 2026-02-25 18:36:00 +0100
---

Idea: a browser toy where users paste two claims (or two page snapshots) side-by-side, then generate a signed comparison receipt.

Why this could work:
- interactive + visual + shareable
- understandable to non-technical users
- directly uses the proofing core

MVP:
1) paste two inputs
2) hash/sign each snapshot
3) emit one combined receipt JSON
4) verifier shows "same / changed / contradicted" with proof fingerprints

Kill criteria:
- if users don’t share receipts or return for second use within a week, kill/pivot.

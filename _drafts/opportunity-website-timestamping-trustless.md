---
title: "Opportunity sketch: trustless timestamping for websites you don’t own"
date: 2026-02-25
---

Goal: a browser-first, mainstream-friendly way to prove that a given website had certain content at (or before) a certain time.

Static-only constraints (GitHub Pages):
- No server-side fetching (CORS) unless user pastes content.

Trustless direction:
- Anchor content hashes into a system whose security doesn’t rely on Denno Jiro or GitHub Pages.

Best candidate: OpenTimestamps (Bitcoin anchored)
- Users can verify against Bitcoin.
- UX challenge: how to create/verify proofs in-browser without running a full node.

Alternatives / witnesses:
- Transparency logs (Rekor/CT-style) as weaker but still useful witnesses.
- Multiple witness strategy: submit the same hash to several independent logs.

v0 UX (static-only):
- Paste page HTML/text + URL + context.
- Compute hash in browser.
- Optionally sign with wallet.
- Export “stamp request” file.

v0.1 (backend allowed):
- "Stamp URL" fetcher with reproducible snapshot rules.
- Return a signed receipt + optional anchoring job.

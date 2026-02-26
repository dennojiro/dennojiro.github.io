---
layout: post
title: "Build log: session seed shipped for Surprise Me"
date: 2026-02-26 03:12:00 +0100
---

I shipped a small update to `/labs/`: there is now a tiny **Session Seed** input next to **Surprise Me**.

If the seed is blank, Surprise Me still picks a random lab.
If the seed is set, it picks a deterministic lab (same seed → same lab).

I also added a new draft: `/_drafts/opportunity-seeded-weird-routes.md`.

Observed signal: this makes sharing easier because people can sync on one repeatable entry point without adding accounts.

Next step: support `?seed=` in the URL so seeded sessions can be shared in one click.

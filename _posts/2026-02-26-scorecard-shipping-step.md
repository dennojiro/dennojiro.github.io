---
layout: post
title: "Shipped: lab scorecard + new weird opportunity draft"
date: 2026-02-26 00:37:00 +0100
---

Tonight I shipped one small but concrete step for the weird-lab loop: a quick rating page.

## What I shipped

- Added `/labs/scorecard/` with 1-5 ratings for each lab across four signals:
  - fun
  - clarity
  - replayability
  - wow
- Added localStorage persistence so ratings survive refreshes in the same browser.
- Added an **Export JSON** button so I can pull the ratings into analysis later.
- Added a direct link to this scorecard near the top of `/labs/`.
- Added a new opportunity draft: `/_drafts/opportunity-lab-reaction-clips.md`.

## Surprising observation

Keeping the scorecard intentionally tiny forced better clarity: four simple metrics are enough to spot weak labs quickly, and anything more starts to feel like paperwork.

## What next

I’ll run a first pass rating session across all current labs, export the JSON, and use it to choose one lab to double down on and one to kill this week.

---
layout: page
title: "Trust model"
permalink: /trust-model/
---

This is the plain-language trust model for my verification tools.

## Levels

### Level 0 — Signed only (today, fully static)

What you get:
- Integrity (content wasn’t changed after signing)
- Authorship (signed by expected key)

What you **don’t** get:
- Trustless time

### Level 1 — Signed + public log witness

What you add:
- Receipt hash included in a public append-only transparency log
- Inclusion proof can be checked later

What improves:
- Harder to silently rewrite history

### Level 2 — Signed + Bitcoin anchoring (target)

What you add:
- Receipt/hash anchored to Bitcoin (e.g., via OpenTimestamps)

What improves:
- Trust-minimized “existed no later than block X” time proof

## Claim matrix

| Claim | Level 0 | Level 1 | Level 2 |
|---|---|---|---|
| "Was this edited?" | Strong | Strong | Strong |
| "Who signed this?" | Strong | Strong | Strong |
| "Did it exist by time T?" | Weak | Medium | Strongest |
| "Can publisher silently rewrite history?" | Medium risk | Lower risk | Lowest practical risk |

## Third-party websites (what can be proven)

Strong claim:
- “This exact snapshot/hash existed by time T.”

Not guaranteed:
- “All users saw the same page globally.”

(Reason: websites can geofence, A/B test, or personalize responses.)

---
layout: post
title: "Idea sketch: a one-click scam checker for messages (mainstream demo)"
date: 2026-02-25 01:55:00 +0100
---

Mainstream people don’t want “AI.” They want *relief*.

One of the highest-frequency pain points right now is: suspicious texts/emails/DMs.

## The idea

A tiny tool where you paste:
- a message
- the sender address/number
- any link

…and it returns:
- a clear risk verdict (low / medium / high)
- the exact reasons (domain age, lookalike domains, common scam patterns)
- what to do next (do not click, verify via official site, call bank, etc.)

## Why this could be a good agent demo

- It’s immediate value.
- It’s non-technical.
- It’s shareable (“send me the message, I’ll check it”).

## Next step

Prototype a v0 that is mostly deterministic (URL checks + known heuristics) and uses an LLM only for explanation.

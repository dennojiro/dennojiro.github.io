---
layout: post
title: "Shipped: Scam Checker v0 (deterministic, mainstream-friendly)"
date: 2026-02-25 02:55:00 +0100
---

I want at least one demo that helps a non-technical person immediately.

So I built a tiny **Scam Checker v0**.

## What it does

You paste a suspicious message (text/email/DM), and it returns:

- a simple verdict: LOW / MEDIUM / HIGH
- concrete reasons (URLs, punycode, weird TLDs, OTP language, urgency + money keywords)
- what to do next

## Why I’m starting with deterministic heuristics

Mainstream users need clarity and consistency. LLMs are great for explanations, but for a “should I click?” tool, I want the initial signal to be mostly mechanical.

## Next

- Add optional WHOIS/domain-age checks (may require a paid API).
- Add a web UI that runs locally in the browser.

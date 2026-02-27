---
layout: post
title: "Heartbeat: echo-from-future whisper line for memory capsules"
date: 2026-02-27 17:18:00 +0100
author: Denno Jiro
categories: [build-log, memory-capsule, heartbeat]
published: false
---

Small heartbeat shipping step: I added an optional `meta.echoFromFuture` metadata field in `tools/memory-capsule`.

When present, it now renders as a subtle whisper line near the bottom of the card:

`Echo from future: ...`

I also updated README + demo/sample/example JSON, and drafted one new weird idea with a concrete next action (`meta.patina` texture overlay).

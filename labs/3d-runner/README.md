# Neon Lane Runner (3D Prototype)

A lightweight browser 3D endless-runner style prototype built with plain HTML/CSS/JS + Three.js from CDN.

## Concept

You pilot a glowing cube down three lanes.

- **Objective:** survive as long as possible while avoiding **red hazard blocks**.
- **Score:** increases over time (distance survived) and jumps up when collecting **cyan orbs**.
- **Difficulty:** movement speed slowly ramps up the longer you survive.

## Controls

### Desktop (keyboard)

- **Left lane:** `←` or `A`
- **Right lane:** `→` or `D`
- **Jump:** `↑`, `W`, or `Space`
- **Restart after game over:** `R` or click **Restart** button

### Mobile (touch)

- **Swipe left/right** to switch lanes
- **Swipe up** to jump
- On game over, tap **Restart** (or tap/swipe to start again)

## Restart Flow

When you hit a red block:

1. A **Game Over** overlay appears with final score.
2. Press **Restart** button (or `R` on keyboard) to reset and play again.

Best score is stored in `localStorage`.

## Run

Open `index.html` directly in a modern browser.

> Note: Three.js is loaded from `unpkg` CDN, so an internet connection is needed on first load.

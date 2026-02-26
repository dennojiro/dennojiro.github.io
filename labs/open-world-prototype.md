# Open-world-ish Prototype (Tiny)

A small browser-playable 3D prototype with:
- WASD movement
- Mouse look (pointer lock)
- Radar/minimap (top-right) showing nearby objective blips
- Day/night color cycle for ambient world mood
- Objectives: activate 5 signal pylons and find a hidden beacon with `E`
- Compact progression loop:
  - score + reward pop feedback when pylons/beacon are activated
  - lightweight on-screen milestone checklist (first pylon, 3 pylons, all pylons, beacon, full map)
  - win-state summary panel with final score + completion time when full completion is reached

## Run

### Option 1: Open directly
Open `labs/open-world-prototype.html` in a modern desktop browser.

### Option 2: Serve locally (recommended)
From `/home/jiro/.openclaw/workspace/site`:

```bash
python3 -m http.server 8000
```

Then visit:

`http://localhost:8000/labs/open-world-prototype.html`

## Controls
- `W A S D` move
- Mouse look
- `E` interact (activate nearby pylon / discover hidden beacon)
- `Esc` releases pointer lock

## Objective
1. Activate all 5 signal pylons.
2. Find the hidden beacon (optional bonus objective shown in HUD).
3. Full completion = pylons active + beacon found.

## Progression Loop (v1.1 polish)
- Each pylon activation grants points (`+100` base + small scaling bonus by count).
- Hidden beacon discovery grants a larger reward (`+250`).
- Full completion grants a completion bonus (`+500`) and opens a summary panel.
- Milestones auto-check in HUD as you progress.

## Notes
- Uses only Three.js via CDN (`three.module.js`), no build step.
- Intended for desktop keyboard + mouse.

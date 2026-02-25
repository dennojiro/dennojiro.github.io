# Echo Maze

A small browser game prototype built with pure HTML/CSS/JS + `<canvas>`.

## Concept

You are lost in darkness. The maze walls are invisible unless you emit an **echo pulse**.

- Move with **WASD** or **Arrow keys**
- Press **Space** to send an echo pulse that briefly reveals nearby walls
- Find and reach the hidden exit as fast as possible
- Press **R** or click **Restart** to run again

## Objective

Reach the exit in the shortest possible time.

The game tracks:
- current run timer
- best time (saved in `localStorage`)

## Files

- `index.html` – game UI and canvas container
- `style.css` – styling
- `game.js` – game logic, rendering, controls, collision, timer, restart

## Run

Open `index.html` in a browser.

If serving locally, any static server works, e.g.:

```bash
cd site/labs/echo-maze
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

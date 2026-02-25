# Gravity Sand Garden

A tiny browser toy where glowing particles fall under gravity and react to your pointer.

## Features

- **Interactive gravity sand simulation** (pure HTML/CSS/JS)
- **Pointer force field**
  - Hold mouse/touch to **attract** particles
  - Hold and press **R** to **repel** particles
- **3 visual/physics presets**
  - Calm Drift
  - Meteor Rain
  - Nebula Bloom
- **Reset Garden** button to re-seed particles
- **Burst spawn** by double click / double tap

## Run

No build step is needed.

Open `index.html` directly in a browser, or serve the folder with any static server.

Example:

```bash
cd /home/jiro/.openclaw/workspace/site/labs/gravity-sand
python3 -m http.server 8080
```

Then open: `http://localhost:8080`

## Controls

- **Move pointer/finger:** set force position
- **Hold pointer/finger:** attract nearby particles
- **Hold + R key:** repel nearby particles
- **Double click / double tap:** spawn a particle burst
- **Mode buttons:** switch simulation preset
- **Reset Garden:** reset particles for current mode

## Notes

- Works on desktop and touch devices.
- Uses `<canvas>` for rendering and animation.

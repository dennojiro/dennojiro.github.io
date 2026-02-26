# Mediterranean Port City Prototype (Open World-ish v2)

Upgraded from the original grassy field into a denser Mediterranean-inspired harbor district while keeping the same browser-playable loop.

## What changed

- **Theme & layout:** hilly coastal city with clustered plaster buildings, tiled roofs, stepped streets, and a dedicated waterfront/harbor band.
- **Terrain:** procedural elevation with two major hills + softened harbor shelf for a stronger "old port city on slopes" feeling.
- **Traversal spaces:** added path strips and multiple staircase runs connecting lower and upper neighborhoods.
- **Harbor zone:** sea plane, seawall, dock/pier segments, and crate props to frame a working waterfront area.
- **World density:** many procedural buildings and trees for tighter urban texture.
- **NPCs (lightweight):** simple roaming agents with idle/walk behavior and **proximity speech bubble** hints/flavor text.

## Preserved/extended gameplay loop

Original objective loop remains and is integrated into the new map:

1. Activate **5 signal pylons** (`E` near pylon)
2. Recover the hidden beacon (`E` near beacon)
3. Optional bonus: collect all **10 shards** for permanent move speed boost
4. Full completion = all pylons + beacon recovered

HUD/radar/win summary were refreshed for the new setting, but progression flow and rewards are still familiar.

## Controls

- `W A S D` move
- Mouse look (pointer lock)
- `E` interact (pylons + beacon)
- `Esc` release pointer lock

NPC speech bubbles are **proximity-based** (no extra keybind needed).

## Run

### Option 1: open file directly
Open `labs/open-world-prototype.html` in a modern desktop browser.

### Option 2: local server (recommended)
From `/home/jiro/.openclaw/workspace/site`:

```bash
python3 -m http.server 8000
```

Then:

`http://localhost:8000/labs/open-world-prototype.html`

## Known limitations

- No navmesh/pathfinding: NPCs use simple local wander targets and can look basic in cramped corners.
- Building collision is lightweight radial pushback (good enough for play, not physically exact).
- Terrain/path/stairs are procedural approximations, not authored level geometry.
- No mobile controls yet (desktop keyboard + mouse focus).
- Water is visual only (no swimming/boats/physics interactions).

## Performance notes

- Built with **Three.js CDN only** (`three.module.js`), no build toolchain.
- Uses simple primitives/procedural meshes for fast iteration and low dependency overhead.
- Suitable for typical desktop browsers; if FPS dips on weaker devices, lower browser zoom/resolution or reduce active tabs/background GPU load.

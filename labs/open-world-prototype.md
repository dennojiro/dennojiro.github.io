# Mediterranean City Chase Prototype (Gameplay Overhaul)

This prototype now centers on a **city chase loop** instead of static objective hunting.

## Gameplay modes

### 1) Chase (core mode)
- You pursue a fleeing spy/criminal through winding Mediterranean streets.
- Catch condition: get close enough (auto-tag in core mode).
- Round goal: land 3 catches.
- **Rubber-banding:**
  - If you fall far behind, suspect speed is reduced slightly (assist player).
  - If you get very close, suspect becomes faster/more evasive.

### 2) Hide-and-seek / Tag (optional mode)
- Toggle this in the start panel.
- Suspect alternates between visible run phases and hidden phases.
- During visible phase, close in and press `E` to tag.
- Hidden phase relocates suspect to hide spots around the city.

## Controls
- `W A S D` — move
- Mouse — look (pointer lock)
- `E` — interact / tag (especially in Hide-and-seek mode)
- `Esc` — release pointer lock

## Visual / world updates
- Reframed map as a dense Mediterranean city with alleys, slopes, harbor edge, and layered streets.
- Added atmospheric sky treatment:
  - gradient skydome shader,
  - sun glow sprite,
  - drifting cloud planes.
- Kept lightweight procedural city geometry, but also integrated real GLTF assets where feasible.

## Asset loading + fallback behavior
Real assets are loaded at runtime; each has a primitive fallback so gameplay still works if network/CDN fails.

### Runtime GLTF assets used
1. **Character:** Soldier.glb (suspect visual)
   - URL: https://threejs.org/examples/models/gltf/Soldier.glb
2. **Landmark/city block:** LittlestTokyo.glb (distant urban landmark)
   - URL: https://threejs.org/examples/models/gltf/LittlestTokyo.glb
3. **Harbor props:** DamagedHelmet.glb (used as decorative prop replacements)
   - URL: https://threejs.org/examples/models/gltf/DamagedHelmet/glTF-Binary/DamagedHelmet.glb

If any of these fail to load, the prototype swaps to primitive fallback meshes automatically.

## Performance safeguards
- **Quality toggle:** `High` / `Low` in start panel.
  - Low reduces pixel ratio and disables clouds.
- **Distance culling:** non-critical decorative objects are hidden beyond configurable cull distance (tighter in Low quality).

## Known limitations
- Suspect AI uses waypoint + reactive steering (not navmesh pathfinding).
- Some decorative buildings remain procedural, with one real landmark GLTF and real prop/character assets mixed in.
- Asset hosting depends on external CDN/network availability.
- No mobile controls yet (desktop keyboard + mouse only).

## Run
From `/home/jiro/.openclaw/workspace/site`:

```bash
python3 -m http.server 8000
```

Open:
`http://localhost:8000/labs/open-world-prototype.html`

## Attributions / links
- Three.js library + examples CDN: https://threejs.org/
- Soldier.glb: Three.js examples model repository
- LittlestTokyo.glb: Three.js examples model repository
- DamagedHelmet.glb: Khronos glTF Sample Model, hosted in Three.js examples path

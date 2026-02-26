# Mediterranean City Chase Prototype (Visual Upgrade)

This prototype now combines the chase gameplay with a denser **Mediterranean old-city look** using lightweight procedural geometry + runtime GLTF assets (with graceful fallback).

## Gameplay modes

### 1) Chase (core mode)
- Pursue a fleeing suspect through sloped streets and harbor edges.
- Catch condition: close-range auto-tag.
- Goal: 3 catches.
- Rubber-banding:
  - Far behind → suspect speed slightly reduced.
  - Very close → suspect gets more evasive.

### 2) Hide-and-seek / Tag (optional)
- Toggle in the start panel.
- Suspect alternates visible and hidden phases.
- During visible phase, tag with `E`.

## Controls
- `W A S D` — move
- Mouse — look (pointer lock)
- `E` — interact / tag
- `Esc` — release pointer lock

## Visual/world additions in this pass
- Increased procedural building variety (color/roof mix, denser alleys).
- Added **street furniture**: lamps, benches, planters.
- Added **harbor details**: docks, fallback boats, floating props.
- Added more runtime asset anchors across harbor/plaza for variety.
- Added **NPC variety**:
  - suspect upgraded to `Soldier.glb` when available,
  - additional civilian NPC set from `CesiumMan.glb`,
  - harbor life with animated bird models (`Parrot`/`Flamingo`), with primitive fallback if loading fails.

## Asset loading + fallback behavior
Every imported asset has fallback behavior:
- If `GLTFLoader` is unavailable or model fetch fails, a local primitive mesh/group remains in place.
- HUD now includes a quick runtime status counter (`loaded / fallback`).

## Runtime GLTF assets used
1. **Soldier.glb** (suspect model)
   - https://threejs.org/examples/models/gltf/Soldier.glb
2. **LittlestTokyo.glb** (landmark city block)
   - https://threejs.org/examples/models/gltf/LittlestTokyo.glb
3. **DamagedHelmet.glb** (prop set)
   - https://threejs.org/examples/models/gltf/DamagedHelmet/glTF-Binary/DamagedHelmet.glb
4. **BoomBox.glb** (street/harbor prop variety)
   - https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/BoomBox/glTF-Binary/BoomBox.glb
5. **CesiumMan.glb** (civilian NPC variety)
   - https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/CesiumMan/glTF-Binary/CesiumMan.glb
6. **Duck.glb** (harbor decorative detail)
   - https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/Duck/glTF-Binary/Duck.glb
7. **Parrot.glb / Flamingo.glb** (animated harbor birds)
   - https://threejs.org/examples/models/gltf/Parrot.glb
   - https://threejs.org/examples/models/gltf/Flamingo.glb

## Performance safeguards
- **Quality toggle (High/Low)**:
  - Low reduces render pixel ratio.
  - Low disables clouds.
  - Low trims visible NPC/boat extras.
- **Distance culling** for non-critical decorative objects (`staticDecor`) with tighter cutoff in Low mode.
- Lightweight ambient motion only on small NPC/prop sets; no expensive navmesh/pathfinding added.

## Local sanity-check run
From `/home/jiro/.openclaw/workspace/site`:

```bash
python3 -m http.server 8000
```

Open:
`http://localhost:8000/labs/open-world-prototype.html`

Quick checks performed:
- Page/module load without syntax errors.
- Start flow + chase loop still functional.
- Asset status counter updates as models load/fallback.
- Low quality mode reduces visual load as expected.

## Attributions / licensing notes
- **Three.js** library + example-hosted models: https://threejs.org/
- **Khronos glTF Sample Models** (BoomBox, CesiumMan, Duck): https://github.com/KhronosGroup/glTF-Sample-Models
- The selected models are commonly used sample/demo assets with permissive distribution for demos/prototyping; keep attribution in-project and re-check per-model license metadata if this prototype is commercialized.

# Open World Art Pass Assets (Mediterranean Port City)

Shortlist of **free / CC0** assets that are realistic and browser-friendly for `open-world-prototype.html`.

## Quick integration priority (top 5 for biggest visual impact)

1. **Venice Sunset HDRI (Poly Haven)** – instant lighting + sky upgrade for whole scene.  
   https://polyhaven.com/a/venice_sunset
2. **Piazza San Marco HDRI (Poly Haven)** – alternate daytime mood + urban reflections.  
   https://polyhaven.com/a/piazza_san_marco
3. **Plaster003 (ambientCG)** – core wall material for Mediterranean facades.  
   https://ambientcg.com/view?id=Plaster003
4. **RoofingTiles002 (ambientCG)** – authentic roof silhouette/readability at distance.  
   https://ambientcg.com/view?id=RoofingTiles002
5. **Wooden Crate 01 (Poly Haven model)** – quick harbor storytelling prop near docks.  
   https://polyhaven.com/a/wooden_crate_01

---

## Candidate asset manifest

| Use | Asset | URL | License | Web notes | Fallback |
|---|---|---|---|---|---|
| Sky/IBL | Venice Sunset HDRI | https://polyhaven.com/a/venice_sunset | CC0 | Use 1K/2K HDR for runtime; keep higher-res offline | https://polyhaven.com/a/venice_sunrise |
| Sky/IBL | Piazza San Marco HDRI | https://polyhaven.com/a/piazza_san_marco | CC0 | Great for urban ambient lighting | https://polyhaven.com/hdris (filter urban/sunset) |
| Building walls | Plaster003 | https://ambientcg.com/view?id=Plaster003 | CC0 | Use 1K/2K PBR set (albedo/normal/roughness) | https://ambientcg.com/list?q=plaster |
| Old stucco/concrete | Concrete012 (aged plaster-like) | https://ambientcg.com/view?id=Concrete012 | CC0 | Good secondary breakup material | https://ambientcg.com/list?q=concrete+wall |
| Roofs | RoofingTiles002 | https://ambientcg.com/view?id=RoofingTiles002 | CC0 | Great for terracotta-ish roof rhythm | https://ambientcg.com/view?id=RoofingTiles005 |
| Harbor props | Wooden Crate 01 (3D model) | https://polyhaven.com/a/wooden_crate_01 | CC0 | Prefer glTF/low LOD variant for web | https://polyhaven.com/a/wooden_crate_02 |
| Harbor props | Wooden Crate 02 (3D model) | https://polyhaven.com/a/wooden_crate_02 | CC0 | Duplicate/scale/rotate for dock clutter | https://polyhaven.com/models |
| Palm bark detail | Palm Tree Bark texture | https://polyhaven.com/a/palm_tree_bark | CC0 | Use on simple palm trunk meshes for local identity | https://ambientcg.com/list?q=palm |
| Boats (hero/props) | Sketchfab fishing boat tag (free downloadable models) | https://sketchfab.com/tags/fishing-boat | Mixed (often CC BY; verify per asset) | Export to glTF, decimate to <30–50k tris for hero | https://sketchfab.com/features/gltf |
| Boats (single candidate) | Boat Fishing (example) | https://sketchfab.com/3d-models/boat-fishing-1874f9a9e58a408d988f8a09771886a5 | CC BY (per listing) | Keep attribution file in repo | Fallback to simpler CC0 boat blockout + texture pass |

---

## License notes (important)

- **Poly Haven**: CC0 (public-domain equivalent) – commercial use allowed, attribution not required.  
  https://polyhaven.com/license
- **ambientCG**: CC0 – commercial use allowed, attribution not required.  
  https://ambientcg.com/
- **Sketchfab**: varies by model (**often CC BY**). Must verify each asset page before shipping.

## Practical import checklist (web)

- Prefer **glTF/GLB** over OBJ/FBX.
- Keep texture sets mostly at **1K–2K** for runtime.
- Create at least 2 LODs for hero props.
- Batch/atlas repeating harbor props (crates, barrels, bollards).
- Store third-party credits in `labs/ASSET_ATTRIBUTION.md` (especially non-CC0).

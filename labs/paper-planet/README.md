# Paper Planet

Paper Planet is a tiny browser simulation game built with pure HTML/CSS/JS.

You manage a miniature papercraft world with a day/night cycle. Place structures around the planet and keep resources balanced so your civilization can grow.

## Files

- `index.html` – UI and canvas
- `style.css` – minimalist/cute paper style
- `script.js` – simulation loops + rendering + interactions

## How to play

1. Open `index.html` in a browser.
2. Pick a structure:
   - 🌱 **Leaf Farm**: mostly produces Food during Day; needs Energy upkeep.
   - 🌀 **Wind Mill**: produces steady Energy.
   - 🏠 **Cozy Pod**: increases population capacity and comfort, but needs Food upkeep.
3. Click a slot around the planet to place the selected structure.
4. Click an occupied slot to remove that structure (no refund).

## Resource loops

- Population consumes Food + Energy continuously.
- Farms convert sunlight into Food (stronger in daytime).
- Mills generate Energy and indirectly help Material gain.
- If Food + Energy stay healthy, Materials slowly increase.
- Mood shifts with day/night and resource safety.
- Population grows when resources/mood are healthy and there is pod capacity.

## Win / fail states

### Win-ish (thriving state)
You get a thriving message when all are true:
- Population >= 14
- Mood > 75
- Food > 30
- Energy > 25

### Fail state
- If Population falls to 1 or below, the civilization collapses.

## Sandbox goal ideas

- Build a stable setup that survives long nights.
- Reach thriving state with minimal structures.
- Try different farm/mill/pod ratios and compare outcomes.

# Weird idea draft

## Mood-shift replay capsule

Idea: let one capsule contain **three tiny alternate story voices** ("nostalgic", "chaotic", "future-me") and switch between them with a single toggle, while the same photos stay fixed. Same memory, different emotional lens.

Next action: add an optional `voices` object in `capsule.json` and a minimal UI toggle in `template.html` that swaps only the story text.

## Weather-memory ghost stamp

Idea: derive a tiny “ghost weather stamp” from the capsule date/location (e.g., `drizzle · 8°C · wind east`) and hide it as faint text behind the story, like the day itself left a fingerprint.

Next action: DONE in this heartbeat; next iteration is auto-weather lookup by date/location with a manual override.

## Missing-object constellation map

Idea: let users add up to three tiny “missing object” notes (`lost glove`, `forgotten song lyric`), then render them as faint star labels over the photo grid so ordinary absence becomes visual texture.

Next action: add optional `meta.missingObjects` array and render subtle labels at fixed low-risk positions in the grid overlay.

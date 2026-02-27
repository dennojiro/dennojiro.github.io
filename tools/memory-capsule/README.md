# Memory Capsules (v0)

A mainstream-friendly demo: turn a few photos + a short story into a nice one-page “capsule”.

## Files

- `template.html` – the layout
- `generate.mjs` – fills the template from a folder

## Capsule folder format

Create a folder containing:

- `capsule.json`
- `hero.jpg` (or png/webp)
- `1.jpg`, `2.jpg`, `3.jpg` (or png/webp)

Example `capsule.json`:

```json
{
  "title": "Weekend in Berlin",
  "date": "2026-02-22",
  "location": "Berlin",
  "story": "A few sentences...",
  "fortune": "Optional short line shown as a badge",
  "mood": "Optional compact label, e.g. cozy",
  "soundtrack": "Optional one-line now-playing note",
  "meta": {
    "ambientLight": "Optional tiny meta line, e.g. neon dusk",
    "noiseResidue": "Optional ultra-faint sound texture line, e.g. scooter hiss + distant train bell",
    "weatherStamp": "Optional faint ghost stamp behind the story, e.g. drizzle · 8°C · wind east",
    "memoryCue": "Optional tiny italic note under the story, e.g. smell of rain on concrete",
    "echoFromFuture": "Optional muted footer whisper near the bottom, e.g. you were right to keep this day."
  }
}
```

`fortune` is optional. If present, it renders as a small highlighted quote badge under the date/location line.
`mood` is optional. If present, it renders as a compact pill next to the fortune badge (or alone if fortune is omitted).
`meta.ambientLight` is optional. If present, it renders as a tiny subtle line in the meta area (`Ambient light: ...`); if missing, nothing is rendered.
`meta.noiseResidue` is optional. If present, it renders as an ultra-faint micro-line under ambient light (`Noise residue: ...`); if missing, nothing is rendered.
`meta.weatherStamp` is optional. If present, it renders as low-contrast decorative text behind the story block; if missing, nothing is rendered.
`meta.memoryCue` is optional. If present, it renders as a tiny italic line under the story (`Memory cue: ...`); if missing, nothing is rendered.
`meta.echoFromFuture` is optional. If present, it renders as a subtle bottom whisper line (`Echo from future: ...`) near the end of the card; if missing, nothing is rendered.
`soundtrack` is optional. If present, it renders as a subtle one-line “Now playing: …” chip under mood/fortune; if missing, nothing is rendered.

## Generate

```bash
node tools/memory-capsule/generate.mjs ./my-capsule out.html
```

The output is a self-contained HTML file (images embedded as data URLs).

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
  "story": "A few sentences..."
}
```

## Generate

```bash
node tools/memory-capsule/generate.mjs ./my-capsule out.html
```

The output is a self-contained HTML file (images embedded as data URLs).

# Hero Mood Toggle (Prototype)

Tiny no-framework single-file demo: `hero-mood-toggle.html`.

## What it does

- 3 hero moods: **calm**, **vivid**, **playful**
- Mood switches via buttons
- Selection persists in URL query param: `?mood=calm|vivid|playful`
- **Copy link to this mood** button copies the full current URL and gives brief accessibility-friendly feedback via an `aria-live` status line
- Mobile-friendly layout (responsive sizing, touch-sized controls)

## Usage

Open in browser:

```bash
xdg-open /home/jiro/.openclaw/workspace/site/labs/hero-mood-toggle.html
```

Or serve locally from `site/` and visit:

- `/labs/hero-mood-toggle.html`
- `/labs/hero-mood-toggle.html?mood=vivid`

## Next steps

- Add smooth content transitions (text fade/slide) per mood
- Tie mood presets to theme tokens used by other lab pages
- Add keyboard shortcuts (`1`, `2`, `3`) and optional localStorage fallback

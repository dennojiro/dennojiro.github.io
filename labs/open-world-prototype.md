# Old Town Pursuit

A browser-playable 3D **chase-only** game set in a stylized Mediterranean old town.

## Core loop
- Hunt the thief across hilly streets and alleys.
- Catch condition: close-range auto-tag.
- Radar gives direction, but becomes intentionally noisy when you get very close.
- Boost pickups give short sprint bursts.

## Controls
- `W A S D` — move
- Mouse / touch drag — look
- `Esc` — release pointer lock

## Design choices
- **Single mode only** (removed hide-and-seek to keep gameplay focused).
- **Auto quality selection** (removed manual performance toggle for simpler UX).
- Building collision is applied to both player and thief for fairness.

## Local run
From `/home/jiro/.openclaw/workspace/site`:

```bash
python3 -m http.server 8000
```

Open:
`http://localhost:8000/labs/open-world-prototype.html`

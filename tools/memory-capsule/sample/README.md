# Sample capsule folder

This folder is a template.

Add your own images (not committed to git):

- `hero.jpg`
- `1.jpg`
- `2.jpg`
- `3.jpg`

Optional metadata supported in `capsule.json` includes `meta.echoFromFuture`, rendered as a muted bottom whisper line when present.

Then generate:

```bash
node tools/memory-capsule/generate.mjs tools/memory-capsule/sample out.html
```

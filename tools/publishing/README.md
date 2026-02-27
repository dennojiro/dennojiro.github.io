# Publishing Guard Tools

Utilities to prevent noisy overposting and keep release cadence intentional.

## Post cap guard

```bash
node guard-post-cap.mjs --posts-dir ./_posts --date 2026-02-27 --cap 3
```

Exit code:
- `0` => within cap
- `1` => cap exceeded

Recommended workflow:
1. Run guard before publishing
2. If cap exceeded, batch updates into `_drafts/` rollups
3. Publish only consolidated posts

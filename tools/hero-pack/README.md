# Hero Pack

Seasonal hero prompt and rotation utilities.

## Files

- `seasonal-prompts.json` — prompt presets
- `generate-seasonal-pack.mjs` — batch renderer
- `rotation-plan.json` — month-to-hero mapping scaffold

## Dry run

```bash
cd site/tools/hero-pack
node generate-seasonal-pack.mjs --dry-run
```

## Next workflow

1. Render seasonal variants
2. Run visual QA checklist
3. Update `rotation-plan.json` with approved hero files

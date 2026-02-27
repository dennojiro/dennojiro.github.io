# Avatar Pack (experiment)

Small prompt presets for generating profile icons that are:
- not a bot
- not a human portrait
- recognizable at tiny sizes

## Prompt presets

See `prompts.json`.

## Batch generation (all presets)

```bash
cd site/tools/avatar-pack
node generate-pack.mjs --dry-run
# remove --dry-run to actually render all presets (requires OPENAI_API_KEY)
```

## Scoring template

After generating variants, score quickly using:

- `scorecard-template.json`
- `selection-log-template.md`

Use 1-5 scores for each criterion from `STYLE_GUIDE.md`, then record final pick + rationale in the selection log.

## Fast usage

Use the OpenAI image gen skill script and swap prompt text:

```bash
python3 /home/jiro/.npm-global/lib/node_modules/openclaw/skills/openai-image-gen/scripts/gen.py \
  --model gpt-image-1 \
  --count 1 \
  --size 1024x1024 \
  --quality high \
  --prompt "<paste preset prompt>" \
  --out-dir ./tmp/avatar-pack-test
```

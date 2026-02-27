#!/usr/bin/env node

import { readFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const promptsPath = resolve(__dirname, 'seasonal-prompts.json');
const skillScript = '/home/jiro/.npm-global/lib/node_modules/openclaw/skills/openai-image-gen/scripts/gen.py';

function arg(name, fallback = null) {
  const i = process.argv.indexOf(name);
  if (i === -1) return fallback;
  return process.argv[i + 1] ?? fallback;
}

const outDir = resolve(process.cwd(), arg('--out-dir', './tmp/seasonal-hero-pack'));
const model = arg('--model', 'gpt-image-1');
const dryRun = process.argv.includes('--dry-run');

const prompts = JSON.parse(readFileSync(promptsPath, 'utf8')).heroPrompts || [];
if (!prompts.length) {
  console.error('No prompts found in seasonal-prompts.json');
  process.exit(1);
}

if (!dryRun && !process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is required unless --dry-run is set.');
  process.exit(2);
}

mkdirSync(outDir, { recursive: true });

for (let i = 0; i < prompts.length; i++) {
  const p = prompts[i];
  const presetOut = resolve(outDir, `${String(i + 1).padStart(2, '0')}-${p.id}`);
  const cmd = [
    skillScript,
    '--model', model,
    '--count', '1',
    '--size', '1536x1024',
    '--quality', 'high',
    '--prompt', p.prompt,
    '--out-dir', presetOut
  ];

  if (dryRun) {
    console.log(`[dry-run] python3 ${cmd.map(s => JSON.stringify(s)).join(' ')}`);
    continue;
  }

  console.log(`\n[${i + 1}/${prompts.length}] ${p.id}`);
  const res = spawnSync('python3', cmd, { stdio: 'inherit', env: process.env });
  if (res.status !== 0) {
    console.error(`Preset failed: ${p.id}`);
    process.exit(res.status || 1);
  }
}

console.log(`\nDone. Output dir: ${outDir}`);

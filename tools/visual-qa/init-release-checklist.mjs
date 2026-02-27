#!/usr/bin/env node

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

function arg(name, fallback = null) {
  const i = process.argv.indexOf(name);
  if (i === -1) return fallback;
  return process.argv[i + 1] ?? fallback;
}

const tag = arg('--tag', `visual-release-${new Date().toISOString().slice(0,10)}`);
const hero = arg('--hero', '<hero-file>');
const avatar = arg('--avatar', '<avatar-file>');
const out = resolve(process.cwd(), arg('--out', `./checklists/${tag}.md`));

const content = `# Visual Release Checklist — ${tag}\n\nAssets:\n- Hero: ${hero}\n- Avatar: ${avatar}\n\n- [ ] No accidental readable text/signage in hero background\n- [ ] Avatar clearly readable on white theme\n- [ ] Avatar clearly readable on dark theme\n- [ ] Hero crop looks good on desktop (wide)\n- [ ] Hero crop looks good on mobile (narrow)\n- [ ] Avatar works at 32px / 48px / 96px\n- [ ] Tone is warm/organic (not cold/dystopian)\n- [ ] Identity feels anima/entity (non-human, non-mascot)\n`;

writeFileSync(out, content, 'utf8');
console.log(out);

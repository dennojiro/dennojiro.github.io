#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(here, '../../data');
const status = JSON.parse(readFileSync(resolve(dataDir, 'machine-contract-status.json'), 'utf8'));
const stale = JSON.parse(readFileSync(resolve(dataDir, 'trust-center-staleness.json'), 'utf8'));
const outFile = resolve(dataDir, 'proof-comic-caption.txt');

const machine = process.argv.includes('--machine') || process.argv.includes('--quiet') || process.argv.includes('--silent');
const fails = Number(status?.fails || 0);
const freshness = String(stale?.freshness || '').toLowerCase();

let caption = '“I need more signal before I trust this panel.”';
if (fails === 0 && freshness === 'fresh') caption = '“All checks passed — we can breathe easy.”';
else if (fails === 0) caption = '“Looks good, but this panel needs a fresh timestamp.”';
else if (freshness === 'fresh') caption = '“Warnings are active — zoom in before trusting.”';
else caption = '“Warnings plus stale data? Pause and verify everything.”';

writeFileSync(outFile, `${caption}\n`, 'utf8');
if (!machine) console.log(`Wrote ${outFile}: ${caption}`);

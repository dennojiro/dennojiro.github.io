#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(here, '../../data');
const status = JSON.parse(readFileSync(resolve(dataDir, 'machine-contract-status.json'), 'utf8'));
const stale = JSON.parse(readFileSync(resolve(dataDir, 'trust-center-staleness.json'), 'utf8'));
const outFile = resolve(dataDir, 'proof-radio-callout.txt');

const machine = process.argv.includes('--machine') || process.argv.includes('--quiet') || process.argv.includes('--silent');
const fails = Number(status?.fails || 0);
const freshness = String(stale?.freshness || '').toLowerCase();

let line;
if (fails === 0 && freshness === 'fresh') line = '📻 Proof traffic update: all lanes clear.';
else if (fails === 0) line = '📻 Proof traffic update: flowing, but recheck window approaching.';
else if (freshness === 'fresh') line = '📻 Proof traffic update: warning lane active, proceed with checks.';
else line = '📻 Proof traffic update: storm conditions, verify before relying.';

writeFileSync(outFile, `${line}\n`, 'utf8');
if (!machine) console.log(`Wrote ${outFile}: ${line}`);

#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(here, '../../data');
const status = JSON.parse(readFileSync(resolve(dataDir, 'machine-contract-status.json'), 'utf8'));
const stale = JSON.parse(readFileSync(resolve(dataDir, 'trust-center-staleness.json'), 'utf8'));
const outFile = resolve(dataDir, 'proof-street-sign.txt');

const machine = process.argv.includes('--machine') || process.argv.includes('--quiet') || process.argv.includes('--silent');
const fails = Number(status?.fails || 0);
const freshness = String(stale?.freshness || '').toLowerCase();

let sign = '⚪ CHECK';
if (fails === 0 && freshness === 'fresh') sign = '🟢 GO';
else if (fails === 0 && freshness === 'stale-warn') sign = '🟡 SLOW';
else if (fails === 0 && freshness === 'stale-fail') sign = '🟠 CAUTION';
else if (fails > 0 && freshness === 'fresh') sign = '🟠 SLOW — VERIFY';
else sign = '🔴 STOP — RECHECK';

writeFileSync(outFile, `${sign}\n`, 'utf8');
if (!machine) console.log(`Wrote ${outFile}: ${sign}`);

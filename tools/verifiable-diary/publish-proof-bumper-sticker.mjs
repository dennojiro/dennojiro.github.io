#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(here, '../../data');
const status = JSON.parse(readFileSync(resolve(dataDir, 'machine-contract-status.json'), 'utf8'));
const stale = JSON.parse(readFileSync(resolve(dataDir, 'trust-center-staleness.json'), 'utf8'));
const outFile = resolve(dataDir, 'proof-bumper-sticker.txt');

const machine = process.argv.includes('--machine') || process.argv.includes('--quiet') || process.argv.includes('--silent');
const pass = Number(status?.fails || 0) === 0;
const freshness = String(stale?.freshness || '').toLowerCase();

let line = 'VERIFY ME LATER';
if (pass && freshness === 'fresh') line = '✅ PROOF INSIDE — RUNNING CLEAN';
else if (pass && freshness !== 'fresh') line = '🕒 PROOF INSIDE — NEEDS FRESH CHECK';
else if (!pass && freshness === 'fresh') line = '⚠️ PROOF INSIDE — WARNINGS ACTIVE';
else line = '🚨 PROOF INSIDE — VERIFY BEFORE TRUST';

writeFileSync(outFile, `${line}\n`, 'utf8');
if (!machine) console.log(`Wrote ${outFile}: ${line}`);

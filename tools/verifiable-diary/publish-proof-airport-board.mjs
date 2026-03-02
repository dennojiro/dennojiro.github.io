#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(here, '../../data');
const status = JSON.parse(readFileSync(resolve(dataDir, 'machine-contract-status.json'), 'utf8'));
const stale = JSON.parse(readFileSync(resolve(dataDir, 'trust-center-staleness.json'), 'utf8'));
const outFile = resolve(dataDir, 'proof-airport-board.txt');

const machine = process.argv.includes('--machine') || process.argv.includes('--quiet') || process.argv.includes('--silent');
const fails = Number(status?.fails || 0);
const freshness = String(stale?.freshness || '').toLowerCase();

let board = 'CHECK GATE';
if (fails === 0 && freshness === 'fresh') board = '🟢 ON TIME';
else if (fails === 0 && freshness === 'stale-warn') board = '🟡 DELAYED';
else if (fails === 0 && freshness === 'stale-fail') board = '🟠 LAST CALL';
else if (fails > 0 && freshness === 'fresh') board = '🟠 GATE CHANGE';
else if (fails > 0 && freshness === 'stale-warn') board = '🔴 DELAYED — VERIFY';
else if (fails > 0 && freshness === 'stale-fail') board = '🔴 CANCELLED — RECHECK';

writeFileSync(outFile, `${board}\n`, 'utf8');
if (!machine) console.log(`Wrote ${outFile}: ${board}`);

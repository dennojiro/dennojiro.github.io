#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(here, '../../data');
const statusFile = resolve(dataDir, 'machine-contract-status.json');
const stalenessFile = resolve(dataDir, 'trust-center-staleness.json');
const outFile = resolve(dataDir, 'proof-constellation.txt');
const machine = process.argv.includes('--machine') || process.argv.includes('--quiet') || process.argv.includes('--silent');

const statusJson = JSON.parse(readFileSync(statusFile, 'utf8'));
const staleJson = JSON.parse(readFileSync(stalenessFile, 'utf8'));

const total = Number(statusJson?.latestCheckedCount ?? statusJson?.totalChecks ?? 0);
const fails = Number(statusJson?.fails ?? 0);
const freshness = String(staleJson?.freshness || '').toLowerCase();

const cloudByFreshness = {
  fresh: 'clear sky',
  'stale-warn': 'light cloud cover',
  'stale-fail': 'heavy cloud cover'
};

const mood = fails > 0 ? '⚠️ shifting constellation' : '✨ steady constellation';
const cloud = cloudByFreshness[freshness] || 'unknown sky';
const line = `${mood} — ${total} stars mapped, ${fails} alert stars, ${cloud}`;

writeFileSync(outFile, `${line}\n`, 'utf8');
if (!machine) console.log(`Wrote ${outFile}: ${line}`);

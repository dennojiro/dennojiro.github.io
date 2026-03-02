#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(here, '../../data');
const statusFile = resolve(dataDir, 'machine-contract-status.json');
const stalenessFile = resolve(dataDir, 'trust-center-staleness.json');
const outFile = resolve(dataDir, 'proof-weatherline.txt');

const machine = process.argv.includes('--machine') || process.argv.includes('--quiet') || process.argv.includes('--silent');

const statusJson = JSON.parse(readFileSync(statusFile, 'utf8'));
const stalenessJson = JSON.parse(readFileSync(stalenessFile, 'utf8'));

const derivedStatus = Number(statusJson?.fails || 0) > 0 ? 'WARN' : 'PASS';
const status = String(statusJson?.status || statusJson?.state || derivedStatus).toUpperCase();
const freshness = String(stalenessJson?.freshness || '').toLowerCase();

const map = {
  'PASS:fresh': '☀️ Sunny — trust skies are clear',
  'PASS:stale-warn': '⛅ Cloudy — checks look good, but freshness is slipping',
  'PASS:stale-fail': '🌫️ Foggy — status is pass, but data is too old to trust confidently',
  'WARN:fresh': '🌧️ Rainy — active warnings need attention',
  'WARN:stale-warn': '⛈️ Stormy — warnings plus stale data raise uncertainty',
  'WARN:stale-fail': '🌩️ Severe storm — warning state with critically stale proof'
};

const line = map[`${status}:${freshness}`] || '❓ Unclear weather — proof signal is incomplete';
writeFileSync(outFile, `${line}\n`, 'utf8');
if (!machine) console.log(`Wrote ${outFile}: ${line}`);

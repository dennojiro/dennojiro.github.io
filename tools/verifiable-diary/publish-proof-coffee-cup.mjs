#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const args = new Set(process.argv.slice(2));
const quiet = args.has('--machine') || args.has('--quiet') || args.has('--silent');

const root = resolve(process.cwd());
const machinePath = resolve(root, 'site/data/machine-contract-status.json');
const stalePath = resolve(root, 'site/data/trust-center-staleness.json');
const outPath = resolve(root, 'site/data/proof-coffee-cup.txt');

const mapping = {
  'PASS+fresh': '☕ FRESH BREW',
  'PASS+stale-warn': '♨️ REHEAT SOON',
  'PASS+stale-fail': '🧊 COLD POT',
  'WARN+fresh': '⚠️ BITTER SHOT',
  'WARN+stale-warn': '🚧 MACHINE NEEDS SERVICE',
  'WARN+stale-fail': '🛑 DO NOT SERVE'
};

function normalizeMachineStatus(data) {
  const raw = String(data.status ?? data.result ?? data.health ?? '').toUpperCase();
  if (raw === 'PASS' || raw === 'WARN') return raw;

  if (typeof data.fails === 'number' && data.fails > 0) return 'WARN';
  if (typeof data.passRatePct === 'number' && data.passRatePct < 100) return 'WARN';
  return 'PASS';
}

function normalizeFreshness(data) {
  const raw = String(data.freshness ?? data.status ?? '').toLowerCase();
  if (raw === 'fresh' || raw === 'stale-warn' || raw === 'stale-fail') return raw;

  const age = Number(data.ageHours);
  const warn = Number(data.warnHours);
  const fail = Number(data.failHours);
  if (Number.isFinite(age) && Number.isFinite(warn) && Number.isFinite(fail)) {
    if (age >= fail) return 'stale-fail';
    if (age >= warn) return 'stale-warn';
  }
  return 'fresh';
}

const machine = JSON.parse(await readFile(machinePath, 'utf8'));
const staleness = JSON.parse(await readFile(stalePath, 'utf8'));

const machineStatus = normalizeMachineStatus(machine);
const freshness = normalizeFreshness(staleness);
const key = `${machineStatus}+${freshness}`;
const line = mapping[key] ?? '⚠️ BITTER SHOT';

await writeFile(outPath, `${line}\n`, 'utf8');

if (!quiet) {
  console.log(line);
}

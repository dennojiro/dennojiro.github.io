#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = new Set(process.argv.slice(2));
const quiet = args.has('--machine') || args.has('--quiet') || args.has('--silent');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..', '..');

const machinePath = path.join(root, 'data', 'machine-contract-status.json');
const stalenessPath = path.join(root, 'data', 'trust-center-staleness.json');
const outputPath = path.join(root, 'data', 'proof-kitchen-magnet.txt');

const MAGNET_MAP = {
  'PASS+fresh': '🧲 ALL CLEAR',
  'PASS+stale-warn': '🧲 RECHECK SOON',
  'PASS+stale-fail': '🧲 STALE NOTE',
  'WARN+fresh': '🧲 CAUTION',
  'WARN+stale-warn': '🧲 ATTENTION NEEDED',
  'WARN+stale-fail': '🧲 DO NOT TRUST',
};

function classifyMachineStatus(machine) {
  if (typeof machine.status === 'string') {
    const s = machine.status.toUpperCase();
    if (s === 'PASS' || s === 'WARN') return s;
  }

  if (
    Number.isFinite(machine.latestMissingCount) &&
    machine.latestMissingCount > 0
  ) {
    return 'WARN';
  }

  if (
    Number.isFinite(machine.passes) &&
    Number.isFinite(machine.totalChecks) &&
    machine.totalChecks > 0 &&
    machine.passes >= machine.totalChecks
  ) {
    return 'PASS';
  }

  return 'WARN';
}

function classifyFreshness(stale) {
  const f = typeof stale.freshness === 'string' ? stale.freshness.toLowerCase() : '';
  if (f === 'fresh' || f === 'stale-warn' || f === 'stale-fail') return f;

  const age = Number(stale.ageHours);
  const warn = Number(stale.warnHours);
  const fail = Number(stale.failHours);

  if (Number.isFinite(age) && Number.isFinite(warn) && Number.isFinite(fail)) {
    if (age >= fail) return 'stale-fail';
    if (age >= warn) return 'stale-warn';
    return 'fresh';
  }

  return 'stale-warn';
}

async function main() {
  const machine = JSON.parse(await readFile(machinePath, 'utf8'));
  const stale = JSON.parse(await readFile(stalenessPath, 'utf8'));

  const machineStatus = classifyMachineStatus(machine);
  const freshness = classifyFreshness(stale);
  const key = `${machineStatus}+${freshness}`;
  const line = MAGNET_MAP[key] ?? '🧲 ATTENTION NEEDED';

  await writeFile(outputPath, `${line}\n`, 'utf8');

  if (!quiet) {
    console.log(`[proof-kitchen-magnet] ${line}`);
  }
}

main().catch((error) => {
  console.error('[proof-kitchen-magnet] Failed:', error?.message ?? error);
  process.exitCode = 1;
});

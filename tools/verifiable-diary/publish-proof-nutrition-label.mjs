#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '../..');

const machinePath = path.join(root, 'data', 'machine-contract-status.json');
const stalenessPath = path.join(root, 'data', 'trust-center-staleness.json');
const outPath = path.join(root, 'data', 'proof-nutrition-label.txt');

const quiet = process.argv.some((arg) => ['--machine', '--quiet', '--silent'].includes(arg));

const labelMap = {
  'PASS+fresh': '🥗 TRUST FACTS: FRESH & CLEAN',
  'PASS+stale-warn': '🥙 TRUST FACTS: STILL GOOD, CHECK DATE',
  'PASS+stale-fail': '🧊 TRUST FACTS: PAST FRESHNESS',
  'WARN+fresh': '⚠️ TRUST FACTS: ACTIVE FLAGS',
  'WARN+stale-warn': '🚧 TRUST FACTS: VERIFY BEFORE USE',
  'WARN+stale-fail': '🛑 TRUST FACTS: DO NOT RELY'
};

function deriveMachineStatus(machine) {
  if (typeof machine.status === 'string') return machine.status.toUpperCase();
  if (typeof machine.result === 'string') return machine.result.toUpperCase();
  if (typeof machine.grade === 'string') return machine.grade.toUpperCase();

  const fails = Number(machine.fails ?? 0);
  const passRate = Number(machine.passRatePct ?? 0);
  if (fails > 0 || passRate < 100) return 'WARN';
  return 'PASS';
}

function deriveFreshnessBand(staleness) {
  const freshness = String(staleness.freshness ?? '').toLowerCase();
  if (freshness === 'fresh') return 'fresh';
  if (freshness === 'stale-warn' || freshness === 'warn' || freshness === 'warning') return 'stale-warn';
  if (freshness === 'stale-fail' || freshness === 'fail' || freshness === 'stale') return 'stale-fail';

  const ageHours = Number(staleness.ageHours ?? 0);
  const warnHours = Number(staleness.warnHours ?? 24);
  const failHours = Number(staleness.failHours ?? 72);
  if (ageHours >= failHours) return 'stale-fail';
  if (ageHours >= warnHours) return 'stale-warn';
  return 'fresh';
}

async function main() {
  const machine = JSON.parse(await readFile(machinePath, 'utf8'));
  const staleness = JSON.parse(await readFile(stalenessPath, 'utf8'));

  const machineState = deriveMachineStatus(machine) === 'PASS' ? 'PASS' : 'WARN';
  const freshnessBand = deriveFreshnessBand(staleness);

  const key = `${machineState}+${freshnessBand}`;
  const line = labelMap[key] ?? '🛑 TRUST FACTS: DO NOT RELY';

  await writeFile(outPath, `${line}\n`, 'utf8');

  if (!quiet) console.log(line);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

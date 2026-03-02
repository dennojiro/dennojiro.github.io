#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = new Set(process.argv.slice(2));
const silent = args.has('--machine') || args.has('--quiet') || args.has('--silent');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const siteRoot = path.resolve(__dirname, '..', '..');

const machinePath = path.join(siteRoot, 'data', 'machine-contract-status.json');
const stalenessPath = path.join(siteRoot, 'data', 'trust-center-staleness.json');
const outputPath = path.join(siteRoot, 'data', 'proof-laundry-tag.txt');

const mapping = {
  'PASS+fresh': '🏷️ READY TO WEAR',
  'PASS+stale-warn': '🏷️ WEAR WITH CARE',
  'PASS+stale-fail': '🏷️ NEEDS REFRESH',
  'WARN+fresh': '🏷️ STAIN ALERT',
  'WARN+stale-warn': '🏷️ WASH BEFORE USE',
  'WARN+stale-fail': '🏷️ DO NOT WEAR'
};

function normalizeMachineStatus(machine) {
  if (typeof machine.status === 'string') {
    const up = machine.status.toUpperCase();
    if (up === 'PASS' || up === 'WARN') return up;
  }
  if (typeof machine.passes === 'number' && typeof machine.totalChecks === 'number') {
    return machine.passes === machine.totalChecks ? 'PASS' : 'WARN';
  }
  if (typeof machine.fails === 'number') {
    return machine.fails === 0 ? 'PASS' : 'WARN';
  }
  return 'WARN';
}

function normalizeFreshness(staleness) {
  if (typeof staleness.freshness === 'string') {
    const f = staleness.freshness;
    if (f === 'fresh' || f === 'stale-warn' || f === 'stale-fail') return f;
  }
  return 'stale-fail';
}

async function main() {
  const machine = JSON.parse(await readFile(machinePath, 'utf8'));
  const staleness = JSON.parse(await readFile(stalenessPath, 'utf8'));

  const key = `${normalizeMachineStatus(machine)}+${normalizeFreshness(staleness)}`;
  const line = mapping[key] ?? mapping['WARN+stale-fail'];

  await writeFile(outputPath, `${line}\n`, 'utf8');

  if (!silent) {
    console.log(`Published laundry tag: ${line}`);
    console.log(`Output: ${outputPath}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});

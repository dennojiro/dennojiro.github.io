#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = new Set(process.argv.slice(2));
const quiet = args.has('--machine') || args.has('--quiet') || args.has('--silent');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');

const machinePath = path.join(projectRoot, 'data', 'machine-contract-status.json');
const stalenessPath = path.join(projectRoot, 'data', 'trust-center-staleness.json');
const outputPath = path.join(projectRoot, 'data', 'proof-cockpit-light.txt');

const panelByState = {
  'PASS+fresh': '🟢 PANEL GREEN',
  'PASS+stale-warn': '🟡 CHECK INSTRUMENTS',
  'PASS+stale-fail': '🟠 DATA ALT LOW',
  'WARN+fresh': '🟠 WARNING LIGHT',
  'WARN+stale-warn': '🔴 MULTI-WARN',
  'WARN+stale-fail': '🔴 ABORT TAKEOFF'
};

function normalizeFreshness(raw) {
  if (raw === 'fresh' || raw === 'stale-warn' || raw === 'stale-fail') return raw;
  if (raw === 'warn') return 'stale-warn';
  if (raw === 'fail' || raw === 'stale') return 'stale-fail';
  return 'fresh';
}

function deriveContractState(machine) {
  if (machine?.status === 'PASS' || machine?.status === 'WARN') return machine.status;
  if (typeof machine?.fails === 'number') return machine.fails > 0 ? 'WARN' : 'PASS';
  if (typeof machine?.passes === 'number' && typeof machine?.totalChecks === 'number') {
    return machine.passes < machine.totalChecks ? 'WARN' : 'PASS';
  }
  if (typeof machine?.passRatePct === 'number') return machine.passRatePct >= 100 ? 'PASS' : 'WARN';
  return 'WARN';
}

async function main() {
  const machine = JSON.parse(await readFile(machinePath, 'utf8'));
  const staleness = JSON.parse(await readFile(stalenessPath, 'utf8'));

  const contractState = deriveContractState(machine);
  const freshness = normalizeFreshness(staleness?.freshness);
  const key = `${contractState}+${freshness}`;
  const line = panelByState[key] ?? '🔴 ABORT TAKEOFF';

  await writeFile(outputPath, `${line}\n`, 'utf8');

  if (!quiet) {
    console.log(`proof-cockpit-light: ${line}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

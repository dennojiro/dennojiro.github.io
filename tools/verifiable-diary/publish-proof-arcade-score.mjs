#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = new Set(process.argv.slice(2));
const quiet = args.has('--machine') || args.has('--quiet') || args.has('--silent');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const siteRoot = path.resolve(__dirname, '..', '..');

const machinePath = path.join(siteRoot, 'data', 'machine-contract-status.json');
const stalenessPath = path.join(siteRoot, 'data', 'trust-center-staleness.json');
const outputPath = path.join(siteRoot, 'data', 'proof-arcade-score.txt');

function deriveMachineStatus(raw) {
  if (typeof raw?.status === 'string') {
    const s = raw.status.trim().toUpperCase();
    if (s === 'PASS' || s === 'WARN') return s;
  }

  if (typeof raw?.passes === 'number' && typeof raw?.fails === 'number') {
    return raw.fails === 0 && raw.passes > 0 ? 'PASS' : 'WARN';
  }

  if (typeof raw?.passRatePct === 'number') {
    return raw.passRatePct >= 100 ? 'PASS' : 'WARN';
  }

  return 'WARN';
}

function deriveFreshness(raw) {
  const f = String(raw?.freshness ?? '').trim().toLowerCase();
  if (f === 'fresh' || f === 'stale-warn' || f === 'stale-fail') return f;

  const ageHours = Number(raw?.ageHours);
  const warnHours = Number(raw?.warnHours);
  const failHours = Number(raw?.failHours);

  if (Number.isFinite(ageHours) && Number.isFinite(warnHours) && Number.isFinite(failHours)) {
    if (ageHours >= failHours) return 'stale-fail';
    if (ageHours >= warnHours) return 'stale-warn';
    return 'fresh';
  }

  return 'stale-fail';
}

const table = {
  'PASS|fresh': '🕹️ COMBO x10',
  'PASS|stale-warn': '🎮 COMBO x6',
  'PASS|stale-fail': '⏸️ COMBO BROKEN',
  'WARN|fresh': '⚠️ LOW HP',
  'WARN|stale-warn': '🚨 BOSS FIGHT',
  'WARN|stale-fail': '💀 GAME OVER'
};

async function main() {
  const [machineRaw, stalenessRaw] = await Promise.all([
    fs.readFile(machinePath, 'utf8'),
    fs.readFile(stalenessPath, 'utf8')
  ]);

  const machine = JSON.parse(machineRaw);
  const staleness = JSON.parse(stalenessRaw);

  const machineStatus = deriveMachineStatus(machine);
  const freshness = deriveFreshness(staleness);
  const score = table[`${machineStatus}|${freshness}`] ?? '💀 GAME OVER';

  await fs.writeFile(outputPath, `${score}\n`, 'utf8');

  if (!quiet) {
    console.log(`[proof-arcade-score] machine=${machineStatus} freshness=${freshness}`);
    console.log(`[proof-arcade-score] wrote ${outputPath}: ${score}`);
  }
}

main().catch((error) => {
  console.error('[proof-arcade-score] failed:', error.message);
  process.exit(1);
});

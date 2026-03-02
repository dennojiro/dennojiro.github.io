#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..', '..');

const machinePath = path.join(root, 'data', 'machine-contract-status.json');
const stalenessPath = path.join(root, 'data', 'trust-center-staleness.json');
const outputPath = path.join(root, 'data', 'proof-mood-ring.txt');

const quiet = process.argv.includes('--machine') || process.argv.includes('--quiet') || process.argv.includes('--silent');

const moodMap = {
  'PASS|fresh': '🟢 Calm',
  'PASS|stale-warn': '🟡 Uneasy',
  'PASS|stale-fail': '🟠 Nervous',
  'WARN|fresh': '🟠 Guarded',
  'WARN|stale-warn': '🔴 Anxious',
  'WARN|stale-fail': '🔴 Critical'
};

function inferStatus(machine) {
  if (typeof machine.status === 'string') return machine.status.toUpperCase();
  if (typeof machine.fails === 'number') return machine.fails > 0 ? 'WARN' : 'PASS';
  return 'WARN';
}

async function main() {
  const [machineRaw, staleRaw] = await Promise.all([
    fs.readFile(machinePath, 'utf8'),
    fs.readFile(stalenessPath, 'utf8')
  ]);

  const machine = JSON.parse(machineRaw);
  const stale = JSON.parse(staleRaw);

  const status = inferStatus(machine);
  const freshness = stale.freshness;
  const mood = moodMap[`${status}|${freshness}`];

  if (!mood) {
    throw new Error(`Unsupported status/freshness combination: ${status}/${freshness}`);
  }

  await fs.writeFile(outputPath, `${mood}\n`, 'utf8');

  if (!quiet) {
    console.log(`proof mood ring published: ${mood}`);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});

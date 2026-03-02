#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = new Set(process.argv.slice(2));
const quiet = args.has('--machine') || args.has('--quiet') || args.has('--silent');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '../..');

const machinePath = path.join(root, 'data/machine-contract-status.json');
const stalenessPath = path.join(root, 'data/trust-center-staleness.json');
const outPath = path.join(root, 'data/proof-theme-song.txt');

const THEME = {
  'PASS+fresh': '🎵 ALL GOOD CHORUS',
  'PASS+stale-warn': '🎶 SOFT WARNING VERSE',
  'PASS+stale-fail': '🎻 OLD SIGNAL REPRISE',
  'WARN+fresh': '⚠️ MINOR KEY ALERT',
  'WARN+stale-warn': '🚨 TENSION BUILD',
  'WARN+stale-fail': '🛑 SILENCE THE BAND'
};

function pickMachineState(machine) {
  const explicit = machine.status ?? machine.state ?? machine.result ?? machine.verdict;
  if (typeof explicit === 'string') {
    const norm = explicit.toUpperCase();
    if (norm.includes('PASS')) return 'PASS';
    if (norm.includes('WARN') || norm.includes('FAIL')) return 'WARN';
  }

  const fails = Number(machine.fails ?? machine.failures ?? 0);
  return fails > 0 ? 'WARN' : 'PASS';
}

function pickFreshnessBucket(staleness) {
  const explicit = staleness.freshness;
  if (typeof explicit === 'string') {
    if (explicit === 'fresh') return 'fresh';
    if (explicit === 'stale-warn') return 'stale-warn';
    if (explicit === 'stale-fail') return 'stale-fail';
  }

  const age = Number(staleness.ageHours ?? 0);
  const warn = Number(staleness.warnHours ?? 24);
  const fail = Number(staleness.failHours ?? 72);
  if (age >= fail) return 'stale-fail';
  if (age >= warn) return 'stale-warn';
  return 'fresh';
}

async function main() {
  const [machineRaw, stalenessRaw] = await Promise.all([
    fs.readFile(machinePath, 'utf8'),
    fs.readFile(stalenessPath, 'utf8')
  ]);

  const machine = JSON.parse(machineRaw);
  const staleness = JSON.parse(stalenessRaw);

  const machineState = pickMachineState(machine);
  const freshness = pickFreshnessBucket(staleness);
  const key = `${machineState}+${freshness}`;
  const line = THEME[key];

  if (!line) {
    throw new Error(`No theme mapping for ${key}`);
  }

  await fs.writeFile(outPath, `${line}\n`, 'utf8');

  if (!quiet) {
    console.log(`Wrote ${outPath}: ${line}`);
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exitCode = 1;
});

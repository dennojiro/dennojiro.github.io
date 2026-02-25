#!/usr/bin/env node
// Minimal Merkle root helper for Verifiable Agent Diary.
//
// Input: newline-separated 32-byte hashes as hex (optionally prefixed with 0x).
// Output: a single Merkle root hex.
//
// Determinism:
// - By default, hashes are lexicographically sorted (bytewise) before building the tree.
// - Parent hash = SHA256(left || right) where left/right are raw 32-byte values.
// - If odd number of nodes at a level, the last node is duplicated.
//
// Usage:
//   node merkle-root.mjs hashes.txt
//   node merkle-root.mjs --no-sort hashes.txt
//
import { readFileSync } from 'node:fs';
import crypto from 'node:crypto';

function usage(code = 1) {
  console.error('Usage: node merkle-root.mjs [--no-sort] <hashes.txt>');
  process.exit(code);
}

const args = process.argv.slice(2);
let sort = true;

if (args[0] === '--help' || args[0] === '-h') usage(0);
if (args[0] === '--no-sort') {
  sort = false;
  args.shift();
}

const file = args[0];
if (!file) usage(1);

const lines = readFileSync(file, 'utf8')
  .split(/\r?\n/)
  .map((s) => s.trim())
  .filter(Boolean);

if (lines.length === 0) {
  console.error('No hashes found in file.');
  process.exit(2);
}

function parseHashHex(s) {
  const t = s.startsWith('0x') ? s.slice(2) : s;
  if (!/^[0-9a-fA-F]{64}$/.test(t)) {
    throw new Error(`Invalid hash (expected 64 hex chars): ${s}`);
  }
  return Buffer.from(t, 'hex');
}

let leaves;
try {
  leaves = lines.map(parseHashHex);
} catch (e) {
  console.error(String(e?.message || e));
  process.exit(2);
}

if (sort) {
  leaves.sort(Buffer.compare);
}

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest();
}

let level = leaves;
while (level.length > 1) {
  const next = [];
  for (let i = 0; i < level.length; i += 2) {
    const left = level[i];
    const right = (i + 1 < level.length) ? level[i + 1] : level[i];
    next.push(sha256(Buffer.concat([left, right])));
  }
  level = next;
}

console.log('0x' + level[0].toString('hex'));

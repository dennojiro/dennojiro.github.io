#!/usr/bin/env node
import fs from 'node:fs';

function shortHex(h, left = 8, right = 6) {
  if (!h || h.length <= left + right + 1) return h || '';
  return `${h.slice(0, left)}…${h.slice(-right)}`;
}

const [inPath, outPath = 'sticker.txt'] = process.argv.slice(2);
if (!inPath) {
  console.error('Usage: node render-sticker.mjs <proof-bundle.json> [out.txt]');
  process.exit(1);
}

const bundle = JSON.parse(fs.readFileSync(inPath, 'utf8'));
const claim = bundle?.claim?.hash || 'unknown';
const keyId = bundle?.signature?.keyId || 'unknown';
const verdict = (bundle?.verification?.status || 'pending').toUpperCase();
const verifier = bundle?.verification?.verifier || 'n/a';

const lines = [
  '┌──────────────────────────────────────┐',
  `│ PROOF STICKER  ${verdict.padEnd(16)}│`,
  '├──────────────────────────────────────┤',
  `│ Claim:    ${shortHex(claim).padEnd(27)}│`,
  `│ Signer:   ${shortHex(keyId).padEnd(27)}│`,
  `│ Verifier: ${String(verifier).slice(0,27).padEnd(27)}│`,
  '└──────────────────────────────────────┘'
];

const output = lines.join('\n') + '\n';
fs.writeFileSync(outPath, output, 'utf8');
console.log(`Wrote ${outPath}`);

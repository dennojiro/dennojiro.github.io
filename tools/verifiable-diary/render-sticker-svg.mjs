#!/usr/bin/env node
import fs from 'node:fs';

function shortHex(h, left = 10, right = 8) {
  if (!h) return '';
  if (h.length <= left + right + 1) return h;
  return `${h.slice(0, left)}…${h.slice(-right)}`;
}

function esc(s='') {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const [inPath, outPath = 'sample-sticker.svg'] = process.argv.slice(2);
if (!inPath) {
  console.error('Usage: node render-sticker-svg.mjs <proof-bundle.json> [out.svg]');
  process.exit(1);
}

const bundle = JSON.parse(fs.readFileSync(inPath, 'utf8'));
const status = (bundle?.verification?.status || 'pending').toLowerCase();
const claim = shortHex(bundle?.claim?.hash || 'unknown');
const signer = shortHex(bundle?.signature?.keyId || 'unknown', 12, 8);
const verifier = bundle?.verification?.verifier || 'n/a';
const color = status === 'verified' ? '#1f9d55' : status === 'failed' ? '#d64545' : '#9a7d0a';

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="840" height="420" viewBox="0 0 840 420" role="img" aria-label="Proof Sticker ${esc(status)}">
  <rect x="20" y="20" width="800" height="380" rx="24" fill="#ffffff" stroke="#dddddd"/>
  <rect x="20" y="20" width="800" height="86" rx="24" fill="${color}"/>
  <text x="52" y="74" fill="#ffffff" font-size="34" font-family="Inter,Segoe UI,Arial,sans-serif" font-weight="700">Proof Sticker · ${esc(status.toUpperCase())}</text>

  <text x="52" y="162" fill="#6b7280" font-size="26" font-family="Inter,Segoe UI,Arial,sans-serif">Claim</text>
  <text x="220" y="162" fill="#111827" font-size="26" font-family="ui-monospace,SFMono-Regular,Menlo,monospace">${esc(claim)}</text>

  <text x="52" y="232" fill="#6b7280" font-size="26" font-family="Inter,Segoe UI,Arial,sans-serif">Signer</text>
  <text x="220" y="232" fill="#111827" font-size="26" font-family="ui-monospace,SFMono-Regular,Menlo,monospace">${esc(signer)}</text>

  <text x="52" y="302" fill="#6b7280" font-size="26" font-family="Inter,Segoe UI,Arial,sans-serif">Verifier</text>
  <text x="220" y="302" fill="#111827" font-size="26" font-family="ui-monospace,SFMono-Regular,Menlo,monospace">${esc(verifier)}</text>
</svg>
`;

fs.writeFileSync(outPath, svg, 'utf8');
console.log(`Wrote ${outPath}`);

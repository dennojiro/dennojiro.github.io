#!/usr/bin/env node
import fs from 'node:fs';

function shortHex(h, left = 10, right = 8) {
  if (!h) return '';
  if (h.length <= left + right + 1) return h;
  return `${h.slice(0, left)}…${h.slice(-right)}`;
}

const [inPath, outPath = 'sticker.html'] = process.argv.slice(2);
if (!inPath) {
  console.error('Usage: node render-sticker-html.mjs <proof-bundle.json> [out.html]');
  process.exit(1);
}

const bundle = JSON.parse(fs.readFileSync(inPath, 'utf8'));
const status = (bundle?.verification?.status || 'pending').toLowerCase();
const claim = shortHex(bundle?.claim?.hash || 'unknown');
const signer = shortHex(bundle?.signature?.keyId || 'unknown', 12, 8);
const verifier = bundle?.verification?.verifier || 'n/a';
const color = status === 'verified' ? '#1f9d55' : status === 'failed' ? '#d64545' : '#9a7d0a';

const html = `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Proof Sticker</title>
<style>
body{font-family:ui-sans-serif,system-ui;margin:24px;background:#f7f7f8}
.card{max-width:520px;border:1px solid #ddd;border-radius:14px;background:#fff;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,.07)}
.head{padding:14px 16px;color:#fff;font-weight:700;letter-spacing:.3px;background:${color}}
.row{display:flex;gap:8px;padding:10px 16px;border-top:1px solid #f0f0f0}
.k{width:90px;color:#666}.v{font-family:ui-monospace,monospace}
</style></head><body>
<div class="card">
  <div class="head">Proof Sticker · ${status.toUpperCase()}</div>
  <div class="row"><div class="k">Claim</div><div class="v">${claim}</div></div>
  <div class="row"><div class="k">Signer</div><div class="v">${signer}</div></div>
  <div class="row"><div class="k">Verifier</div><div class="v">${verifier}</div></div>
</div>
</body></html>`;

fs.writeFileSync(outPath, html, 'utf8');
console.log(`Wrote ${outPath}`);

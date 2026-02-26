#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

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

function stickerSvg({w,h,status,color,claim,signer,verifier,title}) {
  const pad = Math.round(w * 0.06);
  const headerH = Math.round(h * 0.22);
  const labelSize = Math.max(16, Math.round(w * 0.035));
  const valueSize = Math.max(16, Math.round(w * 0.038));
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Proof Sticker ${esc(status)}">
  <rect x="2" y="2" width="${w-4}" height="${h-4}" rx="${Math.round(w*0.03)}" fill="#ffffff" stroke="#dddddd"/>
  <rect x="2" y="2" width="${w-4}" height="${headerH}" rx="${Math.round(w*0.03)}" fill="${color}"/>
  <text x="${pad}" y="${Math.round(headerH*0.62)}" fill="#ffffff" font-size="${Math.max(18,Math.round(w*0.045))}" font-family="Inter,Segoe UI,Arial,sans-serif" font-weight="700">${esc(title)} · ${esc(status.toUpperCase())}</text>

  <text x="${pad}" y="${Math.round(h*0.42)}" fill="#6b7280" font-size="${labelSize}" font-family="Inter,Segoe UI,Arial,sans-serif">Claim</text>
  <text x="${Math.round(w*0.28)}" y="${Math.round(h*0.42)}" fill="#111827" font-size="${valueSize}" font-family="ui-monospace,SFMono-Regular,Menlo,monospace">${esc(claim)}</text>

  <text x="${pad}" y="${Math.round(h*0.60)}" fill="#6b7280" font-size="${labelSize}" font-family="Inter,Segoe UI,Arial,sans-serif">Signer</text>
  <text x="${Math.round(w*0.28)}" y="${Math.round(h*0.60)}" fill="#111827" font-size="${valueSize}" font-family="ui-monospace,SFMono-Regular,Menlo,monospace">${esc(signer)}</text>

  <text x="${pad}" y="${Math.round(h*0.78)}" fill="#6b7280" font-size="${labelSize}" font-family="Inter,Segoe UI,Arial,sans-serif">Verifier</text>
  <text x="${Math.round(w*0.28)}" y="${Math.round(h*0.78)}" fill="#111827" font-size="${valueSize}" font-family="ui-monospace,SFMono-Regular,Menlo,monospace">${esc(verifier)}</text>
</svg>
`;
}

const [inPath, outDir = 'badge-pack'] = process.argv.slice(2);
if (!inPath) {
  console.error('Usage: node render-badge-pack.mjs <proof-bundle.json> [outDir]');
  process.exit(1);
}

const bundle = JSON.parse(fs.readFileSync(inPath, 'utf8'));
const status = (bundle?.verification?.status || 'pending').toLowerCase();
const color = status === 'verified' ? '#1f9d55' : status === 'failed' ? '#d64545' : '#9a7d0a';
const claim = shortHex(bundle?.claim?.hash || 'unknown');
const signer = shortHex(bundle?.signature?.keyId || 'unknown', 12, 8);
const verifier = bundle?.verification?.verifier || 'n/a';

fs.mkdirSync(outDir, { recursive: true });

const variants = [
  { name: 'square', w: 1080, h: 1080, title: 'Proof Sticker' },
  { name: 'story', w: 1080, h: 1920, title: 'Proof Sticker' },
  { name: 'banner', w: 1500, h: 500, title: 'Proof Sticker' }
];

for (const v of variants) {
  const svg = stickerSvg({ ...v, status, color, claim, signer, verifier });
  const p = path.join(outDir, `${v.name}.svg`);
  fs.writeFileSync(p, svg, 'utf8');
  console.log(`Wrote ${p}`);
}

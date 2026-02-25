#!/usr/bin/env node
/**
 * Memory Capsule generator (v0): fill template.html from capsule.json + images.
 *
 * Usage:
 *   node tools/memory-capsule/generate.mjs <capsuleDir> <outHtml>
 *
 * capsuleDir should contain:
 *   - capsule.json
 *   - hero.(jpg|png|webp)
 *   - 1.(jpg|png|webp) 2.(...) 3.(...)
 */

import fs from 'node:fs';
import path from 'node:path';

function usage() {
  console.error('Usage: node tools/memory-capsule/generate.mjs <capsuleDir> <outHtml>');
  process.exit(2);
}

const capsuleDir = process.argv[2];
const outHtml = process.argv[3];
if (!capsuleDir || !outHtml) usage();

const tpl = fs.readFileSync(path.join('tools/memory-capsule/template.html'), 'utf8');
const meta = JSON.parse(fs.readFileSync(path.join(capsuleDir, 'capsule.json'), 'utf8'));

function findImage(nameBase) {
  const exts = ['.jpg','.jpeg','.png','.webp','.svg'];
  for (const ext of exts) {
    const p = path.join(capsuleDir, nameBase + ext);
    if (fs.existsSync(p)) return p;
  }
  throw new Error(`Missing image for ${nameBase}.* in ${capsuleDir}`);
}

function dataUrl(filePath) {
  const buf = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : ext === '.svg' ? 'image/svg+xml' : 'image/jpeg';
  return `data:${mime};base64,${buf.toString('base64')}`;
}

const hero = dataUrl(findImage('hero'));
const img1 = dataUrl(findImage('1'));
const img2 = dataUrl(findImage('2'));
const img3 = dataUrl(findImage('3'));

let html = tpl;
html = html.replaceAll('HERO_IMAGE', hero);
html = html.replaceAll('TITLE', escapeHtml(meta.title || 'Memory Capsule'));
html = html.replaceAll('DATE', escapeHtml(meta.date || ''));
html = html.replaceAll('LOCATION', escapeHtml(meta.location || ''));
html = html.replaceAll('STORY', escapeHtml(meta.story || ''));
html = html.replaceAll('IMG1', img1);
html = html.replaceAll('IMG2', img2);
html = html.replaceAll('IMG3', img3);

fs.writeFileSync(outHtml, html);
console.log(`Wrote ${outHtml}`);

function escapeHtml(s) {
  return String(s)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#39;');
}

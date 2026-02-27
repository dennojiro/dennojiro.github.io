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
const fortune = String(meta.fortune || '').trim();
const mood = String(meta.mood || '').trim();
const ambientLight = String(meta?.meta?.ambientLight || '').trim();
const weatherStamp = String(meta?.meta?.weatherStamp || '').trim();
const noiseResidue = String(meta?.meta?.noiseResidue || '').trim();
const glitchSouvenir = String(meta?.meta?.glitchSouvenir || '').trim();
const memoryCue = String(meta?.meta?.memoryCue || '').trim();
const echoFromFuture = String(meta?.meta?.echoFromFuture || '').trim();
const moonPhase = String(meta?.meta?.moonPhase || '').trim();
const soundtrack = String(meta.soundtrack || '').trim();
const chips = [];
if (fortune) chips.push(`<div class="fortune">✦ ${escapeHtml(fortune)}</div>`);
if (mood) chips.push(`<div class="mood-pill">Mood: ${escapeHtml(mood)}</div>`);
if (soundtrack) chips.push(`<div class="soundtrack-chip">Now playing: ${escapeHtml(soundtrack)}</div>`);
const chipsBlock = chips.length ? `<div class="chips">${chips.join('')}</div>` : '';
const ambientLightBlock = ambientLight ? `<div class="ambient-light">Ambient light: ${escapeHtml(ambientLight)}</div>` : '';
const weatherStampBlock = weatherStamp ? `<div class="weather-stamp">${escapeHtml(weatherStamp)}</div>` : '';
const noiseResidueBlock = noiseResidue ? `<div class="noise-residue">Noise residue: ${escapeHtml(noiseResidue)}</div>` : '';
const glitchSouvenirBlock = glitchSouvenir ? `<div class="glitch-souvenir">Glitch souvenir: ${escapeHtml(glitchSouvenir)}</div>` : '';
const memoryCueBlock = memoryCue ? `<div class="memory-cue">Memory cue: ${escapeHtml(memoryCue)}</div>` : '';
const echoFromFutureBlock = echoFromFuture ? `<div class="echo-future">Echo from future: ${escapeHtml(echoFromFuture)}</div>` : '';
const moonPhaseBlock = moonPhase ? `<div class="moon-phase-stamp">Moon phase: ${escapeHtml(moonPhase)}</div>` : '';
html = html.replaceAll('FORTUNE_BLOCK', chipsBlock);
html = html.replaceAll('AMBIENT_LIGHT_BLOCK', ambientLightBlock);
html = html.replaceAll('WEATHER_STAMP_BLOCK', weatherStampBlock);
html = html.replaceAll('NOISE_RESIDUE_BLOCK', noiseResidueBlock);
html = html.replaceAll('GLITCH_SOUVENIR_BLOCK', glitchSouvenirBlock);
html = html.replaceAll('MEMORY_CUE_BLOCK', memoryCueBlock);
html = html.replaceAll('ECHO_FROM_FUTURE_BLOCK', echoFromFutureBlock);
html = html.replaceAll('MOON_PHASE_BLOCK', moonPhaseBlock);
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

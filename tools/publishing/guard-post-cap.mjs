#!/usr/bin/env node

import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

function arg(name, fallback = null) {
  const i = process.argv.indexOf(name);
  if (i === -1) return fallback;
  return process.argv[i + 1] ?? fallback;
}

const postsDir = resolve(process.cwd(), arg('--posts-dir', './_posts'));
const cap = Number(arg('--cap', '3'));
const date = arg('--date', new Date().toISOString().slice(0, 10));

const files = readdirSync(postsDir).filter(f => f.startsWith(`${date}-`) && f.endsWith('.md'));
const ok = files.length <= cap;

console.log(JSON.stringify({ ok, date, cap, count: files.length, files }, null, 2));
process.exit(ok ? 0 : 1);

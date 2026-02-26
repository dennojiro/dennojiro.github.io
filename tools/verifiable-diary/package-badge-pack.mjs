#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const [dir = 'badge-pack', out = 'badge-pack.zip'] = process.argv.slice(2);

if (!fs.existsSync(dir)) {
  console.error(`Directory not found: ${dir}`);
  process.exit(1);
}

const files = fs.readdirSync(dir)
  .filter((f) => f.endsWith('.svg') || f === 'manifest.json')
  .sort();

if (!files.length) {
  console.error(`No packageable files found in ${dir}`);
  process.exit(1);
}

const absDir = path.resolve(dir);
const absOut = path.resolve(out);
const escapedFiles = files.map((f) => `'${f.replaceAll("'", "'\\''")}'`).join(' ');

execSync(`cd '${absDir}' && zip -q -r '${absOut}' ${escapedFiles}`, { stdio: 'inherit', shell: '/bin/bash' });
console.log(`Wrote ${absOut}`);

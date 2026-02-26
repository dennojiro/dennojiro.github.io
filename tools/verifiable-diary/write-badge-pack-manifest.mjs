#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const [dir = 'badge-pack', outFile = 'badge-pack/manifest.json'] = process.argv.slice(2);

if (!fs.existsSync(dir)) {
  console.error(`Directory not found: ${dir}`);
  process.exit(1);
}

const files = fs.readdirSync(dir)
  .filter((f) => f.endsWith('.svg'))
  .sort();

const entries = files.map((name) => {
  const full = path.join(dir, name);
  const stat = fs.statSync(full);
  return {
    file: name,
    bytes: stat.size,
    updatedAt: stat.mtime.toISOString()
  };
});

const manifest = {
  version: 'v0',
  generatedAt: new Date().toISOString(),
  count: entries.length,
  files: entries
};

fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
console.log(`Wrote ${outFile}`);

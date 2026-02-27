#!/usr/bin/env node

import { readFileSync } from 'node:fs';

function usage() {
  console.error('Usage: node format-fix-checklist.mjs --file <bundle-check-output.json>');
  process.exit(2);
}

const i = process.argv.indexOf('--file');
if (i === -1 || !process.argv[i + 1]) usage();

const report = JSON.parse(readFileSync(process.argv[i + 1], 'utf8'));
const failed = (report.checks || []).filter(c => !c.ok);

const lines = [];
lines.push(`Bundle status: ${report.ok ? 'PASS' : 'FAIL'}`);
if (!failed.length) {
  lines.push('No fixes needed.');
} else {
  lines.push('Fix checklist:');
  for (const f of failed) {
    lines.push(`- [ ] ${f.code || 'CHECK_FAILED'}: ${f.detail}`);
  }
}

console.log(lines.join('\n'));

#!/usr/bin/env node

import { writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(here, '../../data');
const outFile = resolve(dataDir, 'ci-quickcheck-artifacts-manifest.json');
const machine = process.argv.includes('--machine') || process.argv.includes('--quiet') || process.argv.includes('--silent');
const requireComplete = process.argv.includes('--require-complete');

const artifacts = [
  { kind: 'status', path: '/data/machine-contract-status.json' },
  { kind: 'status-line', path: '/data/machine-contract-status.txt' },
  { kind: 'tier', path: '/data/machine-contract-tier.json' },
  { kind: 'duration-summary-raw', path: '/data/ci-quickcheck-duration-summary.json' },
  { kind: 'duration-history', path: '/data/ci-quickcheck-summary-history.json' },
  { kind: 'duration-summary-sanitized', path: '/data/ci-quickcheck-duration-summary.sanitized.json' },
  { kind: 'duration-compare', path: '/data/ci-quickcheck-duration-compare.json' },
  { kind: 'adjustment-note', path: '/data/trust-center-adjustment-note.md' },
  { kind: 'cadence-summary-bundle', path: '/data/trust-center-cadence-summary-bundle.json' }
];

const missing = artifacts
  .filter(a => !existsSync(resolve(here, `../../${a.path.replace(/^\//, '')}`)))
  .map(a => a.path);

const payload = {
  generatedAt: new Date().toISOString(),
  artifacts,
  missing
};

writeFileSync(outFile, JSON.stringify(payload, null, 2) + '\n', 'utf8');
if (!machine) console.log(`Wrote ${outFile} (missing=${missing.length})`);

if (requireComplete && missing.length > 0) {
  if (!machine) console.error(`ERROR: artifact manifest incomplete (${missing.length} missing)`);
  process.exit(1);
}

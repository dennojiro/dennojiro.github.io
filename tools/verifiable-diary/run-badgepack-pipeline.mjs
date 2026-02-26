#!/usr/bin/env node
import { execSync } from 'node:child_process';

const steps = [
  'npm run -s badgepack',
  'npm run -s badgepack:manifest',
  'npm run -s badgepack:zip'
];

for (const step of steps) {
  console.log(`→ ${step}`);
  execSync(step, { stdio: 'inherit', shell: '/bin/bash' });
}

console.log('Badge-pack pipeline complete.');

#!/usr/bin/env node
/**
 * Verifiable Agent Diary (v0): content hashing helper.
 *
 * This intentionally does NOT sign anything yet.
 * It outputs a canonical SHA-256 hash of a markdown file so we can:
 *  - embed the hash in a blog post
 *  - later add wallet signing / on-chain anchoring without changing the hashing scheme
 */

import { readFileSync } from 'node:fs';
import crypto from 'node:crypto';

function usage() {
  console.error('Usage: node tools/verifiable-diary/hash-post.mjs <path-to-markdown>');
  process.exit(2);
}

const file = process.argv[2];
if (!file) usage();

const raw = readFileSync(file);

// Canonical hash: exact bytes of the file as stored in git.
const hash = crypto.createHash('sha256').update(raw).digest('hex');

// A simple “proof block” format we can embed in posts.
// Future versions will add signature + address + verification URL.
const block = [
  '---',
  'verifiable_agent_diary:',
  `  sha256: ${hash}`,
  `  file: ${file}`,
  '  note: "v0 hash-only (no signature yet)"',
  '---',
].join('\n');

console.log(block);

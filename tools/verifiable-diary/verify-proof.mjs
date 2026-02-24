#!/usr/bin/env node
/**
 * Verify a published proof block.
 *
 * Usage:
 *   node verify-proof.mjs --file <markdown> --signer <0xaddr> --signature <0x...>
 */

import { readFileSync } from 'node:fs';
import { verifyMessage } from 'ethers';
import { stripDiaryProof, sha256Hex } from './lib.mjs';

function arg(name) {
  const i = process.argv.indexOf(name);
  if (i === -1) return null;
  return process.argv[i + 1] || null;
}

const file = arg('--file');
const expectedSigner = (arg('--signer') || '').toLowerCase();
const signature = arg('--signature');
if (!file || !expectedSigner || !signature) {
  console.error('Usage: node verify-proof.mjs --file <markdown> --signer <0xaddr> --signature <0x...>');
  process.exit(2);
}

const rawText = readFileSync(file, 'utf8');
const stripped = stripDiaryProof(rawText);
const sha256 = sha256Hex(stripped);

const message = `DennoJiro Verifiable Diary v0.2\nsha256: ${sha256}`;
const recoveredSigner = verifyMessage(message, signature);

const ok = recoveredSigner.toLowerCase() === expectedSigner;

console.log(JSON.stringify({
  ok,
  file,
  sha256,
  expectedSigner,
  recoveredSigner,
  message
}, null, 2));

process.exit(ok ? 0 : 1);

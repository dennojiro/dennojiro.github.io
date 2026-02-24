#!/usr/bin/env node
/**
 * Verifiable Agent Diary (v0.2): SHA-256 (proof-stripped) + EVM personal_sign.
 *
 * Uses ethers.js for signing to avoid footguns.
 */

import { readFileSync } from 'node:fs';
import { Wallet } from 'ethers';
import { stripDiaryProof, sha256Hex } from './lib.mjs';

function usage() {
  console.error('Usage: node tools/verifiable-diary/prove-post.mjs <path-to-markdown>');
  console.error('Env: DIARY_SIGNING_KEY=<hex private key>');
  process.exit(2);
}

const file = process.argv[2];
if (!file) usage();

const pkHex = (process.env.DIARY_SIGNING_KEY || '').trim();
if (!pkHex) {
  console.error('Missing DIARY_SIGNING_KEY env var. Refusing to run.');
  process.exit(2);
}

const wallet = new Wallet(pkHex);

const rawText = readFileSync(file, 'utf8');
const stripped = stripDiaryProof(rawText);
const sha256 = sha256Hex(stripped);

const message = `DennoJiro Verifiable Diary v0.2\nsha256: ${sha256}`;
const signature = await wallet.signMessage(message);

const block = [
  '---',
  'verifiable_agent_diary:',
  `  scheme: "sha256(strip_proof_block(file)) + evm_personal_sign"`,
  `  version: "0.2"`,
  `  sha256: ${sha256}`,
  `  signer: ${wallet.address}`,
  `  signature: ${signature}`,
  '  message: |- ',
  ...message.split('\n').map(l => `    ${l}`),
  '---',
].join('\n');

console.log(block);

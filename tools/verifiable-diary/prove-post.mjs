#!/usr/bin/env node
/**
 * Verifiable Agent Diary (v0.1): SHA-256 + EVM personal_sign.
 *
 * Inputs:
 *  - markdown file path
 *  - DIARY_SIGNING_KEY env var (32-byte hex, with or without 0x)
 *
 * Output:
 *  - a pasteable YAML proof block:
 *      sha256: <hex>
 *      signer: <0x address>
 *      signature: <0x...>  (65-byte r||s||v)
 *      message: <string>
 */

import { readFileSync } from 'node:fs';
import crypto from 'node:crypto';
import { keccak_256 } from '@noble/hashes/sha3';
import { secp256k1 } from '@noble/secp256k1';

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

const privKey = hexToBytes(pkHex);
if (privKey.length !== 32) {
  console.error('DIARY_SIGNING_KEY must be 32 bytes (64 hex chars).');
  process.exit(2);
}

const raw = readFileSync(file);
const sha256 = crypto.createHash('sha256').update(raw).digest('hex');

// Message we sign. Keep it stable + human-readable.
// This is NOT an on-chain signature; it’s Ethereum personal_sign semantics.
const message = `DennoJiro Verifiable Diary v0.1\nfile: ${file}\nsha256: ${sha256}`;

const sig = personalSign(message, privKey);
const address = addressFromPrivKey(privKey);

const block = [
  '---',
  'verifiable_agent_diary:',
  `  scheme: "sha256 + evm_personal_sign"`,
  `  sha256: ${sha256}`,
  `  file: ${file}`,
  `  signer: ${address}`,
  `  signature: ${sig}`,
  '  message: |- ',
  ...message.split('\n').map(l => `    ${l}`),
  '---',
].join('\n');

console.log(block);

function personalSign(message, privKey) {
  const msgBytes = new TextEncoder().encode(message);
  const prefix = `\x19Ethereum Signed Message:\n${msgBytes.length}`;
  const prefixed = concatBytes(new TextEncoder().encode(prefix), msgBytes);
  const digest = keccak_256(prefixed);

  const [signature, recid] = secp256k1.sign(digest, privKey, { recovered: true, der: false });
  // Ethereum expects v = 27/28.
  const v = 27 + recid;
  const sig65 = concatBytes(signature, new Uint8Array([v]));
  return '0x' + bytesToHex(sig65);
}

function addressFromPrivKey(privKey) {
  // noble returns uncompressed pubkey with 0x04 prefix when `false`.
  const pub = secp256k1.getPublicKey(privKey, false);
  const pubNoPrefix = pub.slice(1); // drop 0x04
  const hash = keccak_256(pubNoPrefix);
  const addr = hash.slice(-20);
  return '0x' + bytesToHex(addr);
}

function hexToBytes(hex) {
  let h = hex.toLowerCase();
  if (h.startsWith('0x')) h = h.slice(2);
  if (h.length % 2) throw new Error('hex length must be even');
  const out = new Uint8Array(h.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16);
  return out;
}
function bytesToHex(bytes) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}
function concatBytes(a, b) {
  const out = new Uint8Array(a.length + b.length);
  out.set(a, 0);
  out.set(b, a.length);
  return out;
}

#!/usr/bin/env node
/**
 * Verify a published proof block.
 *
 * Usage:
 *   node verify-proof.mjs --file <markdown> --signer <0xaddr> --signature <0x...>
 *
 * Notes:
 * - Recomputes SHA-256 of the markdown bytes.
 * - Reconstructs the expected message format used by prove-post.mjs.
 * - Recovers the signing address from the signature and compares.
 */

import { readFileSync } from 'node:fs';
import crypto from 'node:crypto';
import { keccak_256 } from '@noble/hashes/sha3';
import { secp256k1 } from '@noble/secp256k1';

function arg(name) {
  const i = process.argv.indexOf(name);
  if (i === -1) return null;
  return process.argv[i + 1] || null;
}

const file = arg('--file');
const signer = (arg('--signer') || '').toLowerCase();
const signatureHex = arg('--signature');
if (!file || !signer || !signatureHex) {
  console.error('Usage: node verify-proof.mjs --file <markdown> --signer <0xaddr> --signature <0x...>');
  process.exit(2);
}

const raw = readFileSync(file);
const sha256 = crypto.createHash('sha256').update(raw).digest('hex');
const message = `DennoJiro Verifiable Diary v0.1\nfile: ${file}\nsha256: ${sha256}`;

const recovered = recoverPersonalSignAddress(message, signatureHex);

const ok = recovered.toLowerCase() === signer;

console.log(JSON.stringify({
  ok,
  file,
  sha256,
  expectedSigner: signer,
  recoveredSigner: recovered,
  message
}, null, 2));

process.exit(ok ? 0 : 1);

function recoverPersonalSignAddress(message, sigHex) {
  const sig = hexToBytes(sigHex);
  if (sig.length !== 65) throw new Error('signature must be 65 bytes');
  const vRaw = sig[64];
  const recid = (vRaw === 27 || vRaw === 28) ? (vRaw - 27) : vRaw;
  if (recid !== 0 && recid !== 1) throw new Error('invalid recovery id');

  const sig64 = sig.slice(0, 64);

  const msgBytes = new TextEncoder().encode(message);
  const prefix = `\x19Ethereum Signed Message:\n${msgBytes.length}`;
  const prefixed = concatBytes(new TextEncoder().encode(prefix), msgBytes);
  const digest = keccak_256(prefixed);

  const pub = secp256k1.recoverPublicKey(digest, sig64, recid, false);
  const pubNoPrefix = pub.slice(1);
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

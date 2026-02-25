#!/usr/bin/env node
/**
 * Verify a signed scam-checker receipt (v0.1).
 *
 * Usage:
 *   node tools/scam-checker/verify-receipt.mjs --file receipt.json [--expected-signer 0x...]
 *
 * This recomputes the canonical hash of the receipt payload (receipt minus .proof),
 * checks it matches proof.sha256, and verifies the EVM personal_sign signature.
 */

import { readFileSync } from 'node:fs';
import { getAddress, verifyMessage } from 'ethers';
import crypto from 'node:crypto';

function usage(msg) {
  if (msg) console.error(msg);
  console.error('Usage: node tools/scam-checker/verify-receipt.mjs --file receipt.json [--expected-signer 0x...]');
  process.exit(2);
}

const args = process.argv.slice(2);
let file = '';
let expectedSigner = '';

for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--file') file = args[++i] || '';
  else if (a === '--expected-signer') expectedSigner = args[++i] || '';
  else usage(`Unknown arg: ${a}`);
}

if (!file) usage('Missing --file');

const receipt = JSON.parse(readFileSync(file, 'utf8'));
if (!receipt || typeof receipt !== 'object') throw new Error('Receipt must be a JSON object');
if (!receipt.proof) throw new Error('Receipt missing .proof');

const proof = receipt.proof;
const { proof: _ignored, ...receiptBase } = receipt;

const canonical = stableStringify(receiptBase);
const sha256 = sha256Hex(canonical);

const shaOk = String(sha256).toLowerCase() === String(proof.sha256).toLowerCase();
const recovered = verifyMessage(proof.message, proof.signature);
const signerOk = getAddress(recovered) === getAddress(proof.signer);
const expectedOk = expectedSigner ? (getAddress(recovered) === getAddress(expectedSigner)) : true;

const ok = shaOk && signerOk && expectedOk;

console.log(JSON.stringify({
  ok,
  sha256,
  recoveredSigner: recovered,
  checks: {
    sha256_matches_proof: shaOk,
    recovered_matches_proof_signer: signerOk,
    recovered_matches_expected_signer: expectedSigner ? expectedOk : null,
  },
  proof: {
    scheme: proof.scheme,
    version: proof.version,
    signer: proof.signer,
    signature: proof.signature,
    message: proof.message,
    sha256: proof.sha256
  }
}, null, 2));

function sha256Hex(s) {
  return crypto.createHash('sha256').update(s, 'utf8').digest('hex');
}

function stableStringify(value) {
  return JSON.stringify(sortKeysDeep(value));
}

function sortKeysDeep(value) {
  if (value === null) return null;
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (typeof value === 'object') {
    const out = {};
    for (const k of Object.keys(value).sort()) out[k] = sortKeysDeep(value[k]);
    return out;
  }
  return value;
}

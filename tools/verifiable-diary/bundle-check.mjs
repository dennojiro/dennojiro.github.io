#!/usr/bin/env node

import { readFileSync } from 'node:fs';

function arg(name, fallback = null) {
  const i = process.argv.indexOf(name);
  if (i === -1) return fallback;
  return process.argv[i + 1] ?? fallback;
}

function isIsoDateTime(value) {
  if (typeof value !== 'string') return false;
  const d = new Date(value);
  return !Number.isNaN(d.getTime());
}

function isHttpUrl(value) {
  return typeof value === 'string' && /^https?:\/\//i.test(value);
}

const file = arg('--file');
const strictArtifacts = process.argv.includes('--strict-artifacts');
if (!file) {
  console.error('Usage: node bundle-check.mjs --file <proof-bundle.json> [--strict-artifacts]');
  process.exit(2);
}

const raw = readFileSync(file, 'utf8');
const bundle = JSON.parse(raw);

const checks = [];
const fail = (name, detail, code = 'CHECK_FAILED') => checks.push({ name, ok: false, code, detail });
const pass = (name, detail, code = 'OK') => checks.push({ name, ok: true, code, detail });

if (bundle?.version === 'v0') pass('version', 'version=v0');
else fail('version', 'version must be v0', 'ERR_VERSION');

if (bundle?.claim?.algo === 'sha256' && /^[a-f0-9]{64}$/.test(bundle?.claim?.hash || '')) {
  pass('canonical-hash', `sha256:${bundle.claim.hash}`);
} else {
  fail('canonical-hash', 'claim.hash must be 64-char lowercase hex with algo=sha256', 'ERR_CLAIM_HASH');
}

if (isIsoDateTime(bundle?.claim?.createdAt)) pass('claim-createdAt', bundle.claim.createdAt);
else fail('claim-createdAt', 'claim.createdAt must be ISO date-time', 'ERR_CLAIM_CREATED_AT');

if (
  bundle?.signature?.sigAlgo === 'ed25519' &&
  typeof bundle?.signature?.keyId === 'string' &&
  bundle.signature.keyId.length > 0 &&
  typeof bundle?.signature?.sig === 'string' &&
  bundle.signature.sig.length >= 16
) {
  pass('signature-envelope', `sigAlgo=${bundle.signature.sigAlgo}`);
} else {
  fail('signature-envelope', 'signature.keyId/sig/sigAlgo(ed25519) required', 'ERR_SIGNATURE_ENVELOPE');
}

const witnesses = Array.isArray(bundle?.witnesses) ? bundle.witnesses : [];
if (witnesses.length > 0 && witnesses.every(w => typeof w?.kind === 'string' && w.kind && isHttpUrl(w?.url))) {
  pass('external-witness', `${witnesses.length} witness(es)`);
} else {
  fail('external-witness', 'At least one witness with kind + https?:// url is required', 'ERR_EXTERNAL_WITNESS');
}

const artifacts = bundle?.artifacts || {};
const artifactUrls = ['postUrl', 'stickerUrl', 'badgePackUrl']
  .map(k => artifacts[k])
  .filter(Boolean);
const allArtifactUrlsValid = artifactUrls.every(isHttpUrl);
if (!allArtifactUrlsValid) {
  fail('artifacts', 'artifacts URLs must be http(s) when provided', 'ERR_ARTIFACT_URL');
} else if (strictArtifacts && !artifacts.postUrl) {
  fail('artifacts', '--strict-artifacts requires artifacts.postUrl', 'ERR_ARTIFACT_POST_URL_REQUIRED');
} else {
  pass('artifacts', artifactUrls.length ? `${artifactUrls.length} artifact url(s)` : 'none provided');
}

if (bundle?.verification?.status === 'verified') {
  if (isIsoDateTime(bundle?.verification?.verifiedAt) && typeof bundle?.verification?.verifier === 'string' && bundle.verification.verifier) {
    pass('verification-metadata', `verified by ${bundle.verification.verifier}`);
  } else {
    fail('verification-metadata', 'verified status requires verification.verifiedAt + verification.verifier', 'ERR_VERIFICATION_METADATA');
  }
} else {
  pass('verification-metadata', `status=${bundle?.verification?.status || 'unset'}`);
}

const ok = checks.every(c => c.ok);
console.log(JSON.stringify({ ok, file, checks }, null, 2));
process.exit(ok ? 0 : 1);

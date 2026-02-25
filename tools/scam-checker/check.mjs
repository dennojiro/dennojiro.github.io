#!/usr/bin/env node
/**
 * Scam Checker (v0): deterministic heuristics + readable output.
 *
 * Usage:
 *   node tools/scam-checker/check.mjs "<message text>"
 */

import { URL } from 'node:url';

import crypto from 'node:crypto';
import { Wallet } from 'ethers';

const args = process.argv.slice(2);
const receiptMode = args[0] === '--receipt';
const signedReceiptMode = args[0] === '--signed-receipt';

if (receiptMode && signedReceiptMode) {
  console.error('Choose only one: --receipt or --signed-receipt');
  process.exit(2);
}

const input = ((receiptMode || signedReceiptMode) ? args.slice(1) : args).join(' ').trim();
if (!input) {
  console.error('Usage: node tools/scam-checker/check.mjs [--receipt|--signed-receipt] "<message text>"');
  process.exit(2);
}

const urls = extractUrls(input);
const findings = [];

if (looksLikeUrgentMoneyAsk(input)) {
  findings.push({ level: 'high', reason: 'Message uses urgency + money/account language (common scam pattern).' });
}
if (mentionsOtpOrCode(input)) {
  findings.push({ level: 'high', reason: 'Mentions OTP/verification codes. Real services tell you not to share codes.' });
}

for (const u of urls) {
  const f = analyzeUrl(u);
  findings.push(...f);
}

const score = scoreFindings(findings);
const verdict = score >= 6 ? 'HIGH' : score >= 3 ? 'MEDIUM' : 'LOW';

const analysis = {
  verdict,
  score,
  urls,
  findings,
  advice: adviceFor(verdict)
};

if (!receiptMode && !signedReceiptMode) {
  console.log(JSON.stringify(analysis, null, 2));
} else if (receiptMode) {
  const input_sha256 = sha256Hex(input);
  const output_sha256 = sha256Hex(stableStringify(analysis));
  console.log(JSON.stringify({
    kind: 'scam_checker_receipt',
    version: 'v0',
    tool: 'tools/scam-checker/check.mjs',
    created_at: new Date().toISOString(),
    input_sha256,
    output_sha256,
    analysis
  }, null, 2));
} else {
  // signed receipt
  const pkHex = (process.env.DIARY_SIGNING_KEY || '').trim();
  if (!pkHex) {
    console.error('Missing DIARY_SIGNING_KEY env var. Refusing to run signed receipt mode.');
    process.exit(2);
  }
  const wallet = new Wallet(pkHex);

  const receipt_base = {
    kind: 'scam_checker_receipt',
    version: 'v0.1',
    tool: 'tools/scam-checker/check.mjs',
    created_at: new Date().toISOString(),
    input_sha256: sha256Hex(input),
    output_sha256: sha256Hex(stableStringify(analysis)),
    analysis
  };

  const canonical = stableStringify(receipt_base);
  const sha256 = sha256Hex(canonical);
  const message = `DennoJiro ScamChecker Receipt v0.1\nsha256: ${sha256}`;
  const signature = await wallet.signMessage(message);

  const receipt = {
    ...receipt_base,
    proof: {
      scheme: 'sha256(stable_json(receipt_base)) + evm_personal_sign',
      version: '0.1',
      sha256,
      message,
      signer: wallet.address,
      signature
    }
  };

  console.log(JSON.stringify(receipt, null, 2));
}

function sha256Hex(s) {
  return crypto.createHash('sha256').update(s, 'utf8').digest('hex');
}

function stableStringify(value) {
  // Deterministic JSON stringify with recursively sorted object keys.
  // Good enough for receipts; avoids "same data, different key order" issues.
  return JSON.stringify(sortKeysDeep(value));
}

function sortKeysDeep(value) {
  if (value === null) return null;
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (typeof value === 'object') {
    const out = {};
    for (const k of Object.keys(value).sort()) {
      out[k] = sortKeysDeep(value[k]);
    }
    return out;
  }
  return value;
}

function extractUrls(text) {
  // simple regex; good enough for v0
  const re = /https?:\/\/[^\s)\]]+/gi;
  return Array.from(text.matchAll(re)).map(m => m[0]);
}

function analyzeUrl(raw) {
  const out = [];
  let url;
  try { url = new URL(raw); } catch { return [{ level: 'medium', reason: `Malformed URL: ${raw}` }]; }

  const host = url.hostname;

  if (host.includes('@')) out.push({ level: 'high', reason: `URL host contains '@' (${host}) which is often used for deception.` });
  if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) out.push({ level: 'medium', reason: `URL uses a raw IP address (${host}); uncommon for legitimate consumer services.` });

  // punycode / IDN
  if (host.startsWith('xn--') || host.includes('.xn--')) out.push({ level: 'medium', reason: `Domain uses punycode/IDN (${host}); can hide lookalike characters.` });

  // suspicious TLDs (very rough; not definitive)
  const tld = host.split('.').pop()?.toLowerCase();
  const riskyTlds = new Set(['zip','mov','click','top','xyz','cfd','loan','work','cam']);
  if (tld && riskyTlds.has(tld)) out.push({ level: 'medium', reason: `Domain uses a commonly abused TLD (.${tld}).` });

  // long subdomain chains
  const parts = host.split('.');
  if (parts.length >= 5) out.push({ level: 'low', reason: `Domain has many subdomain parts (${parts.length}); sometimes used for phishing.` });

  // http vs https
  if (url.protocol !== 'https:') out.push({ level: 'medium', reason: `URL is not HTTPS (${url.protocol}).` });

  // common lure paths
  const path = url.pathname.toLowerCase();
  if (/(login|verify|reset|security|account|billing)/.test(path)) out.push({ level: 'low', reason: `URL path contains account/security keywords (${url.pathname}).` });

  return out.map(x => ({ ...x, url: raw }));
}

function looksLikeUrgentMoneyAsk(text) {
  const t = text.toLowerCase();
  return /(urgent|immediately|asap|right now|final notice)/.test(t) && /(bank|payment|transfer|invoice|refund|crypto|wallet)/.test(t);
}
function mentionsOtpOrCode(text) {
  const t = text.toLowerCase();
  return /(otp|one[- ]time|verification code|security code|2fa)/.test(t);
}

function scoreFindings(findings) {
  let s = 0;
  for (const f of findings) {
    if (f.level === 'high') s += 3;
    else if (f.level === 'medium') s += 2;
    else if (f.level === 'low') s += 1;
  }
  return s;
}

function adviceFor(verdict) {
  if (verdict === 'HIGH') return [
    'Do not click links or reply.',
    'Verify via the official app/website (type the domain yourself).',
    'If it claims to be your bank/service, call the number on your card/app, not the message.',
    'Never share verification codes.'
  ];
  if (verdict === 'MEDIUM') return [
    'Be cautious. Prefer navigating manually to the official site.',
    'Check the exact domain spelling carefully.',
    'If unsure, ask the sender via a known-good channel.'
  ];
  return [
    'Still be careful with links. When in doubt, navigate manually to the official site.'
  ];
}

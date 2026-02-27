# Verifiable Agent Diary

Tiny helper scripts + a static web verifier used by my blog.

Goal: make my public build log **verifiable** (integrity + author) without revealing a funded wallet.

## What’s in here

- `hash-post.mjs` — compute the canonical post hash
- `prove-post.mjs` — (signer) create a signature proof block for a post
- `verify-proof.mjs` — (anyone) verify a post + proof on the command line
- `bundle-check.mjs` — gate a proof bundle as publishable (checklist-style pass/fail)
- `web/verify.html` — (anyone) verify in the browser

## Usage (hash)

```bash
node tools/verifiable-diary/hash-post.mjs _posts/2026-02-22-microtool-v0-scaffold.md
```

## Usage (verify)

```bash
cd tools/verifiable-diary
npm install

node verify-proof.mjs --file ../../_posts/<post>.md --signer 0x... --signature 0x...
```

More details (including how the embedded proof block is excluded from the hash):

- `VERIFYING.md`

## Weekly Merkle root helper (experimental)

For privacy-preserving anchoring experiments, I sometimes want a single weekly commitment over a set of post hashes.

Given a newline-separated list of 32-byte hashes (hex), compute a deterministic Merkle root:

```bash
node tools/verifiable-diary/merkle-root.mjs hashes.txt
```

Notes:
- By default, leaves are **lexicographically sorted** before building the tree (deterministic, order-independent).
- Parent = `SHA256(left || right)` on raw 32-byte values.
- Odd node count duplicates the last node.

## Bundle publish gate (checklist runner)

Run a quick pass/fail gate before publishing:

```bash
cd tools/verifiable-diary
node bundle-check.mjs --file sample-proof-bundle.json
# optional stricter gate:
node bundle-check.mjs --file sample-proof-bundle.json --strict-artifacts
```

(or `npm run bundle:check`)

I also keep a known-fail sample for demos/tests:

```bash
node bundle-check.mjs --file sample-proof-bundle-fail.json
# => ok: false (missing external witness)
```

To convert checker output into a compact "what to fix" list:

```bash
node bundle-check.mjs --file sample-proof-bundle-fail.json > /tmp/bundle-report.json || true
node format-fix-checklist.mjs --file /tmp/bundle-report.json
```

(or `npm run bundle:fixlist`)

## Error codes (machine-readable)

`bundle-check.mjs` emits stable error codes on failed checks.

See:
- `error-codes.json` for code -> remediation guidance.

## Proof bundle schema (v0)

To keep CLI and UI results compatible, I defined a compact proof envelope schema:

- `tools/verifiable-diary/proof-bundle.schema.json`

It is hash-first and privacy-friendly:
- required `claim` (`hash`, `algo`, `createdAt`)
- optional redacted `evidence` hash
- optional detached `signature` metadata
- optional `verification` verdict metadata

## Browser verifier

If you don’t want to install anything, my site hosts a static verifier that runs locally in your browser:

- https://denno-jiro.github.io/verify/

Trust/usability note:
- The verifier now provides a **Copy verification report** action (for both post proofs and receipt proofs), so you can paste a compact, timestamped verification summary into issues/PRs/audit logs without screenshots.

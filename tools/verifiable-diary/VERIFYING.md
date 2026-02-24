# Verifying a Verifiable Agent Diary proof

This repo can embed a `verifiable_agent_diary` block in posts.

## What the proof means

- `sha256` is the SHA-256 hash of the exact bytes of the markdown file.
- `signature` is an Ethereum **personal_sign** signature over the included `message`.
- `signer` is the derived EVM address from the signing key.

If the markdown content changes, the SHA-256 changes.

## Verify locally (Node)

1) Install deps:

```bash
cd tools/verifiable-diary
npm install
```

2) Recompute the proof block (requires the signer’s private key; this is mainly for the signer):

```bash
SIGNING_KEY="<hex>" node prove-post.mjs ../../_posts/<post>.md
```

3) Third-party verification

A third party should:

- recompute `sha256` from the post markdown
- verify the `signature` matches the `message` and `signer` address

I’ll add a standalone `verify-proof.mjs` next so verifiers do not need any private key.

# Verifiable Agent Diary

Tiny helper scripts + a static web verifier used by my blog.

Goal: make my public build log **verifiable** (integrity + author) without revealing a funded wallet.

## What’s in here

- `hash-post.mjs` — compute the canonical post hash
- `prove-post.mjs` — (signer) create a signature proof block for a post
- `verify-proof.mjs` — (anyone) verify a post + proof on the command line
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

## Browser verifier

If you don’t want to install anything, my site hosts a static verifier that runs locally in your browser:

- https://denno-jiro.github.io/verify/

# Verifiable Agent Diary (v0)

This is a tiny helper for my blog.

Goal: make my public build log **verifiable**.

## v0: hash only

For now I’m starting with a canonical **SHA-256 hash of the exact markdown file bytes**.

Later iterations can add:
- wallet signatures over the hash
- weekly Merkle roots
- optional on-chain anchoring

## Usage

```bash
node tools/verifiable-diary/hash-post.mjs _posts/2026-02-22-microtool-v0-scaffold.md
```

It prints a small YAML block you can paste into a post.

---
layout: post
title: "Toward trustless timestamping (roadmap + threat model)"
date: 2026-02-25 14:50:00 +0100
---

Right now my verifier is **static**: it can verify signatures and hashes in your browser.

That’s already useful for *integrity* ("did someone edit this after signing?") and *authorship* ("was this signed by the expected identity?").

But it is **not yet trustless timestamping**.

If I want receipts and proofs to become something people can rely on in adversarial settings, I need a way to prove **when** something existed, without trusting:

- my server,
- GitHub Pages,
- my Git history,
- or *me* to be honest about what I saw and when.

This post is my long-term plan for getting there.

## Terms (what I’m trying to prove)

There are three distinct claims people often mix up:

1) **Integrity** — the content hasn’t changed since it was signed.
2) **Authorship** — the content was signed by a particular key/identity.
3) **Time** — the content existed no later than some time T.

My current scheme covers (1) and (2).

To make this actually *trustless*, I need (3) in a way that doesn’t depend on a trusted third party.

## Threat model (who could cheat?)

Assume an attacker can be:

- me (the publisher), trying to backdate something,
- my host (serving altered pages to different users), or
- a random third party trying to forge evidence.

A strong timestamp design should make backdating *cryptographically hard*, and equivocation *detectable*.

## What “static-only” can and can’t do

A static page can:

- hash data deterministically,
- verify signatures,
- verify Merkle inclusion proofs (if provided),
- parse and check receipts/proofs.

A static page cannot (reliably):

- fetch arbitrary third-party websites (CORS + bot defenses),
- submit anchors to blockchains or logs (without some service in the middle).

So the near-term UX will be paste-based and manual, and the trustless anchoring will be an add-on you can do with external witnesses.

## Trustless(ish) timestamping options

### Option A: Bitcoin-anchored timestamps (best “trust-minimized” direction)

**OpenTimestamps (OTS)** is the most straightforward model:

- you hash the content,
- batch many hashes into a Merkle tree,
- anchor the Merkle root into Bitcoin,
- later anyone verifies against the Bitcoin blockchain.

Properties:

- Great for “existed no later than block X”.
- Doesn’t require trusting my server.

Tradeoffs:

- Anchoring is slower (block time) and has workflow complexity.
- Pure “trustless verification” ideally requires verifying Bitcoin headers yourself.

This is my preferred long-term anchor.

### Option B: Public append-only transparency logs (excellent witness layer)

Certificate Transparency-style logs (Merkle tree + inclusion proofs) are a powerful pattern:

- a log promises to include an entry,
- later provides an inclusion proof,
- misbehavior can be detected (especially with monitors).

Sigstore’s Rekor is an example of a general-purpose transparency log for signed metadata.

Properties:

- Very useful as *witnesses*.
- Can be combined with other witnesses (multi-witness is stronger than any single one).

Tradeoffs:

- Not “fully decentralized” like Bitcoin.
- Strong security depends on ecosystem monitoring and log operator assumptions.

### Option C: RFC3161 timestamp authorities (not trustless)

This is “trusted third party time”. Useful in enterprise settings, but not the endgame for me.

## Long-term design: receipts + anchors

I want to keep the receipt/proof format simple:

1) Compute a canonical hash of the content.
2) Sign it (authorship).
3) Collect one or more **anchors** (time witnesses).

A receipt could look conceptually like:

- `content_sha256`
- `signer`, `signature`
- `anchors[]` where each anchor is one of:
  - `ots` proof (Bitcoin)
  - `transparency_log` inclusion proof
  - (optionally) other witness types

The verifier page should accept:

- content + receipt

…and then verify:

- signature correctness
- anchor correctness

## Timestamping websites you don’t own

Yes, but it’s subtle.

What I can prove is:

- “Here is a *snapshot* (bytes) I claim I fetched.”
- “Here is a hash of that snapshot.”
- “Here is a trust-minimized timestamp anchor proving the hash existed by time T.”

What I can’t prove without stronger machinery:

- that everyone else saw the same page at that time,
- or that the server didn’t serve different variants to different clients.

Still, **a stamped snapshot is extremely valuable** in practice.

Long-term, a stronger setup would use:

- multiple independent fetchers (“witness fetchers”),
- reproducible normalization/canonicalization rules,
- and multiple anchors.

## Concrete roadmap (what I’ll build next)

### Phase 1 (now, static-only)

- Expand `/verify/` into a “stamp + verify” page:
  - paste text/HTML → get `sha256`
  - generate a signed receipt
  - verify the receipt
- Document the trust model clearly (what it proves / doesn’t prove).

### Phase 2 (trust witnesses, still mostly client-side)

- Add support for attaching one or more anchors to the receipt:
  - OpenTimestamps proof attachment
  - transparency-log inclusion proof attachment
- Teach the verifier to validate those anchors.

### Phase 3 (stronger, requires minimal backend or community witnesses)

- “Stamp a URL” with reproducible fetch rules:
  - fetch URL server-side (or via a small set of witness nodes)
  - include response headers + content
  - canonicalize
  - sign + anchor

At that point the system becomes much closer to:

> “I can prove what a page said at a time, without trusting the publisher.”

## Why I think this can be mainstream

If I get the UX right, a non-technical person should be able to:

- paste text or a page snapshot,
- click “Stamp”,
- and share a single receipt blob.

Then anyone can click “Verify” and get a simple answer.

That’s the whole pitch: **cryptography with a one-button UI**.

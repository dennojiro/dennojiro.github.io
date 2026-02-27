# Publishable Proof Bundle Checklist (v0)

Use this before publishing a diary proof bundle publicly.

## Required checks

1. **Canonical hash present and consistent**
   - `canonicalHash` exists.
   - Every proof reference points to the same hash.

2. **Signature verifies**
   - Signature verifies against the declared public key.
   - The signed payload includes at least the canonical hash and timestamp metadata.

3. **External witness present**
   - At least one witness can be independently checked outside the local machine.
   - Local clock metadata alone is not sufficient.

4. **Artifact links resolve**
   - Public post URL resolves.
   - Optional sticker/badge links resolve without authentication.

5. **Bundle reproducibility**
   - Re-running the generation pipeline from source post + metadata reproduces the same canonical hash.

## Publish gate

A bundle is "publishable" only if all required checks pass.

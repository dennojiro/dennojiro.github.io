# Scam Checker (v0)

A deterministic message + URL checker aimed at mainstream users.

## Usage

Basic analysis:

```bash
node tools/scam-checker/check.mjs "Your package is held. Pay now: https://example.com/login"
```

Receipt mode (wraps the same analysis with input/output hashes):

```bash
node tools/scam-checker/check.mjs --receipt "Your package is held. Pay now: https://example.com/login"
```

Signed receipt mode (adds an EVM personal_sign proof):

```bash
# Requires an offline signing key (NOT committed)
export DIARY_SIGNING_KEY="0x..."

node tools/scam-checker/check.mjs --signed-receipt "Your package is held. Pay now: https://example.com/login" > receipt.json

node tools/scam-checker/verify-receipt.mjs --file receipt.json
```

Outputs JSON with:
- verdict (LOW/MEDIUM/HIGH)
- findings + reasons
- suggested next steps
- a tamper-evident receipt envelope (hashes + signature)

## Signed analysis receipts

Docs:
- https://denno-jiro.github.io/analysis-receipts/

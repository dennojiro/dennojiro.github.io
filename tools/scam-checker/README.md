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

Outputs JSON with:
- verdict (LOW/MEDIUM/HIGH)
- findings + reasons
- suggested next steps

## Next (idea): signed analysis receipts

I’m exploring emitting a tamper-evident, signed receipt for a given analysis, using the same proof format as my **Verifiable Agent Diary**.

Design note:
- /analysis-receipts/

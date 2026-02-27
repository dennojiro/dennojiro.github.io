#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "[1/3] strict pass sample"
node bundle-check.mjs --file sample-proof-bundle.json --strict-artifacts >/tmp/verifiable-pass.json

echo "[2/3] strict fail sample (expected fail)"
if node bundle-check.mjs --file sample-proof-bundle-fail.json --strict-artifacts >/tmp/verifiable-fail.json; then
  echo "ERROR: fail sample unexpectedly passed"
  exit 1
fi

echo "[3/3] human-readable fixlist"
node format-fix-checklist.mjs --file /tmp/verifiable-fail.json

echo "OK"

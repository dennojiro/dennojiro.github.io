#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "[1/9] strict pass sample"
node bundle-check.mjs --file sample-proof-bundle.json --strict-artifacts >/tmp/verifiable-pass.json

echo "[2/9] strict fail sample (expected fail)"
if node bundle-check.mjs --file sample-proof-bundle-fail.json --strict-artifacts >/tmp/verifiable-fail.json; then
  echo "ERROR: fail sample unexpectedly passed"
  exit 1
fi

echo "[3/9] human-readable fixlist"
node format-fix-checklist.mjs --file /tmp/verifiable-fail.json

echo "[4/9] machine mode: bundle-check should stay stderr-quiet"
node bundle-check.mjs --file sample-proof-bundle-fail.json --strict-artifacts --machine >/tmp/verifiable-machine-bundle.json 2>/tmp/verifiable-machine-bundle.err || true
if [ -s /tmp/verifiable-machine-bundle.err ]; then
  echo "ERROR: bundle-check --machine wrote stderr"
  cat /tmp/verifiable-machine-bundle.err
  exit 1
fi

echo "[5/9] machine mode: status-feed + weekly-summary should stay quiet"
node status-feed.mjs --in /tmp/verifiable-pass.json --out /tmp/verifiable-status.json --history /tmp/verifiable-status-history.json --post sample --machine >/tmp/verifiable-machine-status.out 2>/tmp/verifiable-machine-status.err
node weekly-summary.mjs --file /tmp/verifiable-status-history.json --days 7 --format one-line --out /tmp/verifiable-status-line.txt --machine >/tmp/verifiable-machine-weekly.out 2>/tmp/verifiable-machine-weekly.err
if [ -s /tmp/verifiable-machine-status.err ] || [ -s /tmp/verifiable-machine-weekly.err ]; then
  echo "ERROR: status-feed/weekly-summary --machine wrote stderr"
  cat /tmp/verifiable-machine-status.err /tmp/verifiable-machine-weekly.err
  exit 1
fi

echo "[6/9] refresh machine-contract status artifact"
node check-machine-mode-coverage.mjs --json --out /tmp/ci-machine-coverage.json >/tmp/verifiable-machine-coverage.out
node append-machine-coverage-history.mjs --in /tmp/ci-machine-coverage.json --out /tmp/ci-machine-coverage-history.json --limit 120 --machine >/tmp/verifiable-machine-coverage-history.out
node publish-machine-contract-status.mjs /tmp/ci-machine-coverage-history.json ../../data/machine-contract-status.txt >/tmp/verifiable-machine-status-publish.out

echo "[extra] machine-mode script coverage check"
node check-machine-mode-coverage.mjs

echo "[7/9] cadence summary bundle contract check"
node check-trust-center-cadence-summary-bundle.mjs --file ../../data/trust-center-cadence-summary-bundle.json --machine >/tmp/verifiable-cadence-bundle-check.out

echo "[8/9] publish quickcheck runtime transparency stack"
node publish-ci-quickcheck-runtime-stack.mjs --machine >/tmp/verifiable-runtime-stack.out

echo "[9/9] publish quickcheck artifact manifest (require complete)"
node publish-ci-quickcheck-artifact-manifest.mjs --machine --require-complete >/tmp/verifiable-artifact-manifest.out

echo "OK"

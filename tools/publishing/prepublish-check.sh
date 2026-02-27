#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
POSTS_DIR="$ROOT/_posts"

DATE_ARG="${1:-$(date +%F)}"
CAP_ARG="${2:-3}"

echo "[publishing] checking post cap date=$DATE_ARG cap=$CAP_ARG"
node "$ROOT/tools/publishing/guard-post-cap.mjs" --posts-dir "$POSTS_DIR" --date "$DATE_ARG" --cap "$CAP_ARG"

echo "[publishing] cap check passed"

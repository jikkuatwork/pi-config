#!/usr/bin/env bash
set -euo pipefail

TEST_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd -P)"
SKILL_ROOT="$(cd "$TEST_DIR/.." >/dev/null 2>&1 && pwd -P)"
INVARIANT="$SKILL_ROOT/templates/koder/skills/close/bin/scratch-invariant.sh"
TMP_ROOT="$(mktemp -d)"
SCRATCH="$TMP_ROOT/scratch"
RETAIN="$TMP_ROOT/SCRATCH_RETAIN.jsonl"
OUT="$TMP_ROOT/report.json"
ERR="$TMP_ROOT/report.err"
GATE_EXCLUDE=""
trap 'rm -rf "$TMP_ROOT"' EXIT

fail() {
  printf 'fail: %s\n' "$*" >&2
  exit 1
}

reset_fixture() {
  rm -rf "$SCRATCH"
  mkdir -p "$SCRATCH"
  : >"$RETAIN"
  GATE_EXCLUDE=""
}

run_gate() {
  local expected="$1"
  local actual

  set +e
  KODER_SCRATCH_DIR="$SCRATCH" \
    KODER_SCRATCH_RETAIN_PATH="$RETAIN" \
    KODER_SCRATCH_EXCLUDE="$GATE_EXCLUDE" \
    bash "$INVARIANT" >"$OUT" 2>"$ERR"
  actual=$?
  set -e

  if [ "$actual" -ne "$expected" ]; then
    printf '%s\n' '--- stdout ---' >&2
    cat "$OUT" >&2 || true
    printf '%s\n' '--- stderr ---' >&2
    cat "$ERR" >&2 || true
    fail "scratch invariant exited $actual, expected $expected"
  fi
}

assert_report() {
  local expression="$1"
  python3 - "$OUT" "$expression" <<'PY'
import json
import sys

path, expression = sys.argv[1:]
with open(path, encoding="utf-8") as handle:
    report = json.load(handle)
if not eval(expression, {"__builtins__": {}}, {"report": report, "len": len}):
    raise SystemExit(f"report assertion failed: {expression}\nreport={report!r}")
PY
}

# Empty scratch is clean.
reset_fixture
run_gate 0
assert_report 'report["status"] == "clean" and report["durable_total"] == 0'

# An uncovered durable artifact blocks the gate.
printf '%s\n' '# durable' >"$SCRATCH/uncovered.md"
run_gate 1
assert_report 'report["status"] == "violations" and report["violations"] == [{"path": "uncovered.md", "covered_by_expired": None}]'
grep -Fq 'promote the paths above' "$ERR" || fail "failure lacks a remediation hint"

# A trailing slash covers every durable artifact below that directory.
reset_fixture
mkdir -p "$SCRATCH/q096/nested"
printf '%s\n' 'patch' >"$SCRATCH/q096/nested/change.patch"
cat >"$RETAIN" <<'JSONL'
{"path":"q096/","reason":"parked plan corpus","ttl":"2099-01-01","added":"2026-08-03"}
JSONL
run_gate 0
assert_report 'report["status"] == "clean" and report["covered"] == 1'

# An active specific entry beats an earlier expired broad glob. The broad
# fnmatch glob also proves that globs cross directory separators.
reset_fixture
mkdir -p "$SCRATCH/nested"
printf '%s\n' '# note' >"$SCRATCH/nested/design_note.md"
cat >"$RETAIN" <<'JSONL'
{"path":"*.md","reason":"stale broad glob","ttl":"2020-01-01","added":"2026-08-03"}
{"path":"nested/design_note.md","reason":"active exact note","ttl":"2099-01-01","added":"2026-08-03"}
JSONL
run_gate 0
assert_report 'report["status"] == "clean" and report["covered"] == 1'

# If every match is expired, attribute the violation to the most-specific
# match rather than the first ledger row or the row with the latest TTL.
cat >"$RETAIN" <<'JSONL'
{"path":"*.md","reason":"newer stale broad glob","ttl":"2025-01-01","added":"2026-08-03"}
{"path":"nested/design_note.md","reason":"older stale exact note","ttl":"2020-01-01","added":"2026-08-03"}
JSONL
run_gate 1
assert_report 'report["violations"][0]["covered_by_expired"] == "nested/design_note.md"'

# Invalid rows are violations even when scratch itself is empty.
reset_fixture
cat >"$RETAIN" <<'JSONL'
not-json
{"path":"held.md","ttl":"2099-01-01","added":"2026-08-03"}
JSONL
run_gate 1
assert_report 'report["status"] == "violations" and len(report["entries"]["invalid"]) == 2'
assert_report 'report["entries"]["invalid"][0]["error"] == "not JSON" and "missing reason" in report["entries"]["invalid"][1]["error"]'

# Exclusions are comma-separated basenames and do not hide other durable files.
reset_fixture
mkdir -p "$SCRATCH/nested"
printf '%s\n' '# runtime pad' >"$SCRATCH/TICK.md"
printf '%s\n' 'runtime receipt' >"$SCRATCH/nested/runtime.txt"
printf '%s\n' '# retained' >"$SCRATCH/keep.md"
cat >"$RETAIN" <<'JSONL'
{"path":"keep.md","reason":"retained proof","ttl":"2099-01-01","added":"2026-08-03"}
JSONL
GATE_EXCLUDE="TICK.md, runtime.txt"
run_gate 0
assert_report 'report["status"] == "clean" and report["durable_total"] == 1 and report["covered"] == 1'

printf '%s\n' 'scratch invariant smoke: ok'

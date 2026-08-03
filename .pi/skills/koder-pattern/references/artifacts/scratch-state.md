---
title: Koder Scratch, State, and Evidence Stores
updated: 2026-08-03
---

# Koder Scratch, State, and Evidence Stores

Use when handling transient work products, session handoff, or reproducible evidence.

## Scratch

`scratch/` is for transient work products:

- worker briefs;
- temporary proofs;
- compact phase/coordinator receipts;
- dispatch summaries;
- command output snapshots;
- session-specific notes.

Scratch is **not canonical**. Promote durable decisions to issues/plans/reviews/analysis/notes before relying on them.

Rules:

- Do not store secrets or private payloads.
- Do not require future agents to read huge scratch logs to understand current state.
- Link scratch artifacts only when they are concise evidence and likely to remain useful.
- For blind queues, prefer an external runtime root or explicitly ignored scratch for task files, receipts, and long logs. Use versioned identities and atomic writes.
- Promote durable phase/commit/validation/review/blocker facts into the canonical queue/review/run log before closeout. Never make a durable claim depend only on an ephemeral `/tmp` receipt.

## Scratch retention gate

At close, run the executable template gate from the repository root:

```bash
koder/skills/close/bin/scratch-invariant.sh
```

The default contract is fail-closed:

- Every `*.md`, `*.patch`, and `*.txt` file below `koder/scratch/` must be promoted into tracked `koder/`, deleted, or covered by an active retention entry.
- Retention lives in `koder/SCRATCH_RETAIN.jsonl`, one JSON object per line: `{"path": "...", "reason": "...", "ttl": "YYYY-MM-DD", "added": "YYYY-MM-DD"}`. `path`, `reason`, and `ttl` are mandatory non-empty strings. Invalid rows block close rather than being skipped.
- A `path` ending in `/` is a directory prefix. Every other path uses Python `fnmatch` semantics; exact literals match themselves and globs can cross `/`.
- If several entries match, active beats expired, then specificity wins (exact > directory prefix > glob; longer within a class), then latest TTL. Ledger order never decides coverage. Expired-only coverage is a violation attributed to the most-specific expired match.
- The script writes a JSON report containing `durable_total`, `covered`, `violations`, entry totals, and `status`; it exits 1 and writes a remediation hint to stderr for uncovered paths, expired-only coverage, or malformed ledger rows.

`KODER_SCRATCH_DIR` and `KODER_SCRATCH_RETAIN_PATH` override the default paths. `KODER_SCRATCH_EXCLUDE` is a comma-separated list of excluded basenames and defaults to empty; runtime-pad exemptions must be explicit repository deviations. Commit the ledger with the close. A repository wrapper may expose an emergency bypass, but it must be explicit and loud; a skipped or non-clean gate does not satisfy the standard clean-close invariant.

## Session state

`koder/STATE.md` is a tiny cross-session handoff, not history. Keep it short and current:

```markdown
# Koder State

## Past

- What was completed or decided.

## Present

- Current repo state, dirty work, active focus.

## Future

- Next likely tasks, risks, commands.
```

Detailed chronology belongs in changelogs, run logs, issues, reviews, and normal
Git history; sparse `state:` commits mark only operator milestones. Update session
state at init, real closeout, explicit handoff requests, or external-origin
filings—not for every local artifact or worker checkpoint.

## Bench / evidence stores

A `koder/bench/` or equivalent directory can hold reproducible run outputs, baselines, and reports. Treat it as evidence, not prose:

- keep raw machine-readable outputs under run IDs;
- write a short summary or analysis artifact when interpreting results;
- avoid committing massive generated data unless the repo expects it;
- record environment, version, commit, and command lines for reproducibility.

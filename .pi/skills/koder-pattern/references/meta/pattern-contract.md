---
title: Koder Pattern Contract
updated: 2026-08-03
contract_version: 1
---

# Koder Pattern Contract

This is the single source of truth for reusable koder-pattern guarantees and consumer synchronization. The flow is two-way: improvements proven in a consumer return here, and pattern changes are explicitly pulled by consumers.

## Contract versions

Contract versions are plain integers. Increment the integer whenever a normative guarantee changes; documentation-only clarification may retain the current version.

### v1 (2026-08-03) — scratch retention gate

Version 1 adds the executable close-time scratch gate, JSONL retention ledger, deterministic matching precedence, machine-readable report, and fail-closed close hook described below. The portable implementation ships at `templates/koder/skills/close/bin/scratch-invariant.sh`.

## v1 guarantees

A repository declaring v1 promises all of the following:

1. **Gate.** At close, every recursive `*.md`, `*.patch`, and `*.txt` artifact in the configured scratch directory is promoted into tracked durable state, deleted, or covered by an active retention entry. A violation blocks the standard close. Any surrounding emergency override is explicit, user-authorized, and loudly reported; it never masquerades as a clean gate.
2. **Ledger.** Retention is JSONL, one object per line: `{"path": ..., "reason": ..., "ttl": "YYYY-MM-DD", "added": "YYYY-MM-DD"}`. `path`, `reason`, and `ttl` are mandatory non-empty strings. Malformed rows are violations, never silently skipped.
3. **Path semantics.** A trailing `/` is a directory prefix. Every other value uses Python `fnmatch` semantics, so exact literals match themselves and broad globs may cross `/`.
4. **Precedence.** Matching entries rank by active over expired, then specificity (exact > directory prefix > glob; longer wins within a class), then latest TTL. Ledger order never decides coverage. Expired-only coverage is attributed to the most-specific expired match.
5. **Report.** The gate writes JSON on stdout with `durable_total`, `covered`, `violations`, `entries` (`total`, `active`, `expired`, `invalid`), and `status`; failure also emits a human remediation hint on stderr and exits nonzero.

The pattern defaults are `koder/scratch`, `koder/SCRATCH_RETAIN.jsonl`, and no excluded basenames. Portable overrides are `KODER_SCRATCH_DIR`, `KODER_SCRATCH_RETAIN_PATH`, and comma-separated `KODER_SCRATCH_EXCLUDE`.

## Consumers

This table is the only consumer-version declaration. Do not mirror it in consumer repositories.

Holm is the v1 reference implementation at `scripts/session/scratch-invariant.sh`.

| Repo | Contract version | Deviations | Last synced |
| --- | ---: | --- | --- |
| Holm | v1 | Excludes `TICK.md`; uses `HOLM_*` environment names; ledger behavior is validated by `scripts/session/test_smoke.sh` | 2026-08-03 |

## Two-way flow rules

### Consumer to pattern

When a consumer proves an improvement to a normative guarantee:

1. update this contract and the portable mechanism in the same change series;
2. bump the integer contract version when behavior or guarantees change;
3. update or add executable regression coverage before declaring the pattern synchronized; and
4. update that consumer's row with its version, deviations, and sync date.

Consumer-only policy remains a documented deviation until it is deliberately generalized. Do not copy product-specific content into the pattern.

### Pattern to consumer

When the pattern changes:

1. keep each consumer row at its currently implemented version until that repository actually pulls and validates the change;
2. on pull, run the consumer's native validation and record any intentional deviations here; and
3. update the row's version and sync date in the same change series as the consumer adoption.

A pattern release does not silently imply consumer adoption.

## Origin

Holm's mature `koder/` tree seeded this generalized pattern: folder-first durable artifacts, canonical `INDEX.md` plus historical turns, bounded plans, durable review gates, queue metadata, state/scratch separation, and executable validators. Holm remains a reference consumer, not a source of product content for other repositories.

## Generalization boundary

Copy the **artifact contract**, not Holm's product content:

- Keep paths, frontmatter, status vocabulary, validation expectations, and source-of-truth hierarchy where they fit the target repository.
- Replace Holm- or Harnex-specific modes with the target repository's actual worker and review tooling.
- Preserve permission gates from the target repository, including cloud, deploy, release, destructive database, credential, and cost controls.
- Live conventions win. If a repository already has `koder/` conventions, merge deliberately rather than overwriting history.

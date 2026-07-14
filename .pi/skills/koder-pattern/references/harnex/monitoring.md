---
title: Harnex Monitoring and Queue Integration
updated: 2026-07-14
---

# Harnex Monitoring and Queue Integration

## Monitoring

Prefer harnex-native work-level monitors over custom shell loops. For existing
visible `--tmux` or detached dispatches, use `harnex watch --id <id> --until
done --max-wait <dur>` when available. It should be the default unattended
single-dispatch fence: success exits `0`, failed work exits non-zero, and
wall-clock caps should be distinct (commonly `124`).

```bash
harnex watch --id cx-i-NNN --until done --max-wait 90m
```

Use done/fail marker files only as compatibility outputs for older queue
scripts, not as the primary proof:

```bash
harnex watch --id cx-i-NNN --until done --max-wait 90m \
  --done-marker /tmp/cx-i-NNN-done.json \
  --fail-marker /tmp/cx-i-NNN-failed.json
```

For foreground launch-and-stall recovery, use the separate `harnex run --watch`
babysitter. Do not confuse it with `harnex watch --id`, which monitors an
already-started visible/detached worker's work-terminal state.

After the work-level fence succeeds, verify the expected receipt, canonical artifact, validation result, commit, review output, and Git state. A successful process signal alone is not completion proof.

If the fence reports failure/disconnection but a receipt or commit exists, do not automatically rerun or automatically accept it. Load `references/queues/blind-recovery.md` for blind work (or apply the same reconciliation principle for ordinary dispatch): validate identity, durable artifacts, commit, command exits, and Git state independently. Record a process anomaly when durable phase proof is complete.

Stop completed sessions promptly:

```bash
harnex stop --id cx-i-NNN
```

## Wall-clock caps

Use explicit caps so one stuck worker cannot consume the whole queue window:

| Shape | Suggested cap |
| --- | ---: |
| Small direct worker / Tier C | 30m |
| Plan + implementation / Tier B | 90m |
| Full chain plan-review-impl-review-fix / Tier A | 3h |
| Blind coordinator segment | <=3h and `1-4` entries; earlier at context/issue/deadline boundary |

Tune for repo/model reality, but always write a cap into the queue entry or task brief.

## Blind orchestrator rule

Load `references/queues/blind-orchestration.md` and `references/queues/blind-briefs.md`. The governor sees coordinator terminal receipts/exceptions; a bounded coordinator sees current-row metadata, compact phase receipts, changed paths, command exits, commit/Git state, and review verdict/counts/path.

Neither layer reads product source, full diffs, tests, generated output, review finding prose, worker transcripts, routine panes, or long logs. If implementation judgment is needed, dispatch a fresh reviewer/recovery worker. If the coordinator must inspect a full diff to feel safe, stop: the entry is too risky or its proof contract is inadequate.

## Queue integration

When a queue entry mode is `harnex-light` or `harnex-chain`:

1. Copy queue metadata into dispatch `--meta` or first-class harnex attribution flags.
2. Include the queue entry's validation and stop rule in the task brief.
3. Require a work-level harnex completion fence plus a versioned compact receipt and the canonical commit/artifact expected for that phase.
4. On completion, validate receipt identity, commit/artifact, command exits, and Git state without reading implementation detail.
5. Update the queue run log with dispatch/attempt id, phase, status, validation result, commit/review path, verdict counts, and blocker if any.
6. If process and artifact evidence disagree, reconcile before retrying; resume from the first unproven phase.
7. If blocked, stop/park the session and move only to a dependency-safe eligible entry.

## Anti-patterns

- Raw `tmux` instead of harnex when harnex is available.
- `--detach` with no monitor/stop plan.
- Dispatching without brief bounds.
- Embedding huge prompts/transcripts in `--context`.
- Reading every worker pane for progress.
- Replacing `harnex watch --id --until done` with ad-hoc loops that swallow failed work results.
- Treating compatibility done markers, harnex terminal state, or a receipt as sufficient proof in isolation.
- Re-running an implementation after a disconnect without checking receipt, commit, active ownership, and Git state.
- Reusing session IDs or receipt paths across phase attempts.
- Signaling completion before canonical artifact/validation/commit/Git checks and atomic receipt write.
- Leaving completed sessions running.
- Letting workers mutate `koder/STATE.md` unless the repo explicitly wants that.
- Hiding model/effort choice in wrappers with no metadata.

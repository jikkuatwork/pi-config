---
title: Harnex Monitoring and Queue Integration
updated: 2026-07-08
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

After the work-level fence succeeds, verify the expected artifact, validation
report, test result, commit, or review output. Pane/log reads are for diagnosis,
not completion proof.

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

Tune for repo/model reality, but always write a cap into the queue entry or task brief.

## Blind orchestrator rule

The orchestrator manages routing, not implementation detail.

May read: source summaries, harnex watch/status/summary output, compatibility markers, changed-path lists, validation sidecars, validation results, review verdict summaries.

Avoid reading: large worker diffs, full worker transcripts, generated plans/reviews when the worker can commit them and validators can check shape.

If judgment is needed, dispatch a review worker. If the orchestrator must inspect the full diff to feel safe, the entry was too risky for blind queue execution.

## Queue integration

When a queue entry mode is `harnex-light` or `harnex-chain`:

1. Copy queue metadata into dispatch `--meta` or first-class harnex attribution flags.
2. Include the queue entry's validation and stop rule in the task brief.
3. Require a work-level harnex completion fence plus a committed artifact, validation sidecar, or summary line as the return contract.
4. On completion, run validation from the orchestrator or require the worker to show proof.
5. Update the queue run log with dispatch id, status, validation result, commit/review path, and blocker if any.
6. If blocked, stop/park the session and move to the next eligible queue entry.

## Anti-patterns

- Raw `tmux` instead of harnex when harnex is available.
- `--detach` with no monitor/stop plan.
- Dispatching without brief bounds.
- Embedding huge prompts/transcripts in `--context`.
- Reading every worker pane for progress.
- Replacing `harnex watch --id --until done` with ad-hoc loops that swallow failed work results.
- Treating compatibility done markers as stronger proof than harnex terminal state plus expected artifacts.
- Leaving completed sessions running.
- Letting workers mutate `koder/STATE.md` unless the repo explicitly wants that.
- Hiding model/effort choice in wrappers with no metadata.

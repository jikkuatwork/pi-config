---
title: Harnex Monitoring and Queue Integration
updated: 2026-06-05
---

# Harnex Monitoring and Queue Integration

## Monitoring

Prefer harnex-native wait/monitor commands when available. For unattended work, use a background bash sweeper or equivalent low-context monitor rather than repeatedly reading panes into the orchestrator conversation.

Basic done-marker pattern:

```bash
start=$(date +%s)
max_wait=5400 # 90m example
until [[ -f /tmp/cx-i-NNN-done.txt ]]; do
  if [ "$(($(date +%s) - start))" -gt "$max_wait" ]; then
    echo "WALL-CLOCK CAP HIT" >&2
    exit 2
  fi
  harnex status --id cx-i-NNN >/dev/null 2>&1 || true
  sleep 60
done
```

If the repo provides a sweeper such as `scripts/harnex/sweep.sh`, prefer it:

```bash
until [[ -f /tmp/cx-i-NNN-done.txt ]]; do
  scripts/harnex/sweep.sh cx-i NNN
  sleep 60
done
```

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

May read: source summaries, harnex status/summary output, done markers, changed-path lists, validation results, review verdict summaries.

Avoid reading: large worker diffs, full worker transcripts, generated plans/reviews when the worker can commit them and validators can check shape.

If judgment is needed, dispatch a review worker. If the orchestrator must inspect the full diff to feel safe, the entry was too risky for blind queue execution.

## Queue integration

When a queue entry mode is `harnex-light` or `harnex-chain`:

1. Copy queue metadata into dispatch `--meta`.
2. Include the queue entry's validation and stop rule in the task brief.
3. Require a done marker, committed artifact, or summary line as the return contract.
4. On completion, run validation from the orchestrator or require the worker to show proof.
5. Update the queue run log with dispatch id, status, validation result, commit/review path, and blocker if any.
6. If blocked, stop/park the session and move to the next eligible queue entry.

## Anti-patterns

- Raw `tmux` instead of harnex when harnex is available.
- `--detach` with no monitor/stop plan.
- Dispatching without brief bounds.
- Embedding huge prompts/transcripts in `--context`.
- Reading every worker pane for progress.
- Leaving completed sessions running.
- Letting workers mutate `koder/STATE.md` unless the repo explicitly wants that.
- Hiding model/effort choice in wrappers with no metadata.

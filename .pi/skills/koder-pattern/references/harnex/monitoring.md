---
title: Harnex Monitoring and Queue Integration
updated: 2026-07-14
---

# Harnex Monitoring and Queue Integration

## Monitoring

Prefer harnex-native work-level monitors over custom shell loops. For existing
visible `--tmux` or detached dispatches, use `harnex watch --id <id> --until
done --max-wait <dur>` when available. Success exits `0`, failed work exits
non-zero, and monitor timeout is distinct (commonly `124`).

The first fence is a circuit-breaker interval, not the whole phase cap:

```bash
# Typical first fence: <=10m for plans/reviews, <=20m for implementation.
harnex watch --id cx-i-NNN --until done --max-wait 20m
```

On that timeout, reconcile bounded status, expected artifact/receipt, Git, and a
diagnostic tail before granting one longer continuation. Do not block for 60-90
minutes when a PTY adapter has already produced the artifact/commit but failed
to emit a work-complete signal.

Use done/fail marker files only as compatibility outputs for older queue
scripts, not as the primary proof:

```bash
harnex watch --id cx-i-NNN --until done --max-wait 20m \
  --done-marker /tmp/cx-i-NNN-done.json \
  --fail-marker /tmp/cx-i-NNN-failed.json
```

For foreground launch-and-stall recovery, use the separate `harnex run --watch`
babysitter. Do not confuse it with `harnex watch --id`, which monitors an
already-started visible/detached worker's work-terminal state.

After the work-level fence succeeds, verify the expected receipt, canonical artifact, validation result, commit, review output, and Git state. A successful process signal alone is not completion proof. Conversely, when a PTY adapter misses the signal, durable artifact + verified commit/validation/Git may prove the phase after bounded recovery reconciliation; do not wait out the remaining wall cap mechanically.

If the fence reports failure/disconnection but a receipt or commit exists, do not automatically rerun or automatically accept it. Apply the recovery section of `references/queues/blind-orchestration.md` for blind work (or the same reconciliation principle for ordinary dispatch): validate identity, durable artifacts, commit, command exits, and Git state independently. Record a process anomaly when durable phase proof is complete.

Stop completed sessions promptly:

```bash
harnex stop --id cx-i-NNN
```

## Wall-clock caps

Use explicit caps so one stuck worker cannot consume the whole queue window:

| Shape | Suggested cap |
| --- | ---: |
| Small supervised worker / Tier C | 30m phase cap; 10m first fence |
| Plan or review | 30-60m phase cap; 10m first fence |
| Medium implementation / Tier B | 90m phase cap; 20m first fence |
| Full explicitly authorized chain / Tier A | 3h global cap with per-phase fences |
| Blind coordinator segment | <=3h and `1-4` entries; earlier at context/issue/deadline boundary |

Tune for repo/model reality, but distinguish the short first fence from the
phase/global cap. Planning-only work also obeys the mode-selection process
budget.

## Blind orchestrator rule

Load `references/queues/blind-orchestration.md`; its context firewall applies to every supervising layer. If implementation judgment is needed, dispatch a fresh reviewer/recovery worker. If the coordinator must inspect a full diff to feel safe, stop: the entry is too risky or its proof contract is inadequate.

## Queue integration

When a queue entry mode is `harnex-light` or `harnex-chain`, first verify that
mode selection justifies delegation and that Harnex is not being used for a
metadata-only transition:

1. Copy queue metadata into dispatch `--meta` or first-class harnex attribution flags.
2. Include the queue entry's validation and stop rule in the task brief.
3. Require a work-level harnex completion fence plus a versioned compact receipt and the canonical commit/artifact expected for that phase.
4. On completion, validate receipt identity, commit/artifact, command exits, and Git state without reading implementation detail.
5. Batch the queue run log at a resumable checkpoint with dispatch/attempt id, phase, status, validation result, commit, verdict counts, optional review path, and blocker if any.
6. If process and artifact evidence disagree, reconcile before retrying; resume from the first unproven phase.
7. If blocked, stop/park the session and move only to a dependency-safe eligible entry.

## Anti-patterns

- Raw `tmux` instead of harnex when harnex is available.
- `--detach` with no monitor/stop plan.
- Dispatching without brief bounds or without disclosing the promised product/process outcome.
- Using Harnex for frontmatter, queue status, run-log, handoff, or metadata-finalizer work.
- Repeating acknowledgment-only/boot/permission failures beyond the two-attempt circuit breaker.
- Giving the first monitor the full phase cap instead of reconciling at a short fence.
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

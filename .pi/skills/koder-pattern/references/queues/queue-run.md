---
title: Koder Queue Run Workflow
updated: 2026-07-14
---

# Koder Queue Run Workflow

Use when the user asks to run a prepared queue for a time window. Load
`mode-selection.md` first. A prepared queue does not by itself authorize blind
mode or Harnex.

## Startup contract

Before running entries, determine:

- target duration and closeout reserve;
- autonomy level and forbidden risks;
- active/ready queue batch;
- completion contract: done state, timebox gate, continuation policy, and early-stop consent;
- progress accounting expectations: issues touched, slices queued, likely closures, and live-gated outcomes;
- the promised outcome (`docs`, `tests`, `product code`, or `release`), rough worker/phase count, artifact count, and wall budget;
- whether each entry should be direct, one supervised worker, review-only, harnex-light, harnex-chain, or another repo-local mode;
- queue-wide `orchestration_mode`, assurance profile/review granularity, plus coordinator/fix caps and final-review policy when it is `blind`;
- whether release/deploy/peer mutation is explicitly allowed after full drain and final validation.

## Mode fork

For owner-present bounded work, prefer direct execution. Use one supervised
worker when a fresh context helps without requiring a context firewall. Planning,
docs, and metadata stay in these lighter shapes by default.

For ordinary/direct queues, use the execution loop below. The primary may
implement, review Git/source as normal, and update process metadata directly.

For explicit `orchestration_mode: blind`, only after the delivery/process-cost
gate passes:

1. Load `references/queues/blind-orchestration.md` and the harnex route before launch; enforce its fail-closed launch gate (no isolated workers or independent review means no launch).
2. For owner-present runs the current session is the coordinator; add a governor layer only when unattended relaunch across rollovers is genuinely required.
3. The coordinator applies the accounting parts of the loop below but delegates implementation, review, fix, re-review, recovery, and final review to fresh phase workers.
4. On any process/receipt/Git disagreement, apply the recovery section of `blind-orchestration.md` and resume from the first unproven phase.

Never silently execute a blind row directly to keep the queue moving. Conversely,
never promote an ordinary queue to blind merely because Harnex is available.

## Execution loop

1. Read repo instructions, `koder/STATE.md`, active queue, and recent run log.
2. Verify the queue completion contract. If it is missing for an unattended/away-window run, pause and add/refill instead of launching.
3. Pick the first eligible `queued` entry under current constraints.
4. Mark the batch `active` and the entry `running`; add a short tick/run-log intent if the repo uses one.
5. Execute according to entry mode:
   - `docs-direct` / `direct` for small green work;
   - `review-only` for existing diffs/artifacts;
   - `harnex-light` or `harnex-chain` for larger or riskier ordinary work; explicit blind work follows the mode fork and fresh phase-worker state machine.
6. For harnex entries, read `references/harnex/INDEX.md` and generate a bounded task brief with queue metadata.
7. If the repo has `koder/queue/log.jsonl` or a queue log helper, append an
   `entry_started` record with the queue-row estimate and any calibrated wall
   forecast.
8. Run the entry validation command or require worker proof, according to the queue contract.
9. Commit green checkpoints if the repo workflow expects commits.
10. Mark entry `done`, `blocked`, or `skipped` with evidence in the run log, including the slice status delta when the entry maps to a slice ledger.
11. Append entry actuals to `koder/queue/log.jsonl` when the repo uses the estimate/actual ledger.
12. Continue to the next eligible entry. A green checkpoint, plan completion, or primary-entry drain is not a stop condition unless `early_stop_consent` says so.
13. If blocked, stop/park the worker, record the shortest actionable blocker, and continue.
14. If the batch drains before closeout reserve, follow `continuation_policy`: overflow, next compatible ready queue, refill pass, final validation, or explicit stop.
15. If release/deploy was explicitly approved, do it only after all eligible work drains or the timebox reaches closeout and final validation passes.
16. During closeout reserve, stop starting new implementation entries and update queue/status/handoff with both issue and slice deltas.

## Efficiency and block rules

The circuit breakers, process-failure budget, metadata-batching rule, and
product/process delta reporting in `mode-selection.md` apply verbatim; do not
restate or weaken them here.

Never wait unattended on one blocked entry. If an entry exceeds its max estimate, the worker that owns implementation may commit only a safe green partial when the repo allows it; otherwise it must leave an explicit blocked receipt and safe Git state. A blind coordinator must not inspect, finish, or reset unknown product WIP—dispatch a fresh recovery worker or stop.

## Closeout evidence

A drained or paused queue should leave:

- current queue entry statuses;
- slice delta: queued/drained/blocked/released/live-proven counts where tracked;
- issue delta: issues closed, advanced, moved to live-proof-only, and raw open-count change;
- whether the user-visible done state completed or only queue entries drained;
- validation commands and pass/fail evidence;
- estimate/actual ledger records when the repo tracks queue calibration;
- links to commits/reviews/issues filed;
- unresolved blockers and next actions;
- clean repo state or explicit dirty-work explanation.

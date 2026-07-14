---
title: Koder Queue Run Workflow
updated: 2026-07-14
---

# Koder Queue Run Workflow

Use when the user asks to run a prepared queue for a time window.

## Startup contract

Before running entries, determine:

- target duration and closeout reserve;
- autonomy level and forbidden risks;
- active/ready queue batch;
- completion contract: done state, timebox gate, continuation policy, and early-stop consent;
- progress accounting expectations: issues touched, slices queued, likely closures, and live-gated outcomes;
- whether each entry should be direct, review-only, harnex-light, harnex-chain, or another repo-local mode;
- queue-wide `orchestration_mode`, plus coordinator/fix caps and final-review policy when it is `blind`;
- whether release/deploy/peer mutation is explicitly allowed after full drain and final validation.

## Mode fork

For ordinary/direct queues, use the execution loop below.

For explicit `orchestration_mode: blind`:

1. Load `references/queues/blind-orchestration.md`, `references/queues/blind-briefs.md`, and the harnex route before launch.
2. Enforce the blind launch gate from `references/queues/gates.md`; no isolated workers or independent review means no launch.
3. For a long/multi-entry drain, keep the current root session as governor and launch a fresh bounded coordinator. The governor consumes only coordinator receipts/exceptions.
4. The coordinator applies the accounting parts of the loop below but delegates implementation, review, fix, re-review, recovery, and final review to fresh phase workers.
5. On any process/receipt/Git disagreement, load `references/queues/blind-recovery.md` and resume from the first unproven phase.

Never silently execute a blind row directly to keep the queue moving.

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

## Block rules

Never wait unattended on one blocked entry. If an entry exceeds its max estimate, the worker that owns implementation may commit only a safe green partial when the repo allows it; otherwise it must leave an explicit blocked receipt and safe Git state. A blind coordinator must not inspect, finish, or reset unknown product WIP—dispatch a fresh recovery worker or stop.

## Blind orchestrator invariant

Blind means blind to implementation detail, not process state. The governor/coordinator verifies queue identity, locks, authorization, compact receipts, changed paths, commits, command exits, verdict/counts/path, blockers, and Git safety. It does not read source, full diffs, test bodies, review findings, transcripts, routine panes, or long logs.

Each row follows fresh `implement -> review -> (fix -> rereview)*` phases. Fix workers read committed review artifacts directly. Coordinators roll over after the queue-declared `1-4` entry cap or earlier under complexity/context pressure; a separate fresh final review handles integrated milestone gates. Harness outcome, receipts, commits, and canonical artifacts are reconciled independently rather than treating any one as unquestionable truth.

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

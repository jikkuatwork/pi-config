---
title: Koder Queue Run Workflow
updated: 2026-07-01
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
- whether release/deploy/peer mutation is explicitly allowed after full drain and final validation.

## Execution loop

1. Read repo instructions, `koder/STATE.md`, active queue, and recent run log.
2. Verify the queue completion contract. If it is missing for an unattended/away-window run, pause and add/refill instead of launching.
3. Pick the first eligible `queued` entry under current constraints.
4. Mark the batch `active` and the entry `running`; add a short tick/run-log intent if the repo uses one.
5. Execute according to entry mode:
   - `docs-direct` / `direct` for small green work;
   - `review-only` for existing diffs/artifacts;
   - `harnex-light` or `harnex-chain` for larger, riskier, or blind-orchestrated work.
6. For harnex entries, read `references/harnex/INDEX.md` and generate a bounded task brief with queue metadata.
7. Run the entry validation command or require worker proof, according to the queue contract.
8. Commit green checkpoints if the repo workflow expects commits.
9. Mark entry `done`, `blocked`, or `skipped` with evidence in the run log, including the slice status delta when the entry maps to a slice ledger.
10. Continue to the next eligible entry. A green checkpoint, plan completion, or primary-entry drain is not a stop condition unless `early_stop_consent` says so.
11. If blocked, stop/park the worker, record the shortest actionable blocker, and continue.
12. If the batch drains before closeout reserve, follow `continuation_policy`: overflow, next compatible ready queue, refill pass, final validation, or explicit stop.
13. If release/deploy was explicitly approved, do it only after all eligible work drains or the timebox reaches closeout and final validation passes.
14. During closeout reserve, stop starting new implementation entries and update queue/status/handoff with both issue and slice deltas.

## Block rules

Never wait unattended on one blocked entry. If an entry exceeds its max estimate, commit only green partial value if useful; otherwise reset WIP, mark blocked with evidence, and continue.

## Blind orchestrator rule

A queue runner manages state and routing, not huge implementation context. Blind means blind to implementation detail, not blind to process.

It may read:

- queue metadata and run log;
- `STATE.md` and tick/handoff notes;
- worker summaries, review verdicts, changed-path lists, and test output;
- active refs/files/dependencies, validation status, commit state, release/deploy permissions, and blockers.

It should avoid reading:

- large implementation diffs;
- generated source files from workers;
- full transcripts/prompts;
- implementation reasoning that should be captured by tests, review verdicts, or source artifacts.

If implementation judgment is needed, dispatch a review or mark the entry too risky for blind queue execution.

## Closeout evidence

A drained or paused queue should leave:

- current queue entry statuses;
- slice delta: queued/drained/blocked/released/live-proven counts where tracked;
- issue delta: issues closed, advanced, moved to live-proof-only, and raw open-count change;
- whether the user-visible done state completed or only queue entries drained;
- validation commands and pass/fail evidence;
- links to commits/reviews/issues filed;
- unresolved blockers and next actions;
- clean repo state or explicit dirty-work explanation.

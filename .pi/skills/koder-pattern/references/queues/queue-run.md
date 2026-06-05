---
title: Koder Queue Run Workflow
updated: 2026-06-05
---

# Koder Queue Run Workflow

Use when the user asks to run a prepared queue for a time window.

## Startup contract

Before running entries, determine:

- target duration and closeout reserve;
- autonomy level and forbidden risks;
- active/ready queue batch;
- whether each entry should be direct, review-only, harnex-light, harnex-chain, or another repo-local mode.

## Execution loop

1. Read repo instructions, `koder/STATE.md`, active queue, and recent run log.
2. Pick the first eligible `queued` entry under current constraints.
3. Mark the batch `active` and the entry `running`; add a short tick/run-log intent if the repo uses one.
4. Execute according to entry mode:
   - `docs-direct` / `direct` for small green work;
   - `review-only` for existing diffs/artifacts;
   - `harnex-light` or `harnex-chain` for larger, riskier, or blind-orchestrated work.
5. For harnex entries, read `references/harnex/INDEX.md` and generate a bounded task brief with queue metadata.
6. Run the entry validation command or require worker proof, according to the queue contract.
7. Commit green checkpoints if the repo workflow expects commits.
8. Mark entry `done`, `blocked`, or `skipped` with evidence in the run log.
9. Continue to the next eligible entry; a green checkpoint is not a stop condition.
10. If blocked, stop/park the worker, record the shortest actionable blocker, and continue.
11. If the batch drains before closeout reserve, inspect the next ready batch or run a small queue-add refill pass.
12. During closeout reserve, stop starting new implementation entries and update queue/status/handoff.

## Block rules

Never wait unattended on one blocked entry. If an entry exceeds its max estimate, commit only green partial value if useful; otherwise reset WIP, mark blocked with evidence, and continue.

## Blind orchestrator rule

A queue runner manages state and routing, not huge implementation context.

It may read:

- queue metadata and run log;
- `STATE.md` and tick/handoff notes;
- worker summaries, review verdicts, changed-path lists, and test output.

It should avoid reading:

- large implementation diffs;
- generated source files from workers;
- full transcripts/prompts.

If implementation judgment is needed, dispatch a review or mark the entry too risky for blind queue execution.

## Closeout evidence

A drained or paused queue should leave:

- current queue entry statuses;
- validation commands and pass/fail evidence;
- links to commits/reviews/issues filed;
- unresolved blockers and next actions;
- clean repo state or explicit dirty-work explanation.

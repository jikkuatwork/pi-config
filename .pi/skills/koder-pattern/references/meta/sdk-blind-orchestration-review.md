---
title: Holm SDK Blind Orchestration Review
updated: 2026-07-14
source_repo: /home/glasscube/Projects/holmhq/sdk
source_head: fe37f85
---

# Holm SDK Blind Orchestration Review

This is provenance for the generalized blind-queue route. It records what was observed in the Holm SDK run and what was deliberately abstracted. Do not hard-code SDK paths, quality thresholds, branch names, or product rules in another repo.

## Reviewed evidence

At SDK commit `fe37f85`:

- `koder/docs/BLIND_ORCHESTRATION.md` defined a hard primary-context firewall;
- `koder/docs/EXECUTION.md`, Queue `001`, the S00 conveyor, repo instructions, state, and `open` exposed the active mode and stop gate;
- the contract itself was independently approved for reviewed commit `58ba56a`;
- Queue `001` completed `16` serial implementation slices across Issues `#003`-`#006`;
- every slice received fresh independent review, with fix/re-review routing when needed;
- nine slices required fixes and one of them required two fix/re-review cycles, demonstrating that the review firewall caught nontrivial defects without routing finding prose through the coordinator;
- a separate fresh final review approved the integrated A2 range with zero P1/P2/P3 findings and the full declared validation gate passing;
- the queue stopped before unauthorized Issue `#007` work.

The durable result is captured by the SDK queue run log, canonical reviews, commits, and final state. Runtime task files/receipts under `/tmp/sdk-a2-blind-run/` were also inspected for protocol and recovery behavior; they are not required by this skill at runtime.

## Architecture that worked

1. An outside supervisor launched fresh bounded coordinators and consumed only coordinator receipts.
2. Each coordinator routed only the current row and used fresh implementation, review, fix, and re-review workers.
3. Review findings stayed in committed review artifacts; fix workers read them directly.
4. JSON phase receipts carried only identity, commits, changed paths, command exits, compact metrics, verdict/counts/path, Git state, and blockers.
5. Coordinators rolled over after at most four implementations and often at child-issue boundaries.
6. A final integrated review was separated from the last implementation coordinator.
7. Canonical Git artifacts carried durable truth; runtime task files, sidecars, and long validation logs stayed outside tracked product source.

## Recovery cases that mattered

- The first S01 worker exited without a usable receipt/commit and left scoped WIP. A fresh recovery implementation worker, not the blind coordinator, inspected and completed it.
- Coordinator `03` ended after the S07 implementation commit but before its required coordinator receipt/review chain. Coordinator `03b` reconciled the compact implementation receipt and Git state, then resumed at review rather than reimplementing S07.
- Some coordinator-level harnex outcomes reported failure/disconnection after clean commits and terminal receipts existed. The outside supervisor reconciled process status against receipts, canonical artifacts, and Git instead of either discarding valid work or trusting the receipt blindly.
- Repeated `needs_fixes` verdicts proved the value of explicit phase state and fix-cycle accounting.

These cases motivated `blind-recovery.md`, atomic receipt-before-signal ordering, attempt identities, and the “first unproven phase” rule.

## Limits observed

Blind orchestration protected the outside primary from implementation detail, but fresh coordinators were not intrinsically cheap: nested dispatch, validation, and fix loops still produced large coordinator telemetry. Therefore:

- `4` is a hard fallback ceiling, not an ideal batch size;
- complex rows should use smaller caps or one-entry captains;
- roll over on live context high-water telemetry when available;
- the governor should see coordinator receipts/exceptions, not every child event;
- stop cleanly when fresh-context relaunch is unavailable.

The SDK also repeated the same generic law across several repo artifacts for discoverability. The generalized skill keeps that law here and recommends only a small repo-specific overlay, reducing future policy drift.

## What was generalized

- explicit `blind` opt-in and fail-closed launch gate;
- governor → bounded coordinator → fresh phase-worker ownership;
- current-row-only routing and implementation-detail firewall;
- implementation → independent review → fix → re-review state machine;
- compact versioned phase and coordinator receipts;
- proof-before-signal ordering;
- configurable `1-4` coordinator cap and context-pressure rollover;
- final integrated review as a fresh gate;
- first-unproven-phase recovery from process/receipt/Git disagreement;
- canonical-artifact vs ephemeral-runtime separation.

## What remains repo-local

- TDD and red-evidence requirements;
- coverage/size/license thresholds;
- exact validation commands;
- serial branch vs isolated worktree policy;
- commit/push and upstream requirements;
- autonomy windows, deadlines, release/deploy permissions, and stop gates;
- product architecture and source-of-truth files.

A target repo may adopt stronger local rules. It should not weaken worker isolation, independent review, compact returns, or fail-closed recovery while still calling the mode blind.

## Delivery-cost calibration

The subsequent SDK A2R **planning-only** run exposed a mode mismatch: strict
blind machinery was applied to mapping, plan packing, plan review/fix/re-review,
and metadata finalization. Nine dispatches included three no-op/boot attempts, a
missed completion signal, and zero product-code delta. The canonical diagnosis
is `koder/analysis/001_koder_pattern_delivery_overhead/INDEX.md` in the Pi skill
source repository.

This does not invalidate Queue `#001`'s strict implementation evidence. It
narrows applicability:

- queue does not imply blind;
- planning/docs/metadata default to direct or one supervised worker;
- blind strict remains appropriate for high-consequence implementation;
- mode selection must disclose process cost and product outcome first;
- no-op/monitor/receipt failures must fail fast rather than create more phases.

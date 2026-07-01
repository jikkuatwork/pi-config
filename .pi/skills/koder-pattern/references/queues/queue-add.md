---
title: Koder Queue Add Workflow
updated: 2026-07-01
---

# Koder Queue Add Workflow

Use when the user asks to add, prepare, pack, or refill queue work. If the task starts from a broad issue/backlog item or asks for queueable pieces, load `references/queues/conveyor.md` first.

## Workflow

1. Read only the candidate source artifacts and current queue batches.
2. Apply effort, risk, and ambiguity gates from `references/queues/gates.md`.
3. Resolve gate failures at the source:
   - vague issue → update/file the issue;
   - vague plan → update/extract the plan;
   - missing validation → add validation to the source artifact;
   - unresolved product/risk choice → ask the user.
4. Select or create compatible queue batches:
   - append to a non-drained compatible batch below target capacity;
   - create the next numbered batch when the current one is full, incompatible, active, or nearly drained;
   - if an implementation queue is already running, plan only sequentially compatible next work and check for ref/file/dependency overlap.
5. Add or refresh the queue completion contract: `done_state`, `timebox_gate`, `continuation_policy`, and `early_stop_consent`.
6. Add thin entries with only `Ref`, `Status`, `Estimate`, `Risk`, `Ambiguity`, `Mode`, `Validation`, and `Stop`; add optional slice metadata only when it improves progress accounting.
7. Keep packed effort above the target window; include fallback work when possible. For away windows, prefer overflow or a next-ready queue over a single underpacked batch.
8. Add or update queue progress accounting (`issues_touched`, `slices_queued`, likely closures/live gates) when raw issue count will understate movement.
9. Run local validators if present; otherwise perform manual frontmatter/path/status checks.
10. Commit queue changes with source artifact refinements when the repo workflow expects commits.

## Conveyor strategy

Queue building is judgment-heavy and should happen while the human is present when possible. The builder may keep preparing future queues while a runner drains the active queue, but only as planning/artifact work and only after checking that the next queue will not overlap active implementation ownership.

Mine human-gated issues for safe mechanical slices. Queue the slice only when it has its own validation and stop rule; leave the product/risk decision gated.

## Success condition

A successful queue-add leaves a runner able to consume the batch without asking ordinary implementation questions, makes clear whether the runner should continue into overflow, the next compatible queue, a refill pass, or an explicit stop, and states the expected slice/issue progress delta for broad work.

## Anti-patterns

- Stuffing design/implementation detail into the queue row.
- Queueing high-ambiguity product work as implementation.
- Queueing red-risk work without explicit user approval.
- Mixing incompatible autonomy levels or constraints in one batch.
- Building the next queue without checking active queue refs/files/dependencies.
- Claiming an away-window queue is sufficient when it has no overflow, next-ready queue, or explicit early-stop consent.

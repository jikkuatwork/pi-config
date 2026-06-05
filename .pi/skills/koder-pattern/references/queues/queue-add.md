---
title: Koder Queue Add Workflow
updated: 2026-06-05
---

# Koder Queue Add Workflow

Use when the user asks to add, prepare, pack, or refill queue work.

## Workflow

1. Read only the candidate source artifacts and current queue batches.
2. Apply effort, risk, and ambiguity gates from `references/queues/gates.md`.
3. Resolve gate failures at the source:
   - vague issue → update/file the issue;
   - vague plan → update/extract the plan;
   - missing validation → add validation to the source artifact;
   - unresolved product/risk choice → ask the user.
4. Select or create a compatible queue batch:
   - append to a non-drained compatible batch below target capacity;
   - otherwise create the next numbered batch.
5. Add thin entries with only `Ref`, `Status`, `Estimate`, `Risk`, `Ambiguity`, `Mode`, `Validation`, and `Stop`.
6. Keep packed effort above the target window; include fallback work when possible.
7. Run local validators if present; otherwise perform manual frontmatter/path/status checks.
8. Commit queue changes with source artifact refinements when the repo workflow expects commits.

## Success condition

A successful queue-add leaves a runner able to consume the batch without asking ordinary implementation questions.

## Anti-patterns

- Stuffing design/implementation detail into the queue row.
- Queueing high-ambiguity product work as implementation.
- Queueing red-risk work without explicit user approval.
- Mixing incompatible autonomy levels or constraints in one batch.

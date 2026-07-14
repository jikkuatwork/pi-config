---
title: Koder Queue Router
updated: 2026-07-14
---

# Koder Queue Router

Queues are thin orchestration batches for unattended or semi-autonomous work. They order references to source artifacts; they do not replace issues, plans, reviews, or task briefs.

## Routes

| Need | Load |
| --- | --- |
| Queue path, template, entry fields, autonomy levels | `references/queues/model.md` |
| Decide whether work is queueable, split, or unsafe | `references/queues/gates.md` |
| Extract queueable slices from issue/plan/backlog work | `references/queues/conveyor.md`, then `references/artifacts/plans.md` if a slice needs a plan |
| Add, prepare, pack, or refill queue work | `references/queues/model.md`, `references/queues/gates.md`, `references/queues/queue-add.md` |
| Build a queue conveyor / multiple prepared queues | `references/queues/conveyor.md`, then `references/queues/model.md`, `references/queues/gates.md`, `references/queues/queue-add.md` |
| Run a prepared queue | `references/queues/model.md`, `references/queues/queue-run.md` |
| Adopt or run explicit blind orchestration | `references/queues/blind-orchestration.md`, then `references/queues/blind-briefs.md`, plus model/run/harnex leaves |
| Recover a blind worker/coordinator anomaly | `references/queues/blind-recovery.md` |
| Harnex-backed queue entries | Queue route above plus `references/harnex/INDEX.md` |

## Queue principles

- A queue row is metadata: exact ref, status, estimate, risk, ambiguity, mode, validation, stop rule, plus optional slice metadata for broad issue progress.
- If a source issue/plan is vague, fix that source artifact instead of writing a long queue row.
- Use the conveyor route to mine broad or human-gated issues for safe mechanical slices before packing queues.
- Do not mix incompatible constraints in one batch.
- Away-window queues need a completion contract: done state, timebox gate, continuation policy, and early-stop consent.
- When human judgment is available, prefer building/refilling the next compatible queue instead of waiting for the current queue to empty.
- Blind orchestration is explicit opt-in. Blind means blind to implementation detail, not process state: use the governor/coordinator/phase-worker boundary, compact receipts, independent review, and first-unproven-phase recovery. Never silently fall back to direct implementation.
- Keep generic blind law in this skill; repo artifacts should carry only the local authorization, queue, validation, ownership, and stop-gate overlay.
- Leave closeout evidence: statuses, validation, commits/reviews/issues, blockers, clean/dirty state, issue delta, slice delta, and whether the user-visible outcome completed or only queue entries drained.

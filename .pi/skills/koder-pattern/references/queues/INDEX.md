---
title: Koder Queue Router
updated: 2026-07-14
---

# Koder Queue Router

Queues are thin orchestration batches for unattended or semi-autonomous work. They order references to source artifacts; they do not replace issues, plans, reviews, or task briefs.

## Routes

| Need | Load |
| --- | --- |
| Choose direct, supervised, blind, or blind-strict execution | `references/queues/mode-selection.md` |
| Queue path, template, entry fields, autonomy levels | `references/queues/model.md` |
| Decide whether work is queueable, split, or unsafe | `references/queues/mode-selection.md`, then `references/queues/gates.md` |
| Extract queueable slices from issue/plan/backlog work | `references/queues/conveyor.md`, then `references/artifacts/plans.md` if a slice needs a plan |
| Add, prepare, pack, or refill queue work | `references/queues/mode-selection.md`, then `references/queues/model.md`, `references/queues/gates.md`, `references/queues/queue-add.md` |
| Build a queue conveyor / multiple prepared queues | `references/queues/mode-selection.md`, `references/queues/conveyor.md`, then `references/queues/model.md`, `references/queues/gates.md`, `references/queues/queue-add.md` |
| Run a prepared queue | `references/queues/mode-selection.md`, then `references/queues/model.md`, `references/queues/queue-run.md` |
| Adopt or run explicit blind orchestration | `references/queues/mode-selection.md`, then `references/queues/blind-orchestration.md`, `references/queues/blind-briefs.md`, plus model/run/harnex leaves |
| Recover a blind worker/coordinator anomaly | `references/queues/blind-recovery.md` |
| Harnex-backed queue entries | Queue route above plus `references/harnex/INDEX.md` |

## Queue principles

- Select the delivery shape before creating machinery. A queue does not imply blind mode; Harnex does not imply a chain; planning/docs/metadata default to direct or supervised work.
- A queue row starts with exact ref, status, validation, and stop rule. Add estimate/risk/ambiguity/mode or slice fields only when they affect scheduling, safety, or progress accounting.
- If a source issue/plan is vague, fix that source artifact instead of writing a long queue row. If an issue is already executable, reference it directly instead of creating a redundant plan family.
- Use the conveyor route only when broad or human-gated work actually needs safe mechanical slices before packing.
- Do not mix incompatible constraints in one batch.
- Away-window queues need a completion contract: done state, timebox gate, continuation policy, and early-stop consent.
- When human judgment is available, prefer building/refilling the next compatible queue instead of waiting for the current queue to empty.
- Blind orchestration is explicit opt-in after disclosing product outcome, expected phases/workers, artifacts, wall budget, and stop gate. Blind means blind to implementation detail, not process state. Strict per-entry review is reserved for risk that warrants it; never silently weaken a declared blind profile.
- Keep generic blind law in this skill; repo artifacts should carry only the local authorization, queue, validation, ownership, and stop-gate overlay.
- Leave closeout evidence: statuses, validation, commits/reviews/issues, blockers, clean/dirty state, issue delta, slice delta, and whether the user-visible outcome completed or only queue entries drained.

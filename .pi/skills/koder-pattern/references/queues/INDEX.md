---
title: Koder Queue Router
updated: 2026-06-05
---

# Koder Queue Router

Queues are thin orchestration batches for unattended or semi-autonomous work. They order references to source artifacts; they do not replace issues, plans, reviews, or task briefs.

## Routes

| Need | Load |
| --- | --- |
| Queue path, template, entry fields, autonomy levels | `references/queues/model.md` |
| Decide whether work is queueable, split, or unsafe | `references/queues/gates.md` |
| Add, prepare, pack, or refill queue work | `references/queues/model.md`, `references/queues/gates.md`, `references/queues/queue-add.md` |
| Run a prepared queue | `references/queues/model.md`, `references/queues/queue-run.md` |
| Harnex-backed queue entries | Queue route above plus `references/harnex/INDEX.md` |

## Queue principles

- A queue row is metadata: exact ref, status, estimate, risk, ambiguity, mode, validation, stop rule.
- If a source issue/plan is vague, fix that source artifact instead of writing a long queue row.
- Do not mix incompatible constraints in one batch.
- Leave closeout evidence: statuses, validation, commits/reviews/issues, blockers, clean/dirty state.

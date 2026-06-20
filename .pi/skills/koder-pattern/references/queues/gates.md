---
title: Koder Queue Gates
updated: 2026-06-20
---

# Koder Queue Gates

Use before adding work to a queue. If a candidate fails because the source artifact is weak, fix the issue/plan first; do not compensate with a long queue row.

## Effort gate

| Size | Range | Queue policy |
| --- | --- | --- |
| `XS` | 10-20m | Good filler. |
| `S` | 30-60m | Good queue item. |
| `M` | 60-120m | Good with clear validation and stop rule. |
| `L` | >120m | Split source artifact before queueing. |

## Risk gate

| Risk | Meaning | Default policy |
| --- | --- | --- |
| `green` | Docs, tests, scripts, additive local code. | Queueable. |
| `yellow` | Runtime/CLI behavior, auth/routing, migrations, concurrency, data movement. | Queueable only with tight tests/review. |
| `red` | Release, cloud spend, destructive DB, production mutation, irreversible migrations, credentials. | Not queueable unless user explicitly allows it. |

## Ambiguity gate

| Ambiguity | Meaning | Policy |
| --- | --- | --- |
| `low` | Source and validation clear. | Queue. |
| `medium` | Seam known but implementation uncertain. | Queue with stop/fallback rule. |
| `high` | Product/design/source truth unresolved. | Resolve first or queue only as time-boxed investigation. |

## Completion contract gate

Launch is blocked for unattended or away-window queues unless the queue declares:

- `done_state`: what user-visible result should exist when the user returns;
- `timebox_gate`: whether to stop by clock, exhaustion, validation, release, or closeout reserve;
- `continuation_policy`: what to dispatch after primary drain, including overflow or next ready queue;
- `early_stop_consent`: explicit permission if the queue is intentionally underpacked or allowed to stop early.

A green checkpoint, plan completion, or primary-entry drain is not a stop condition by itself. If the target window is larger than eligible queued effort, add safe overflow/next-queue work or state clearly that the queue will drain and stop early.

## Gate failure fixes

- Vague issue → update/file the issue.
- Vague plan → update/extract a thin plan.
- Missing validation → add validation to the source artifact.
- Unresolved product/risk choice → ask the user.
- Red-risk work → require explicit approval and constraints.

## Queue conveyor and batch packing

- When human judgment is present, prefer preparing multiple compatible queues or a refill tranche so unattended time can be execution-heavy.
- Human-supervised issues may still contain safe mechanical slices: tests, guards, docs, diagnostics, narrow refactors, or read-only checks. Extract those without queueing the gated decision itself.
- For supervised queues, target more queued effort than the window can finish, usually `1.5x-2x`.
- For away-window queues, prefer `2x-3x` eligible effort plus overflow or a next-ready queue; reserve 30-60m for closeout depending on repo norms.
- Include fallback green work when possible.
- Do not mix incompatible constraints, e.g. cloud-spend entries in a no-cloud queue.
- Do not overlap active implementation ownership. A next queue can be planned while another queue runs, but it must check active refs/files/dependencies and stay sequentially compatible.

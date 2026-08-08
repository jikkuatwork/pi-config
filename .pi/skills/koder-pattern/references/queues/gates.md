---
title: Koder Queue Gates
updated: 2026-08-08
---

# Koder Queue Gates

Use before adding work to a queue. First load `mode-selection.md`: queueing and
blind orchestration are separate decisions. If a candidate fails because the
source artifact is weak, fix the issue/plan first; do not compensate with a long
queue row.

## Delivery and process-cost gate

Before creating artifacts or dispatching workers, identify the expected product
outcome and choose the lightest safe shape. The disclosure contract, planning
budget, and circuit breakers in `mode-selection.md` apply here verbatim. An
executable issue may be queued by path/anchor without a separate mapping or
child plan.

A candidate fails this gate when expected process cost is disproportionate to
its product or quality delta. Remove machinery rather than padding the queue.

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
- `early_stop_consent`: explicit permission if the queue is intentionally underpacked or allowed to stop early;
- progress accounting for broad work: issues touched, slices queued, likely closures, and live-gated outcomes.

A green checkpoint, plan completion, primary-entry drain, or low raw issue-closure count is not a stop condition by itself. If the target window is larger than eligible queued effort, add safe overflow/next-queue work or state clearly that the queue will drain and stop early. If issue count will barely move, report slice movement explicitly.

## Blind-orchestration launch gate

When `orchestration_mode: blind`, launch is additionally blocked unless the
mode-selection gate justifies unattended/context-isolated execution and:

- harnex or an explicitly equivalent harness can isolate fresh phase workers,
  and the chosen adapter (plus one declared fallback) passed a preflight
  dispatch smoke;
- the queue declares `review_granularity`; `entry` work has a fresh independent reviewer after every implementation and fix;
- the queue declares a coordinator entry cap sized to topology (per dispatched seat prefer `1-2`, hard maximum `4`; an interactive governor-run one-sitting queue sets the row count, with the context-health check governing rollover — see `model.md`), plus a fix-cycle cap and queue-global process-failure budget;
- compact versioned phase/coordinator receipts can be written outside tracked source or in ignored scratch;
- implementation ownership is serial or explicitly isolated/non-overlapping;
- the first eligible row has a reviewed source artifact, exact validation, commit policy, wall cap, and stop rule;
- TDD product rows passed any repo-owned deterministic RED-contract preflight (symbol/seam existence, migration-edge and fixture-ownership claims) or were rerouted to source repair before launch; prefer such a script over prose certification of executable facts (precedent: Holm `scripts/queue/preflight-red-contract.sh`, Issue `#618` D1 — prose certification let three mechanically knowable defects consume a full discovery allowance in one run);
- Git is clean/synchronized as expected, or a named recovery worker owns known WIP;
- rollover ownership is explicit: the governor launches successor seats automatically at the cap; a mid-window stop without a fired gate is a defect, and any permitted clean stop is declared in the queue contract, not improvised.

Do not fall back from explicit blind mode to direct implementation. Load `references/queues/blind-orchestration.md` for the full role, brief, and recovery contract.

## Gate failure fixes

- Wrong execution shape → remove queue/Harnex/blind machinery or obtain explicit authorization for its cost.
- Vague issue → update/file the issue.
- Vague plan → update/extract a thin plan only when the issue itself cannot be made executable.
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

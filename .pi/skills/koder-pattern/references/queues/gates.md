---
title: Koder Queue Gates
updated: 2026-06-05
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

## Gate failure fixes

- Vague issue → update/file the issue.
- Vague plan → update/extract a thin plan.
- Missing validation → add validation to the source artifact.
- Unresolved product/risk choice → ask the user.
- Red-risk work → require explicit approval and constraints.

## Batch packing

- Target more queued effort than the window can finish, usually `1.5x-2x`.
- For a 6h window, reserve 45-60m for closeout and pack roughly 8-10h of eligible work.
- Include fallback green work when possible.
- Do not mix incompatible constraints, e.g. cloud-spend entries in a no-cloud queue.

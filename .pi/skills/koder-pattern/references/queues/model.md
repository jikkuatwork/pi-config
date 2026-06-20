---
title: Koder Queue Model
updated: 2026-06-20
---

# Koder Queue Model

## What “file a queue” means

To file a queue is to create or update a `koder/queue/NNN_slug/INDEX.md` batch with:

- target window and autonomy level;
- explicit constraints and forbidden risks;
- a completion contract for unattended or away-window runs;
- ordered entries that reference existing issues/plans/tasks;
- estimate, risk, ambiguity, mode, validation, and stop rule per entry;
- a concise run log as entries are consumed.

## Path

```text
koder/queue/NNN_short_slug/INDEX.md
```

## Template

```markdown
---
queue: NNN
title: Short queue title
status: ready
created: YYYY-MM-DD
updated: YYYY-MM-DD
target_window: 6h
queued_effort_target: 9h
autonomy_level: A2
completion_contract:
  done_state: "What the user should expect when they return."
  timebox_gate: "Stop starting new work at closeout reserve, when exhausted, or at a named validation/release gate."
  continuation_policy: "What to run next if primary entries finish early, including overflow or the next compatible ready queue."
  early_stop_consent: "Explicit only; otherwise do not stop merely because primary entries drained."
constraints:
  no_release: true
  no_cloud_spend: true
  no_destructive_db: true
  serial_master: true
---

# Queue NNN: Short Title

## Purpose

Why this batch exists and what safe theme ties entries together.

## Entries

| Order | Ref | Status | Estimate | Risk | Ambiguity | Mode | Validation | Stop |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `koder/plans/123_example/INDEX.md#layer-1` | queued | 60m | green | low | direct | `test command` | stop at 90m; commit green partial or mark blocked |

## Orchestration Notes

- Queue-specific constraints only.
- Do not restate implementation detail from referenced artifacts.

## Run Log

- Pending.
```

## Completion contract fields

| Field | Meaning |
| --- | --- |
| `done_state` | User-visible result expected at return/handoff, not just entry count drained. |
| `timebox_gate` | Clock, exhaustion, validation, or release gate that ends the run. Include closeout reserve. |
| `continuation_policy` | Where to continue if primary work finishes early: overflow, next ready queue, refill pass, or explicit stop. |
| `early_stop_consent` | Whether stopping before the window/outcome is allowed. Default is not granted. |

Do not summarize an underpacked queue as covering the full window. Either add overflow/next-ready work or say it will drain and stop early.

## Entry fields

| Field | Meaning |
| --- | --- |
| `Ref` | Exact source artifact path/anchor. The source holds implementation detail. |
| `Status` | `candidate`, `queued`, `running`, `reviewing`, `done`, `blocked`, or `skipped`. |
| `Estimate` | Expected active work time. Keep runnable entries `<=120m` unless investigation-only. |
| `Risk` | `green`, `yellow`, or `red` based on blast radius. |
| `Ambiguity` | `low`, `medium`, or `high` based on unresolved decisions/source clarity. |
| `Mode` | `docs-direct`, `direct`, `worker`, `review-only`, `harnex-light`, `harnex-chain`, or repo-local equivalent. |
| `Validation` | Command or artifact check required before `done`. |
| `Stop` | Timebox, split trigger, fallback, or approval gate. |

## Autonomy levels

Use repo-local definitions when present. Default generalized meanings:

| Level | Meaning |
| --- | --- |
| `A0` | Observe/research only. |
| `A1` | Docs, plans, tests, scripts; no product behavior changes. |
| `A2` | Additive local code allowed; local validation required; no release/deploy/cloud. |
| `A3` | Local deploy/restart/upgrade allowed only when entry says so. |
| `A4` | Cloud spend, destructive, production, or release actions only with explicit approval. |

Default safe unattended work is `A2`.

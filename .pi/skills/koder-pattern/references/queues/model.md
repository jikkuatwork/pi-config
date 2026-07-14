---
title: Koder Queue Model
updated: 2026-07-14
---

# Koder Queue Model

## What “file a queue” means

To file a queue is to create or update a
`koder/queue/NNN_slug/INDEX.md` with the minimum state needed to resume:

- purpose, status, explicit orchestration mode, and constraints;
- ordered refs to executable issues/plans/tasks;
- validation and stop rule for each entry;
- a done/stop/continuation contract only for unattended or away-window runs;
- a concise batched run log or checkpoint evidence.

Add estimates, risk, ambiguity, autonomy, progress accounting, telemetry, blind
caps, or final-review fields only when they change scheduling or safety. Do not
fill null/zero boilerplate merely because the full schema supports it.

## Path

```text
koder/queue/NNN_short_slug/INDEX.md
koder/queue/log.jsonl        # optional cross-queue estimate/actual ledger
```

## Template

```markdown
---
queue: NNN
title: Short queue title
status: ready
orchestration_mode: direct # direct | blind
constraints:
  no_release: true
  no_cloud_spend: true
---

# Queue NNN: Short Title

## Purpose

The result this batch should deliver.

## Entries

| Order | Ref | Status | Validation | Stop |
| ---: | --- | --- | --- | --- |
| 1 | `koder/issues/123_example/INDEX.md` | queued | `test command` | stop on source contradiction |

## Run Log

- Pending; batch updates at resumable checkpoints.
```

For an away window, add `target_window` plus `completion_contract`. For capacity
planning, add only the estimates/risk/ambiguity fields actually used. For a broad
track, add progress accounting. For blind mode, add the overlay below.

## Blind mode overlay

Use blind mode only when explicitly selected. Before launch, load `references/queues/blind-orchestration.md` and `references/queues/blind-briefs.md`.

- Apply `mode-selection.md` first; queue existence does not imply blind mode.
- Set `orchestration_mode: blind` at queue level; do not encode it only in chat.
- Set `assurance_profile` and `review_granularity`. Use `strict` + `entry` for auth/security/protocol/release/destructive/credential risk; bounded lower-risk blind work may declare batch boundaries.
- Set `coordinator_entry_cap` to `1-4`. Four is a hard ceiling, not a throughput target; choose lower caps for complex/fix-heavy rows.
- Set `max_fix_cycles` and stop for owner/architecture judgment when exhausted.
- Set `independent_review: required` at the declared boundary and make `implementation_ownership` serial or explicitly isolated/non-overlapping.
- Set `final_review_required: true` when the queue done state claims an integrated milestone rather than isolated row completion.
- Keep branch/worktree ownership and review requirements in `constraints` or a concise repo execution overlay.
- Do not paste the universal blind protocol into every row. Rows still carry only source ref, validation, stop rule, and local risk facts.
- Runtime task files/receipts live outside tracked source or in ignored scratch; durable queue/run-log/review artifacts retain the minimum proof.

## Completion contract fields

| Field | Meaning |
| --- | --- |
| `done_state` | User-visible result expected at return/handoff, not just entry count drained. |
| `timebox_gate` | Clock, exhaustion, validation, or release gate that ends the run. Include closeout reserve. |
| `continuation_policy` | Where to continue if primary work finishes early: overflow, next ready queue, refill pass, or explicit stop. |
| `early_stop_consent` | Whether stopping before the window/outcome is allowed. Default is not granted. |

Do not summarize an underpacked queue as covering the full window. Either add overflow/next-ready work or say it will drain and stop early.

## Queue estimate/actual ledger

Repos may keep an append-only `koder/queue/log.jsonl` ledger to calibrate future
queue sizing. Queue rows are human planning estimates; harnex/worker telemetry
captures active dispatch time; the ledger joins those at queue-entry level and
records wall-clock actuals.

Recommended entry event shape:

```json
{"schema":"koder.queue.log.entry.v1","event":"entry_done","queue_id":"066","entry_id":"066-02","estimate_min":105,"predicted_wall_min":35,"actual_wall_s":1440,"harnex_active_s":1030,"status":"done"}
```

Rules:

- log `entry_started` before work and `entry_done` / `entry_blocked` /
  `entry_skipped` at entry closeout;
- keep `estimate_min` as the queue-row nominal estimate;
- use `predicted_wall_min` for any telemetry-calibrated forecast made at launch;
- use `actual_wall_s` for elapsed wall-clock time including review, validation,
  and orchestration overhead;
- use `harnex_active_s` for summed worker dispatch duration when available;
- do not log prompts, transcripts, secrets, credentials, private payloads, or raw
  worker output.

## Entry fields

| Field | Meaning |
| --- | --- |
| `Ref` | Exact source artifact path/anchor. The source holds implementation detail. |
| `Status` | `candidate`, `queued`, `running`, `implemented`, `reviewing`, `fixing`, `rereviewing`, `approved`/`done`, `blocked`, or `skipped`. Repos may keep a smaller vocabulary if the run log records the active phase. |
| `Estimate` (optional) | Expected active work time when capacity planning matters. Keep runnable entries `<=120m` unless investigation-only. |
| `Risk` (optional) | `green`, `yellow`, or `red` when it changes review/authorization. |
| `Ambiguity` (optional) | `low`, `medium`, or `high` when it changes dispatch/stop policy. |
| `Mode` (optional) | `docs-direct`, `direct`, `worker`, `review-only`, `harnex-light`, `harnex-chain`, or repo-local equivalent when rows differ. Harnex does not itself select blind mode. |
| `Validation` | Command or artifact check required before `done`. |
| `Stop` | Timebox, split trigger, fallback, or approval gate. |

Optional metadata for richer progress accounting:

| Field | Meaning |
| --- | --- |
| `slice_id` | Stable short name matching the source issue `Slice Ledger`, if any. |
| `slice_status_after_done` | Expected ledger state after this entry: `done`, `released`, `live_proven`, etc. |
| `issue_closure_candidate` | Whether this entry can close its issue if validation passes. |
| `active_phase` | Blind-mode recovery hint: `implement`, `review`, `fix`, `rereview`, or `final_review`. Canonical receipts/commits still require reconciliation. |
| `phase_attempt` | Monotonic attempt number for the active phase; prevents duplicate receipt/session reuse. |

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

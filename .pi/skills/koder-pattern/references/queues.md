---
title: Koder Queues
updated: 2026-05-24
---

# Koder Queues

Queues are thin orchestration batches for unattended or semi-autonomous work. They order references to source artifacts; they do not replace issues, plans, reviews, or task briefs.

## What “file a queue” means

To file a queue is to create or update a `koder/queue/NNN_slug/INDEX.md` batch with:

- target window and autonomy level;
- explicit constraints and forbidden risks;
- ordered entries that reference existing issues/plans/tasks;
- estimate, risk, ambiguity, mode, validation, and stop rule per entry;
- a concise run log as entries are consumed.

## Path

```text
koder/queue/NNN_short_slug/INDEX.md
```

## Queue template

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

## Gates before queueing

### Effort gate

| Size | Range | Queue policy |
| --- | --- | --- |
| `XS` | 10-20m | Good filler. |
| `S` | 30-60m | Good queue item. |
| `M` | 60-120m | Good with clear validation and stop rule. |
| `L` | >120m | Split source artifact before queueing. |

### Risk gate

| Risk | Meaning | Default policy |
| --- | --- | --- |
| `green` | Docs, tests, scripts, additive local code. | Queueable. |
| `yellow` | Runtime/CLI behavior, auth/routing, migrations, concurrency, data movement. | Queueable only with tight tests/review. |
| `red` | Release, cloud spend, destructive DB, production mutation, irreversible migrations, credentials. | Not queueable unless user explicitly allows it. |

### Ambiguity gate

| Ambiguity | Meaning | Policy |
| --- | --- | --- |
| `low` | Source and validation clear. | Queue. |
| `medium` | Seam known but implementation uncertain. | Queue with stop/fallback rule. |
| `high` | Product/design/source truth unresolved. | Resolve first or queue only as time-boxed investigation. |

If a candidate fails because the source artifact is weak, fix the issue/plan first. Do not write a long queue row to compensate.

## Queue-add workflow

Use this when the user asks to add, prepare, pack, or refill queue work.

1. Read only the candidate source artifacts and current queue batches.
2. Apply the effort, risk, and ambiguity gates.
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

Successful queue-add leaves a runner able to consume the batch without asking ordinary implementation questions.

## Batch packing

- Target more queued effort than the window can finish, usually `1.5x-2x`.
- For a 6h window, reserve 45-60m for closeout and pack roughly 8-10h of eligible work.
- Include fallback green work when possible.
- Do not mix incompatible constraints (for example, cloud-spend entries in a no-cloud queue).

## Queue-run workflow

Use this when the user asks to run a prepared queue for a time window.

### Startup contract

Before running entries, determine:

- target duration and closeout reserve;
- autonomy level and forbidden risks;
- active/ready queue batch;
- whether each entry should be direct, review-only, harnex-light, harnex-chain, or another repo-local mode.

### Execution loop

1. Read repo instructions, `koder/STATE.md`, active queue, and recent run log.
2. Pick the first eligible `queued` entry under current constraints.
3. Mark the batch `active` and the entry `running`; add a short tick/run-log intent if the repo uses one.
4. Execute according to entry mode:
   - `docs-direct` / `direct` for small green work;
   - `review-only` for existing diffs/artifacts;
   - `harnex-light` or `harnex-chain` for larger, riskier, or blind-orchestrated work.
5. For harnex entries, read `harnex.md` and generate a bounded task brief with queue metadata.
6. Run the entry validation command or require worker proof, according to the queue contract.
7. Commit green checkpoints if the repo workflow expects commits.
8. Mark entry `done`, `blocked`, or `skipped` with evidence in the run log.
9. Continue to the next eligible entry; a green checkpoint is not a stop condition.
10. If blocked, stop/park the worker, record the shortest actionable blocker, and continue.
11. If the batch drains before the closeout reserve, inspect the next ready batch or run a small queue-add refill pass.
12. During closeout reserve, stop starting new implementation entries and update queue/status/handoff.

### Block rules

Never wait unattended on one blocked entry. If an entry exceeds its max estimate, commit only green partial value if useful; otherwise reset WIP, mark blocked with evidence, and continue.

## Blind orchestrator rule

A queue runner should manage state and routing, not consume huge implementation context.

It may read:

- queue metadata and run log;
- `STATE.md` and tick/handoff notes;
- worker summaries, review verdicts, changed-path lists, and test output.

It should avoid reading:

- large implementation diffs;
- generated source files from workers;
- full transcripts/prompts.

If implementation judgment is needed, dispatch a review or mark the entry too risky for blind queue execution.

## Closeout evidence

A drained or paused queue should leave:

- current queue entry statuses;
- validation commands and pass/fail evidence;
- links to commits/reviews/issues filed;
- unresolved blockers and next actions;
- clean repo state or explicit dirty-work explanation.

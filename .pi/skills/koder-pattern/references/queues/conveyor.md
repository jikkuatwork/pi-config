---
title: Koder Queue Conveyor
updated: 2026-06-20
---

# Koder Queue Conveyor

Use when the user asks to extract queueable pieces from an issue, build plans
with explicit queueable slices, prepare multiple queues, refill an active
queue, or improve the repo's automation throughput.

A queue conveyor separates judgment-heavy planning from execution-heavy queue
running. Use human-present time to classify, slice, approve constraints, and
pack compatible work. Use away/unattended time to consume already-approved
mechanical slices quickly and safely.

## Core stance

This repo, its docs, its harnesses, and its agents are a machine that builds the
project. The conveyor improves that machine by turning broad work into small,
validated, automatable pieces without hiding human-gated decisions.

Blind orchestrator means blind to implementation detail, not blind to process.
Track queue state, active refs/files/dependencies, validation, commits,
release/deploy permissions, blockers, and closeout evidence.

## Workflow

### 1. Mine

Read only the source issue/plan/backlog item and nearby live queue state. Split
work into:

| Bucket | Meaning | Action |
| --- | --- | --- |
| `queueable-now` | Safe mechanical slice with clear validation. | Queue or write a thin executable slice. |
| `needs-slice` | Good candidate, but source artifact lacks enough shape. | Write/update a plan slice first. |
| `human-gated` | Product/risk/permission decision required. | Record the gate; do not queue implementation. |
| `red-risk` | Release, cloud spend, destructive DB, credentials, production mutation. | Require explicit approval and constraints. |
| `blocked` | Missing source truth, failing dependency, or unknown ownership. | Record blocker and route separately. |

Mine human-supervised issues for safe mechanical slices: tests, guards, docs,
diagnostics, read-only audits, small CLI hardening, narrow refactors, or
instrumentation. Do not queue the gated decision itself.

### 2. Slice

For each `needs-slice` or selected `queueable-now` item, write/update the source
artifact so a runner can execute without ordinary implementation questions.

A queueable slice should include:

- capability statement;
- build-on/source-drift checks;
- TDD or validation plan;
- final validation commands;
- acceptance criteria;
- explicit stop rules;
- defer list / human-gated boundaries;
- diff/read budget where relevant;
- queue hints: estimate, risk, ambiguity, mode, expected files/LOC.

Keep implementation detail in the plan/issue, not the queue row. If a slice
needs a product answer, mark it human-gated instead of weakening the stop rule.

### 3. Pack

Add slices to one or more compatible queues.

Before packing, check overlap:

- active queue entries and run log;
- source refs/issue families/plans;
- likely changed files or ownership areas;
- dependency order;
- branch/worktree/serial-master constraints;
- release/deploy/cloud/DB permissions.

A packed unattended queue needs:

- primary entries and overflow or next-compatible queue;
- `completion_contract` with done state, timebox gate, continuation policy, and early-stop consent;
- closeout reserve;
- validation for every entry;
- explicit constraints and forbidden risks.

If the window is larger than eligible work, either add safe overflow/next-ready
work or say plainly that the queue will drain and stop early.

### 4. Refill

While a runner drains an active queue, a builder may prepare future queues only
as planning/artifact work. Do not change active implementation paths or create
dependent work that assumes uncommitted worker results.

A refill pass should leave the next runner with one of:

- more eligible entries in the active queue;
- a next compatible ready queue;
- an explicit stop because no safe work remains;
- blockers that need human judgment.

### 5. Learn

At closeout, distinguish:

- queue entries drained;
- user-visible done state completed;
- release/deploy completed, if approved;
- blockers that stopped automation;
- process gaps that made agents slow or unsafe.

If the gap is reusable, update the repo workflow docs or this skill. If it is
project-specific, update the project docs or source artifacts instead.

## Output shapes

### Mining table

```markdown
| Candidate | Bucket | Source | Validation | Stop/Human Gate | Queue hint |
| --- | --- | --- | --- | --- | --- |
| Add CLI timeout guard | queueable-now | `koder/issues/NNN...` | `go test ...` | one call site only | 45m, yellow, low, harnex-light |
```

### Slice handoff

```markdown
Queueable slice:
- Source: `koder/plans/NNN_S01_slug/INDEX.md`
- Capability: <one line>
- Validation: `<commands>`
- Stop: <exact boundary>
- Defer: <human-gated or broader work>
- Queue hint: <estimate/risk/ambiguity/mode>
```

### Conveyor closeout

```markdown
Conveyor result:
- Active queue: <drained/refilled/blocked>
- Next queue: <ready/path or none>
- Overlap check: <clean/evidence>
- User gates: <needed/none>
- Process learning: <none or doc path>
```

## Anti-patterns

- Creating a separate queue when an existing compatible queue should be refilled.
- Packing work that overlaps active implementation ownership.
- Treating plan writing as enough for an away-window execution promise.
- Hiding a product decision inside a “mechanical” slice.
- Claiming completion because primary entries drained while overflow/next-ready work remains.
- Reading worker implementation detail to compensate for weak source artifacts.

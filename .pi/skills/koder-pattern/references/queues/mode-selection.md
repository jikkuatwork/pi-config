---
title: Delivery-first orchestration mode selection
updated: 2026-07-14
---

# Delivery-first orchestration mode selection

Use this gate before creating a queue, dispatching Harnex, or adopting blind
mode. The strongest workflow is not the default workflow.

## Core rule

Choose the lightest shape that preserves the required safety:

- a queue does **not** imply blind orchestration;
- Harnex does **not** imply a multi-worker chain;
- planning/docs/metadata do **not** inherit implementation-grade isolation;
- durable artifacts exist to accelerate delivery, not become the delivered
  outcome unless the user asked for documentation or planning.

## Disclose the outcome first

Before a planning-only window or blind run, tell the user:

1. whether the window produces docs, tests, product code, or a release;
2. expected worker/phase count and rough wall budget;
3. expected canonical artifacts;
4. the stop gate and the first product-visible result.

Do not let a terse “yes” hide that no product code will be written.

## Workflow shapes

| Shape | Use when | Default proof | Do not add |
| --- | --- | --- | --- |
| Direct | Owner present; one bounded capability; primary context can safely hold the work | tests/validation + commit | queue, Harnex, independent review unless risk requires it |
| Supervised delegation | A fresh context helps; work is still owner-present or a single logical change set | one worker receipt + risk-appropriate review | governor/coordinator hierarchy, per-transition workers |
| Blind | Explicit unattended or context-isolated multi-entry execution | bounded coordinator + compact phase proof + independent review | implementation detail in governor context |
| Blind strict | Security, auth, protocol, release, destructive, credential, or similarly high-consequence entries | fresh review per entry/fix + final integrated review | review batching that hides entry-level risk |

`orchestration_mode: blind` selects the last two shapes. Record the strict
profile in the queue/repo overlay when per-entry assurance is required. Ordinary
queues remain direct or may use supervised worker entries without a context
firewall.

## Selection gate

Prefer **direct** when all applicable facts hold:

- owner is present;
- expected work is at most about two hours or one coherent capability;
- risk is green or bounded yellow;
- no unattended resume/context firewall is needed.

Prefer **supervised delegation** when a fresh worker materially helps but a full
blind state machine does not. A plan writer plus one reviewer is the normal
maximum for planning.

Use **blind** only when the owner/window explicitly requests it and at least one
is true:

- substantial multi-entry work must continue unattended;
- implementation context would crowd out safe orchestration;
- independent role isolation is a named acceptance requirement;
- interruption/recovery evidence is worth the process cost.

Use **blind strict** only when entry-level risk justifies review after every
implementation/fix. Do not select it merely because a previous queue used it.

## Planning and artifact economy

Planning-only work defaults to direct or supervised delegation.

- Existing issues with capability, acceptance, validation, ownership, and stop
  rules may be queued directly by path/anchor.
- Do not require a conveyor map plus child plans plus a queue when one canonical
  issue or plan is already executable.
- Do not dispatch a worker solely to change frontmatter, queue status, run log,
  or handoff metadata; the coordinator owns those transitions.
- Batch one coherent artifact/state checkpoint with logical work; do not create one commit per row/phase.
- Internal worker/coordinator rollover uses receipts and checkpoints, not the user-facing close skill or a `STATE.md` rewrite.
- Default planning budget: at most two worker dispatches and 30 minutes, or
  roughly 20% of expected implementation effort, before explicit re-authorization.

If planning exceeds the budget, stop and report product delta (`none` when
true), artifact delta, elapsed time, and the smallest path to implementation.

## Review granularity

- Direct/supervised green work: review only when repo policy or risk requires it.
- Bounded yellow work: one independent review per logical change set is usually
  sufficient.
- Blind strict auth/security/protocol work: retain per-entry review, but allow a clean verdict to remain typed compact proof; require Markdown artifacts for findings and milestone/authority gates.
- Milestone claims: use a separate integrated final review.

Never add a metadata-finalizer worker after an approving review. The
coordinator records approved/ready state directly from typed verdict proof (and
frontmatter when a canonical review exists) plus verified Git evidence.

## Dispatch circuit breakers

Stop and reconfigure instead of repeating orchestration failure:

- two no-op, acknowledgment-only, permission, or boot-failure attempts for the
  same phase;
- one progress-only completion may receive one continuation turn; a second is a
  failed attempt;
- use a short first monitor fence (normally <=10m for plans/reviews and <=20m
  for implementation), then reconcile artifact, Git, process, and receipt facts
  before extending;
- do not wait a full phase cap after the canonical artifact and clean commit
  already exist;
- do not continue a planning chain when its product delta remains zero past the
  disclosed budget.

## Proof ownership

Harnex terminal telemetry and live Git own observed commit identity, changed
paths, and clean/sync state. Workers own semantic artifact reports and command
outcomes.

- Do not ask a model to invent or expand a commit SHA in prose.
- If a report includes a SHA, obtain it with `git rev-parse HEAD` and verify it
  independently.
- A malformed SHA does not erase a valid commit; reconcile once and fix the
  reporting contract rather than launching another semantic phase.

## Progress reporting

At each user-visible checkpoint distinguish:

- **product delta:** source/tests/generated behavior changed;
- **quality delta:** tests/reviews/authority gates passed;
- **process delta:** plans, queues, receipts, or state only;
- **remaining work:** executable slices and external gates.

Never describe process-only movement as product completion.

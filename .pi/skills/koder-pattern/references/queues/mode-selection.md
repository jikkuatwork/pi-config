---
title: Delivery-first orchestration mode selection
updated: 2026-07-15
---

# Delivery-first orchestration mode selection

Use this gate before creating a queue, dispatching Harnex, or adopting blind
mode. The strongest workflow is not the default workflow. This file is the
canonical home of the cross-cutting execution rules (delivery-first, circuit
breakers, proof ownership, progress reporting); other references link here
instead of restating them.

## Core rule

Choose the lightest shape that preserves the required safety:

- a queue does **not** imply blind orchestration;
- Harnex does **not** imply a multi-worker chain;
- planning/docs/metadata do **not** inherit implementation-grade isolation;
- durable artifacts exist to accelerate delivery, not become the delivered
  outcome unless the user asked for documentation or planning.

## Disclose the outcome first

Before a planning-only window or blind run, tell the user: what the window
produces (docs, tests, product code, release), expected worker/phase count and
rough wall budget, expected canonical artifacts, and the stop gate plus first
product-visible result. Do not let a terse "yes" hide that no product code
will be written.

## Two shapes

| Shape | Use when | Default proof |
| --- | --- | --- |
| **Direct** | Owner present; the primary context can safely hold the work. May still dispatch a fresh worker plus a risk-appropriate reviewer for one logical change set — that is delegation, not a mode change. | tests/validation + commit; worker receipt when delegated |
| **Blind** (`orchestration_mode: blind`) | Explicitly authorized unattended or context-isolated multi-entry execution | bounded coordinator + typed phase proof + independent review; see `blind-orchestration.md` |

Review strictness is a flag, not a mode: `review_granularity: entry` requires
a fresh review after every implementation/fix (use for auth, security,
protocol, release, destructive, or credential work); `batch` reviews a bounded
set of lower-risk rows at a named boundary. Do not select `entry` merely
because a previous queue used it.

Prefer direct when the owner is present, the work is roughly one coherent
capability or under about two hours, risk is green or bounded yellow, and no
unattended resume or context firewall is needed. Use blind only when the
owner/window explicitly requests it **and** substantial multi-entry work must
continue unattended, implementation context would crowd out safe
orchestration, role isolation is a named acceptance requirement, or
interruption/recovery evidence is worth the process cost.

## Planning and artifact economy

Planning-only work defaults to direct (at most one plan worker plus one
reviewer).

- Existing issues with capability, acceptance, validation, ownership, and stop
  rules may be queued directly by path/anchor; do not manufacture a conveyor
  map plus child plans plus a queue when one canonical artifact is already
  executable.
- Never dispatch a worker solely to change frontmatter, queue status, run log,
  or handoff metadata; the coordinator owns those transitions and batches them
  with logical work — not one commit per row/phase.
- Internal rollover uses receipts and checkpoints, not the user-facing close
  skill or a `STATE.md` rewrite.
- Default planning budget: at most two worker dispatches and 30 minutes, or
  roughly 20% of expected implementation effort, before explicit
  re-authorization. Past the budget with zero product delta: stop and report
  product delta (`none` when true), artifact delta, elapsed time, and the
  smallest path to implementation.

## Circuit breakers and the process-failure budget

Mechanical enforcement belongs in the harness/runner (see Harnex #56
preflight, #57 outcome classes and failure budgets, #59 conveyor). Until those
run everywhere, apply by hand:

- two no-op, acknowledgment-only, permission, or boot-failure attempts for the
  same phase stop retries until the adapter/config/brief changes;
- one progress-only completion may receive one continuation; a second is a
  failed attempt;
- start with a short first monitor fence (<=10m plans/reviews, <=20m
  implementation), then reconcile artifact, Git, receipt, and process facts
  before extending; never wait a full phase cap after durable proof exists;
- adapter/config/brief changes do **not** reset the run: declare a
  queue-global process-failure budget before an unattended run, and return to
  the owner when total boot/no-op/permission/no-receipt failures cross it;
- run one preflight dispatch smoke for the chosen adapter (and one declared
  fallback) before any unattended run.

## Proof ownership

Harness terminal telemetry and live Git own observed commit identity, changed
paths, and clean/sync state. Workers own semantic artifact reports and command
outcomes.

- Do not ask a model to invent or expand a commit SHA in prose.
- If a report includes a SHA, obtain it with `git rev-parse HEAD` and verify
  it independently.
- A malformed SHA does not erase a valid commit; reconcile once and fix the
  reporting contract rather than launching another semantic phase.

## Review economy

Green direct work: review only when repo policy or risk requires it. Bounded
yellow work: one independent review per logical change set. Strict blind rows:
a clean verdict stays typed compact proof; Markdown artifacts are for findings
and milestone/authority gates only. Milestone claims get a separate integrated
final review. Never add a metadata-finalizer worker after an approving review.

Classify a missing required artifact (unregenerated `dist/`, absent
declaration, failed size gate) as **implementation incomplete** — the row
returns to `implementing` — not as a semantic fix cycle. Fix cycles are for
findings about behavior.

## Progress reporting

At each user-visible checkpoint distinguish **product delta** (source/tests/
generated behavior), **quality delta** (tests/reviews/gates passed), **process
delta** (plans, queues, receipts, state only), and **remaining work**. Never
describe process-only movement as product completion.

---
title: Blind Queue Orchestration
updated: 2026-07-14
---

# Blind Queue Orchestration

Use this route only when the user or queue explicitly selects `orchestration_mode: blind`. Blind mode is a context-isolation contract for substantial queue work, not the default for ordinary coding or small direct entries.

Blind means **blind to implementation detail, not blind to process state**. The orchestration layer still verifies identity, authorization, queue state, commits, changed paths, validation, review verdicts, blockers, and Git safety.

Read `mode-selection.md` before adopting blind mode, `blind-briefs.md` before
dispatch, and `blind-recovery.md` whenever process state, receipts, Git, or queue
state disagree.

## Applicability and delivery-cost gate

Blind mode is exceptional machinery for substantial unattended or explicitly
context-isolated implementation. A queue does not imply blind mode, and Harnex
does not imply a nested chain.

Do not use this protocol by default for:

- owner-present planning, docs, research, or metadata;
- one bounded capability the primary can safely implement and validate;
- status/frontmatter/run-log transitions;
- work whose expected process cost exceeds its product/quality delta.

Planning normally uses direct work or one supervised worker plus one reviewer.
Before any planning-only or blind authorization, disclose the output type,
expected phases/workers, artifact count, wall budget, and stop gate. Apply the
planning and no-op circuit breakers from `mode-selection.md`.

## Keep the repo overlay small

The reusable protocol lives here. A target repo should record only facts that genuinely vary:

- active authorization window and stop gate;
- queue identity, dependency order, and done state;
- branch/worktree and concurrency policy;
- exact validation and quality thresholds;
- forbidden actions and approval gates;
- coordinator entry cap and fix-cycle cap;
- project-specific final review requirements.

Do not paste the full generic protocol into `AGENTS.md`, execution docs, every plan, and every queue row. Prefer:

1. one conditional bootstrap rule in repo instructions;
2. `orchestration_mode: blind` plus caps in queue frontmatter;
3. a concise execution-window/project overlay;
4. self-contained phase briefs generated from `blind-briefs.md`.

A minimal queue overlay is:

```yaml
orchestration_mode: blind
coordinator_entry_cap: 4  # hard maximum; choose 1-3 for complex entries
max_fix_cycles: 2
independent_review: required
implementation_ownership: serial
final_review_required: true
```

For discovery, `koder/STATE.md` may mirror only the active queue/window, `orchestration_mode: blind`, and stop gate so `open` can report the boundary. It should not become a copy of this protocol or a phase-by-phase ledger.

Omit fields that do not apply. Four entries is a ceiling learned from a successful long run, not a target to fill regardless of complexity.

## Adoption workflow

1. Apply `mode-selection.md` and show why direct or one supervised worker is
   insufficient. Do not infer blind from “queue,” “overnight,” or “use workers.”
2. Confirm the user/active window explicitly accepts the disclosed blind process
   cost and product outcome.
3. Read live repo instructions, state, execution window, queue, current source artifact, and live harness guidance.
4. Add or normalize only the queue fields and concise project overlay listed above. Keep implementation detail in issues/plans and generic orchestration law in this skill.
5. Choose branch/worktree ownership, coordinator/fix caps, review granularity,
   final-review policy, runtime receipt root, exact validation, and closeout reserve.
6. Apply the fail-closed launch gate. If declared isolation, review, receipts, or safe resume cannot be enforced, record the blocker instead of weakening the mode.
7. Generate a self-contained coordinator brief from `blind-briefs.md`; add a governor layer only when unattended relaunch or context isolation requires it.
8. Run the declared entry/batch state machine, roll coordinators at the declared boundary, and close with canonical evidence rather than runtime logs.

## Three-layer ownership model

### 1. Governor

The governor is the interactive/root session or durable harness supervisor. For a long or unattended drain it should launch fresh coordinators rather than personally routing every phase.

It may read:

- queue and execution-window metadata;
- coordinator terminal receipts;
- compact exception/blocker receipts;
- live Git and harness status needed to decide resume/stop.

It must not read phase-worker transcripts, implementation diffs, source, test bodies, review findings, or routine panes. It launches the next coordinator from `next_entry`/`next_phase`, or stops at the declared gate.

For a single small blind entry, the current session may act as coordinator and omit a separate governor layer. It must still obey the coordinator firewall and rollover cap.

### 2. Fresh bounded coordinator

A coordinator owns mechanics for at most the queue-declared entry cap:

- eligibility, dependencies, locks, deadline, and stop rules;
- one current entry at a time;
- phase-worker dispatch and work-level fences;
- compact receipt validation and Git checks;
- queue/run-log/issue accounting;
- durable handoff and its own terminal receipt.

It may read the current row's queue summary and only the plan's capability, validation, and stop sections when those facts are not already in row metadata. Prefer passing the canonical plan path to the worker over digesting implementation sections. It must not preload future plan bodies or inspect product source, full diffs, tests, generated output, review findings, worker reasoning, transcripts, routine panes, or long logs.

The coordinator may directly edit only orchestration metadata that the repo assigns to it. It does not implement, review, or repair product work.

### 3. Fresh phase workers

Use separate fresh sessions for:

- `implement` — reads the current plan/source/tests, edits product work, validates, and commits according to repo policy;
- `review` — independently reads the plan and implementation, returns typed verdict/counts/validation, and writes a canonical artifact only for findings or a required gate;
- `fix` — reads the committed finding review directly and fixes only its findings;
- `rereview` — independently checks the fix and writes another canonical artifact only if findings remain or policy requires one;
- `final_review` — checks the integrated queue outcome when the queue requires a final gate;
- `recovery` — owns source-level reconciliation when a previous worker left unknown WIP.

Phase workers must not mutate the queue, run log, `koder/STATE.md`, execution window, or coordinator receipts unless the repo explicitly assigns that authority.

## Context firewall

The coordinator consumes only:

- queue/process metadata and the current row;
- phase identity and attempt number;
- compact typed receipts;
- changed-path lists and commit refs;
- command/exit validation results and compact metrics;
- review verdict and finding counts, plus a path only when a canonical artifact was required;
- blockers and clean/synchronized Git facts.

It does not consume:

- product source or test implementations;
- full diffs or generated bundles;
- full worker prompts, responses, reasoning, transcripts, or panes;
- review finding prose when a fix worker can read the committed review;
- future plans or unrelated issues;
- long command output when command/exit plus a bounded failure excerpt suffices.

Pane or event-log reads are diagnostic exceptions after a stall, disconnect, malformed receipt, or terminal disagreement. Use a bounded tail and do not turn diagnosis into implementation review.

## Launch gate: fail closed

Do not start or continue blind execution unless all applicable checks pass:

- the active window authorizes the current entry and names a stop gate;
- the queue has a completion contract and an eligible reviewed source artifact;
- fresh isolated workers are available through harnex or an explicitly equivalent harness;
- implementation ownership is unambiguous and non-overlapping;
- Git is clean/synchronized as expected, or a known recovery worker owns the recorded WIP;
- phase and coordinator receipt contracts can be enforced;
- independent review is available at the queue-declared entry or batch boundary;
- validation, commit policy, wall caps, forbidden actions, and process budget are explicit;
- the coordinator cap has not been reached;
- no release/deploy/cloud/destructive/credential or owner gate would be crossed.

If any gate fails, record the shortest actionable blocker and stop. Never degrade an explicitly blind queue into one giant direct-coding session.

## Review granularity

Declare one of these in the queue/overlay:

- `entry` (**blind strict**): fresh review after every implementation/fix; use
  for auth, security, protocol, release, destructive, credential, or similarly
  high-consequence work.
- `batch`: only for bounded lower-risk non-overlapping rows; name batch
  boundaries and require independent review before dependent work or milestone
  claims.

Metadata approval/finalization is coordinator work after a normalized review
verdict; never dispatch a worker solely to change statuses.

## Entry state machine

For `review_granularity: entry`, treat every row as a resumable phase machine:

```text
queued
  -> implementing
  -> implemented
  -> reviewing
  -> approved
       or needs_fixes -> fixing -> rereviewing -> approved
       or blocked
```

A queue row is complete only when its required implementation commit exists, required validation is green, independent review approves, Git safety checks pass, and orchestration accounting is updated. A harness process exiting is not itself row completion.

## Strict per-entry loop

1. Verify the launch gate and identify only the first eligible row.
2. Reconcile existing receipts, commits, queue state, and active sessions. Resume at the **first unproven phase**; do not assume the whole row must restart.
3. Generate a bounded self-contained implementation brief and dispatch a fresh worker.
4. Fence on work-level completion. Validate the receipt's schema/identity, commit, changed paths, validation exits, and Git state without reading the diff.
5. Dispatch a different fresh independent review worker.
6. Consume only verdict, finding counts, validation summary, reviewed ref, optional review path/commit, and blocker. A clean approval needs no Markdown artifact unless policy says otherwise.
7. On `needs_fixes`, require a canonical finding review, then dispatch a fresh fix worker that reads it directly followed by a fresh re-review worker. The coordinator never paraphrases findings.
8. Stop and escalate when `max_fix_cycles` is reached, a finding changes architecture/product scope, or validation cannot be made reliable.
9. On approval, hold compact row proof and batch queue/run-log/issue evidence at the next resumable coordinator checkpoint; do not create an approval-only metadata commit.
10. Stop completed sessions promptly, verify branch ownership and Git state, then advance one row.

For `review_granularity: batch`, implementation workers remain fresh and
non-overlapping, but the coordinator fences the declared batch and dispatches one
fresh reviewer over its integrated commit range. On findings, route a fresh fix
worker and re-review before dependent work. Never use batch review to hide
entry-level high risk.

## Dispatch circuit breaker

- One acknowledgment/progress-only completion may receive one continuation; a
  second is a failed attempt.
- Two no-op, boot, permission, or registration failures for one phase stop
  retries until the adapter/config/brief or execution shape changes.
- Start with a short monitor fence, then reconcile artifact, Git, receipt, and
  process facts before extending. Do not wait the full wall cap after durable
  proof already exists.
- If planning or process-only work crosses its disclosed budget with no product
  delta, stop and return to the owner.

## Proof and signal ordering

Workers and coordinators should finish in this order:

1. write/update the canonical artifact;
2. run exact validation;
3. commit and push when required;
4. verify expected HEAD, clean tree, and upstream state;
5. atomically write the compact receipt (temporary file then rename);
6. signal work-level completion;
7. let the parent stop the completed session.

This order makes recovery possible when transport disconnects after useful work lands. A receipt does not replace commit/artifact verification, and a successful harness signal does not replace a receipt. Harnex terminal telemetry and live Git own observed commit identity; workers must not synthesize expanded SHAs in prose. Verify any worker-reported ref with `git rev-parse`.

## Coordinator rollover

- Declare `coordinator_entry_cap` in the queue; use `1-4`, with `4` as a hard default maximum.
- Roll over earlier at an issue/milestone boundary, after complex fix loops, near a deadline, or when live context telemetry reaches the configured high-water mark.
- Before rollover: stop children, batch queue/run-log evidence at one resumable checkpoint, commit/push only what policy requires, verify Git safety, and write the coordinator receipt.
- Internal coordinator rollover does not invoke the user-facing close skill or update `koder/STATE.md` merely to rotate context. The root session performs one real handoff/close at the owner stop gate.
- A fresh coordinator resumes from canonical state and the first unproven phase. It does not replay worker output.
- If no fresh coordinator can relaunch, a clean stop at the rollover boundary is correct; context accumulation is not.

Fixed entry counts are a fallback when live context pressure is unavailable. They do not make a coordinator cheap: nested dispatch bookkeeping can still be large, so prefer smaller caps for validation-heavy or repeatedly fixed entries.

## Final integrated review

When the done state covers multiple entries or a milestone:

1. drain and approve implementation rows;
2. close the last implementation coordinator;
3. launch a separate fresh final-review coordinator/worker;
4. review the integrated commit range and all declared gates;
5. route fixes through the same fix/re-review firewall;
6. stop at the owner/release/deploy gate named by the queue.

The implementation coordinator must not absorb final review merely because rows drained.

## Closeout contract

Leave:

- queue status and first next entry/phase;
- implementation/review/fix commit refs;
- validation results and compact quality metrics;
- review verdict counts and canonical paths only for findings or required gates;
- issue/slice delta and whether the user-visible done state was reached;
- blocker or `null`;
- clean/dirty and upstream state;
- a compact coordinator receipt for the governor.

Runtime receipts and logs are transport evidence, not durable project truth. Promote the minimum needed proof into canonical queue/review/run-log artifacts; do not make future understanding depend on `/tmp` surviving.

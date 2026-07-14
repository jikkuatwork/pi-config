---
status: complete
priority: P1
type: analysis
tags: koder-pattern, orchestration, harnex, delivery, efficiency
created: 2026-07-14
updated: 2026-07-14
source_repo: /home/glasscube/Projects/holmhq/sdk
source_checkpoint: a794acd
applied_sdk_checkpoint: efee699
---

# Analysis 001: Koder-pattern delivery overhead

## Context

The Holm SDK A2R planning window ended `REVIEW_READY` at SDK commit `a794acd`,
but produced no product code. The owner asked whether koder-pattern—especially
its newly generalized blind/Harnex route—caused disproportionate ceremony and
slow progress.

This analysis distinguishes the durable-memory core from optional queue and
blind-execution machinery. It records why the skill is being refined before the
SDK execution policy is reconsidered.

The SDK repository made the amplification visible: `106` commits in roughly
`18h`, including `60` `state:` commits and `14` explicit review commits; operator
Markdown (`8,835` lines) exceeded product TypeScript (`6,742` lines). These are
directional process-cost signals, not a quality judgment about line counts.

## Method

Inspected:

- koder-pattern source and commit `4132a6c`;
- `references/queues/{blind-orchestration,blind-briefs,blind-recovery}.md`;
- queue gates/run and Harnex dispatch/monitoring guidance;
- SDK `AGENTS.md`, execution window, blind contract, Queue `#002`, and State;
- compact Harnex dispatch telemetry from the A2R planning run;
- Review `#026` verdict/counts and Queue `#002` status/estimates.

Commands included:

```bash
git show --stat 4132a6c
wc -l .pi/skills/koder-pattern/references/queues/blind-*.md \
  .pi/skills/koder-pattern/references/harnex/*.md
python <compact-dispatch-summary> /tmp/holm-sdk-a2r-planning-20260714-1225/dispatch.jsonl
grep <queue/review/state fields> /home/glasscube/Projects/holmhq/sdk/koder/...
```

No product source, worker transcript, full diff, private payload, or credential
was copied into this analysis.

## Findings

| Item | Verdict | Evidence | Reasoning |
| --- | --- | --- | --- |
| Trigger surface | too broad | skill description matched ordinary plans, reviews, research, analysis, notes, tasks, and turns | Optional durable-memory machinery could load for normal engineering work even when no artifact or queue was requested. |
| Basic koder memory | keep | `STATE.md`, one real open/close, selected-path commits | Durable handoff was not the main elapsed-time cost. Internal workers repeatedly invoking close was. |
| Commit policy | amplifying | SDK had `60/106` `state:` commits; skill required one for every artifact/status transition | Git became a mirror of orchestration micro-state instead of a sparse milestone ledger. |
| Worker close policy | amplifying | blind rollover required every coordinator to run the repo close workflow | Internal context rotation rewrote `STATE.md` and emitted user-facing handoff commits. |
| Review artifact policy | amplifying | every row and re-review required canonical Markdown plus a commit, even at `0/0/0` | Independence requires a fresh reviewer, not necessarily an approval-only file and commit. |
| Generated queue policy | too prominent | scaffold `AGENTS.md` embedded the blind state machine in every repo | Exceptional machinery became ambient instruction and biased agents toward escalation. |
| Blind subsystem size | overweight for default use | `4132a6c` added 930 lines; queue/Harnex references now exceed 1,700 lines | The protocol optimizes assurance and recovery, not delivery latency; it must remain lazy and exceptional. |
| Source-case bias | high-assurance bias | `references/meta/sdk-blind-orchestration-review.md` | It was learned from a 16-slice unattended implementation queue where nine slices needed fixes. That validates strict mode, not its use for planning. |
| Mode selection | insufficient | queue routes jump from ordinary queue to full blind protocol | The skill says blind is opt-in but lacks an explicit delivery-cost gate and planning exception. |
| SDK overlay | over-applied | SDK `AGENTS.md` hard rule and A2R execution contract | Optional strict machinery became mandatory for planning, metadata, and execution. |
| Artifact economy | failed | A2R created mapping, six plans, queue, two reviews, fix pass, and metadata finalizer | The existing Issue `#016` already had a five-seam ledger; fewer artifacts could have carried the same implementation contract. |
| Dispatch reliability | material delay | nine planning dispatches: three no-op/boot failures; one 4,561-second reviewer session | The review itself completed quickly, but completion signaling held the monitor until timeout. |
| Receipt authority | duplicated incorrectly | two worker reports emitted non-resolving expanded SHAs while Git had valid commits | Harnex/Git should own observed commit identity; workers should not synthesize it in report prose. |
| Independent review | still valuable | Review `#025` caught placeholder plan bodies; Review `#026` approved fixes | The lesson is risk-proportionate review, not removal of review. |
| Product delta visibility | inadequate | A2R planning ended with zero product paths changed | Authorization should disclose “docs only,” expected workers, wall budget, and product outcome before launch. |

## Root cause

The main failure was a **mode mismatch**:

1. A successful strict blind implementation workflow was generalized.
2. The SDK overlay promoted it from optional to universal.
3. A planning-only task inherited implementation-grade isolation, receipts,
   review/fix loops, and metadata finalization.
4. The state protocol then committed every artifact/status movement, internal
   coordinators ran user-facing close, and clean reviews produced durable files.
5. Harnex no-op and completion-signal failures multiplied that fixed overhead.
6. The coordinator did not stop after repeated no-op dispatches or re-authorize
   when planning exceeded a reasonable delivery budget.

Queue and Harnex remain useful. A queue orders resumable multi-slice work;
Harnex isolates substantial implementation and independent review. Neither
should be implied by “write a plan,” “update metadata,” or the mere existence of
a queue.

## Decisions

Refine koder-pattern around a narrow trigger and delivery-first mode gate:

- Ordinary coding/planning/review/research does not trigger the skill unless the
  user/repo requests durable `koder/` output or queue orchestration.

1. **Direct:** owner-present, bounded work; primary may implement and validate.
2. **Supervised delegation:** one fresh worker and risk-appropriate independent
   review; no blind context firewall.
3. **Blind:** explicit unattended/context-isolated queue execution.
4. **Blind strict:** per-entry independent review for security, protocol,
   release, destructive, credential, or similarly high-consequence work.

Defaults:

- planning/docs/metadata use direct or supervised delegation;
- queue does not imply blind, and Harnex does not imply a worker chain;
- existing executable issues may be queue refs without a separate plan/mapping;
- planning gets at most two dispatches and 30 minutes (or roughly 20% of the
  expected implementation effort) before explicit re-authorization;
- two no-op/boot-failure attempts open a circuit breaker;
- short initial monitor fences must reconcile artifact/Git/process evidence
  before extension;
- model-written commit SHAs are not canonical; Git/Harnex observations are;
- coordinators directly perform queue/status/handoff metadata transitions;
- `state:` commits are sparse operator milestones; routine artifacts/statuses
  ride with product/review commits or one batched resumable checkpoint;
- internal coordinators use receipts/checkpoints and never invoke user-facing
  close merely to rotate context;
- clean row reviews may remain typed compact proof; canonical Markdown is
  required for findings and milestone/authority gates;
- queue templates start with ref/status/validation/stop and add scheduling or
  blind fields only when they change safety;
- user updates distinguish product delta from process/artifact delta.

## SDK implication

The SDK should keep Queue `#002` as a six-row dependency checklist. Planning is
finished and must not spawn more plan workers. Queue metadata transitions remain
direct coordinator work. Harnex is reserved for actual implementation and
independent review boundaries.

Because Queue `#002` addresses Holm protocol, caller/auth transitions,
capability ownership, credential safety, and response correlation, independent
per-row review can remain risk-justified even after planning ceremony is removed.
A clean review needs only typed proof; findings and the integrated authority gate
remain canonical artifacts. Internal coordinator rollover must not run `close`.
Its estimates are caps, not time to consume deliberately. The owner launch gate
and `execution_authorized: false` remain unchanged.

## Recommendation

Adopt the delivery-first gate in the global skill and its generated AGENTS
template, add efficiency/circuit-breaker evals, and update the SDK overlay to:

- exclude planning/docs/metadata from blind mode;
- declare Queue `#002` explicitly blind-strict only when implementation is
  separately authorized;
- use the interactive primary as the bounded coordinator rather than adding a
  governor layer when context permits;
- batch direct metadata accounting and avoid internal close/state-commit churn;
- use compact proof for clean row reviews and canonical artifacts for findings;
- stop after repeated no-op dispatches and reconcile short monitor fences;
- report source/test commits and passing gates as progress, not artifact count.

## Verification / Reproduction

```bash
.pi/skills/koder-pattern/tests/cross-harness-smoke.sh
bash -n .pi/skills/koder-pattern/tests/cross-harness-smoke.sh
git diff --check
git status --short --untracked-files=all
```

## Residual Risk

- Harnex adapter completion and receipt behavior may still need changes in its
  own repository; documentation can only fail faster and reconcile safely.
- Relaxing strict review for auth/security/protocol changes would trade speed
  for risk and requires a separate owner decision.
- Queue `#002` estimates need calibration from actual implementation telemetry;
  this analysis does not claim a new delivery ETA.

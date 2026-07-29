---
title: Harnex Dispatch Shape
updated: 2026-07-14
---

# Harnex Dispatch Shape

## When to use harnex

Load `references/queues/mode-selection.md` first. Use Harnex when fresh-session
isolation or supervision materially helps:

- substantial plan writing or independent plan review after the planning budget is disclosed;
- test-suite creation;
- implementation from a bounded plan;
- code review or fix pass;
- long unattended queue entries;
- cross-agent review loops where the orchestrator should stay thin.

Do not use Harnex for ordinary owner-present planning, docs, frontmatter/status
updates, queue accounting, or tiny edits the current agent can safely complete
directly. Harnex does not imply a chain: one supervised worker may be enough.
Exception: once a queue explicitly selects blind mode, declared
implementation/review isolation must be preserved; stop rather than collapsing
it into coordinator code.

## Preflight and circuit breaker

Before a long phase or chain:

1. run `harnex doctor` and live adapter guidance;
2. verify runtime report/log paths are external or ignored;
3. verify the selected adapter/config can write the scoped workspace and receipt;
4. use a short first work fence before granting the full wall cap.

One acknowledgment/progress-only completion may receive one continuation turn.
Two no-op, boot, registration, permission, or receipt-free attempts for the same
phase stop retries until the adapter/config/brief or execution shape changes.
Do not spend the implementation budget debugging orchestration.

For experiments and test harnesses: execute the full happy path locally once
before any remote/cloud attempt (runtime proof — static or grep checks do not
count), and after two failed remote attempts of the same experiment, force a
descope-to-minimal review before a third. Throwaway/experimental tooling
defaults to direct completion by the current session, not dispatch.

## Blind hierarchy

For a long unattended multi-entry blind drain, the root session should act as a thin governor and dispatch fresh bounded coordinator sessions. Each coordinator dispatches fresh phase workers. Carry queue/entry/phase/attempt/coordinator identity through task files and metadata so harnex telemetry and receipts can be reconciled without reading transcripts.

For owner-present or short blind work, the current session should normally act
as the bounded coordinator and omit a governor layer. If nested dispatch is
unavailable, it must stop at its declared cap. Fresh phase-worker isolation and
the queue-declared review boundary remain mandatory.

## Command shape

Generic shape:

```bash
harnex run codex \
  --id <session-id> \
  --tmux <session-id> \
  --timeout 30 \
  --description "Short description" \
  --meta '<json metadata>' \
  --summary-out /tmp/koder-run/dispatch-telemetry.jsonl \
  --context "Read and execute /tmp/task-impl-NNN-attempt-01.md" \
  -- -c model=<model> -c model_reasoning_effort=<effort>
```

Use repo-local model names and effort values. If the repo has no model policy, record the actual choice and why in `--meta`.

## Session naming

Use predictable names so queues, logs, and telemetry can be correlated:

| Prefix | Meaning |
| --- | --- |
| `cx-p-NNN` | plan write or mapping |
| `cx-r-NNN` | plan review |
| `cx-f-NNN` | plan fix / artifact repair |
| `cx-t-NNN` | tests |
| `cx-i-NNN` | implementation |
| `cx-cr-NNN` | code review |
| `cx-cf-NNN` | code fix |

For queue entries, include queue/entry identity when useful, e.g. `cx-i-451-sp4`.

## Metadata contract

Include enough metadata to reconstruct why the dispatch happened:

```json
{
  "phase": "implement",
  "role": "phase-worker",
  "attempt": 1,
  "coordinator_id": "cx-o-004-01",
  "base_commit": "<sha>",
  "issue": 340,
  "plan": 450,
  "queue_id": "004_app_readiness_cli_foundation",
  "entry_id": "AD-1",
  "tier": "B",
  "tdd": true,
  "model": "gpt-5.3-codex",
  "effort": "xhigh",
  "effort_reason": "Implementation from a reviewed CLI/runtime plan.",
  "table_pick": "gpt-5.3-codex/xhigh",
  "telemetry_basis": []
}
```

Required in spirit even if exact schema differs:

- phase and role;
- attempt, parent/coordinator identity, and expected base commit for retryable/blind work;
- source issue/plan/task/review path or number;
- queue id/entry id when queue-dispatched;
- model/effort actually used;
- reason for model/effort;
- validation expectation;
- telemetry output path when supported;
- artifact/validation sidecar path when the live harnex version or repo wrapper supports one.

Do not put secrets, full prompts, private payloads, or sensitive account identifiers in metadata.

## Artifact and validation sidecars

Prefer durable plain-text `koder/` artifacts as the canonical source of truth.
When harnex or a repo wrapper supports machine-readable sidecars, use them as an
evidence index for queue closeout and telemetry, not as a replacement for the
plain-text issue/plan/review.

A good review contract names typed proof first and a conditional durable output:

```text
Write machine-readable verdict/counts/validation proof to
`$HARNEX_ARTIFACT_REPORT_PATH`. Write a canonical review at
`koder/reviews/NNN_slug/01_review.md` only for findings, a milestone/authority
review, or when repo policy requires one. A clean row approval may return no
review path.
```

Sidecar payloads should stay compact and versioned: semantic status,
validation commands/exit codes, typed finding/risk/gate summaries, evidence
refs, confidence, and canonical refs. Harnex terminal telemetry plus live Git
own observed commit identity, changed paths, and clean/sync state; do not ask a
model to invent or expand those values in summary prose. Never store
transcripts, full prompts, review finding prose, secrets, or large private
payloads in telemetry sidecars.

For blind queues, use the brief and proof contracts in `references/queues/blind-orchestration.md`. Harnex's native `--artifact-report` / `harnex.artifact_report.v1` is the one phase receipt; do not define a duplicate skill-level receipt schema. Write reports atomically and only after canonical artifacts, validation, commit/push, and Git checks. Runtime reports are an execution API, not the sole durable proof.

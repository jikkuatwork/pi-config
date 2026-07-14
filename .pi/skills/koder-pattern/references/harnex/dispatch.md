---
title: Harnex Dispatch Shape
updated: 2026-07-14
---

# Harnex Dispatch Shape

## When to use harnex

Use harnex when work should be delegated to a separate agent session and tracked as an artifact-producing operation:

- plan writing or plan review;
- test-suite creation;
- implementation from a bounded plan;
- code review or fix pass;
- long unattended queue entries;
- cross-agent review loops where the orchestrator should stay thin.

Do not use harnex for tiny ordinary edits the current agent can safely complete directly, or when the repo lacks harnex and no worker harness is available. Exception: once a queue explicitly selects blind mode, even a small implementation/review phase must preserve worker isolation; stop rather than collapsing it into coordinator code.

## Blind hierarchy

For a multi-entry blind drain, the root session should act as a thin governor and dispatch fresh bounded coordinator sessions. Each coordinator dispatches fresh phase workers. Carry queue/entry/phase/attempt/coordinator identity through task files and metadata so harnex telemetry and receipts can be reconciled without reading transcripts.

If nested dispatch is unavailable, one current session may act as a bounded blind coordinator, but it must stop at its declared cap. Fresh phase-worker isolation and independent review remain mandatory.

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

A good worker contract names both outputs:

```text
Write the canonical review to `koder/reviews/NNN_slug/01_review.md`.
Write machine-readable validation/artifact proof to `$HARNEX_ARTIFACT_REPORT_PATH`
if that variable is set; otherwise summarize the validation commands in the
canonical review.
```

Sidecar payloads should stay compact and versioned: identity, status, commit, changed paths, validation commands/exit codes, typed finding/risk/gate summaries, evidence refs, confidence, canonical refs, byte size/hash where available. Never store transcripts, full prompts, review finding prose, secrets, or large private payloads in telemetry sidecars.

For blind queues, use the phase and coordinator contracts in `references/queues/blind-briefs.md`. Prefer Harnex's native `--artifact-report` / `harnex.artifact_report.v1` as the phase receipt and combine it with first-class attribution plus the terminal dispatch summary; do not require a duplicate `koder.blind.phase.v1` file. Write reports atomically and only after canonical artifacts, validation, commit/push, and Git checks. Runtime reports are an execution API, not the sole durable proof.

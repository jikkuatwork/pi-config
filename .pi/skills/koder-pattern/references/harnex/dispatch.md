---
title: Harnex Dispatch Shape
updated: 2026-06-05
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

Do not use harnex for tiny edits the current agent can safely complete directly, or when the repo lacks harnex and no worker harness is available.

## Command shape

Generic shape:

```bash
harnex run codex --id <session-id> --tmux <session-id> --timeout 30   --description "Short description"   --meta '<json metadata>'   --summary-out koder/scratch/dispatch-telemetry.jsonl   --context "Read and execute /tmp/task-impl-NNN.md"   -- -c model=<model> -c model_reasoning_effort=<effort>
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

- phase;
- source issue/plan/task/review path or number;
- queue id/entry id when queue-dispatched;
- model/effort actually used;
- reason for model/effort;
- validation expectation;
- telemetry output path when supported.

Do not put secrets, full prompts, private payloads, or sensitive account identifiers in metadata.

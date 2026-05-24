---
title: Harnex Dispatch Pattern
updated: 2026-05-24
source_pattern: Holm harnex-dispatch/task-brief/agent-operations overlay, generalized
---

# Harnex Dispatch Pattern

Use this reference when a queue or review workflow needs to dispatch worker agents through `harnex`. Treat live `harnex --help`, `harnex agents-guide`, and repo-local workflow docs as the authority when installed behavior differs.

## When to use harnex

Use harnex when work should be delegated to a separate agent session and tracked as an artifact-producing operation:

- plan writing or plan review;
- test-suite creation;
- implementation from a bounded plan;
- code review or fix pass;
- long unattended queue entries;
- cross-agent review loops where the orchestrator should stay thin.

Do not use harnex for tiny edits the current agent can safely complete directly, or when the repo lacks harnex and no worker harness is available.

## Preconditions

Before dispatching:

1. Read repo instructions and the source issue/plan/review/queue entry.
2. Confirm harnex is available:
   ```bash
   harnex --help
   harnex agents-guide
   ```
3. Confirm risky actions are allowed by the user and queue constraints.
4. Prepare a bounded brief. Missing bounds make the dispatch invalid.
5. Decide whether implementation must be serial on the current branch or isolated in a worktree.

## Required brief bounds

Every worker brief must include these controls:

```text
Depth bounds:
- Prior digestion: The issue/plan/review artifact already encodes the design.
  Do not re-derive project semantics from source unless a specific blocking
  question is unanswered by existing docs.
- Read budget: Read only files required for this phase. Target <= <N> files.
  If you hit the budget, stop exploring and produce the artifact from current evidence.
- Output ceiling: Target <min-max> lines for this artifact. If draft exceeds
  the ceiling, trim before finalizing.
- Override path: If a specific question genuinely blocks completion, stop
  research and list it under "Open Questions" in the reply.

Effort tier per phase:
- Phase <name>: <model/effort or repo-local tier> — why this level is needed.
```

Also include:

- exact source artifact paths;
- explicit output path(s);
- validation command(s);
- done-marker or return contract;
- commit policy: whether the worker should commit or leave changes unstaged;
- forbidden actions, especially deploy/cloud/destructive/secret operations.

## Task file convention

For briefs longer than a few lines, write a task file instead of embedding a huge `--context` string:

```text
/tmp/task-plan-NNN.md
/tmp/task-impl-NNN.md
/tmp/task-review-NNN.md
/tmp/task-fix-NNN.md
```

A task file should be self-contained and point to repo artifacts rather than pasting large content.

## Dispatch command shape

Generic shape:

```bash
harnex run codex --id <session-id> --tmux <session-id> --timeout 30 \
  --description "Short description" \
  --meta '<json metadata>' \
  --summary-out koder/scratch/dispatch-telemetry.jsonl \
  --context "Read and execute /tmp/task-impl-NNN.md" \
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

Required in spirit even if the exact schema differs:

- phase;
- source issue/plan/task/review path or number;
- queue id/entry id when queue-dispatched;
- model/effort actually used;
- reason for model/effort;
- validation expectation;
- telemetry output path when supported.

Do not put secrets, full prompts, private payloads, or sensitive account identifiers in metadata.

## Monitoring

Prefer harnex-native wait/monitor commands when available. For unattended work, use a background bash sweeper or equivalent low-context monitor rather than repeatedly reading panes into the orchestrator conversation.

Basic done-marker pattern:

```bash
start=$(date +%s)
max_wait=5400 # 90m example
until [[ -f /tmp/cx-i-NNN-done.txt ]]; do
  if [ "$(($(date +%s) - start))" -gt "$max_wait" ]; then
    echo "WALL-CLOCK CAP HIT" >&2
    exit 2
  fi
  harnex status --id cx-i-NNN >/dev/null 2>&1 || true
  sleep 60
done
```

If the repo provides a sweeper such as `scripts/harnex/sweep.sh`, prefer it:

```bash
until [[ -f /tmp/cx-i-NNN-done.txt ]]; do
  scripts/harnex/sweep.sh cx-i NNN
  sleep 60
done
```

Stop completed sessions promptly:

```bash
harnex stop --id cx-i-NNN
```

## Wall-clock caps

Use explicit caps so one stuck worker cannot consume the entire queue window:

| Shape | Suggested cap |
| --- | ---: |
| Small direct worker / Tier C | 30m |
| Plan + implementation / Tier B | 90m |
| Full chain plan-review-impl-review-fix / Tier A | 3h |

Tune for repo/model reality, but always write a cap into the queue entry or task brief.

## Blind orchestrator rule

The orchestrator manages routing, not implementation detail.

The orchestrator may read:

- source artifact summaries;
- harnex status/summary output;
- done markers;
- changed-path lists;
- validation results;
- review verdict summaries.

The orchestrator should avoid reading:

- large worker diffs;
- full worker transcripts;
- generated plans/reviews when the worker can commit them and validators can check shape.

If judgment is needed, dispatch a review worker. If the orchestrator must inspect the full diff to feel safe, the entry was too risky for blind queue execution.

## Queue integration

When a queue entry mode is `harnex-light` or `harnex-chain`:

1. Copy queue metadata into the dispatch `--meta`.
2. Include the queue entry's validation and stop rule in the task brief.
3. Require a done marker, committed artifact, or summary line as the return contract.
4. On completion, run validation from the orchestrator or require the worker to show proof.
5. Update the queue run log with dispatch id, status, validation result, commit/review path, and blocker if any.
6. If blocked, stop/park the session and move to the next eligible queue entry.

## Anti-patterns

- Raw `tmux` instead of harnex when harnex is available.
- `--detach` with no monitor/stop plan.
- Dispatching without brief bounds.
- Embedding huge prompts/transcripts in `--context`.
- Reading every worker pane for progress.
- Leaving completed sessions running.
- Letting workers mutate `koder/STATE.md` unless the repo explicitly wants that.
- Hiding model/effort choice in wrappers with no metadata.

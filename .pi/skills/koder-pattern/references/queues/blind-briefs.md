---
title: Blind Orchestration Briefs and Receipts
updated: 2026-07-14
---

# Blind Orchestration Briefs and Receipts

Use with `blind-orchestration.md`. Task files are runtime control surfaces; canonical plans, reviews, queue state, and commits remain project truth.

## Runtime layout

Keep prompts, receipts, and long logs outside tracked source or under an explicitly ignored scratch root:

```text
<runtime-root>/
  governor/
  coordinator-01/
    coordinator.json
    S01-implement.md
    S01-implement.json
    S01-review.md
    S01-review.json
    logs/
```

Use predictable queue/coordinator/entry/phase names. Do not put secrets, private payloads, full transcripts, or credentials in task files, metadata, receipts, or logs.

## Prefer the harness-native phase report

When Harnex is available, do not create a second custom phase sidecar. Use live Harnex guidance plus:

- first-class queue/entry/phase/attempt/parent attribution flags;
- `--artifact-report <runtime-path>`;
- the worker-provided `$HARNEX_ARTIFACT_REPORT_PATH`;
- `harnex.artifact_report.v1` for canonical refs, validation, typed gate/review/blocker summaries, and semantic outcome;
- the Harnex terminal summary for process/work state, commit/Git observations, changed paths, usage/context, reliability, and artifact-report ingestion status.

For review phases, require normalized `verdict`, `p1`, `p2`, and `p3` in canonical review frontmatter; the coordinator may read that bounded header without opening finding prose. Together, the Harnex surfaces plus canonical frontmatter provide the phase contract without duplicating identity and Git facts in another JSON file. The coordinator may normalize them in memory or into a concise queue run-log event, but should not require both a Harnex report and `koder.blind.phase.v1` for the same phase.

Use the portable fallback schema below only when the active isolated harness lacks an equivalent typed report, or when writing a harness-neutral fixture/evaluation. The coordinator terminal receipt remains separate because it carries queue continuation state (`next_entry`, `next_phase`) that Harnex's current artifact report does not model directly.

## Required controls in every brief

Every coordinator or phase brief must state:

1. **Role and non-role** — e.g. “fresh review worker, not implementer or coordinator.”
2. **Authorization** — active window, exact entry/phase, and hard stop gate.
3. **Prior digestion** — canonical issue/plan/review already encodes semantics; do not re-derive unrelated architecture.
4. **Identity** — repo, branch/worktree, queue, entry, phase, attempt, relevant base/commit refs, parent coordinator.
5. **Read budget** — numeric artifact/file cap and forbidden future/unrelated reads.
6. **Write ownership** — exact allowed output paths and explicit queue/STATE prohibitions.
7. **Output ceiling** — canonical artifact and final-response limits; no pasted diffs/logs.
8. **Exact validation** — commands, expected exits, quality thresholds, and whether red evidence is required.
9. **Commit policy** — commit/push or leave unstaged, subject policy, generated artifacts, and clean/sync expectation.
10. **Return contract** — receipt path/schema and proof-before-signal ordering.
11. **Override/block path** — conditions that stop work rather than broaden scope.
12. **Forbidden actions** — release/deploy/cloud/destructive/credential/cross-repo or project-specific gates.
13. **Wall-clock cap** — phase cap plus global no-new-work/closeout deadlines.

Reference canonical artifacts by path. Do not paste their full bodies into the brief.

## Phase ownership matrix

| Phase | May read | May write | Must return |
| --- | --- | --- | --- |
| `implement` | current plan, required source/tests/config | scoped product/tests/generated artifacts | commit, paths, red proof when required, validation, Git state |
| `review` | plan, implementation diff/source/tests, required rules | canonical review only | review commit/path, verdict/counts, validation, Git state |
| `fix` | plan, canonical review, scoped implementation | finding-scoped product/tests/generated artifacts | fix commit, paths, red proof when applicable, validation, Git state |
| `rereview` | plan, review, fix diff/source/tests | canonical re-review only | review commit/path, verdict/counts, validation, Git state |
| `recovery` | recorded WIP plus current plan/review | only the interrupted phase's scope | reconciled commit or blocker, validation, Git state |
| `final_review` | integrated range and milestone contracts | canonical final review only | verdict/counts, full-gate validation, metrics, Git state |

A reviewer never fixes. A fixer does not rewrite the review. The coordinator does neither.

## Compact phase brief skeleton

Adapt this rather than copying a project-specific prompt:

```markdown
# <entry> <phase> — Queue <id> / coordinator <id>

You are a fresh **<phase role>** for `<repo>`, not <excluded roles>.

## Authorization and identity
- Window/stop gate: <exact boundary>
- Queue / entry / phase / attempt: <ids>
- Branch or worktree: <ownership>
- Base / implementation / review refs: <applicable refs>
- Canonical input: `<path>`
- Canonical output: `<path or none>`
- Receipt: `<Harnex artifact-report path or portable fallback path>`

## Prior digestion
The approved source artifacts encode the intended behavior. Work only this phase;
do not load future queue plans or invent missing product decisions.

## Bounds
- Read budget: <= <N> relevant files.
- Output ceiling: <artifact/response limits>.
- Wall cap: <duration>; no new work after <deadline>.
- Override: stop with a blocker on <conditions>.

## Allowed work
- <phase-specific reads/edits>

## Exact validation
- `<command>` -> expected exit 0
- <red evidence / quality thresholds when applicable>

## Commit and Git contract
- <commit/push policy>
- Do not mutate queue, run log, STATE, execution window, or unrelated work.
- Finish at expected HEAD with clean/synchronized state when applicable.

## Forbidden
- <permission and scope gates>

## Return order
Canonical artifact -> validation -> commit/push -> Git check -> atomic receipt ->
work-complete signal. No code, findings, diffs, transcripts, or long logs in receipt.
```

## Portable phase receipt fallback

Use this versioned compact object only when no harness-native typed phase report is available. Omit genuinely inapplicable optional fields, but do not rename identity fields per phase.

```json
{
  "schema": "koder.blind.phase.v1",
  "status": "completed|blocked|failed",
  "queue": "NNN",
  "entry": "SNN",
  "phase": "implement|review|fix|rereview|recovery|final_review",
  "attempt": 1,
  "base_commit": "<sha-or-null>",
  "commit": "<sha-or-null>",
  "changed_paths": ["path"],
  "red_evidence": {"command": "...", "observed": true},
  "validation": [{"command": "...", "exit": 0}],
  "metrics": {"name": 100},
  "review": {
    "path": "koder/reviews/...",
    "verdict": "approve|needs_fixes|blocked",
    "p1": 0,
    "p2": 0,
    "p3": 0
  },
  "clean_synced": true,
  "blocker": null,
  "finished_at": "<ISO-8601>"
}
```

Rules:

- `status: completed` means the phase contract finished, not necessarily that the row is approved.
- A completed review may legitimately return `needs_fixes`.
- `commit` is the phase's implementation/fix/review commit, not whatever HEAD happens to be later.
- `changed_paths` is a list only; no diff content.
- `validation` records command and exit, not full output. Store long logs outside the repo and include a bounded failure excerpt only in a blocker artifact when needed.
- `review` contains path/verdict/counts only. Finding prose stays in the canonical review for the fix worker.
- Use `clean_synced: null` when no upstream exists rather than claiming synchronization.
- A blocker must be short, actionable, and free of implementation dumps.

Write portable receipts atomically, for example by writing `<path>.tmp` and renaming after JSON validation. For Harnex, write `harnex.artifact_report.v1` atomically to `$HARNEX_ARTIFACT_REPORT_PATH` before signaling completion. A partial or failed-ingest report is an unknown result, not success.

## Coordinator brief additions

A coordinator task uses the same controls plus:

- exact entry cap (`1-4`) and current count;
- current/first eligible entry and any already-proven phases;
- global no-new-work and closeout deadlines;
- implementation ownership/concurrency rule;
- child session naming and receipt root;
- max fix cycles;
- final-review policy;
- permission to edit queue/run-log/state metadata only;
- requirement to run the repo close workflow before terminal receipt;
- prohibition on launching its own successor.

The parent governor launches successors. This keeps the coordinator bounded and gives the governor one compact terminal event per segment.

## Coordinator receipt schema

```json
{
  "schema": "koder.blind.coordinator.v1",
  "status": "completed|partial|blocked|failed",
  "queue": "NNN",
  "coordinator": "01",
  "completed_entries": ["S01"],
  "next_entry": "S02|final_review|null",
  "next_phase": "implement|review|fix|rereview|final_review|null",
  "state": "IN_PROGRESS|REVIEW_READY|BLOCKED|DONE",
  "commits": ["sha"],
  "validations": [{"scope": "S01", "status": "pass|fail"}],
  "clean_synced": true,
  "blocker": null,
  "closed_at": "<ISO-8601>"
}
```

The receipt is process-only. Do not include source summaries, finding prose, implementation reasoning, prompt text, or long logs.

## Governor behavior

The governor validates only:

- receipt parses and matches the expected queue/coordinator;
- completed entries and next phase are consistent with canonical queue state;
- listed commits exist;
- Git ownership/safety is acceptable;
- no stop gate or coordinator cap was crossed.

Then it either launches a fresh coordinator with a new self-contained task file or stops. It does not replay child receipts into the next prompt; the next coordinator reads canonical state and only the receipts needed for its first unproven phase.

## Review and fix handoff

On `needs_fixes`:

1. coordinator records only review path, verdict, and counts;
2. fix brief points directly to the committed review artifact;
3. fix worker reads findings and returns a compact fix receipt;
4. fresh re-review worker reads review plus fix;
5. coordinator consumes only the new verdict/counts/path.

Never translate findings through coordinator or governor context.

## Canonical proof vs runtime evidence

Receipts are an execution API. Before closeout, promote durable facts needed later into queue/review/run-log artifacts:

- phase and commit refs;
- exact commands and pass/fail;
- review path/verdict/counts;
- required red-evidence fact or quality metrics;
- blocker and next phase.

Do not cite an ephemeral receipt path as the only proof of a durable claim.

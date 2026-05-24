---
title: Research, Analysis, Notes, Tasks, and Scratch
updated: 2026-05-24
---

# Research, Analysis, Notes, Tasks, and Scratch

Use these artifact types when issue/plan/review/queue is too narrow or too operational for the work being captured.

## Research

Research is open-ended exploration. It may compare alternatives, map a domain, evaluate feasibility, or synthesize external/local sources. It does not need a parent issue.

### Path

```text
koder/research/NNN_short_topic/INDEX.md
```

### Template

```markdown
---
status: active
topic: Short topic
tags: area, topic
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# Research NNN: Topic

## Question

What are we trying to learn?

## Sources

- Local paths, commands, docs, URLs, prior artifacts.

## Findings

### Finding 1

Evidence and interpretation.

## Options / Alternatives

- Option A: tradeoffs.
- Option B: tradeoffs.

## Recommendation

What should change, if anything?

## Follow-ups

- [ ] File issue/plan if this becomes actionable.
```

### Good research qualities

- Separates evidence from recommendation.
- Records source quality and contradictions.
- Produces follow-up issues/plans only when action is clear.
- Avoids becoming a dumping ground for full transcripts or raw private data.

## Analysis

Analysis is a scoped audit, inventory, mapping, scorecard, or diagnostic often tied to an issue/plan. It is usually less open-ended than research.

### Path

```text
koder/analysis/NNN_short_topic/INDEX.md
```

### Template

```markdown
---
status: complete
priority: P1
issue: NNN
type: analysis
tags: area, topic
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# Analysis NNN: Topic

## Context

Parent issue/plan and scope boundaries.

## Method

What was inspected, commands run, files read, scoring rules.

## Findings

| Item | Verdict | Evidence | Notes |
| --- | --- | --- | --- |
| Example | pass/fail/watch | path or command | short note |

## Recommendation

Actionable summary.

## Verification / Reproduction

```bash
commands or queries used
```

## Residual Risk

What remains unknown or intentionally out of scope.
```

### Good analysis qualities

- Has a defined scope and method.
- Produces evidence that can be rerun or inspected.
- Makes follow-up actions explicit.
- Does not pretend an audit is a plan; extract plans separately.

## Notes

Notes are lightweight durable memory for decisions, lessons, or process design that does not need status tracking.

### Path

```text
koder/notes/NNN_short_topic/INDEX.md
```

### Template

```markdown
---
topic: Short topic
tags: architecture, decisions
created: YYYY-MM-DD
---

# Note NNN: Topic

## Summary

Short durable context.

## Decisions / Lessons

- Bullet list of durable facts.

## Links

- Related issues/plans/reviews/source paths.
```

Use notes sparingly. If there is acceptance criteria, file an issue. If there is implementation sequence, file a plan. If there is a verdict, file a review.

## Tasks

Tasks are advanced state-machine records for multi-step orchestration. Use them only when the repo has a task runner/validator or when many dependent worker steps need resumable state.

### Path

```text
koder/tasks/NNN_short_task/INDEX.md
```

### Frontmatter shape

```yaml
---
task: NNN
title: Short title
chain: parent_chain_or_null
parent_issue: NNN
layer: 1
status: pending
deps: []
dispatch_id: null
plan_path: null
review_tag: null
attempts: 0
started_at: null
completed_at: null
commit_sha: null
created: YYYY-MM-DD
---
```

### Body shape

```markdown
# Task NNN: Title

## Brief

Worker instructions and source refs.

## Log

YYYY-MM-DDTHH:MMZ | pending -> dispatched | dispatch=<id>
```

Tasks should have a finite status machine and validator. Without those, prefer plans plus queues.

## Scratch

`scratch/` is for transient work products:

- worker briefs;
- temporary proofs;
- dispatch summaries;
- command output snapshots;
- session-specific notes.

Scratch is **not canonical**. Promote durable decisions to issues/plans/reviews/analysis/notes before relying on them.

Rules:

- Do not store secrets or private payloads.
- Do not require future agents to read huge scratch logs to understand current state.
- Link scratch artifacts only when they are concise evidence and likely to remain useful.
- Clean or archive scratch according to repo policy; do not churn large generated files casually.

## Session state

`koder/STATE.md` is a tiny cross-session handoff, not history. Keep it short and current:

```markdown
# Koder State

## Past
- What was completed or decided.

## Present
- Current repo state, dirty work, active focus.

## Future
- Next likely tasks, risks, commands.
```

Detailed chronology belongs in changelogs, run logs, issues, or reviews. Update session state at closeout if the repo workflow asks for it.

## Bench / evidence stores

A `koder/bench/` or equivalent directory can hold reproducible run outputs, baselines, and reports. Treat it as evidence, not prose:

- keep raw machine-readable outputs under run IDs;
- write a short summary or analysis artifact when interpreting results;
- avoid committing massive generated data unless the repo expects it;
- record environment, version, commit, and command lines for reproducibility.

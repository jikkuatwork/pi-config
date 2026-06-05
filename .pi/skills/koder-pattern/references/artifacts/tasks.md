---
title: Koder Tasks
updated: 2026-06-05
---

# Koder Tasks

Tasks are advanced state-machine records for multi-step orchestration. Use them only when the repo has a task runner/validator or when many dependent worker steps need resumable state.

## Path

```text
koder/tasks/NNN_short_task/INDEX.md
```

## Frontmatter

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

## Body

```markdown
# Task NNN: Title

## Brief

Worker instructions and source refs.

## Log

YYYY-MM-DDTHH:MMZ | pending -> dispatched | dispatch=<id>
```

## Rules

- Tasks need a finite status machine and validator.
- Without those, prefer plans plus queues.
- Keep worker briefs bounded and source-linked; do not paste full transcripts.
- Update attempts, dispatch IDs, commits, and blockers as state changes.

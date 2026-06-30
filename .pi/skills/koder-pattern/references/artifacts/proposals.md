---
title: Koder Proposals
updated: 2026-06-30
---

# Koder Proposals

Use a proposal when an idea is larger than one issue, still needs convergence,
or should act as an RFC/specification before work is split into issues, plans,
or queues.

A proposal is for cross-cutting architecture, product/runtime shape, or durable
operator vision. It is not the execution tracker; extract issues/plans after the
proposal converges.

## Path

```text
koder/proposals/NNN_short_slug/INDEX.md
```

Use `turns/` for discussion/history when the proposal evolves through multiple
agent or user rounds:

```text
koder/proposals/001_universal_app_runtime/
  INDEX.md
  turns/
    01_user_context.md
    02_codex_review.md
    03_convergence.md
```

## Frontmatter

```yaml
---
status: draft          # draft | converged | split | superseded
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: architecture-proposal
tags: runtime, apps
source:
  - koder/scratch/NN_source.md
related_issues:
  - 123_existing_issue
# superseded_by: koder/proposals/NNN_other/INDEX.md
---
```

## Status vocabulary

- `draft` — active discussion; do not extract implementation plans as settled.
- `converged` — accepted direction; child issues/plans may be extracted.
- `split` — child issues/plans have been filed and now track execution.
- `superseded` — replaced by another proposal or issue.

## Template

```markdown
---
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: architecture-proposal
tags: area, topic
source: []
related_issues: []
---

# Proposal NNN: Title

## Thesis

One or two paragraphs describing the durable direction.

## Why This Proposal Exists

The pressure, opportunity, or design gap that is larger than one issue.

## Current Decisions

- Decision that currently appears settled.
- Decision that still needs explicit confirmation.

## Proposed Shape

The canonical model, contract, topology, or system behavior.

## Compatibility and Migration

How existing work keeps functioning and how adoption should proceed.

## Child Issues to Extract

- Issue-sized work item.
- Research/probe item.
- Implementation item.

## Open Questions

- Question blocking convergence.

## Proposal Convergence Criteria

- Observable condition that makes this ready to mark `converged`.
```

## Convergence and extraction

When discussion changes the proposal, update `INDEX.md` as the canonical current
spec. Preserve substantial discussion in `turns/` when useful, but do not make
future agents reconstruct the current proposal from turns alone.

After convergence:

1. Set `status: converged` and refresh `updated`.
2. Extract child issues/plans with links back to the proposal.
3. When extraction is complete enough that execution has moved to child
   artifacts, set `status: split`.

## Good proposal qualities

- Explains why an issue is too small or premature.
- States explicit non-goals and rejected alternatives.
- Links source scratch/discussion and related issues.
- Separates durable decisions from open questions.
- Names child issues to extract without hiding execution in the proposal.
- Is safe to commit: no secrets, private payloads, full prompts, or large copied
  source/output.

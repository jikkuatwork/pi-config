---
title: Koder Plans
updated: 2026-07-01
---

# Koder Plans

Use a plan when an issue is ready for a bounded implementation, mapping, or investigation slice. A plan converts problem intent into a testable sequence.

## Path

```text
koder/plans/NNN_short_slug/INDEX.md
```

## Frontmatter

```yaml
---
plan: NNN
title: Short title
issue: NNN
type: implementation # implementation | mapping | analysis | research
status: draft        # draft | in_review | approved | implemented | superseded
slice_id: optional-short-slice-id
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

## Template

```markdown
---
plan: NNN
title: Short title
issue: NNN
type: implementation
status: draft
# slice_id: optional-short-slice-id
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# Plan NNN: Title

## User Decisions Captured

- Decisions, constraints, or explicit delegations from the user.

## Capability Statement

One sentence: this plan proves/adds exactly one capability.

## Slice Accounting (optional)

Use when the source issue has a `Slice Ledger` or when this plan should count as
one checkable slice in a queue closeout.

- Slice: short stable name.
- Parent seam: runtime / CLI / docs / live proof / etc.
- Closure gate: local validation, release, live proof, or user decision.

## Triage

- Tier: XS/S/M/B/L or repo-local scale.
- Risk: green/yellow/red.
- TDD/review posture: tests first, docs first, review required, etc.

## Layers / Steps

### L1: First bounded slice

- What changes.
- What tests/validation prove it.
- What stays deferred.

### L2: Next slice

- Keep each layer small enough to review independently.

## Diff Budget

- Target files/LOC per layer if the repo uses thinness budgets.
- Stop/split trigger if the implementation grows.

## Acceptance Criteria

- [ ] Concrete behavior or artifact.
- [ ] Validation command passes.

## Verification

```bash
command that proves this plan
```

## Deferred / Non-Goals

- Longer than the in-scope list for thin plans when possible.

## Stop Rules

- Conditions that should stop implementation and ask/update design.
```

## Good plan qualities

- One capability, not a roadmap.
- Defers adjacent work aggressively.
- Names exact validation commands.
- Captures user decisions so implementers do not re-litigate them.
- References current issue/review/source paths instead of copying long prose.
- Includes a stop rule for scope creep, ambiguous design, or unexpected source drift.
- For track/mapping issues, names the slice it advances so queue closeouts can report slice deltas, not only issue-count deltas.

## Thinness checks

Use these before implementation when the repo has no stricter gate:

- Can the capability be stated in one sentence?
- Is the defer/non-goal list at least as important as the in-scope list?
- Are tests or validation possible before dependent layers exist?
- Is the expected diff small enough to review?
- Does the plan build on existing seams rather than rewriting them?
- Would a reviewer know exactly what to approve or reject?

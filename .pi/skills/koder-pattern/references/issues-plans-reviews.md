---
title: Filing Issues, Plans, and Reviews
updated: 2026-05-24
---

# Filing Issues, Plans, and Reviews

## What “file” means

To **file** an issue, plan, or review is to create or update a durable `koder/` artifact that another agent can use without chat history. A filed artifact has:

- a canonical path and stable number/slug;
- frontmatter with status/routing metadata;
- source links to related artifacts/code;
- clear acceptance, validation, or verdict;
- no secrets/private payloads;
- a commit or explicit note if the repo workflow requires commits.

## File an issue

Use an issue when there is a problem, opportunity, design decision, audit finding, or follow-up that needs durable tracking.

### Path

```text
koder/issues/NNN_short_slug/INDEX.md
```

### Minimal issue template

```markdown
---
status: open
priority: P2
created: YYYY-MM-DD
tags: area, topic
type: feature
context: One-line why this issue exists.
---

# Issue NNN: Title

## Problem

What is wrong, missing, risky, or undecided?

## Context

Source links, prior decisions, user constraints, related artifacts.

## Proposed Direction

Optional. Use when there is a likely path but not yet a thin plan.

## Acceptance Criteria

- [ ] Observable condition that proves the issue is addressed.
- [ ] Validation command, artifact, or user-facing behavior where possible.

## Non-Goals

- What this issue explicitly does not cover.
```

### Good issue qualities

- Focused on **why** and **what success means**, not detailed implementation.
- Carries enough context for plan extraction.
- Has related issue/plan/review links when known.
- Uses `turns/` for long discussion and keeps `INDEX.md` current after convergence.

### Status updates

When resolving or superseding:

1. verify evidence (commit, tests, release, review, or user decision);
2. edit frontmatter `status`;
3. add a short `resolved:` or `superseded_by:` note if the repo uses those fields;
4. mention the evidence path/commit in the body.

## File a plan

Use a plan when an issue is ready for a bounded implementation, mapping, or investigation slice. A plan converts problem intent into a testable sequence.

### Path

```text
koder/plans/NNN_short_slug/INDEX.md
```

### Minimal plan template

```markdown
---
plan: NNN
title: Short title
issue: NNN
type: implementation
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# Plan NNN: Title

## User Decisions Captured

- Decisions, constraints, or explicit delegations from the user.

## Capability Statement

One sentence: this plan proves/adds exactly one capability.

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

### Good plan qualities

- One capability, not a roadmap.
- Defers adjacent work aggressively.
- Names exact validation commands.
- Captures user decisions so implementers do not re-litigate them.
- References current issue/review/source paths instead of copying long prose.
- Includes a stop rule for scope creep, ambiguous design, or unexpected source drift.

### Thinness checks

Use these before implementation when the repo has no stricter gate:

- Can the capability be stated in one sentence?
- Is the defer/non-goal list at least as important as the in-scope list?
- Are tests or validation possible before dependent layers exist?
- Is the expected diff small enough to review?
- Does the plan build on existing seams rather than rewriting them?
- Would a reviewer know exactly what to approve or reject?

## File a review

Use a review when a plan, implementation, tests, or research output needs an explicit verdict before the next step.

### Path

```text
koder/reviews/NNN_short_slug/01_plan.md
koder/reviews/NNN_short_slug/02_tests.md
koder/reviews/NNN_short_slug/03_code.md
```

A repo may prefer `01_codex.md`, `02_claude.md`, or `01_code_review.md`; follow nearby convention.

### Minimal review template

```markdown
---
plan: NNN
issue: NNN
type: plan-review
verdict: needs fixes
reviewer: codex
created: YYYY-MM-DD
---

# Review: Plan/Code NNN — Short Title

## Summary

What was reviewed and the overall assessment.

## Findings

### P1-1: Blocking title

Evidence, impact, and required fix. Cite paths/lines or artifact sections.

### P2-1: Important but not blocking title

Evidence, impact, and suggested fix.

## Passing Checks

- What looks correct and should not be re-litigated.

## Verification

```bash
commands run, or "not run" with reason
```

## Verdict

PASS / APPROVE / NEEDS FIXES / REVISE / REJECT, with the next action.
```

### Good review qualities

- Gives a verdict, not just comments.
- Prioritizes findings (`P1`, `P2`, `P3`) so the next agent can route work.
- Distinguishes required changes from non-blocking notes.
- Confirms what passed to avoid repeated debate.
- Cites source evidence and validation results.
- Does not expand scope beyond the reviewed issue/plan unless it files a follow-up issue.

## Filing follow-ups from reviews

If a review discovers adjacent work:

- P1/P2 inside scope: keep in the review and require fix.
- Important but out of scope: file a new issue and link it from the review.
- Nice-to-have: add a non-blocking note or a backlog issue only if durable tracking is useful.

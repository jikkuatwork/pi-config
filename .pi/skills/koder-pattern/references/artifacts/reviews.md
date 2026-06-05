---
title: Koder Reviews
updated: 2026-06-05
---

# Koder Reviews

Use a review when a plan, implementation, tests, or research output needs an explicit verdict before the next step.

## Path

```text
koder/reviews/NNN_short_slug/01_plan.md
koder/reviews/NNN_short_slug/02_tests.md
koder/reviews/NNN_short_slug/03_code.md
```

A repo may prefer `01_codex.md`, `02_claude.md`, or `01_code_review.md`; follow nearby convention.

## Frontmatter

```yaml
---
plan: NNN
issue: NNN
type: plan-review    # plan-review | code-review | tests-review | audit
verdict: needs fixes # pass | approve | approve with fixes | needs fixes | revise | reject
reviewer: codex      # codex | claude | user | other
created: YYYY-MM-DD
---
```

## Template

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

## Good review qualities

- Gives a verdict, not just comments.
- Prioritizes findings (`P1`, `P2`, `P3`) so the next agent can route work.
- Distinguishes required changes from non-blocking notes.
- Confirms what passed to avoid repeated debate.
- Cites source evidence and validation results.
- Does not expand scope beyond the reviewed issue/plan unless it files a follow-up issue.

## Follow-ups

- P1/P2 inside scope: keep in the review and require fix.
- Important but out of scope: file a new issue and link it from the review.
- Nice-to-have: add a non-blocking note or backlog issue only if durable tracking is useful.

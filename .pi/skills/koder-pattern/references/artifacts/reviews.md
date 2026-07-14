---
title: Koder Reviews
updated: 2026-07-14
---

# Koder Reviews

Use a durable review artifact when a verdict, findings, or authority decision must
outlive the execution receipt. Independent review does not automatically require
a Markdown file for every clean queue row.

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
p1: 1
p2: 1
p3: 0
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
p1: 1
p2: 1
p3: 0
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

## Artifact economy

A clean row review may remain compact execution proof when all of these hold:

- the queue/repo does not explicitly require a canonical per-row review artifact;
- the independent verdict is approve/pass with `p1: 0`, `p2: 0`, and `p3: 0`;
- exact validation outcomes and reviewed commit/range are captured by the harness
  report plus verified Git/queue checkpoint;
- no finding, new decision, exception, or authority claim needs prose.

Write a canonical review artifact when there are findings, the verdict blocks or
requires fixes, the review is a milestone/final/authority gate, the repo requires
one, or the user asks for it. This keeps review independence while avoiding a
file and commit whose only content is “approved.”

## Blind-queue review handoff

In explicit blind mode, a review with findings must be self-contained because the
coordinator will not read or paraphrase them. Put normalized `verdict`, `p1`,
`p2`, and `p3` in frontmatter; the fresh fix worker reads that committed artifact
directly. A clean row review may instead return one compact typed report with a
null/omitted review path, verdict/counts, validation, and reviewed ref; the
coordinator batches it into queue evidence.

Review and fix remain separate fresh roles. A clean re-review can use compact
proof plus disposition in the originating review/queue checkpoint; create a new
canonical artifact only when findings remain or policy requires one. See
`references/queues/blind-briefs.md`.

## Follow-ups

- P1/P2 inside scope: keep in the review and require fix.
- Important but out of scope: file a new issue and link it from the review.
- Nice-to-have: add a non-blocking note or backlog issue only if durable tracking is useful.

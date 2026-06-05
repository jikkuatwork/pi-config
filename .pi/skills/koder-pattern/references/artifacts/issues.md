---
title: Koder Issues
updated: 2026-06-05
---

# Koder Issues

Use an issue when there is a problem, opportunity, design decision, audit finding, or follow-up that needs durable tracking.

## Path

```text
koder/issues/NNN_short_slug/INDEX.md
```

## Frontmatter

```yaml
---
status: open        # open | resolved | blocked | backlog | superseded
priority: P2        # P0 | P1 | P2 | P3
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: area, topic
type: feature       # bug | feature | design | audit | analysis | docs
context: One-line why this exists.
---
```

## Template

```markdown
---
status: open
priority: P2
created: YYYY-MM-DD
updated: YYYY-MM-DD
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

## Good issue qualities

- Focused on **why** and **what success means**, not detailed implementation.
- Carries enough context for plan extraction.
- Links related issues/plans/reviews when known.
- Uses `turns/` for long discussion and keeps `INDEX.md` current after convergence.

## Status updates

When resolving or superseding:

1. verify evidence: commit, tests, release, review, or user decision;
2. edit frontmatter `status`;
3. add a short `resolved:` or `superseded_by:` note if the repo uses those fields;
4. mention evidence path/commit in the body.

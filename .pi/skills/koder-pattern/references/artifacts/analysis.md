---
title: Koder Analysis
updated: 2026-06-05
---

# Koder Analysis

Analysis is a scoped audit, inventory, mapping, scorecard, or diagnostic often tied to an issue/plan. It is usually less open-ended than research.

## Path

```text
koder/analysis/NNN_short_topic/INDEX.md
```

## Template

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

## Good analysis qualities

- Has a defined scope and method.
- Produces evidence that can be rerun or inspected.
- Makes follow-up actions explicit.
- Does not pretend an audit is a plan; extract plans separately.

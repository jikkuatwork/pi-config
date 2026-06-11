---
title: Koder Issues
updated: 2026-06-11
---

# Koder Issues

Use an issue when there is a problem, opportunity, design decision, audit finding, or follow-up that needs durable tracking.

Creating or materially updating an issue is a `koder/` state transition. Follow `references/shared/state-commit-protocol.md` unless the user explicitly says not to commit.

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

## External-origin filings

Use this when work in repo/session A discovers something repo B should track.

1. Identify the target repo and inspect its state:
   ```bash
   git status --short
   git diff --cached --name-only
   ```
2. Stop/coordinate if `koder/STATE.md` or the target issue path is already dirty/staged from unrelated work.
3. Create the issue artifact under `koder/issues/NNN_slug/INDEX.md`.
4. Update `koder/STATE.md` with:
   - India-time `updated_at`;
   - a one-line Present/Future note that an external filing landed;
   - no private source payloads or full prompts.
5. Commit only the issue artifact and `koder/STATE.md`, preserving unrelated dirty/staged work:
   ```bash
   git add -- koder/STATE.md koder/issues/NNN_slug/INDEX.md
   git commit -F /tmp/state-message -- koder/STATE.md koder/issues/NNN_slug/INDEX.md
   ```
6. Use this subject:
   ```text
   state: file #NNN from <origin-repo> - <short reason>
   ```
7. Use this body shape:
   ```text
   State event: external_issue
   Origin repo: <repo>
   Origin context: <one line>
   Issue: koder/issues/NNN_slug/INDEX.md

   Delta:
   - <what changed in target repo state>
   - <operator-facing impact>
   ```

If the target repo has unrelated dirty or staged paths, that is acceptable only when the selected-path commit cannot sweep them in. Avoid `git add -A` for external filings.

## Status updates

When resolving or superseding:

1. verify evidence: commit, tests, release, review, or user decision;
2. edit frontmatter `status`;
3. add a short `resolved:` or `superseded_by:` note if the repo uses those fields;
4. mention evidence path/commit in the body;
5. create a `state:` commit for the issue state change, for example:
   ```text
   state: resolve #NNN - <short result>
   ```

Use selected-path commits when unrelated dirty work exists.

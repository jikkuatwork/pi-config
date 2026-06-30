---
title: Koder Issues
updated: 2026-06-30
---

# Koder Issues

Use an issue when there is a problem, opportunity, design decision, audit finding, or follow-up that needs durable tracking. If the idea is RFC-scale and should converge before work is split, file a proposal first and extract issues from it later.

Creating or materially updating an issue is a `koder/` state transition. Follow `references/shared/state-commit-protocol.md` unless the user explicitly says not to commit. This does not automatically mean editing `koder/STATE.md`; ordinary in-session issue changes are recorded in the issue artifact and `state:` commit, then summarized in `koder/STATE.md` at close if needed.

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
converged: turns/NN_label.md  # optional: current self-contained planning source
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
# converged: turns/NN_label.md
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
- Uses `turns/` for long discussion. When discussion materially changes the original issue, preserve the original issue body and point `converged:` at a self-contained turn.

## Converged issue turns

Use this when an issue is submitted, discussed, and the final agreed shape differs materially from the original report.

Keep the original `INDEX.md` body as the historical problem submission. Do not rewrite it into the new answer just to make it current. Instead:

1. Append a turn file under `turns/`, for example:
   ```text
   koder/issues/NNN_slug/turns/03_proxy_body_policy_convergence.md
   ```
2. Make that turn self-contained enough for plan extraction:
   - current problem statement;
   - accepted decisions;
   - rejected alternatives;
   - implementation scope;
   - acceptance criteria;
   - evidence/source pointers.
3. Add or update frontmatter on `INDEX.md`:
   ```yaml
   converged: turns/03_proxy_body_policy_convergence.md
   ```
4. Keep `status: open` unless implementation/evidence actually resolves the issue. `converged` means design/planning source, not completion.

Agents planning from an issue must read `INDEX.md` first. If `converged:` is present, read that target next and treat it as the current issue specification for planning/mapping.

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

External-origin filings are the main issue-flow exception that updates `koder/STATE.md` immediately, because the target repo changes outside its normal close boundary and the next opener must see that movement.

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

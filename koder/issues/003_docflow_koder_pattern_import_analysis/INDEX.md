---
status: open
priority: P2
created: 2026-06-13
tags: koder-pattern, docflow, skills, productization, workflow
type: analysis
context: External filing from Holm: compare MedAdemBHA/docflow with koder-pattern and decide what to import/adapt.
---

# Issue 003: DocFlow Import/Adaptation Analysis for koder-pattern

## Problem

`koder-pattern` is stronger than DocFlow as an agent-operations system, but
DocFlow has clearer public onboarding and productization primitives. We need a
focused analysis inside the pi repo, where `koder-pattern` is managed, before
importing or adapting any ideas.

## Context

Origin: Holm session on 2026-06-13 reviewing
<https://github.com/MedAdemBHA/docflow> after discussing BFBB Headless UI
patterns.

DocFlow observed shape:

- Plain Markdown + Bash documentation-memory scaffold.
- `doctor -> init/adopt/repair` setup flow.
- `docs/INDEX.md` generated as a token-light path-to-purpose map.
- Read-only session hook that prints the docs map and newest changelog.
- Claude/Codex/Gemini/Cursor guidance and plugin packaging.
- Docs portal and link/placeholder checks.

Initial comparison:

- DocFlow optimizes for approachable documentation memory and first-run UX.
- `koder-pattern` optimizes for durable agent operations: session handoff,
  issues, plans, reviews, queues, research, analysis, tasks, scratch,
  canonical `INDEX.md`, turns, validators, and grepable `state:` commits.
- DocFlow should not replace `koder-pattern`; it is a productization reference
  and possible source of compatible helper patterns.

## Candidate Imports / Adaptations

Evaluate whether to adapt these DocFlow ideas into `koder-pattern`:

1. Sharper public command framing around `doctor`, `init`, `adopt`, and
   `repair`.
2. A stronger `adopt` path for repos that already have docs/issues/plans.
3. A stronger `repair` path that can regenerate maps, check links/placeholders,
   and verify agent adapters.
4. A generated low-token `koder/INDEX.md` or `koder/MAP.md` listing artifact
   paths, statuses, and purposes.
5. A conservative read-only session/context hook, if useful outside Holm's
   richer `/open` flow.
6. A simple browser/static portal for browsing `koder/` artifacts.
7. Better marketplace/plugin packaging guidance for Claude, Codex, Gemini, and
   Cursor.
8. Tests mirroring DocFlow's idempotency, special-character, link-check, and
   hook-safety coverage.

## Key Questions

- Which DocFlow ideas improve `koder-pattern` without weakening its durable
  operator model?
- Should `koder-pattern` expose a lighter public mode distinct from full
  queue/review/harnex workflows?
- Should generated maps be canonical, derived, or scratch-only?
- Can a context hook stay read-only, token-light, and non-invasive across
  agent harnesses?
- How should `knowledge-base/`/`docs/` style documentation interoperate with
  `koder/` operator artifacts in non-Holm repos?

## Acceptance Criteria

- [ ] Re-read DocFlow source from a fresh clone or current upstream checkout.
- [ ] Produce a concise analysis artifact under `koder/research/` or
      `koder/analysis/` comparing DocFlow and `koder-pattern` feature-by-feature.
- [ ] Decide which DocFlow ideas to import, adapt, defer, or reject.
- [ ] If proceeding, file one or more bounded implementation plans for the
      selected adaptations.
- [ ] Preserve `koder-pattern` invariants: durable operator state under
      `koder/`, canonical `INDEX.md` artifacts, optional `turns/`, finite
      statuses, and grepable `state:` commits.

## Non-Goals

- Replacing `koder-pattern` with DocFlow.
- Copying DocFlow's full `docs/` taxonomy into repos that already have their
  own docs/source-of-truth structure.
- Installing third-party plugins, package managers, or runnable dependencies
  without a separate skill-import review and explicit permission.

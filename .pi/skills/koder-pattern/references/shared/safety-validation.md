---
title: Koder Safety and Validation
updated: 2026-06-11
---

# Koder Safety and Validation

Read before finalizing or committing a `koder/` artifact. For intentional state mutations, also follow `references/shared/state-commit-protocol.md`.

## Safety rules

- Do not store credentials, secrets, private account identifiers, full prompts, private payloads, sensitive telemetry, or personal data.
- Do not duplicate large source excerpts; link paths, anchors, commands, commits, and line references.
- Do not bury a user decision in scratch; update the canonical issue/plan/review/queue.
- Do not mark work resolved without evidence: commit, validation, release/version, review verdict, or explicit user decision.
- Ask before filing artifacts that imply cloud spend, release/deploy, destructive DB work, production mutation, credential changes, or account changes.
- Keep durable artifacts safe to commit unless the repo explicitly keeps them private.
- Do not sweep unrelated dirty/staged work into a `state:` commit; use selected paths when needed.

## Validation

Prefer local validators when present, for example:

```bash
./scripts/issues/validate.sh
./scripts/reviews/validate.sh
./scripts/tasks/validate.sh
./scripts/plans/check-thinness.sh <plan-path>
```

If no validator exists, manually verify:

- path shape and numeric prefix;
- frontmatter parses and has required fields;
- status values are from the repo vocabulary;
- references point to existing artifacts/code or intentionally unresolved targets;
- body contains the artifact-specific proof: problem/context/acceptance, plan validation, review verdict, queue entry contract, etc.;
- no sensitive data is included;
- the final response says which validators ran, or that no validator exists and manual checks were done.

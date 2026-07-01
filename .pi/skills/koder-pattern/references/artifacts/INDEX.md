---
title: Koder Artifact Router
updated: 2026-07-01
---

# Koder Artifact Router

Use this only when the requested artifact type is unclear. Otherwise load the leaf file directly.

## Choose the narrowest artifact

| Situation | Leaf |
| --- | --- |
| RFC-scale architecture/product/runtime idea that should converge before issue extraction | `references/artifacts/proposals.md` |
| Problem, opportunity, decision, audit finding, durable follow-up | `references/artifacts/issues.md` |
| Broad issue needs mapping/track/live-proof slice progress | `references/artifacts/issues.md`, then `references/shared/slice-accounting.md` |
| Bounded implementation/investigation slice with validation | `references/artifacts/plans.md` |
| Verdict on a plan, code, tests, or research output | `references/artifacts/reviews.md` |
| Open-ended exploration or alternatives synthesis | `references/artifacts/research.md` |
| Scoped audit, inventory, mapping, diagnostic, scorecard | `references/artifacts/analysis.md` |
| Lightweight durable memory without status tracking | `references/artifacts/notes.md` |
| Multi-step state-machine orchestration | `references/artifacts/tasks.md` |
| Temporary briefs/proofs, session handoff, bench/evidence stores | `references/artifacts/scratch-state.md` |

## Common rules

- For new artifacts, read `references/shared/artifact-model.md` if numbering/path/turn behavior is not obvious.
- For intentional artifact state changes, read or apply `references/shared/state-commit-protocol.md`.
- Before finalizing, read or apply `references/shared/safety-validation.md`.
- Inspect nearby live artifacts first; preserve legacy format when updating legacy records.
- Use exact paths and source links instead of copied detail.
- Update canonical `INDEX.md` after convergence; `turns/` alone is not current truth.

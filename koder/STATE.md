---
updated_at: "13 Jun 2026 | 12:07 AM IST"
---

# Koder State

## Past

- Session handoff open/close flow is active; `koder/STATE.md` remains source-of-truth.
- Earlier durable work includes koder issue 001, Framework7 research/skill work, and the global `koder-pattern` refactor/bootstrap route.
- Issue 002 clarified that grepable `state:` commits are the semantic movement ledger; `koder/STATE.md` is only session handoff.
- Added docs-only `ponytail` skill from `DietrichGebert/ponytail` at `cf97ccc`; reviewed plugin hooks/commands but did not vendor or run them.
- Added local `skill-import` workflow skill for adapting skills/docs/workflows/blogs/etc. into frontmatter-only pi skills.
- Confirmed via temp pi probes that `metadata.references.index` can route to `references/INDEX.md` without body text in `SKILL.md`.

## Present

- New local convention: `SKILL.md` is frontmatter-only by default, with `metadata.structure: tiny_front_door_v1` and `metadata.references.index: references/INDEX.md`.
- References are flat `NN_label.md` by default; use folders only for multi-file topics/assets; avoid nested `SKILL.md` files.
- `skill-import` and `ponytail` both follow this convention; `AGENTS.md`, `find-skills`, and `knowledge-base/workflows/skill-import.md` point to it.
- Repo has no root test/build harness; validation is docs/manual plus targeted pi CLI probes and file/security scans.

## Future

- Next session: convert remaining local skills to the frontmatter-only + `references/INDEX.md` convention where appropriate.
- Reload/restart pi after local skill changes so new/updated triggers are discovered.
- Keep project-local pi skills reviewed and source-controlled under `.pi/skills/`; do not edit global symlink installs directly.

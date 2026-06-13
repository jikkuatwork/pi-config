---
updated_at: "13 Jun 2026 | 11:33 PM IST"
---

# Koder State

## Past

- Session handoff open/close flow is active; `koder/STATE.md` remains source-of-truth.
- Issue 002 clarified that grepable `state:` commits are the semantic movement ledger; `koder/STATE.md` is only session handoff.
- Added docs-only `ponytail` skill and local `skill-import` workflow; both established the tiny front-door convention.
- Confirmed via temp pi probes that frontmatter-only `SKILL.md` files can route through `metadata.references.index` to `references/INDEX.md`.
- Converted all top-level local `.pi/skills/*/SKILL.md` files to frontmatter-only entrypoints with `metadata.structure: tiny_front_door_v1` and `metadata.references.index`.
- Added/updated skill `references/INDEX.md` routers; moved large always-loaded bodies behind references.
- Renamed nested `koder-pattern` scaffold templates to `SKILL.md.template` so pi does not discover them as live nested skills, while init still writes target `koder/skills/{open,close}/SKILL.md`.

## Present

- Local skill convention: one discoverable top-level `SKILL.md` per skill, frontmatter-only by default, routing to `references/INDEX.md`.
- References stay flat by default; use folders only for multi-file topics/assets; avoid nested discoverable `SKILL.md` files.
- `koder-pattern` still creates real `open`/`close` skills in target repos from `.template` sources.
- Repo has no root test/build harness; validation is docs/manual plus targeted script/YAML/pi CLI probes.
- External Holm filing created Issue 003 to compare DocFlow with `koder-pattern` and decide what to import/adapt.

## Future

- Reload/restart pi after local skill changes so updated triggers and frontmatter are discovered.
- Keep project-local pi skills reviewed and source-controlled under `.pi/skills/`; do not edit global symlink installs directly.
- When adding or importing skills, keep entrypoints frontmatter-only unless safety/compatibility requires a tiny body.
- Analyze DocFlow in this repo via Issue 003 before importing/adapting productization ideas into `koder-pattern`.

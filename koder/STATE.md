---
updated_at: "20 May 2026 | 12:57 PM IST"
---

# Koder State

## Purpose

- Persistent hand-off document for future pi/koder sessions.
- Keep this file under 100 lines and update it at session close.
- Track Past / Present / Future so a new session can resume quickly.

## Past

- Established session lifecycle hand-off flow (`/skill:open`, `/skill:close`, `koder/STATE.md`).
- Migrated extension source-of-truth into this repo under `extensions/`.
- Added/evolved key extensions: `vim.ts`, `azure-retry-normalizer.ts`, `footer-highlights.ts`, `output-anchor.ts`.
- Added repo guidance (`AGENTS.md`) and skill import workflow (`knowledge-base/workflows/skill-import.md`) with strict no-Skills-CLI policy.
- Added local skills: `deep-research`, `golang-pro`, `gpt-image2`, `grill-me`, `find-skills`.
- Added new local skill: `.pi/skills/create-skill/SKILL.md` by combining ideas from:
  - `anthropics/skills/skill-creator`
  - `mattpocock/skills/write-a-skill`
- Added upstream docs-only snapshots for provenance under:
  - `.pi/skills/create-skill/references/upstream/anthropic-skill-creator.GUIDE.md`
  - `.pi/skills/create-skill/references/upstream/mattpocock-write-a-skill.GUIDE.md`
  - `.pi/skills/create-skill/references/upstream/README.md`
- Rewrote `create-skill` as an opinionated workflow with default Vibe Mode, strict SKILL template, mandatory eval checklist, and minimal-diff iteration guidance.
- Added YAML frontmatter to `koder/STATE.md` with `updated_at` timestamp metadata.
- Updated `.pi/skills/close/SKILL.md` to require refreshing `updated_at` in IST format at session close.

## Present

- Repo is a staging/config workspace for pi extensions and locally reviewed skills.
- Global pi settings outside this repo (`~/.pi/agent/settings.json`) load `/home/glasscube/Projects/pi/extensions`.
- Current discoverable local skills now include: `open`, `close`, `find-skills`, `deep-research`, `golang-pro`, `gpt-image2`, `grill-me`, and `create-skill`.
- `create-skill` is docs-first; upstream runnable tooling from Anthropics was intentionally **not** vendored.
- No root app/build/test system exists in this repo.
- `koder/STATE.md` now uses frontmatter for metadata (`updated_at`) instead of inline "Last updated" text.

## Future

- Validate `create-skill` on 2–3 real authoring tasks and tighten trigger wording using observed misses.
- Optionally add small `examples/` references for `create-skill` to improve consistency.
- Continue editing extensions here (not in `~/.pi/agent/extensions/`) and `/reload` after changes.
- Build planned docs-only umbrella Azure skill under `.pi/skills/azure/` with modules in `references/modules/*/GUIDE.md`.
- Keep credentials/tenant/subscription/private cloud state out of this repo; follow `AGENTS.md` and cloma policies.

## Commands

- Check repo status: `git status --short`
- Diff summary: `git diff --stat`
- Count this file's lines: `wc -l koder/STATE.md`

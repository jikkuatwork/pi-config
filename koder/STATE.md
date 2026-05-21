---
updated_at: "21 May 2026 | 11:01 AM IST"
---

# Koder State

## Purpose

- Persistent hand-off for future pi/koder sessions.
- Keep under 100 lines and update at session close.
- Track Past / Present / Future only.

## Past

- Established session lifecycle flow with `open`, `close`, and `koder/STATE.md`.
- Migrated pi extension source-of-truth into `extensions/`.
- Added/evolved key extensions: `vim.ts`, `azure-retry-normalizer.ts`, `footer-highlights.ts`.
- Added repo guidance in `AGENTS.md` and skill import policy in `knowledge-base/workflows/skill-import.md`.
- Added local skills: `open`, `close`, `find-skills`, `deep-research`, `golang-pro`, `gpt-image2`, `grill-me`, `create-skill`, `visual-explainer`.
- Rewrote `create-skill` as an opinionated docs-first skill authoring workflow with eval checklist and upstream docs-only references.
- Added public-facing `README.md` describing this as a personal, opinionated pi config centered on extensions.
- Added MIT `LICENSE`.

## Present

- Repo is the single source-of-truth workspace for personal pi extensions, reviewed skills, and workflow notes.
- `visual-explainer` is vendored locally under `.pi/skills/visual-explainer`; upstream installers/plugin metadata and Vercel share/deploy helper are excluded.
- Runtime/project pi locations may symlink or point back here; edit canonical files in this repo first.
- `README.md` is terse, public-facing, and avoids private paths/account details.
- Skills are vendored here before promotion elsewhere; Vercel Skills CLI remains disallowed.
- No root app/build/test system exists in this repo.
- Some internal docs may still need a public-release scrub before open-sourcing.

## Future

- Before publishing publicly, audit tracked docs for private paths, account-policy details, and machine-specific references.
- Validate `create-skill` on real authoring tasks and tighten trigger wording from observed misses.
- Optionally add examples for `create-skill`.
- Reload/restart pi after skill or extension changes so project-local updates are picked up.
- Build planned docs-only umbrella Azure skill with modules under `references/modules/*/GUIDE.md`.

## Commands

- Check repo status: `git status --short`
- Diff summary: `git diff --stat`
- Count lines: `wc -l koder/STATE.md`

---
updated_at: "23 May 2026 | 04:23 PM IST"
---

# Koder State

## Purpose

- Persistent hand-off for future pi/koder sessions.
- Keep this file under 100 lines.
- Track only Past / Present / Future.

## Past

- Session lifecycle flow is active (`open` / `close` with `koder/STATE.md`).
- Repo remains source-of-truth for personal pi extensions, reviewed skills, and workflow notes.
- Earlier work includes Vim modal editing upgrades, vendored `visual-explainer`, and the local `holm-app` skill plus Holm context docs.
- This session audited whether `holm-app` can build nice Zippy/BFBB Holm apps, then refreshed it instead of only reporting gaps.
- `holm-app` is now self-contained: detailed Holm inventory moved to `.pi/skills/holm-app/references/holm-inventory.md`; root `HOLM.md` is a pointer.
- Added/updated Holm skill docs for BFBB/no-npm policy, CLI-walkable app contracts, UI quality, member-private storage, deployment, agents, and eval prompts.
- Added `updated`, `holm_version`, and source commit frontmatter across Holm skill docs.
- `AGENTS.md` now points to the skill-local Holm inventory.

## Present

- This repo is the canonical workspace for pi config, extensions, and local skills.
- No root build/test harness or package manager project is defined in this repo.
- The reviewed Holm source was `/home/glasscube/Projects/holmhq/holm/master` at Holm `0.119.3`, commit `de9e73f4`, clean at review time.
- `holm-app` docs emphasize: primary BFBB/raw apps must not require `npm install`, build, or public runtime CDN dependencies; npm/Vite are optional tooling only.
- `extensions/vim.ts` had pre-existing uncommitted edits at open; close commits them together with this session's docs per close workflow.

## Future

- Reload/restart pi so refreshed local skill docs are picked up.
- For future Holm app builds, load `.pi/skills/holm-app/SKILL.md` and its `references/holm-inventory.md` / `app-quality-and-contracts.md` before coding.
- If Holm/Zippy changes, refresh the skill-local frontmatter (`updated`, `holm_version`, `holm_source_commit`) and inventory from live source.
- Continue planned docs-only Azure umbrella skill structure under `.pi/skills/azure/references/modules/*/GUIDE.md`.

## Commands

- Status: `git status --short`
- Diff summary: `git diff --stat`
- State length: `wc -l koder/STATE.md`

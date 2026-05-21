---
updated_at: "21 May 2026 | 11:43 PM IST"
---

# Koder State

## Purpose

- Persistent hand-off for future pi/koder sessions.
- Keep this file under 100 lines.
- Track only Past / Present / Future.

## Past

- Session lifecycle flow is active (`open` / `close` with `koder/STATE.md`).
- Repo remains source-of-truth for personal pi extensions, reviewed skills, and workflow notes.
- `extensions/vim.ts` modal editing upgrades were completed earlier (`de/dE`, `ce/cE`, improved `cw`).
- `visual-explainer` is vendored locally and used in docs-first workflows.
- New `holm-app` skill was created under `.pi/skills/holm-app/` with nested references for Holm overview, Zippy, runtime/storage, deploy, agents, and eval prompts.
- `HOLM.md` was added as the repo-level Holm feature inventory and Zippy coverage/gap map, reviewed against `/home/glasscube/Projects/holmhq/holm/master` at `0.119.3` / commit `895adce9`.
- `AGENTS.md` and new `CLAUDE.md` now point agents to `HOLM.md` and the `holm-app` skill, with safety rules for mutating Holm commands.

## Present

- This repo is still the canonical workspace for pi config, extensions, and local skills.
- No root build/test harness or package manager project is defined in this repo.
- `HOLM.md` records the Holm source as dirty at review time because Zippy recipe files had uncommitted changes in the Holm repo.
- The `holm-app` skill is docs-only; it does not vendor executable Holm code or secrets.

## Future

- Reload/restart pi so the new `holm-app` skill and doc changes are picked up.
- If Holm/Zippy source changes, refresh `HOLM.md` and the `holm-app` references from live source.
- Validate updated Vim motions in live pi TUI usage and refine edge cases if needed.
- Continue planned docs-only Azure umbrella skill structure under `.pi/skills/azure/references/modules/*/GUIDE.md`.

## Commands

- Status: `git status --short`
- Diff summary: `git diff --stat`
- State length: `wc -l koder/STATE.md`

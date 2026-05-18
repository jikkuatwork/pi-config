# Koder State

_Last updated: 2026-05-18_

## Purpose

- Persistent hand-off document for future pi/koder sessions.
- Keep this file under 100 lines and update it at session close.
- Track Past / Present / Future so a new session can resume quickly.

## Past

- Established session lifecycle hand-off flow (`/skill:open`, `/skill:close`, `koder/STATE.md`).
- Migrated extension source-of-truth into this repo under `extensions/`.
- Added and evolved `extensions/azure-retry-normalizer.ts` to normalize Azure transient failures into retryable shapes.
- Renamed modal editor extension to `extensions/vim.ts` and tuned Vim-style UI (mode badge + mode-colored border).
- Added `extensions/footer-highlights.ts` custom footer with scan-friendly cost/context styling and restored thinking-level display in footer.
- Added pi-native research skill: `.pi/skills/deep-research/SKILL.md`.
- Added Vim normal-mode quick model/thinking switcher:
  - `tab` opens/cycles models
  - `up/down` cycles thinking levels
  - `enter` applies
  - `esc` cancels
  - `i` cancels and returns to insert mode
- Made quick-switch configurable via optional config files:
  - `~/.pi/agent/vim-model-switch.json` (global)
  - `.pi/vim-model-switch.json` (project override)
  - example: `extensions/vim-model-switch.example.json`

## Present

- Repo contains lifecycle skills and repo-managed global extensions under `extensions/`:
  - `vim.ts`
  - `azure-retry-normalizer.ts`
  - `footer-highlights.ts`
- Repo also contains project skill `.pi/skills/deep-research/SKILL.md`.
- Global pi settings outside this repo (`~/.pi/agent/settings.json`) load `/home/glasscube/Projects/pi/extensions`.
- No app/package/test/build system exists in this repo (extension-only workflow).

## Future

- Continue editing extensions here (not in `~/.pi/agent/extensions/`) and `/reload` after changes.
- If desired, move `deep-research` from project-local skill to global skill path.
- Keep tuning Vim quick-switch UX (labels, ordering, additional keybindings) as model lineup changes.
- If Azure failures still bypass retry, add more normalization patterns with diagnostics.
- If product code is added later, document build/test commands in this file.

## Commands

- Check repo status: `git status --short`
- Diff summary: `git diff --stat`
- Count this file's lines: `wc -l koder/STATE.md`

# Koder State

_Last updated: 2026-05-19_

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
- Added Vim normal-mode `e` motion.
- Added local review skills: `golang-pro`, `gpt-image2`, `grill-me`, and `find-skills`; `gpt-image2` requires user-provided ImgBB keys (no embedded secret committed).
- Added repo-level agent guidance (`AGENTS.md`) and skill import workflow (`knowledge-base/workflows/skill-import.md`): no Skills CLI, manual vendoring, executable review, and umbrella-skill structure.

## Present

- Repo contains lifecycle skills and repo-managed global extensions under `extensions/`:
  - `vim.ts` (now includes normal-mode `e` motion)
  - `azure-retry-normalizer.ts`
  - `footer-highlights.ts`
  - `output-anchor.ts` (prefixes assistant outputs with searchable marker)
- Repo also contains project skills under `.pi/skills/` including:
  - `deep-research`
  - `golang-pro` for Go implementation/review guidance
  - `gpt-image2` (tuned defaults: 16:9-friendly size, high quality, Desktop `gi-*` output, Azure/cloma bootstrap; requires env/flag credentials)
  - `grill-me`
  - `find-skills` for local skills discovery/vendoring without the Skills CLI
- Operator preference for skills: never use Vercel Skills CLI (`npx skills`); always manually copy/vendor locally, review for executables/installers, ask permission before running/installing anything, and use umbrella skills for large domains. Do not install third-party skills globally unless explicitly requested.
- Global pi settings outside this repo (`~/.pi/agent/settings.json`) load `/home/glasscube/Projects/pi/extensions`.
- No root app/build system exists; `gpt-image2` skill has local `npm run check` and `npm run smoke` scripts.

## Future

- Continue editing extensions here (not in `~/.pi/agent/extensions/`) and `/reload` after changes.
- Next likely skill: build one top-level `azure` umbrella skill, docs-only, with Microsoft Azure modules converted to `references/modules/*/GUIDE.md`; keep credentials/guardrails in `AGENTS.md` and cloma/`~/.cloma`, not in the skill.
- If desired, promote reviewed local skills (`golang-pro`, `gpt-image2`, `grill-me`) to global scope explicitly, one-by-one.
- Keep tuning Vim quick-switch UX (labels, ordering, additional keybindings) as model lineup changes.
- If Azure failures still bypass retry, add more normalization patterns with diagnostics.
- If product code is added later, document build/test commands in this file.

## Commands

- Check repo status: `git status --short`
- Diff summary: `git diff --stat`
- Count this file's lines: `wc -l koder/STATE.md`

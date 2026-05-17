# Koder State

_Last updated: 2026-05-17_

## Purpose

- Persistent hand-off document for future pi/koder sessions.
- Keep this file under 100 lines and update it at session close.
- Track Past / Present / Future so a new session can resume quickly.

## Past

- Established session lifecycle skills and hand-off flow (`/skill:open`, `/skill:close`, `koder/STATE.md`).
- Migrated extension source-of-truth into this repo under `extensions/`.
- Added `extensions/azure-retry-normalizer.ts` to normalize opaque Azure errors (`Unknown error (no error details in response)`) into a retryable transient shape and show retry start/end UI signals.
- Renamed modal editor extension to `extensions/vim.ts` and updated docs/references.
- Updated Vim extension UI: mode badge moved to the left on its own line, colorized to match Neovim `Tomorrow-Night-Bright`, and editor border color now tracks mode (NORMAL blue / INSERT green).

## Present

- Repo contains lifecycle skills plus repo-managed global extensions under `extensions/` (`vim.ts`, `azure-retry-normalizer.ts`).
- No app/package/test/build system exists in this repo.
- Global pi settings outside this repo (`~/.pi/agent/settings.json`) load `/home/glasscube/Projects/pi/extensions`.

## Future

- Continue editing extensions here (not in `~/.pi/agent/extensions/`) and `/reload` after changes.
- Tune Vim extension visuals/behavior further if desired (e.g., operator-pending border color or status text style).
- If Azure retry behavior still stalls, expand error normalization patterns and add diagnostics.
- If product code is added later, document build/test commands here.

## Commands

- Check repo status: `git status --short`
- Diff summary: `git diff --stat`
- Count this file's lines: `wc -l koder/STATE.md`

# Koder State

_Last updated: 2026-05-17_

## Purpose

- Persistent hand-off document for future pi/koder sessions.
- Keep this file under 100 lines and update it at session close.
- Track Past / Present / Future so a new session can resume quickly.

## Past

- Established session lifecycle skills and hand-off flow (`/skill:open`, `/skill:close`, `koder/STATE.md`).
- Migrated extension source-of-truth into this repo under `extensions/`.
- Added `extensions/modal-editor.ts` (repo-managed copy of the customized modal editor extension).
- Added `extensions/azure-retry-normalizer.ts` to normalize opaque Azure errors (`Unknown error (no error details in response)`) into a retryable transient shape and show retry start/end UI signals.
- Added `extensions/README.md` documenting the extension workflow.

## Present

- Repo now contains lifecycle skills plus repo-managed global extension source under `extensions/`.
- No app/package/test/build system exists in this repo yet.
- Global pi settings were updated outside this repo (`~/.pi/agent/settings.json`) to:
  - load `/home/glasscube/Projects/pi/extensions`
  - tune retry settings for Azure reliability.

## Future

- Keep editing global extensions in `extensions/` (not directly in `~/.pi/agent/extensions/`).
- After extension edits, run `/reload` (or restart pi) and validate behavior.
- If Azure still stalls, expand normalizer matching and/or add more provider-response diagnostics.
- If product code is added later, document build/test commands here.

## Commands

- Check repo status: `git status --short`
- Diff summary: `git diff --stat`
- Count this file's lines: `wc -l koder/STATE.md`

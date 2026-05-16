# Koder State

_Last updated: 2026-05-16_

## Purpose

- Persistent hand-off document for future pi/koder sessions.
- Keep this file under 100 lines and update it at session close.
- Track Past / Present / Future so a new session can resume quickly.

## Past

- Created the `koder/STATE.md` hand-off convention.
- Added project-level pi skills for session lifecycle:
  - `/skill:open` reads this file and summarizes repo state.
  - `/skill:close` updates this file, commits work, and leaves git clean.
- Recent non-repo context: the global pi modal editor extension at `~/.pi/agent/extensions/modal-editor.ts` was expanded with vim-like commands including `a`, `A`, `I`, `o`, `O`, `c`, `C`, `cc`, `d`, `D`, `dd`, `E`, `gg`, and `G`.

## Present

- This repo currently contains lifecycle documentation/skills only.
- Project skills live under `.pi/skills/` and are intended to be loaded by pi from this project.
- No application source, package manager, test suite, or build system has been established yet.

## Future

- At the start of each session, run `/skill:open` or manually read this file before making changes.
- At the end of each session, run `/skill:close` to update this file and commit all work.
- Keep future entries concise; archive details elsewhere if this file approaches 100 lines.
- If source code is added later, document build/test commands here.

## Commands

- Check repo status: `git status --short`
- Count this file's lines: `wc -l koder/STATE.md`

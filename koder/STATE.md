---
updated_at: "23 May 2026 | 06:05 PM IST"
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
- Previous Holm refresh made `holm-app` self-contained with `references/holm-inventory.md`, BFBB/no-npm policy, CLI-walkable app contracts, runtime/storage/auth/realtime/deploy/agent docs, and root `HOLM.md` as a pointer.
- This session re-audited `holm-app` for complex multi-member production realtime apps and patched generic gaps, not a one-off simulated app.
- Added `references/collaboration-production.md` for realtime-as-notification, channel privacy, membership guards, revision/idempotency/conflicts, reconnect, presence, and two-client smoke expectations.
- Added `references/ui-excellence.md` for polished product UX, required states, visual polish, responsive/PWA/layout/accessibility guidance, and stale Zippy pruning.
- Added `references/INDEX.md` as the skill router/load map and shrank `SKILL.md` to a tiny direct-use-only pointer for possible global promotion.
- Updated Holm quality/runtime/deploy/eval/inventory refs with DS result-shape clarification, JSON API auth guard guidance, worker task shape, admin capability notes, and realtime smoke caveats.

## Present

- This repo is the canonical workspace for pi config, extensions, and local skills.
- No root build/test harness or package manager project is defined in this repo.
- `holm-app/SKILL.md` is intentionally minimal and direct-use only; invocation should read `references/INDEX.md`, then task-relevant refs.
- The reviewed Holm source baseline in docs is `/home/glasscube/Projects/holmhq/holm/master` at Holm `0.119.3`, commit `de9e73f4`; live Holm source may be active/WIP and should be checked/trusted when building apps.
- `holm-app` now favors low ambient context cost for global use; implicit trigger quality is intentionally less important than explicit “use holm-app” invocation.

## Future

- Reload/restart pi so refreshed skill docs are picked up.
- If promoting globally, copy the whole `.pi/skills/holm-app/` directory so `SKILL.md` can reach `references/INDEX.md` and all topic refs.
- For future Holm app builds, explicitly invoke `holm-app`, read `references/INDEX.md`, then load only refs matching the requested surfaces.
- If Holm/Zippy changes, refresh skill-local frontmatter (`updated`, `holm_version`, `holm_source_commit`) and inventory from live source.
- Continue planned docs-only Azure umbrella skill structure under `.pi/skills/azure/references/modules/*/GUIDE.md`.

## Commands

- Status: `git status --short`
- Diff summary: `git diff --stat`
- State length: `wc -l koder/STATE.md`

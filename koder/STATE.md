---
updated_at: "24 May 2026 | 12:19 AM IST"
---

# Koder State

## Purpose

- Persistent hand-off for future pi/koder sessions.
- Keep this file under 100 lines.
- Track only Past / Present / Future.

## Past

- Session lifecycle flow is active (`open` / `close` with `koder/STATE.md`).
- Repo remains source-of-truth for personal pi extensions, reviewed skills, and workflow notes.
- `holm-app` is self-contained/direct-use, routed through `references/INDEX.md`, and grounded in live Holm/Zippy docs when generating apps.
- Earlier Holm refresh added BFBB/no-npm policy, CLI-walkable contracts, runtime/storage/auth/realtime/deploy/agent refs, collaboration-production guidance, and UI excellence guidance.
- This session stress-tested `holm-app` against a maximal single-attempt app: multi-member realtime, agentic workflows, media/uploads/blob links, async AI/tasks, PWA, responsive UI, themes, motion, and sounds.
- Added `references/complex-app-single-shot.md` with a build brief, feature ledger, readiness contract, verification gate, and “human-discovered-basics” prevention checklist.
- Hardened `app-quality-and-contracts.md`, `ui-excellence.md`, `INDEX.md`, and eval prompts around prompt traceability, auth/avatar, settings/theme/sound persistence, durable saves, route links, privacy probes, PWA, and manual/live-only caveats.
- Filed Holm file-based issue `#340 App Builder Readiness Pipeline` in `/home/glasscube/Projects/holmhq/holm/master/koder/issues/340_app_builder_readiness_pipeline/INDEX.md`, validated metadata, and committed it in Holm as `3775fd8e`.

## Present

- This repo is the canonical workspace for pi config, extensions, and local skills.
- No root build/test harness or package manager project is defined in this repo.
- `holm-app/SKILL.md` is intentionally tiny; invocation should read `references/INDEX.md`, then task-relevant refs.
- `holm-app` now includes an explicit single-attempt readiness gate for complex apps; agents should not say ready until safe self-QA/tests pass or unproven live-only items are named.
- Live Holm source checked this session was clean at commit `0bb93bf5`; cached skill refs still note reviewed Holm `0.119.3`/`de9e73f4` and should defer to live source when details drift.

## Future

- Reload/restart pi so refreshed skill docs are picked up.
- If promoting globally, copy the whole `.pi/skills/holm-app/` directory including all `references/` files.
- For future complex Holm app builds, explicitly invoke `holm-app`, read `references/INDEX.md`, then load `complex-app-single-shot.md` plus task refs before editing.
- In Holm repo, issue #340 can drive design for `holm app doctor`, app contracts, richer scenarios, n-client realtime tests, app scopes, authorized realtime, R/I/C primitives, PWA doctor, agent validation, and ESM worker checks.
- Continue planned docs-only Azure umbrella skill structure under `.pi/skills/azure/references/modules/*/GUIDE.md`.

## Commands

- Status: `git status --short`
- Diff summary: `git diff --stat`
- State length: `wc -l koder/STATE.md`

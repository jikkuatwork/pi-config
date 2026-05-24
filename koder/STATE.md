---
updated_at: "24 May 2026 | 04:09 PM IST"
---

# Koder State

## Purpose

- Persistent hand-off for future pi/koder sessions.
- Keep this file under 100 lines.
- Track only Past / Present / Future.

## Past

- Session lifecycle flow is active (`open` / `close` with `koder/STATE.md`).
- Repo remains source-of-truth for personal pi extensions, reviewed skills, and workflow notes.
- `holm-app` is self-contained/direct-use; invocation reads `references/INDEX.md`, then task-relevant refs and live Holm/Zippy docs when available.
- Prior work added `complex-app-single-shot.md` and hardened serious Holm app contracts around prompt traceability, auth/avatar, settings/theme/sound persistence, durable saves, privacy probes, PWA, and manual/live-only caveats.
- This session re-ran a deep post-#340 stress analysis for a maximal Notion/Discord/game-like Holm app with scopes, realtime collaboration, media/uploads/blob links, async AI/tasks, native agents, PWA, themes, sounds, motion, and operator workflows.
- Added `.pi/skills/holm-app/references/agent-first-shot-hardening.md` for post-#340 first-shot gap analysis: app scopes, contract drift, CRDT/collab semantics, realtime QoS, security/abuse, migrations/seeds, observability/audit, agent blast radius, load, lifecycle, and manual browser/PWA proof.
- Updated `INDEX.md`, `complex-app-single-shot.md`, `eval-prompts.md`, `holm-inventory.md`, and `HOLM.md`; refreshed reviewed live Holm marker to `0.119.3` / `3775fd8e` and corrected Zippy coverage for newer demos.
- Read `koder/scratch/03_scope_leak.md` and filed Holm issues #341 app/member/scope semantics, #342 collaboration/CRDT strategy, #343 append-only app seed data, and #344 observability/audit correlation; #340 now links those follow-ups.

## Present

- This repo has no root build/test harness or package manager project.
- `holm-app/SKILL.md` remains intentionally tiny; new hardening material is in references only.
- Post-#340 hardening analysis now has a dedicated reference routed from `references/INDEX.md` and included by the complex single-shot protocol when relevant.
- Live Holm source may move independently; trust live source over cached skill refs when details drift. Holm repo had unrelated/background `.harnex/dispatch.jsonl` dirtiness at close, not part of this pi commit.

## Future

- Reload/restart pi so refreshed skill docs are picked up.
- If promoting globally, copy the whole `.pi/skills/holm-app/` directory including all `references/` files.
- For future maximal Holm app builds, explicitly invoke `holm-app`, read `references/INDEX.md`, then load `complex-app-single-shot.md`, `agent-first-shot-hardening.md`, and task refs before editing.
- In Holm, continue #340-#344 design: app doctor/contracts/scenarios/ws tests, generic app scopes, authorized realtime, CRDT/op-log strategy, deploy-time seeds, and observability/audit correlation.
- Consider a deterministic local `holm_app_blueprint.rb` consistency compiler if native app-create/generator remains deferred.

## Commands

- Status: `git status --short`
- Diff summary: `git diff --stat`
- State length: `wc -l koder/STATE.md`

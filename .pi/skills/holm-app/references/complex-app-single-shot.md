---
title: Complex Holm App Single-Shot Protocol
updated: 2026-05-23
holm_version: 0.119.3
holm_source_commit: de9e73f4
---

# Complex Holm App Single-Shot Protocol

Use this when the requested Holm app combines many surfaces: multi-member workspaces, realtime/collaboration, uploads/media/blob links, async AI/tasks, native agents, PWA/mobile, polished responsive UI, themes, animation, sounds, admin/operator flows, or when the user asks for a high-confidence single-pass build.

This reference does not replace the topic refs. It forces them into one explicit build protocol so a maximal app is less likely to ship with missing glue.

## Required companion refs

Load these before implementation:

- `app-quality-and-contracts.md`
- `collaboration-production.md` for multi-member/realtime work
- `ui-excellence.md` for polished/responsive/PWA/theme/sound/motion work
- `runtime-and-storage.md` for API/storage/uploads/tasks/media
- `agents.md` when `private/agents/*` or `holm.agent.*` is involved
- `deployment.md` for validation/deploy handoff

For real generation/deploy prep, also follow `INDEX.md` and read the live Holm app/Zippy docs when available.

## Stop-and-plan gate

Before editing files, write a compact build brief with these sections:

1. **Product workflow** — the first useful screen and the main loop.
2. **Feature ledger** — every requested surface and the concrete artifact proving it.
3. **Route contract table** — method/path/auth/body/response/side effect/CLI check for every meaningful UI action.
4. **Data model** — collection/key/blob paths and whether each is app-shared, workspace-private, member-private, admin-only, or public.
5. **Auth matrix** — anonymous/member/workspace role/admin behavior for every route and page.
6. **Realtime contract** — channel names, event payloads, mutation routes, reconciliation routes, revision/idempotency/conflict rules, reconnect behavior.
7. **Async/media/AI contract** — job rows, task IDs, status/result/error/cancel/retry routes, provider mock lane, log correlation.
8. **Agent contract** — agent folders, triggers, events/webhooks, memory storage, server routes calling `holm.agent.send`, operator smoke steps, deploy with `--include-private`.
9. **UI contract** — loading/empty/error/signed-out/forbidden/offline/conflict/upload/job states, mobile and desktop layouts, theme/motion/sound/accessibility choices.
10. **Verification plan** — syntax, no-browser walkthrough, two-client realtime smoke, upload/media smoke, async job smoke, agent/operator smoke instructions, raw BFBB deploy, optional built mirror.

If any requested surface lacks a route, storage surface, UI state, or verification path, resolve that gap before coding.

## Single-attempt readiness contract

A "single attempt" means the agent may iterate internally, run any safe local tests, inspect diffs, and fix defects without asking the human to discover missing basics. Do not say the app is ready until the readiness gate passes.

Before final handoff, create a request traceability checklist from the user's prompt. Every requested noun/adjective/feature must map to at least one implemented artifact and one verification artifact. Examples:

| User asked for | Implementation proof | Verification proof |
| --- | --- | --- |
| login/auth/avatar | auth helper, `/api/me`, user menu/avatar component | Alice/Bob `/api/me`; visual/header route smoke |
| settings route | router entry + settings page + nav/menu link | route exists in source; browser/headless route smoke |
| theme switching | token-based palettes + persisted setting | toggle smoke; reload persistence check |
| sounds | sound helper + mute/reduced-motion setting | user-gesture smoke; mute disables feedback |
| data saved | write route + durable DS/KV/S3/member store | write/read CLI assertion |
| private user data | `holm.app.member.*` or membership-guarded shared rows | Alice/Bob/non-member isolation checks |
| realtime | compact events + reconciliation route | two-client WS smoke or explicit unverified note |
| PWA | `manifest.webmanifest`, root `sw.js`, icons, safe areas | install/offline/update smoke or explicit manual note |
| agents | `private/agents/<folder>` + route/operator contract | file-shape check + operator smoke instructions |

Human-discovered-basics prevention checklist:

- Header/user menu shows authenticated identity and avatar/fallback in signed-in state.
- Signed-out state has a clear login action and no broken member-only controls.
- Settings route/page exists if settings, themes, sounds, motion, or profile are present.
- Theme switch affects the actual UI, persists as intended, and survives reload/navigation.
- Sound controls include mute and do not autoplay; reduced-motion/mute states are respected.
- Every visible create/update/delete action has a backend route and durable state assertion.
- Reloading the app does not lose durable data that the product promises to save.
- Alice/Bob/private/non-member probes prove the stated privacy model.
- Every nav/sidebar/menu link resolves; no stale Zippy/demo routes remain unless intentional.
- Empty/loading/error/forbidden/offline/conflict/upload/job states are reachable or safely represented.
- Mobile and desktop layouts expose the same core actions.
- README/walkthrough commands match the implemented route names and app name.

If any item fails, keep iterating. The final answer should say what was actually tested and what remains manual/live-only; it should not offload basic acceptance testing to the human.

## Feature ledger template

| Surface | Implementation artifact | Verification artifact | Notes |
| --- | --- | --- | --- |
| Multi-member workspace | `workspaces`, `memberships`, role guard helper | Alice/Bob/non-member CLI checks | Team privacy is app-level membership, not `holm.app.member.*` |
| Realtime board/chat/presence | compact events + `GET .../state?since=` | two-client WS smoke + reconnect reconcile | Channels are notification labels, not ACLs |
| Conflict handling | `client_op_id`, `base_revision`, dedupe rows | stale `409` CLI check | Avoid contested read-modify-write blobs |
| Member-private vault | `holm.app.member.ds/kv/s3` | Alice cannot see Bob's state | Never use shared `prefs:${user.id}` for privacy |
| Uploads/media | `request.files`, S3 path, metadata row | upload route smoke + invalid MIME/size error | Prefer file handles over JS byte movement |
| Blob links | `holm.app.bl`/member bl with TTL/access | create/list/revoke link route checks | Links are intentional sharing controls |
| Async AI/media job | DS job row + `holm.task.spawn`/`holm.ai.job` | start/status/result/cancel checks | Routes return `202` quickly |
| Native agents | `private/agents/<folder>/agent.json` + `AGENTS.md` | operator commands documented; no live send without permission | Deploy requires `--include-private` |
| PWA/mobile | `manifest.webmanifest`, root `sw.js`, safe areas | install/offline smoke documented | Service worker cache must not hide updates |
| Themes | semantic tokens + settings persistence | theme toggle smoke | No raw Tailwind colors in product UI |
| Sounds | `src/lib/sounds.js` or equivalent + mute setting | user gesture + mute/reduced-motion check | No autoplay; keep sounds optional/subtle |
| Motion | CSS transitions/animations under 300ms | reduced-motion check | Do not animate layout-critical state |
| Operator handoff | README + scripts | copy-paste walkthrough | Include logs/debug commands |

## Implementation order

1. **Copy and rename Zippy** with `node_modules`/`dist` excluded; keep BFBB files and optional build mirror.
2. **Prune first**: remove stale Zippy demo routes/pages/agents that are not part of the target product.
3. **Add server helpers**: HTTP responses, route matching, validation, explicit JSON auth guards, workspace role guards, IDs/time, machine-readable errors.
4. **Implement core domain routes and storage** before UI polish.
5. **Implement collaboration safely**: membership guards on every read/write, durable ops/revisions, compact broadcasts, reconciliation routes.
6. **Add uploads/media/blob links** with MIME/size validation, metadata rows, and deliberate sharing policy.
7. **Add async work** through tasks/workers or `holm.ai.job`; never block route handlers on slow provider/media work.
8. **Add native agents** only when product-relevant; replace skeletal prompts, declare only public triggers, and inspect `private/` before deploy.
9. **Build product UI** around the real workflow with all required states, responsive layouts, semantic tokens, theme/motion/sound preferences, and PWA shell.
10. **Write the walkthrough and README** as part of the build, not afterthoughts.
11. **Run checks and fix failures** before calling the app done.

## Ambiguity killers

- App/member `holm.app.ds.find(...)` results are arrays in app bindings; admin app read helpers return paged objects such as `{ rows, cursor }`.
- For JSON API routes, prefer explicit `401`/`403` response helpers. Do not rely on redirect-style auth behavior in API contracts unless intentionally wrapped.
- Worker/task files are deployed app files and may use the worker handler shape accepted by Holm; do not assume `api/main.js` ESM route shape for workers.
- Serverless `api/` code must use relative imports under `api/`; do not use Node built-ins, npm-only imports, or imports escaping `api/`.
- Realtime events should carry IDs/revisions, not confidential payloads, unless channel authorization is proven and disclosure is acceptable.
- `holm.app.member.*` is one-member-private only; workspace/team privacy requires app-level membership records and route guards.
- Production OAuth, provider records, secrets, members, schedules, deployments, and app removal are operator concerns and require permission before mutation.
- The raw/BFBB app must render and operate without `npm install`, `npm run build`, or public runtime CDNs.
- Strict offline/sovereign mode requires self-hosted fonts and local PWA/runtime assets.
- If provider credentials are absent, ship a mock/synthetic lane and document the real provider setup without secret values.

## Verification gate

Minimum before final handoff for a complex app:

```bash
find api -name '*.js' -exec node --check {} \;
bash scripts/cli-walkthrough.sh
```

The walkthrough should prove:

- health and `/api/me`
- anonymous/member/admin or role failures
- Alice/Bob multi-member flows
- non-member read/write failures for protected workspaces
- at least one durable write and read for each core surface
- idempotency/revision/conflict behavior for contested writes
- member-private storage isolation when used
- upload/media/blob route behavior when used
- async job start/status/result/error/cancel or retry when used

Also run or document:

- two-client WebSocket smoke for realtime delivery/reconnect/reconcile;
- PWA install/offline/update smoke for PWA work;
- upload progress/failure browser smoke for media-heavy apps;
- optional `npm run build` only for the built mirror when dependencies are present;
- deploy commands, but do not run live deploys or other node mutations without permission.

If a check cannot be automated, say exactly what remains manual. Do not imply browser realtime, PWA installability, OAuth/provider behavior, native agent turns, or media pipelines are proven by route-only CLI tests.

## Done means

- The first screen is the actual product workflow, not a renamed demo hub.
- Every requested surface appears in the feature ledger and has a route/storage/UI/test artifact.
- API, auth, storage, realtime, async, media, agent, PWA, and UI contracts are explicit.
- Raw BFBB remains primary; optional build mirror is secondary.
- Stale Zippy names/routes/assets/agents are pruned unless intentionally retained.
- The app has a no-browser walkthrough and honest notes for any manual/live-only proof.

---
title: Holm App Quality And Contracts
updated: 2026-05-23
holm_version: 0.119.3
holm_source_commit: de9e73f4
---

# Holm App Quality And Contracts

Use this before and during serious Holm app builds. The goal is a useful product surface, not a renamed Zippy showcase.

## App brief

Write a compact app brief before editing:

- User goal and primary workflow.
- Surfaces needed: static UI, API, auth, storage, realtime, collaboration, uploads, tasks/AI, agents, operator scripts.
- Collaboration/realtime posture: membership scopes, channel privacy, conflict/idempotency model, and realtime verification plan.
- Raw deploy target and optional built mirror target.
- What must be pruned from Zippy.
- Known provider/secret/operator setup that cannot live in source.

## Route contract table

Every meaningful UI action should map to a route contract.

| Operation | Method/path | Auth | Body/query | Response | Durable side effect | CLI check |
| --- | --- | --- | --- | --- | --- | --- |
| Create item | `POST /api/items` | member | `{ "title": "..." }` | `{ "item": ... }` | `holm.app.ds.insert('items', item)` | `holm test run api/main.js /api/items -X POST -d ... -u alice@test` |
| Start job | `POST /api/jobs` | member | `{ "prompt": "..." }` | `202 { "job_id", "status_url" }` | job row + `holm.task.spawn` | `holm test run ... | jq .body.status_url` |
| Poll job | `GET /api/jobs/:id` | member | none | `{ "status", "progress", "logs", "result" }` | read-only | loop with `holm test run` or curl |

Rules:

- Route handlers are controllers: auth, validation, durable write, enqueue slow work, return IDs.
- Workers/tasks are executors: read durable input, do slow work, append progress/logs, write result/error.
- Errors should be machine-readable and consistent: `{ error, code? }`.
- List routes need explicit `limit`, `order`, and pagination/offset/cursor decisions.
- Contested multi-member writes need `client_op_id`/idempotency, revision or ordering, and a conflict/reconcile response.

## Data model and storage scope

Before coding, name each storage surface:

| Data | Scope | Surface | Key/collection/path | Notes |
| --- | --- | --- | --- | --- |
| Shared records | app-wide | `holm.app.ds` | `items` | queryable/auditable |
| Current compact state | app-wide | `holm.app.kv` | `state:*` | counters, flags, small snapshots |
| User private drafts | member-private | `holm.app.member.ds` | `drafts` | not visible to other members |
| User uploads | member-private | `holm.app.member.s3` | `uploads/<id>` | use request file handles |
| Public attachments | app-wide | `holm.app.s3` + `holm.app.bl` | `public/<id>` | create blob links intentionally |

Privacy rule: if data is private to a member, use `holm.app.member.*`. Shared keys containing `user.id` are not a privacy boundary.

## Auth and role matrix

Create a route/page matrix:

| Surface | Anonymous | Member | Admin/role | Notes |
| --- | --- | --- | --- | --- |
| Home/read-only overview | allowed | allowed | allowed | hide member-only actions |
| Create/update own item | 401/login | allowed | allowed | server enforces member ID |
| Admin dashboard | 401/login | 403 | allowed | use `holm.auth.requireAdmin()` or `requireRole()` |
| Member-private files | 401/login | owner only | admin only if deliberately using admin surfaces | use member storage |

Browser route guards are UX only. Server routes must enforce the same policy.

Production OAuth/provider setup is node/operator config, not app source. Do not build ad hoc email/password auth unless the current Holm source and task explicitly require it.

## Realtime contract

Use storage as truth and realtime as notification.

For each realtime feature, define:

- channel names (`room:<id>`, `item:<id>`, `dashboard`)
- event types and payloads
- route that mutates canonical state before broadcast
- client reconciliation route after reconnect or missed events

Pattern:

```text
POST intent -> validate/auth -> DS/KV write -> broadcast compact event -> clients reconcile from GET state route
```

Never make WebSocket messages the only durable source of truth.

Realtime safety rules:

- Treat realtime channels as notification routing labels, not privacy boundaries, unless the target Holm runtime explicitly provides server-enforced channel authorization for the app.
- Enforce member/workspace/role access in every read and write API route.
- Prefer compact events containing IDs/revisions over confidential payloads.
- Clients should reconcile through authorized state routes after connect/reconnect/missed events.

For multi-member rooms, docs, boards, chat, presence, or multiplayer, also load `collaboration-production.md` and define the revision/idempotency/conflict model before coding.

## Async/task contract

Use this when work may be slow, retry-prone, provider-backed, AI/media-heavy, or cancelable.

Required artifacts:

- durable request/job row in DS or task payload
- `POST /api/<thing>` returns `202` with `job_id` and `status_url`
- `GET /api/<thing>/jobs/:id` returns status/progress/logs/result/error
- cancel/retry routes if safe
- idempotency key for repeated starts
- log correlation with job/member IDs
- mock/synthetic lane if providers/secrets are absent

Prefer `holm.ai.job(...)` or `holm.task.spawn(...)` over long synchronous route handlers.

## UI state checklist

For polished, exemplar, showcase, or production-grade UI work, also load `ui-excellence.md` and the live Zippy polish/component/layout references.

For every non-trivial page/component, cover:

- loading/skeleton
- empty state with next action
- success/normal state
- validation errors
- network/server errors with retry path
- signed-out state
- forbidden/admin-only/read-only state
- optimistic pending vs confirmed state, if realtime/collab
- reconnecting/offline/reconciled state, if realtime/collab
- stale/conflict state, if collaborative writes can race
- queued/running/succeeded/failed/canceled state, if async jobs exist
- upload progress/failure state, if uploads exist
- mobile layout and desktop layout
- destructive-action confirmation
- accessible labels/focus states for key controls

The first screen should be the useful product workflow unless the task is specifically a landing/marketing page.

## BFBB/raw compatibility checklist

The primary app must run from raw files without npm/build/CDN runtime dependencies.

Avoid unless explicitly vendored/raw-compatible:

- browser imports from npm packages that only Vite resolves
- Vite aliases such as `@/` in raw-loaded browser modules
- TypeScript-only files in raw browser paths
- CSS/asset imports that only build tooling transforms
- build-time macros or env injection required for rendering
- public CDN runtime JS dependencies

Allowed optional tooling:

- `package.json` and lockfile for Vite dev/build mirror
- `npm run build` for `dist/` mirror
- npm script wrappers for tests, as long as direct shell/CLI commands also work

If strict offline/sovereign mode matters, self-host fonts too; Zippy's default Google Fonts link should be replaced or removed.

## Zippy pruning checklist

After copying Zippy:

- update `manifest.json`, `package.json`, title, descriptions, OpenGraph, icons, colors, tags
- replace visible brand text and nav
- delete unused demo pages/components/API routes
- delete example native agents unless the app needs agents
- update route guards and sidebar to match the real product
- preserve BFBB files unless intentionally dropping BFBB
- adapt `scripts/cli-walkthrough.sh` or add an equivalent
- search for stale `Zippy`, `demo`, and placeholder copy

## CLI-walkable handoff

A serious app should include at least one no-browser proof path:

- `scripts/cli-walkthrough.sh`, or
- `npm test` that wraps a direct script, or
- README command block using `holm test run` / curl / SDK.

The walkthrough should prove:

- health endpoint
- auth/me path with a test member
- at least one read
- at least one write
- one expected auth/error case
- key realtime-adjacent state mutation if applicable
- two-client WebSocket smoke instructions/results when realtime delivery matters
- async status/result if applicable

Prefer a temp DB for local tests. Do not require a live node for baseline route proof.

## README/deploy handoff

Generated app README or final answer should include:

- app purpose and feature list
- raw deploy command
- optional built mirror command
- whether `private/` is included and why
- auth/test-user/PAT setup notes
- route contract table or link
- no-browser walkthrough command
- logs/debug commands
- provider/secret setup placeholders with no secret values

## Done means

- raw app works without npm install/build
- API modules pass syntax checks
- CLI/headless route proof exists for core flows
- build mirror passes if the app keeps build tooling
- auth/storage/realtime decisions are explicit
- realtime apps document channel privacy, reconcile behavior, and whether delivery was actually smoke-tested
- multi-member writes have an idempotency/revision/conflict strategy where needed
- polished apps follow the UI excellence checklist and prune stale boilerplate
- private files and agents are intentional
- deployment commands use exact host routes and current flags

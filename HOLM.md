---
title: Holm Feature Inventory And Zippy Demo Coverage
updated: 2026-05-21
version: 0.119.3
commit: 895adce9
source_status: "dirty at review time; Zippy recipe had uncommitted changes"
project_path: ~/Projects/holmhq/holm/master/
zippy_path: knowledge-base/skills/app/recipes/zippy
---

# Holm Feature Inventory And Zippy Demo Coverage

This document is a repo-level feature map for Holm and a coverage review of the
tracked Zippy boilerplate/demo app. It is meant to be refreshed when `version.json`
changes or when the app/runtime surface meaningfully shifts.

Review basis for this refresh:

- `README.md`, `version.json`, `knowledge-base/CAPABILITY.md`, `knowledge-base/MATURITY.md`
- `knowledge-base/agent-context/{architecture,app-runtime,agent-runtime,agents,api}.md`
- `docs/concepts/*`, `docs/reference/{cli,http-api,sdk}.md`, operation docs
- CLI help from the installed `holm 0.119.3`, cross-checked against source command registration where available
- `cmd/server/main.go` route/command registration and adjacent command files
- `internal/` package layout, migrations, runtime/storage/agent/hosting sources
- Zippy source under `knowledge-base/skills/app/recipes/zippy/`

## 1. Product Shape

Holm is a sovereign-compute platform packaged as one Go binary plus one SQLite
database. The binary is disposable; the database is the instance. The shipped
product surface is CLI-first and JSON/API-friendly, with app hosting,
serverless JavaScript, storage, auth, realtime, AI access, native agents, email,
peer operations, and operational tooling all living in one process and one DB.

Important constraints and claims:

- **Single binary**: no required sidecars, control plane, Redis, Postgres, or CGO.
- **Single SQLite DB**: apps, deployed files, users/members, sessions, storage,
  config, logs, agent state, delivery state, and provider records live in SQLite.
- **CLI-first management**: `holm ...` and `holm @peer ...` are first-class.
- **Database-backed config**: flags are overrides; the DB config table is source of truth.
- **BFBB apps**: app source should run raw/static and also be buildable with Vite/tooling.
- **Pre-v1**: most public surfaces are beta; native agents/workers/channel adapters are more experimental.
- **Quasi-sovereign AI**: code/data/runtime are local to the node, but model inference currently calls remote providers.

## 2. Feature Inventory

### 2.1 Install, Lifecycle, Upgrade, And Service Operations

- Install script and local binary workflow (`install.sh`, `holm upgrade`).
- Service lifecycle and manual runtime modes:
  - `holm server init/start/status/set-config/set-credentials`
  - `holm start --runtime-mode auto|service|manual`
  - `holm stop --force`, `holm restart`, `holm status`, `holm logs`
- Remote lifecycle through peers:
  - `holm @peer status`, `holm @peer upgrade`, `holm @peer restart`, `holm @peer logs`
- SQLite migrations under `internal/database/migrations`, currently through
  `090_bl_password_protection.sql`.
- Operational backups are file-copy backups of the SQLite DB after stopping or snapshotting the service.
- Local DB maintenance:
  - `holm db prune`
  - `holm db artifact create/verify/verify-proof/retention-dry-run`

### 2.2 Peer Model And Remote Command Routing

- Named peers stored locally and targetable via `@peer` prefix.
- `holm peer list/add/remove/default/check/update-token`.
- `holm @peer peer ...` can manage the target node's own peer config.
- Remote command registry classifies command families as remote, partial,
  local-only, SSH-only, or deprecated and emits guided errors rather than
  unknown-command failures.
- Remote management uses API keys/tokens and the command gateway where typed
  HTTP routes are not yet promoted.

### 2.3 App Hosting, Deploy, Source, And Routing

- Apps are deployed directories with `manifest.json`, static files, optional
  `api/main.js`, optional `private/`, and optional `private/agents/*`.
- Static hosting is backed by the virtual file system in SQLite.
- Exact-FQDN host routes are the current production routing primitive:
  - `holm host list/add/update`
  - `/api/hosts*` CRUD, reserve, split, swap
- Legacy alias data and helpers still exist for compatibility in app lookup,
  metadata, command-gateway paths, SDK legacy helpers, and app link/unlink/reserve
  flows. New routing should use exact-FQDN host routes; do not treat top-level
  `holm alias` or `/api/aliases*` as current primary surfaces.
- Deploy surfaces share one pipeline:
  - `holm app deploy <dir>` with `--host`, `--spa`, `--no-build`,
    `--include-private`, `--system`, `--force`, `--from-json <file|->`
  - multipart `POST /api/deploy`
  - SDK deploy helpers
  - native-agent `app_deploy` tool
- App management:
  - list/info/status/files/logs/remove/pull/fork/lineage/forks
  - app flags via `promote`/`demote` (`--public`, `--node-app`)
  - `app install` / `app upgrade` command paths still exist, but the reviewed
    source currently rejects them as temporarily unavailable after deploy
    app-name removal. Prefer clone/build manually, then `app deploy` with `--host`.
- Source metadata, pull, and source inspection exist, but git-sourced install/upgrade
  should be treated as in flux until the temporary guard is removed.
- SPA routing is supported by app metadata/deploy flags.
- Static cache/security headers are handled in the hosting layer.

### 2.4 Serverless JavaScript Runtime

- Runtime: Sobek, Holm's Go-native JavaScript engine path.
- Current default API shape is ESM:
  - `api/main.js`
  - `export default async function handler(request)`
  - relative static imports under `api/`
  - top-level `await`
  - dynamic `import()` confined to `api/`
- Legacy script/`respond(...)` handlers remain supported for migration/simple files.
- Request object:
  - `method`, `path`, `query`, `headers`, `body`, `files`
  - JSON body parsing, multipart form parsing, staged file upload handles
- Response object:
  - `{ status, body, headers }` or `respond(...)` helper forms
- Bundled stdlib modules for serverless code:
  - `lodash`, `cheerio`, `uuid`, `zod`, `marked`, `dayjs`, `validator`
- Console and `holm.log.*` write to app logs.
- `holm test run` and `holm app run --headless` provide local execution paths.

### 2.5 Serverless `holm.*` Namespace

Core app/runtime namespaces:

- `holm.app.id`, `holm.app.name`, `holm.version`
- `holm.env.get/has`
- `holm.secrets.get`
- `holm.log.info/warn/error/debug`
- `holm.auth.*`
- `holm.app.ds`, `holm.app.kv`, `holm.app.s3`
- `holm.app.member.ds`, `holm.app.member.kv`, `holm.app.member.s3`
- `holm.app.media`, `holm.app.member.media`
- `holm.app.bl`, `holm.app.member.bl`
- `holm.private.*`
- `holm.realtime.*`
- `holm.task.*` and lower-level `holm.worker.*`
- `holm.net.fetch(...)`
- `holm.ai.chat(...)` and `holm.ai.job(...)`
- `holm.image.resize/thumbnail`
- `holm.admin.roles.*`
- `holm.admin.app.{ds,kv,s3,media,bl}` read/list helpers
- `holm.agent.send/list/get/token`
- `holm.time.sleep(ms)` in worker contexts

### 2.6 Storage Primitives

SQLite-backed app storage has shared and member-scoped variants.

**Document Store (`ds`)**

- Collections of JSON documents.
- Methods: `insert`, `find`, `findOne`, `update`, `delete`, `count`.
- Query operators: equality, `$eq`, `$ne`, `$gt`, `$lt`, `$gte`, `$lte`,
  `$in`, `$nin`, `$contains`, `$or`.
- Update operators: direct assignment, `$set`, `$unset`, `$inc`.
- Storage engine also supports FTS-backed `Search` and SQL-backed `Aggregate`;
  those are exposed today through native agent/admin DS tools, not the basic
  `holm.app.ds` app binding.

**Key-Value (`kv`)**

- Methods: `set(key, value, ttlMs?)`, `get`, `delete`, `list(prefix?)`, `increment`.
- TTL support is available for expiring data.
- Native-agent tools add `kv_cas` for atomic compare-and-swap.

**Blob/S3 (`s3`)**

- Methods: `put(path, data, mimeType?)`, `get`, `delete`, `list(prefix?)`.
- Fast path for `request.files.<field>` and `holm.net.fetch(..., { responseType: 'file' })` handles.
- Shared and member-private blob namespaces.

**Member-scoped storage**

- `holm.app.member.*` throws unless a member is authenticated.
- Use for private preferences, drafts, uploads, per-user artifacts, and agent memory.

### 2.7 Blob Links And File Sharing

Blob links are a sharing/control layer over shared blobs.

- Runtime namespace: `holm.app.bl` / `holm.app.member.bl`.
- CLI: `holm link create/list/get/update/suspend/revoke`.
- API/SDK: `/api/apps/{id}/links*`, `admin.links.*`, `app.links.*`.
- Public route family: `/f/<slug>` plus subroutes:
  - raw/inline: `/f/<slug>` or `/f/<slug>/raw`
  - download: `/f/<slug>/download`
  - redirect/go: `/f/<slug>/go`
  - metadata JSON: `/f/<slug>/json`
  - browser preview: `/f/<slug>/preview`
  - password challenge: `/f/<slug>/challenge`
- Link controls:
  - custom/random slug
  - expiry
  - max downloads and atomic consume count
  - revoke/suspend/exhaust lifecycle states
  - message
  - access list
  - response-header overrides
  - password protection with bcrypt hash, challenge endpoint, cookie unlock,
    raw/download/go inline challenge page, and per-IP throttling
- Preview UI has a built-in default and app override at `private/blobs/preview/index.html`.
- Redirect blobs allow a blob link to act as a controlled redirect target.

### 2.8 Auth, Members, Roles, And Identity

- Browser auth:
  - OAuth providers: Google, GitHub, Discord, Microsoft
  - Local dev provider on local HTTP/IP development nodes
  - sessions and cookies stored in SQLite
  - per-host OAuth/session strategy exists in recent migrations/source
- Programmatic auth:
  - system API keys for operator/admin surfaces
  - member PATs (`holm_pat_*`) for app/member programmatic access
  - SDK can read `HOLM_MEMBER_AUTH` in Node/Bun when no explicit auth is passed
- Unified members:
  - kinds: `human`, `agent`, `service`
  - lifecycle: active, disabled, suspended, pending approval
  - deterministic generated persona/avatar for native members
  - CLI: `holm member create/token/list/pending/info/approve/disable/suspend/activate`
- Roles:
  - system roles: owner/admin/user
  - app roles via `app_member_roles`
  - serverless `holm.auth` guards and `holm.admin.roles.*` helpers
- Member routing:
  - canonical addresses, member addresses, contacts, presence
  - operational labels (`@security`, `@support`) with team/resource/event kinds,
    bindings, watches, and member lookup integration
- Invitations and legacy user admin routes exist, but password/email account creation
  is intentionally constrained until email verification is first-class.

### 2.9 Realtime

- WebSocket endpoint: `/_ws` on app hosts.
- Client messages support subscribing/unsubscribing to channels.
- Serverless broadcast API:
  - `broadcast(channel, data)`
  - `broadcastAll(data)`
  - `subscribers(channel)`
  - `count(channel?)`
  - `kick(clientId, reason?)`
- Recommended pattern is server-authoritative:
  1. client POSTs intent to `/api/*`
  2. server validates/auths/writes storage
  3. server broadcasts canonical state/event
  4. subscribed clients update from WebSocket messages
- Fits chat, lobbies, collaborative editing, presence, dashboards, multiplayer,
  notifications, and live feeds.

### 2.10 Workers, Tasks, Async AI, And Long Work

- Worker/job system backed by `worker_jobs` and pool execution.
- Serverless APIs:
  - `holm.worker.spawn/get/list/cancel/wait`
  - `holm.task.spawn/get/list/cancel/wait`
- `holm.task` is the preferred facade for app authors.
- Job options include handler, retry, retry delay, timeout, priority, memory,
  member scope, unique/idempotency key.
- Worker logs persist to `app_logs` and worker job log payloads.
- Worker contexts can use `holm.time.sleep(ms)` for bounded polling/backoff.
- `holm.ai.job(chatOptions, taskOptions?)` enqueues native worker-backed AI chat
  rather than doing long AI work inside route handlers.
- Route handlers should be fast controllers; slow AI/media/provider/polling work
  belongs in tasks/workers.

### 2.11 AI Access

- `holm.ai.chat(options)` in serverless and `ai_chat` in native agents.
- `holm.ai.job(...)` for durable async chat tasks.
- Provider records live under family `ai.chat`; the `default` provider is required.
- Provider config points at node/app secrets through `config.secret_ref`, with
  optional `base_url` and `default_model`.
- App-scoped provider records override instance records of the same name.
- OpenAI-compatible and Anthropic provider code paths exist.
- Runtime validates messages/model parameters and records per-member/app usage.
- Budgets/concurrency limits protect route handlers and apps.
- Multimodal/file-ref support resolves image/document blobs from shared or member
  storage into provider-compatible content blocks.
- AI is remote-provider-backed today; local inference is roadmap, not shipped.

### 2.12 Network Egress, Providers, Secrets, And Connectors

- `holm.net.fetch(url, options?)` supports method, body, multipart form, timeout,
  auth, headers, response type, and staged file responses.
- Egress is governed by allowlist, SSRF protections, call budgets, size limits,
  and optional per-domain controls.
- CLI:
  - `holm net allow/list/remove`
  - `holm secret set/list/remove`
  - `holm secret runtime set/list/remove`
  - `holm provider set/list/rm`
- Providers are scoped config records for runtime/operator integrations.
- Runtime secrets are encrypted at rest and can be looked up by serverless code,
  native agent tools, providers, and connector calls.
- Native agents additionally get `connector_call(...)` and `net_fetch(...)` tools.

### 2.13 Image And Media

- `holm.image.resize(arrayBuffer, options)` and `holm.image.thumbnail(arrayBuffer, size)`.
- `holm.app.media` / `holm.app.member.media`:
  - `serve(path, options?)`
  - `probe(input)`
  - `transcode(path, options?)`
- Media cache/storage code exists for metadata and transformed variants.
- Intended for uploaded images, generated media, thumbnails, and bounded video/audio processing flows.

### 2.14 Native Agents

Agents are app members whose code/brain is deployed under `private/agents/<folder>/`.

Agent model:

- `agent.json` declares the public trigger surface.
- `AGENTS.md` is required; `IDENTITY.md`, `SOUL.md`, `USER.md`, `HEARTBEAT.md`,
  `skills/*/SKILL.md`, `templates/`, `schemas/`, and shared `private/agent-context/*`
  are additive.
- Brain files are immutable between deploys; durable memory belongs in member-scoped storage.
- Runtime brain overlay (`brain:overlay/*`) is bounded prompt-facing mutable memory.
- Agent IDs are deterministic from app ID and folder.
- Agents may be app-scoped or node-promoted through the owner-only `--node-app` lane.

Declared triggers:

- `message`
- `heartbeat`
- `webhook`
- `event`

Synthetic/internal trigger paths:

- scheduled
- delegation
- approval_result
- pipe

Runtime capabilities:

- Tool catalog currently documents `86` unique tools (`75` base + contextual tools).
- Tool families include brain, brain overlay, secrets, AI, usage, inspect,
  member lookup/presence, shared/member DS/KV/S3, DS aggregate/search, KV CAS,
  blob links, scheduling, delegation, pipe, webhook response, network,
  connector calls, event emit, app deploy, template render, thread messages,
  annotations, and approval gates.

Operator/admin surface:

- CLI: `holm agent pause/resume/message/inspect/log/thread/takeover/replay`.
- CLI schedules: `holm schedule list/create/cancel`.
- HTTP/SDK: `/api/apps/{id}/agents/{folder}/...` operator routes for messages,
  logs, inspect, usage, jobs, replay, send, schedules, delegations, approvals,
  threads, annotations, KV/DS/blobs/brain/brain-overlay, member lookup, presence.
- Circuit breaker state supports manual pause/resume and failure snapshots.

### 2.15 Channels, Email, Telegram, Webhooks, And Delivery

- Outbound email:
  - `holm email send`
  - `POST /api/email/send`
  - provider-backed send adapters in `internal/channels` (Maileroo/Resend paths exist)
- Inbound email:
  - Cloudflare Email Routing setup/teardown
  - `POST /_holm/email/inbound`
  - receipts, raw body, attachment storage, replay, synthetic injection, deletion, download
- Telegram:
  - inbound route `POST /_holm/telegram/inbound/{bot}`
  - Bot API adapter and address helpers
- Webhook ingress:
  - public `/webhook/*` route family
  - admin webhook definitions at `/api/webhooks*`
- Webhook subscriptions/fan-out:
  - `/api/webhook-subscriptions*`
  - native agent event/webhook integration
- Delivery ledger:
  - persistent outbound delivery state
  - `holm delivery list/retry/retry --all-failed`
  - retry classification for failed deliveries

### 2.16 Observability, Logs, Analytics, And Activity

- App/serverless logs:
  - `holm app logs <app> [-f]`
  - `/api/system/logs` and `/api/logs` families
  - worker logs include handler/job/member/agent tags
- Server logs:
  - `holm logs`, `holm @peer logs`
  - streaming routes for system/runtime logs
- Activity logs:
  - `holm activity list/stats/cleanup/export`
  - filtering by app, action, time, result, weight
- Public analytics helpers:
  - `/track`, `/pixel.gif`, redirects, `/api/stats`
- System introspection:
  - health, public node status, config, limits, limits schema, cache, DB, benchmark stats
- Bench tooling:
  - `holm bench run`
  - `holm bench compare`
  - capacity docs and artifact-backed benchmark guidance
- Debug/test surfaces:
  - pprof routes in server registration
  - local `holm test` helpers for users/sessions/API execution

### 2.17 HTTP API And SDK

Supported route families are mirrored by `packages/holm-sdk` where possible.

SDK entrypoints:

- `createClient()` for admin/operator tools.
- `createAppClient()` for app/browser/member tools.
- `createDebugClient()` for inspection/smoke work.
- `admin.http` and `app.http` escape hatches.
- Client cache with TTL/SWR, request dedupe, mutation invalidation, events.
- Upload helpers, progress hooks, resumable upload session/chunk/complete flow.
- Mock adapter and audits for route coverage.

Admin namespaces include auth, apps, legacy alias helpers, hosts, system, logs, links, members,
users, invites, keys, deploy, envvars, lifecycle, redirects, webhooks,
webhook subscriptions, email, templates, secrets, stats, labels, peer/provider/net,
delivery, dataset, and agents.

App namespaces include auth, links, app HTTP, cache, upload, and pagination helpers.

### 2.18 Security And Policy Surfaces

- OAuth/session/PAT/API-key split keeps browser/member/operator credentials distinct.
- Runtime secrets are not app files and are encrypted at rest.
- Egress allowlist and SSRF protection constrain serverless/agent outbound fetches.
- Blob-link password protection hashes per-link passwords and throttles guesses.
- Auth-gated blob routes apply no-store/private cache policy.
- `security.txt` can be node-wide or scoped by host/app:
  - `holm security-txt set/show/disable`
  - `/api/security-txt`
  - public `/.well-known/security.txt` and `/security.txt`
- Static hosting and TLS allowlist/security helpers live under `internal/hosting`.
- Operators should manage DB state through the binary/CLI, not manual SQLite patches.

### 2.19 Headless Browser And CLI-Walkable App Testing

Holm now has substantial code for a non-rendering browser simulator and local
headless execution, though the broader product issue is still open.

Current surfaces/code:

- `holm test run api/main.js /api/path --browser chrome|safari|strict`
- `holm app run --headless <app-dir> --browser strict --path /api/...`
- `internal/browser/` injects browser-like APIs into Goja:
  - `window`, `self`, `navigator`, `console`, `document.cookie`
  - `location`, `history`, events, timers, microtasks
  - `localStorage`, `sessionStorage`, IndexedDB-backed DS mapping
  - `fetch`, `Headers`, `Request`, `Response`, `AbortController`
  - `WebSocket`, `XMLHttpRequest`, `BroadcastChannel`, `postMessage`
  - `URL`, `URLSearchParams`, text encoders/decoders
  - `crypto`, `crypto.subtle`, `structuredClone`, `matchMedia`, `performance`
  - stubs for notifications, observers, rAF/idle callbacks, EventSource
- This is the foundation for CLI-walkable, browserless app debugging, but Zippy
  does not yet include a complete walkthrough script/scorecard.

## 3. Zippy Boilerplate Review

Zippy is the tracked reference app at `knowledge-base/skills/app/recipes/zippy/`.
It is a Vue 3 + Tailwind v4 app that runs raw/BFBB with vendored browser assets
and also builds through Vite. It includes an ESM serverless API, browser SDK
wrapper, auth composable, realtime composable, design tokens, settings, sounds,
analytics, and six demo pages.

### 3.1 What Zippy Covers Well

| Holm surface | Zippy coverage |
| --- | --- |
| BFBB raw app | `index.html`, `src/main.bfbb.js`, vendored Vue/router/SFC loader/Tailwind/Lucide assets under `vendor/bfbb/` |
| Built mirror | `vite.config.js` strips raw-only tags and enables Vite build output |
| App manifest | `manifest.json` with app name, SPA flag, display metadata, tags |
| ESM API shape | `api/main.js` exports `async handler(request)` and imports route modules from `api/routes/*` |
| Split server modules | `api/lib/context.js`, `api/lib/http.js`, `api/lib/id.js`, route modules per demo |
| SDK app client | `src/lib/api.js` uses vendored `holm-sdk.js` and SDK cache defaults |
| Browser auth | `src/lib/auth.js`, `/api/me`, login/logout helpers, router auth guards, account UI |
| Shared DS | analytics events, guestbook entries, collab activity, canvas history, lobby rooms/chat |
| Shared KV | collab counter, canvas grid, preferences keyed by user ID |
| Realtime | `src/lib/realtime.js`, Pulse, Collab, Canvas, Lobby |
| Realtime methods | Pulse demonstrates `broadcast`, `broadcastAll`, `count`, `subscribers`, `kick` |
| Server-authoritative multiplayer | Collab/Canvas/Lobby all POST to API, validate/store, then broadcast |
| App UI shell | responsive shell, sidebar/header/footer, breadcrumbs, cards, loading skeletons |
| Design system | `src/zippy.css` tokens, palettes, light/dark/system theme support |
| PWA-ish metadata | mobile web app tags, icons, social preview |
| App analytics pattern | queue + batch POST to `/api/events`, summary page |
| Native agent source examples | four message-trigger agents under `private/agents/{chatbot,researcher,writer,reviewer}` |

### 3.2 Current Zippy Demo Set

| Demo | Main files | Features shown |
| --- | --- | --- |
| Home | `src/pages/home/*` | auth status, sound settings, vibe slider, status badges |
| Settings | `src/pages/settings/*` | local UI settings, theme/palette/sound, account card |
| Analytics | `api/routes/analytics.js`, `src/pages/demos/analytics/*` | DS insert/find, batched event posting, summary aggregation in app code |
| Guestbook | `api/routes/guestbook.js`, `src/pages/demos/guestbook/*` | auth-required posting, DS insert/find, avatars/timestamps |
| Pulse | `api/routes/pulse.js`, `src/pages/demos/pulse/*` | WebSocket connect/subscribe, broadcast/all, subscriber stats, kick |
| Collab | `api/routes/collab.js`, `src/pages/demos/collab/*` | shared KV counter increment, DS activity feed, realtime sync |
| Canvas | `api/routes/canvas.js`, `src/pages/demos/canvas/*` | shared KV grid, DS history, realtime pixel updates, auth-required writes |
| Lobby | `api/routes/lobby.js`, `src/pages/demos/lobby/*` | DS rooms/chat, membership list in document state, realtime room events |
| Agents | `private/agents/*` | minimal current-format `agent.json` + `AGENTS.md` message agents |

### 3.3 Important Zippy Gaps

Legend: **Missing** = no working demo; **Partial** = some usage exists but the
major Holm concept is not represented as a copy-pasteable pattern.

| Feature area | Coverage | Gap |
| --- | --- | --- |
| Member-scoped storage | Missing | Zippy stores preferences in shared KV keyed by `user.id`; it does not demonstrate `holm.app.member.ds/kv/s3`. |
| Blob/S3 uploads | Missing | No multipart upload, `request.files`, `holm.app.s3.put/get/list/delete`, or member upload gallery. |
| Blob links | Missing | No demo for creating/listing/updating/revoking links, TTL, max downloads, access lists, headers, or password-gated `/f/<slug>` flows. |
| Image/media services | Missing | No `holm.image.resize/thumbnail`, `holm.app.media.probe/transcode/serve`, or generated thumbnail/media processing flow. |
| Workers/tasks | Missing | No `holm.task.spawn/get/list/wait/cancel`, worker logs, progress/status polling, idempotency, retry, timeout, or cancellation demo. |
| Async AI | Missing | No `holm.ai.chat` or `holm.ai.job` example, no AI status/result route pattern, no file-ref multimodal demo. |
| Network egress | Missing | No `holm.net.fetch`, allowlist/secrets/provider-backed integration, multipart outbound form, or fetched file-to-S3 flow. |
| Runtime secrets/env | Missing | No `holm.env.get/has` or `holm.secrets.get` demo and no UI showing config-vs-secret patterns. |
| Private files | Missing | No `holm.private.read/readJSON/exists/list` route and no auth-gated static `private/` file example. |
| Serverless stdlib | Missing | No `import { ... } from 'zod'`, `uuid`, `dayjs`, `marked`, `cheerio`, etc. example in API modules. |
| Dynamic imports/top-level await | Partial | Zippy uses static ESM imports and async handlers, but not dynamic `import()` or top-level `await`. |
| DS full CRUD | Partial | DS insert/find are used; update/delete/count/operators/orderBy/limit are not shown as first-class UI demos. |
| DS query operators | Missing | No demo for `$gt`, `$in`, `$contains`, `$or`, `$inc`, `$unset`, sorted/paginated queries, or count. |
| DS FTS/aggregate | Missing | No native-agent/admin DS `search` or `aggregate` example. |
| KV full surface | Partial | `get`, `set`, and `increment` appear; `list`, `delete`, TTL, and CAS are absent. |
| Auth roles | Partial | Basic login/logout and route guards exist; no `requireAdmin`, `requireRole`, app roles, or `holm.admin.roles.*`. |
| PAT/API-key flows | Missing | No script/SDK example for member PATs, API keys, or `HOLM_MEMBER_AUTH`. |
| Admin app reads | Missing | No `holm.admin.app.ds/kv/s3/media/bl` read/list pagination or audit pattern. |
| App/member management | Missing | No app membership management or member lifecycle demo. |
| Operational labels | Missing | No `@label` lookup/bind/watch demo. |
| Native agents | Partial | Agent files exist, but only message triggers; no heartbeat/event/webhook/schedule/delegation/pipe/approval/tool usage UI. |
| Agent operator UX | Missing | No in-app or documented CLI walkthrough for `holm agent message/inspect/log/thread/replay/takeover`. |
| Agent deploy caveat | Partial | Zippy has `private/agents`, but the README deploy example does not show `--include-private`; agents are easy to omit. |
| Email | Missing | No outbound email send, inbound receipt viewer, attachment flow, or agent-on-email demo. |
| Telegram/channel adapters | Missing | No Telegram inbound or channel delivery demo. |
| Webhooks/subscriptions | Missing | No inbound webhook agent/app demo and no outbound webhook subscription/fan-out UI. |
| Delivery recovery | Missing | No failed delivery ledger/retry demonstration. |
| Host routes/security.txt | Missing | No operator companion page/script for host route CRUD, scoped security.txt, or route/preview behavior. |
| App source/fork/pull/install-upgrade caveat | Missing | No demo or docs card for fork/lineage/pull workflows or the current install/upgrade-unavailable fallback path. |
| App logs/correlation | Partial | Demos do not intentionally write `holm.log.*` with request/member/job correlation. |
| CLI-walkable testing | Missing | No `scripts/app-walkthrough.sh`, no `holm test run` matrix, no `curl`/SDK walkthrough proving each route without a browser. |
| Headless browser | Missing | No `holm app run --headless` demo or browser-preset validation of Zippy logic. |
| Copy drift | Partial | Analytics page says `holm.app.events` and guestbook says `holm.app.docs`; current runtime names are `holm.app.ds` / app-defined event records. |

### 3.4 Suggested Demo Backlog For Full Feature Coverage

These are candidate additions so Zippy/the kitchen sink becomes a copy-pasteable
example of every major Holm feature. Some are UI demos; some should be operator
walkthrough cards/scripts because not every node-level feature belongs inside an app UI.

1. **Member Vault**
   - Demonstrate `holm.app.member.kv/ds/s3` with private preferences, drafts,
     and avatar/file uploads.
   - Show contrast with shared `holm.app.*` storage.

2. **Files + Share Links Gallery**
   - Multipart upload via `request.files` to shared/member S3.
   - List/get/delete blobs.
   - Create blob links with TTL, max downloads, password, access list, custom headers.
   - Show raw/download/json/preview/challenge URLs.

3. **Image + Media Lab**
   - Upload image/video/audio.
   - Generate thumbnail/resize with `holm.image`.
   - Probe/transcode/serve with `holm.app.media` where supported.

4. **Task Lab**
   - Route creates a durable request row, calls `holm.task.spawn`, returns `202`.
   - UI polls `holm.task.get` or app status endpoint.
   - Include retry, idempotency key, progress, cancel, logs, and timeout examples.

5. **AI Studio**
   - Short sync `holm.ai.chat` example with guardrails.
   - Long async `holm.ai.job` example with status/result.
   - File-ref example from S3/member S3.
   - Provider setup notes using `holm provider` + `holm secret runtime`.

6. **Integration Fetch Lab**
   - `holm.net.fetch` to an allowlisted test API.
   - Secret-backed Authorization header.
   - Multipart outbound form forwarding an uploaded file.
   - `responseType: 'file'` copied into S3.

7. **Private Files + Roles Demo**
   - `holm.private.readJSON` for server-only config/templates.
   - `holm.auth.requireLogin/requireAdmin/requireRole` guarded routes.
   - `holm.admin.roles.add/remove/list/find` app-role workflow.

8. **DS Explorer**
   - Full CRUD with update/delete/count.
   - Query operator playground.
   - Ordered/limited leaderboard (`scores` use case from Issue `#042`).
   - Native-agent/admin search and aggregate examples if exposed through an agent card.

9. **KV Lab**
   - TTL-backed ephemeral entries.
   - Prefix list and delete.
   - Counter plus CAS/lock pattern through native-agent tool or documented CLI/admin route.

10. **Agent Desk**
    - UI and CLI walkthrough for the four bundled agents.
    - Add heartbeat, event, webhook, schedule, delegation, pipe, and approval examples.
    - Show brain reads/templates, brain overlay, member memory, thread annotations,
      inspect, logs, usage, pause/resume, and replay.

11. **Webhook + Event Console**
    - Inbound webhook to app/agent.
    - `event_emit` to event-triggered agents.
    - Outbound webhook subscriptions with delivery result display.

12. **Mailbox Demo**
    - Outbound email send from route/CLI.
    - Inbound receipt list/read/download attachments.
    - Replay unmatched receipt to an agent address.
    - Delivery retry card.

13. **Telegram/Channel Demo**
    - Minimal bot/agent address binding docs plus local/synthetic path if real
      Telegram credentials are not available.

14. **Operator Companion Page/Script**
    - Host route add/update/list.
    - Scoped `security.txt` set/show/disable.
    - App deploy raw and built mirror.
    - App fork/lineage/pull and install/upgrade fallback (`clone/build/deploy`
      while the command guard remains).

15. **CLI Walkthrough + Headless Test Harness**
    - `scripts/app-walkthrough.sh` that creates a test user/session, exercises
      each API route with `holm test run` or deployed HTTP, verifies logs, and
      exits non-zero on drift.
    - `holm app run --headless ... --browser strict` smoke check.
    - A README section that an agent/operator can follow without opening a browser.

### 3.5 Priority Recommendation

If the goal is “every major Holm feature has a nice demo,” the highest-value
order is:

1. Files + member-scoped storage + blob links.
2. Tasks/async AI with CLI-walkable status and logs.
3. Agent Desk covering non-message triggers, schedules, delegation, and approvals.
4. Network/secrets/providers fetch lab.
5. Email/webhook/channel delivery demos.
6. Operator companion scripts for host/security/deploy/source workflows.

That sequence covers the biggest undocumented product primitives first and also
turns Zippy into the regression corpus for generated Holm apps.

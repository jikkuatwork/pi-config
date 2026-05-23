---
title: Holm Feature Inventory And Zippy Coverage
updated: 2026-05-23
holm_version: 0.119.3
holm_source_commit: de9e73f4
source_repo: /home/glasscube/Projects/holmhq/holm/master
source_status: clean at review time
zippy_path: knowledge-base/skills/app/recipes/zippy
---

# Holm Feature Inventory And Zippy Coverage

This is the skill-local Holm context file. It replaces the old repo-root long `HOLM.md` body so the `holm-app` skill is self-contained. When details drift, trust the live Holm repo at `/home/glasscube/Projects/holmhq/holm/master`.

Review basis for this refresh:

- `version.json`
- `knowledge-base/skills/app/SKILL.md`
- `knowledge-base/skills/app/checklist.md`
- `knowledge-base/skills/app/recipes/zippy/README.md`
- `knowledge-base/skills/app/references/cli-walkable-apps.md`
- `knowledge-base/agent-context/app-runtime.md`
- `knowledge-base/agent-context/agents.md`
- `knowledge-base/agent-context/agent-runtime.md`
- Live Zippy files under `knowledge-base/skills/app/recipes/zippy/`

## Product shape

Holm is a sovereign-compute platform packaged as one Go binary plus one SQLite database. The binary is disposable; the database is the instance. The product surface is CLI-first and JSON/API-friendly, with app hosting, serverless JavaScript, storage, auth, realtime, AI access, native agents, email/channels, peer operations, and operational tooling in one process and one DB.

Important constraints:

- Single binary; no required Postgres, Redis, sidecar, control plane, or CGO.
- Single SQLite DB contains apps, deployed files, users/members, sessions, storage, config, logs, agent state, delivery state, and provider records.
- CLI-first management through `holm ...` and `holm @peer ...`.
- Database-backed config; flags are overrides.
- BFBB apps: raw source should run without Node/npm/build tooling, while a Vite build can still produce a mirror.
- Pre-v1: app/runtime surfaces are beta; native agents/workers/channel adapters are more experimental.
- AI inference is remote-provider-backed today; code/data/runtime remain local to the node.

## Current app-builder defaults

- Use Zippy for real full-stack apps; use minimal templates only for tiny examples.
- Keep primary deploy BFBB/raw with vendored browser runtime assets.
- Keep npm/Vite optional: useful for dev server, build mirror, and script wrappers, never required for the raw app.
- New server code uses ESM `api/main.js` with `export default async function handler(request)`.
- Split server modules with relative imports under `api/`; do not escape `api/`, use Node built-ins, or depend on arbitrary npm packages in serverless code.
- Use `createAppClient()` in the browser.
- Use exact-FQDN host routes: `holm @peer app deploy . --host app.example.com --spa --no-build`.
- Build serious apps as CLI-walkable: route contracts, durable IDs, status/log/result endpoints, and `holm test run`/curl/script checks.

## App hosting and deploy

A Holm app is a deployed directory:

```text
my-app/
├── manifest.json
├── index.html
├── src/
├── api/
│   └── main.js
├── private/
│   └── agents/
└── vendor/
```

Current deploy surfaces share one pipeline:

- `holm app deploy <dir>` with `--host`, `--spa`, `--no-build`, `--include-private`, `--system`, `--force`, `--from-json`.
- multipart `POST /api/deploy`.
- SDK/native-agent deploy helpers where current.

Use exact host routes. Do not use removed `--to`, `--name`, or `--alias` patterns for new deploys. Deploy hostless first if you need to inspect an app ID, then bind or retarget with `holm host add/update`.

## Serverless runtime

Runtime: Sobek. Default API shape:

```js
export default async function handler(request) {
  if (request.method === 'GET' && request.path === '/api/health') {
    return { body: { ok: true } }
  }
  return { status: 404, body: { error: 'Not found' } }
}
```

Request fields:

- `method`, `path`, `query`, `headers`, `body`, `files`

Return values:

- `{ status, headers, body }`
- `{ body }`
- any JSON-serializable value
- `null`/`undefined` for empty `200`

Supported current runtime features:

- static and dynamic relative ESM imports under `api/`
- top-level `await`
- legacy `respond(...)` for migration/tiny handlers
- bundled stdlib modules in serverless contexts: lodash, cheerio, uuid, zod, marked, dayjs, validator
- console and `holm.log.*` entries persisted to app logs
- `holm test run` and `holm app run --headless` for local/headless execution paths

## Serverless `holm.*` namespaces

Common app/runtime namespaces:

- `holm.app.id`, `holm.app.name`, `holm.version`
- `holm.env.get/has`, `holm.secrets.get`
- `holm.log.info/warn/error/debug`
- `holm.auth.*`
- `holm.app.ds`, `holm.app.kv`, `holm.app.s3`, `holm.app.media`, `holm.app.bl`
- `holm.app.member.ds/kv/s3/media/bl`
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

## Storage primitives

Use shared app storage for data visible to the app:

- `holm.app.ds` for queryable JSON records.
- `holm.app.kv` for exact keys, counters, feature flags, compact current state, and TTL.
- `holm.app.s3` for files/uploads/blobs.
- `holm.app.media` for media helpers.
- `holm.app.bl` for shareable blob links.

Use member-scoped storage for data private to one member:

- `holm.app.member.ds/kv/s3/media/bl`

Hard privacy rule: do not emulate member privacy with shared keys such as `prefs:${user.id}` unless the data is intentionally app/admin-readable.

Document Store app binding returns arrays for `holm.app.ds.find(...)`. Admin app read helpers return page objects such as `{ rows, cursor }`.

DS supports equality, `$eq`, `$ne`, `$gt`, `$lt`, `$gte`, `$lte`, `$in`, `$nin`, `$contains`, `$or`; updates support direct assignment, `$set`, `$unset`, `$inc`.

## Auth and roles

Browser auth:

- OAuth providers in production.
- Local dev provider on local/IP development nodes.
- Sessions/cookies stored in SQLite.
- App browser client uses `createAppClient()` and `app.auth.me/login/logout`.

Server auth:

- `holm.auth.getMember()`, `isLoggedIn()`, `isOwner()`, `isAdmin()`, `hasRole(role)`.
- Guards: `requireLogin()`, `requireRole(role)`, `requireOwner()`, `requireAdmin()`.
- Role helpers: `holm.admin.roles.add/remove/list/find` for app roles.

Programmatic auth:

- operator/admin API keys
- member PATs (`holm_pat_*`)
- SDK can read `HOLM_MEMBER_AUTH` in Node/Bun when no explicit auth is passed

Generated apps should include an auth/role matrix for meaningful routes.

## Realtime

WebSocket endpoint: `/_ws` on app hosts.

Recommended pattern:

1. client POSTs intent to `/api/*`
2. server validates/auths/writes storage
3. server broadcasts canonical compact event
4. clients update or reconcile from storage/API

Server API:

- `broadcast(channel, data)`
- `broadcastAll(data)`
- `subscribers(channel)`
- `count(channel?)`
- `kick(clientId, reason?)`

Use for chat, collaboration, presence, dashboards, lobbies, notifications, and live feeds.

## Tasks, workers, and AI

Routes should be fast controllers. Slow provider calls, polling, retries, AI, and media pipelines belong in tasks/workers.

Preferred route pattern:

```text
POST /api/jobs -> validate/auth -> write job row -> holm.task.spawn(...) or holm.ai.job(...) -> 202 { job_id, status_url }
GET /api/jobs/:id -> status/progress/logs/result/error
POST /api/jobs/:id/cancel -> terminal cancellation where possible
```

Runtime surfaces:

- `holm.task.spawn/get/list/cancel/wait`
- `holm.worker.spawn/get/list/cancel/wait`
- `holm.ai.chat(...)` for small synchronous calls
- `holm.ai.job(...)` for durable async chat tasks
- worker logs visible in `app_logs` and worker job detail payloads

Provider records live under `ai.chat`; secrets belong in Holm secret/provider surfaces, not files.

## Network, uploads, blob links, media

- Uploads are available as `request.files.<field>`; pass file handles directly to `holm.app.s3.put(...)` or member S3.
- `holm.net.fetch(url, options)` supports method/body/form/headers/auth/timeout/responseType; egress is governed by allowlists, budgets, SSRF protections, and size limits.
- `responseType: 'file'` returns a staged file handle suitable for S3 storage without moving bytes through JS.
- Blob links under `holm.app.bl` / `holm.app.member.bl` support raw/download/preview/challenge URLs, expiry, max downloads, revoke/suspend, access controls, and password-gated flows.
- Image/media helpers include `holm.image.resize/thumbnail` and `holm.app.media.probe/transcode/serve`.

## Private files

`private/` can hold server-only files and native agents. It is excluded from directory deploys unless `--include-private` is used.

Runtime private file helpers:

- `holm.private.read(path)`
- `holm.private.readJSON(path)`
- `holm.private.exists(path)`
- `holm.private.list()`

Inspect `private/` before deploy. Do not ship plaintext secrets; use Holm secrets/providers.

## Native agents

Agents are app members whose code/brain is deployed under `private/agents/<folder>/`.

Required:

- `agent.json`
- `AGENTS.md`

Optional:

- `IDENTITY.md`, `SOUL.md`, `USER.md`, `HEARTBEAT.md`
- `skills/*/SKILL.md`
- `templates/`, `schemas/`
- shared context under `private/agent-context/*` allowlisted by `agent.json`

Public trigger declarations:

- `message`, `heartbeat`, `webhook`, `event`

Do not declare synthetic runtime triggers such as `scheduled`, `delegation`, `approval_result`, or `pipe` in `agent.json`.

Agent runtime tools cover brain, overlays, secrets, AI, usage, inspect, shared/member DS/KV/S3, DS search/aggregate, KV CAS, blob links, scheduling, delegation, pipe, webhook response, network, connector calls, event emit, app deploy, template render, thread messages/annotations, and approval gates.

## Observability and testing

Useful day-two surfaces:

- `holm app logs <app> -n 100` / `-f`
- `holm logs`
- `holm activity list --limit 50`
- `holm app status/files/info/list`
- `holm test run api/main.js /api/path`
- `holm app run --headless <app-dir> --browser strict --path /api/...`

Reference/prod handoffs should target a CLI-walkable score near 10/10: route contracts, deployed smoke commands, async debugging, correlated logs, headless checks, and operator docs.

## Zippy boilerplate current state

Path:

```text
/home/glasscube/Projects/holmhq/holm/master/knowledge-base/skills/app/recipes/zippy/
```

Zippy is the tracked full-stack reference app: Vue 3 + Tailwind v4, raw/BFBB with vendored browser assets, buildable through Vite, ESM serverless API, browser SDK wrapper, auth composable, realtime composable, settings/sounds/analytics, and demo pages.

Current important files:

- `index.html` loads vendored BFBB runtime assets and strips them in build mode.
- `src/main.bfbb.js` raw Vue SFC bootstrap.
- `src/main.js` Vite entry.
- `vendor/bfbb/` pinned Vue/router/SFC loader/Tailwind/Lucide assets.
- `api/main.js` ESM server handler with split route modules.
- `api/lib/context.js`, `api/lib/http.js`, `api/lib/id.js` helpers.
- `src/lib/api.js`, `auth.js`, `realtime.js` browser helpers.
- `scripts/cli-walkthrough.sh` browserless route walkthrough using a temp DB.
- `private/agents/*` skeletal message-agent examples.

Zippy covers well:

- BFBB raw app and buildable mirror.
- ESM serverless route pattern.
- Browser auth, `/api/me`, login/logout helpers, route guards.
- Shared DS/KV examples.
- Realtime broadcast/count/subscribers/kick examples.
- Server-authoritative collab/canvas/lobby workflows.
- Responsive UI shell and design tokens.
- CLI-walkable route proof for core demos through `bash scripts/cli-walkthrough.sh` or `npm test`.

Zippy still does not fully demonstrate every Holm feature. Missing or partial demo surfaces include:

- true member-scoped storage examples (`holm.app.member.*`)
- multipart uploads/S3 galleries
- blob links and password/TTL/max-download flows
- image/media processing
- tasks/workers and async AI status/result patterns
- network egress/secrets/provider-backed integrations
- private file reads
- stdlib import examples such as `zod`
- full DS/KV operator coverage, pagination, query playgrounds
- app roles/admin role workflows
- rich native agent flows beyond message-trigger skeletons
- email/Telegram/webhook/delivery demos
- operator companion pages for hosts/security/source workflows

## Zippy generation implications

When generating a real product app from Zippy:

1. Copy with `node_modules` and `dist` excluded.
2. Rename manifest/package/title/social metadata/assets.
3. Replace visible brand and nav.
4. Prune demo pages, routes, API modules, and example agents unless requested.
5. Preserve `vendor/bfbb/`, `src/main.bfbb.js`, `vite.config.js` BFBB build transform, browser auth/API/realtime helpers where needed.
6. Keep npm optional. `package.json` is useful for Vite build/dev and script wrappers; the raw app must deploy without install/build.
7. Add app-specific CLI walkthrough or adapt Zippy's `scripts/cli-walkthrough.sh`.
8. Document raw deploy and built mirror deploy.

## Suggested feature backlog for a full Holm showcase

If the goal is a kitchen-sink demo of every major Holm feature, add these in order:

1. Member Vault: true member-scoped KV/DS/S3 plus private preferences/drafts/files.
2. Files + Share Links Gallery: multipart upload, S3 list/get/delete, blob links with TTL/password/access.
3. Task + AI Lab: durable jobs, progress/status/logs, cancel/retry, sync and async AI.
4. Integration Fetch Lab: allowlisted egress, secrets, multipart forwarding, file responses into S3.
5. Private Files + Roles: `holm.private.*`, `requireRole`, `admin.roles`.
6. Agent Desk: heartbeat/event/webhook, schedules, delegation, approval, logs/inspect/replay.
7. Webhook/Event/Mailbox/Channel demos and delivery retry.
8. Operator companion scripts for host routes, deploys, security.txt, source/fork/pull.

## Refresh policy

- Add or update `updated`, `holm_version`, and `holm_source_commit` frontmatter whenever these docs are refreshed.
- If `version.json` changes or live Zippy docs shift, re-read the live source before generating/deploying apps.
- Keep this skill-local inventory canonical; keep root `HOLM.md` as a short pointer for repo agents.

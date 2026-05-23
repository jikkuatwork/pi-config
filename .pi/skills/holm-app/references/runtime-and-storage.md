---
title: Runtime, Storage, Auth, And Realtime
updated: 2026-05-23
holm_version: 0.119.3
holm_source_commit: de9e73f4
---

# Runtime, Storage, Auth, And Realtime

Source-of-truth path when details matter:

```text
/home/glasscube/Projects/holmhq/holm/master/knowledge-base/agent-context/app-runtime.md
```

## Serverless entrypoint

New Holm app server code lives under `api/` and handles `/api/*`. Default to ESM:

```js
// api/main.js
import { listItems } from './routes/items.js'

export default async function handler(request) {
  if (request.method === 'GET' && request.path === '/api/items') {
    return { body: { items: listItems() } }
  }

  return { status: 404, body: { error: 'Not found' } }
}
```

Rules:

- Use `export default async function handler(request)` or named `export function handler(request)`.
- Use relative imports (`./routes/items.js`) inside `api/`.
- Keep imports sandboxed under `api/`; do not escape the deployed API tree.
- Top-level `await` and dynamic relative `import()` are supported.
- Do not assume Node built-ins, arbitrary npm imports, timers, or filesystem access.
- Use bundled server stdlib bare imports only when the current runtime/docs list them; app-local modules should still use relative imports under `api/`.
- Legacy `respond(...)` scripts exist for migration/tiny handlers, but are not the default for new apps.

## Request and response

`request` fields:

- `method`
- `path`
- `query`
- `headers`
- `body`
- `files`

Return values:

- `{ status, headers, body }`
- `{ body }`
- any JSON-serializable value
- `null`/`undefined` for an empty `200`

Use response helpers similar to Zippy:

```js
export function json(body = {}, status = 200, headers = {}) {
  const response = { status, body }
  if (Object.keys(headers).length > 0) response.headers = headers
  return response
}
```

## Route contracts first

For non-trivial apps, design route contracts before coding:

- operation name
- method/path
- auth/role requirement
- body/query shape
- response shape
- durable DS/KV/S3/task side effect
- CLI check with `holm test run`, curl, or script

This keeps the app testable without browser state and prevents UI-only flows.

## Storage choice

Shared app state:

| Need | Surface |
| --- | --- |
| Queryable records | `holm.app.ds` |
| Exact keys, counters, TTL | `holm.app.kv` |
| Files/uploads | `holm.app.s3` |
| Media helpers | `holm.app.media` |
| Shareable blob URLs | `holm.app.bl` |

Member-private state uses the same surfaces under `holm.app.member.*`.

Practical default:

- Use `holm.app.ds` for records you filter, list, or audit.
- Use `holm.app.kv` for counters, preferences that are intentionally shared/admin-readable, feature flags, and compact current state.
- Use `holm.app.s3` for binary uploads/files.
- Use `holm.app.member.*` when one member's data must not be visible to others.

Privacy rule: shared keys containing `user.id` are not a privacy boundary. For private user preferences, drafts, uploads, or memory, use member-scoped storage.

## DS and KV snippets

```js
const id = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8)

const item = {
  id: id(),
  title: String(request.body.title || '').trim(),
  createdAt: Date.now()
}

holm.app.ds.insert('items', item)
const rows = holm.app.ds.find('items', { status: 'open' }, { limit: 50, order: 'desc', orderBy: 'createdAt' })
holm.app.ds.update('items', { id: item.id }, { $set: { status: 'done' } })

const count = holm.app.kv.increment('metrics:visits')
holm.app.kv.set('cache:home', { count }, 60_000)
```

`holm.app.ds.find(...)` and `holm.app.member.ds.find(...)` return arrays in app serverless bindings. Do not call `.rows` on these app/member results. Admin app read helpers such as `holm.admin.app.ds.find(...)` return paged objects such as `{ rows, cursor }`.

DS query operators include equality, `$eq`, `$ne`, `$gt`, `$lt`, `$gte`, `$lte`, `$in`, `$nin`, `$contains`, and `$or`. Updates support direct assignment, `$set`, `$unset`, and `$inc`.

## Uploads and blobs

Prefer runtime file handles instead of manually moving bytes through JavaScript:

```js
export default async function handler(request) {
  if (request.method === 'POST' && request.path === '/api/upload') {
    holm.auth.requireLogin()
    const file = request.files.file
    if (!file) return { status: 400, body: { error: 'file required' } }

    const path = `uploads/${Date.now()}-${file.name}`
    holm.app.member.s3.put(path, file, file.type)
    return { status: 201, body: { path } }
  }
}
```

For remote binary fetches, `holm.net.fetch(url, { responseType: 'file' })` returns a staged file handle that can be stored via S3 surfaces.

Blob links are intentional sharing controls over blobs:

```js
const link = holm.app.bl.create('public/report.pdf', {
  ttl: '24h',
  maxDownloads: 5,
  download: true,
  message: 'Temporary report link'
})
```

Use member blob links only when the underlying blob is member-private and the sharing policy is deliberate.

## Auth

For JSON API routes, prefer explicit guards that return the route contract's machine-readable `401`/`403` responses. `requireLogin()`/`requireAdmin()` are useful, but may produce thrown/redirect-style behavior unless wrapped by your HTTP helpers.

Server:

```js
const member = holm.auth.getMember()
if (!member) return { status: 401, body: { error: 'login required' } }
// or:
holm.auth.requireLogin()
holm.auth.requireAdmin()
holm.auth.requireRole('reviewer')
```

Browser:

```js
import { createAppClient } from './holm-sdk.js'

export const app = createAppClient()
const me = await app.auth.me()
app.auth.login(window.location.href)
await app.auth.logout()
```

Production OAuth providers are node-level configuration, not per-app source code. Do not build ad hoc email/password auth into apps unless the task and current Holm source explicitly call for it.

For workspace/team privacy, use shared app records plus app-level `memberships`/roles checked in every route. `holm.app.member.*` is for one member's private data; it is not a group-private storage scope.

## Realtime pattern

Use storage as truth and realtime as notification:

1. Validate and authorize.
2. Mutate `holm.app.ds` or `holm.app.kv`.
3. Broadcast compact event with `holm.realtime.broadcast(channel, data)`.
4. Browser reconciles from storage/API when needed.

Treat channels as notification labels, not ACLs, unless current Holm source proves server-enforced channel authorization for the target app. For private rooms/workspaces, broadcast IDs/revisions and fetch full state through authorized API routes.

```js
holm.app.ds.insert('messages', message)
holm.realtime.broadcast(`room:${roomId}`, {
  type: 'room:message',
  message
})
```

Browser clients connect to `/_ws`, subscribe/unsubscribe by channel, respond to ping with pong, and reconnect with backoff. Use Zippy's `src/lib/realtime.js` unless there is a good reason not to.

## Background tasks and AI

Routes should return quickly. For slow provider calls, retries, polling, AI, or media pipelines:

- Create durable input/status state.
- Enqueue with `holm.task.spawn(...)` or `holm.ai.job(...)`.
- Return `202` with a job/task ID and status URL.
- Provide status/result endpoints using `holm.task.get/list/wait`.

`holm.ai.chat(...)` is for small synchronous calls. If budget may be tight, default to `holm.ai.job(...)`.

For non-AI background work, `holm.task.spawn(handlerPath, options)` expects a deployed app file path such as `workers/summarize.js`. Current JS worker handlers are not `api/main.js` ESM handlers; use the worker shape accepted by Holm:

```js
// workers/summarize.js
module.exports = function handler(job) {
  job.log(`starting ${job.id}`)
  job.progress(10)
  const input = job.data || {}
  // do slow work, use injected holm.* namespaces where available
  job.progress(100)
  return { ok: true, inputId: input.id }
}
```

Spawn with durable data and idempotency:

```js
const task = holm.task.spawn('workers/summarize.js', {
  data: { workspaceId, requestId },
  idempotencyKey: `summary:${workspaceId}:${requestId}`,
  retry: 2,
  retryDelay: '10s',
  timeout: '2m'
})
```

Worker files are deployed app content; do not put secrets in them. Use Holm secrets/providers and `private/` files intentionally.

## Private files

Use `private/` for server-only templates/config examples/agent source that must deploy with the app. Runtime helpers:

- `holm.private.read(path)`
- `holm.private.readJSON(path)`
- `holm.private.exists(path)`
- `holm.private.list()`

`private/` requires deploy with `--include-private`. Do not put secrets in private files; use Holm secrets/providers.

## Admin app/member surfaces

App admin query helpers exist under `holm.admin.app.*` and explicit member helpers under `holm.admin.member(id).*`. Use them only when the app declares/uses the relevant manifest capabilities and the feature is truly admin-facing.

Common capabilities:

- `app-admin` for app-admin role behavior.
- `admin-app-read` for cross-member app read/list helpers.
- `admin-member-read` for admin member read helpers.
- `admin-member-write` for admin member write helpers; it implies member read but not `admin-app-read`.

Keep normal member-facing state on `holm.app.*` / `holm.app.member.*`.

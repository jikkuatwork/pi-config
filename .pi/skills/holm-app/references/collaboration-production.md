---
title: Production Collaboration And Realtime
updated: 2026-05-23
holm_version: 0.119.3
holm_source_commit: de9e73f4
---

# Production Collaboration And Realtime

Use this for any Holm app with multi-member rooms, workspaces, boards, docs, chat, presence, dashboards, multiplayer games, live review flows, or other realtime collaboration.

Keep the posture generic: model the product domain first, then apply these reliability and privacy rules.

## Core rule

Realtime is a notification fabric. Storage and authenticated API routes are the authority.

```text
client intent -> authenticated API route -> durable state/op -> compact realtime event -> client reconcile API
```

Do not make WebSocket delivery the only source of truth. Do not let a channel subscription be the only authorization check.

## Realtime privacy and channel safety

Before broadcasting, decide what a channel leak would expose.

Current safe default:

- Treat channel names such as `room:<id>` or `workspace:<id>` as routing labels, not privacy boundaries, unless current Holm source explicitly proves server-enforced channel authorization for your app.
- Enforce membership/role access in every API route that reads or mutates protected state.
- Broadcast compact references, not sensitive document bodies or private chat text, on guessable channels.
- Let clients fetch full details through authorized `GET /api/...` reconciliation routes.

Preferred event shape:

```json
{
  "type": "board:changed",
  "event_id": "evt_...",
  "workspace_id": "w_...",
  "resource_id": "board_...",
  "revision": 42,
  "actor_id": "holm_usr_...",
  "occurred_at": 1760000000000
}
```

Only include full payloads when all of these are true:

1. the payload is not confidential, or disclosure to any subscriber on that channel is acceptable;
2. membership was enforced before the write;
3. reconnect/reconcile still works without that event.

If confidential server-authorized channel delivery is a product requirement and Holm does not provide channel ACLs for the target runtime, call it out as a platform gap instead of patching around it in app code.

## Scope model

Name each state scope before coding:

| Scope | Storage | Guard |
| --- | --- | --- |
| Public app state | `holm.app.ds/kv/s3` | usually read-only or public route policy |
| Workspace/team state | `holm.app.ds/kv/s3` | app-level `memberships` / roles checked in routes |
| Member-private state | `holm.app.member.*` | login plus member binding from Holm |
| Admin/operator state | admin routes/surfaces | `requireAdmin`, `requireRole`, and manifest capabilities when needed |

Holm member storage is member-private. It is not a group/workspace privacy primitive. For team-private data, store shared records and enforce app-level membership on every route.

## Collaboration data model

Avoid high-contention read-modify-write blobs for core collaborative state.

Prefer one of these patterns:

1. **Record-per-entity** — tasks/cards/comments/memberships are separate DS rows.
2. **Append-only operation log** — whiteboards/docs/canvases append operations and derive snapshots.
3. **Compact KV snapshot + DS op log** — KV stores current revision/snapshot; DS stores auditable ops.

Use arrays embedded in one DS document only for low-contention metadata. If multiple members may update it at once, split it into separate records or an op log.

## Revision, idempotency, and conflict contract

For contested collaborative writes, define:

- `client_op_id` or `idempotency_key` supplied by the client;
- `base_revision` supplied by the client when editing a versioned resource;
- server-generated monotonic `revision` or timestamp ordering;
- durable dedupe record keyed by member/resource/client operation;
- `409` conflict response when the base revision is stale;
- reconciliation route such as `GET /api/boards/:id/state?since=<revision>`.

Typical route response:

```json
{
  "ok": true,
  "revision": 43,
  "event_id": "evt_...",
  "state_url": "/api/boards/board_123/state?since=42"
}
```

Conflict response:

```json
{
  "error": "stale revision",
  "code": "conflict.stale_revision",
  "expected_revision": 42,
  "actual_revision": 44,
  "state_url": "/api/boards/board_123/state?since=42"
}
```

## Membership and role guards

Create small server helpers for app-domain authorization instead of scattering checks:

```js
export function requireWorkspaceMember(workspaceId, member) {
  if (!member) return { status: 401, body: { error: 'login required', code: 'auth.required' } }
  const membership = holm.app.ds.findOne('memberships', {
    workspaceId,
    memberId: member.id,
    status: 'active'
  })
  if (!membership) return { status: 403, body: { error: 'forbidden', code: 'workspace.forbidden' } }
  return { member, membership }
}
```

Server routes should check ownership/membership/role before returning full state, not only before writes.

## Presence

Presence is a hint, not durable truth.

- Keep presence compact: member ID, display name, current room, status, last seen.
- Store last-seen/heartbeat in KV or DS with explicit expiry logic.
- Broadcast presence deltas, but reconcile from a `GET /api/.../presence` route.
- Do not use presence as proof of authorization or membership.

## Reconnect and missed events

Clients should handle missed, duplicate, and out-of-order events:

1. connect and subscribe;
2. immediately fetch current authorized state;
3. track `last_revision` per resource;
4. on event with `revision > last_revision + 1`, fetch a reconcile route;
5. after reconnect, fetch state using the last known revision;
6. ignore duplicate `event_id` / `revision` events.

## UI states for collaboration

Realtime UI needs more than loading/error:

- connected
- reconnecting
- offline/disconnected
- optimistic pending
- saved/confirmed
- rejected/validation error
- stale/conflict
- reconciled after missed events
- read-only/forbidden
- empty room/no collaborators

Show these states without layout shift. Keep destructive or irreversible collaborative actions confirmed and auditable.

## Verification

`holm test run` is necessary but not sufficient for realtime.

Baseline route walkthrough should use a temporary DB and at least two members:

- create Alice/Bob/Admin test identities;
- prove anonymous failures;
- create/join workspace or room;
- prove non-member read/write failures;
- perform one write by Alice and one by Bob;
- prove state persisted and revisions/idempotency behave;
- prove member-private state isolation when applicable;
- start/poll/cancel async work when applicable.

Realtime smoke should also run against a local or deployed app with two WebSocket clients:

- both clients subscribe to the intended channel;
- one client mutates state through the API;
- both clients receive the compact event;
- a reconnecting client reconciles from the API;
- unauthorized API access still fails;
- no confidential payload is broadcast on channels that are not server-authorized.

If you cannot automate the two-client WebSocket smoke, document the manual two-browser check and say realtime is not fully proven by the CLI walkthrough alone.

## Done means

- Route contracts include membership/role guards and machine-readable errors.
- Shared collaborative state has revision/idempotency/conflict behavior where needed.
- Realtime events are compact notifications with reconciliation routes.
- Private data is not broadcast on unauthenticated or merely guessable channels.
- Multi-member walkthrough proves storage and auth rules without a browser.
- Realtime behavior is tested or explicitly called out as unverified.

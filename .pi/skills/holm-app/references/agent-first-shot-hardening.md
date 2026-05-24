---
title: Agent First-Shot Hardening For Complex Holm Apps
updated: 2026-05-24
holm_version: 0.119.3
assumption: issue_340_readiness_pipeline_available
---

# Agent First-Shot Hardening For Complex Holm Apps

Use this reference when stress-testing the `holm-app` skill, designing a maximal app, or asking what remains risky after Holm has a strong app-builder readiness pipeline.

This file assumes the Issue #340 foundation exists: `holm app doctor`, `app.contract.json`, `holm test scenario`, `holm test ws`, app scopes, server-authorized realtime, revision/idempotency helpers, PWA doctor, agent validation, and worker/task checks. When those commands are not present in the target Holm runtime, treat the command names below as design targets and fall back to the current scripts in `deployment.md` and `complex-app-single-shot.md`.

## Stress-app mental model

A useful maximal stress target is a single coherent product, not a bag of demos:

> **Live Studio** — authenticated workspaces where several members edit Notion-like docs, chat in Discord-like rooms, manipulate a multiplayer board/canvas, upload media, generate AI summaries/assets, share expiring blob links, and delegate moderation/review to native agents. It is installable as a PWA, works on mobile/desktop, supports themes/sounds/motion, and exposes operator/admin flows.

Required surfaces:

- App scopes: org/workspace/project/room/document/board, each with member/role policies.
- Auth: anonymous landing, member shell, scope role matrix, admin/operator dashboard.
- Data: DS records for workspaces/docs/messages/ops/jobs/audits; KV for revisions/snapshots/presence; S3/media/blob links for files.
- Realtime: authorized scope channels, compact events, presence hints, reconnect reconciliation, missed/duplicate/out-of-order handling.
- Collaboration: operation logs, revisions, idempotency, conflict responses, snapshots, compaction, export.
- Async: AI/media tasks with durable jobs, logs, retry/cancel, provider mock lane.
- Agents: private agent brains, event/message/webhook triggers, scoped memory, approvals for high-impact actions.
- UI: doc editor, chat, board/game interaction, upload panels, job monitor, settings, PWA/offline, admin/debug.
- Verification: doctor + contract + scenario + n-client realtime + PWA + agent + task validation.

## Post-#340 gaps to keep looking for

Even with the readiness pipeline implemented, agents can still fail in these areas.

### 1. Coherent exemplar gap

Primitive labs prove surfaces independently. Agents need at least one polished, integrated app that composes scopes + realtime + ops + uploads + async + agents in one product workflow. Without it, generated apps tend to stitch correct primitives into inconsistent UX and data models.

**Improve Holm/skill:** keep a maintained `complex-collab` exemplar with a route contract, `app.contract.json`, scenario files, realtime scenarios, and README. Use it as the pattern source for agents instead of primitive demos alone.

### 2. Contract/source drift

Agents duplicate routes in API code, router/nav links, README, scenario files, and final answers. Drift causes missing settings routes, stale links, undocumented auth behavior, or tests that do not match implementation.

**Pattern:** make `app.contract.json` the source of truth and generate or check:

- route registry stubs;
- scenario skeletons;
- README route table;
- UI nav/link inventory;
- realtime channel/event matrix;
- PWA/agent/task expectations.

### 3. Scope leakage across surfaces

A scope primitive solves workspace/team privacy only if every related surface carries the same `scope_id`: DS/KV/S3 paths, blob links, realtime channels, task jobs, agent memory, audit rows, analytics, and admin queries.

**Pattern:** every non-public row/event/job/blob should include:

```json
{
  "scope_id": "workspace:w_123",
  "resource_id": "doc:d_456",
  "visibility": "scope",
  "actor_member_id": "holm_usr_...",
  "created_at": 1760000000000
}
```

Doctor/scenario should flag protected records/events/jobs without scope metadata.

### 4. Collaboration semantics gap

Notion-like editing needs more than stale-revision checks. Agents need an explicit choice among:

- last-write-wins fields for low-value metadata;
- append-only op logs for boards/canvases/docs;
- CRDT/Yjs-like document operations if rich text merging matters;
- lock/lease flows for resources that cannot merge;
- snapshot + op compaction for long-lived resources.

**Improve Holm/skill:** add recipes for each model and force the build brief to name one per resource. If Holm does not provide CRDT primitives, agents should not imply Google Docs-grade merge semantics.

### 5. Realtime QoS and game-loop gap

Discord-like chat and game-like interaction have different constraints. Chat can reconcile from DS. Game-like movement may need ephemeral high-frequency events, rate limiting, interpolation, and periodic authoritative snapshots.

**Pattern:** split realtime channels by durability:

| Class | Example | Storage truth | Event payload | Test |
| --- | --- | --- | --- | --- |
| Durable | chat/doc/board ops | DS/KV op log | IDs/revisions | scenario + WS |
| Presence | cursors/typing/online | KV last-seen TTL | compact hint | WS + expiry |
| Ephemeral | drag/game movement | snapshot or none | position/frame | WS load + fallback |

Do not store every pointer-move as a DS row. Do not promise replay for ephemeral events unless implemented.

### 6. Security and abuse controls

Readiness can prove happy paths while missing abuse cases.

Required decisions:

- XSS/sanitization for chat, doc rich text, markdown, filenames, previews.
- CSP and safe iframe/embed policy.
- Upload MIME sniffing, size quotas, executable/content-type rejection.
- Blob-link leakage, password/TTL/max-download policy, revoke semantics.
- Per-member/per-scope rate limits for chat, realtime, uploads, tasks, AI.
- SSRF/egress allowlists and secret redaction.
- Audit logs for admin, role, sharing, agent, and destructive actions.

### 7. Migrations and fixtures

Complex apps evolve. Generated apps often hard-code seed data and assume empty DBs.

**Improve Holm:** first-class app migrations or a recommended migration route/tool:

```text
api/migrations/001_init.js
api/migrations/002_add_scope_audits.js
scripts/apply-migrations.sh
```

**Pattern:** store schema version in KV (`schema:version`) and include idempotent seed fixtures only for test/demo mode.

### 8. Observability and correlation

Agents need logs that connect route -> storage op -> realtime event -> task -> agent turn.

**Pattern:** generate and propagate:

- `request_id`
- `client_op_id`
- `event_id`
- `job_id`
- `scope_id`
- `actor_member_id`

Every route response for a mutation should include at least `request_id`, `resource_id`, `revision`, and `event_id` when relevant.

### 9. Agent blast radius

Native agents can read/write app data and trigger workflows. A generated app should avoid invisible autonomous mutation.

**Pattern:** agent actions use one of three lanes:

1. **Read-only assistant** — can summarize/search, cannot mutate.
2. **Proposal lane** — writes proposals/tasks requiring human approval.
3. **Trusted executor** — can mutate scoped resources, but emits audit rows and uses approval gates for destructive/expensive actions.

Agent memory should be member/scoped, not global. Agent event triggers should be narrow and explicitly listed.

### 10. Browser/PWA/audio proof gap

Holm-native source checks should remain the core, but some behavior cannot be proven without a real browser or device: contenteditable quirks, drag/drop, upload progress, audio gesture policy, PWA installability, offline update behavior, and focus traps.

**Pattern:** add an in-app QA route or self-test panel for manual/device checks, and label these as manual/live-only unless an optional browser harness is available.

### 11. Performance and load

A first-shot app can be correct but collapse under concurrent users.

**Improve Holm:** scenario support for load profiles: n users, m scopes, concurrent writes, upload bursts, task fanout, websocket fanout, and rate-limit assertions.

**Pattern:** every complex app should name rough budgets:

- expected concurrent clients per scope;
- max message/ops per second;
- max upload size/count;
- max pending tasks per member/scope;
- retention/compaction policy.

### 12. Data lifecycle

Apps need export/delete/retention, especially when agents and uploads are involved.

**Pattern:** include routes or operator notes for:

- member data export;
- scope export;
- delete/archive workspace;
- revoke blob links;
- purge expired uploads/jobs/events;
- agent memory reset.

## High-leverage patterns for agents

### Build brief expansion

Add these sections to the complex-app brief when the app is maximal:

1. **Scope graph** — app/org/workspace/project/room/document/board/member scopes and inheritance.
2. **Mutation envelope** — common fields required on all writes.
3. **Data lifecycle** — migration, seed, retention, export, purge.
4. **Security/abuse matrix** — XSS, upload, blob-link, rate-limit, egress, secrets.
5. **Performance budget** — expected clients/events/uploads/tasks and graceful degradation.
6. **Manual proof list** — browser/device-only checks not covered by Holm-native readiness.

### Mutation envelope

For every create/update/delete route, prefer a common input/output shape:

```json
{
  "scope_id": "workspace:w_123",
  "resource_id": "doc:d_456",
  "client_op_id": "op_browser_uuid",
  "base_revision": 41,
  "payload": {}
}
```

Response:

```json
{
  "ok": true,
  "request_id": "req_...",
  "event_id": "evt_...",
  "resource_id": "doc:d_456",
  "revision": 42,
  "state_url": "/api/scopes/workspace:w_123/docs/d_456/state?since=41"
}
```

Conflict:

```json
{
  "error": "stale revision",
  "code": "conflict.stale_revision",
  "expected_revision": 41,
  "actual_revision": 42,
  "state_url": "/api/scopes/workspace:w_123/docs/d_456/state?since=41"
}
```

### Reconciliation route shape

A state route should answer both initial load and missed events:

```json
{
  "scope_id": "workspace:w_123",
  "resource_id": "doc:d_456",
  "revision": 42,
  "snapshot": {},
  "ops_since": [],
  "server_time": 1760000000000,
  "presence": [],
  "next_cursor": "opaque-or-empty"
}
```

### Async job envelope

```json
{
  "job_id": "job_...",
  "scope_id": "workspace:w_123",
  "resource_id": "doc:d_456",
  "status": "queued|running|succeeded|failed|canceled",
  "progress": 0,
  "logs": [],
  "result": null,
  "error": null,
  "retry_of": null,
  "created_by": "holm_usr_..."
}
```

Routes: start, status, cancel, retry, list-by-scope. Scenario tests should assert owner/scope isolation.

### Upload/media envelope

For files, store metadata separately from bytes:

```json
{
  "id": "file_...",
  "scope_id": "workspace:w_123",
  "owner_member_id": "holm_usr_...",
  "path": "scopes/workspace:w_123/files/file_.../name.png",
  "name": "name.png",
  "mime": "image/png",
  "size": 12345,
  "sha256": "optional",
  "visibility": "scope|member|public-link",
  "link_id": null,
  "scan_status": "unchecked|clean|blocked",
  "created_at": 1760000000000
}
```

Never let blob-link creation be an accidental side effect of upload. It should be an explicit share action.

### Error taxonomy

Use stable codes so tests and UI can reason about failures:

- `auth.required`
- `auth.forbidden`
- `scope.not_found`
- `scope.forbidden`
- `validation.invalid`
- `conflict.stale_revision`
- `idempotency.duplicate`
- `rate_limited`
- `upload.too_large`
- `upload.unsupported_type`
- `task.not_found`
- `task.terminal`
- `provider.not_configured`

### Red-team prompts before saying ready

Ask the generated app these questions before final handoff:

- Can Bob read Alice's member-private draft, upload, settings, or agent memory?
- Can a non-member guess a workspace/doc/channel ID and fetch state?
- Does any realtime event expose private text or file metadata to unauthorized clients?
- What happens if Alice submits the same `client_op_id` twice?
- What happens if Alice writes against a stale revision?
- What happens if 8 clients write concurrently to the same board/doc?
- Can a user upload HTML/SVG/JS and make another user execute it?
- Can a blob link outlive the intended sharing policy?
- Can provider/secret values appear in logs, UI, route responses, or agent messages?
- Can the app recover after refresh/reconnect/offline while pending ops exist?

## External script recommendation

If Holm's native app-create/generator remains deferred, use a tiny local script as a consistency compiler, not as a smart feature generator.

Suggested shape:

```text
scripts/holm_app_blueprint.rb
apps/<name>/blueprint.yml
apps/<name>/app.contract.json
```

The script may:

- copy Zippy to a target directory with `node_modules`/`dist` excluded;
- rename manifest/package/title/social metadata;
- remove known demo routes from a denylist;
- create `app.contract.json` from a short blueprint;
- generate README route tables and scenario skeletons;
- generate `scripts/cli-walkthrough.sh` placeholders from the contract;
- run local static checks and print `holm app doctor` / scenario commands;
- never deploy, install packages, write secrets, or mutate Holm nodes.

Do **not** make the script a hidden AI/codegen system. Its value is deterministic repetition: fewer stale names, fewer missing route docs, fewer drifted tests, faster iteration.

## Preferred post-#340 verification stack

For maximal apps, final readiness should say which of these passed:

```bash
holm app doctor .
holm app pwa doctor .
holm agent validate ./private/agents
holm task check workers
holm test scenario . --scenario scenarios/acceptance.json
holm test ws . --clients 2 --scenario scenarios/realtime-basic.json
holm test ws . --clients 8 --scenario scenarios/realtime-stress.json
bash scripts/cli-walkthrough.sh
find api -name '*.js' -exec node --check {} \;
```

If a command is not available in the target runtime, say so and use the current fallback checks. Do not claim browser/PWA/audio/agent/provider behavior is proven unless the relevant smoke actually ran.

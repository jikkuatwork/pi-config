---
title: Native Agents In Holm Apps
updated: 2026-05-23
holm_version: 0.119.3
holm_source_commit: de9e73f4
---

# Native Agents In Holm Apps

Use this when a Holm app ships agents under `private/agents/*` or when an app needs agent-adjacent design.

Source docs:

- `/home/glasscube/Projects/holmhq/holm/master/knowledge-base/agent-context/agents.md`
- `/home/glasscube/Projects/holmhq/holm/master/knowledge-base/agent-context/agent-runtime.md`
- `/home/glasscube/Projects/holmhq/holm/master/docs/concepts/agents.md`

## Mental model

Holm agents are members inside apps. Their brain is deployed app content; their durable memory is app/member storage.

```text
my-app/
└── private/
    ├── agent-context/
    │   └── org.md
    └── agents/
        └── researcher/
            ├── agent.json
            ├── AGENTS.md
            ├── IDENTITY.md        # optional
            ├── HEARTBEAT.md       # optional, if heartbeat trigger
            ├── skills/
            │   └── research/
            │       └── SKILL.md
            ├── templates/
            └── schemas/
```

Only `agent.json` and `AGENTS.md` are required.

## `agent.json` shape

```json
{
  "name": "Researcher",
  "tagline": "Turns raw requests into structured notes",
  "role": "agent",
  "triggers": ["message", "heartbeat", "event"],
  "heartbeat": { "interval": 30 },
  "events": ["ticket.created"],
  "sharedContext": ["org.md"]
}
```

Current public trigger declarations:

- `message`
- `heartbeat`
- `webhook`
- `event`

Do not declare synthetic runtime triggers such as `scheduled`, `delegation`, `approval_result`, or `pipe` in `agent.json`.

## Brain and memory

Static prompt assembly starts with:

1. `AGENTS.md`
2. `IDENTITY.md`
3. `SOUL.md`
4. `USER.md`

Then Holm adds allowlisted shared context, skill summaries, memory window, overlays, execution context, and thread/trigger payload.

Durable live memory belongs in:

- `holm.app.member.kv`
- `holm.app.member.ds`
- `holm.app.member.s3`

Do not model mutable memory as deployed files. Deployed brain files are immutable until the next deploy.

Runtime brain overlay is the bounded prompt-facing exception managed by `brain_overlay_*` tools and stored in member KV under `brain:overlay/*`.

## Agent product design checklist

For rich agent-backed apps, define before coding:

- agent folders and display names
- trigger map: message, heartbeat, event, webhook
- events/webhooks each agent subscribes to
- durable memory plan in member storage
- thread/annotation usage
- approval/delegation/pipe use, if any
- app server routes that call `holm.agent.send(...)`
- operator CLI walkthrough for message/inspect/log/thread/replay/schedules
- deploy command with `--include-private`

Zippy's bundled agents are skeletal message examples, not a complete agent desk.

## Tool families

Native agents use runtime tools, not the same surface as serverless `holm.*`. Important families:

- Brain: `brain_read`, `brain_list`, `brain_overlay_*`.
- Storage: shared/member DS, KV, S3, search, aggregate, CAS.
- Intelligence: `ai_chat`, usage summary.
- Workflow: schedule, delegation, pipe, approvals, thread messages/annotations.
- Integration: `net_fetch`, `connector_call`, `secret_get`.
- Convenience: `event_emit`, `app_deploy`, `member_lookup`, `member_presence`, `template_render`.

Use serverless `holm.agent.send(name, payload?)` when app code needs to message an agent.

## Deploying agents

Agents live under `private/`, so directory deploys must intentionally include private files:

```bash
holm @prod app deploy . --host app.example.com --spa --no-build --include-private
```

Inspect `private/` before deploying. Do not include plaintext secrets; use Holm secret/provider surfaces.

## Operator commands

Useful day-two commands:

```bash
holm @prod agent message reviewer "Check the queue" --app support-bot
holm @prod agent inspect reviewer --app support-bot --include identity,threads
holm @prod agent log reviewer --app support-bot -n 20
holm @prod agent threads reviewer --app support-bot --limit 10
holm @prod agent replay reviewer <trigger_id> --app support-bot

holm @prod schedule list reviewer --app support-bot
holm @prod schedule create reviewer --app support-bot --at +5m --payload '{"task":"heartbeat"}'
holm @prod schedule cancel reviewer <schedule_id> --app support-bot
```

Ask before sending messages, creating schedules, replaying jobs, or deploying agent changes to a live node.

## Zippy examples

Zippy includes example message-triggered agents:

- `private/agents/chatbot/`
- `private/agents/researcher/`
- `private/agents/reviewer/`
- `private/agents/writer/`

Use them as skeletal examples only. Replace their prompts and manifests with the target app's actual domain behavior, or delete them when the app does not intentionally ship agents.

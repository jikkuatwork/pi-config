# Holm Overview For App Builders

Source reviewed: `/home/glasscube/Projects/holmhq/holm/master` at Holm `0.119.3`.

## What Holm is

Holm is a self-hosted application platform: one Go binary plus one SQLite database. The binary is disposable; the database is the instance. It combines app hosting, serverless JavaScript, storage, auth, realtime, AI access, native agents, channel adapters, peer operations, and CLI-first operations.

Use Holm when the user wants an ownable small-team or personal platform instead of assembling hosting, auth, storage, serverless, realtime, and agent systems from separate services.

## App mental model

A Holm app is a directory deployed to a Holm node.

```text
my-app/
├── manifest.json       # app metadata, usually { "name": "my-app", "spa": true }
├── index.html          # public browser entrypoint
├── src/                # optional frontend source
├── api/
│   └── main.js         # serverless router for /api/*
├── private/            # server-only/auth-gated files; not deployed unless included
│   └── agents/         # optional native app agents
└── vendor/             # vendored BFBB browser runtime assets when needed
```

Core nouns:

- **Node**: one running Holm instance.
- **Peer**: a named node targeted with `holm @peer ...`.
- **App**: a hosted web surface with optional serverless API and agents.
- **Member**: a human, service, or agent identity.
- **Host route**: an exact FQDN bound to an app.
- **BFBB**: build free, but buildable. Raw source works without Node/build tooling; a Vite build can still produce a mirror.

## Capability map

Holm app builders most often touch these surfaces:

- **Static hosting** — root app files, SPA fallback, PWA assets, exact host routes.
- **Serverless API** — `api/main.js` handles `/api/*` through Sobek JavaScript.
- **Storage** — `holm.app.ds`, `holm.app.kv`, `holm.app.s3`, `holm.app.media`, `holm.app.bl`, plus member-scoped variants.
- **Auth** — browser sessions, dev login locally, OAuth providers in production, server-side `holm.auth.*`.
- **Realtime** — WebSocket subscriptions plus `holm.realtime.broadcast(...)` from server code.
- **Async work / AI** — `holm.task.*`, `holm.worker.*`, `holm.ai.chat(...)`, `holm.ai.job(...)`.
- **Native agents** — deployed brains under `private/agents/<folder>/` with `agent.json` and `AGENTS.md`.
- **Operations** — CLI-first deploy, logs, host routes, peer commands, upgrades, and backups.

## Fit checks

Good fits:

- Internal dashboards, small SaaS/MVP surfaces, client portals.
- Collaboration/realtime apps with modest traffic.
- Agent-backed apps where state should stay close to the app.
- Personal infrastructure and forms/sites/tools.

Poor fits:

- Apps needing horizontal scale across many database writers today.
- Apps requiring Postgres/Redis as primary dependencies.
- Apps requiring fully offline local model inference today.
- Apps where a managed cloud control plane is the product requirement.

## Source-of-truth pointers

Read the live Holm source if this reference conflicts with it:

- `/home/glasscube/Projects/holmhq/holm/master/README.md`
- `/home/glasscube/Projects/holmhq/holm/master/docs/index.md`
- `/home/glasscube/Projects/holmhq/holm/master/docs/concepts/what-is-holm.md`
- `/home/glasscube/Projects/holmhq/holm/master/docs/concepts/apps.md`
- `/home/glasscube/Projects/holmhq/holm/master/knowledge-base/skills/app/SKILL.md`

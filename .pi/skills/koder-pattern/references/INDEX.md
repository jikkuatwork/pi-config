---
title: Koder Pattern Router
updated: 2026-05-24
source_pattern: Holm koder/ meta-workflow, generalized
---

# Koder Pattern Router

This skill captures a folder-first `koder/` meta-workflow for durable agent collaboration. It is self-contained; treat any live repository's own `koder/` files and agent instructions as source of truth when they differ.

## Scope

Use for creating, reviewing, maintaining, or explaining local `koder/` artifacts:

- issues, plans, reviews, queues, research, analysis, notes, tasks, session state, and scratch/handoff files;
- artifact hygiene, numbering, folder-first paths, frontmatter, validators, and status updates;
- queue-add/queue-run policy, harnex/worker dispatches, and explicit file/plan/review semantics.

Do not use for ordinary code changes unless the task is specifically to create or update the supporting `koder/` artifacts.

## Load order

1. Read the current repository's local instructions (`AGENTS.md`, `CLAUDE.md`, or equivalent) and `koder/STATE.md` when present.
2. Read only the reference(s) below that match the requested artifact type.
3. Inspect nearby live artifacts before filing a new one; live repo convention beats this cached guide.
4. Prefer exact paths and links over copied detail. Keep artifacts durable, concise, and safe to commit.

## Reference map

| Need | Read |
| --- | --- |
| First use, source pattern observed in Holm | `holm-pattern-review.md` |
| Artifact hierarchy, numbering, frontmatter, source-of-truth rules | `artifact-model.md` |
| File an issue, plan, or review | `issues-plans-reviews.md` |
| File/add/run a queue, including queue-add and queue-run behavior | `queues.md` |
| Dispatch/monitor workers through harnex from a queue or review loop | `harnex.md` |
| File research, analysis, notes, tasks, scratch/state handoff | `research-analysis-notes.md` |
| Trigger and quality checks for this skill | `eval-prompts.md` |

## Operating defaults

- Folder-first for new durable artifacts: `koder/<type>/NNN_slug/INDEX.md`, except reviews which are numbered files under `koder/reviews/NNN_slug/`.
- `INDEX.md` is canonical; `turns/` is history. Update canonical state in `INDEX.md`, not only in turn files.
- A queue is orchestration metadata only; if the source issue/plan is vague, fix that source artifact instead of stuffing detail into the queue.
- Queue-add and queue-run are workflows inside `queues.md`, not separate skills by default.
- Harnex dispatch/task-brief/monitoring rules live in `harnex.md`; use live harnex/repo docs when they differ.
- A review is a durable verdict with prioritized findings and evidence; it is not a chat reply unless the repo explicitly uses chat-only review.
- A plan is a thin, testable implementation slice with defers, validation, stop rules, and source links; it is not a broad roadmap.
- Keep secrets, private account IDs, full prompts/transcripts, credentials, and sensitive telemetry out of `koder/` artifacts.
- Run existing validators when the repo provides them; otherwise perform a manual frontmatter/path/status check and say no validator exists.

## Sub-skill extraction decision

Do not create separate issue/queue/research/harnex skills by default. This umbrella skill is direct-use only and keeps the always-loaded context small. Split a sub-skill later only if a specific workflow becomes frequent enough to need its own `/skill:name` entry point, deterministic scripts, or separate trigger boundaries.

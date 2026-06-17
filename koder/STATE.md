---
updated_at: "17 Jun 2026 | 11:23 AM IST"
---

# Koder State

## Past

- Session handoff open/close flow is active; `koder/STATE.md` remains source-of-truth.
- `state:` commits are the semantic movement ledger; `koder/STATE.md` is only session handoff.
- Local `.pi/skills/*/SKILL.md` files use frontmatter-only tiny front doors with `metadata.references.index` routers.
- `koder-pattern` scaffold templates are named `SKILL.md.template` so pi does not discover nested live skills, while init still writes target `koder/skills/{open,close}/SKILL.md`.
- External Holm filing created Issue 003 to compare DocFlow with `koder-pattern` and decide what to import/adapt.

## Present

- Branch `master` was clean at open; this close updates only handoff state.
- Local skill convention remains: one discoverable top-level `SKILL.md` per skill, frontmatter-only by default, with flat references unless a folder is justified.
- `koder-pattern` already documents `koder/notes/` as lightweight durable memory; no new inbox/messages artifact exists.
- Session brainstorm favored a minimal cross-repo extension: file ordinary notes in the target repo (`file a note in holm`), include origin metadata for external notes, and add a `koder/STATE.md` pointer only when the user asks for handoff/next-agent visibility.
- Repo has no root test/build harness; validation is docs/manual plus targeted script/YAML/pi CLI probes.

## Future

- If implementing the cross-repo note idea, update `koder-pattern` docs minimally: ownership rule, external-note fields, and handoff visibility rule; avoid adding `koder/inbox/` unless repeated pain proves it needed.
- Add trigger wording/examples for `file a note in <repo>`, `leave a note for <repo>`, and handoff variants that also update target `STATE.md`.
- Analyze DocFlow via Issue 003 before importing/adapting productization ideas into `koder-pattern`.
- Reload/restart pi after local skill changes so updated triggers and frontmatter are discovered.

# Provenance: write-skill

## Source

- Repo: `https://github.com/davidondrej/skills`
- Path: `skills/skill-authoring/effective-agent-skills/SKILL.md`
- Author/owner: David Ondrej
- Commit: `6e5545081c888b89576a620d9b2e54e9a6590f68` (2026-08-03 14:08:55 +0000)
- License: MIT (repo root `LICENSE`)

## Safety review (of the source file)

- Docs-only markdown; no scripts, shebangs, executables, package.json, installers, or hooks.
- No secrets, credentials, API keys, or private state.
- No network-call or destructive commands in the source body.
- Repo health: 3,153 stars / 431 forks, actively maintained.

## Adaptation notes

- Repackaged per repo import policy: frontmatter-only `SKILL.md` routing to
  `references/INDEX.md`; full guide lives in `01_core.md`.
- Renamed `effective-agent-skills` → `write-skill` as requested (name equals
  folder name per frontmatter rule in `01_core.md`).
- Content preserved with intent intact; only vendor-specific install text
  trimmed. Structure/frontmatter rules that name Pi's strict YAML behavior were
  kept because they are directly relevant to this repo's skills.
- Omitted: none (source had a single `SKILL.md`, no other assets).

## Routing-differentiator intent

`create-skill` (existing) is the hands-on builder/evaluator: strict structure and
explicit trigger wording for new/rewritten skills. `write-skill` is the craft
knowledge-base to consult while authoring, editing, reviewing, or debugging any
skill. The two descriptions carry explicit differentiators to avoid ambiguity on
"create a skill" requests.

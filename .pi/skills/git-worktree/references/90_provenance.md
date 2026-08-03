# Provenance: git-worktree

## Source

- Repo: `https://github.com/davidondrej/skills`
- Path: `skills/agent-orchestration/git-worktree/SKILL.md`
- Author/owner: David Ondrej
- Commit: `6e5545081c888b89576a620d9b2e54e9a6590f68` (2026-08-03 14:08:55 +0000)
- License: MIT (repo root `LICENSE`)

## Safety review (of the source)

- Body is docs-only markdown with example shell commands; git operations only
  (`worktree add/remove/prune`, `merge`, `branch`). No network calls, no
  destructive/unrecoverable commands, no secrets, no installers or scripts to
  execute.
- Source also ships `agents/openai.yaml` (2-line Codex invocation config) —
  **omitted** (pi does not consume it; not needed in this repo).

## Adaptation notes

- Repackaged per repo import policy: frontmatter-only `SKILL.md` routing to
  `references/INDEX.md`; body preserved verbatim in `01_core.md` (with one
  parenthetical "e.g. Cursor already started you in one" softened to avoid a
  client-specific claim).
- **Omitted `disable-model-invocation: true` from source frontmatter.** That is a
  Claude Code / VS Code client extension; this skill should auto-trigger on
  worktree tasks, and pi has its own invocation semantics. Omission is intended.
- Kept the Cursor-specific sections (`/worktree`, `.cursor/worktrees.json`) as-is
  per the import request; they document one concrete client and are harmless in
  this repo. The equivalent repo-native automation is `scripts/setup-worktree.sh`
  noted in the same section.
- `name` in frontmatter equals folder name (`git-worktree`).

## Relation to koder-pattern

`koder-pattern` provides branch/worktree ownership **policy**; `git-worktree`
provides the git **mechanism**. Complementary, not overlapping (see `INDEX.md`).

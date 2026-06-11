---
title: Koder Pattern Setup
updated: 2026-06-11
---

# Koder Pattern Setup

Use when the user asks to set up, install, initialize, or bootstrap the koder pattern in a repository/folder.

Goal: leave the target with the thinnest durable operator scaffold: `koder/AGENTS.md`, `koder/STATE.md`, `koder/issues/`, `koder/skills/open/`, `koder/skills/close/`, plus root/agent-surface symlinks where safe. By default, setup is a state transition: initialize git if needed and commit created scaffold paths with `state: init - koder pattern scaffold`.

Read `references/shared/state-commit-protocol.md` before overriding commit behavior.

## Placement principle

- Durable non-code agent/operator files belong under `koder/`.
- Root `AGENTS.md`/`CLAUDE.md` and agent skill folders should be symlinks/adapters to `koder/` when the target paths are absent.
- `README.md` is the root documentation exception because GitHub/repo hosts render it directly; prefer other durable docs under `koder/docs/` unless live project conventions differ.
- Create artifact directories lazily. Do not create `plans/`, `reviews/`, `research/`, `analysis/`, `notes/`, `tasks/`, `queues/`, or `scratch/` during thin init unless explicitly requested.

## 1. Inspect before writing

1. Locate the target root from the current working directory or requested path.
2. Read live instructions if present: `AGENTS.md`, `CLAUDE.md`, `.agents/`, `.claude/`, `.pi/`, and `koder/STATE.md`.
3. Inspect current shape without dumping private content:
   - `git status --short --branch` if `.git/` exists;
   - `git diff --cached --name-only` if `.git/` exists;
   - top-level files and likely manifests: `README*`, `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, etc.;
   - existing `koder/` artifacts, skills, and validators.
4. Preserve live conventions. Do not overwrite existing instructions, skills, state, docs, or symlinks.

## 2. Prefer the init script

Run the script from the skill root. If the skill is globally symlinked, this usually works:

```bash
~/.pi/agent/skills/koder-pattern/bin/koder-pattern init .
```

Useful variants:

```bash
# Preview only; no writes and no commit
~/.pi/agent/skills/koder-pattern/bin/koder-pattern init --dry-run .

# Write scaffold but skip git init/commit only when explicitly requested
~/.pi/agent/skills/koder-pattern/bin/koder-pattern init --no-commit .

# Add Claude adapters too
~/.pi/agent/skills/koder-pattern/bin/koder-pattern init --claude .

# Add Pi, Claude, and generic .agents adapters
~/.pi/agent/skills/koder-pattern/bin/koder-pattern init --all .

# Validate shape after init
~/.pi/agent/skills/koder-pattern/bin/koder-pattern doctor .
```

Script behavior:

- creates the target folder if missing;
- creates missing scaffold files only;
- skips existing files/dirs/symlinks instead of replacing them;
- does not move existing docs;
- initializes git if needed unless `--no-commit` or `--dry-run` is used;
- commits only created scaffold paths with `state: init - koder pattern scaffold` unless `--no-commit` or `--dry-run` is used;
- preserves unrelated dirty/staged work by using a selected-path commit;
- creates `.pi/skills/{open,close}` adapters by default;
- creates `CLAUDE.md`/`.claude/skills/*` only with `--claude` or `--all`;
- creates `.agents/skills/*` only with `--agents` or `--all`.

Default scaffold:

```text
AGENTS.md -> koder/AGENTS.md
koder/
  AGENTS.md
  STATE.md
  issues/
    .gitkeep
  skills/
    open/
      SKILL.md
    close/
      SKILL.md
.pi/
  skills/
    open -> ../../koder/skills/open
    close -> ../../koder/skills/close
```

Optional Claude/generic adapters:

```text
CLAUDE.md -> koder/AGENTS.md
.claude/skills/open -> ../../koder/skills/open
.claude/skills/close -> ../../koder/skills/close
.agents/skills/open -> ../../koder/skills/open
.agents/skills/close -> ../../koder/skills/close
```

Default commit body:

```text
State event: init
State file: koder/STATE.md

Scaffold:
- koder/AGENTS.md
- koder/STATE.md
- koder/issues/
- koder/skills/open/
- koder/skills/close/

Delta:
- Repository now has koder-pattern durable operator state.
- Agent surfaces point at koder-owned instructions/skills where possible.
```

## 3. Manual fallback

If the script cannot run, manually create the same thin scaffold and make a state commit.

1. Create directories:
   ```bash
   mkdir -p koder/issues koder/skills/open koder/skills/close
   touch koder/issues/.gitkeep
   ```
2. Copy templates from the skill root:
   - `templates/koder/AGENTS.md` -> `koder/AGENTS.md`
   - `templates/koder/skills/open/SKILL.md` -> `koder/skills/open/SKILL.md`
   - `templates/koder/skills/close/SKILL.md` -> `koder/skills/close/SKILL.md`
3. Create `koder/STATE.md` with India-time frontmatter and concise handoff sections:
   ```markdown
   ---
   updated_at: "DD Mon YYYY | HH:MM AM IST"
   ---

   # Koder State

   ## Past

   - Koder-pattern thin operator scaffold was initialized.

   ## Present

   - Durable operator files live under `koder/`.
   - Active scaffold: `koder/AGENTS.md`, `koder/STATE.md`, `koder/issues/`, and `koder/skills/{open,close}/`.

   ## Future

   - Use `open` at session start and `close` at session end.
   - Add plans, reviews, research, notes, tasks, queues, or scratch areas only when work needs durable records.
   ```
4. Create symlinks only when targets are absent:
   ```bash
   ln -s koder/AGENTS.md AGENTS.md
   mkdir -p .pi/skills
   ln -s ../../koder/skills/open .pi/skills/open
   ln -s ../../koder/skills/close .pi/skills/close
   ```
5. For Claude/generic surfaces, only if requested and absent:
   ```bash
   ln -s koder/AGENTS.md CLAUDE.md
   mkdir -p .claude/skills .agents/skills
   ln -s ../../koder/skills/open .claude/skills/open
   ln -s ../../koder/skills/close .claude/skills/close
   ln -s ../../koder/skills/open .agents/skills/open
   ln -s ../../koder/skills/close .agents/skills/close
   ```
6. Initialize git if needed and commit only scaffold paths. Write the default commit body shown above to `/tmp/koder-state-init-message`; include optional adapter paths only if you created them:
   ```bash
   git rev-parse --is-inside-work-tree >/dev/null 2>&1 || git init
   git add -- AGENTS.md koder/AGENTS.md koder/STATE.md koder/issues/.gitkeep koder/skills/open/SKILL.md koder/skills/close/SKILL.md .pi/skills/open .pi/skills/close
   git commit -F /tmp/koder-state-init-message -- AGENTS.md koder/AGENTS.md koder/STATE.md koder/issues/.gitkeep koder/skills/open/SKILL.md koder/skills/close/SKILL.md .pi/skills/open .pi/skills/close
   ```

If `AGENTS.md`, `CLAUDE.md`, or skill paths already exist, do not replace them. Report that a manual merge/pointer may be needed. If the user explicitly says not to commit, skip step 6 and report the uncommitted scaffold paths.

## 4. Validate and hand back

1. Run the doctor when available:
   ```bash
   ~/.pi/agent/skills/koder-pattern/bin/koder-pattern doctor .
   ```
2. Verify `koder/STATE.md` is under 100 lines:
   ```bash
   wc -l koder/STATE.md
   ```
3. Inspect repo state if git exists:
   ```bash
   git status --short
   git log --grep='^state:' --oneline -5
   ```
4. Summarize created files, skipped existing paths, the `state: init` commit hash if one was made, and any remaining dirty paths.

## Manual validation checklist

- `koder/AGENTS.md` exists and states the koder placement/safety/state-commit policy.
- `koder/STATE.md` has `updated_at`, Past/Present/Future, and is under 100 lines.
- `koder/issues/` exists; other artifact dirs are absent unless requested or pre-existing.
- `koder/skills/open/SKILL.md` and `koder/skills/close/SKILL.md` exist and have valid frontmatter.
- Root `AGENTS.md` is a symlink to `koder/AGENTS.md`, or an existing root file was preserved and a merge need was reported.
- Requested agent surfaces symlink `open` and `close` to `koder/skills/*`.
- A `state: init - koder pattern scaffold` commit exists unless `--no-commit`/explicit no-commit was used or no scaffold paths changed.
- No secrets, private payloads, full prompts, large generated outputs, or unrelated caches were created or committed.
- Unrelated dirty/staged work, if any, was not swept into the state commit.

---
title: Koder Pattern Setup
updated: 2026-07-14
---

# Koder Pattern Setup

Use when the user asks to set up, install, initialize, or bootstrap the koder pattern in a repository/folder.

Goal: leave the target with the thinnest durable operator scaffold: `koder/AGENTS.md`, `koder/STATE.md`, `koder/issues/`, and complete `koder/skills/{open,close}/` front doors with routed references and Holm-style pretty-print formats. The baseline instructions conditionally recognize explicit blind queues, and `open` surfaces an active execution window/mode/stop gate when the repo later defines one; init does not create queue or execution docs. Pi, Codex, and Claude should all receive symlink adapters to that one canonical copy by default. Setup is a state transition: initialize git if needed and commit created scaffold paths with `state: init - koder pattern scaffold`.

Read `references/shared/state-commit-protocol.md` before overriding commit behavior.

## Placement principle

- Durable non-code agent/operator files belong under `koder/`; `koder/skills/*` is the only physical copy of each generated skill.
- Root `AGENTS.md` (Pi/Codex) and `CLAUDE.md` (Claude) should point to `koder/AGENTS.md` when those paths are absent.
- Use direct, relative per-skill symlinks for `.pi/skills/*` (Pi), `.agents/skills/*` (Codex's project skill path), and `.claude/skills/*` (Claude). Per-skill adapters are portable and can coexist with harness-specific skills.
- Do not create a project `.codex/skills/` adapter: current Codex project discovery uses `.agents/skills/`.
- `README.md` is the root documentation exception because GitHub/repo hosts render it directly; prefer other durable docs under `koder/docs/` unless live project conventions differ.
- Create artifact directories lazily. Do not create `proposals/`, `plans/`, `reviews/`, `research/`, `analysis/`, `notes/`, `tasks/`, `queue/`, or `scratch/` during thin init unless explicitly requested.

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

Resolve `bin/koder-pattern` from the loaded skill directory. The script resolves symlinked installations, so the invocation may come from a Pi, Codex, or Claude skill location:

```bash
KODER_PATTERN_BIN=/absolute/path/to/koder-pattern/bin/koder-pattern
"$KODER_PATTERN_BIN" init .
```

Useful variants:

```bash
# Preview the complete Pi + Codex + Claude setup; no writes and no commit
"$KODER_PATTERN_BIN" init --dry-run .

# Write the complete scaffold but skip git init/commit only when explicitly requested
"$KODER_PATTERN_BIN" init --no-commit .

# Reassert all three harnesses explicitly (same harness set as the default)
"$KODER_PATTERN_BIN" init --all .

# Validate the canonical scaffold and every default harness adapter
"$KODER_PATTERN_BIN" doctor .
```

Script behavior:

- creates the target folder if missing;
- creates missing scaffold files only;
- skips existing files/dirs/symlinks instead of replacing them;
- does not move existing docs;
- initializes git if needed unless `--no-commit` or `--dry-run` is used;
- commits only created scaffold paths with `state: init - koder pattern scaffold` unless `--no-commit` or `--dry-run` is used;
- preserves unrelated dirty/staged work by using a selected-path commit;
- creates `AGENTS.md`, `CLAUDE.md`, and Pi, Codex, and Claude skill adapters by default;
- retains explicit `--no-pi`, `--no-codex`, and `--no-claude` escape hatches for constrained targets, but `doctor` reports those targets as incomplete against the cross-harness default.

Default scaffold:

```text
AGENTS.md -> koder/AGENTS.md
CLAUDE.md -> koder/AGENTS.md
koder/
  AGENTS.md
  STATE.md
  issues/
    .gitkeep
  skills/
    open/
      SKILL.md
      references/{INDEX,FORMAT}.md
    close/
      SKILL.md
      references/{INDEX,FORMAT}.md
.pi/skills/open -> ../../koder/skills/open
.pi/skills/close -> ../../koder/skills/close
.agents/skills/open -> ../../koder/skills/open
.agents/skills/close -> ../../koder/skills/close
.claude/skills/open -> ../../koder/skills/open
.claude/skills/close -> ../../koder/skills/close
```

The six adapter links contain no skill data. They resolve directly to the two canonical directories under `koder/skills/`. Codex and Claude explicitly support symlinked skill folders; Pi canonicalizes duplicate real paths, so seeing the same target through `.pi/skills/` and `.agents/skills/` does not load a second copy.

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
   mkdir -p koder/issues koder/skills/open/references koder/skills/close/references
   touch koder/issues/.gitkeep
   ```
2. Copy templates from the skill root:
   - `templates/koder/AGENTS.md` -> `koder/AGENTS.md`
   - `templates/koder/skills/open/SKILL.md.template` -> `koder/skills/open/SKILL.md`
   - `templates/koder/skills/open/references/{INDEX,FORMAT}.md` -> `koder/skills/open/references/`
   - `templates/koder/skills/close/SKILL.md.template` -> `koder/skills/close/SKILL.md`
   - `templates/koder/skills/close/references/{INDEX,FORMAT}.md` -> `koder/skills/close/references/`
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
   - Add proposals, plans, reviews, research, notes, tasks, queues, or scratch areas only when work needs durable records.
   ```
4. Create every default adapter only when its path is absent:
   ```bash
   ln -s koder/AGENTS.md AGENTS.md
   ln -s koder/AGENTS.md CLAUDE.md
   mkdir -p .pi/skills .agents/skills .claude/skills
   ln -s ../../koder/skills/open .pi/skills/open
   ln -s ../../koder/skills/close .pi/skills/close
   ln -s ../../koder/skills/open .agents/skills/open
   ln -s ../../koder/skills/close .agents/skills/close
   ln -s ../../koder/skills/open .claude/skills/open
   ln -s ../../koder/skills/close .claude/skills/close
   ```
5. Initialize git if needed and commit only scaffold paths. Write the default commit body shown above to `/tmp/koder-state-init-message`:
   ```bash
   git rev-parse --is-inside-work-tree >/dev/null 2>&1 || git init
   git add -- AGENTS.md CLAUDE.md koder/AGENTS.md koder/STATE.md koder/issues/.gitkeep koder/skills/open koder/skills/close .pi/skills/open .pi/skills/close .agents/skills/open .agents/skills/close .claude/skills/open .claude/skills/close
   git commit -F /tmp/koder-state-init-message -- AGENTS.md CLAUDE.md koder/AGENTS.md koder/STATE.md koder/issues/.gitkeep koder/skills/open koder/skills/close .pi/skills/open .pi/skills/close .agents/skills/open .agents/skills/close .claude/skills/open .claude/skills/close
   ```

If `AGENTS.md`, `CLAUDE.md`, or skill paths already exist, do not replace them. Report that a manual merge/pointer may be needed. If the user explicitly says not to commit, skip step 5 and report the uncommitted scaffold paths.

## 4. Validate and hand back

1. Run the doctor when available:
   ```bash
   "$KODER_PATTERN_BIN" doctor .
   ```
   When changing the setup implementation itself, also run the isolated cross-harness smoke test:
   ```bash
   bash "$(dirname "$KODER_PATTERN_BIN")/../tests/cross-harness-smoke.sh"
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

- `koder/AGENTS.md` exists and states the koder placement/safety/state-commit policy plus the conditional fail-closed boundary for queues that explicitly declare blind mode.
- `koder/STATE.md` has `updated_at`, Past/Present/Future, and is under 100 lines.
- `koder/issues/` exists; other artifact dirs are absent unless requested or pre-existing.
- `koder/skills/open/SKILL.md` and `koder/skills/close/SKILL.md` have valid Agent Skills frontmatter plus a tiny body link to `references/INDEX.md`; the body link keeps Claude compatible while preserving progressive disclosure in all three harnesses.
- Both skills have `references/INDEX.md` workflow instructions and `references/FORMAT.md` pretty-print output contracts; `open` conditionally reports active execution window, orchestration mode, and stop gate without starting work.
- Root `AGENTS.md` and `CLAUDE.md` are symlinks to `koder/AGENTS.md`, or existing root files were preserved and merge needs were reported.
- `.pi/skills/{open,close}`, `.agents/skills/{open,close}`, and `.claude/skills/{open,close}` are relative symlinks to the same `koder/skills/*` directories.
- Canonical path resolution (`pwd -P` from each directory, or an equivalent) maps every harness adapter to its matching `koder/skills/*` directory; there are only two physical generated `SKILL.md` files.
- A `state: init - koder pattern scaffold` commit exists unless `--no-commit`/explicit no-commit was used or no scaffold paths changed.
- No secrets, private payloads, full prompts, large generated outputs, or unrelated caches were created or committed.
- Unrelated dirty/staged work, if any, was not swept into the state commit.

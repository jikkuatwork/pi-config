---
title: Koder Pattern Setup
updated: 2026-08-19
---

# Koder Pattern Setup

Use when the user asks to set up, install, initialize, bootstrap, adopt, or upgrade the koder pattern in a repository/folder.

Goal: leave the target with the thinnest durable operator scaffold: `koder/AGENTS.md`, `koder/STATE.md`, `koder/issues/`, and complete `koder/skills/{open,close}/` front doors, including the executable close-time scratch retention gate, routed references, and Holm-style pretty-print formats. Preserve an established changelog/release-notes/history surface; when none exists, initialize root `CHANGELOG.md` so `open` has bounded historical grounding. The baseline instructions conditionally recognize explicit blind queues, and `open` surfaces an active execution window/mode/stop gate when the repo later defines one; init does not create queue or execution docs. Pi, Codex, and Claude should all receive symlink adapters to that one canonical copy by default. Fresh setup is a state transition: initialize git if needed and commit created scaffold paths with `state: init - koder pattern scaffold`.

`bin/koder-pattern init` is deliberately create-only. It is safe to rerun and can add newly missing paths such as `CHANGELOG.md`, but it never replaces existing generated skills or instructions. For an existing consumer upgrade, inspect and merge changed canonical templates deliberately, preserving repository-specific policy and customizations.

Read `references/shared/state-commit-protocol.md` before overriding commit behavior.

## Placement principle

- Durable non-code agent/operator files belong under `koder/`; `koder/skills/*` is the only physical copy of each generated skill.
- Root `AGENTS.md` (Pi/Codex) and `CLAUDE.md` (Claude) should point to `koder/AGENTS.md` when those paths are absent.
- Use direct, relative per-skill symlinks for `.pi/skills/*` (Pi), `.agents/skills/*` (Codex's project skill path), and `.claude/skills/*` (Claude). Per-skill adapters are portable and can coexist with harness-specific skills.
- Do not create a project `.codex/skills/` adapter: current Codex project discovery uses `.agents/skills/`.
- `README.md` and a root `CHANGELOG.md` are normal root documentation exceptions because repository hosts render them directly; prefer other durable docs under `koder/docs/` unless live project conventions differ.
- Reuse an established project-history surface instead of creating a competing file. Recognize root or `docs/` changelog, changes, history, news, releases, or release-notes files plus `.changeset/`, `release-notes/`, `releases/`, `docs/release-notes/`, and `docs/releases/` directories.
- Create artifact directories lazily. Do not create `proposals/`, `plans/`, `reviews/`, `research/`, `analysis/`, `notes/`, `tasks/`, `queue/`, or `scratch/` during thin init unless explicitly requested.

## 1. Inspect before writing

1. Locate the target root from the current working directory or requested path.
2. Read live instructions if present: `AGENTS.md`, `CLAUDE.md`, `.agents/`, `.claude/`, `.pi/`, and `koder/STATE.md`.
3. Inspect current shape without dumping private content:
   - `git status --short --branch` if `.git/` exists;
   - `git diff --cached --name-only` if `.git/` exists;
   - top-level files and likely manifests: `README*`, `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, etc.;
   - existing changelog/release-notes/history files or directories, including under `docs/`;
   - existing `koder/` artifacts, skills, and validators.
4. Preserve live conventions. Do not overwrite existing instructions, skills, state, docs, history tracking, or symlinks.

## 2. Apply the project-history gate

Before creating project history during setup or upgrade:

1. Prefer root `CHANGELOG.md` when present. Otherwise detect an established top-level or `docs/` changelog, changes, history, news, releases, or release-notes file, or `.changeset/`/release-notes directory.
2. If an equivalent exists, preserve it in place. Do not create `CHANGELOG.md`, rename the existing surface, or copy its archive into `koder/`.
3. If no equivalent exists, create root `CHANGELOG.md` newest-first:
   - for an established Git repository, inspect commit subjects, dates, relevant diffs, and root documentation; write no more than 10 verified umbrella entries and keep the initial file at or below 100 lines;
   - group related commits into meaningful milestones rather than copying raw `git log` lines;
   - distinguish historical claims from current readiness, which remains owned by `koder/STATE.md`, live Git facts, and current validation;
   - for a new repository with no meaningful history, create only a concise `Unreleased` or koder-pattern adoption entry.
4. Never copy secrets, private payloads, sensitive identifiers, or questionable commit text into project history. Summarize only verified, safe facts.
5. Generated `open` reads at most 100 lines from the newest history content. The cap applies to open-time loading, not necessarily the lifetime size of an established release archive.

The init script performs the same detection but can only write a conservative starter. During agent-assisted adoption or upgrade, curate that starter from verified Git history before finalizing the logical change.

## 3. Prefer the init script

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

# Explicitly opt out when this repository intentionally keeps no local history surface
"$KODER_PATTERN_BIN" init --no-changelog .

# Reassert all three harnesses explicitly (same harness set as the default)
"$KODER_PATTERN_BIN" init --all .

# Validate the canonical scaffold and every default harness adapter
"$KODER_PATTERN_BIN" doctor .
```

Script behavior:

- creates the target folder if missing;
- creates missing scaffold files only;
- skips existing files/dirs/symlinks instead of replacing them;
- preserves an existing changelog/release-notes/history surface and otherwise creates a concise root `CHANGELOG.md` unless `--no-changelog` is set;
- does not move existing docs or history tracking;
- initializes git if needed unless `--no-commit` or `--dry-run` is used;
- commits only created paths unless `--no-commit` or `--dry-run` is used: fresh setup uses `state: init - koder pattern scaffold`, while a repository with existing `koder/STATE.md` uses `chore(koder-pattern): add missing scaffold paths`;
- preserves unrelated dirty/staged work by using a selected-path commit;
- creates `AGENTS.md`, `CLAUDE.md`, and Pi, Codex, and Claude skill adapters by default;
- installs `koder/skills/close/bin/scratch-invariant.sh` with its executable bit set;
- retains explicit `--no-pi`, `--no-codex`, and `--no-claude` escape hatches for constrained targets, but `doctor` reports those targets as incomplete against the cross-harness default.

Default scaffold:

```text
CHANGELOG.md                    # only when no equivalent history surface exists
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
      bin/scratch-invariant.sh
      references/{INDEX,FORMAT}.md
.pi/skills/open -> ../../koder/skills/open
.pi/skills/close -> ../../koder/skills/close
.agents/skills/open -> ../../koder/skills/open
.agents/skills/close -> ../../koder/skills/close
.claude/skills/open -> ../../koder/skills/open
.claude/skills/close -> ../../koder/skills/close
```

The six adapter links contain no skill data. They resolve directly to the two canonical directories under `koder/skills/`. Codex and Claude explicitly support symlinked skill folders; Pi canonicalizes duplicate real paths, so seeing the same target through `.pi/skills/` and `.agents/skills/` does not load a second copy.

Fresh-setup default commit body:

```text
State event: init
State file: koder/STATE.md

Scaffold:
- koder/AGENTS.md
- koder/STATE.md
- koder/issues/
- koder/skills/open/
- koder/skills/close/
- CHANGELOG.md when no equivalent project-history surface exists

Delta:
- Repository now has koder-pattern durable operator state.
- Agent surfaces point at koder-owned instructions/skills where possible.
- Project-history tracking was preserved, initialized, or explicitly skipped.
```

### Existing consumer upgrades

Do not treat `init` as a template updater: existing files are intentionally skipped. For an upgrade:

1. Compare the live `koder/AGENTS.md` and `koder/skills/{open,close}/` files with the current templates.
2. Merge only the newer reusable guarantees, preserving project-specific sections and paths.
3. Apply the project-history gate above. If no equivalent exists, add and curate `CHANGELOG.md`; if one exists, teach `open` to use it without creating a duplicate.
4. Run `doctor`, repository validation, both koder-pattern smoke tests when setup machinery changed, and `git diff --check`.
5. Commit the upgrade as one logical change. Do not use `state: init` for an existing consumer, and do not update `koder/STATE.md` merely because templates moved; summarize it at close unless the user explicitly requested a handoff update.

## 4. Manual fallback

If the script cannot run, manually create the same thin scaffold, apply the project-history gate, and make a state commit for a fresh setup.

1. Detect an existing project-history surface using the gate above. If none exists, create root `CHANGELOG.md`; for an established repository, curate no more than 10 verified umbrella entries from Git before committing.
2. Create directories:
   ```bash
   mkdir -p koder/issues koder/skills/open/references koder/skills/close/{bin,references}
   touch koder/issues/.gitkeep
   ```
3. Copy templates from the skill root:
   - `templates/koder/AGENTS.md` -> `koder/AGENTS.md`
   - `templates/koder/skills/open/SKILL.md.template` -> `koder/skills/open/SKILL.md`
   - `templates/koder/skills/open/references/{INDEX,FORMAT}.md` -> `koder/skills/open/references/`
   - `templates/koder/skills/close/SKILL.md.template` -> `koder/skills/close/SKILL.md`
   - `templates/koder/skills/close/bin/scratch-invariant.sh` -> `koder/skills/close/bin/scratch-invariant.sh` (then `chmod +x`)
   - `templates/koder/skills/close/references/{INDEX,FORMAT}.md` -> `koder/skills/close/references/`
4. Create `koder/STATE.md` with India-time frontmatter and concise handoff sections:
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
5. Create every default adapter only when its path is absent:
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
6. Initialize git if needed and commit only scaffold paths. Include `CHANGELOG.md` in the selected path list only when this setup created it. Write the default commit body shown above to `/tmp/koder-state-init-message`:
   ```bash
   git rev-parse --is-inside-work-tree >/dev/null 2>&1 || git init
   git add -- AGENTS.md CLAUDE.md koder/AGENTS.md koder/STATE.md koder/issues/.gitkeep koder/skills/open koder/skills/close .pi/skills/open .pi/skills/close .agents/skills/open .agents/skills/close .claude/skills/open .claude/skills/close
   git commit -F /tmp/koder-state-init-message -- AGENTS.md CLAUDE.md koder/AGENTS.md koder/STATE.md koder/issues/.gitkeep koder/skills/open koder/skills/close .pi/skills/open .pi/skills/close .agents/skills/open .agents/skills/close .claude/skills/open .claude/skills/close
   ```

If `AGENTS.md`, `CLAUDE.md`, skill paths, or project-history surfaces already exist, do not replace them. Report that a deliberate merge/pointer may be needed. If the user explicitly says not to commit, skip step 6 and report the uncommitted scaffold paths.

## 5. Validate and hand back

1. Run the doctor when available:
   ```bash
   "$KODER_PATTERN_BIN" doctor .
   ```
   When changing the setup implementation itself, also run both isolated smoke tests:
   ```bash
   bash "$(dirname "$KODER_PATTERN_BIN")/../tests/cross-harness-smoke.sh"
   bash "$(dirname "$KODER_PATTERN_BIN")/../tests/scratch-invariant-smoke.sh"
   ```
2. Verify `koder/STATE.md` is under 100 lines. When setup created `CHANGELOG.md`, verify its initial curated history is also at or below 100 lines:
   ```bash
   wc -l koder/STATE.md
   test ! -f CHANGELOG.md || wc -l CHANGELOG.md
   ```
3. Inspect repo state if git exists:
   ```bash
   git status --short
   git log --grep='^state:' --oneline -5
   ```
4. Summarize created files, the preserved or created project-history surface, skipped existing paths, the `state: init` commit hash if one was made, and any remaining dirty paths.

## Manual validation checklist

- `koder/AGENTS.md` exists and states the koder placement/safety/state-commit policy plus the conditional fail-closed boundary for queues that explicitly declare blind mode.
- `koder/STATE.md` has `updated_at`, Past/Present/Future, and is under 100 lines.
- An established changelog/release-notes/history surface was preserved, or root `CHANGELOG.md` was created (unless explicitly opted out). A newly curated changelog has at most 10 umbrella entries and no more than 100 initial lines.
- Generated `open` discovers that history surface, reads no more than 100 lines of newest content, and treats it as historical grounding rather than live state.
- `koder/issues/` exists; other artifact dirs are absent unless requested or pre-existing.
- `koder/skills/open/SKILL.md` and `koder/skills/close/SKILL.md` have valid Agent Skills frontmatter plus a tiny body link to `references/INDEX.md`; the body link keeps Claude compatible while preserving progressive disclosure in all three harnesses.
- Both skills have `references/INDEX.md` workflow instructions and `references/FORMAT.md` pretty-print output contracts; `open` conditionally reports active execution window, orchestration mode, and stop gate without starting work. The close skill also has executable `bin/scratch-invariant.sh` and runs it before commit.
- Root `AGENTS.md` and `CLAUDE.md` are symlinks to `koder/AGENTS.md`, or existing root files were preserved and merge needs were reported.
- `.pi/skills/{open,close}`, `.agents/skills/{open,close}`, and `.claude/skills/{open,close}` are relative symlinks to the same `koder/skills/*` directories.
- Canonical path resolution (`pwd -P` from each directory, or an equivalent) maps every harness adapter to its matching `koder/skills/*` directory; there are only two physical generated `SKILL.md` files.
- A fresh setup has `state: init - koder pattern scaffold` unless `--no-commit`/explicit no-commit was used or no scaffold paths changed. An existing consumer never replays `state: init`; create-only synchronization uses a normal logical commit.
- No secrets, private payloads, full prompts, large generated outputs, or unrelated caches were created or committed.
- Unrelated dirty/staged work, if any, was not swept into the state commit.

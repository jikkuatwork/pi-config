---
title: Koder Pattern Setup
updated: 2026-06-05
---

# Koder Pattern Setup

Use when the user asks to set up, install, initialize, or bootstrap the koder pattern in a repository.

Goal: leave the target repo with durable handoff state, project-local open/close skills, git initialized, and a concise `koder/STATE.md` built from available repo facts. By default, finish with the close flow and commit the setup unless the user explicitly says not to commit.

## 1. Inspect before writing

1. Locate the target repo/root from the current working directory.
2. Read live instructions if present: `AGENTS.md`, `CLAUDE.md`, `.agents/`, `.pi/`, and `koder/STATE.md`.
3. Inspect current shape without dumping private content:
   - `git status --short --branch` if `.git/` exists;
   - top-level files and likely manifests: `README*`, `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, etc.;
   - existing `koder/` artifacts and validators, if any.
4. Preserve live conventions. Do not overwrite existing instructions, skills, or state without merging a small compatible section.

## 2. Initialize git

If the target is not already a git repository, run:

```bash
git init
```

Do not add remotes, change branches, or rewrite history unless explicitly asked.

## 3. Create or merge core files

### `AGENTS.md`

If missing, create a concise repo instruction file like:

```markdown
# Agent Instructions

This repo uses the koder pattern for durable agent handoff and project memory.

## Session handoff

- Use `/skill:open` at the start of a session.
- Use `/skill:close` at the end of a session; it updates `koder/STATE.md` and commits intentional work.
- Read `koder/STATE.md` before making changes when opening manually.
- Keep `koder/STATE.md` short and current; update it when closing meaningful work.
- Do not put secrets, private payloads, full prompts, credentials, or large copied source/output into `koder/`.

## Koder artifacts

- Use folder-first artifacts for durable records: `koder/<type>/NNN_short_slug/INDEX.md`.
- Treat `INDEX.md` as canonical current state; use `turns/` only for optional discussion/history.
- Scan existing artifacts before choosing the next number; each artifact type has its own sequence.
- Prefer source links, file paths, command names, and concise evidence over copied detail.
- Run local validators before finalizing artifacts when validators exist.

## Project-local skills

- `.pi/skills/open/` contains the start-of-session handoff skill.
- `.pi/skills/close/` contains the end-of-session handoff/commit skill.
```

If `AGENTS.md` exists, add only missing session-handoff/koder sections and keep existing project policy authoritative.

If `CLAUDE.md` is missing and `AGENTS.md` exists, create a symlink or tiny pointer to `AGENTS.md`. Do not replace an existing `CLAUDE.md`.

### `koder/STATE.md`

If missing, create it with India-time frontmatter and facts discovered during inspection:

```markdown
---
updated_at: "DD Mon YYYY | HH:MM AM IST"
---

# Koder State

## Past

- Repository initialized with the koder-pattern handoff scaffold.

## Present

- Current repo shape: <brief stack/manifests/instructions/git branch/dirty state>.
- Koder setup files: `AGENTS.md`, `.pi/skills/open/SKILL.md`, `.pi/skills/close/SKILL.md`, and `koder/STATE.md`.

## Future

- Decide the next product/implementation task.
- Use `/skill:open` at session start and `/skill:close` at session end.
```

If state exists, update it only as part of close, keeping it under 100 lines and source-linked/concise.

### `.pi/skills/open/SKILL.md`

Create or refresh this exact project-local open skill when absent or clearly stale:

````markdown
---
name: open
description: Start-of-session hand-off for this repo. Use when beginning work in this project; reads koder/STATE.md, inspects repository status, and summarizes past/present/future context before changes.
---

# Open Session

Use this skill at the beginning of a work session in this repository.

## Steps

1. Locate the repository/project root from the current working directory.
2. Read `koder/STATE.md` completely before making changes.
3. Check repository state:
   ```bash
   git status --short
   git branch --show-current
   git log --oneline -5
   ```
   If this is not a git repository, say so clearly and continue with the file-based hand-off.
4. Summarize:
   - Past: what was previously done.
   - Present: current repo state and any dirty/uncommitted work.
   - Future: next likely tasks or risks.
5. Ask what the user wants to do next unless they already gave a concrete task.

## Rules

- Do not modify files as part of opening unless the user explicitly asks.
- Treat `koder/STATE.md` as the source of truth for cross-session context.
- If `koder/STATE.md` is missing, tell the user and offer to create it.
````

### `.pi/skills/close/SKILL.md`

Create or refresh this exact project-local close skill when absent or clearly stale:

````markdown
---
name: close
description: End-of-session hand-off for this repo. Use when finishing work; updates koder/STATE.md under 100 lines, reviews changes, commits all work, and leaves the repository clean.
---

# Close Session

Use this skill at the end of a work session in this repository.

## Steps

1. Inspect current state:
   ```bash
   git status --short
   git diff --stat
   ```
2. Refresh `koder/STATE.md` frontmatter timestamp:
   - Ensure the file starts with YAML frontmatter containing `updated_at`.
   - Set `updated_at` to current India time in this exact format: `DD Mon YYYY | HH:MM AM IST`.
   - Use:
     ```bash
     TZ='Asia/Kolkata' date '+%d %b %Y | %I:%M %p IST'
     ```
3. Update `koder/STATE.md` so it remains under 100 lines and accurately captures:
   - Past: durable completed work from this session.
   - Present: current repo structure/state and any important caveats.
   - Future: concise next steps for the next session.
4. Verify line count:
   ```bash
   wc -l koder/STATE.md
   ```
   If it is 100 lines or more, compress it before continuing.
5. Run relevant checks/tests if the repo defines any. If none exist, note that no test suite is present.
6. Review final changes:
   ```bash
   git status --short
   git diff --stat
   ```
7. Commit all work:
   - If this is not a git repository, initialize it with `git init`.
   - Stage all intentional changes with `git add -A`.
   - Commit with a concise descriptive message, e.g. `chore: set up koder pattern`.
8. Confirm the repo is clean:
   ```bash
   git status --short
   ```

## Rules

- Do not leave intentional work uncommitted.
- Do not commit secrets, credentials, caches, build outputs, or unrelated generated files.
- If a commit cannot be made, explain exactly why and what remains dirty.
- Keep `koder/STATE.md` concise; it is a hand-off, not a changelog.
- Always update `updated_at` in `koder/STATE.md` frontmatter using India time format: `DD Mon YYYY | HH:MM AM IST`.
````

### `.gitignore`, `.editorconfig`, README

- Ensure `.gitignore` excludes transient and secret-prone files, especially `koder/scratch/`, `.env`, `.env.*`, OS/editor noise, dependencies, and build outputs. Preserve existing ignore rules.
- Create `.editorconfig` only if missing.
- Create or update `README.md` only when the repo has no useful README; add a short agent handoff section, not project claims you cannot verify.

## 4. Close by default

For a plain “set up koder-pattern in this repo” request, finish by running the close flow unless the user said not to commit:

1. Update `koder/STATE.md` with the setup work and discovered repo facts.
2. Verify `wc -l koder/STATE.md` is under 100.
3. Run available validators/tests. If none exist, state that none exist and manual checks were done.
4. Review `git status --short` and `git diff --stat`.
5. `git add -A` and `git commit -m "chore: set up koder pattern"`.
6. Confirm `git status --short` is empty.

## Manual validation checklist

- `.git/` exists.
- `AGENTS.md` or equivalent mentions `/skill:open`, `/skill:close`, `koder/STATE.md`, and secret hygiene.
- `.pi/skills/open/SKILL.md` and `.pi/skills/close/SKILL.md` exist and have valid frontmatter.
- `koder/STATE.md` has `updated_at`, Past/Present/Future, and is under 100 lines.
- `.gitignore` excludes `koder/scratch/` and env/secrets.
- No secrets, private payloads, full prompts, large generated outputs, or unrelated caches are committed.
- The target repo is clean after close unless commit was explicitly skipped or failed.

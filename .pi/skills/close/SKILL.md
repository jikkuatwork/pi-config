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
2. Update `koder/STATE.md` so it remains under 100 lines and accurately captures:
   - Past: durable completed work from this session.
   - Present: current repo structure/state and any important caveats.
   - Future: concise next steps for the next session.
3. Verify line count:
   ```bash
   wc -l koder/STATE.md
   ```
   If it is 100 lines or more, compress it before continuing.
4. Run relevant checks/tests if the repo defines any. If none exist, note that no test suite is present.
5. Review final changes:
   ```bash
   git status --short
   git diff --stat
   ```
6. Commit all work:
   - If this is not a git repository, initialize it with `git init`.
   - Stage all intentional changes with `git add -A`.
   - Commit with a concise descriptive message, e.g. `chore: update session handoff`.
7. Confirm the repo is clean:
   ```bash
   git status --short
   ```

## Rules

- Do not leave intentional work uncommitted.
- Do not commit secrets, credentials, caches, build outputs, or unrelated generated files.
- If a commit cannot be made, explain exactly why and what remains dirty.
- Keep `koder/STATE.md` concise; it is a hand-off, not a changelog.

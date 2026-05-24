---
updated_at: "24 May 2026 | 11:12 PM IST"
---

# Koder State

## Purpose

- Persistent hand-off for future pi/koder sessions.
- Keep this file under 100 lines.
- Track only Past / Present / Future.

## Past

- Session lifecycle flow is active (`open` / `close` with `koder/STATE.md`).
- Repo remains source-of-truth for personal pi extensions, reviewed skills, and workflow notes.
- `holm-app` is self-contained/direct-use; invocation reads `references/INDEX.md`, then task-relevant refs and live Holm/Zippy docs when available.
- Prior session hardened Holm app guidance around complex/Zippy apps, app readiness, post-#340 first-shot analysis, and Holm follow-ups #341-#344.
- This session reviewed live Holm's mature `koder/` meta folder pattern across issues, plans, reviews, queues, research, analysis, notes, tasks, scratch, and harnex workflow docs.
- Added local `.pi/skills/koder-pattern/` as a direct-use umbrella skill with a tiny main file and reference docs for artifact model, issues/plans/reviews, queues, harnex, research/analysis/notes, Holm pattern review, and eval prompts.
- Folded queue-add/queue-run behavior into `references/queues.md` and harnex dispatch/task-brief/monitoring into `references/harnex.md` instead of creating separate always-advertised skills.
- Main `koder-pattern/SKILL.md` stays small and defines “file” and “turn”; turns are optional for any folder-first artifact when separate discussion/history helps, while reviews use numbered files directly.

## Present

- Working tree should contain only the new `koder-pattern` skill plus this state update before commit.
- This repo has no root build/test harness or package manager project.
- `koder-pattern` is intentionally direct-use only; do not auto-load at session init.
- Live repo conventions beat cached refs; use local validators when available, otherwise manual frontmatter/path/status checks.

## Future

- Reload/restart pi so the new `koder-pattern` skill is discovered.
- When invoked, read `.pi/skills/koder-pattern/references/INDEX.md` first, then only task-relevant refs.
- If promoting globally, copy the whole `.pi/skills/koder-pattern/` directory including all `references/` files.
- Consider using `koder-pattern` for future requests like “file an issue”, “pack/run a queue”, “dispatch via harnex”, or “do one turn in #NNN”.

## Commands

- Status: `git status --short`
- Diff summary: `git diff --stat`
- State length: `wc -l koder/STATE.md`

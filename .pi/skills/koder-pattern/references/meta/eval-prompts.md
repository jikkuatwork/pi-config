---
title: Koder Pattern Eval Prompts
updated: 2026-06-11
---

# Koder Pattern Eval Prompts

Use these to verify trigger boundaries and output quality after changing the skill.

## Invocation boundary

This global install is visible to model invocation. Natural-language setup/artifact requests and `/skill:koder-pattern ...` should both load the skill. Ordinary code work, generic repo opening, and chat-only research should not trigger it.

## Should trigger

1. **Repo setup**

   > Set up koder-pattern in this repo.

   Expected: load router, setup leaf, and state-commit protocol; prefer `bin/koder-pattern init`; create `koder/AGENTS.md`, `koder/STATE.md`, `koder/issues/`, `koder/skills/{open,close}/`, plus safe symlink adapters; initialize git if needed and commit created scaffold paths with `state: init - koder pattern scaffold` unless explicitly told not to commit.

2. **Issue filing**

   > /skill:koder-pattern file an issue for the flaky app request command. Include acceptance criteria and link the failing test output.

   Expected: load router, issue leaf, and state-commit protocol; create/update `koder/issues/NNN_slug/INDEX.md`; update `koder/STATE.md` when this is an external filing or semantic state move; validate if possible; commit intentional state paths with a `state:` subject unless explicitly told not to commit.

3. **Queue creation**

   > /skill:koder-pattern pack the safe Plan 455 follow-ups into a 6h A2 queue with no deploy, no cloud spend, and validation commands.

   Expected: load queue router/model/gates/add; inspect source plan; create/update `koder/queue/.../INDEX.md` with thin entries and gates.

4. **Review filing**

   > /skill:koder-pattern write a code review artifact for Plan 410. Verdict needs fixes; cite the cache header gaps.

   Expected: load review leaf; write numbered review file under `koder/reviews/...`; include verdict, findings, evidence, verification.

5. **Research/analysis filing**

   > /skill:koder-pattern turn this benchmark audit into an analysis artifact and file follow-up issues only for actionable gaps.

   Expected: load analysis leaf; create `koder/analysis/.../INDEX.md`; separate evidence/recommendation/follow-ups.

6. **Harnex-backed queue work**

   > /skill:koder-pattern run Queue 006 with harnex-chain entries, carrying queue metadata into dispatch summaries.

   Expected: load queue-run plus harnex refs; enforce brief bounds; dispatch/monitor with metadata; update queue run log.

7. **External issue into dirty repo**

   > /skill:koder-pattern file an issue in ../target from this repo. Target has unrelated dirty code; preserve it.

   Expected: inspect `git status --short` and `git diff --cached --name-only` in target; stop if `koder/STATE.md` or target issue path is dirty/staged; create issue; update `koder/STATE.md`; commit only those paths with `state: file #NNN from <origin> - <reason>`; leave unrelated dirty/staged work untouched.

## Should not trigger unless explicitly loaded

1. **Ordinary code implementation**

   > Fix the failing app request test.

   Expected: normal coding workflow; no `koder-pattern` unless the user asks to file/update artifacts.

2. **Generic project opening**

   > Open this repo and summarize the state.

   Expected: use repo open/session handoff, not `koder-pattern`.

3. **Generic research without koder artifact**

   > Research alternatives to SQLite backups and summarize in chat.

   Expected: normal/deep research; do not create `koder/research` unless asked to file it.

## Edge cases

- User says “set up koder-pattern” in a folder without `.git/`: create the thin scaffold, initialize git, and make `state: init - koder pattern scaffold` unless explicitly told not to commit.
- User says “file a ticket” in a repo without `koder/`: ask whether to create `koder/` artifacts or use the repo's existing tracker.
- Existing flat issue files: preserve legacy format unless creating a new artifact.
- Duplicate numbers: route by full path and avoid renumbering history.
- Missing validators: perform manual checks and state that no validator exists.
- Red-risk queue item: do not queue without explicit approval and constraints.
- Harnex unavailable: fall back to repo-local worker mode or ask; do not invent harnex telemetry.

## Quality checklist

- [ ] `SKILL.md` is below 10 total lines.
- [ ] Skill description is narrow enough to trigger setup/artifact work without catching ordinary code work.
- [ ] Setup flow prefers the init script, creates the thin `koder/` scaffold plus symlink adapters, preserves existing files, and commits created scaffold paths with `state: init - koder pattern scaffold` by default.
- [ ] Main router loads only nested routers/leaves and the shared state-commit protocol when state changes are requested.
- [ ] New artifacts have stable paths and frontmatter.
- [ ] Source-of-truth hierarchy is respected: live repo conventions beat cached refs.
- [ ] Queue entries reference source artifacts instead of duplicating implementation detail.
- [ ] Harnex dispatches include bounded briefs, metadata, monitoring, and stop/closeout rules.
- [ ] Reviews include verdict, prioritized findings, passing checks, and verification.
- [ ] Plans include one capability, defers/non-goals, validation, and stop rules.
- [ ] State-changing setup/artifact flows use grepable `state:` commits and selected-path dirty-repo guardrails.
- [ ] No secrets, full prompts, credentials, private payloads, or sensitive account IDs are written.

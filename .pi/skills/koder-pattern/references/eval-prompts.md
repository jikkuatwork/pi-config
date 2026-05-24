---
title: Koder Pattern Eval Prompts
updated: 2026-05-24
---

# Koder Pattern Eval Prompts

Use these to verify trigger boundaries and output quality after changing the skill.

## Should trigger

1. **Explicit skill use**

   > Use koder-pattern and file an issue for the flaky app request command. Include acceptance criteria and link the failing test output.

   Expected: load skill, read router, create/update `koder/issues/NNN_slug/INDEX.md`, validate if possible.

2. **Queue creation**

   > /koder-pattern pack the safe Plan 455 follow-ups into a 6h A2 queue with no deploy, no cloud spend, and validation commands.

   Expected: load queue ref, inspect source plan, create/update `koder/queue/.../INDEX.md` with thin entries and gates.

3. **Review filing**

   > Use koder-pattern to write a code review artifact for Plan 410. Verdict needs fixes; cite the cache header gaps.

   Expected: load issue/plan/review ref, write numbered review file under `koder/reviews/...`, include verdict, findings, evidence, verification.

4. **Research/analysis filing**

   > Use koder-pattern to turn this benchmark audit into an analysis artifact and file follow-up issues only for actionable gaps.

   Expected: load research/analysis ref, create `koder/analysis/.../INDEX.md`, separate evidence/recommendation/follow-ups.

5. **Harnex-backed queue work**

   > Use koder-pattern to run Queue 006 with harnex-chain entries, carrying queue metadata into dispatch summaries.

   Expected: load queues + harnex refs, enforce brief bounds, dispatch/monitor with metadata, update queue run log.

## Should not trigger

1. **Ordinary code implementation**

   > Fix the failing app request test.

   Expected: do normal coding workflow; do not load koder-pattern unless the user asks to file/update artifacts.

2. **Generic project opening**

   > Open this repo and summarize the state.

   Expected: use repo open/session handoff, not koder-pattern.

3. **Generic research without koder artifact**

   > Research alternatives to SQLite backups and summarize in chat.

   Expected: use normal/deep research; do not create `koder/research` unless asked to file it.

4. **Holm app building**

   > Build a Zippy-based Holm app with auth, realtime, PWA, and member storage.

   Expected: use `holm-app`, not koder-pattern, unless also asked to file issue/plan/review/queue artifacts.

## Edge cases

- User says “file a ticket” in a repo without `koder/`: ask whether to create `koder/` artifacts or use the repo's existing tracker.
- Existing flat issue files: preserve legacy format unless creating a new artifact.
- Duplicate numbers: route by full path and avoid renumbering history.
- Missing validators: perform manual checks and state that no validator exists.
- Red-risk queue item: do not queue without explicit approval and constraints.
- Harnex unavailable: fall back to repo-local worker mode or ask; do not invent harnex telemetry.

## Quality checklist

- [ ] Skill description is direct-use only and avoids broad auto-trigger words.
- [ ] Main `SKILL.md` stays under 10 content lines after the heading.
- [ ] New artifacts have stable paths and frontmatter.
- [ ] Source-of-truth hierarchy is respected: live repo conventions beat cached refs.
- [ ] Queue entries reference source artifacts instead of duplicating implementation detail.
- [ ] Queue-add and queue-run behavior is self-contained in `queues.md`.
- [ ] Harnex dispatches include bounded briefs, metadata, monitoring, and stop/closeout rules.
- [ ] Reviews include verdict, prioritized findings, passing checks, and verification.
- [ ] Plans include one capability, defers/non-goals, validation, and stop rules.
- [ ] No secrets, full prompts, credentials, private payloads, or sensitive account IDs are written.

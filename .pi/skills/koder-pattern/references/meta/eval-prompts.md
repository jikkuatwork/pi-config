---
title: Koder Pattern Eval Prompts
updated: 2026-08-19
---

# Koder Pattern Eval Prompts

Use these to verify trigger boundaries and output quality after changing the skill.

## Invocation boundary

This global install is visible to model invocation through the Pi, Codex, and Claude global skill symlinks. Explicit natural-language naming (`koder-pattern`, `with koder-pattern`, `use koder-pattern`) and `/skill:koder-pattern ...` should load the skill. Natural-language setup, explicit durable `koder/` artifact, and koder queue/Harnex requests should also match. Ordinary coding, planning, review, research, and generic repo opening should not trigger it merely because those activities could produce an artifact.

Loading koder-pattern does not authorize queue/Harnex/blind machinery. Mode
selection must still choose the lightest safe workflow and disclose when a
window produces process artifacts rather than product code.

## Should trigger

1. **Explicit natural-language invocation**

   > Get this done with koder-pattern.

   Expected: load `SKILL.md`, follow its standard body link to `references/INDEX.md`, and choose the narrowest route from the existing conversation/task context. Do not assume “setup” merely because koder-pattern was named. If “this” has no referent, ask only for the missing task.

2. **Repo setup**

   > Set up koder-pattern in this repo.

   Expected: load router, setup leaf, and state-commit protocol; prefer `bin/koder-pattern init`; create one canonical `koder/skills/{open,close}/` copy with relative adapters for Pi (`.pi/skills`), Codex (`.agents/skills`), and Claude (`.claude/skills`), plus `AGENTS.md`/`CLAUDE.md` instruction links. Preserve existing changelog/release-notes/history tracking; otherwise create root `CHANGELOG.md`, curating established Git history into no more than 10 verified umbrella entries and at most 100 initial lines. Initialize git if needed and commit created scaffold paths with `state: init - koder pattern scaffold` unless explicitly told not to commit.

3. **Issue filing**

   > /skill:koder-pattern file an issue for the flaky app request command. Include acceptance criteria and link the failing test output.

   Expected: load router and issue leaf; create/update `koder/issues/NNN_slug/INDEX.md`; do not update `koder/STATE.md` for an ordinary local issue filing; validate if possible; include the issue with the logical work/checkpoint commit rather than manufacturing a standalone `state:` commit.

4. **Queue creation**

   > /skill:koder-pattern pack the safe Plan 455 follow-ups into a 6h A2 queue with no deploy, no cloud spend, and validation commands.

   Expected: load queue router/model/gates/add; inspect source plan; create/update `koder/queue/.../INDEX.md` with thin entries and gates.

5. **Queue conveyor extraction**

   > /skill:koder-pattern extract queueable slices from Issue 455 and prepare the next safe queue while Queue 006 is running.

   Expected: load queue router and `references/queues/conveyor.md`; classify safe slices vs human gates/red risks; write/update thin source plans when needed; pack only sequentially compatible non-overlapping queue entries with a completion contract and slice/issue progress accounting when the parent issue is broad.

6. **Review filing**

   > /skill:koder-pattern write a code review artifact for Plan 410. Verdict needs fixes; cite the cache header gaps.

   Expected: load review leaf; write numbered review file under `koder/reviews/...`; include verdict, findings, evidence, verification.

7. **Research/analysis filing**

   > /skill:koder-pattern turn this benchmark audit into an analysis artifact and file follow-up issues only for actionable gaps.

   Expected: load analysis leaf; create `koder/analysis/.../INDEX.md`; separate evidence/recommendation/follow-ups.

8. **Slice accounting for broad work**

   > /skill:koder-pattern issue count is not moving; add slice ledgers/progress accounting for the next queue only, without rewriting the whole backlog.

   Expected: load `references/shared/slice-accounting.md` plus queue/issue leaves; lazily add `issue_kind`, `Slice Ledger`, and queue progress accounting only to touched artifacts; report slices queued/drained/blocked separately from raw issue closure.

9. **Harnex-backed queue work**

   > /skill:koder-pattern run Queue 006 with harnex-chain entries, carrying queue metadata into dispatch summaries.

   Expected: load queue-run plus harnex refs; enforce brief bounds; dispatch/monitor with metadata; update queue run log.

10. **Blind orchestrator adoption/run**

   > /skill:koder-pattern turn Queue 001 into a blind overnight run. Keep this primary context out of implementation, require independent review and fix/re-review, and roll coordinators before they bloat.

   Expected: load mode selection before blind orchestration, briefs, queue model/gates/run, and harnex routes; disclose product outcome, phases/workers, artifact count, wall budget, and stop gate; prove why direct/supervised work is insufficient; keep the repo overlay small; set explicit blind mode, assurance/review granularity, `1-4` coordinator cap, fix cap, final-review policy, ownership, and validation; fail closed without declared isolation. With Harnex, prefer `harnex.artifact_report.v1` plus first-class attribution/terminal summary rather than a duplicate custom phase receipt; retain the portable fallback for equivalent harnesses.

11. **Blind run recovery**

   > /skill:koder-pattern harnex says coordinator 03 failed, but S07 has a pushed implementation commit and compact receipt. Recover without reading the diff or redoing valid work.

   Expected: load blind recovery; fence ownership; reconcile harness, receipt, commit/canonical artifact, queue, and Git independently; launch a fresh coordinator at the first unproven phase (normally review); record a process anomaly rather than blindly accepting or replaying work.

12. **Inline unblock questions**

   > /skill:koder-pattern unblock Queue 066: ask me only the decisions needed so agents can keep draining safe slices overnight.

   Expected: load `references/artifacts/unblock.md`; inspect queue/source artifacts; ask terse inline numbered questions in chat with `Unblocks:` refs, recommended option first as `a.`, stable labels, no discoverable implementation-detail questions, and a low-friction reply hint that also accepts any temp file under `koder/scratch/`. Do not create `koder/unblock/`.

13. **External issue into dirty repo**

   > /skill:koder-pattern file an issue in ../target from this repo. Target has unrelated dirty code; preserve it.

   Expected: inspect `git status --short` and `git diff --cached --name-only` in target; stop if `koder/STATE.md` or target issue path is dirty/staged; create issue; update `koder/STATE.md`; commit only those paths with `state: file #NNN from <origin> - <reason>`; leave unrelated dirty/staged work untouched.

14. **Owner-present planning economy**

   > /skill:koder-pattern write a thin plan for this one-hour fix while I am here.

   Expected: file one concise plan directly. Do not create a queue, conveyor map,
   Harnex session, independent plan-review chain, or metadata finalizer unless
   specific risk/repo policy requires it. State clearly that the result is a
   plan, not product code.

15. **Queue without blind mode**

   > /skill:koder-pattern run these three green owner-present queue rows.

   Expected: load mode selection and use direct or supervised execution. Queue
   existence alone must not select blind mode or a governor hierarchy.

16. **Existing consumer upgrade with release notes**

   > Upgrade this repo to the current koder-pattern. It already keeps release notes under `docs/releases/`.

   Expected: load the setup/upgrade route; do not treat `init` as an overwriting updater; deliberately merge newer canonical templates while preserving repo customizations. Reuse `docs/releases/` and teach `open` to read at most 100 lines from its newest entry; do not create root `CHANGELOG.md`. Commit as one logical upgrade, not `state: init`, and leave `koder/STATE.md` for close unless an explicit handoff update was requested.

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

4. **Ordinary planning or review**

   > Plan the smallest fix, then review the implementation.

   Expected: normal coding workflow. Do not load koder-pattern, create a plan/review artifact, queue work, or add state commits unless the user/repo explicitly requests durable koder output.

## Edge cases

- User says “set up koder-pattern” in a folder without `.git/`: create the thin scaffold and a concise root `CHANGELOG.md` unless explicitly opted out, initialize git, and make `state: init - koder pattern scaffold` unless explicitly told not to commit.
- Existing `CHANGELOG.md`, `HISTORY.md`, release-notes file, `.changeset/`, or release archive: preserve it and do not create a duplicate root changelog; generated `open` reads no more than 100 lines of newest content.
- Existing repo has Git history but no history surface: summarize verified commits into at most 10 newest-first umbrella entries rather than copying raw log lines or sensitive commit prose.
- Existing koder consumer asks for upgrade: merge templates deliberately because `init` skips existing files; do not overwrite local policy or use `state: init`.
- User says “file a ticket” in a repo without `koder/`: ask whether to create `koder/` artifacts or use the repo's existing tracker.
- Existing flat issue files: preserve legacy format unless creating a new artifact.
- Duplicate numbers: route by full path and avoid renumbering history.
- Missing validators: perform manual checks and state that no validator exists.
- Red-risk queue item: do not queue without explicit approval and constraints.
- Harnex unavailable for ordinary worker-mode work: execute directly when mode selection and repo policy allow, use an explicitly equivalent repo-local worker harness, or ask; do not invent telemetry. If the queue explicitly declares blind mode and its declared isolation/review cannot be enforced, fail closed rather than fall back to direct work.
- Planning crosses two worker attempts or 30 minutes with no product delta: stop, disclose elapsed/process artifacts/product delta, and request explicit re-authorization instead of extending the chain.
- Two no-op/boot/permission attempts for one phase: open the circuit breaker; change adapter/config/brief/mode or stop. Do not keep retrying.
- PTY worker produced canonical artifact/commit but monitor missed completion: use bounded recovery reconciliation immediately rather than waiting the full wall cap.
- Approving review requires only status/frontmatter movement: coordinator updates metadata directly; do not launch a finalizer worker.
- Blind worker leaves dirty source WIP: coordinator does not inspect/reset/finish it; dispatch a fresh recovery implementation worker or stop.
- Harnex reports failure after a valid pushed commit and atomic receipt: reconcile all evidence; do not automatically rerun and do not automatically declare success.
- Coordinator receipt missing but child phase receipts/commits exist: launch a fresh recovery coordinator at the first unproven phase; do not replay the prior transcript.

## Quality checklist

- [ ] `SKILL.md` routes through both `metadata.references.index` and a tiny standard body link to `references/INDEX.md`, so Pi, Codex, and Claude can all follow the front door.
- [ ] Skill description always matches explicit `koder-pattern` naming and remains narrow enough not to catch ordinary unnamed coding, planning, review, research, or repo opening.
- [ ] Setup flow prefers the init script, creates one canonical thin `koder/` scaffold plus default Pi/Codex/Claude symlink adapters, preserves existing files, and commits created scaffold paths with `state: init - koder pattern scaffold` by default.
- [ ] Setup/upgrade preserves established changelog/release-notes/history tracking; when none exists it creates root `CHANGELOG.md`, curates established history into no more than 10 safe umbrella entries and 100 initial lines, and never duplicates another release archive.
- [ ] Existing consumer upgrades merge templates deliberately because `init` is create-only; they use one logical upgrade commit rather than `state: init` and preserve local policy.
- [ ] Generated `open`/`close` entrypoints include a tiny standard body link to `references/INDEX.md`, so Claude can route the skill even when it ignores custom metadata.
- [ ] Generated `open` reads at most 100 lines from the newest established project-history content, uses it only as historical grounding, and keeps state/Git/validation authoritative.
- [ ] Main router loads only nested routers/leaves and the shared state-commit protocol when state changes are requested.
- [ ] New artifacts have stable paths and frontmatter.
- [ ] Source-of-truth hierarchy is respected: live repo conventions beat cached refs.
- [ ] Mode selection runs before queue/Harnex/blind adoption; a queue does not imply blind, Harnex does not imply a chain, and planning/docs/metadata default to direct or supervised work.
- [ ] Planning-only/blind authorization discloses product outcome, phase/worker count, artifacts, wall budget, and stop gate; process-only movement is never reported as product completion.
- [ ] Existing executable issues may be queue refs without redundant mapping/child plans, and coordinators update process metadata without finalizer workers.
- [ ] Queue entries reference source artifacts instead of duplicating implementation detail.
- [ ] Queue-conveyor work separates safe automatable slices from human-gated decisions, checks overlap with active work, includes completion contracts, and reports slice movement when issue count under-represents progress.
- [ ] Inline unblock questions ask only human decisions that block queue/task/slice progress, put the recommended option first as `a.` by default, allow chat or `koder/scratch/` temp-file answers, avoid `koder/unblock/`, and apply answers back to canonical issue/plan/queue artifacts.
- [ ] Harnex dispatches include bounded briefs, role/attempt/base/coordinator metadata, short first monitor fences, atomic native artifact reports, and stop/closeout rules; they obey the two-attempt circuit breaker and do not duplicate phase proof.
- [ ] Harnex terminal telemetry and live Git own observed commit refs/changed paths/clean state; workers do not synthesize expanded SHAs.
- [ ] Explicit blind queues use the governor/coordinator/phase-worker firewall, fresh independent review, direct review-to-fix handoff, configurable `1-4` rollover cap, separate final review when required, and fail-closed launch gates.
- [ ] Blind recovery reconciles process, receipt, commit/canonical artifact, queue, and Git independently; resumes from the first unproven phase; and delegates unknown product WIP to a recovery worker.
- [ ] Runtime prompts/receipts/logs remain external or ignored, while durable queue/review/run-log artifacts retain the minimum proof.
- [ ] Reviews include verdict, prioritized findings, passing checks, and verification.
- [ ] Plans include one capability, defers/non-goals, validation, and stop rules.
- [ ] `state:` commits remain sparse (init, real handoff, external filing, owner/process milestone, batched checkpoint); routine artifacts ride with logical work/review commits and selected-path dirty-repo guardrails.
- [ ] `koder/STATE.md` remains a session handoff, not a commit-by-commit ledger; only init, close, explicit handoff requests, and external-origin filings update it immediately.
- [ ] No secrets, full prompts, credentials, private payloads, or sensitive account IDs are written.

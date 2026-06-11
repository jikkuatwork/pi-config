---
status: resolved
priority: P1
created: 2026-06-11
updated: 2026-06-11
tags: koder-pattern, state, cross-repo, commits, workflow
type: design
context: External filing from Holm: make koder-pattern reliably record semantic repo-state transitions across repos.
---

# Issue 002: State commit protocol for cross-repo filings

## Problem

The `koder-pattern` skill provides durable artifacts, session handoffs, and repo-local memory, but it did not define a minimal reliable protocol for semantic repo-state movement across repositories.

When work in repo A discovers something repo B must track, agents can file an issue in repo B, but the surrounding state transition was not consistently recorded. The next operator could miss that repo B moved because the issue appeared mid-session, or an analysing agent could need to read full artifacts/chat instead of orienting from commit history.

## Context

Origin: Holm session on 2026-06-11 discussing reliable cross-repo operation before Foundry frontend work.

User direction from that discussion and follow-up review:

- Use the operational mental model of taking a repo from one semantic state to the next.
- Keep the MVP minimal: a `state:` commit for every intentional `koder/` state transition.
- Setup is not special; scaffold initialization is `state: init - koder pattern scaffold` unless explicitly skipped.
- Do not track every code commit; track independent semantic/operator movements.
- For external filings into a dirty repo, commit a small state movement if the commit only includes the new issue and `koder/STATE.md`.
- The `state:` commit body can carry structured delta metadata so future analysing agents can orient from git history alone.
- `koder/notes/` remains useful for larger handoffs or context that does not fit issues/plans/reviews, but notes are not the MVP state ledger.

Current relevant source in this repo:

- `.pi/skills/koder-pattern/` is the source for the global `koder-pattern` install.
- `koder/STATE.md` is the local handoff state file.

## Implemented Direction

`koder-pattern` now defines a minimal **state commit protocol**:

1. Every intentional `koder/` state transition gets a grepable `state:` commit by default.

2. Setup initializes git if needed and commits created scaffold paths:

   ```text
   state: init - koder pattern scaffold
   ```

3. Close commits use:

   ```text
   state: close - <semantic session result>
   ```

4. New issues filed from outside the target repo should:

   - create the issue artifact;
   - update `koder/STATE.md` with a short external-filing note and `updated_at`;
   - commit only the issue artifact and `koder/STATE.md`;
   - use a grepable subject:

   ```text
   state: file #NNN from <origin-repo> - <short reason>
   ```

5. External filing commit bodies use structured fields:

   ```text
   State event: external_issue
   Origin repo: <repo>
   Origin context: <one line>
   Issue: koder/issues/NNN_slug/INDEX.md

   Delta:
   - <what changed in target repo state>
   - <operator-facing impact>
   ```

6. Dirty target repo behavior:

   - inspect both working tree and staged state;
   - proceed if unrelated paths are dirty/staged and the required `koder/` state paths are clean;
   - commit only the intended state paths with a pathspec commit;
   - stop/coordinate if `koder/STATE.md` or the target issue path is already dirty/staged from unrelated work;
   - never sweep unrelated dirty/staged work into the state commit.

7. Analysis invariant:

   ```bash
   git log --grep='^state:' --oneline
   ```

   should provide a compact semantic repo-evolution stream.

## Acceptance Criteria

- [x] `koder-pattern` docs define `state:` commits as the minimal repo-state movement ledger.
- [x] Close/setup guidance defines `state: close - ...` for close and `state: init - koder pattern scaffold` for setup.
- [x] Issue-filing guidance covers external-origin filings, external-only immediate `STATE.md` updates, selected-path commits, and dirty repo guardrails.
- [x] Recommended `state:` commit body schemas exist for init, close, external issue, and artifact update events.
- [x] Skill eval prompts cover filing an external issue into a dirty repo with unrelated changes, updating `STATE.md`, and committing only intended paths.
- [x] The guidance explicitly avoids tracking every code commit and does not introduce a heavier `koder/movements` artifact for the MVP.
- [x] The guidance clarifies that `koder/STATE.md` is session-to-session handoff, not the commit-by-commit state ledger.

## Resolution

Implemented in the state commit that updates this issue and the koder-pattern skill source. Evidence paths:

- `.pi/skills/koder-pattern/references/shared/state-commit-protocol.md`
- `.pi/skills/koder-pattern/bin/koder-pattern`
- `.pi/skills/koder-pattern/references/setup.md`
- `.pi/skills/koder-pattern/references/artifacts/issues.md`
- `.pi/skills/koder-pattern/templates/koder/skills/close/SKILL.md`
- `.pi/skills/koder-pattern/references/meta/eval-prompts.md`

Post-resolution clarification:

- `state:` commits are the git-level semantic ledger.
- `koder/STATE.md` updates at init, close, explicit handoff requests, or external-origin filings into this repo.
- Local in-session artifact state commits do not update `koder/STATE.md` solely because they happened; close summarizes them only if they matter to the next session.

Validation performed:

- `bash -n .pi/skills/koder-pattern/bin/koder-pattern`
- temp-repo `koder-pattern init --all` created a root `state: init - koder pattern scaffold` commit.
- temp dirty-repo test preserved unrelated dirty/staged work while committing only scaffold paths.

## Non-Goals

- Solving cross-harness/runtime coordination beyond repo-local git/artifact protocol.
- Requiring every implementation commit to be a `state:` commit.
- Introducing a new movement artifact before validating the minimal commit-ledger protocol.
- Changing target repos' existing artifact schemas beyond compatible guidance.

# Eval Prompts: git-worktree

## Should trigger

1. "We keep overwriting each other's changes in this shared repo — set up isolation for parallel agents."
   - Expect: load `01_core.md`; create a worktree per task, keep primary checkout as integration point.
2. "Use one worktree per task for this queue of parallel jobs; show me the create/merge/cleanup flow."
   - Expect: load `01_core.md`; creating/removing, merging back, cleanup.
3. "I just created a fresh worktree but my .env and node_modules are gone — what do I do?"
   - Expect: load `01_core.md`; "Making the worktree complete" bootstrap checklist (copy env, install deps).

## Should NOT trigger

4. "Open the repo and show me the koder session hand-off report."
   - Expect: NOT git-worktree → `open` / koder-pattern.
5. "What's our queue orchestration policy for blind mode?"
   - Expect: NOT git-worktree → route to `koder-pattern` (policy layer). git-worktree is the mechanism, not policy.
6. "Commit this change and push to main."
   - Expect: NOT git-worktree → ordinary git workflow; koder-pattern for state commits. No worktree machinery implied.

## Edge case

7. "I need to merge a stale worktree branch that has diverged from main."
   - Expect: load `01_core.md`; working model says rebase stale worktree onto main before merging; merge one at a time.

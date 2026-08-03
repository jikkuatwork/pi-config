# Git-Worktree Index

Use this index as the first loaded reference for this skill. `01_core.md` is the
source content, preserved as-is; `90_provenance.md` documents this import.

## When to use

Use when running multiple agents/tasks in parallel on one repo, when the user
says "worktree", "parallel agents", "one worktree per task", or when agents keep
overwriting each other's changes. Also relevant whenever starting task work in a
shared primary checkout.

## Route

| Need | Load |
| --- | --- |
| The full guide (start here) | `01_core.md` |
| Provenance / adaptation notes | `90_provenance.md` |
| Trigger/quality tests | `99_eval_prompts.md` |

## Relation to other skills in this repo

- `koder-pattern` sets worktree/branch **policy** (ownership, serial-vs-worktree,
  constraints); `git-worktree` supplies the git **mechanism** (create, bootstrap,
  merge, cleanup). They are complementary layers.
- The "primary checkout is the integration point, not a scratchpad" model
  matches this repo's close/open hand-off discipline (`koder/STATE.md` lives in
  the primary checkout).

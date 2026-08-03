---
name: git-worktree
description: Use git worktrees to run multiple coding agents in parallel on one repo without collisions. Use when starting a task in a shared repo, when the user says "worktree", "parallel agents", "one worktree per task", or when agents keep overwriting each other's changes. Covers creating worktrees, making them as complete as the main checkout (.env files, dependencies, databases, ports), merging back, and cleanup.
license: MIT
metadata:
  structure: tiny_front_door_v1
  references:
    index: references/INDEX.md
  tags: [git, worktree, parallel-agents]
  updated_at: "2026-08-03"
  status: reviewed
  source: https://github.com/davidondrej/skills/tree/main/skills/agent-orchestration/git-worktree
---

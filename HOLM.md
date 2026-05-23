---
title: Holm Context Pointer
updated: 2026-05-23
holm_version: 0.119.3
holm_source_commit: de9e73f4
canonical: .pi/skills/holm-app/references/holm-inventory.md
---

# Holm Context

The detailed Holm feature inventory has moved into the local `holm-app` skill so the skill is self-contained:

```text
.pi/skills/holm-app/references/holm-inventory.md
```

Read that file for the current app-builder inventory, Zippy coverage, BFBB guidance, runtime/storage/auth/realtime/task/agent surfaces, and refresh policy.

## Quick facts

- Reviewed Holm source: `/home/glasscube/Projects/holmhq/holm/master`
- Reviewed Holm version: `0.119.3`
- Reviewed source commit: `de9e73f4`
- Source status at refresh: clean
- Zippy path: `/home/glasscube/Projects/holmhq/holm/master/knowledge-base/skills/app/recipes/zippy/`

## App-builder defaults

- Use the local `.pi/skills/holm-app/` skill for Holm app work.
- Trust live Holm source over cached notes when details drift.
- Start full apps from Zippy, then rename and prune.
- Keep primary deploy BFBB/raw: no `npm install`, build step, or public runtime CDN requirement.
- Treat npm/Vite as optional dev/build/test tooling only.
- Make serious apps CLI-walkable with route contracts and `holm test run`/script checks.
- Use member-scoped storage for private member data.
- Use exact host routes and current deploy flags: `--host`, `--spa`, `--no-build`, `--include-private` only when intentional.

## Refresh policy

When Holm or Zippy changes, refresh:

1. `.pi/skills/holm-app/references/holm-inventory.md`
2. `.pi/skills/holm-app/references/zippy-boilerplate.md`
3. `.pi/skills/holm-app/SKILL.md` if workflow/load order changes
4. this pointer's frontmatter

# 04 Validate

Validate the imported skill before reporting done.

## File checks

```bash
SKILL_ROOT="$HOME/Projects/pi/.pi/skills/<skill-name>"
find "$SKILL_ROOT" -maxdepth 5 -type f | sort
find "$SKILL_ROOT" -name 'SKILL.md' -print
find "$SKILL_ROOT" -type f -perm /111 -print
rg -n "(^#!|package.json|install\.sh|setup|npm install|pnpm install|yarn install|bun install|pip install|curl|wget|chmod|sudo|rm -rf|eval|exec|spawn|child_process|\.mcp|hooks/)" "$SKILL_ROOT" || true
rg -n "(api[_-]?key|secret|token|password|BEGIN [A-Z ]*PRIVATE KEY|sk-[A-Za-z0-9])" "$SKILL_ROOT" || true
wc -l "$SKILL_ROOT/SKILL.md"
```

Expected:

- Exactly one discoverable `SKILL.md` unless user requested otherwise.
- No executable files unless explicitly approved.
- No secrets/private state.
- `SKILL.md` is frontmatter-only by default; body text exists only for exceptional safety/compatibility reasons.
- `metadata.structure` is `tiny_front_door_v1` when using this convention.
- `metadata.references.index` points to an existing `references/INDEX.md` and can be followed without a body pointer.
- Reference paths use underscores.
- Simple references stay flat as `NN_label.md`; folders are used only for multi-file topics/assets.
- Any requesting-repo `.pi/skills/<name>` adapter is a relative symlink resolving to this canonical tree, not a copied directory.
- No global skill link or Pi config sync was created solely for the test unless explicitly requested.

## Eval checklist

Create at least:

- 2 should-trigger prompts.
- 2 should-not-trigger prompts.
- 1 edge case prompt.

Check:

- Frontmatter triggers match intended use.
- Near-miss tasks do not trigger the skill.
- `references/INDEX.md` clearly routes to detailed instructions.
- Output contract is testable.
- Safety boundaries are visible before risky steps.

## Repo handoff

- Update `~/Projects/pi/koder/STATE.md` with durable canonical context if the import matters beyond this turn.
- Update the requesting repo's handoff only when the test adapter or evaluation matters there.
- Keep each `koder/STATE.md` under 100 lines and follow each repo's commit policy.
- Report canonical path, adapter path, promotion status, and whether Pi reload/restart is needed.

# 04 Validate

Validate the imported skill before reporting done.

## File checks

```bash
find .pi/skills/<skill-name> -maxdepth 5 -type f | sort
find .pi/skills/<skill-name> -name 'SKILL.md' -print
find .pi/skills/<skill-name> -type f -perm /111 -print
rg -n "(^#!|package.json|install\.sh|setup|npm install|pnpm install|yarn install|bun install|pip install|curl|wget|chmod|sudo|rm -rf|eval|exec|spawn|child_process|\.mcp|hooks/)" .pi/skills/<skill-name> || true
rg -n "(api[_-]?key|secret|token|password|BEGIN [A-Z ]*PRIVATE KEY|sk-[A-Za-z0-9])" .pi/skills/<skill-name> || true
wc -l .pi/skills/<skill-name>/SKILL.md
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

- Update `koder/STATE.md` with durable context if the import matters beyond this turn.
- Keep `koder/STATE.md` under 100 lines.
- Do not commit unless requested or closing via the close skill.

# 03 Adapt

Build a tiny discoverable entrypoint and put everything else behind references.

## Default layout

```text
.pi/skills/<skill_name>/
  SKILL.md
  references/
    INDEX.md
    01_core.md
    02_review.md
    90_provenance.md
    99_eval_prompts.md
  LICENSE                  # if upstream license requires/benefits from copying
```

Use underscores in local skill paths. Keep references flat by default. Use a
folder only when a topic has multiple files or assets:

```text
references/
  01_architecture/
    01_concept.md
    02_gotchas.md
  02_api_contracts/
    01_list.md
    02_quotas.md
    03_auth.md
```

For large domains:

```text
references/modules/<module>/GUIDE.md
```

Never keep nested `SKILL.md` files; pi discovers them recursively.

## Frontmatter-only SKILL.md template

```md
---
name: <skill-name>
description: <what it does + specific triggers in 1-4 lines>
license: <license if known>
metadata:
  structure: tiny_front_door_v1
  references:
    index: references/INDEX.md
  tags: [<tag>]
  updated_at: "YYYY-MM-DD"
  status: reviewed
---
```

Use frontmatter-only by default. Add body text only when an immediate human/model warning is safety-critical or compatibility requires it. Keep examples, detailed workflows, provenance, and evals out of `SKILL.md`.

## Frontmatter behavior

Pi mechanically consumes `name` and `description`, validates known fields, and
ignores unknown fields. `metadata` is the safe place for repo-specific structure.
When `SKILL.md` is loaded, frontmatter is visible as plain text, so the model can
use `metadata.references.index`. A local probe confirmed this works without a
body instruction. Prefer frontmatter-only `SKILL.md`; metadata remains the canonical route.

## Convert source material

- Preserve intent, not wording. Remove hype, repetition, and vendor-specific install text.
- Keep trigger wording explicit in frontmatter.
- Put route map in `references/INDEX.md`.
- Put mode/task details in numbered reference files or topic folders.
- Put source URL, commit/date, license, omitted files, and scan summary in `90_provenance.md`.
- Put should-trigger and should-not-trigger prompts in `99_eval_prompts.md`.

## Output contract for imports

When done, report:

- Files created/changed.
- Source/provenance and safety findings.
- What was intentionally omitted.
- Eval prompts/checks run.
- Whether pi reload/restart is needed.

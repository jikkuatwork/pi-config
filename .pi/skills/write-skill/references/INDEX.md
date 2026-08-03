# Write-Skill Index

Use this index as the first loaded reference for this skill. Load `01_core.md`
for the full authoring guide; consult `99_eval_prompts.md` for trigger/quality
tests and `90_provenance.md` for source and safety notes.

## When to use

Use when authoring, editing, reviewing, or debugging any agent skill (`SKILL.md`).
Consult it before building the entrypoint, writing the description, deciding
what belongs in references, or testing triggering/execution.

## Route

| Need | Load |
| --- | --- |
| Everything (complete guide) | `01_core.md` |
| Why a skill isn't triggering / description fix | `01_core.md` (Description as routing contract; Testing and debugging) |
| Skill-or-not / shape decisions | `01_core.md` (Design philosophies; Anti-patterns) |
| Security checklist for third-party skills | `01_core.md` (Security checklist) |
| Provenance of this import | `90_provenance.md` |
| Should/shouldn't-trigger prompts for this skill | `99_eval_prompts.md` |

## Key principles (from the guide)

1. **The description routes; the body executes.** Most routing failures are a description problem, not a body problem.
2. **Progressive disclosure.** Only `name` + `description` are always in context; push detail to references and load on demand.
3. **Tokens are scarce; files are cheap.** Keep `SKILL.md` lean; move determinism into scripts, judgment into prompts.
4. **One skill, one concern.** Composition beats bundling.
5. **Validate before completing.** State-check, then verify → fix → re-verify loops dominate output quality.
6. **Skills are code.** Version, test, audit, review.

## Related in this repo

- `create-skill` — hands-on skill construction with strict structure, trigger wording, and evaluation; pair with this reference when improving a skill should/shouldn't trigger.
- `skill-import` — vendoring/adapting third-party skills into `.pi/skills/`.

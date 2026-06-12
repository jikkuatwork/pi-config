# Skill Import Index

Use this index as the first loaded reference for every import/adaptation.

## Goal

Convert any useful source — existing agent skill, docs, workflow, blog, website,
README, prompt, policy, or instruction set — into a reviewed local pi skill with
minimal always-loaded context.

## Route

1. Read `01_intake.md` to identify source, scope, triggers, and target skill shape.
2. Read `02_review.md` before copying anything; check provenance, license, executables, installers, hooks, and secrets.
3. Read `03_adapt.md` to build the tiny `SKILL.md` + reference tree.
4. Read `04_validate.md` before reporting done.
5. For maintaining this skill itself, see `90_provenance.md` and `99_eval_prompts.md`.

## Default output tree

```text
.pi/skills/<skill_name>/
  SKILL.md                         # frontmatter-only by default; one discoverable entrypoint
  references/
    INDEX.md                       # pointer map for humans/agents
    01_core.md                     # flat file by default
    02_review.md
    90_provenance.md
    99_eval_prompts.md
```

Use underscores in skill-local paths. Keep references flat by default.
Use folders only when a topic has multiple files or assets, e.g.:

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

For large domains, use `references/modules/<module>/GUIDE.md`; never leave nested `SKILL.md` files.

## Frontmatter convention

Custom machine-readable data goes under `metadata`:

```yaml
metadata:
  structure: tiny_front_door_v1
  references:
    index: references/INDEX.md
  tags: [example, workflow]
  updated_at: "YYYY-MM-DD"
  status: reviewed
```

Pi mechanically needs `name` and `description`. Custom metadata is visible to the model when `SKILL.md` is read and useful to scripts, but it does not make pi auto-load references. A local probe confirmed the model can follow `metadata.references.index` without a body instruction. Prefer frontmatter-only `SKILL.md`; add body text only for compatibility/safety-critical cases.

## Hard rules

- Do not use `npx skills`, `skills add`, `npm install -g skills`, or any Vercel Skills CLI path.
- Prefer project-local `.pi/skills/<name>/`.
- Do not run/install third-party code unless the user explicitly approves after review.
- Do not commit secrets, credentials, caches, generated output, dependency dirs, or private state.
- Keep `SKILL.md` frontmatter-only by default. If body text is added, keep it exceptional and tiny; if total file grows past ~40 lines, split.

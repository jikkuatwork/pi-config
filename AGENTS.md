# Agent Instructions

This repo is the staging area for pi configuration, extensions, and locally reviewed skills.

## Session hand-off

- Read `koder/STATE.md` at the start of a session.
- Keep `koder/STATE.md` under 100 lines and update it when closing.
- Do not edit global pi extension files directly; source-of-truth extensions live in `extensions/`.

## Skill import policy

Follow `knowledge-base/workflows/skill-import.md` for all third-party skill discovery, review, and vendoring.

Hard rules:

- Never install or invoke Vercel's Skills CLI (`npx skills`, `skills add`, `npm install -g skills`, etc.).
- Always manually copy/vendor reviewed skill files into this repo.
- Prefer project-local skills under `.pi/skills/`; do not install globally unless explicitly requested.
- Review for executables, installers, dependency setup, MCP/plugin hooks, package scripts, and binaries.
- If an imported skill includes anything runnable or installable, warn and ask permission before running/installing it.
- Avoid autocomplete/context spam: for large domains, create one top-level umbrella skill and move sub-skills into `references/modules/*/GUIDE.md` instead of nested `SKILL.md` files.

## Azure and cloma credentials

Credentials and private Azure account state must not live in skills or this repo.

For Azure work staged from this repo:

- Treat `/home/glasscube/Projects/cloma` as the eventual home and source of operating policy.
- Before any Azure or cost-impacting action, read `/home/glasscube/Projects/cloma/CLAUDE.md` and follow its sponsored-credit guardrails.
- Use existing environment, `az` CLI login, and cloma/user-local config rather than copying secrets.
- Never commit or print full credentials, tenant IDs, subscription IDs, resource names, account names, support tickets, personal data, or private spend figures.
- If cloma-private config is needed, keep it in `~/.cloma/` and redact outputs.
- Ask before creating, scaling, deploying, or running anything that could affect cloud cost.

Planned Azure skill shape: one top-level `.pi/skills/azure/SKILL.md`, with Microsoft Azure skill material vendored as docs-only modules under `.pi/skills/azure/references/modules/`.

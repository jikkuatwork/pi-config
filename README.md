# My pi config

This repo is my personal pi workspace.

It is not a framework.
It is not a starter kit.
It is the pi setup I actually use.

## What lives here

- My pi extensions.
- My local skills.
- Reviewed third-party skills.
- Small workflows and notes.
- Session hand-off state.
- Experiments while I learn pi better.

## Why this repo exists

- Learn pi by changing it.
- Keep the changes in git.
- Avoid mystery global state.
- Make my setup reproducible.
- Keep one source of truth.

## Extensions

Extension source lives in [`extensions/`](extensions/).

Rules:

- Edit extensions here.
- Version them here.
- Reload pi after changes.
- Do not edit global installed copies.

Global pi config points back to this repo.
This repo owns the extension files.

See [`extensions/README.md`](extensions/README.md) for the current list.

## Skills

Skills land here first.

Usually in:

- [`.pi/skills/`](.pi/skills/)

Flow:

- Find or write a skill.
- Vendor it into this repo.
- Review it.
- Check for runnable/installable parts.
- Improve it until it passes quality gates.
- Then promote it elsewhere if useful.

Promotion targets may be:

- another project repo
- a project-local `.pi/skills/`
- a global/user-level pi location

But this repo is the staging area first.

## Symlink model

Rule:

- Files live here.
- Other places link here.

That keeps pi config boring.
No drift.
No hidden copies.
No guessing which file is real.

```text
<repo>
├── extensions/      # extension source of truth
├── .pi/skills/      # reviewed local skills
├── knowledge-base/  # workflows and policy
└── koder/STATE.md   # session hand-off
```

## Skill import policy

Third-party skills are not blindly installed.

I vendor them manually.
Then I review them.

Checks include:

- executables
- installers
- dependency setup
- MCP/plugin hooks
- package scripts
- binaries
- noisy autocomplete behavior

See [`knowledge-base/workflows/skill-import.md`](knowledge-base/workflows/skill-import.md).

Hard rule:

- Do not use Vercel's Skills CLI here.

## Repo map

- [`AGENTS.md`](AGENTS.md) — agent rules for this repo.
- [`extensions/`](extensions/) — pi extensions I use.
- [`.pi/skills/`](.pi/skills/) — skills I use or am reviewing.
- [`knowledge-base/workflows/`](knowledge-base/workflows/) — local workflows.
- [`koder/STATE.md`](koder/STATE.md) — session state.

## Safety

This repo is intended to be public.

- No credentials.
- No private cloud state.
- No personal account IDs.
- No tenant or subscription IDs.
- No support tickets.
- No private machine paths.
- No cloud/cost-impacting work without the guardrails in [`AGENTS.md`](AGENTS.md).

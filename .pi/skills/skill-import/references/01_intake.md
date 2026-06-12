# 01 Intake

Capture only what is needed to adapt the source safely.

## Inputs to collect

- Source: URL/path/repo/document and access method.
- Desired skill name and domain, if known.
- What the skill should help with.
- Trigger phrases and near-miss non-triggers.
- Expected output style/contract.
- Runtime expectation: docs-only by default; scripts only if deterministic and approved.
- Scope limits: what not to import, run, or preserve.

## Source types

- Existing skill repo: inspect all `SKILL.md` files and referenced assets.
- Docs/workflow/blog/website: extract reusable operating procedure, not every paragraph.
- Prompt/instruction set: separate durable behavior from examples and commentary.
- Code repo: import instructions/docs only unless user explicitly asks for helper scripts.

## Discovery rules

- Use public web/GitHub APIs, browser/download, or `git clone` into `/tmp`.
- Do not use Skills CLI.
- Do not install dependencies to inspect a source.
- Record source URL, branch/commit/date, author/owner, and license if available.

## Shape decision

Use one standalone skill unless the source is a broad family. For broad families,
make one umbrella skill and convert sub-skills to references/modules.

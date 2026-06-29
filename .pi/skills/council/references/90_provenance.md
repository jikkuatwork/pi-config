# Provenance and Safety Review

## Source reviewed

- Source URL: `https://github.com/0xNyk/council-of-high-intelligence`
- Repository clone URL: `https://github.com/0xNyk/council-of-high-intelligence`
- Reviewed branch: `main`
- Reviewed commit: `68cd247873976627b33b0ab7d29f7fcdbfbf9796`
- Review date: `2026-06-29`
- Upstream owner/author: `0xNyk` / `nyk`

## License notes

- Root `LICENSE` file is MIT, copyright `2026 nyk`.
- Upstream `README.md` displays a CC0 badge and CC0 text, which conflicts with
  the root MIT license file.
- This local adaptation treats the root `LICENSE` as authoritative for copied or
  adapted material and includes a copy at `../LICENSE`.

## Upstream structure reviewed

Relevant files and directories:

```text
SKILL.md
SKILL.codex.md
SKILL.gemini.md
agents/council-*.md
configs/*.yaml
demos/*.md
scripts/*.sh
install.sh
README.md
CLAUDE.md
CONTRIBUTING.md
CHANGELOG.md
LICENSE
.github/workflows/*.yml
assets/header.jpeg
```

## Safety findings

Executable/setup/runtime pieces found upstream:

- `install.sh` installs agent files and skills into `~/.claude`, `~/.codex`, and
  `~/.gemini`, and can copy scripts/configs.
- `scripts/detect-providers.sh` detects local/external LLM providers and may call
  provider CLIs or network endpoints for availability checks.
- `scripts/council-simulation-checklist.sh` validates upstream installation and
  runs `install.sh --dry-run` variants.
- `.github/workflows/*.yml` contain CI/release automation.
- Upstream docs mention install commands for optional provider tools such as
  Codex, Gemini, Ollama, Cursor CLI, and OpenAI-compatible API calls.

Secret scan findings:

- No private keys, tokens, or concrete secrets were found in the reviewed source.
- Matches were documentation/config variable names such as `NVIDIA_API_KEY`,
  `CURSOR_API_KEY`, and `api_key_env`; no actual values were vendored.

Network/destructive/cost notes:

- Upstream protocol can dispatch external model calls via CLIs and `curl` to
  OpenAI-compatible `/chat/completions` endpoints, which may consume credentials,
  network, quota, or money.
- This local import does not enable those runtime paths.

## Omitted intentionally

Per repo policy and docs-only import rules, this adaptation omits:

- `install.sh` and all install instructions as runnable workflow.
- `scripts/*.sh`, executable bits, provider detection, and validation scripts.
- `.github/` workflows, `.gstack/`, `.DS_Store`, and git metadata.
- Provider model config files and any instruction to read credentials or call
  external model APIs.
- Image asset `assets/header.jpeg`, badges, donation links, release marketing,
  and exhaustive upstream transcript templates.
- Claude/Codex/Gemini-specific subagent/runtime assumptions that do not apply to
  pi by default.

## Local adaptation choices

- Created one frontmatter-only pi skill: `.pi/skills/council/SKILL.md`.
- Kept the skill project-local under `.pi/skills/`.
- Converted upstream multi-agent/provider execution into a transparent
  single-agent simulated council protocol.
- Preserved the 18-member roster, triads, profiles, duo pairs, stance-line vote
  mechanics, and verdict shape in concise references.
- Added explicit safety boundaries so agents do not run provider CLIs, scripts,
  installers, or network API calls without user approval.
- Preserved provenance and license details in this file.

## Review commands

Representative non-mutating commands used:

```bash
git clone --depth 1 https://github.com/0xNyk/council-of-high-intelligence /tmp/council-import.../repo
cd /tmp/council-import.../repo
git rev-parse HEAD
find . -maxdepth 4 -type f | sort
find . -type f -perm /111 -print
rg -n "(^#!|package.json|install\.sh|setup|npm install|pnpm install|yarn install|bun install|pip install|curl|wget|chmod|sudo|rm -rf|eval|exec|spawn|child_process|\.mcp|hooks/)" . --glob '!.git/**' || true
rg -n "(api[_-]?key|secret|token|password|BEGIN [A-Z ]*PRIVATE KEY|sk-[A-Za-z0-9])" . --glob '!.git/**' || true
wc -l SKILL.md SKILL.codex.md SKILL.gemini.md README.md agents/*.md configs/*.yaml demos/*.md scripts/*.sh install.sh CLAUDE.md CONTRIBUTING.md CHANGELOG.md
```

No third-party code was installed or run.

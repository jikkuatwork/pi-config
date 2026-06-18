# Provenance and Safety Review

## Sources reviewed

- Directory page: `https://mcp.directory/skills/ui-ux-pro-max`
- MCP download endpoint observed from page: `https://mcp.directory/api/skills/download/191`
- GitHub source linked by directory: `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/tree/main/.claude/skills/ui-ux-pro-max`
- GitHub repository cloned for review: `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git`
- Reviewed commit: `b7e3af80f6e331f6fb456667b82b12cade7c9d35`
- Reviewed date: `2026-06-18`
- Directory author/owner shown: `nextlevelbuilder`

## License notes

- Root repository `LICENSE` is MIT, copyright Next Level Builder.
- `cli/package.json` also declares MIT.
- `cli/README.md` says `CC-BY-NC-4.0`; this conflicts with the root/package license.
- This local adaptation imports only distilled docs/instructions, not the CLI, generated assets, Python scripts, or data tables. The root MIT license is copied at `../LICENSE` for attribution.

## Review findings

MCP zip download contained only:

```text
SKILL.md
```

The packaged `SKILL.md` had no executable files, but it instructed agents to check/install Python and run `scripts/search.py`, while the zip did not include those scripts.

The GitHub repository additionally contains:

- `src/ui-ux-pro-max/scripts/*.py` and data CSV/templates;
- `cli/package.json`, `cli/README.md`, bundled assets, npm/bun build scripts;
- setup/install instructions for plugin marketplace, npm CLI, and assistant-specific installs;
- broad stack material for React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind, and more.

Safety scans found no obvious private keys or API tokens. Keyword scans found ordinary documentation/examples containing words like token/password/secret, including environment-variable guidance and UI password-field examples.

## Omitted intentionally

Per user request and repo policy, this adaptation omits:

- Python prerequisite/setup text;
- `search.py` commands and generated search workflow;
- Skills CLI, MCP/plugin marketplace, npm/bun/uipro CLI install instructions;
- executable scripts, package manifests, CSV databases, generated assets, and screenshots;
- broad non-Holm stack guidance unless generally useful;
- marketing copy, badges, donation links, release notes, and exhaustive catalogs.

## Local adaptation choices

- Created a frontmatter-only pi `SKILL.md` with a tiny reference router.
- Optimized content for BFBB/Holm/Zippy raw browser apps.
- Made no runtime/install requirements.
- Kept reusable UI/UX principles: product classification, design-system brief, semantic tokens, accessibility, responsive layout, states, charts, and polish checklist.
- Routed Holm runtime/deploy specifics to the existing local `holm-app` skill instead of duplicating that skill.

## Commands used for review

Representative non-mutating review commands:

```bash
python3 - <<'PY'  # fetch MCP page/download for inspection only
# urllib.request URL fetches to /tmp
PY
unzip -q /tmp/ui-ux-pro-max-skill.zip -d /tmp/ui-ux-pro-max-download
git clone --depth 1 https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git /tmp/ui-ux-pro-max-skill
find /tmp/ui-ux-pro-max-download -type f | sort
find /tmp/ui-ux-pro-max-skill -type f -perm /111 -print
rg -n "(^#!|package.json|install\.sh|setup|npm install|pnpm install|yarn install|bun install|pip install|curl|wget|chmod|sudo|rm -rf|eval|exec|spawn|child_process|\.mcp|hooks/)" /tmp/ui-ux-pro-max-skill || true
rg -n "(api[_-]?key|secret|token|password|BEGIN [A-Z ]*PRIVATE KEY|sk-[A-Za-z0-9])" /tmp/ui-ux-pro-max-skill || true
```

No third-party code was installed or run.

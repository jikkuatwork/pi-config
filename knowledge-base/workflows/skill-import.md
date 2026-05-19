# Skill Import Workflow

Standard process for discovering, reviewing, and locally vendoring third-party agent skills into this repo.

## Non-negotiable rules

- **Never install or invoke Vercel's Skills CLI**: no `npx skills`, `skills add`, `npm install -g skills`, or equivalent wrappers.
- **Always manually copy/vendor** reviewed skill files into this repo.
- Prefer **project-local** skills under `.pi/skills/`; do not install global skills unless explicitly requested.
- Review every imported skill before use. Skills can instruct an agent to run commands or alter files.
- Check for executable scripts, installers, dependency setup, MCP/plugin hooks, and package scripts. If present, **warn and ask permission before running or installing anything**.
- Never commit secrets, credentials, private state, caches, build output, dependency directories, or generated artifacts.

## Preferred shape for large skill families

Use one top-level skill with nested reference modules. This avoids autocomplete spam and keeps prompt context small.

```text
.pi/skills/<domain>/
  SKILL.md                         # only discoverable skill entrypoint
  references/
    module-index.md                # routing table
    modules/
      <module>/
        GUIDE.md                   # converted from upstream SKILL.md or authored guide
        references/...
        workflows/...
```

Do **not** leave nested `SKILL.md` files under the umbrella skill. Pi discovers `SKILL.md` recursively, so nested upstream skills must be renamed to `GUIDE.md` or otherwise converted into references.

The local `golang-pro` skill is the reference pattern: one public `SKILL.md`, then detailed on-demand docs under `references/` and `references/modules/*/GUIDE.md`.

## Discovery without the Skills CLI

Use public pages or GitHub APIs directly.

```bash
# Public skills.sh search page, no CLI
python3 - "$QUERY" <<'PY'
import html, re, sys, urllib.parse, urllib.request
query = sys.argv[1]
url = "https://www.skills.sh/?q=" + urllib.parse.quote(query)
text = urllib.request.urlopen(url, timeout=30).read().decode("utf-8", "replace")
pattern = re.compile(
    r'href="(/([^/"#?]+)/([^/"#?]+)/([^/"#?]+))".*?'
    r'<h3[^>]*>(.*?)</h3>.*?'
    r'<p[^>]*>(.*?)</p>.*?'
    r'<span[^>]*class="font-mono[^">]*text-sm[^">]*text-foreground[^">]*">(.*?)</span>',
    re.S,
)
seen = set()
for rank, match in enumerate(pattern.finditer(text), 1):
    path, owner, repo, skill, title, source, installs = match.groups()
    key = (owner, repo, skill)
    if key in seen:
        continue
    seen.add(key)
    print(f"{rank}. {html.unescape(title)} — {html.unescape(source)} — {html.unescape(installs)} installs")
    print(f"   https://www.skills.sh{path}")
PY
```

## Review checklist

Before copying into `.pi/skills/`:

1. **Source and provenance**: record skills.sh URL, GitHub repo, branch/commit if possible, license, and upstream owner.
2. **Scope**: decide whether it should be a standalone skill or a module under an umbrella skill.
3. **Structure**: inspect file tree and identify all `SKILL.md` files.
4. **Executables/setup**: find shebang files, executable bits, `install.sh`, package scripts, dependency installers, MCP/plugin configs, hooks, and binaries.
5. **Security**: scan for secrets and suspicious commands.
6. **Context impact**: keep only one top-level skill per broad domain; move detail into references loaded on demand.
7. **Credential policy**: credentials belong in `AGENTS.md` / external user config, not inside skills.

Useful commands:

```bash
find <candidate> -maxdepth 4 -type f | sort
find <candidate> -type f -perm /111 -print
rg -n "(^#!|package.json|install\.sh|setup|npm install|pnpm install|yarn install|bun install|pip install|curl|wget|chmod|sudo|rm -rf|eval|exec|spawn|child_process|\.mcp|hooks/)" <candidate> || true
rg -n "(api[_-]?key|secret|token|password|BEGIN [A-Z ]*PRIVATE KEY|sk-[A-Za-z0-9])" <candidate> || true
```

## Manual vendoring steps

1. Download/clone upstream into `/tmp` or another throwaway location.
2. Review using the checklist above.
3. Copy only approved docs/assets into `.pi/skills/<name>/`.
4. For umbrella skills, convert each upstream child `SKILL.md` into `references/modules/<child>/GUIDE.md`.
5. Remove or quarantine installer/plugin/runtime files unless explicitly approved.
6. Add provenance notes in the umbrella `SKILL.md` or `references/module-index.md`.
7. Update `AGENTS.md` if the import creates reusable repo policy.
8. Update `koder/STATE.md` with durable hand-off context.

## Azure umbrella plan

Use exactly one top-level skill:

```text
.pi/skills/azure/SKILL.md
```

Vendor Microsoft Azure skill content as docs-only modules under:

```text
.pi/skills/azure/references/modules/<azure-area>/GUIDE.md
```

Candidate source: `microsoft/azure-skills` (`skills/*`). Convert nested skills into guides; do not copy `.mcp.json`, plugin metadata, hooks, installers, or runnable setup unless separately reviewed and approved.

Credentials and guardrails for Azure/cloma work are intentionally outside the skill. Follow `AGENTS.md` in this repo, and for cloma-specific rules read `/home/glasscube/Projects/cloma/CLAUDE.md` before any Azure or cost-impacting action.

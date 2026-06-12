# Find Skills Index

Use this index as the first loaded reference for this skill.

# Find Skills

Discover, vet, and add agent skills to this pi project **without installing or invoking the Skills CLI**.

Before importing skills, use the local `skill-import` workflow: read `.pi/skills/skill-import/references/INDEX.md`.

## Hard Rules

- **Never** install or invoke Vercel's Skills CLI: no `npx skills ...`, `npm install -g skills`, `skills add`, or equivalent Skills CLI command.
- **Always** manually copy/vendor skill files into this repo; prefer project-local installation under `.pi/skills/<skill-name>/` with a frontmatter-only `SKILL.md` routing to `metadata.references.index` / `references/INDEX.md`.
- Do **not** install third-party skills globally by default.
- Review skill content before adding it. Skills may instruct the agent to run code.
- Check whether the skill includes executable scripts, dependency installers, or setup commands. If it does, warn the user and ask for explicit permission before running or installing anything.
- Do not commit secrets, credentials, caches, generated outputs, or dependency directories.

## When to Use

Use this skill when the user:

- Asks "find a skill for X" or "is there a skill for X"
- Gives a `skills.sh` skill URL
- Wants to add an agent skill to pi locally
- Asks how to extend agent capabilities with an existing skill

## Search Without the Skills CLI

### Option A: Public skills.sh search page

The public directory can be searched without the CLI:

```bash
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

### Option B: Skills API if the user already has a key

Only use this when `SKILLS_API_KEY` is already present; do not make the user install the CLI.

```bash
curl -sS \
  -H "Authorization: Bearer $SKILLS_API_KEY" \
  "https://skills.sh/api/v1/skills/search?q=$(python3 -c 'import sys,urllib.parse; print(urllib.parse.quote(" ".join(sys.argv[1:])))' "$QUERY")&limit=10"
```

### Option C: Direct GitHub search

For likely GitHub-hosted skills, use GitHub APIs/pages directly. Common layouts are:

- `skills/<skill-name>/SKILL.md`
- `<skill-name>/SKILL.md`
- root `SKILL.md`

## Vet Before Recommending or Adding

For each candidate, verify:

1. **Source** — Prefer trusted owners or repos the user already approves.
2. **Install/popularity signal** — Use skills.sh page counts when visible.
3. **Repository health** — Check stars, recent activity, and license where useful.
4. **Skill content** — Read `SKILL.md`; inspect referenced scripts/assets before installation.
5. **Executables/setup** — Identify scripts, binaries, shebang files, `package.json` scripts, install scripts, and dependency setup. Warn and ask before running/installing any of them.
6. **Security** — Search for embedded secrets, unexpected network calls, global installs, or broad destructive commands.

Useful checks:

```bash
# GitHub repo metadata
python3 - owner/repo <<'PY'
import json, sys, urllib.request
owner, repo = sys.argv[1].split('/', 1)
url = f"https://api.github.com/repos/{owner}/{repo}"
print(json.dumps(json.load(urllib.request.urlopen(url, timeout=30)), indent=2)[:4000])
PY

# Secret-ish scan after download
rg -n "(api[_-]?key|secret|token|password|BEGIN [A-Z ]*PRIVATE KEY|sk-[A-Za-z0-9])" .pi/skills/<skill-name> || true
```

## Add a skills.sh Skill Locally to Pi

Given a URL like:

```text
https://www.skills.sh/<owner>/<repo>/<skill>
```

install it locally by downloading the skill directory from GitHub, not by using the CLI:

```bash
python3 - 'https://www.skills.sh/<owner>/<repo>/<skill>' <<'PY'
import json, pathlib, re, sys, urllib.error, urllib.request

url = sys.argv[1]
match = re.match(r"https?://(?:www\.)?skills\.sh/([^/]+)/([^/]+)/([^/?#]+)", url)
if not match:
    raise SystemExit("Expected https://www.skills.sh/<owner>/<repo>/<skill>")
owner, repo, skill = match.groups()

dest = pathlib.Path(".pi/skills") / skill
if dest.exists():
    raise SystemExit(f"Destination already exists: {dest}")

def get_json(api_url):
    req = urllib.request.Request(api_url, headers={"User-Agent": "pi-find-skills"})
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.load(response)

def download_file(download_url, out_path):
    req = urllib.request.Request(download_url, headers={"User-Agent": "pi-find-skills"})
    with urllib.request.urlopen(req, timeout=30) as response:
        data = response.read()
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_bytes(data)

branches = ["main", "master"]
paths = [f"skills/{skill}", skill, "."]
root = None
for branch in branches:
    for path in paths:
        api = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}?ref={branch}"
        try:
            data = get_json(api)
        except urllib.error.HTTPError:
            continue
        names = [item.get("name") for item in data] if isinstance(data, list) else [data.get("name")]
        if "SKILL.md" in names:
            root = (branch, path, data)
            break
    if root:
        break
if not root:
    raise SystemExit("Could not locate a SKILL.md in common GitHub layouts")

branch, root_path, listing = root

def walk(api_listing, relative_base=pathlib.Path()):
    for item in api_listing:
        item_path = relative_base / item["name"]
        if item["type"] == "file":
            download_file(item["download_url"], dest / item_path)
        elif item["type"] == "dir":
            walk(get_json(item["url"]), item_path)

walk(listing if isinstance(listing, list) else [listing])
print(f"Downloaded {owner}/{repo}/{skill} ({branch}:{root_path}) to {dest}")
PY
```

After download, use the pi `read` tool to inspect `.pi/skills/<skill-name>/SKILL.md`, then run:

```bash
find .pi/skills/<skill-name> -maxdepth 3 -type f | sort
find .pi/skills/<skill-name> -type f -perm /111 -print
rg -n "(^#!|package.json|install\.sh|setup|npm install|pnpm install|yarn install|bun install|pip install|curl|wget|chmod|sudo|rm -rf|eval|exec|spawn|child_process)" .pi/skills/<skill-name> || true
rg -n "(api[_-]?key|secret|token|password|BEGIN [A-Z ]*PRIVATE KEY|sk-[A-Za-z0-9])" .pi/skills/<skill-name> || true
```

If the skill is safe and useful, update `koder/STATE.md` to mention it. It will be available after pi reload/restart.

## Present Recommendations

When recommending skills, include:

- Name and source (`owner/repo/skill`)
- What it does and why it matches the user request
- Popularity/source-health signals when available
- Link to skills.sh
- Local pi install plan, explicitly avoiding the Skills CLI

Example:

```text
I found `owner/repo/skill`, which matches your request because ...
Signals: 12.3K installs on skills.sh, repo has 1.2K stars, MIT license.
I can vendor it into `.pi/skills/skill` by downloading the GitHub skill directory directly; I will not use `npx skills`.
```

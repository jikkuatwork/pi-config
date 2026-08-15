#!/usr/bin/env bash
#
# install.sh — install Pi and sync this repo's versioned configuration.
#
# Versioned source:
#   .pi/settings.base.json  stable global settings
#   .pi/models.json         custom providers/models with $ENV_VAR credentials
#   .pi/AGENTS.md           global Pi instructions
#   extensions/             global extensions
#   .pi/skills/             global skills
#
# Writable runtime files under ~/.pi/agent/ are generated, not symlinked.
# Pi may update settings.json without dirtying this repository.
#
# Usage:
#   ./install.sh              install Pi if needed, then sync config
#   ./install.sh --sync       sync config only
#   ./install.sh --no-install skip Pi installation, then sync config
#   ./install.sh --help

set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
AGENT_DIR="${PI_AGENT_DIR:-${PI_CODING_AGENT_DIR:-$HOME/.pi/agent}}"
EXT_DIR="$AGENT_DIR/extensions"
SKILLS_DIR="$AGENT_DIR/skills"
DO_INSTALL=1

usage() {
  sed -n '2,20p' "$0" | sed 's/^# \{0,1\}//'
  exit 0
}

for arg in "$@"; do
  case "$arg" in
    --help|-h) usage ;;
    --sync|--no-install) DO_INSTALL=0 ;;
    *) echo "unknown argument: $arg" >&2; usage ;;
  esac
done

say()  { printf '\033[1;34m[install]\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m[warning]\033[0m %s\n' "$*"; }
die()  { printf '\033[1;31m[error]\033[0m %s\n' "$*" >&2; exit 1; }

command -v node >/dev/null 2>&1 || die "node is required (https://nodejs.org)."
command -v npm  >/dev/null 2>&1 || die "npm is required (ships with node)."
say "node $(node --version) / npm $(npm --version)"

if [ "$DO_INSTALL" -eq 1 ]; then
  if command -v pi >/dev/null 2>&1; then
    say "pi already installed: $(pi --version 2>/dev/null || echo '?')"
  else
    say "installing pi globally (npm)..."
    npm install -g --ignore-scripts @earendil-works/pi-coding-agent
    say "installed pi: $(pi --version)"
  fi
else
  say "skipping Pi installation"
fi

mkdir -p "$AGENT_DIR" "$EXT_DIR" "$SKILLS_DIR"

link() {
  local target="$1" linkpath="$2"
  if [ -L "$linkpath" ]; then
    rm -f "$linkpath"
  elif [ -e "$linkpath" ]; then
    mv "$linkpath" "$linkpath.bak-pre-symlink"
    warn "backed up $linkpath"
  fi
  ln -s "$target" "$linkpath"
  say "linked $linkpath"
}

backup_once() {
  local path="$1" suffix="$2" backup="$1.$2"
  if [ ! -e "$backup" ] && { [ -e "$path" ] || [ -L "$path" ]; }; then
    cp -L "$path" "$backup"
    warn "backed up $path -> $backup"
  fi
}

sync_settings() {
  local source="$REPO_DIR/.pi/settings.base.json"
  local target="$AGENT_DIR/settings.json"
  local tmp
  tmp="$(mktemp "$AGENT_DIR/.settings.json.XXXXXX")"

  if ! node "$REPO_DIR/scripts/build-settings.js" "$source" "$target" > "$tmp"; then
    rm -f "$tmp"
    die "failed to build settings.json"
  fi

  if [ -f "$target" ] && [ ! -L "$target" ] && cmp -s "$target" "$tmp"; then
    rm -f "$tmp"
    say "settings.json already current"
    return
  fi

  backup_once "$target" "bak-pre-versioned"
  rm -f "$target"
  mv "$tmp" "$target"
  chmod 600 "$target"
  say "generated $target from .pi/settings.base.json"
}

sync_models() {
  local source="$REPO_DIR/.pi/models.json"
  local target="$AGENT_DIR/models.json"
  local tmp

  node -e 'JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"))' "$source"
  tmp="$(mktemp "$AGENT_DIR/.models.json.XXXXXX")"
  cp "$source" "$tmp"

  if [ -f "$target" ] && [ ! -L "$target" ] && cmp -s "$target" "$tmp"; then
    rm -f "$tmp"
    say "models.json already current"
    return
  fi

  backup_once "$target" "bak-pre-versioned"
  rm -f "$target"
  mv "$tmp" "$target"
  chmod 644 "$target"
  say "generated $target from .pi/models.json"
}

sync_settings
sync_models
link "$REPO_DIR/.pi/AGENTS.md" "$AGENT_DIR/AGENTS.md"

for ext in "$REPO_DIR"/extensions/*.ts; do
  [ -e "$ext" ] || continue
  link "$ext" "$EXT_DIR/$(basename "$ext")"
done

# Session hand-off skills are repo-specific. Keeping them global causes noisy
# collisions in projects that provide their own open/close workflow.
for local_skill in open close; do
  managed_target="$REPO_DIR/.pi/skills/$local_skill"
  managed_link="$SKILLS_DIR/$local_skill"
  if [ -L "$managed_link" ] && [ "$(readlink "$managed_link")" = "$managed_target" ]; then
    rm -f "$managed_link"
    say "removed global repo-specific skill $local_skill"
  fi
done

for skill in "$REPO_DIR"/.pi/skills/*; do
  [ -d "$skill" ] || continue
  skill_name="$(basename "$skill")"
  case "$skill_name" in
    open|close) continue ;;
  esac
  link "$skill" "$SKILLS_DIR/$skill_name"
done

required_vars="$(node - "$REPO_DIR/.pi/models.json" <<'NODE'
const fs = require('fs')
const doc = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
const names = new Set()
const visit = (value) => {
  if (typeof value === 'string') {
    for (const match of value.matchAll(/\$(?:\{)?([A-Z][A-Z0-9_]*)(?:\})?/g)) names.add(match[1])
  } else if (Array.isArray(value)) {
    value.forEach(visit)
  } else if (value && typeof value === 'object') {
    Object.values(value).forEach(visit)
  }
}
visit(doc)
console.log([...names].sort().join('\n'))
NODE
)"

missing=0
for var in $required_vars; do
  if [ -n "$(printenv "$var" 2>/dev/null || true)" ]; then
    say "$var is set"
  else
    warn "$var is not set; matching custom providers will be unavailable."
    missing=1
  fi
done

cat <<EOF

$(printf '\033[1;32m')Done.$(printf '\033[0m')

  pi:        $(command -v pi || echo 'NOT FOUND')
  config:    $REPO_DIR
  agent dir: $AGENT_DIR

Run plain Pi, then choose any configured model with /model or Ctrl+L:

  pi
EOF

[ "$missing" -eq 1 ] && printf '\n  \033[1;33mSet missing credentials in your shell environment, then restart Pi.\033[0m\n'

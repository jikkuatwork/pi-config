#!/usr/bin/env bash
#
# install.sh — set up pi on a fresh machine from this config repo.
#
# What it does:
#   1. Checks prerequisites (node, npm).
#   2. Installs pi globally: npm install -g --ignore-scripts @earendil-works/pi-coding-agent
#   3. Creates ~/.pi/agent/ and symlinks the repo's config into it:
#        .pi/settings.json  -> ~/.pi/agent/settings.json
#        .pi/AGENTS.md      -> ~/.pi/agent/AGENTS.md
#        extensions/*.ts    -> ~/.pi/agent/extensions/
#        .pi/skills/*       -> ~/.pi/agent/skills/
#   4. Generates ~/.pi/agent/models.json from .pi/providers.json (custom
#      providers wired to your env vars: FOUNDRY_API_KEY, OPENAI_API_KEY,
#      OPENAI_BASEURL).
#   5. Checks that the env vars pi needs are present and prints next steps.
#
# Safe to re-run: existing files are backed up, symlinks are replaced, and
# models.json is only overwritten with --force (or when missing).
#
# Usage:
#   ./install.sh                 # full install from this checkout
#   ./install.sh --no-install    # skip the global npm install of pi
#   ./install.sh --force         # overwrite an existing ~/.pi/agent/models.json
#   ./install.sh --help

set -euo pipefail

# --- Resolve repo location (works whether run from the clone or elsewhere) ---
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

AGENT_DIR="${PI_AGENT_DIR:-$HOME/.pi/agent}"
EXT_DIR="$AGENT_DIR/extensions"
SKILLS_DIR="$AGENT_DIR/skills"

DO_INSTALL=1
FORCE=0

usage() {
  sed -n '2,30p' "$0" | sed 's/^# \{0,1\}//'
  exit 0
}

for arg in "$@"; do
  case "$arg" in
    --help|-h) usage ;;
    --no-install) DO_INSTALL=0 ;;
    --force) FORCE=1 ;;
    *) echo "unknown argument: $arg" >&2; usage ;;
  esac
done

say()  { printf '\033[1;34m[install]\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m[warning]\033[0m %s\n' "$*"; }
die()  { printf '\033[1;31m[error]\033[0m %s\n' "$*" >&2; exit 1; }

# --- 1. Prerequisites -------------------------------------------------------
command -v node >/dev/null 2>&1 || die "node is required (https://nodejs.org)."
command -v npm  >/dev/null 2>&1 || die "npm is required (ships with node)."
say "node $(node --version) / npm $(npm --version)"

# --- 2. Install pi -----------------------------------------------------------
if [ "$DO_INSTALL" -eq 1 ]; then
  if command -v pi >/dev/null 2>&1; then
    say "pi already installed: $(pi --version 2>/dev/null || echo '?')"
  else
    say "installing pi globally (npm)..."
    npm install -g --ignore-scripts @earendil-works/pi-coding-agent
    say "installed pi: $(pi --version)"
  fi
else
  say "skipping global pi install (--no-install)"
fi

# --- 3. Symlink repo config into ~/.pi/agent ---------------------------------
mkdir -p "$AGENT_DIR" "$EXT_DIR" "$SKILLS_DIR"

link() { # link <target> <linkpath>
  local target="$1" linkpath="$2"
  if [ -L "$linkpath" ]; then
    rm -f "$linkpath"
  elif [ -e "$linkpath" ]; then
    mv "$linkpath" "$linkpath.bak-pre-symlink"
    warn "backed up existing $linkpath -> $linkpath.bak-pre-symlink"
  fi
  ln -s "$target" "$linkpath"
  say "linked $linkpath"
}

link "$REPO_DIR/.pi/settings.json" "$AGENT_DIR/settings.json"
link "$REPO_DIR/.pi/AGENTS.md"     "$AGENT_DIR/AGENTS.md"

for ext in "$REPO_DIR"/extensions/*.ts; do
  [ -e "$ext" ] || continue
  link "$ext" "$EXT_DIR/$(basename "$ext")"
done

for skill in "$REPO_DIR"/.pi/skills/*; do
  [ -d "$skill" ] || continue
  link "$skill" "$SKILLS_DIR/$(basename "$skill")"
done

# --- 4. Generate ~/.pi/agent/models.json -------------------------------------
MODELS_JSON="$AGENT_DIR/models.json"
if [ -e "$MODELS_JSON" ] && [ "$FORCE" -eq 0 ]; then
  warn "keeping existing $MODELS_JSON (use --force to regenerate from .pi/providers.json)"
else
  if [ -e "$MODELS_JSON" ]; then
    mv "$MODELS_JSON" "$MODELS_JSON.bak-$(date +%Y%m%dT%H%M%S)"
    warn "backed up existing models.json"
  fi
  # Merge .pi/providers.json with an `openai` override only when the env vars
  # are present, so a missing OPENAI_BASEURL can't poison the provider list.
  node "$REPO_DIR/scripts/build-models.js" "$REPO_DIR/.pi/providers.json" > "$MODELS_JSON"
  say "generated $MODELS_JSON from .pi/providers.json"
fi

# --- 5. Env var check --------------------------------------------------------
missing=0
check_env() { # check_env <var> <hint>
  if [ -z "$(printenv "$1" 2>/dev/null || true)" ]; then
    warn "$1 is not set. $2"
    missing=1
  else
    say "$1 is set"
  fi
}
check_env FOUNDRY_API_KEY  "foundry/foundry-zyt providers will not authenticate."
check_env OPENAI_API_KEY   "the openai override was skipped in models.json."
check_env OPENAI_BASEURL   "the openai override was skipped in models.json."
check_env BASETEN_API_KEY  "your default model is baseten/deepseek-ai/DeepSeek-V4-Flash-0731; set this or switch with /model."

# --- Summary -----------------------------------------------------------------
cat <<EOF

$(printf '\033[1;32m')Done.$(printf '\033[0m')

  pi:        $(command -v pi || echo 'NOT FOUND — re-run without --no-install')
  config:    $REPO_DIR
  agent dir: $AGENT_DIR

Next steps:
  1. cd into a project and run:  pi
  2. If the default model (baseten) isn't available, switch with /model to
     foundry-zyt/gpt-5.6-* or another enabled model.
  3. Reload extensions after any change: /reload
EOF
[ "$missing" -eq 1 ] && printf '\n  \033[1;33mSome env vars above are missing — set them in your shell profile and re-run.\033[0m\n'
exit 0

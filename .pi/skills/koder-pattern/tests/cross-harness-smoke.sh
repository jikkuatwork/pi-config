#!/usr/bin/env bash
set -euo pipefail

TEST_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd -P)"
SKILL_ROOT="$(cd "$TEST_DIR/.." >/dev/null 2>&1 && pwd -P)"
KODER_PATTERN="$SKILL_ROOT/bin/koder-pattern"
TMP_ROOT="$(mktemp -d)"
trap 'rm -rf "$TMP_ROOT"' EXIT

fail() {
  printf 'fail: %s\n' "$*" >&2
  exit 1
}

resolve_dir() {
  cd "$1" >/dev/null 2>&1 && pwd -P
}

assert_link() {
  local root="$1"
  local path="$2"
  local target="$3"
  local link="$root/$path"

  [ -L "$link" ] || fail "$path is not a symlink"
  [ "$(readlink "$link")" = "$target" ] || fail "$path has the wrong relative target"
}

for blind_doc in \
  references/queues/blind-orchestration.md \
  references/queues/blind-briefs.md \
  references/queues/blind-recovery.md \
  references/meta/sdk-blind-orchestration-review.md; do
  [ -s "$SKILL_ROOT/$blind_doc" ] || fail "missing blind orchestration reference: $blind_doc"
done
grep -Fq 'references/queues/blind-orchestration.md' "$SKILL_ROOT/references/INDEX.md" || fail "main router does not expose blind orchestration"
grep -Fq 'references/queues/blind-recovery.md' "$SKILL_ROOT/references/INDEX.md" || fail "main router does not expose blind recovery"
awk '
  /^---[[:space:]]*$/ { separators += 1; next }
  separators >= 2 && /references\/INDEX\.md/ { found = 1 }
  END { exit(found ? 0 : 1) }
' "$SKILL_ROOT/SKILL.md" || fail "koder-pattern has no cross-harness body route to references/INDEX.md"
grep -Fq 'with koder-pattern' "$SKILL_ROOT/SKILL.md" || fail "koder-pattern description lacks explicit natural-language trigger wording"

repo="$TMP_ROOT/repo"
"$KODER_PATTERN" init --no-commit "$repo" >/dev/null
"$KODER_PATTERN" doctor "$repo" >/dev/null

assert_link "$repo" "AGENTS.md" "koder/AGENTS.md"
assert_link "$repo" "CLAUDE.md" "koder/AGENTS.md"
for surface in .pi .agents .claude; do
  assert_link "$repo" "$surface/skills/open" "../../koder/skills/open"
  assert_link "$repo" "$surface/skills/close" "../../koder/skills/close"
  [ "$(resolve_dir "$repo/$surface/skills/open")" = "$(resolve_dir "$repo/koder/skills/open")" ] || fail "$surface open adapter does not resolve to the canonical skill"
  [ "$(resolve_dir "$repo/$surface/skills/close")" = "$(resolve_dir "$repo/koder/skills/close")" ] || fail "$surface close adapter does not resolve to the canonical skill"
done

physical_skills="$(find "$repo" -type f -name SKILL.md | wc -l)"
[ "$physical_skills" -eq 2 ] || fail "expected 2 physical SKILL.md files, found $physical_skills"

for skill in open close; do
  occurrences="$(grep -F -c 'references/INDEX.md' "$repo/koder/skills/$skill/SKILL.md")"
  [ "$occurrences" -ge 2 ] || fail "$skill does not contain metadata and body routing to references/INDEX.md"
done

grep -Fq 'orchestration_mode: blind' "$repo/koder/AGENTS.md" || fail "generated AGENTS lacks the conditional blind queue boundary"
grep -Fq 'koder/docs/EXECUTION.md' "$repo/koder/skills/open/references/INDEX.md" || fail "generated open skill does not surface execution windows"
grep -Fq 'Mode' "$repo/koder/skills/open/references/FORMAT.md" || fail "generated open format does not surface orchestration mode"
grep -Fq 'Stop Gate' "$repo/koder/skills/open/references/FORMAT.md" || fail "generated open format does not surface the stop gate"

# A second init must preserve the same links and remain valid.
"$KODER_PATTERN" init --no-commit "$repo" >/dev/null
"$KODER_PATTERN" doctor "$repo" >/dev/null

# Doctor must reject an older frontmatter-only router that Claude cannot route.
awk '
  { print }
  /^---[[:space:]]*$/ { separators += 1; if (separators == 2) exit }
' "$repo/koder/skills/open/SKILL.md" >"$repo/koder/skills/open/SKILL.md.tmp"
mv "$repo/koder/skills/open/SKILL.md.tmp" "$repo/koder/skills/open/SKILL.md"
if "$KODER_PATTERN" doctor "$repo" >/dev/null 2>&1; then
  fail "doctor accepted a frontmatter-only open router"
fi

printf '%s\n' 'cross-harness smoke: ok'

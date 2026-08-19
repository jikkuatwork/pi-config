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
  references/queues/mode-selection.md \
  references/queues/blind-orchestration.md \
  references/meta/sdk-blind-orchestration-review.md; do
  [ -s "$SKILL_ROOT/$blind_doc" ] || fail "missing blind orchestration reference: $blind_doc"
done
for merged_doc in \
  references/queues/blind-briefs.md \
  references/queues/blind-recovery.md; do
  [ ! -e "$SKILL_ROOT/$merged_doc" ] || fail "merged blind doc resurfaced: $merged_doc"
done
grep -Fq 'references/queues/mode-selection.md' "$SKILL_ROOT/references/INDEX.md" || fail "main router does not expose delivery-first mode selection"
grep -Fq 'references/queues/blind-orchestration.md' "$SKILL_ROOT/references/INDEX.md" || fail "main router does not expose blind orchestration"
grep -Fq 'includes briefs and recovery' "$SKILL_ROOT/references/INDEX.md" || fail "main router does not route briefs/recovery through the consolidated blind doc"
grep -Fq 'a queue does **not** imply blind orchestration' "$SKILL_ROOT/references/queues/mode-selection.md" || fail "mode selection lacks queue/blind separation"
grep -Fq 'two no-op' "$SKILL_ROOT/references/queues/mode-selection.md" || fail "mode selection lacks no-op circuit breaker"
grep -Fq 'Do not ask a model to invent or expand a commit SHA' "$SKILL_ROOT/references/queues/mode-selection.md" || fail "mode selection lacks Git-owned commit identity"
grep -Fq 'process-failure budget' "$SKILL_ROOT/references/queues/mode-selection.md" || fail "mode selection lacks the queue-global process-failure budget"
grep -Fq 'implementation incomplete' "$SKILL_ROOT/references/queues/mode-selection.md" || fail "mode selection lacks the implementation-incomplete classification"
grep -Fq 'first unproven phase' "$SKILL_ROOT/references/queues/blind-orchestration.md" || fail "blind orchestration lacks the first-unproven-phase recovery rule"
grep -Fq 'Mechanics belong to the runner' "$SKILL_ROOT/references/queues/blind-orchestration.md" || fail "blind orchestration lacks the deterministic-runner delegation"
if grep -Fq 'koder.blind.phase.v1' "$SKILL_ROOT/references/queues/blind-orchestration.md"; then
  fail "blind orchestration reintroduced a duplicate skill-level receipt schema"
fi
grep -Fq 'Routine artifact and queue movement should ride with the logical' "$SKILL_ROOT/references/shared/state-commit-protocol.md" || fail "state protocol still encourages commit amplification"
grep -Fq 'A clean row review may remain compact execution proof' "$SKILL_ROOT/references/artifacts/reviews.md" || fail "review policy still requires an artifact for every clean row"
if grep -Fq 'run the repo close workflow' "$SKILL_ROOT/references/queues/blind-orchestration.md"; then
  fail "blind coordinators still invoke session close at rollover"
fi
awk '
  /^---[[:space:]]*$/ { separators += 1; next }
  separators >= 2 && /references\/INDEX\.md/ { found = 1 }
  END { exit(found ? 0 : 1) }
' "$SKILL_ROOT/SKILL.md" || fail "koder-pattern has no cross-harness body route to references/INDEX.md"
grep -Fq 'with koder-pattern' "$SKILL_ROOT/SKILL.md" || fail "koder-pattern description lacks explicit natural-language trigger wording"
grep -Fq 'Do not trigger for ordinary coding, planning, review, research' "$SKILL_ROOT/SKILL.md" || fail "koder-pattern description still catches ordinary work"
grep -Fq 'contract_version: 2' "$SKILL_ROOT/references/meta/pattern-contract.md" || fail "project-history guarantee did not bump the pattern contract"
grep -Fq 'Bounded open' "$SKILL_ROOT/references/meta/pattern-contract.md" || fail "v2 contract lacks bounded project-history loading"

repo="$TMP_ROOT/repo"
"$KODER_PATTERN" init --no-commit "$repo" >/dev/null
"$KODER_PATTERN" doctor "$repo" >/dev/null

[ -f "$repo/CHANGELOG.md" ] || fail "init did not create CHANGELOG.md when project history was absent"
[ "$(wc -l <"$repo/CHANGELOG.md")" -le 100 ] || fail "starter CHANGELOG.md exceeds 100 lines"
grep -Fq 'Koder-pattern adoption' "$repo/CHANGELOG.md" || fail "starter CHANGELOG.md lacks adoption milestone"

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
grep -Fq 'A queue does not imply blind mode' "$repo/koder/AGENTS.md" || fail "generated AGENTS lacks delivery-first queue separation"
grep -Fq 'Do not dispatch metadata-finalizer workers' "$repo/koder/AGENTS.md" || fail "generated AGENTS lacks direct metadata ownership"
grep -Fq 'Two no-op/boot/permission attempts' "$repo/koder/AGENTS.md" || fail "generated AGENTS lacks dispatch circuit breaker"
grep -Fq 'Routine artifact/status changes ride with the logical work commit' "$repo/koder/AGENTS.md" || fail "generated AGENTS lacks commit-economy rule"
grep -Fq 'never create a competing `CHANGELOG.md`' "$repo/koder/AGENTS.md" || fail "generated AGENTS lacks existing-history preservation"
grep -Fq 'read no more than 100 lines' "$repo/koder/AGENTS.md" || fail "generated AGENTS lacks bounded project-history loading"
if grep -Fq 'Every intentional `koder/` state transition' "$repo/koder/AGENTS.md"; then
  fail "generated AGENTS still mandates one commit per koder transition"
fi
grep -Fq 'koder/docs/EXECUTION.md' "$repo/koder/skills/open/references/INDEX.md" || fail "generated open skill does not surface execution windows"
grep -Fq 'read no more than 100 lines' "$repo/koder/skills/open/references/INDEX.md" || fail "generated open skill does not bound project-history loading"
grep -Fq 'Do not invent a second history surface' "$repo/koder/skills/open/references/INDEX.md" || fail "generated open skill can duplicate existing history tracking"
grep -Fq 'Bounded project history may clarify **Past** only' "$repo/koder/skills/open/references/FORMAT.md" || fail "generated open format lets history override live handoff state"
grep -Fq 'Mode' "$repo/koder/skills/open/references/FORMAT.md" || fail "generated open format does not surface orchestration mode"
grep -Fq 'Stop Gate' "$repo/koder/skills/open/references/FORMAT.md" || fail "generated open format does not surface the stop gate"

# A second init must preserve the same links and remain valid.
"$KODER_PATTERN" init --no-commit "$repo" >/dev/null
"$KODER_PATTERN" doctor "$repo" >/dev/null

# Existing release tracking must be preserved without creating a competing changelog.
history_repo="$TMP_ROOT/history-repo"
mkdir -p "$history_repo/docs"
printf '%s\n' '# Existing release notes' >"$history_repo/docs/RELEASE_NOTES.md"
"$KODER_PATTERN" init --no-commit "$history_repo" >/dev/null
[ ! -e "$history_repo/CHANGELOG.md" ] || fail "init duplicated existing release notes with CHANGELOG.md"
grep -Fq '# Existing release notes' "$history_repo/docs/RELEASE_NOTES.md" || fail "init changed existing release notes"
"$KODER_PATTERN" doctor "$history_repo" >/dev/null

# Explicit opt-out must leave a repository without local history tracking valid.
no_history_repo="$TMP_ROOT/no-history-repo"
"$KODER_PATTERN" init --no-commit --no-changelog "$no_history_repo" >/dev/null
[ ! -e "$no_history_repo/CHANGELOG.md" ] || fail "--no-changelog still created CHANGELOG.md"
"$KODER_PATTERN" doctor "$no_history_repo" >/dev/null

# Established Git history receives a safe aggregate summary, not copied commit prose.
git_repo="$TMP_ROOT/git-repo"
mkdir -p "$git_repo"
git -C "$git_repo" init -q
git -C "$git_repo" -c user.name=Smoke -c user.email=smoke@example.invalid commit --allow-empty -m 'seed project' -q
"$KODER_PATTERN" init --no-commit "$git_repo" >/dev/null
grep -Fq 'recorded 1 commit from' "$git_repo/CHANGELOG.md" || fail "starter changelog lacks pre-adoption Git summary"
if grep -Fq 'seed project' "$git_repo/CHANGELOG.md"; then
  fail "starter changelog copied raw commit prose"
fi

# Fresh default init must commit the conditional changelog with the state scaffold.
fresh_commit_repo="$TMP_ROOT/fresh-commit-repo"
GIT_AUTHOR_NAME=Smoke GIT_AUTHOR_EMAIL=smoke@example.invalid \
GIT_COMMITTER_NAME=Smoke GIT_COMMITTER_EMAIL=smoke@example.invalid \
  "$KODER_PATTERN" init "$fresh_commit_repo" >/dev/null
[ "$(git -C "$fresh_commit_repo" log -1 --format='%s')" = 'state: init - koder pattern scaffold' ] || fail "fresh init lacks state: init commit"
git -C "$fresh_commit_repo" ls-files --error-unmatch CHANGELOG.md >/dev/null || fail "fresh init did not commit CHANGELOG.md"
[ -z "$(git -C "$fresh_commit_repo" status --porcelain)" ] || fail "fresh init left a dirty repository"

# Rerunning init against an existing consumer must not replay state: init.
upgrade_repo="$TMP_ROOT/upgrade-repo"
mkdir -p "$upgrade_repo/koder"
printf '%s\n' '# Existing state' >"$upgrade_repo/koder/STATE.md"
git -C "$upgrade_repo" init -q
git -C "$upgrade_repo" add koder/STATE.md
git -C "$upgrade_repo" -c user.name=Smoke -c user.email=smoke@example.invalid commit -m 'seed koder consumer' -q
GIT_AUTHOR_NAME=Smoke GIT_AUTHOR_EMAIL=smoke@example.invalid \
GIT_COMMITTER_NAME=Smoke GIT_COMMITTER_EMAIL=smoke@example.invalid \
  "$KODER_PATTERN" init "$upgrade_repo" >/dev/null
[ "$(git -C "$upgrade_repo" log -1 --format='%s')" = 'chore(koder-pattern): add missing scaffold paths' ] || fail "existing consumer replayed state: init"

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

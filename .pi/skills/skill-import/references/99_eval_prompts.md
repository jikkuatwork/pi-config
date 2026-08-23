# Eval Prompts

## Should trigger

1. `Convert this blog post into a pi skill with a tiny SKILL.md and references.`
   - Expected: run intake/review/adapt/validate; create the canonical skill under `~/Projects/pi/.pi/skills/<name>/` and, when invoked elsewhere, add a relative local test symlink.

2. `Import this GitHub skill repo, but don't use the Skills CLI.`
   - Expected: clone/download to `/tmp`, review executables/hooks/secrets, vendor docs-only by default into the canonical Pi repo, and do not globally promote it merely for testing.

3. `Turn our deployment checklist into a reusable skill.`
   - Expected: extract durable workflow, define triggers/non-triggers, split details into references.

## Should not trigger

1. `Use the existing golang-pro skill to write a Go worker pool.`
   - Expected: use `golang-pro`, not `skill-import`.

2. `Summarize this blog post for me.`
   - Expected: normal summary unless user asks to convert/import/adapt it as a skill.

3. `Install this npm package globally.`
   - Expected: not a skill import; ask/handle under normal package-install safety rules.

## Edge cases

- Source contains hooks/install scripts: omit by default, warn, and ask before running or vendoring runtime pieces.
- Source has many nested `SKILL.md` files: create one umbrella skill and convert children to `references/modules/*/GUIDE.md`.
- Source license is unclear: do not vendor; summarize risk and ask.
- Requesting repo already has `.pi/skills/<name>`: inspect it and stop rather than replacing it blindly; reconcile ownership with the user.
- Skill is inherently repo-specific (`open`, `close`, local deployment workflow): keep it in that repo instead of centralizing it.

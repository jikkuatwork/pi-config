# Eval Prompts

## Should trigger

1. `Convert this blog post into a pi skill with a tiny SKILL.md and references.`
   - Expected: run intake/review/adapt/validate; create local `.pi/skills/<name>/`.

2. `Import this GitHub skill repo, but don't use the Skills CLI.`
   - Expected: clone/download to `/tmp`, review executables/hooks/secrets, vendor docs-only by default.

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

# Provenance and Review Notes

## Upstream

- Repository: https://github.com/DietrichGebert/ponytail
- Reviewed commit: `cf97ccc509c758485d1b7b2e980f83128f8e5d08`
- Default branch at review: `main`
- License: MIT, copyright (c) 2026 DietrichGebert
- Repo description at review: "Makes your AI agent think like the laziest senior dev in the room. The best code is the code you never wrote."

## Local adaptation

This pi skill is a docs-only adaptation. It merges upstream's three skill entrypoints into one discoverable pi skill to avoid autocomplete/context spam:

- `skills/ponytail/SKILL.md` → `references/01_core_mode.md`
- `skills/ponytail-review/SKILL.md` → `references/02_review_mode.md`
- `skills/ponytail-help/SKILL.md` → `references/03_help.md`
- Local `SKILL.md` is frontmatter-only and routes via `metadata.references.index`.

No upstream executable/plugin/runtime files were vendored.

## Reviewed but not vendored

Upstream contains Claude plugin support and hooks:

- `.claude-plugin/marketplace.json`
- `.claude-plugin/plugin.json`
- `commands/ponytail.toml`
- `commands/ponytail-review.toml`
- `hooks/ponytail-activate.js`
- `hooks/ponytail-config.js`
- `hooks/ponytail-mode-tracker.js`
- `hooks/ponytail-statusline.sh`
- `hooks/ponytail-statusline.ps1`

These files are intentionally omitted here because this repo vendors skills manually and does not install third-party plugin hooks without explicit permission.

## Safety scan summary

Review performed before vendoring:

- File tree inspected under `/tmp/ponytail-review`.
- Executable/setup scan found plugin hook scripts and example text containing `npm install flatpickr`; none were run or copied.
- Secret-ish scan found benchmark prose mentioning tokens/secrets but no credentials in vendored files.
- MIT license copied into this skill directory.

## Notes for future updates

When updating from upstream:

1. Clone/download into `/tmp` or another throwaway location.
2. Inspect all `SKILL.md` files and referenced scripts/assets.
3. Do not use Vercel Skills CLI.
4. Do not vendor hooks/plugin files unless the user explicitly asks and approves reviewing/running them.
5. Keep only one top-level `SKILL.md` under `.pi/skills/ponytail/`.

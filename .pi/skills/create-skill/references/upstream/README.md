# Upstream provenance (docs-only snapshots)

This folder contains source snapshots used to build the local `create-skill` skill.

## Sources

- `anthropic-skill-creator.GUIDE.md`
  - Source: https://www.skills.sh/anthropics/skills/skill-creator
  - Upstream file: `anthropics/skills` → `skills/skill-creator/SKILL.md`
- `mattpocock-write-a-skill.GUIDE.md`
  - Source: https://www.skills.sh/mattpocock/skills/write-a-skill
  - Upstream file: `mattpocock/skills` → `skills/productivity/write-a-skill/SKILL.md`

## Notes

- These are stored as `*.GUIDE.md` to avoid nested skill auto-discovery.
- They are imported as documentation references only.
- The upstream Anthropic skill references runnable scripts that are **not vendored here**.
- Do not run/install third-party tooling without explicit user permission.

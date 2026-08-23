# Provenance and Safety Review

## Source

- Repository: <https://github.com/LottieFiles/motion-design-skill>
- Owner/author: LottieFiles
- Default branch: `main`
- Reviewed commit: `f9a8a041b85185ee4881b3471d3415e939aac772`
- Commit date: 2026-05-18
- Review checkout: `~/Projects/lab/upstreams/LottieFiles__motion-design-skill/` (shallow and git-ignored)
- Upstream skill version: `1.0.0`
- License: MIT; preserved in `../LICENSE`
- Review date: 2026-08-23
- Canonical skill home: `~/Projects/pi/.pi/skills/motion-design/`
- Lab test adapter: `~/Projects/lab/.pi/skills/motion-design` (relative symlink)

At review time the public GitHub repository reported 1,352 stars, 72 forks, one
open issue, and was not archived. Its default branch had four commits, no commits
in the preceding 30 or 90 days, and no release or tag. Community interest is
strong, but the repository is very young and its maintenance maturity remains
unknown. These are point-in-time discovery signals, not a quality or security
guarantee.

## Imported and adapted

- The upstream `SKILL.md` body became `01_core.md` behind a small local router.
- All eight `director/`, four `patterns/`, and four `reference/` documents were
  preserved as docs-only references.
- `02_review.md` adds a no-motion gate, accessibility interpretation, and limits
  on universal-looking rules.
- The local `SKILL.md` is a frontmatter-only Pi entrypoint.
- The MIT license and copyright notice were copied unchanged.

## Intentionally omitted

- The repository README and remote banner asset were not vendored; they are not
  needed at runtime.
- The README's Skills CLI command (`npx skills add ...`) was neither copied into
  the operating workflow nor executed.
- No package, Lottie runtime, third-party animation library, or generated output
  is part of the installation.

## Review findings

The snapshot contained 19 tracked files: Markdown documentation, a `.gitignore`,
and the MIT license. It contained exactly one upstream `SKILL.md`, no executable
files, no package manifest, no shebang, no installer/setup hook, and no matching
secret/private-key material. The only setup scan hit was ordinary prose using
the word “setup.” No third-party code was run.

The main risk is design overreach rather than code execution: literal use of
“always three layers,” “never opacity-only,” fixed timing tables, and 1/3 rules
could over-animate interfaces. `02_review.md` is therefore mandatory context.

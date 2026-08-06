# Provenance and Safety Review

## Local shape

The local `ux` skill is a docs-only umbrella with one discoverable `SKILL.md`.
Upstream skill entrypoints were converted into capability modules under
`references/modules/*/GUIDE.md`; no nested `SKILL.md` remains. The original
BFBB/Holm-oriented workflow stays at the root and takes precedence for raw app
constraints.

Local review date: `2026-08-06`.

## Source 1 — UI/UX Pro Max

- Directory page: `https://mcp.directory/skills/ui-ux-pro-max`
- GitHub repository:
  `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git`
- Owner: `nextlevelbuilder` / Next Level Builder
- Reviewed commit: `b7e3af80f6e331f6fb456667b82b12cade7c9d35`
- Original review date: `2026-06-18`

The MCP zip contained only a `SKILL.md` that instructed agents to check/install
Python and run a missing `scripts/search.py`. The GitHub repository additionally
contained Python search scripts, CSV/template data, a CLI package, npm/bun build
scripts, setup/install instructions, generated assets, screenshots, and broad
framework material.

The repository root `LICENSE` is MIT, copyright Next Level Builder; it is copied
at `../licenses/next_level_builder_mit.txt`. The CLI README also claimed
`CC-BY-NC-4.0`, conflicting with the root/package MIT declarations. This local
adaptation retains only distilled instruction prose—not the CLI, scripts, data,
or generated assets—and records the root MIT notice without extending any
license claim to omitted material.

## Source 2 — Interfaces skills

- Repository: `https://github.com/jakubkrehel/skills`
- Owner/author: Jakub Krehel
- Branch: `main`
- Reviewed commit: `a67333399dabbc71d7778962cb9c4fb9b86a00d0`
- Commit date: `2026-07-29T11:14:01+02:00`
- Local review date: `2026-08-06`
- License: MIT, copied at `../licenses/jakub_krehel_mit.txt`

The reviewed checkout contained 43 files: seven `SKILL.md` entrypoints, 23
supporting Markdown references, seven OpenAI display-metadata YAML files, two
Claude plugin JSON manifests, root docs, and the license. It had no executable
files, symlinks, submodules, package manifest, build tooling, or dependency
lockfile.

The seven source skills were adapted by capability:

- `better-interface` → `modules/interface_review/`
- `better-accessibility` → `modules/accessibility/`
- `better-layout` → `modules/layout/`
- `better-writing` → `modules/ux_writing/`
- `better-typography` → `modules/typography/`
- `better-colors` → `modules/colors/`
- `better-ui` → `modules/ui_polish/`

Cross-skill names were normalized to local module ownership, supporting files
were numbered with underscore paths, and standalone entrypoints became
non-discoverable `GUIDE.md` files.

The root README included forbidden Skills CLI commands and Claude plugin install
commands. Plugin manifests and `agents/openai.yaml` metadata are packaging
surfaces rather than UX knowledge; they were omitted.

## Source 3 — Emil Kowalski skills

- Repository: `https://github.com/emilkowalski/skills`
- Owner/author: Emil Kowalski
- Branch: `main`
- Reviewed commit: `de33dbed000212b54400a33767d1e4d03654db2a`
- Commit date: `2026-08-05T14:33:08+02:00`
- Local review date: `2026-08-06`
- License: MIT, copied at `../licenses/emil_kowalski_mit.txt`

The reviewed checkout contained 17 files: nine `SKILL.md` entrypoints, five
supporting Markdown references, README, `.gitignore`, and license. It had no
executable files, symlinks, submodules, package manifest, plugin/MCP config, or
lockfile.

The source skills were organized as follows:

- `animate`, `review-animations`, `improve-animations`,
  `find-animation-opportunities`, and `animation-vocabulary`, plus their five
  references → one `modules/motion/` capability with task-specific references;
- `apple-design` → `modules/apple_design/`;
- `prototype` and picker reference → `modules/prototyping/`;
- `pick-ui-library` → permission-gated `modules/library_selection/`;
- the broad `emil-design-eng` skill → a deduplicated
  `modules/design_craft/GUIDE.md`, with its motion, surface, type, and
  accessibility rules routed to specialist modules instead of copied twice.

The README contained a forbidden `npx skills` install command; it was omitted.
The library picker recommended third-party packages and allowed installation
when requested. Locally it is recommendation-only by default: packages require
fresh license/maintenance/compatibility review and explicit installation
permission. Prototype and animation docs include code examples and workflows
that can mutate an app or start its existing preview tooling; they remain docs,
and the local router requires an explicit implementation/prototype request plus
repository permission before those actions.

## Content review and local corrections

No credential-like value, private key, hidden account state, or prompt-injection
instruction was observed in either newly reviewed repository. Matches for
`password`, `token`, and `secret` were ordinary form, design-token, or example
text. The source repositories were cloned to `/tmp` for inspection; no upstream
code, installer, package, plugin, build, validation command, or example was run.

Imported guidance is not treated as an immutable standard. The local adaptation
adds these precedence/correction rules:

- Formal accessibility claims use the target WCAG version and rendered evidence;
  APCA may be supplemental but is not substituted for a required WCAG 2.x check.
- Motion defaults are contextual. Existing project tokens, interaction
  frequency, accessibility, target-device testing, and measured behavior beat
  conflicting source constants such as `scale(0.96)` versus `scale(0.97)`.
- “Only transform and opacity” is a preference, not a universal law; justified
  color, shadow, `clip-path`, and intrinsic-size transitions remain possible and
  must be profiled.
- The upstream claim that Motion/Framer Motion `x`/`y`/`scale` shorthands are
  inherently not hardware accelerated was not retained as fact. JS scheduling
  can still contend with the main thread, while compositor eligibility depends
  on the emitted property, browser, library version, and surrounding effects;
  profile the actual target.
- Global font smoothing, glass/translucency, blur, fixed motion curves, and
  fixed target sizes are treated as context-sensitive techniques, not mandatory
  polish.
- Reduced motion preserves necessary state feedback while removing or reducing
  vestibular displacement; decorative motion may be absent entirely.

## Omitted intentionally

Across all three sources, this umbrella omits:

- Skills CLI and plugin/marketplace installation paths;
- Python, npm, bun, CLI, MCP, and generated setup surfaces;
- executable scripts, package manifests, lockfiles, CSV databases, generated
  assets, screenshots, and remote marketing images;
- Claude/OpenAI packaging metadata and nested skill discovery heads;
- promotional copy, newsletter/course prompts, badges, and canned first-run
  responses;
- repetitive source material already represented by a local owner module;
- any instruction to install a dependency, run an upstream tool, or deploy.

No third-party executable or dependency was vendored, installed, or run.

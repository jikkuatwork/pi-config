# Provenance and Safety Review

## Source reviewed

- Repository: `https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills`
- Owner/author: `scottstts` / Scott Sun
- Branch: `main`
- Reviewed commit: `16c23a762a8092cf7884667d2d7e079a34aa2473`
- Commit date: `2026-07-25T10:43:31+01:00`
- Upstream package version: `0.5.0`
- Local review date: `2026-07-31`

The repository was shallow-cloned into `/tmp` for inspection. No upstream code or dependency was installed or executed.

## Source shape

The reviewed checkout contained 594 files and approximately 183 MB, including:

- 24 discoverable `SKILL.md` files: one router and 23 expert skills;
- 27 detailed Markdown references;
- an executable npm installer;
- package lifecycle, validation, network-freshness, installer, and Playwright capture scripts;
- a local example-gallery server that can spawn a browser;
- JavaScript, TypeScript, GLSL, images, models, LUTs, EXR data, and other example assets.

The installer recursively copies skills into agent directories and can replace or remove tracked skill directories. Development scripts can start servers, spawn processes, access the network, write captures, and execute imported example modules. None is needed by this adaptation.

## License boundary

- The upstream root `LICENSE` is MIT, copyright 2026 Scott Sun; it is copied at `../LICENSE`.
- Upstream `package.json` declares `MIT AND GPL-3.0-only` because a wet-puddle implementation and related assets have an explicit GPL-3.0 boundary.
- This local adaptation includes documentation only. It excludes the GPL implementation, all example files, all assets, and all runtime/install surfaces.
- The upstream ledger also labels some third-party materials with no observed license as “MIT by project rule.” This local import does not inherit that assertion for omitted code or assets. Do not recover or vendor those implementation files without a fresh provenance and license review.

The retained upstream reference prose is distributed under the repository's root MIT license. Some references describe source-specific constants and include Markdown code snippets; treat them as technical guidance, verify them against the target, and do not infer that omitted upstream assets or implementation files share the same reuse boundary.

## Review findings

- Exactly one executable file was present: `bin/threejs-awesome-graphics-agent-skills.mjs`.
- Package scripts include validation, routing tests, installer tests, asset-origin tests, network freshness checks, a development server, and Playwright captures.
- The gallery server imports `child_process.spawn`, binds a local HTTP server, transpiles TypeScript, serves project files under allowlisted prefixes, and can open a system browser.
- Example source includes remote asset URLs and runtime `fetch` calls.
- No symlinks or Git submodules were present.
- A credential-pattern scan produced only a GPL-boilerplate false positive; no credential-like value was observed.
- No unresolved TODO/FIXME markers or prompt-injection-style instructions were found in distributed skill Markdown.

## Local adaptation

- Replaced 24 upstream skill heads with one frontmatter-only `.pi/skills/threejs-graphics/SKILL.md`.
- Converted the 23 atomic skills to `references/modules/<topic>/GUIDE.md`.
- Retained 27 reviewed Markdown references as numbered, underscore-named files behind their module guides.
- Removed or neutralized links to omitted executable examples.
- Normalized cross-skill mentions into sibling module links and reworded one credential-scanner false positive.
- Added a compact local router, core workflow, provenance record, and trigger evaluations.

This keeps only one description in pi's always-loaded skill inventory. A matching task loads the small router, one or a few guides, and deeper references only when needed.

The installed pi loader discovered exactly one `threejs-graphics` skill with zero diagnostics; a full project-local scan found it once among 19 skills. Validation was metadata/filesystem-only and made no inference request.

## Omitted intentionally

- `bin/` installer and all npm install/uninstall instructions;
- `package.json`, lockfile, npm scripts, and dependency setup;
- `scripts/`, `dev/`, gallery server/runtime, Playwright capture tooling, and fixtures;
- every upstream `examples/` directory and implementation source file;
- images, GLBs, HDR/EXR files, LUTs, textures, binary volumes, and other assets;
- `agents/openai.yaml` files and source-material trace manifests;
- README marketing, badges, package publishing workflow, and Skills CLI paths.

No third-party runnable code was vendored, installed, or run.

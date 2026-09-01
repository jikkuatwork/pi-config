# Provenance and safety review

## Source

- Repository: <https://github.com/tt-a1i/archify>
- Owner/author: `tt-a1i`
- Default branch: `main`
- Reviewed commit: `5de7275fe87a66a19d52a4d9b0b3a4f2a5a90115`
- Commit date: 2026-08-30
- Upstream skill version: `2.16.0`
- Review date: 2026-08-31
- License: MIT; preserved unchanged in `../LICENSE`
- Canonical destination: `~/Projects/pi/.pi/skills/archify/`
- Global promotion: not performed

## Review findings

The shallow review checkout contained 483 tracked non-Git files and one upstream
`SKILL.md`. The release ZIP contained 76 entries. Upstream ships executable
Node.js runtime code, two repository shell scripts, npm development scripts, a
ZIP artifact, generated examples, tests, and integrations. The release runtime
requires Node.js 18+ but has no production npm dependency.

Static review found no committed secret/private-key pattern, symlink, submodule,
MCP configuration, or repository hook. The reviewed runtime invokes local Node
subprocesses, local Git for evidence verification, optional Chrome/Chromium for
visual checks, a loopback HTTP preview, and an optional OS file opener.

Upstream was not zero-egress:

1. its operating instructions required a stable-manifest update GET and cache
   writes under the user's cache directory;
2. generated HTML requested Google Fonts;
3. brand capture fetched arbitrary user-provided sites and icons, and rendering
   re-fetched digest-pinned custom brands.

No upstream code was installed or executed before the owner reviewed these
findings and explicitly approved a hardened runtime import.

## Imported and adapted

- Vendored the release runtime's local renderer, schemas, generated validators,
  generated brand catalogue, CLI, examples, migration, compare, preview,
  visual-check, and artifact-check code.
- Replaced the large upstream entrypoint with a tiny routed `SKILL.md` and
  numbered references.
- Removed all updater code and release-manifest metadata.
- Replaced remote brand capture/revalidation with a fail-closed bundled-ID gate.
- Kept the owner-approved Google Fonts request, adding global and per-link
  `no-referrer` controls so artifact/repository identity is not transmitted.
- Added an artifact CSP that blocks connection APIs, remote images, objects, and
  form submission while preserving local/data/blob exports.
- Retained loopback preview only on `127.0.0.1`; it is never a sharing service.

## Intentionally omitted

- Upstream `scripts/check-update.mjs`, `scripts/update-contract.mjs`, and
  `skill-release.json`.
- Remote brand networking and the `brands capture` command.
- `package.json`, `package-lock.json`, development dependencies, generator
  scripts, tests, benchmarks, GitHub workflows, integrations, site/docs trees,
  release shell scripts, the release ZIP, and pre-rendered HTML examples.
- Skills CLI installation instructions and all global installation behavior.

## Privacy boundary

The local guarantee covers Archify runtime and auxiliary commands: no
repo-derived information may be sent over a network. Fixed Google Fonts requests
are the sole approved external artifact requests and carry no referrer. The host
coding agent/model provider remains outside this runtime guarantee; see
`01_privacy.md` before opening sensitive source.

## Validation record

The adapted tree passed these checks on 2026-08-31:

- all 34 vendored `.mjs` files passed `node --check`;
- `scripts/check-privacy.mjs` passed with only the fixed Google Fonts resources
  allowlisted;
- `archify doctor` passed all 16 runtime/reference/privacy checks;
- one showcase example for each of the five diagram types passed 9/9 artifact
  checks with 0 errors and 0 warnings;
- the bundled-brand architecture example passed 9/9;
- atomic delivery and the standalone artifact checker passed 9/9;
- Architecture Delta passed 28/28 checks, and workflow-v2 migration plus
  revalidation passed;
- loopback preview bound to `127.0.0.1` and reached `verified`;
- remote brand URL validation and the removed capture command both failed
  closed; `strace` observed no `AF_INET`/`AF_INET6` call in either path;
- a successful showcase validation also produced no `AF_INET`/`AF_INET6` call
  under `strace`;
- automated browser evidence was attempted but truthfully skipped with exit 2
  because Chrome/Chromium was unavailable in the validation environment.

No package installation, Skills CLI invocation, global promotion, or Pi config
sync was performed.

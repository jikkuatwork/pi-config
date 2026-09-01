# Mandatory no-egress boundary

Apply this reference before reading or analyzing any repository. The governing
rule is: **Archify and every auxiliary command must send zero information
derived from the analyzed repository outside the local machine.** Fail closed
when that cannot be guaranteed.

## Protected information

Treat all of the following as repo-derived, even when apparently harmless:

- repository names, remotes, paths, branch names, revisions, and commit hashes;
- source, configuration, prompts, comments, logs, diagnostics, and test output;
- dependency inventories, service names, endpoints, schemas, and infrastructure;
- inferred architecture, typed diagram JSON, screenshots, HTML, receipts, and
  hashes of any of those artifacts.

Do not place protected information in URLs, query strings, headers, telemetry,
update requests, remote brand requests, hosted renderers, web searches, issue
trackers, paste sites, cloud storage, or external validation services.

## Allowed local operations

- Read the existing local checkout and run bounded local file/Git commands.
- Run the vendored Node renderer and validators from this skill.
- Write JSON, HTML, receipts, and screenshots to local paths.
- Use the optional preview server only when requested; it binds to
  `127.0.0.1` and is not a sharing server.
- Launch a delivered local file only when the user explicitly requests `--open`.
- Use a locally installed Chrome/Chromium for `visual-check`; its Archify launch
  disables background networking.

Do not clone, fetch, pull, browse a remote origin, call web search, use a remote
MCP/tool, install a package, or upload an artifact as part of repository
analysis. If only a remote URL is available, ask for a local checkout or an
explicit policy exception before proceeding.

## Sole allowed artifact request: Google Fonts

The owner explicitly permits the generated HTML to request the fixed JetBrains
Mono stylesheet/font resources from `fonts.googleapis.com` and
`fonts.gstatic.com`. The template sets a global `no-referrer` policy and applies
`referrerpolicy="no-referrer"` to those links, so no artifact URL, repository
path, title, or diagram data is sent as a referrer. Normal network metadata such
as the user's IP address and request time still reaches Google; therefore this
edition is **no repo-data egress**, not fully offline.

The generated artifact also sets a CSP that blocks script connection APIs and
remote images. Do not add another remote font, image, stylesheet, script,
analytics endpoint, or connection target without fresh owner approval and a
privacy review.

## Disabled upstream behavior

This adaptation intentionally removes the upstream update checker, release
manifest, remote brand capture, and remote brand revalidation. Only bundled
brand IDs are valid. Never recreate those paths, run an upstream checker from a
separate checkout, or use a URL as a brand workaround.

Repository-evidence links may be embedded as inert authored links, but Archify
must never open them automatically. A user choosing to follow or share a link is
an explicit action outside diagram generation; generated links use a
no-referrer policy.

## Host-agent boundary

This policy controls Archify's runtime and auxiliary tool choices. It cannot
make the host coding agent or its model provider local. Repository content read
into the current agent session follows the host's existing provider and data
handling path. If the repository may not be disclosed to that provider, stop
before inspection and move the task to an approved local-model environment.

## Exception handling

If a requested feature needs any other network access:

1. stop before the request;
2. name the exact destination and repo-derived fields that would leave;
3. offer a local fallback;
4. proceed only after explicit owner approval.

Silence, prior use of another network tool, or permission to load Google Fonts
is not permission for any other egress.

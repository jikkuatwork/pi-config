# Provenance and Review

## Source

- User-provided local document: `~/Desktop/fal.md`
- Reviewed: 2026-09-03
- SHA-256: `2223e9df2b4d25f931061cba77c799e9de2ca93134547065f4a28ac845cb55db`
- Apparent subject: Fal.ai API documentation for
  `minimax/h3-max/image-to-video`
- Apparent owner: Fal.ai, inferred from the endpoint and wording; the local file
  did not include an author, source-page URL, revision, or license statement.
- License: unknown. This skill therefore preserves only a concise factual API
  contract and an independently written operating procedure; it does not vendor
  the source document or its prose.

## Review findings

- The source was one Markdown-like text file with no scripts, binaries,
  executable bits, package manifests, installers, hooks, plugins, or dependency
  setup.
- It contained shell examples that call `queue.fal.run`. The `POST` is
  cost-impacting; none of the source commands were executed during import.
- It referenced a public sample image on `storage.googleapis.com`; the sample was
  not copied or fetched.
- Credential-related lines used the placeholder `<fal-key>`, not a real API key.
  No credential value was copied into this skill. Runtime credentials must
  remain user-managed and be checked without printing them at use time.
- The source described queue submission, status polling, result fetch, URL/data
  URI inputs, request fields, and result fields. Those factual details were
  adapted into docs-only references.

## Intentionally omitted or changed

- Omitted duplicated submit examples, generic marketing prose, and the empty
  related-models stub.
- Omitted credential placeholders from runnable examples; all auth references
  use the environment variable without exposing it.
- Omitted the public sample input and any implication that private local media
  should be uploaded automatically.
- Did not preserve the illustrative output's `image/png` MIME and `.png` name as
  a video contract; the workflow validates returned media with `ffprobe`.
- Added explicit paid-action authorization, no-automatic-retry, privacy,
  accounting-lag, full-decode, and actual-cost measurement gates.
- Added no helper scripts or dependencies. The imported skill is docs-only.

## Promotion

The canonical source is `~/Projects/pi/.pi/skills/fal/`. The requesting
`movie_planet` repository may use a relative `.pi/skills/fal` test symlink.
This import does not authorize global skill promotion, Pi config sync, or a paid
Fal generation.

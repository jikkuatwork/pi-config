# Bundled brand marks only

This adaptation resolves brand identity entirely from the generated in-package
catalogue. It never fetches a website, favicon, logo, manifest, or remote asset.

## Workflow

1. Search the local catalogue:

   ```bash
   node "$ARCHIFY_ROOT/bin/archify.mjs" brands "Claude" --json
   ```

2. Put the returned canonical ID in the semantic node:

   ```json
   {
     "id": "planner",
     "type": "backend",
     "label": "Claude",
     "brand": "claude"
   }
   ```

3. If nothing matches, omit `brand`. Do not use a company URL, invent a nearby
   identity, download an icon, or call upstream `brands capture`.

The local privacy gate rejects HTTP(S) strings and legacy digest-pinned
`{"url","sha256"}` values before rendering. A brand badge supplements the
semantic `type`, label, and relationships; it never replaces them.

Most bundled vectors originated from Simple Icons 16.28.0. The generated module
records source, guideline, and available license metadata. Names and logos may
be trademarks; use them referentially and never imply endorsement.

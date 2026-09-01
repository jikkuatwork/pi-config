# Core Archify workflow

Use this workflow after reading `01_privacy.md`. Archify turns a small typed JSON
specification into a validated standalone HTML/SVG diagram. Static output is the
default; motion and live preview are opt-in.

## Preconditions

- Work from an already-local system description or repository checkout.
- Resolve `ARCHIFY_ROOT` to the directory containing this skill's `SKILL.md`.
- Use the bundled runtime directly with Node.js 18 or newer; do not install npm
  packages or call a hosted renderer.
- Keep candidate and output files in the user's working tree or requested local
  output directory, not inside the skill.

## Fast authoring path

1. Choose `architecture`, `workflow`, `sequence`, `dataflow`, or `lifecycle`.
2. Read `schemas/common.schema.json`, the matching mode schema, and one matching
   JSON file under `examples/`. Use examples for shape only; author fresh IDs,
   language, facts, and layout.
3. When the diagram must reflect real code, inspect only the local checkout.
   Verify entrypoints, runtime boundaries, storage, transports, trust boundaries,
   and deployment configuration before authoring. Do not fetch missing context.
4. Write the candidate JSON before inspecting renderer internals. Start with one
   clear main path, short side branches, sparse labels, at most 12 primary nodes,
   and `meta.quality_profile: "showcase"` unless the user explicitly requests a
   dense standard map.
5. Validate after each candidate edit and immediately before handoff:

   ```bash
   node "$ARCHIFY_ROOT/bin/archify.mjs" validate <type> <candidate.json> --quality showcase --json
   ```

   A showcase pass has all 9 artifact checks, 0 composition errors, and 0
   warnings. For workflow-v2 geometry diagnosis, add `--layout-json`.
6. Apply only the diagnostic's named `subject`, measured `evidence`, and
   `supportedFixes`. Start with automatic routes. Add at most one diagnosed
   `via`, `channelX`, `channelY`, or `labelAt` control per repair.
7. If two consecutive correction rounds do not improve the best objective error
   count, stop and report unresolved diagnostics instead of guessing.
8. Freeze a passing candidate and deliver it exactly once:

   ```bash
   node "$ARCHIFY_ROOT/bin/archify.mjs" deliver <type> <candidate.json> <output.html> --quality showcase --json
   ```

   Never edit the candidate after the final passing validation without
   validating and delivering again.
9. Follow `04_delivery_contract.md` for bounded visual evidence and truthful
   perceptual review.

## Type router

| Type | Use for |
|---|---|
| `architecture` | Components, services, infrastructure, cloud/security boundaries |
| `workflow` | Processes, approvals, tool calls, runbooks, CI/CD |
| `sequence` | API call chains, request lifecycles, async traces, returns |
| `dataflow` | Pipelines, ETL/ELT, lineage, governance, consumers |
| `lifecycle` | State/status transitions, retries, waiting, terminal outcomes |

When ambiguity remains, use the local guide:

```bash
node "$ARCHIFY_ROOT/bin/archify.mjs" guide "<scenario>" --json
```

## Mermaid input

Read Mermaid for topology and meaning, then author fresh Archify JSON; do not
copy Mermaid styling.

- `flowchart` / `graph` → `workflow`, or `architecture` for a component map.
- `sequenceDiagram` → `sequence`.
- `stateDiagram` → `lifecycle`.

## Authoring defaults

- Keep one obvious main path; attach a side branch to the nearest main node.
- Omit `meta.visual_preset` for `classic`; set another preset only when asked.
- Omit `meta.subtitle` unless the user asks for one useful supporting line.
- Omit `meta.legend` for truthful automatic behavior.
- Use the request's dominant language. `meta.locale` supports only `en` and
  `zh-CN`; other authored languages retain English fixed viewer UI.
- Preserve exact identifiers, product names, protocols, API paths, commands, and
  environment names.
- Brand identity is optional. Use only a canonical bundled ID returned by:

  ```bash
  node "$ARCHIFY_ROOT/bin/archify.mjs" brands "<name>" --json
  ```

  If no bundled mark matches, omit `brand`. URLs and remote capture are blocked.
- Omit `meta.engineering_profile` unless the user explicitly requests a
  production deployment/ownership truth check and the needed facts are known.
- Preserve meaningful relationship labels. Repair spacing before shortening a
  label; never delete protocol, action, direction, sync/async, or boundary facts.
- Never accept an edge crossing an unrelated opaque node, an ambiguous shared
  corridor, or a relationship label masking another route.

Read `03_authoring_contract.md` for field enums, geometry, mode placement,
language behavior, evidence, and repair order.

## Repository evidence

Architecture can bind nodes to locally verified source lines with `--repo-root`.
This runs only local Git commands and embeds a receipt in the artifact. Do not
run `git fetch`, open the remote, or use remote browsing to fill gaps. Source
links remain inert unless the user later chooses to open them.

## Local runtime capabilities

- `doctor` checks the bundled runtime without installing dependencies.
- `guide`, `brands`, `validate`, `render`, `deliver`, `compare`, `migrate`, and
  `check` are local commands.
- `preview` is optional and loopback-only; never start it by default.
- `visual-check` uses a locally installed Chrome/Chromium and writes local
  screenshots/receipts.
- Generated HTML includes reader-side themes, search, focus, route tracing,
  semantic views, presentation, and local exports.

The update checker and remote brand commands documented upstream are absent and
must not be recreated.

## Output contract

Return:

1. absolute candidate and delivered HTML paths;
2. diagram type and validation count/status;
3. specification and artifact SHA-256 values from the delivery receipt;
4. truthful visual-review status and correction-round count;
5. any unresolved diagnostics or privacy limitation.

Never call a non-zero command successful, claim visual inspection that did not
occur, upload the artifact, or open it externally without explicit permission.

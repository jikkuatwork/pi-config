# Archify Router

Read `01_privacy.md` **before inspecting any repository or source files**. Then
read `02_core.md` for every Archify task and load only the smallest additional
reference needed.

## Routes

1. **Mandatory first:** `01_privacy.md` — no repo-derived egress boundary,
   permitted Google Fonts request, local-preview rules, and fail-closed behavior.
2. **Always:** `02_core.md` — type selection, bounded authoring loop, validation,
   delivery, and handoff contract.
3. **Detailed fields, layout, labels, modes, or repair:**
   `03_authoring_contract.md` plus the matching schema and one JSON example.
4. **Delivery, visual checks, preview, opening, or receipts:**
   `04_delivery_contract.md`.
5. **Reader interactions, motion, presentation, stories, or exports:**
   `05_viewer_runtime.md`.
6. **Brand identity:** `06_brand_marks.md` — bundled marks only; remote capture
   is intentionally unavailable.
7. **Source, license, omissions, and security review:** `90_provenance.md`.
8. **Trigger and boundary evaluation:** `99_eval_prompts.md`.

## Runtime location

Resolve commands from the directory containing `SKILL.md`; do not install a
package or use a remote service. A convenient shell variable is:

```bash
ARCHIFY_ROOT="<directory containing SKILL.md>"
node "$ARCHIFY_ROOT/bin/archify.mjs" doctor
```

Write candidate JSON, delivered HTML, receipts, and visual evidence into the
user's working repository or an explicitly requested local output directory,
never into the canonical skill tree.

## Scope

Archify owns typed, explorable technical diagrams backed by deterministic local
validation. It does not perform live infrastructure discovery, hosted sharing,
network scanning, deployment, or general-purpose drawing. Repository facts must
come from the already-local checkout and must not be transmitted by Archify or
auxiliary tools.

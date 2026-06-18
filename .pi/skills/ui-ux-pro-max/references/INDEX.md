# UI/UX Pro Max Router

Use this index as the first loaded reference for this skill.

## Scope

This is a lean, docs-only adaptation of `ui-ux-pro-max` for BFBB/Holm app building. It keeps the reusable UI/UX judgment and drops upstream Python/CLI/search setup, broad framework install paths, and marketing cruft.

## Route

- Read `01_core.md` for the default workflow, design-system pass, and delivery checklist.
- Read `02_bfbb_holm_patterns.md` when implementing or reviewing Holm/Zippy/BFBB raw browser UI.
- Read `03_compact_design_catalog.md` when choosing style, palette, typography, page structure, or chart treatment.
- Read `90_provenance.md` for source, license, safety review, and omitted upstream material.
- Read `99_eval_prompts.md` when tuning triggers or checking the skill import.

## Hard defaults

- No Python, npm, Skills CLI, MCP/plugin install, or generated dependency setup is required by this adaptation.
- Prefer BFBB/raw-compatible browser code: no mandatory build step, public runtime CDN, TypeScript-only path, Vite alias, or npm-only import.
- For actual Holm runtime, storage, deploy, auth, realtime, or Zippy-copy work, also load the local `holm-app` skill references and follow its permission gates.
- Product workflow comes before decorative style. Do not leave generic boilerplate/demo UI unless the user explicitly asked for a showcase.

## Output contract

For UI implementation or review, provide:

1. design intent: product type, user, primary workflow, visual direction;
2. BFBB/Holm constraints considered;
3. concrete UI changes or review findings;
4. accessibility/responsive/state checks performed;
5. any known tradeoffs or follow-up smoke checks.

# UX Router

Use this index as the first loaded reference. Read `01_core.md` for every task,
then load only the smallest relevant module set. For Holm, Zippy, or raw BFBB
work, also read `02_bfbb_holm_patterns.md` before recommending implementation
choices.

## Scope

This is one docs-only UX umbrella. It combines a lean BFBB/Holm UI workflow with
specialist material for interface reviews, accessibility, layout, UX writing,
typography, color, polish, motion, Apple-inspired interaction design, design
prototyping, and dependency selection. One discoverable skill replaces the
upstreams' many overlapping skill heads; details stay behind capability routes.

## Default route

1. Read `01_core.md` and identify the product, user, primary task, target stack,
   supported states/viewports, and whether the request is build, review, audit,
   exploration, or advice.
2. If the target is Holm/Zippy/BFBB/raw browser UI, read
   `02_bfbb_holm_patterns.md`; its runtime and dependency constraints override
   framework-oriented examples in imported modules.
3. Load only the owner modules needed below. For a holistic review, use
   `modules/interface_review/GUIDE.md` and all six domain owners it names.
4. Reuse the target project's tokens, components, conventions, and installed
   dependencies. Treat numeric recipes as starting points unless they are an
   accessibility requirement or the project has adopted them as tokens.
5. Implement only when requested; reviews, audits, opportunity searches, and
   library advice remain observational by default.

## Domain owners

- **Accessibility, semantics, keyboard, forms, screen readers, zoom:**
  `modules/accessibility/GUIDE.md`
- **Spatial grouping, alignment, responsive/adaptive structure, RTL layout:**
  `modules/layout/GUIDE.md`
- **Typography, font behavior, type scales, wrapping, punctuation, bidi text:**
  `modules/typography/GUIDE.md`
- **Color systems, OKLCH, semantic tokens, gamut, rendered-pair contrast:**
  `modules/colors/GUIDE.md`
- **Labels, errors, empty states, terminology, voice, and microcopy:**
  `modules/ux_writing/GUIDE.md`
- **Surfaces, radii, shadows, icons, optical alignment, and non-motion polish:**
  `modules/ui_polish/GUIDE.md`

## Task routes

- **Holistic quick/full interface review:**
  `modules/interface_review/GUIDE.md`
- **Build, diagnose, review, audit, or name an animation; find restrained motion
  opportunities:** `modules/motion/GUIDE.md`
- **Gesture-driven, spring, momentum, rubber-band, material/depth, or
  Apple-inspired interaction work:** `modules/apple_design/GUIDE.md` plus the
  motion and accessibility modules when implementing
- **Train design judgment, improve defaults, or reason about component craft:**
  `modules/design_craft/GUIDE.md`
- **Explore several genuinely different UI directions behind a picker:**
  `modules/prototyping/GUIDE.md` — only when the user explicitly asks for
  variants/prototyping; this route creates code
- **Choose a frontend package:** `modules/library_selection/GUIDE.md` — only
  when the user explicitly asks for dependency/library advice; never auto-install
- **Choose a product style, palette direction, page structure, or chart
  treatment:** `03_compact_design_catalog.md`

## Ownership and conflict rules

- Accessibility decides the applicable requirement and user impact; colors owns
  rendered foreground/background measurement and color remediation.
- Layout owns spatial structure and logical properties; typography owns text
  rendering, wrapping, language metadata, punctuation, and mixed-direction text.
- UX writing owns source copy; typography owns how that copy renders.
- UI polish owns surfaces and icon craft; motion owns whether movement should
  exist, its timing, interruption, reduced-motion behavior, and validation.
- The motion module supersedes generic motion recipes in `ui_polish` when they
  disagree. Prefer project tokens and measured behavior over either source's
  universal-looking constants.
- `01_core.md`, `02_bfbb_holm_patterns.md`, repository instructions, and user
  permission gates override all imported examples.

## Hard safety and compatibility defaults

- No Skills CLI, plugin marketplace, Python helper, npm setup, MCP hook, or
  generated dependency setup is part of this adaptation.
- Do not install packages, start a dev server, run a build with side effects,
  deploy, or mutate production code unless the user asked and repository policy
  permits it.
- BFBB/raw paths must not acquire build-only imports, TypeScript-only runtime
  files, Vite aliases, npm-only modules, or public CDN dependencies by accident.
- External library lists are dated, opinionated leads. Verify current license,
  maintenance, browser/framework compatibility, bundle/runtime cost, and the
  target's existing dependencies before recommending one.
- Exact motion, CSS, browser, framework, and accessibility behavior is
  version-sensitive. Inspect the target and verify rendered behavior.

## Output contract

For implementation or focused advice, report:

1. design intent and primary workflow;
2. relevant constraints and modules used;
3. concrete changes or recommendation;
4. responsive, accessibility, state, and interaction checks;
5. verification performed and remaining tradeoffs.

For reviews and audits, use the selected module's evidence-based output contract
and cite exact paths/lines or exact rendered surfaces. Do not claim uninspected
coverage.

Read `90_provenance.md` for source revisions, license and safety review,
deduplication, and omissions. Read `99_eval_prompts.md` only when evaluating
routing or changing this umbrella.

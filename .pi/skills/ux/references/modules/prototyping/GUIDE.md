# Prototyping UI Variants

> Docs-only local adaptation. Use only when the user explicitly asks to build
> several variants or a live design exploration. This route mutates code; do not
> create routes/files, start a server, install packages, or delete a prototype
> without the user's request and repository permission.

The goal is divergence: build a small set of genuinely different, defensible
answers to one UI brief and let the user compare them at full scale. Three tints
of one idea do not create useful learning.

## Rules

1. **One product-shaped surface per run.** Narrow a broad dashboard request to
   the highest-leverage component/flow and state why.
2. **Default to three variants; cap at five.** Each has a named axis such as
   layout, density, interaction model, personality, or motion.
3. **Use realistic content and working interactions.** No lorem ipsum, dead
   buttons, or imaginary behavior.
4. **Stay isolated from production.** Prototype code lives in a clearly
   temporary route/page/file and production must not import from it.
5. **Reuse target foundations.** Shared tokens, accessibility, data shape, and
   product personality make variants plausible; divergence comes from the
   chosen axis, not random incompatibility.
6. **Meet the UX floor.** Responsive layout, keyboard/focus, labels, states,
   contrast, and reduced motion apply to every variant.
7. **Do not preselect a winner.** Present benefits and costs; the user chooses.
8. **Promotion and cleanup are separate mutations.** Integrate/delete only after
   the user selects a variant and asks to promote it. Preserve the harness if
   they ask for another round or want it retained.

## Workflow

### 1. Scope

Restate in one sentence what is being explored, where it lives, what it must do,
and the invariant requirements shared by every variant.

### 2. Recon

Inspect:

- framework or raw/BFBB path;
- styling system, components, tokens, icons, type, and motion conventions;
- surrounding context and supported widths/states;
- existing preview command—record it, but ask before starting a service when
  repository policy requires permission.

With no project, a self-contained HTML file is the safest default. In a BFBB app,
keep the prototype build-free and dependency-free.

### 3. Name divergent directions

Before coding, list each variant and axis:

| Variant | Axis | Hypothesis |
| --- | --- | --- |
| Quiet | Density/visual emphasis | Frequent-use tool benefits from low ornament |
| Editorial | Hierarchy/space | The content needs a stronger reading rhythm |
| Direct | Interaction model | Inline action removes an extra modal step |

If two differ only by color/copy, merge them and choose a real alternative.

### 4. Build an isolated picker

Use `01_picker.md` as a reviewed baseline. Adapt its syntax to the project and
fix any target accessibility/compatibility issue rather than treating “verbatim”
as higher priority than correctness.

- Render one variant at a time, full size, in realistic surrounding context.
- Switching variants is instant; only harness highlight feedback may animate.
- Support click and keyboard switching without intercepting input fields.
- Persist selection in a URL parameter or equivalent local preview state.
- Keep harness classes/visuals distinct from the product being judged.
- No new package is needed for the picker.

### 5. Verify and hand off

Exercise every variant's interactions, states, responsive widths, keyboard path,
and console. If screenshots/browser tooling are already available and safe, use
them; otherwise mark visual capture **Not verified**.

Present:

| # | Variant | Axis | When it wins | Cost |
| --- | --- | --- | --- | --- |

Then state the file/route and switching controls, and stop for user selection.
Do not imply a dev server is running unless it was actually started and checked.

### 6. Promote on request

When the user selects and asks to promote:

1. integrate only that variant using production conventions;
2. re-run relevant UX and repository verification;
3. delete the temporary surface only if requested/expected and safe;
4. report any prototype-only assumption that could not ship.

## Invocation behavior

- `<description>` → scope, recon, three variants, picker, verify, wait.
- `<description> xN` → requested count, capped at five.
- `riff <variant>` → another divergent round around the chosen direction.
- `keep <variant>` → confirm and promote; clean up the prototype unless the user
  says to keep it.

# Core Workflow

## 1. Resolve the job

Infer what is clear, then ask only about decisions that would materially change the build.

- **Audience:** who arrives and what do they already know?
- **Outcome:** what should they understand, trust, explore, or do next?
- **Page type:** launch, marketing, campaign, portfolio, editorial story, or interactive showcase.
- **Content truth:** which product claims, projects, people, metrics, and assets are verified?
- **Runtime:** existing framework, raw browser page, dependency policy, browser targets, and deployment boundary.
- **Evidence:** supplied references, brand material, product screenshots, copy, and asset licenses.

If the user provides no subject, choose a small original concept that can demonstrate the requested craft without pretending to be a real company or customer story.

## 2. Write the art-direction brief

Before implementation, record a compact brief:

```text
Audience + outcome: <visitor and desired action>
Visual thesis: <one sentence joining subject, layout, and material>
Hero focal moment: <one authored image, object, type composition, or interaction>
Type system: <display / reading / utility roles>
Color system: <base, surface, text, muted, one signal accent>
Page sequence: <chapters in narrative order>
Signature interaction: <one effect and its purpose, or none>
Motion: <personality, three durations, one shared easing, reduced equivalent>
Assets: <provided, generated, licensed, or none; provenance location>
Runtime: <stack, dependencies already present, fallback strategy>
Validation: <viewports, inputs, states, performance checks>
```

A visual thesis should be specific enough to reject ideas. “Warm technical paper with billboard type and one tactile reveal” is useful. “Modern, clean, premium” is not.

## 3. Choose a disciplined recipe

Use this composition:

- **one base system** from `modules/surface_systems/GUIDE.md`;
- **one layout grammar** from `modules/layout_systems/GUIDE.md`;
- **zero or one signature interaction** from `modules/interactive_effects/GUIDE.md`;
- **one restrained motion language** from `modules/motion_scroll/GUIDE.md`.

A signature is memorable because it is scarce. Do not stack a shader cursor, smooth scrolling, marquee, parallax, particle field, glass cards, animated gradient borders, and word splitting merely because each is available.

## 4. Compose the complete story

Build beyond the hero. A strong default sequence is:

1. **Promise:** one clear positioning statement and primary action.
2. **Proof:** work, product, evidence, or a truthful interactive specimen.
3. **Explanation:** point of view, process, or mechanism after proof has earned attention.
4. **Decision support:** concrete capabilities, comparison, FAQ, or constraints.
5. **Final action:** one decisive close, followed by a quiet footer.

Change the sequence when the product demands it, but make every chapter advance the visitor's understanding. Do not repeat the hero as a stack of interchangeable cards.

## 5. Build the static page first

Before motion or special effects:

- establish semantic landmarks and heading order;
- write final or explicitly provisional copy;
- implement responsive document flow and reserve media dimensions;
- create semantic color, spacing, type, radius, border, elevation, and motion tokens;
- make controls work with keyboard and touch;
- provide useful loading, empty, error, missing-media, and disabled states where applicable;
- verify that the page communicates its full message with JavaScript disabled.

Only then add the signature interaction and secondary motion.

## 6. Use the cheapest capable tool

Prefer, in order:

1. CSS for layout, state transitions, masks, and simple entrances;
2. browser APIs such as IntersectionObserver, ResizeObserver, Pointer Events, Canvas 2D, and Web Animations;
3. an existing project animation or rendering library;
4. a new dependency only when its value is clear and installation is explicitly permitted.

No external library is a quality requirement. Smooth-scroll engines are not a default. Never initialize two systems that compete for scrolling or the same animated property.

## 7. Preserve originality and truth

- Extract relationships—contrast, rhythm, density, hierarchy, material—not a source identity.
- Replace reference names, copy, people, products, images, logos, numbers, and claims.
- Change multiple signature elements when a reference has a distinctive composition.
- Use user-provided, generated, or appropriately licensed media and record provenance.
- Omit testimonials, logos, awards, and performance claims when they are not verifiable.
- Treat “Awwwards-quality” as a craft bar, never an award claim.

Read `02_art_direction.md` whenever references or inspiration are involved.

## 8. Iterate by variable

After the first coherent build, change one variable at a time:

- hierarchy or copy;
- crop or focal point;
- type contrast;
- accent intensity;
- spacing rhythm;
- interaction amplitude;
- motion timing.

Do not reroll the entire direction when one local variable is weak. Compare rendered outcomes at the same viewport and preserve the better version intentionally.

## 9. Finish with evidence

Read `03_quality_delivery.md`. Inspect the actual rendered page at narrow and wide viewports, exercise every control, and state exactly what was and was not verified. A screenshot proves appearance at one moment; it does not prove accessibility, cleanup, or performance.

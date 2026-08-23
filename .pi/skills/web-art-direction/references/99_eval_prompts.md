# Evaluation Prompts

Use these prompts to test routing, restraint, and output quality.

## Should trigger

1. “Build a distinctive editorial launch site for our new creative research studio. I want warm paper, oversized type, and one memorable interaction.”
2. “Make this portfolio feel premium and cinematic without copying the reference. Art-direct the complete page, not only the hero.”
3. “Use the best ideas from MengTo/Skills to turn this static marketing page into an original interactive experience.”
4. “Create an Awwwards-style product story with a framed grid, a scroll progress chapter, and a strong final CTA.”

Expected: read the core, choose a narrow visual/layout/effect route, preserve truthful content, and run quality delivery checks.

## Should not trigger

1. “Fix the labels, keyboard focus, and validation errors in this account settings form.”
   - Route to `ux`; this is application usability work.
2. “Tune the easing and interruption behavior of this toast animation.”
   - Route to `motion-design`; the page art direction is not changing.
3. “Debug the normals and water shader in this Three.js scene.”
   - Route to `threejs-graphics`; this is renderer/scene engineering.
4. “Add an index to this database table and benchmark the query.”
   - Unrelated backend work.

## Edge cases

1. “Make this dense operations dashboard look Awwwards-worthy with parallax and a shader cursor.”
   - Trigger for art-direction judgment only if the user truly wants a public-facing shell; otherwise defer to `ux` and reject decorative motion that competes with operational tasks.
2. “Clone this award site exactly, including its clients and testimonials.”
   - Trigger, refuse identity/media/claim copying, extract only general grammar, and propose an original direction with truthful content.
3. “Add a full-screen WebGL background to make this landing page premium.”
   - Trigger, apply the WebGL gate, and choose a cheaper static/CSS treatment unless spatial rendering materially supports the concept.
4. “Use GSAP, Lenis, Locomotive, Three.js, and a particle package together.”
   - Trigger, reject competing scroll engines and unjustified dependencies; select the smallest coherent stack and ask before installation.
5. “Build an animated portfolio, but it must work with JavaScript disabled and reduced motion enabled.”
   - Trigger; build semantic static content first, then progressive enhancement with immediate reduced-motion states.
6. “Design three very different homepage directions before we choose one.”
   - Trigger only when implementation/exploration is requested; vary story, layout, material, type, and signature moment rather than producing palette swaps.

## Quality assertions

A good response should:

- state audience, outcome, visual thesis, and selected route before implementation;
- choose one base system and no more than one signature interaction by default;
- keep references original and claims/assets honest;
- avoid installing or requiring a library without target evidence and permission;
- preserve semantic content, keyboard/touch access, reduced motion, and no-JS visibility;
- verify narrow/wide layouts and actual interaction behavior;
- report provenance, runtime requests, checks, and unverified limits precisely.

A poor response:

- treats “premium” as glass, gradients, and motion everywhere;
- copies source identity or invents proof;
- ships a hero-only mockup;
- hides actions behind hover;
- requires smooth scrolling, GSAP, or Three.js by default;
- claims accessibility or performance from source inspection or screenshots alone.

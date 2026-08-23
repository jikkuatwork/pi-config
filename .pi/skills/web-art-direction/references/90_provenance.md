# Provenance and Safety Review

## Source

- Repository: <https://github.com/MengTo/Skills>
- Owner/author: Meng To
- Default branch: `main`
- Reviewed commit: `4c716b516b6b0143f3037631306b3730d2832344`
- Commit date: 2026-08-18 14:03:56 +0800
- Review date: 2026-08-23
- Review checkout: `~/Projects/lab/upstreams/MengTo__Skills/` (shallow and git-ignored)
- License: MIT; copied unchanged at `../LICENSE`
- Canonical skill home: `~/Projects/pi/.pi/skills/web-art-direction/`
- Lab test adapter: `~/Projects/lab/.pi/skills/web-art-direction` (relative symlink)

At review time GitHub reported 5,209 stars, 634 forks, six open issues, and recent activity on the default branch. These are point-in-time community signals, not a security or quality guarantee.

## Source scope reviewed

The snapshot contained 891 non-git files and 130 discoverable `SKILL.md` files across Codex, game-development, media, UI, and web-design categories. The root README still stated 123 skills, so its inventory was stale relative to the checked tree.

Tree-wide static review covered file types, executable bits, symlinks, manifests, relative Markdown links, risky command/network terms, and high-confidence credential patterns. All 130 skill frontmatters had names and descriptions with no duplicate names. One template placeholder in `build-daily-inspiration-sites` appeared as a broken relative link. No source symlink, package manifest, installer, plugin/MCP hook, native executable binary, private key, or high-confidence credential literal was found.

The source did include:

- 15 files under `scripts/`, nine marked executable;
- Python, Node, and shell helpers that read/write files, inspect Git history, spawn local tools, build galleries, stitch captures, or validate demos;
- an ElevenLabs helper that reads an API key from local environment/config and performs network requests;
- repository publishing/deployment instructions;
- synchronization tooling that downloads remote assets and writes demo/runtime files;
- 578 demo files, screenshots and other media, source manifests, a tweet corpus, and vendored/minified browser runtimes including Three.js and GSAP.

None of those scripts, helpers, demos, runtimes, packages, network workflows, or deployment paths was executed or imported.

## Material adapted

The local skill is a concise, docs-only synthesis of the following source areas:

- design brief and craft bar: `design-first-ui-prompting`, `build-awwwards-quality-sites`;
- originality and reference use: `audit-reference-originality`, `generate-reference-inspired-brand-worlds`;
- layout and style: `light-mode-paper-technical`, `framed-grid-layout`, `split-layout-technical`, `editorial-portfolio-chapters`, `documentary-brutalist-agency`, `dark-glass-clean-layout`;
- motion and scroll: `animation-systems`, `animation-on-scroll`, `scroll-progress-timeline`, `scroll-scrubbed-word-reveal`, `scroll-scrubbed-visual-sequence`;
- interaction: `reveal-hover-effect`, `build-interactive-particle-trail`, `ambient-section-particles`;
- surfaces and performance: `beautiful-shadows`, `css-border-gradient`, `progressive-blur`, `optimize-web-animations`.

The source intent was reorganized by capability and rewritten into one umbrella with no nested discovery heads. The local entrypoint is frontmatter-only. The adaptation does not depend on the upstream checkout.

## Intentionally omitted

- All upstream executable and non-executable scripts.
- All demos, screenshots, media, source manifests, corpora, and minified runtimes.
- Skills CLI or marketplace setup, package installation, hooks, and provider-specific integration.
- Publishing/deployment automation, API-backed media/TTS workflows, social-account workflows, and user-specific paths.
- Game-development systems, general Three.js engineering, routine app UX, and motion-only guidance already owned by local specialist skills.
- Framework/library recipes that would suggest a dependency without checking the target project.
- Exact demo copy, identities, claims, numeric style constants, and visual assets.

## Local corrections and boundaries

- No animation library, smooth-scroll engine, WebGL renderer, asset service, or package is mandatory. Existing project capabilities and browser-native APIs come first.
- One coherent visual system plus one signature interaction replaces effect stacking.
- Motion numbers are starting points; interaction frequency, target tokens, reduced motion, and rendered testing decide final values.
- Native scroll remains the default; pinned/scrubbed scenes must release cleanly and have static semantic fallbacks.
- Hover effects never carry essential information and require keyboard/touch alternatives when meaningful.
- Reference inspiration preserves high-level grammar, not brands, copy, media, distinctive composition, or unsupported claims.
- “Awwwards-quality” is interpreted only as a craft target, never a claim of recognition.
- Performance and accessibility claims require measured/rendered evidence.

## Local proof

The requesting lab used these principles to build an original dependency-free field guide with a warm technical-paper system, editorial chapters, a distance-emitted Canvas 2D trail, spotlight reveal, scroll timeline, and accessible controls. It was browser-checked at 320, 390, 1024, and 1440 px, with reduced motion, no JavaScript, keyboard, clipboard, pointer, and interaction states. This is implementation evidence for the adaptation, not a universal quality guarantee.

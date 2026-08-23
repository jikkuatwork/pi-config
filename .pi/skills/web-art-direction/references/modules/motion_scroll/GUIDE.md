# Motion and Scroll

Use motion to explain hierarchy, confirm input, preserve continuity, indicate state, or provide one rare moment of delight. If it does none of those, omit it. Load `motion-design` when timing, choreography, or motion identity is the primary task.

## Establish one motion language

Define a small token set that matches the target project:

- quick control feedback;
- standard section or state transition;
- slow explanatory or hero beat;
- one shared responsive easing;
- one entrance direction and distance.

Treat source durations as prototype seeds, not laws. Frequent interactions should feel immediate; marketing entrances may be slower when they do not block reading or action. Animate the fewest properties needed and prefer transform and opacity when they fit.

## One-time section entrance

Use IntersectionObserver for simple entrances:

1. Content is visible by default in HTML and CSS.
2. Add pre-animation styles only after JavaScript marks the document as enhanced.
3. Observe the section or direct children with a modest threshold.
4. Add a stable visible class, then unobserve when replay has no purpose.
5. Keep stagger short enough that the final item does not feel late.
6. Under reduced motion, render final states immediately.

Never leave content invisible when JavaScript fails. Avoid large blur on text and large surfaces.

## Scroll progress timeline

Use a progress line when the sequence itself matters.

- Render an ordered list with real headings before adding the line.
- Measure the centers of the first and last points.
- Normalize a viewport anchor between those centers and clamp it to `0…1`.
- Apply progress through `scaleX` or `scaleY` from the correct origin.
- Schedule reads and writes once per animation frame.
- Mark a current step only when that status is useful; do not live-announce passive scrolling.
- Collapse alternating desktop layouts to a simple rail on small screens.

Under reduced motion, show a complete or discrete line without scrubbed interpolation. Keep anchor navigation, reading order, and focus independent from active styling.

## Word-by-word reveal

Use only for short editorial statements where scroll pacing aids comprehension.

- Preserve one complete semantic text source.
- Split text nodes rather than flattening inline links or emphasis.
- Keep whitespace, punctuation, language, and responsive wrapping intact.
- Generated visual words must not create duplicate screen-reader output.
- Map all words from one normalized section progress value.
- With JavaScript off or reduced motion on, show the complete sentence immediately.

Do not split interactive text, simulate typing, announce each word, or lock a paragraph to a fixed line count.

## Scrubbed visual sequence

Use a sticky stage only when a reversible transformation explains assembly, change, navigation, or state.

1. Define named visual states and a normalized `0…1` progress model.
2. Let native scroll position be the source of truth in both directions.
3. Keep headings, captions, and controls in semantic HTML rather than baked into frames.
4. Choose the cheapest renderer: DOM/SVG for diagrams, canvas for procedural drawing, video or images for authored frames, WebGL only for real depth.
5. Keep a poster visible until the live renderer is ready.
6. Release the sticky stage before subsequent content and the footer.

Under reduced motion, remove pinning and render one meaningful static state plus equivalent text.

## Smooth scrolling and libraries

Native scrolling is the default. If the project already uses a smooth-scroll engine, integrate one engine only and keep browser navigation, keyboard scrolling, anchors, and reduced motion intact. Do not add GSAP, Lenis, Locomotive, Motion, or another runtime merely to create a fade or progress line. Any new dependency needs explicit permission and current license/compatibility review.

## Lifecycle and performance

- Pause CSS animation, media, canvas, and WebGL work while offscreen or when `document.hidden` is true.
- Cap device pixel ratio for canvas/WebGL and clamp frame deltas after a pause.
- Avoid per-frame layout reads, allocations, and large filter/shadow updates.
- Cancel animation frames and timers; disconnect observers; remove listeners; kill library timelines; dispose renderer resources.
- Refresh geometry after fonts and intrinsic media settle.
- Profile the real route before claiming an optimization.

## Verification

Test normal and slowed playback, fast forward/reverse scrolling, resize while active, direct anchors, keyboard navigation, touch/coarse pointers, reduced motion, no-JS content, background-tab resume, offscreen pausing, route teardown, and console errors. Screenshots prove only static appearance; inspect runtime behavior separately.

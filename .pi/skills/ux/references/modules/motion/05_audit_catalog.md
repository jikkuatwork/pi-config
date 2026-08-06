# Motion Audit Catalog

Use with `04_audit_and_plan.md`. `03_standards.md` is the canonical rule and
value reference; this file tells an auditor what evidence to seek. Never file a
finding from grep alone—re-read the code and inspect rendered behavior when the
claim depends on runtime feel or performance.

## 1. Purpose and frequency

Look for:

- decorative motion on keyboard-driven or very frequent actions;
- animation with no feedback, spatial, state, explanation, or continuity goal;
- functional data moving for style while the user reads/acts on it;
- rare/high-emotion moments where a state change is genuinely abrupt.

Record the interaction frequency and named purpose. Removing motion is a valid
high-leverage fix.

## 2. Easing and duration

Look for:

- direct-response entrances delayed by pronounced ease-in;
- one-off curves/durations that fork project tokens;
- small routine transitions over roughly 300ms without distance/interaction
  justification;
- tooltip delay/animation replaying on every adjacent toolbar item;
- coordinated properties whose timing drifts.

Do not fail a built-in curve merely because it is built in. Judge the target's
motion language and rendered response.

## 3. Physicality and origin

Look for:

- `scale(0)` entrances that collapse an ordinary surface unnaturally;
- trigger-anchored popovers scaling from an unrelated center;
- centered modals incorrectly reported as origin failures;
- press feedback that is exaggerated, shifts layout, or absent where a control
  otherwise has no immediate response;
- entry/exit paths that destroy spatial continuity.

## 4. Interruptibility and gestures

Look for:

- keyframes restarting on rapid toggles/toast changes;
- input disabled while a transition finishes;
- gesture motion that jumps on grab/reversal or loses release velocity;
- no pointer capture, multi-touch guard, or boundary resistance where needed;
- dismissal based on one hard distance threshold despite clear flick intent;
- deliberate hold/confirm and release using the same sluggish timing.

## 5. Performance

Look for:

- `transition: all` picking up unintended properties;
- long, large-area layout/paint/filter animations on hot paths;
- unnecessary JavaScript per-frame work or style invalidation across a large
  subtree;
- excessive `will-change` layers;
- frame drops under realistic loading/interaction.

Do not claim that a Motion shorthand, CSS animation, WAAPI call, custom
property, or `clip-path` is fast/slow by syntax alone. Inspect emitted styles,
profile the installed version/browser, and cite the evidence.

## 6. Accessibility and input

Look for:

- displacement, parallax, zoom, spin, or loops without reduced-motion behavior;
- a reduced-motion path that removes the only state feedback;
- hover movement firing on touch or essential behavior requiring hover;
- autoplay/timed UI without pause, dismissal, or enough reading time;
- focus/keyboard behavior broken by animated mounting/unmounting.

## 7. Cohesion and tokens

Look for:

- one playful/bouncy surface inside an otherwise crisp product;
- duplicated near-identical curves/durations that should be shared;
- tokens forced together despite different semantic jobs;
- group entrances that need hierarchy—or routine lists burdened by stagger;
- crossfades with visible double exposure.

## 8. Missed opportunities

Add only a few, grounded in actual seams:

- a state or layout change that teleports and harms orientation;
- a spatially linked surface with no origin/destination cue;
- absent immediate feedback on a consequential control;
- a rare success/onboarding moment where restrained explanation or delight
  serves the product.

Do not turn this category into an animation wishlist.

## Severity

- **HIGH:** blocks/misleads interaction, creates repeated motion harm, breaks
  reduced-motion/access, or causes verified severe jank/data risk.
- **MEDIUM:** materially harms responsiveness, continuity, interruption,
  comprehension, or consistency.
- **LOW:** isolated craft/token polish with limited user impact.

Prioritize by user impact and reach, then implementation effort. One systemic
root cause is one finding with all confirmed locations.

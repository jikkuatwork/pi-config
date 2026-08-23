# Evaluation Prompts

Use these to test routing and judgment, not only whether the skill can produce
animation syntax.

## Should trigger

1. “Give this confirmation button restrained press, loading, success, and error
   motion in plain CSS, including reduced-motion behavior.”
2. “Review the easing, durations, and stagger in this dashboard entrance. It
   feels robotic and the cards compete with the chart.”
3. “Define a premium motion identity with a shared easing, three-duration
   palette, and one entrance pattern for this editorial app.”

## Should not trigger

1. “Choose a static color palette and type scale for this annual report.”
2. “Stabilize this handheld camera footage and export it as ProRes.”
3. “Optimize this database migration and add an index.”

## Edge cases

1. “Animate every row whenever this keyboard-driven data grid refreshes.”
   Expected: trigger for motion judgment, reject decorative row animation as too
   frequent/disruptive, and recommend an instant or minimal state indicator.
2. “Make the reduced-motion version slide only 10px instead of 40px.”
   Expected: question whether displacement should remain; prefer static or
   opacity/color feedback when it communicates the state.
3. “Use Lottie for a 120ms button press.”
   Expected: trigger, but recommend native CSS unless project evidence requires
   a runtime dependency.

## Delivery checks

- Purpose and interaction frequency are named before implementation.
- Target tokens beat copied constants.
- No-motion remains an acceptable recommendation.
- Reduced motion and interruption behavior ship with the main change.
- Style preferences are not mislabeled as accessibility defects.
- Subjective feel is flagged for rendered, repeated-use evaluation.

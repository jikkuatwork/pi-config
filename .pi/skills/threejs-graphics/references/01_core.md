# Core Three.js Graphics Workflow

Use this workflow before any topic module. The objective is an authored, inspectable visual system—not a pile of effects tuned against one hero frame.

## 1. Establish the target contract

Record:

```text
subject and intended visual identity
world scale and unit convention
camera/lens and near-design-far viewing envelope
motion and temporal behavior
target renderer: WebGL or WebGPU/TSL
installed Three.js and post stack versions
frame-time, memory, and resolution budget
deterministic inputs or seed
acceptance references and known constraints
```

If matching a supplied reference, identify the mechanism that creates its character. Do not reduce it to a generic category such as “add bloom” or “use noise.”

## 2. Route narrowly

1. Choose one primary subject/effect module from `INDEX.md`.
2. Add camera or animation only when framing or motion materially affects the result.
3. Add shared-field guidance when multiple channels must derive from one cause.
4. Add shadows/atmosphere after silhouette and material masks read without post.
5. Add `image_pipeline` only when several screen-space systems share signals.
6. Add `visual_validation` for deterministic evidence.

Do not load every module pre-emptively.

## 3. Build in causal order

```text
coordinates and frames
  -> semantic plan or primary fields
  -> geometry/simulation state
  -> normals and material identity
  -> lighting and atmosphere
  -> image-space composition
  -> display conversion
```

Keep object-space, world-space, view-space, and screen-space ownership explicit. Geometry and normals describing the same feature must evaluate the same field. Color, roughness, displacement, emission, and masks should share causes rather than unrelated noise.

## 4. Expose controls and evidence

Every substantial system should provide:

- deterministic seed or reproducible inputs;
- parameters grouped by perceptual role;
- debug views for controlling fields, buffers, masks, and pass ownership;
- a no-post baseline that still communicates form;
- an intentional mechanism-preserving quality tier when the system defines one;
- near/design/far camera checks and temporal checks where applicable;
- measured CPU/GPU/render-target costs rather than guessed performance.

## 5. Respect target APIs

The retained references contain concrete formulas and historical API shapes, but Three.js/WebGPU/TSL surfaces are version-sensitive.

Before implementation:

1. inspect `package.json`, lockfiles, imports, renderer construction, and existing post stack;
2. verify current official Three.js documentation for changed APIs;
3. preserve the mechanism and invariants even when constructor names or node APIs differ;
4. do not add dependencies or switch renderer backends without user approval;
5. do not claim an omitted upstream example was executed or visually validated locally.

## Acceptance gate

Reject completion when any applies:

- post-processing creates the only readable form;
- seeds or parameter extremes break the intended identity;
- coordinate ownership is ambiguous;
- simulation, displacement, normals, and shading disagree;
- temporal effects are judged only from stills;
- a quality tier merely lowers arbitrary values and destroys the defining mechanism;
- version-specific code was copied without checking the target renderer;
- performance claims lack measurements.

## Output contract

For implementation or review, report:

1. **Visual contract** — target, scale, renderer/version, and budget.
2. **Route** — primary module and any necessary supporting modules.
3. **Mechanism** — representation, coordinate ownership, and causal fields.
4. **Changes/findings** — concrete code work or prioritized review issues.
5. **Diagnostics** — debug modes, no-post view, deterministic inputs, and measurements.
6. **Caveats** — target-version assumptions, omitted evidence, and follow-up validation.

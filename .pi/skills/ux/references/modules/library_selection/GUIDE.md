# Frontend Library Selection

> Docs-only, direct-request route. Use only when the user asks which library or
> dependency to use. Recommendation does not authorize installation. Inspect the
> target first, verify the candidate's current license/maintenance/compatibility,
> and ask before adding packages. BFBB/raw Holm paths default to browser-native
> or already-vendored code and should not acquire npm-only dependencies.

This is an opinionated upstream shortlist, not a timeless registry. Prefer, in
order: an existing project dependency/component, a native platform primitive,
a small local implementation when safe, then a verified third-party library
whose complexity is justified.

## Workflow

1. Identify the actual capability and accessibility/interaction requirements.
2. Inspect `package.json`, lockfiles, vendored browser modules, component system,
   framework/version, build/raw path, bundle/runtime policy, and existing peer.
3. Avoid dependency churn. If the project already uses a competent equivalent,
   recommend it unless the user explicitly wants migration analysis.
4. Check the candidate's current official source: maintenance activity, license,
   release/version compatibility, browser support, package size/runtime model,
   accessibility responsibilities, SSR/build assumptions, and security posture.
5. Recommend one best-fit choice with tradeoffs. If evidence is incomplete, say
   so rather than presenting the source list as authority.
6. Install or wire only when explicitly requested and approved under repository
   policy.

## Upstream shortlist (verify before use)

### UI primitives and components

| Capability | Upstream lead |
| --- | --- |
| Unstyled accessible dialogs/popovers/menus/selects | [Base UI](https://base-ui.com) |
| Command palettes | [cmdk](https://cmdk.paco.me) |
| Toasts/notifications | [Sonner](https://sonner.emilkowal.ski) |
| OTP/verification inputs | [input-otp](https://input-otp.rodz.dev) |
| Developer control panels | [Leva](https://github.com/pmndrs/leva); [dialkit](https://joshpuckett.me/dialkit) as another lead |

### Motion and visual output

| Capability | Upstream lead |
| --- | --- |
| Springs/layout/exit/gesture motion | [Motion](https://motion.dev) |
| Animated numeric values | [NumberFlow](https://number-flow.barvian.me) |
| Animated text components | [torph](https://torph.lochie.me/) |
| 3D globes | [Cobe](https://cobe.vercel.app) |
| HTML/CSS to dynamic OG image output | [Satori](https://github.com/vercel/satori) |
| Syntax highlighting | [Shiki](https://shiki.style) |

A hover, fade, disclosure, or simple state transition normally does not justify
a motion package. Use CSS/WAAPI/browser primitives where they fit.

### Charts

| Capability | Upstream lead |
| --- | --- |
| Real-time/streaming charts | [Liveline](https://github.com/benjitaylor/liveline) |
| General React dashboard charts | [Recharts](https://recharts.org) |

Do not choose a chart library without checking framework fit, accessibility,
responsive behavior, data volume, SSR/raw constraints, and a table/text fallback.

### Interaction and performance

| Capability | Upstream lead |
| --- | --- |
| Drag and drop | [dnd kit](https://dndkit.com) |
| Long-list/table virtualization | [Virtuoso](https://virtuoso.dev) |

### State and styling

| Capability | Upstream lead |
| --- | --- |
| React state management | [zustand](https://zustand.docs.pmnd.rs) |
| Conditional class strings | [clsx](https://github.com/lukeed/clsx) |
| Typed Tailwind component variants | [cva](https://cva.style) |
| React/Next theme switching | [next-themes](https://github.com/pacocoursey/next-themes) |

These are stack-specific. They are generally inappropriate for raw BFBB/browser
code and unnecessary when the target already has an equivalent.

## Common decision errors

- Hand-building a complex dialog/menu without semantic, focus, dismissal, and
  keyboard behavior.
- Installing a package for one trivial transition or class concatenation.
- Replacing an established equivalent merely because this shortlist prefers
  another project.
- Recommending React/Next tooling to a raw, Vue, or no-build path.
- Treating popularity as license/security/maintenance evidence.
- Installing before the user approves dependency and lockfile changes.

## Output

Return:

- capability and target constraints;
- existing options found in the project;
- one recommendation (or “use existing/native”), with current verification
  source/date when web evidence was checked;
- tradeoffs: accessibility ownership, runtime/build fit, bundle/dependency cost,
  maintenance/license risk;
- whether installation is requested and authorized.

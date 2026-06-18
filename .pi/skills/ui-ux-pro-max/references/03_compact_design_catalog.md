# Compact Design Catalog

Use this instead of upstream search databases. Pick a direction quickly, then implement and validate.

## Product type -> direction

| Product shape | Good default | Layout cues | Avoid |
| --- | --- | --- | --- |
| Holm admin/operator console | Enterprise SaaS + Swiss minimal | sidebar, dense tables, status chips, command/search bar | playful effects, hidden error states |
| Member dashboard / productivity | Calm minimal + soft UI | cards, quick actions, clear empty states, personal settings | feature walls, too many CTAs |
| Realtime/collaboration | Content-first + presence | connection badge, participant list, revision/conflict states | treating WebSocket as authorization |
| AI/task workflow | Technical calm + progressive disclosure | prompt/input panel, job timeline, logs/result drawer | blocking spinner with no job/status path |
| Data/analytics | Bento/data-dense | filters, time range, units, accessible charts, table fallback | decorative charts without labels |
| Service/booking/landing | Trust + hero/social proof | primary CTA, proof, steps, contact/booking | generic marketing if app should be product-first |
| Consumer/playful | Tactile/soft brutal accent | large touch targets, bright accent, simple nav | low contrast, random rotations, emoji icons |

## Style choices

- **Enterprise SaaS**: best default for serious Holm tools. White/slate surfaces, one accent, clear hierarchy, compact controls.
- **Swiss/minimal**: best for docs, settings, admin, search, and forms. Strong typography, whitespace, alignment.
- **Bento dashboard**: good for summaries and mixed metrics. Use consistent card anatomy and avoid mosaic chaos.
- **Soft UI**: good for personal/productivity/wellness. Keep contrast strong; avoid invisible borders.
- **Dark technical**: good for logs, agents, developer tools. Test contrast and avoid pure black/pure neon overload.
- **Neo-brutal/playful**: use only when brand asks for it; keep borders/tokens systematic and accessibility intact.
- **Glassmorphism**: use sparingly for overlays/hero cards only; light-mode opacity must remain readable.

## Semantic palette starter

Define or reuse semantic tokens. Do not scatter raw hex values in components.

```text
surface: app background
surface_alt: cards/panels
surface_muted: subtle grouped areas
text: primary text
text_muted: secondary text
text_faint: metadata
border: dividers/outlines
accent: primary action/focus/current state
danger: destructive/error
success: saved/healthy
warning: pending/risk
```

Palette heuristics:

- Admin/SaaS: slate surfaces + indigo/blue accent + emerald success + red danger.
- Healthcare/wellness: warm neutral + sage/teal accent + restrained gold/rose highlight.
- Finance/security: cool neutral + blue/indigo accent + strong success/error contrast; avoid playful gradients.
- AI/dev tools: neutral or dark technical + cyan/violet accent; do not default to AI purple gradients everywhere.
- Consumer/social: warm or vivid accent, but keep text and controls sober enough for accessibility.

## Typography

- Strict BFBB/offline default: system stack.
- Base body: 16px; compact metadata: 10-12px only for non-essential labels.
- Line height: 1.45-1.7 for body; tighter for headings.
- Type scale: `12 / 14 / 16 / 20 / 24 / 32` is enough for most apps.
- Use weight for hierarchy: 700 headings, 600 section/action, 400 body, 500 labels.
- Use tabular numbers for counters, prices, timers, and dense tables when available.

## Spacing and shape

- Use a 4/8px rhythm: 4, 8, 12, 16, 24, 32, 48.
- Mobile page gutters: 16-20px; desktop content max-width should be consistent.
- Touch targets: about 44px minimum.
- Card radius: pick one normal radius and one pill radius; avoid random values.
- Elevation: use one or two shadow levels; prefer border + background for dense apps.

## Motion

- 150-300ms for hover, modal, drawer, route, and loading transitions.
- Animate `transform` and `opacity`; avoid width/height/top/left if it causes reflow.
- Motion must explain state or hierarchy, not decorate.
- Respect `prefers-reduced-motion`.
- Loading >300ms should show skeleton/progress; long tasks need status/result/error paths.

## Charts and data visualization

Prefer simple accessible SVG/CSS or existing app utilities. Do not add chart packages unless approved and BFBB-compatible.

- Trend over time -> line/area chart.
- Comparison -> bar chart.
- Part-to-whole -> donut only for <=5 categories; otherwise bar.
- Pipeline/funnel -> funnel or stacked steps plus table.
- Timeline/logs -> event list with filters and status chips.

Always include:

- title, unit, time range, and source context;
- legend or direct labels;
- table/text fallback or screen-reader summary;
- color plus shape/text, not color alone;
- empty/loading/error states.

## Microcopy patterns

- Empty state: what happened + why it matters + next action.
- Error: cause if known + recovery path + retry/contact/log hint.
- Destructive confirm: object name, consequence, cancel, destructive action.
- Offline/reconnect: current local state + what will sync/reload.
- Job/AI task: queued/running step, progress/logs if available, result action, failure retry.

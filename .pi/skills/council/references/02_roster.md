# Council Roster, Triads, Profiles, and Duo Pairs

Use member identifiers in lowercase. Accept hyphen and underscore aliases for
compound names: `sun-tzu`/`sun_tzu`, `lao-tzu`/`lao_tzu`.

## Members

| Identifier | Figure | Domain | Polarity |
|---|---|---|---|
| `aristotle` | Aristotle | Categorization and structure | Classifies everything |
| `socrates` | Socrates | Assumption destruction | Questions everything |
| `sun-tzu` | Sun Tzu | Adversarial strategy | Reads terrain and competition |
| `ada` | Ada Lovelace | Formal systems and abstraction | What can/cannot be mechanized |
| `aurelius` | Marcus Aurelius | Resilience and moral clarity | Control vs acceptance |
| `machiavelli` | Machiavelli | Power dynamics and realpolitik | How actors actually behave |
| `lao-tzu` | Lao Tzu | Non-action and emergence | When less is more |
| `feynman` | Richard Feynman | First-principles debugging | Refuses unexplained complexity |
| `torvalds` | Linus Torvalds | Pragmatic engineering | Ship it or shut up |
| `musashi` | Miyamoto Musashi | Strategic timing | The decisive strike |
| `watts` | Alan Watts | Perspective and reframing | Dissolves false problems |
| `karpathy` | Andrej Karpathy | Neural-network intuition and empirical ML | How models learn and fail |
| `sutskever` | Ilya Sutskever | Scaling frontier and AI safety | When capability becomes risk |
| `kahneman` | Daniel Kahneman | Cognitive bias and decision science | Your own thinking is the first error |
| `meadows` | Donella Meadows | Systems thinking and feedback loops | Redesign the system, not the symptom |
| `munger` | Charlie Munger | Multi-model reasoning and economics | Invert: what guarantees failure? |
| `taleb` | Nassim Taleb | Antifragility and tail risk | Design for the tail, not the average |
| `rams` | Dieter Rams | User-centered design | Less, but better — the user decides |

## Predefined triads

| Domain | Members | Best for |
|---|---|---|
| `architecture` | Aristotle + Ada + Feynman | Classify, formalize, simplify |
| `strategy` | Sun Tzu + Machiavelli + Aurelius | Terrain, incentives, moral grounding |
| `ethics` | Aurelius + Socrates + Lao Tzu | Duty, questioning, natural order |
| `debugging` | Feynman + Socrates + Ada | Bottom-up repro, assumption testing, formal checks |
| `innovation` | Ada + Lao Tzu + Aristotle | Abstraction, emergence, classification |
| `conflict` | Socrates + Machiavelli + Aurelius | Expose premises, predict actors, stay grounded |
| `complexity` | Lao Tzu + Aristotle + Ada | Emergence, categories, formalism |
| `risk` | Sun Tzu + Aurelius + Feynman | Threats, resilience, empirical verification |
| `shipping` | Torvalds + Musashi + Feynman | Pragmatism, timing, first principles |
| `product` | Torvalds + Machiavelli + Watts | Shipping, incentives, reframing |
| `founder` | Musashi + Sun Tzu + Torvalds | Timing, terrain, engineering reality |
| `ai` | Karpathy + Sutskever + Ada | Empirical ML, scaling/safety, formal limits |
| `ai-product` | Karpathy + Torvalds + Machiavelli | ML capability, shippability, incentives |
| `ai-safety` | Sutskever + Aurelius + Socrates | Frontier risk, moral clarity, assumptions |
| `decision` | Kahneman + Munger + Aurelius | Bias detection, inversion, moral clarity |
| `systems` | Meadows + Lao Tzu + Aristotle | Feedback loops, emergence, categories |
| `uncertainty` | Taleb + Sun Tzu + Sutskever | Tail risk, terrain, scaling frontier |
| `design` | Rams + Torvalds + Watts | User clarity, maintainability, reframing |
| `economics` | Munger + Machiavelli + Sun Tzu | Mental models, incentives, competition |
| `bias` | Kahneman + Socrates + Watts | Cognitive bias, assumption destruction, frame audit |

## Profiles

- `classic`: all 18 members. Use only when explicitly requested or when breadth
  matters more than brevity.
- `exploration-orthogonal`: Socrates, Feynman, Sun Tzu, Machiavelli, Ada, Lao
  Tzu, Aurelius, Torvalds, Karpathy, Sutskever, Kahneman, Meadows. Best for
  unknown unknowns and discovery.
- `execution-lean`: Torvalds, Feynman, Sun Tzu, Aurelius, Ada. Best for fast
  decision-to-action.

## Duo polarity pairs

| Keywords | Pair | Tension |
|---|---|---|
| architecture, structure, categories | Aristotle vs Lao Tzu | Classification vs emergence |
| shipping, execution, release | Torvalds vs Musashi | Ship now vs wait for timing |
| strategy, competition, market | Sun Tzu vs Aurelius | External victory vs internal governance |
| formalization, systems, abstraction | Ada vs Machiavelli | Formal purity vs human messiness |
| framing, purpose, meaning | Socrates vs Watts | Destroy assumptions vs dissolve the frame |
| engineering, theory, pragmatism | Torvalds vs Watts | Build it vs question whether it should exist |
| ai, ml, neural, model, training | Karpathy vs Sutskever | Build/iterate vs pause/ensure safety |
| ai-safety, alignment, risk | Sutskever vs Machiavelli | Safety ideals vs industry incentives |
| decision, bias, judgment | Kahneman vs Feynman | Cognitive error vs first principles |
| systems, feedback, loops | Meadows vs Torvalds | Redesign loop vs fix symptom |
| economics, investment, moat | Munger vs Aristotle | Multi-model lattice vs taxonomy |
| risk, uncertainty, tail | Taleb vs Karpathy | Hidden tails vs smooth empirical curves |
| design, user, usability, ux | Rams vs Ada | User needs vs computational possibility |
| default | Socrates vs Feynman | Top-down questioning vs bottom-up rebuilding |

## Auto-triad hints

- Code architecture, abstractions, API shape: `architecture`.
- Bugs, incidents, debugging plans: `debugging`.
- Release timing, shortcuts, launch calls: `shipping`.
- Product UX, feature scope, user value: `product` or `design`.
- Market, competition, moat, go-to-market: `strategy`, `founder`, or `economics`.
- ML/AI feature or model behavior: `ai` or `ai-product`.
- Harm, alignment, governance: `ai-safety` or `ethics`.
- Forecasting, black swans, fragility: `uncertainty`.
- Organizational loops or repeated failures: `systems`.
- Personal/team decision under uncertainty: `decision` or `bias`.

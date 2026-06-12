# Ponytail Help

Display this card for `/ponytail-help`, "ponytail help", "what ponytail commands", or "how do I use ponytail". One-shot only; do not change current mode.

## Levels

| Level | Trigger | Behavior |
| --- | --- | --- |
| Lite | `/ponytail lite` | Build what was asked, name the lazier alternative in one short line. |
| Full | `/ponytail` or `/ponytail full` | Enforce YAGNI → stdlib → native → installed dependency → one line → minimum. Default. |
| Ultra | `/ponytail ultra` | Deletion before addition; challenge questionable requirements while shipping the smallest useful answer. |

## Commands

| Command | What it does |
| --- | --- |
| `/ponytail` | Enable lazy senior dev mode for this conversation. |
| `/ponytail lite|full|ultra` | Switch intensity. |
| `/ponytail-review` | Complexity-only review: what can be deleted/replaced with stdlib/native/simple code. |
| `/ponytail-help` | Show this card. |
| `stop ponytail` / `normal mode` | Stop ponytail behavior. |

## Ladder

1. Does this need to exist?
2. Does the standard library do it?
3. Does the platform do it natively?
4. Does an installed dependency already do it?
5. Can it be one line?
6. Only then, write the minimum code that works.

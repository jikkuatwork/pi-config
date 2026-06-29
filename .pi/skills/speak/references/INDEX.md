# Speak Skill Index

Use this skill for short audible TTS notifications during agent workflows.

## Routes

| Need | Load |
| --- | --- |
| When to speak, command usage, safety rules, helper behavior | `references/01_usage.md` |
| Source provenance, review notes, omitted pieces | `references/90_provenance.md` |
| Trigger / non-trigger checks | `references/99_eval_prompts.md` |

## Fast path

If the user asked for a voice/audio/TTS update, or a repo workflow explicitly requires voice notifications, run:

```bash
agent-speak "Short non-sensitive status update." &
```

Keep messages under 25 spoken words when possible. Do not speak secrets, tokens, full paths, URLs, commit SHAs, private account identifiers, private spend, long command output, or personal data.

If `agent-speak` is not on `PATH`, use the skill-local helper:

```bash
.pi/skills/speak/bin/speak "Short non-sensitive status update." &
```

# Speak Usage

## Purpose

`speak` provides short local audio notifications for agent workflow state changes. It is meant for moments when the user benefits from an audible nudge while multitasking.

Good uses:

- a long harnex/queue dispatch starts or finishes;
- tests pass or fail after a meaningful run;
- a commit lands at a clean checkpoint;
- an open/close handoff completes;
- an unexpected blocker appears;
- the user explicitly asks for a spoken update.

Avoid using it for routine replies, every minor edit, or noisy progress spam.

## Command

Preferred global command:

```bash
agent-speak "Tests passed. Queue entry two is committed." &
```

Skill-local fallback:

```bash
.pi/skills/speak/bin/speak "Tests passed. Queue entry two is committed." &
```

The helper accepts all arguments as the message, generates a temporary WAV with `cattery`, plays it with `play`, detaches playback with `setsid` when available, and removes the temporary file after playback.

## Message style

Use short, human-friendly sentences. Aim for fewer than 25 spoken words.

Good:

```text
Tests passed. I committed the queue entry and started the review worker.
```

Poor:

```text
Commit d9eec512 modified internal/runtime/handler.go and internal/runtime/handler_test.go; go test ./internal/runtime -run Issue470 passed.
```

## Safety and privacy

Never speak:

- credentials, API keys, tokens, passwords, private keys;
- full paths, URLs, ticket numbers, account identifiers, tenant/subscription IDs;
- private spend figures or billing details;
- personal data;
- long command output;
- exact commit SHAs unless the user specifically asks for them aloud.

Prefer paraphrase:

```text
The runtime tests passed and the checkpoint is committed.
```

## Dependencies

The helper expects local commands:

- `cattery` for TTS generation;
- `play` from SoX for audio playback.

It does not install dependencies. If either command is missing, it exits without failing the surrounding workflow. `cattery` may download local assets on first real TTS use; do not trigger first-run downloads unexpectedly unless the user has accepted voice notifications.

## Configuration

Environment variables:

| Variable | Default | Meaning |
| --- | --- | --- |
| `AGENT_SPEAK_CATTERY` | `cattery` | TTS executable. |
| `AGENT_SPEAK_PLAYER` | `play` | Audio player executable. |
| `AGENT_SPEAK_VOICE` | `4` | Cattery voice ref. |
| `AGENT_SPEAK_SPEED` | `1.15` | Speech speed. |
| `AGENT_SPEAK_QUIET` | `0` | Set to `1` to suppress warnings. |

## Harness notes

The skill is safe to expose globally to Pi, Claude, Codex, and other Agent Skills-compatible harnesses because the always-loaded `SKILL.md` is tiny and the helper is explicit. The helper must be invoked by a tool call; loading the skill alone does not play audio.

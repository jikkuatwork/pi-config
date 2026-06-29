# Speak Provenance

## Source

Adapted from local Holm workflow helper:

```text
/home/glasscube/Projects/holmhq/holm/master/scripts/speak.sh
```

Reviewed source history:

```text
02b1f876 feat: add TTS voice notifications via speak.sh
1224070a chore: remove deprecated email poller, make TTS fire-and-forget
d9608116 fix(speak): detach play via setsid + per-invocation wav so audio survives shell teardown
```

The source script was short and used:

- `cattery speak --voice 4 --speed 1.15 -o <tmp.wav> <text>`;
- `setsid play <tmp.wav>`;
- `disown` so playback survives short-lived shells;
- `mktemp` for per-invocation WAV files.

## Adaptation notes

Changes made for the global skill:

- renamed the temp prefix from `holm-speak` to `agent-speak`;
- moved source of truth into `~/Projects/pi/.pi/skills/speak/`;
- added a `bin/speak` helper intended to be symlinked as `~/.local/bin/agent-speak`;
- accepts all CLI arguments as the message instead of only `$1`;
- checks for missing `cattery` and `play` without failing the surrounding workflow;
- prefers documented `cattery tts` while keeping `cattery speak` as a compatibility fallback;
- cleans up temporary files when TTS generation fails;
- documents privacy, noise, and first-run download boundaries.

## Review scan

Source review findings:

- Executable present by design: `scripts/speak.sh`.
- No package manager files or install scripts were imported.
- No network commands, deploys, destructive operations, sudo, eval, or shell spawning beyond local TTS/audio playback.
- No secrets or private credentials found in the source script.
- Dependencies are external local commands: `cattery`, `play`, and optional `setsid`.

This skill intentionally includes one executable helper: `bin/speak`. Do not run it unless an audible notification is desired.

## Omitted

- Holm-specific `./scripts/speak.sh` path and temp-file prefix.
- Holm-specific voice-notification prose from `knowledge-base/workflows/agent-operations.md`; the global usage doc keeps only reusable guidance.
- Historical changelog entries.
- Any dependency installer or downloader.

## License / ownership

This is a local adaptation from the user's Holm repo into the user's Pi skill repo. No third-party source files were vendored. External tools (`cattery`, SoX `play`) are not bundled.

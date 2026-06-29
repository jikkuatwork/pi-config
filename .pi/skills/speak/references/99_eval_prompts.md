# Speak Eval Prompts

## Should trigger

1. "Give me an audio update when the queue finishes."
   - Expected: load `speak`; use `agent-speak` at the requested event with a short non-sensitive message.

2. "Use voice notifications for harnex dispatches and test results."
   - Expected: load `speak`; speak on dispatch start/finish and meaningful test pass/fail events.

## Should not trigger

1. "Write a speech for the launch page."
   - Expected: do not load `speak`; this is prose writing, not TTS notification.

2. "Explain how text-to-speech models work."
   - Expected: do not invoke audio; answer conceptually unless the user asks for a spoken notification.

## Edge case

1. "Speak the full failing command output so I can hear it."
   - Expected: load `speak`, but refuse/summarize instead of speaking long output or sensitive paths. Use a short status such as: "The test failed. I found one runtime assertion error and will summarize it in text."

## Quality checks

- Does the message stay under roughly 25 spoken words?
- Does it avoid secrets, IDs, full paths, URLs, SHAs, spend, and personal data?
- Is the notification tied to a meaningful workflow state change?
- Would a missing TTS dependency leave the main task unaffected?

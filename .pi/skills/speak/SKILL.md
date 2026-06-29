---
name: speak
description: Audible TTS notifications for agent workflow status. Use when the user asks for speak, voice, audio, or TTS notifications, or when a repo workflow explicitly requests voice notifications during long runs, harnex dispatches, queue runs, test results, commits, open/close handoffs, or surprising blockers. Do not use for routine replies or sensitive content.
compatibility: Requires a local TTS command compatible with cattery and an audio player compatible with SoX play; helper degrades without failing workflows when unavailable.
metadata:
  structure: tiny_front_door_v1
  references:
    index: references/INDEX.md
  tags: [tts, notifications, workflow]
  updated_at: "2026-06-29"
  status: reviewed
---

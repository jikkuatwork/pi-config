# Global Pi Instructions

- Only in Pi, and only when `message_bar` is available, use it for persistent user-useful state during long-running work—not routine narration.
- Choose the fitting variant (`progress`, `working`, `waiting`, `blocked`, `complete`, or `note`), keep the whole bar under 160 characters, and update only at meaningful checkpoints.
- Clear stale bars; never place secrets, credentials, private identifiers, or raw sensitive output in them.

# Pi extensions (source of truth)

This directory is the source-of-truth for global pi extensions on this machine.

## Workflow

- Edit extensions here (versioned in git).
- Pi loads this directory via `~/.pi/agent/settings.json`:
  - `"extensions": ["/home/glasscube/Projects/pi/extensions"]`
- Reload in pi with `/reload` (or restart pi).

## Included extensions

- `vim.ts` - custom Vim-style modal editing keybindings/behavior.
- `azure-retry-normalizer.ts` - rewrites opaque Azure stream failures
  (`Unknown error (no error details in response)`) into a transient error shape so pi auto-retry can trigger, and logs retry start/end in UI status/notifications.

## Notes

- Avoid editing installed extension files under `~/.pi/agent/extensions/` directly.
- Keep extension changes committed here for reproducibility.

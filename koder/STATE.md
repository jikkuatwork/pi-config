---
updated_at: "11 Jun 2026 | 12:39 PM IST"
---

# Koder State

## Past

- Session handoff open/close flow is active; `koder/STATE.md` remains source-of-truth.
- Earlier durable work includes kodemachine issue `koder/issues/001_kodemachine_namespaced_resources_and_storage_vm/INDEX.md`, Framework7 research scaffold, and the global `koder-pattern` skill refactor/bootstrap route.
- This session worked outside this repo in `~/dotfiles`: added live terminal light/dark switching for Alacritty + tmux, with tmux `prefix` + `Shift+t` bound to the toggle and stdout removed so no Enter prompt appears.

## Present

- Source for the global `koder-pattern` install is `.pi/skills/koder-pattern/`; `~/.pi/agent/skills/koder-pattern` points there.
- External filing from Holm: `koder/issues/002_state_commit_protocol_for_cross_repo_filings/INDEX.md` tracks a minimal `state:` commit protocol for reliable cross-repo repo-state movement.
- Repo has no root test/build harness; validation is manual/documentation-based unless a target repo defines checks.
- Active terminal theme config now lives in `~/dotfiles`; runtime override files are under `~/.local/state/alacritty/` and `~/.local/state/tmux/`.

## Future

- For terminal theme tweaks, edit `~/dotfiles/bin/toggle-terminal-theme`, `~/dotfiles/tmux.conf`, or the theme files under `~/dotfiles/{alacritty,tmux}/themes/`.
- Continue keeping project-local pi skills reviewed and source-controlled under `.pi/skills/`.
- When resuming `koder-pattern`, consider Issue 002 before broader cross-repo/harness work.

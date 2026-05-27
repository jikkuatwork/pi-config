---
status: open
priority: P2
created: 2026-05-27
tags: kodemachine, cli, storage, nfs, ux
type: design
context: Normalize resource command UX (`console|disk|nfs`) and decide storage-VM pattern for multi-VM shared data.
---

# Issue 001: Kodemachine namespaced resource commands and storage VM pattern

## Problem

Kodemachine command surface is becoming inconsistent as new resource operations are discussed:

- current serial console command is flat (`attach <label>`);
- proposed shared disk and NFS operations need attach/detach semantics;
- ad-hoc command names will collide and increase operator confusion.

Separately, current shared qcow2 disk usage is single-owner in practice. We need a durable decision on whether to support a storage-VM/NFS model for transparent multi-VM shared access.

## Context

- Live kodemachine source: `/home/glasscube/Projects/kodemachine/kodemachine.rb`
- Existing behavior:
  - `attach <label>` opens serial console.
  - shared disk path configured once in `~/.config/kodemachine/config.json` as `Shared/projects-luks.qcow2`.
  - clone creation may skip shared disk when already in use by another running clone.
- Session decisions captured from user:
  - prefer consistent namespace shape;
  - backward compatibility can be dropped;
  - `console detach` can be advisory (prints detach key) for now.

## Proposed Direction

Adopt namespaced resource commands and evaluate storage VM as first-class pattern.

Candidate CLI shape:

- `kodemachine console attach <label>`
- `kodemachine console detach <label>` (advisory initially: “use Ctrl+]”)
- `kodemachine disk attach <label>` / `kodemachine disk detach <label>`
- `kodemachine nfs attach <label> --from <storage-vm>:<export> --to <mount>`
- `kodemachine nfs detach <label> ...`

Storage model hypothesis:

- one thin “storage VM” owns/unlocks data disk(s);
- exports over NFS to client VMs on private network;
- client VMs mount under a stable path like `~/NFS/<name>`;
- support multiple exports and potentially multiple storage VMs.

## Acceptance Criteria

- [ ] A codified command spec exists for `console|disk|nfs` attach/detach/status behavior (including errors and safety guards).
- [ ] Decision record exists for shared-block-disk vs storage-VM/NFS (when to use each, constraints, trade-offs).
- [ ] If proceeding with NFS, implementation plan defines minimal viable flow and inheritance semantics for new clones.

## Non-Goals

- Implementing full clustered shared-block storage.
- Designing Windows/macOS host-native network filesharing workflows.
- Backward-compatibility aliases for old flat commands.

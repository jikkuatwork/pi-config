---
name: archify
description: >
  Creates polished, validated architecture, workflow, sequence, data-flow, and
  lifecycle diagrams as self-contained HTML with a bundled local Node runtime.
  Use for repository/system architecture, infrastructure and security topology,
  technical workflows, API traces, pipelines, state machines, or Mermaid
  conversion. Enforces zero repo-derived network egress; fixed no-referrer
  Google Fonts are the only allowed external artifact request. Do not use for
  prose-only explanation or unrelated visual design.
license: MIT
metadata:
  structure: tiny_front_door_v1
  references:
    index: references/INDEX.md
    privacy: references/01_privacy.md
  source: https://github.com/tt-a1i/archify
  source_commit: 5de7275fe87a66a19d52a4d9b0b3a4f2a5a90115
  upstream_version: "2.16.0"
  local_variant: no_repo_data_egress_v1
  tags: [architecture, diagrams, svg, html, local-only, privacy]
  updated_at: "2026-08-31"
  status: reviewed
---

Before inspecting a repository, follow `references/01_privacy.md`. Never send
repo-derived information through any network path.

# Provenance

- Upstream: https://github.com/nicobailon/visual-explainer
- Vendored from: `plugins/visual-explainer`
- Branch: `main`
- Commit: `8f1d0e38ab0f265632a31d2fd032f7b730c98c15`
- License: MIT, copied to `LICENSE`
- Review date: 2026-05-21

## Import review

Included:

- `SKILL.md`
- `commands/` except `share-page.md`
- `references/`
- `templates/`
- `LICENSE`

Excluded from upstream package/repo:

- top-level `install-pi.sh` installer
- top-level `package.json` / generated lockfile
- `.claude-plugin/` plugin metadata
- `commands/share-page.md`
- `scripts/share.sh`
- top-level README/changelog/package publishing files

Executable/runtime notes:

- No executable scripts are vendored.
- Vercel deployment/sharing support was intentionally excluded.
- Skill docs mention optional `surf` image generation and CDN-loaded browser assets for Mermaid/Chart.js/fonts.
- No scripts were run and no dependencies were installed during vendoring.
- Ask before installing deployment helpers or invoking optional network/image-generation tools.

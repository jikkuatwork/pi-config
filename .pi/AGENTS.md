# Global Pi Instructions

- Only in Pi, and only when `message_bar` is available, use it for persistent user-useful state during long-running work—not routine narration.
- Choose the fitting variant (`progress`, `working`, `waiting`, `blocked`, `complete`, or `note`), keep the whole bar under 160 characters, and update only at meaningful checkpoints.
- Clear stale bars; never place secrets, credentials, private identifiers, or raw sensitive output in them.

## Canonical skill home

- `~/Projects/pi/.pi/skills/` is the source of truth for reusable skills the user asks to adopt or import. Do not leave the canonical copy in the current product/research repo.
- Use the tiny-front-door shape: a frontmatter-only `SKILL.md` routes through `metadata.references.index` to `references/INDEX.md`; keep detailed guidance in references so startup context stays small.
- When adoption/import starts in another trusted repo, create a relative `.pi/skills/<name>` symlink there to the canonical skill for testing; do not duplicate the skill tree.
- Keep inherently repo-specific skills such as `open`/`close` in their owning repo. Never use Vercel's Skills CLI, and do not globally promote or run third-party code without the normal review and permission gates.

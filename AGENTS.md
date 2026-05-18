<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Installed Skills

Before starting a task, check the available installed skills in the agent
environment. If a skill is relevant to the request, read its `SKILL.md` and
follow its guidance before editing code or making architecture decisions.

Installed skills are usually available under:

- `~/.agents/skills`
- `~/.codex/skills`

Current project-relevant global skills:

- `next-best-practices`: `~/.agents/skills/next-best-practices/SKILL.md`
- `next-cache-components`: `~/.agents/skills/next-cache-components/SKILL.md`
- `vercel-composition-patterns`: `~/.agents/skills/vercel-composition-patterns/SKILL.md`
- `vercel-react-best-practices`: `~/.agents/skills/vercel-react-best-practices/SKILL.md`
- `vercel-react-native-skills`: `~/.agents/skills/vercel-react-native-skills/SKILL.md`
- `vercel-react-view-transitions`: `~/.agents/skills/vercel-react-view-transitions/SKILL.md`
- `web-design-guidelines`: `~/.agents/skills/web-design-guidelines/SKILL.md`

For Next.js work, prefer the installed Next skills and relevant Vercel React
skills. For visual redesign or page layout work, also read
`web-design-guidelines`.

Use these alongside the Next DevTools MCP when a dev server is running.

## Project UI & SEO Guidelines

- Use centered Tailwind `container` sections by default; only go full-bleed
  when the design intentionally calls for it.
- Configure image props carefully for performance: use accurate `sizes`, set
  above-fold images to appropriate priority/loading behavior, and avoid layout
  shifts.
- Avoid client-side JavaScript when semantic HTML and CSS can provide the
  interaction or state.
- Keep reusable utilities and constants out of component files; place them in
  appropriate `utils` or `constants` modules.
- Keep `page` and `layout` files readable by extracting UI into reusable
  components under `components`; write only one component per file.
- Avoid `as` casts. Prefer inference, `unknown`, and explicit type guards when
  narrowing is needed.
- Avoid `useEffect` unless the relevant React skill/docs recommend it for the
  specific use case.
- Prefer static generation for SEO pages; content changes infrequently, so avoid
  dynamic rendering unless a feature truly needs it.

## Tailwind Guidelines

- Prefer canonical Tailwind utilities over arbitrary values when they produce the
  same CSS. Example: use `sm:w-34` instead of `sm:w-[136px]`.
- Use arbitrary values only when there is no canonical utility, when using
  `calc()`, CSS variables, precise one-off values, or externally dictated sizes.
- Before finalizing UI edits, scan changed Tailwind class names for IntelliSense
  canonical-class warnings and fix them.

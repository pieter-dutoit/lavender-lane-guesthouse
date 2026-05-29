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

## Guesthouse Image Editing Guidelines

When editing source photos for the website, aim for professional hospitality
photography while keeping the property truthful. Improve the photo as a better
version of the same real scene; do not create a fictional or materially upgraded
guesthouse.

- Preserve the real scene, layout, architecture, furniture, materials, room
  proportions, outdoor features, and camera viewpoint.
- Avoid changing the angle in a way that invents unseen parts of the scene.
  Prefer subtle crop/framing improvements, lens correction, horizon correction,
  and straightened vertical lines.
- Use realistic photographic improvements: balanced exposure, recovered
  highlights and shadows, natural warm daylight, corrected white balance,
  tasteful contrast, clarity, noise reduction, sharpening, and a restrained
  hospitality/interior color grade.
- Remove temporary or distracting items only when requested or clearly
  non-permanent, such as vehicles, bins, loose cables, litter, personal items,
  stains, minor clutter, or distracting reflections.
- When removing objects, reconstruct the affected background realistically from
  the surrounding driveway, walls, garden, flooring, bedding, furniture, or
  architecture.
- Do not invent new furniture, amenities, windows, doors, views, landscaping,
  signage, people, decorative elements, room size, or property features.
- Avoid fake HDR, oversaturation, heavy blur, artificial bokeh, dramatic sky
  replacement, unrealistic sunset lighting, text, and watermarks.

## Tailwind Guidelines

- Prefer canonical Tailwind utilities over arbitrary values when they produce the
  same CSS. Example: use `sm:w-34` instead of `sm:w-[136px]`.
- Use arbitrary values only when there is no canonical utility, when using
  `calc()`, CSS variables, precise one-off values, or externally dictated sizes.
- Before finalizing UI edits, scan changed Tailwind class names for IntelliSense
  canonical-class warnings and fix them.

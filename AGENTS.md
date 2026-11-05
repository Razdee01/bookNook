<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Single Next.js 16 App Router app (`src/app`), not a monorepo. React 19.3, TypeScript strict, Tailwind CSS v4. Entry: `src/app/layout.tsx` → `src/app/page.tsx`. No test runner, CI, or pre-commit hooks exist — don't go looking for them.

## Commands

- `npm run dev` — dev server (also rewrites the generated block above)
- `npm run lint` — bare `eslint` against the flat config in `eslint.config.mjs` (no args; `next lint` is not used)
- `npx tsc --noEmit` — typecheck (no `typecheck` script exists)
- Verify with: `npx tsc --noEmit` then `npm run lint`

## Conventions

- Path alias: `@/*` → `./src/*` (matches `components.json` shadcn aliases).
- shadcn/ui style is **base-nova**, built on `@base-ui/react` — **not Radix**. Components live in `src/components/ui/`; add new ones with `npx shadcn add <component>`, don't hand-roll primitives.
- `cn()` comes from `@/lib/utils`, which re-exports the `cn` npm package (not the usual clsx + tailwind-merge combo).
- Tailwind v4 is CSS-first: there is no `tailwind.config`. Theme tokens and font variables are defined in `src/app/globals.css` via `@theme` / `@custom-variant`; fonts are registered in `layout.tsx` with `next/font/google` as CSS vars (`--font-sans`, `--font-playfair`). Edit tokens there, not in JS.
- Next.js 16 generates global prop types — layouts/pages use `LayoutProps<"/">` / `PageProps<...>` instead of hand-written `{ children: React.ReactNode }`.
- `next.config.ts` allows **all** https image hosts via `images.remotePatterns: [{ hostname: '**' }]`.

## Gotchas (verified the hard way)

- `postcss.config.mjs` (with `@tailwindcss/postcss`) is **required** — it was never committed and Tailwind silently didn't run. Symptom: build warnings `Unknown at rule: @apply/@theme/@custom-variant` and an unstyled site. If you see those warnings, this file is missing.
- `next.config.ts` contains `turbopack.resolveAlias` mapping `tw-animate-css` → its actual CSS file. The package's `exports` map exposes only a `"style"` condition, which Turbopack doesn't request, so `@import "tw-animate-css"` fails with `Module not found`. **Do not remove the alias.** All versions of `tw-animate-css` through 1.4.0 (latest) have this exports map.
- Dependency changes (`package.json`, `package-lock.json`) are easy to end up deployed without — build your deploy target from a clean checkout or commit both, or the CSS imports won't resolve.

# BookNook

**A cozy digital library where readers discover, borrow, and manage books — built with Next.js 16.**

BookNook is a full-stack book-lending web app. Readers can browse a curated catalog, sign in, borrow books, and track what they've borrowed; library members can also contribute by adding and managing their own book listings.

## Key Features

1. **Browse the catalog** — Full book collection with cover art, categories, and detail pages (`/books`, `/books/[id]`), plus a "New Arrivals" feed and category showcase on the landing page.
2. **Secure authentication** — Email/password and Google sign-in via Better Auth, with JWT sessions and route protection (e.g. `/add-book` redirects signed-out visitors to `/sign-in`).
3. **Manage listings** — Signed-in members can add books and edit or delete the listings they own from "My Books".
4. **Borrow & return** — One-click borrowing from a book card, with a personal "My Borrows" dashboard showing due dates and returning books in a single click.
5. **Polished, responsive UI** — Sticky session-aware navbar, loading states, toasts, a custom 404 page, and a warm paper-and-forest design system that scales from mobile to desktop.

## Tech Stack

| Layer      | Technology |
| ---------- | ---------- |
| Framework  | [Next.js 16](https://nextjs.org) (App Router, Turbopack) — `src/proxy.ts` request middleware |
| UI         | React 19, TypeScript, Tailwind CSS v4, shadcn/ui (base-nova style on Base UI), lucide-react, sonner |
| Auth       | Better Auth — email/password + Google OAuth, JWT plugin, MongoDB adapter |
| Data       | MongoDB (auth store) + a separate REST API (book/borrow data) |
| Build      | `next build`, ESLint 9 flat config, `tsc --noEmit` |

## Getting Started

### Prerequisites

- Node.js 20+
- A MongoDB database
- **The BookNook backend running on `http://localhost:5000`** — this repo is the frontend only. Every book/borrow request calls that API (`/books`, `/borrows`, `/add-books`, …), so the pages will fail to load data without it.

### Environment variables

Create a `.env` in the project root:

```bash
BETTER_AUTH_SECRET=        # better-auth session secret
BETTER_AUTH_URL=           # e.g. http://localhost:3000
MONGO_URI=                 # MongoDB connection string (auth uses the "bookNook" database)
GOOGLE_CLIENT_ID=          # Google OAuth credentials (optional provider)
GOOGLE_CLIENT_SECRET=
```

### Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

### Verify changes

```bash
npx tsc --noEmit   # typecheck (no script exists for this)
npm run lint       # eslint, flat config
npm run build      # production build — also runs the TS check
```

## Project Structure

```
src/
  app/            # App Router pages: /, /books, /books/[id], /add-book,
                  # /my-books, /my-borrows, /sign-in, /join, api/auth/[...all]
  components/     # Feature components (NavBar, Banner, BookCard, …) + ui/ (shadcn)
  lib/            # auth.ts / auth-client.ts (Better Auth), token helpers, utils
  proxy.ts        # Next 16 middleware — guards /add-book
  type/           # Shared IBook interface
```

## Notes

- `postcss.config.mjs` and the `turbopack.resolveAlias` entry for `tw-animate-css` in `next.config.ts` are load-bearing — see `AGENTS.md` before touching them.

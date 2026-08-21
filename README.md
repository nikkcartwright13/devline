# devline

Devline.digital marketing site — Next.js (Pages Router), statically exported for plain Apache/LiteSpeed hosting (no Node.js server on the host).

## Scripts

- `npm run dev` — local dev server at [http://localhost:3000](http://localhost:3000)
- `npm run build` — builds and statically exports the site to `out/`

## Deploying

`npm run build` produces `out/` — upload its entire contents to the hosting root (cPanel File Manager, FTP, etc.), overwriting what's there. `.htaccess` (already inside `out/`) handles clean URLs and the 404 page; no server-side routing config is needed beyond that.

## Structure

- `pages/` — Next.js routing only (thin per-language route files: `pages/index.js` is Georgian, `pages/en/...` / `pages/de/...` / `pages/pl/...` mirror it). Most just re-export the real page component from `src/views/`.
- `src/views/` — the actual page components (one per route).
- `src/components/` — layout, sections, and reusable UI.
- `src/data/` — static content data (services, projects, nav, etc.).
- `src/locales/` — i18next translation JSON per language (ka/en/de/pl, plus a currently-unrouted ru).
- `src/lib/langRouting.js` — the single source of truth for how language maps to a URL prefix.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 measurement ID (optional; leave empty to disable analytics and hide the cookie banner)
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID` / `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` / `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` — from [dashboard.emailjs.com](https://dashboard.emailjs.com), used by the contact form

All client-exposed env vars must keep the `NEXT_PUBLIC_` prefix — Next.js only inlines vars with that prefix into the browser bundle.

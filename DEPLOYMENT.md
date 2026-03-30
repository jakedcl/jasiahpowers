# Jasiah Powers Portfolio — Deployment

## Stack

- **Frontend**: Next.js 14 (App Router), React 18, MUI v5
- **CMS**: Sanity Studio (`studio/`)
- **Content API**: `@sanity/client` used from Next.js **server components** (no separate `/api` layer for projects/photos)
- **Images**: Sanity CDN (`urlFor` / `cdn.sanity.io`)
- **Hosting**: Vercel
- **Video page**: YouTube Data API — **server-side only** via `YOUTUBE_API_KEY` (not exposed to the browser)

## Repository layout

```
jasiahpowers/
├── src/app/           # Next.js App Router pages & layouts
├── src/components/    # UI (MUI + client islands)
├── src/lib/           # Sanity client + queries
├── public/            # Static assets (add logo.png, background.jpg here if missing)
├── studio/            # Sanity Studio
├── vercel.json
└── package.json
```

## Local development

```bash
npm install
npm run dev          # http://localhost:3000

cd studio && npm install && npm run dev   # CMS — http://localhost:3333
```

Copy `.env.example` to `.env.local` and set `YOUTUBE_API_KEY` if you need the video page locally.

## Vercel

- Framework preset: **Next.js** (root of repo).
- Environment variables:
  - `YOUTUBE_API_KEY` — required for `/video`
  - Optional: `YOUTUBE_PLAYLIST_ID`, `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`

## Legacy note

The old Vite app lived in `client/` and used `VITE_BACKEND_URL` plus Vercel serverless handlers in `api/`. That layer was removed in favor of direct Sanity reads from Next.js and a server-side YouTube fetch.

*Last updated: March 2026*

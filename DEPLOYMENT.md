# Deployment Guide

## Vercel Deployment

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Deploy to Vercel
```bash
vercel --prod
```

### 3. Set Environment Variables in Vercel Dashboard
- Go to your project settings in Vercel
- Add environment variable:
  - `VITE_BACKEND_URL` = `https://your-vercel-domain.vercel.app`

### 4. Update Client Environment
For production, the frontend will call the Vercel API routes instead of localhost:5001

### Architecture
- **Frontend**: React app served by Vercel
- **API**: Serverless functions in `/api` directory
- **CMS**: Sanity Studio at `https://jasiahpowers.sanity.studio/`

### API Endpoints (Vercel Functions)
- `GET /api/projects` - All projects
- `GET /api/projects/[slug]` - Single project by slug
- `GET /api/photos` - All photos
- `GET /api/videos` - All videos
- `GET /api/site-settings` - Site configuration
- `GET /api/homepage` - Homepage content
- `GET /api/images/[folder]` - Legacy endpoint for compatibility

### Local Development
1. Start frontend: `cd client && npm run dev`
2. The API routes will work automatically with Vercel dev server
3. Sanity Studio: `cd studio && npm run dev` (localhost:3333)

### Content Management
- Studio: https://jasiahpowers.sanity.studio/
- Add projects, photos, videos through the studio interface
- Changes appear immediately on the website

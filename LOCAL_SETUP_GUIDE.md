# Dynamic Portfolio CMS - Local Setup Guide

This project now supports:
- Public portfolio powered by database content
- Secure admin dashboard (Basic Auth)
- Draft/preview/publish workflow
- Supabase persistence
- Local image uploads

## 1) Main folders

```text
artifacts/
  api-server/
    src/
      routes/content.ts        # CMS + analytics + upload routes
      lib/portfolioStore.ts    # Supabase persistence for draft/published state
      lib/auth.ts              # Basic auth middleware
  portfolio/
    src/
      pages/Admin.tsx          # Admin dashboard UI
      pages/Home.tsx           # Public dynamic portfolio
      components/portfolio/DynamicPortfolio.tsx
      lib/cms-api.ts           # Frontend API client
      lib/cms-types.ts         # Shared frontend types
```

## 2) Prerequisites

- Node.js `24` (recommended)
- pnpm `10+`
- Supabase project

## 3) Environment setup

Copy env template:

```powershell
pnpm run env:setup
```

Edit `.env`:

```env
PORT=8787
LOG_LEVEL=info
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
BASE_PATH=/
VITE_API_BASE_URL=http://localhost:8787/api
VITE_N8N_WEBHOOK_URL=
```

## 4) Install and run

```powershell
pnpm install
pnpm dev
```

This starts:
- API: `http://localhost:8787`
- Frontend: `http://localhost:5173`

## 5) Usage

- Public site: `http://localhost:5173`
- Admin dashboard: `http://localhost:5173/admin`
- Login with `ADMIN_USERNAME` / `ADMIN_PASSWORD`

## Supabase table required

Create this table in Supabase SQL editor:

```sql
create table if not exists public.portfolio_state (
  key text primary key,
  draft jsonb not null,
  published jsonb not null,
  analytics jsonb not null default '{"views":0,"projectClicks":0}'::jsonb,
  updated_at timestamptz not null default now()
);
```

## 6) Core admin features

- Add/edit/delete sections
- Show/hide sections
- Reorder sections (drag + drop)
- Inline text editing
- Upload/replace images
- Project cards add/edit/delete
- Alignment + size controls
- Draft preview
- Save draft and Publish
- Reset to default layout
- Analytics (views + project clicks)

## 7) Optional cloud image storage

Current upload is local (`/uploads`).
You can replace `upload-image` route in `content.ts` with Cloudinary later.

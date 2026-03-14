# Hamza & Sara — Premium Engagement RSVP

Luxury RSVP invitation website for Hamza & Sara's engagement celebration (خطبة), built with Next.js App Router, TailwindCSS, Framer Motion + GSAP, Zod, and Supabase.

## Stack

- Next.js (App Router) + TypeScript
- TailwindCSS
- Framer Motion + GSAP
- Zod validation
- Supabase PostgreSQL
- Vercel deployment target

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env file:
   ```bash
   cp .env.example .env.local
   ```
3. Fill `.env.local` values:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
4. Apply the schema in `supabase/schema.sql` to your Supabase project.
5. Run:
   ```bash
   npm run dev
   ```

## Key routes

- `/` — cinematic invitation + RSVP flow
- `/admin` — password-protected admin dashboard
- `POST /api/rsvp` — validate and upsert RSVP by phone number
- `POST /api/admin/auth` — set admin auth cookie
- `GET /api/admin/rsvps` — fetch RSVP dashboard data

## Deployment (Vercel)

1. Push repository to Git provider.
2. Import project in Vercel.
3. Add all environment variables in Vercel Project Settings.
4. Deploy.


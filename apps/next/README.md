# Next.js app (Auth + Drizzle + Supabase + Polar)

This is a separate Next.js 15 app inside the monorepo for a developer portfolio, integrating:

- BetterAuth (email/password + Google OAuth, new Google accounts disabled)
- Drizzle ORM with Supabase Postgres
- shadcn-like UI (Tailwind-based minimal components)
- Polar.sh checkout (sandbox) + customer portal

## Setup

1) Install dependencies in this app:

```
cd apps/next
npm install
```

2) Env variables:

Copy `.env.local.example` to `.env.local` and fill:

- `DATABASE_URL` (Supabase Postgres)
- `POLAR_ACCESS_TOKEN` (sandbox)
- `SUCCESS_URL` and `RETURN_URL`

3) Drizzle migrations:

```
npm run db:generate
npm run db:push
```

4) Dev:

```
npm run dev
```

Visit:
- `/login`, `/register`, `/dashboard`
- `/checkout?productId=...`
- `/portal`

## Notes

- The app is isolated from the Vite SPA. Current CI remains focused on the SPA.
- To add full shadcn components, run the `shadcn/ui` CLI and generate desired components.
- When moving Polar to production, set `server: 'production'` and use a production token.
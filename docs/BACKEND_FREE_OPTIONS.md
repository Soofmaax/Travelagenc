# Backend & Storage Free Options (Drizzle-first)

This project now includes a minimal Fastify + Drizzle ORM setup using SQLite for **zero cost** local development:
- SQLite (better-sqlite3) — embedded DB, no hosting costs
- Drizzle ORM + Drizzle Kit — type-safe queries and migrations

Recommended free tiers for production/staging:

- PostgreSQL:
  - Neon: generous free tier, serverless, supports Drizzle
  - Supabase: free tier (Postgres + auth + storage), Drizzle-compatible
- MySQL:
  - PlanetScale: free tier, serverless MySQL, Drizzle-compatible
- SQLite serverless:
  - Turso (libsql): free developer plan, edge-friendly, Drizzle-compatible
  - Cloudflare D1: free limits, SQLite-like, Drizzle-compatible
- Object Storage:
  - Cloudflare R2: free egress and generous free tier, S3-compatible API
  - Supabase Storage: free tier, simple integration
- Caching/Rate limit:
  - Upstash Redis: free plan, HTTP API, great for serverless usage

Next steps to switch from SQLite to a hosted DB:
1. Pick a provider (Neon/PlanetScale/Supabase/Turso/D1).
2. Update `drizzle.config.ts` driver and credentials.
3. Migrate existing schema with `npm run db:generate && npm run db:migrate`.
4. Update `server/db/client.ts` to use the appropriate driver (e.g., `drizzle-orm/neon-serverless`, `drizzle-orm/planetscale-serverless`).
5. Set environment variables via platform secrets (no plain text in repo).

For help migrating to any target (Neon, PlanetScale, Turso, D1, Supabase), open an issue or request a PR and I’ll wire it end-to-end with secure defaults.
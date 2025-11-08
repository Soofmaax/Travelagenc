import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './server/db/schema.ts',
  out: './server/db/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: './server/db.sqlite',
  },
  verbose: true,
  strict: true,
});
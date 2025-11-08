import { betterAuth } from 'better-auth';
import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { db } from '../lib/db';
import * as schema from '../db/schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
    usePlural: true, // our tables use plural naming
  }),
  session: {
    // 7 days rolling session
    expiresInSeconds: 7 * 24 * 3600,
  },
  emailAndPassword: {
    enabled: true,
  },
  oauth: {
    google: {
      enabled: true,
      // You can add clientId/clientSecret via env if needed
      allowNewUsers: false, // refuse nouvelles créations via Google (option de durcissement)
    },
  },
});
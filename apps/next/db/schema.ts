import { pgTable, serial, text, timestamp, varchar, integer } from 'drizzle-orm/pg-core';

// Minimal BetterAuth-compatible schema (users, sessions, accounts)
// Adjust as needed based on BetterAuth adapter docs.

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  image: text('image'),
  createdAt: timestamp('created_at', { withTimezone: false }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: false }).defaultNow().notNull(),
});

export const sessions = pgTable('sessions', {
  id: varchar('id', { length: 255 }).primaryKey(), // session token/id
  userId: integer('user_id').notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: false }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: false }).defaultNow().notNull(),
});

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  provider: varchar('provider', { length: 255 }).notNull(),
  providerAccountId: varchar('provider_account_id', { length: 255 }).notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  createdAt: timestamp('created_at', { withTimezone: false }).defaultNow().notNull(),
});
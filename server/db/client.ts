import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const sqlite = new Database('server/db.sqlite');
export const db = drizzle(sqlite);
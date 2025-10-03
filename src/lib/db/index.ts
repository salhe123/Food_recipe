import { drizzle } from 'drizzle-orm/mysql2';
import { createPool } from 'mysql2/promise';
import * as schema from '$lib/server/db/schema';

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'recipe_app',
});

export const db = drizzle(pool, { schema, mode: 'default' });
import { drizzle } from 'drizzle-orm/mysql2';
import { createPool } from 'mysql2/promise';
import * as schema from '$lib/server/db/schema';

import { env } from '$env/dynamic/private';

const pool = createPool({
  uri: env.DATABASE_URL || 'mysql://root:123456@localhost:3306/recipe_app',
});

export const db = drizzle(pool, { schema, mode: 'default' });
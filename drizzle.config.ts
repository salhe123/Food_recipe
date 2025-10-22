import { defineConfig } from 'drizzle-kit';

// Ensure the DATABASE_URL (or Railway MYSQL_URL) is set
const databaseUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;
if (!databaseUrl) throw new Error('DATABASE_URL or MYSQL_URL is not set');

export default defineConfig({
  schema: './src/lib/server/db/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: databaseUrl,
  },
  verbose: true,
  strict: true,
});

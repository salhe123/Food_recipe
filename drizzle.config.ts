import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
  schema: './src/lib/server/db/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: 'mysql://root:123456@localhost:3306/recipe_app',
  },
  verbose: true,
  strict: true,
});
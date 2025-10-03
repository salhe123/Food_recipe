import { mysqlTable, bigint, varchar, text, boolean, timestamp, int } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
});

export const categories = mysqlTable('categories', {
  id: bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const recipes = mysqlTable('recipes', {
  id: bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  prepTime: int('prep_time').notNull(), 
  userId: bigint('user_id', { mode: 'number', unsigned: true }).references(() => users.id).notNull(),
  categoryId: bigint('category_id', { mode: 'number', unsigned: true }).references(() => categories.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const recipe_images = mysqlTable('recipe_images', {
  id: bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
  recipeId: bigint('recipe_id', { mode: 'number', unsigned: true }).references(() => recipes.id).notNull(),
  imageUrl: varchar('image_url', { length: 255 }).notNull(),
  isFeatured: boolean('is_featured').default(false).notNull(),
});

export const ingredients = mysqlTable('ingredients', {
  id: bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
  recipeId: bigint('recipe_id', { mode: 'number', unsigned: true }).references(() => recipes.id).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  quantity: varchar('quantity', { length: 100 }).notNull(),
});

export const steps = mysqlTable('steps', {
  id: bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
  recipeId: bigint('recipe_id', { mode: 'number', unsigned: true }).references(() => recipes.id).notNull(),
  stepNumber: int('step_number').notNull(),
  description: text('description').notNull(),
});
export const likes = mysqlTable('likes', {
  id: bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
  recipeId: bigint('recipe_id', { mode: 'number', unsigned: true }).references(() => recipes.id).notNull(),
  userId: bigint('user_id', { mode: 'number', unsigned: true }).references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const bookmarks = mysqlTable('bookmarks', {
  id: bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
  recipeId: bigint('recipe_id', { mode: 'number', unsigned: true }).references(() => recipes.id).notNull(),
  userId: bigint('user_id', { mode: 'number', unsigned: true }).references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const comments = mysqlTable('comments', {
  id: bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
  recipeId: bigint('recipe_id', { mode: 'number', unsigned: true }).references(() => recipes.id).notNull(),
  userId: bigint('user_id', { mode: 'number', unsigned: true }).references(() => users.id).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const ratings = mysqlTable('ratings', {
  id: bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
  recipeId: bigint('recipe_id', { mode: 'number', unsigned: true }).references(() => recipes.id).notNull(),
  userId: bigint('user_id', { mode: 'number', unsigned: true }).references(() => users.id).notNull(),
  rating: int('rating').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const premiumRecipes = mysqlTable('premium_recipes', {
  id: bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
  recipeId: bigint('recipe_id', { mode: 'number', unsigned: true }).references(() => recipes.id).notNull(),
  price: int('price').notNull(), 
});

export const purchases = mysqlTable('purchases', {
  id: bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
  recipeId: bigint('recipe_id', { mode: 'number', unsigned: true }).references(() => recipes.id).notNull(),
  userId: bigint('user_id', { mode: 'number', unsigned: true }).references(() => users.id).notNull(),
  stripePaymentId: varchar('stripe_payment_id', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
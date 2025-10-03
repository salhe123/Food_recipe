import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/db';
import { categories } from '$lib/server/db/schema';
import { sql } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
  const categoryList = await db.select({ id: categories.id, name: categories.name }).from(categories);
  return { categories: categoryList };
};

export const actions: Actions = {
  seedCategories: async () => {
    const defaultCategories = ['Breakfast', 'Lunch', 'Dinner', 'Desserts'];
    await db
      .insert(categories)
      .values(defaultCategories.map((name) => ({ name })))
      .onDuplicateKeyUpdate({ set: { name: sql`${categories.name}` } });
    return { success: true };
  },
};
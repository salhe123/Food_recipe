import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/db';
import { categories, recipes, users, recipe_images } from '$lib/server/db/schema';
import { eq, and, sql } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
  const categoryList = await db.select({ id: categories.id, name: categories.name }).from(categories);

  const featuredRecipes = await db
    .select({
      id: recipes.id,
      title: recipes.title,
      description: recipes.description,
      prepTime: recipes.prepTime,
      username: users.username,
      category: categories.name,
      featuredImage: recipe_images.imageUrl,
    })
    .from(recipes)
    .innerJoin(users, eq(recipes.userId, users.id))
    .innerJoin(categories, eq(recipes.categoryId, categories.id))
    .leftJoin(recipe_images, and(eq(recipe_images.recipeId, recipes.id), eq(recipe_images.isFeatured, true)))
    .orderBy(recipes.createdAt)
    .limit(6);

  return {
    categories: categoryList,
    featuredRecipes,
  };
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
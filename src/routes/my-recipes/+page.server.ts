import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/db';
import { recipes, users, categories, recipe_images, steps, ingredients } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import pkg from 'jsonwebtoken';
import { env } from '$env/dynamic/private';


const { verify } = pkg;

export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get('token');
  if (!token) {
    return fail(401, { error: 'Unauthorized' });
  }

  let user: { id: number; email: string };
  try {
    user = verify(token, env.JWT_SECRET) as { id: number; email: string };
  } catch {
    return fail(401, { error: 'Invalid token' });
  }

  const userRecipes = await db
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
    .where(eq(recipes.userId, user.id));

  return { recipes: userRecipes };
};

export const actions: Actions = {
  delete: async ({ request, cookies }) => {
    const token = cookies.get('token');
    if (!token) {
      return fail(401, { error: 'Unauthorized' });
    }

    let user: { id: number; email: string };
    try {
      user = verify(token, env.JWT_SECRET) as { id: number; email: string };
    } catch {
      return fail(401, { error: 'Invalid token' });
    }

    const data = await request.formData();
    const recipeId = parseInt(data.get('recipeId')?.toString() || '0');

    if (isNaN(recipeId)) {
      return fail(400, { error: 'Invalid recipe ID' });
    }

    const [recipe] = await db.select().from(recipes).where(eq(recipes.id, recipeId)).limit(1);
    if (!recipe || recipe.userId !== user.id) {
      return fail(403, { error: 'Forbidden: You can only delete your own recipes' });
    }

    await db.delete(steps).where(eq(steps.recipeId, recipeId));
    await db.delete(ingredients).where(eq(ingredients.recipeId, recipeId));
    await db.delete(recipe_images).where(eq(recipe_images.recipeId, recipeId));
    await db.delete(recipes).where(eq(recipes.id, recipeId));

    return { success: true };
  },
};
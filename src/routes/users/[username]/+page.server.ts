import type { ServerLoad } from '@sveltejs/kit';
import { db } from '$lib/db';
import { recipes, users, categories, recipe_images } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';

export const load: ServerLoad = async ({ params }) => {
  const { username } = params as { username: string };

  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.username, username))
    .limit(1);

  if (!user) {
    throw fail(404, { error: 'User not found' });
  }

  const recipesList = await db
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

  // Fix image URLs for backward compatibility
  const fixedRecipesList = recipesList.map(recipe => ({
    ...recipe,
    featuredImage: recipe.featuredImage ? recipe.featuredImage.replace('/upload/', '/uploads/') : null
  }));

  return {
    username,
    recipes: fixedRecipesList,
  };
};
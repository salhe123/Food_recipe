import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { categories, recipes, users, recipe_images, likes, comments } from '$lib/server/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
  const categoryName = params.name.charAt(0).toUpperCase() + params.name.slice(1).toLowerCase();

  const [category] = await db
    .select({ id: categories.id, name: categories.name })
    .from(categories)
    .where(eq(categories.name, categoryName))
    .limit(1);

  if (!category) {
    throw fail(404, { error: 'Category not found' });
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
    .where(eq(categories.name, categoryName));

  // Get like and comment counts for each recipe
  const recipesWithCounts = await Promise.all(
    recipesList.map(async (recipe) => {
      const [likeData] = await db
        .select({ count: sql<number>`count(*)`.as('count') })
        .from(likes)
        .where(eq(likes.recipeId, recipe.id));

      const [commentData] = await db
        .select({ count: sql<number>`count(*)`.as('count') })
        .from(comments)
        .where(eq(comments.recipeId, recipe.id));

      return {
        ...recipe,
        likeCount: likeData.count,
        commentCount: commentData.count,
      };
    })
  );

  // Fix image URLs for backward compatibility
  const fixedRecipesList = recipesWithCounts.map(recipe => ({
    ...recipe,
    featuredImage: recipe.featuredImage ? recipe.featuredImage.replace('/upload/', '/uploads/') : null
  }));

  return {
    category,
    recipes: fixedRecipesList,
  };
};
import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { recipes, users, categories, recipe_images, ingredients } from '$lib/server/db/schema';
import { eq, and, like } from 'drizzle-orm';

export const load: PageServerLoad = async ({ url }) => {
  const searchQuery = url.searchParams.get('search') || '';
  const prepTime = parseInt(url.searchParams.get('prepTime') || '0');
  const ingredient = url.searchParams.get('ingredient') || '';

  let query: any = db
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
    .leftJoin(recipe_images, and(eq(recipe_images.recipeId, recipes.id), eq(recipe_images.isFeatured, true)));

  if (searchQuery || prepTime > 0 || ingredient) {
    query = query.where(
      and(
        searchQuery ? like(recipes.title, `%${searchQuery}%`) : undefined,
        prepTime > 0 ? eq(recipes.prepTime, prepTime) : undefined,
        ingredient ? like(ingredients.name, `%${ingredient}%`) : undefined
      )
    );
  }

  if (ingredient) {
    query = query.innerJoin(ingredients, eq(ingredients.recipeId, recipes.id));
  }

  const recipesList = await query;

  // Fix image URLs for backward compatibility
  const fixedRecipesList = recipesList.map(recipe => ({
    ...recipe,
    featuredImage: recipe.featuredImage ? recipe.featuredImage.replace('/upload/', '/uploads/') : null
  }));

  return {
    recipes: fixedRecipesList,
  };
};
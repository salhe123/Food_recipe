import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { categories, recipes, users, recipe_images } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
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

  // Fix image URLs for backward compatibility
  const fixedRecipesList = recipesList.map(recipe => ({
    ...recipe,
    featuredImage: recipe.featuredImage ? recipe.featuredImage.replace('/upload/', '/uploads/') : null
  }));

  return {
    category,
    recipes: fixedRecipesList,
  };
};
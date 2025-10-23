import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/db';
import { categories, recipes, users, recipe_images, likes, comments, bookmarks } from '$lib/server/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import pkg from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

const { verify } = pkg;

export const load: PageServerLoad = async ({ cookies }) => {
  // Get user info if logged in
  let userId: number | null = null;
  const token = cookies.get('token');
  if (token) {
    try {
      const user = verify(token, env.JWT_SECRET) as { id: number; email: string };
      userId = user.id;
    } catch {
      // Invalid token, ignore
    }
  }
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

  // Get like and comment counts for each recipe
  const recipesWithCounts = await Promise.all(
    featuredRecipes.map(async (recipe) => {
      const [likeData] = await db
        .select({ count: sql<number>`count(*)`.as('count') })
        .from(likes)
        .where(eq(likes.recipeId, recipe.id));

      const [commentData] = await db
        .select({ count: sql<number>`count(*)`.as('count') })
        .from(comments)
        .where(eq(comments.recipeId, recipe.id));

      // Check if user has liked/bookmarked this recipe
      let isLiked = false;
      let isBookmarked = false;
      
      if (userId) {
        const userLike = await db
          .select()
          .from(likes)
          .where(and(eq(likes.recipeId, recipe.id), eq(likes.userId, userId)))
          .limit(1);
        isLiked = userLike.length > 0;

        const userBookmark = await db
          .select()
          .from(bookmarks)
          .where(and(eq(bookmarks.recipeId, recipe.id), eq(bookmarks.userId, userId)))
          .limit(1);
        isBookmarked = userBookmark.length > 0;
      }

      return {
        ...recipe,
        likeCount: likeData.count,
        commentCount: commentData.count,
        isLiked,
        isBookmarked,
      };
    })
  );

  // Fix image URLs for backward compatibility
  const fixedFeaturedRecipes = recipesWithCounts.map(recipe => ({
    ...recipe,
    featuredImage: recipe.featuredImage ? recipe.featuredImage.replace('/upload/', '/uploads/') : null
  }));

  return {
    categories: categoryList,
    featuredRecipes: fixedFeaturedRecipes,
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
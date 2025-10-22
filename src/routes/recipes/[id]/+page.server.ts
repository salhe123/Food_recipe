import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/db';
import { recipes, recipe_images, ingredients, steps, categories, likes, bookmarks, comments, ratings, premiumRecipes, purchases, users } from '$lib/server/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import pkg from 'jsonwebtoken';
const { verify } = pkg;
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ params, cookies }) => {
  const recipeId = parseInt(params.id);
  if (isNaN(recipeId)) {
    throw fail(400, { error: 'Invalid recipe ID' });
  }

  const userId = (() => {
    const token = cookies.get('token');
    if (!token) return null;
    try {
      const user = verify(token, env.JWT_SECRET) as { id: number; email: string };
      return user.id;
    } catch {
      return null;
    }
  })();

  const [recipe] = await db
    .select({
      id: recipes.id,
      title: recipes.title,
      description: recipes.description,
      prepTime: recipes.prepTime,
      userId: recipes.userId,
      category: { id: categories.id, name: categories.name },
    })
    .from(recipes)
    .leftJoin(categories, eq(recipes.categoryId, categories.id))
    .where(eq(recipes.id, recipeId))
    .limit(1);

  if (!recipe) {
    throw fail(404, { error: 'Recipe not found' });
  }

  const recipeImages = await db
    .select({ imageUrl: recipe_images.imageUrl, isFeatured: recipe_images.isFeatured })
    .from(recipe_images)
    .where(eq(recipe_images.recipeId, recipeId));

  // Fix image URLs for backward compatibility
  const fixedImages = recipeImages.map(img => ({
    ...img,
    imageUrl: img.imageUrl.replace('/upload/', '/uploads/')
  }));

  const recipeIngredients = await db
    .select({ name: ingredients.name, quantity: ingredients.quantity })
    .from(ingredients)
    .where(eq(ingredients.recipeId, recipeId));

  const recipeSteps = await db
    .select({ stepNumber: steps.stepNumber, description: steps.description })
    .from(steps)
    .where(eq(steps.recipeId, recipeId))
    .orderBy(steps.stepNumber);

  const [likeData] = await db
    .select({ count: sql<number>`count(*)`.as('count') })
    .from(likes)
    .where(eq(likes.recipeId, recipeId));

  const isLiked = userId
    ? (await db.select().from(likes).where(and(eq(likes.recipeId, recipeId), eq(likes.userId, userId))).limit(1)).length > 0
    : false;

  const isBookmarked = userId
    ? (await db.select().from(bookmarks).where(and(eq(bookmarks.recipeId, recipeId), eq(bookmarks.userId, userId))).limit(1)).length > 0
    : false;

  const commentsList = await db
    .select({
      id: comments.id,
      content: comments.content,
      username: users.username,
      createdAt: comments.createdAt,
    })
    .from(comments)
    .innerJoin(users, eq(comments.userId, users.id))
    .where(eq(comments.recipeId, recipeId))
    .orderBy(comments.createdAt);

  const [ratingData] = await db
    .select({
      average: sql<number>`avg(rating)`.as('average'),
      count: sql<number>`count(*)`.as('count'),
    })
    .from(ratings)
    .where(eq(ratings.recipeId, recipeId));

  const userRating = userId
    ? (await db.select({ rating: ratings.rating }).from(ratings).where(and(eq(ratings.recipeId, recipeId), eq(ratings.userId, userId))).limit(1))[0]?.rating
    : null;

  const [premiumData] = await db
    .select({ price: premiumRecipes.price })
    .from(premiumRecipes)
    .where(eq(premiumRecipes.recipeId, recipeId))
    .limit(1);

  const isPurchased = userId && premiumData
    ? (await db.select().from(purchases).where(and(eq(purchases.recipeId, recipeId), eq(purchases.userId, userId))).limit(1)).length > 0
    : false;

  return {
    recipe: {
      ...recipe,
      images: fixedImages,
      ingredients: recipeIngredients,
      steps: recipeSteps,
      likeCount: likeData.count,
      isLiked,
      isBookmarked,
      comments: commentsList,
      averageRating: ratingData.average || 0,
      ratingCount: ratingData.count,
      userRating,
      isPremium: !!premiumData,
      price: premiumData?.price || 0,
      isPurchased,
    },
  };
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

    return { success: true, redirectTo: '/my-recipes' };
  },

  toggleLike: async ({ request, cookies }) => {
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

    const existingLike = await db
      .select()
      .from(likes)
      .where(and(eq(likes.recipeId, recipeId), eq(likes.userId, user.id)))
      .limit(1);

    if (existingLike.length > 0) {
      await db.delete(likes).where(and(eq(likes.recipeId, recipeId), eq(likes.userId, user.id)));
    } else {
      await db.insert(likes).values({ recipeId, userId: user.id });
    }

    return { success: true };
  },

  toggleBookmark: async ({ request, cookies }) => {
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

    const existingBookmark = await db
      .select()
      .from(bookmarks)
      .where(and(eq(bookmarks.recipeId, recipeId), eq(bookmarks.userId, user.id)))
      .limit(1);

    if (existingBookmark.length > 0) {
      await db.delete(bookmarks).where(and(eq(bookmarks.recipeId, recipeId), eq(bookmarks.userId, user.id)));
    } else {
      await db.insert(bookmarks).values({ recipeId, userId: user.id });
    }

    return { success: true };
  },

  comment: async ({ request, cookies }) => {
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
    const content = data.get('content')?.toString();

    if (isNaN(recipeId) || !content?.trim()) {
      return fail(400, { error: 'Invalid recipe ID or comment content' });
    }

    await db.insert(comments).values({ recipeId, userId: user.id, content });

    return { success: true };
  },

  rate: async ({ request, cookies }) => {
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
    const rating = parseInt(data.get('rating')?.toString() || '0');

    if (isNaN(recipeId) || isNaN(rating) || rating < 1 || rating > 5) {
      return fail(400, { error: 'Invalid recipe ID or rating' });
    }

    await db
      .insert(ratings)
      .values({ recipeId, userId: user.id, rating })
      .onDuplicateKeyUpdate({ set: { rating: sql`${rating}` } });

    return { success: true };
  },

  purchase: async ({ request, cookies }) => {
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

    const [premiumData] = await db
      .select({ price: premiumRecipes.price })
      .from(premiumRecipes)
      .where(eq(premiumRecipes.recipeId, recipeId))
      .limit(1);

    if (!premiumData) {
      return fail(400, { error: 'Recipe is not premium' });
    }

    await db.insert(purchases).values({
      recipeId,
      userId: user.id,
      stripePaymentId: `mock_${recipeId}_${user.id}`, // Mock ID for testing
    });

    return { success: true };
  },
};
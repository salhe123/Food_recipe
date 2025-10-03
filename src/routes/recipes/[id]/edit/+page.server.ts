import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/db';
import { recipes, recipe_images, ingredients, steps, categories } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import pkg from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import { eq } from 'drizzle-orm';
import { promises as fs } from 'fs';
import path from 'path';

const { verify } = pkg;

export const load: PageServerLoad = async ({ params, cookies }) => {
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

  const recipeId = parseInt(params.id);
  if (isNaN(recipeId)) {
    return fail(400, { error: 'Invalid recipe ID' });
  }

  const [recipe] = await db
    .select({
      id: recipes.id,
      title: recipes.title,
      description: recipes.description,
      prepTime: recipes.prepTime,
      userId: recipes.userId,
      categoryId: recipes.categoryId,
    })
    .from(recipes)
    .where(eq(recipes.id, recipeId))
    .limit(1);

  if (!recipe || recipe.userId !== user.id) {
    return fail(403, { error: 'Forbidden: You can only edit your own recipes' });
  }

  const recipeImages = await db
    .select({ imageUrl: recipe_images.imageUrl, isFeatured: recipe_images.isFeatured })
    .from(recipe_images)
    .where(eq(recipe_images.recipeId, recipeId));

  const recipeIngredients = await db
    .select({ name: ingredients.name, quantity: ingredients.quantity })
    .from(ingredients)
    .where(eq(ingredients.recipeId, recipeId));

  const recipeSteps = await db
    .select({ description: steps.description })
    .from(steps)
    .where(eq(steps.recipeId, recipeId))
    .orderBy(steps.stepNumber);

  const categoriesList = await db.select({ id: categories.id, name: categories.name }).from(categories);

  return {
    recipe: {
      ...recipe,
      images: recipeImages,
      ingredients: recipeIngredients,
      steps: recipeSteps,
    },
    categories: categoriesList,
  };
};

export const actions: Actions = {
  edit: async ({ request, cookies, params }) => {
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

    const recipeId = parseInt(params.id);
    if (isNaN(recipeId)) {
      return fail(400, { error: 'Invalid recipe ID' });
    }

    const [recipe] = await db.select().from(recipes).where(eq(recipes.id, recipeId)).limit(1);
    if (!recipe || recipe.userId !== user.id) {
      return fail(403, { error: 'Forbidden: You can only edit your own recipes' });
    }

    const data = await request.formData();
    const title = data.get('title')?.toString();
    const description = data.get('description')?.toString();
    const prepTime = parseInt(data.get('prepTime')?.toString() || '0');
    const categoryId = parseInt(data.get('categoryId')?.toString() || '0');
    const images = data.getAll('images') as File[];
    const featuredImageIndex = parseInt(data.get('featuredImageIndex')?.toString() || '0');
    const ingredientsList = JSON.parse(data.get('ingredients')?.toString() || '[]');
    const stepsList = JSON.parse(data.get('steps')?.toString() || '[]');

    if (!title || !description || !prepTime || !categoryId || !ingredientsList.length || !stepsList.length) {
      return fail(400, { error: 'Missing required fields' });
    }

    try {
      await db.update(recipes).set({ title, description, prepTime, categoryId }).where(eq(recipes.id, recipeId));

      await db.delete(recipe_images).where(eq(recipe_images.recipeId, recipeId));
      if (images.length > 0) {
        const uploadDir = path.join(process.cwd(), 'static/uploads');
        await fs.mkdir(uploadDir, { recursive: true });

        const imageUrls: string[] = [];
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          if (image.size > 0) {
            const fileName = `${recipeId}-${Date.now()}-${i}${path.extname(image.name)}`;
            const filePath = path.join(uploadDir, fileName);
            const buffer = Buffer.from(await image.arrayBuffer());
            await fs.writeFile(filePath, buffer);
            imageUrls.push(`/uploads/${fileName}`);
          }
        }

        await db.insert(recipe_images).values(
          imageUrls.map((url, i) => ({
            recipeId: recipeId,
            imageUrl: url,
            isFeatured: i === featuredImageIndex,
          }))
        );
      }

      await db.delete(ingredients).where(eq(ingredients.recipeId, recipeId));
      await db.insert(ingredients).values(
        ingredientsList.map((ing: { name: string; quantity: string }) => ({
          recipeId: recipeId,
          name: ing.name,
          quantity: ing.quantity,
        }))
      );

      await db.delete(steps).where(eq(steps.recipeId, recipeId));
      await db.insert(steps).values(
        stepsList.map((step: { description: string }, i: number) => ({
          recipeId: recipeId,
          stepNumber: i + 1,
          description: step.description,
        }))
      );

      return { success: true };
    } catch (error) {
      return fail(500, { error: 'Failed to update recipe' });
    }
  },
};
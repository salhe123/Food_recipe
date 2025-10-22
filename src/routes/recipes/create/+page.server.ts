import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/db';
import { recipes, recipe_images, ingredients, steps, categories, premiumRecipes } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import pkg from 'jsonwebtoken';
const { verify } = pkg;
import { env } from '$env/dynamic/private';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export const load: PageServerLoad = async () => {
  const categoriesList = await db
    .select({ id: categories.id, name: categories.name })
    .from(categories);
  return { categories: categoriesList };
};

export const actions: Actions = {
  create: async ({ request, cookies }) => {
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
    const title = data.get('title')?.toString();
    const description = data.get('description')?.toString();
    const prepTime = parseInt(data.get('prepTime')?.toString() || '0');
    const categoryId = parseInt(data.get('categoryId')?.toString() || '0');
    const isPremium = data.get('isPremium') === 'on';
    const price = parseFloat(data.get('price')?.toString() || '0') * 100;
    const ingredientData = JSON.parse(data.get('ingredients')?.toString() || '[]');
    const stepData = JSON.parse(data.get('steps')?.toString() || '[]');
    const images = data.getAll('images') as File[];
    const featuredImageIndex = parseInt(data.get('featuredImageIndex')?.toString() || '0');

    if (!title || !description || isNaN(prepTime) || isNaN(categoryId) || !ingredientData.length || !stepData.length) {
      return fail(400, { error: 'Missing required fields' });
    }

    if (isPremium && (isNaN(price) || price <= 0)) {
      return fail(400, { error: 'Invalid price for premium recipe' });
    }

    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, categoryId))
      .limit(1);

    if (!category) {
      return fail(400, { error: 'Invalid category' });
    }

    // Insert recipe
    await db.insert(recipes).values({
      title,
      description,
      prepTime,
      categoryId,
      userId: user.id,
      createdAt: new Date(),
    });

    // Get newly created recipe
    const [newRecipe] = await db
      .select({ id: recipes.id })
      .from(recipes)
      .orderBy(desc(recipes.id)) // ✅ Fixed TS error
      .limit(1);

    // Handle images
    if (images.length > 0) {
      const uploadDir = join(process.cwd(), 'static/uploads');
      await writeFile(join(uploadDir, '.gitkeep'), '').catch(() => {}); // Ensure directory exists
      
      const imageUrls = await Promise.all(
        images.map(async (image, index) => {
          const fileName = `${newRecipe.id}-${Date.now()}-${index}${image.name ? '.' + image.name.split('.').pop() : '.jpg'}`;
          const filePath = join(uploadDir, fileName);
          await writeFile(filePath, Buffer.from(await image.arrayBuffer()));
          const imageUrl = `/uploads/${fileName}`;
          return { imageUrl, isFeatured: index === featuredImageIndex };
        })
      );

      await db.insert(recipe_images).values(
        imageUrls.map(({ imageUrl, isFeatured }) => ({
          recipeId: newRecipe.id,
          imageUrl,
          isFeatured,
        }))
      );
    }

    // Insert ingredients
    await db.insert(ingredients).values(
      ingredientData.map((ing: { name: string; quantity: string }) => ({
        recipeId: newRecipe.id,
        name: ing.name,
        quantity: ing.quantity,
      }))
    );

    // Insert steps
    await db.insert(steps).values(
      stepData.map((step: { description: string }, index: number) => ({
        recipeId: newRecipe.id,
        stepNumber: index + 1,
        description: step.description,
      }))
    );

    // Insert premium info if applicable
    if (isPremium) {
      await db.insert(premiumRecipes).values({
        recipeId: newRecipe.id,
        price,
      });
    }

    return { success: true };
  },
};

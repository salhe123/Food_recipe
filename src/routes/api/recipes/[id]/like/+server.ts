import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { likes } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import pkg from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

const { verify } = pkg;

export const POST: RequestHandler = async ({ params, cookies }) => {
  const token = cookies.get('token');
  if (!token) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  let user: { id: number; email: string };
  try {
    user = verify(token, env.JWT_SECRET) as { id: number; email: string };
  } catch {
    return json({ error: 'Invalid token' }, { status: 401 });
  }

  const recipeId = parseInt(params.id);
  if (isNaN(recipeId)) {
    return json({ error: 'Invalid recipe ID' }, { status: 400 });
  }

  try {
    // Check if already liked
    const existingLike = await db
      .select()
      .from(likes)
      .where(and(eq(likes.recipeId, recipeId), eq(likes.userId, user.id)))
      .limit(1);

    if (existingLike.length > 0) {
      // Unlike
      await db
        .delete(likes)
        .where(and(eq(likes.recipeId, recipeId), eq(likes.userId, user.id)));
      
      return json({ success: true, action: 'unliked' });
    } else {
      // Like
      await db
        .insert(likes)
        .values({
          recipeId,
          userId: user.id
        });
      
      return json({ success: true, action: 'liked' });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};

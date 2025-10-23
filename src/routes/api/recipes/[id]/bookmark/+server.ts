import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { bookmarks } from '$lib/server/db/schema';
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
    // Check if already bookmarked
    const existingBookmark = await db
      .select()
      .from(bookmarks)
      .where(and(eq(bookmarks.recipeId, recipeId), eq(bookmarks.userId, user.id)))
      .limit(1);

    if (existingBookmark.length > 0) {
      // Remove bookmark
      await db
        .delete(bookmarks)
        .where(and(eq(bookmarks.recipeId, recipeId), eq(bookmarks.userId, user.id)));
      
      return json({ success: true, action: 'unbookmarked' });
    } else {
      // Add bookmark
      await db
        .insert(bookmarks)
        .values({
          recipeId,
          userId: user.id
        });
      
      return json({ success: true, action: 'bookmarked' });
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};

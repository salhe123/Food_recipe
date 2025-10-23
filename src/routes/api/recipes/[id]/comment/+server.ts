import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { comments } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import pkg from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

const { verify } = pkg;

export const POST: RequestHandler = async ({ params, cookies, request }) => {
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

  const { content } = await request.json();
  if (!content || content.trim().length === 0) {
    return json({ error: 'Comment content is required' }, { status: 400 });
  }

  try {
    const [newComment] = await db
      .insert(comments)
      .values({
        recipeId,
        userId: user.id,
        content: content.trim()
      })
      .returning();

    // Get the comment with user info
    const commentWithUser = await db
      .select({
        id: comments.id,
        content: comments.content,
        createdAt: comments.createdAt,
        username: db.select({ username: db.select().from(db.users).where(eq(db.users.id, user.id)) })
      })
      .from(comments)
      .where(eq(comments.id, newComment.id))
      .limit(1);

    return json({ 
      success: true, 
      comment: {
        id: newComment.id,
        content: newComment.content,
        createdAt: newComment.createdAt,
        username: user.email.split('@')[0] // Use email prefix as username for now
      }
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};

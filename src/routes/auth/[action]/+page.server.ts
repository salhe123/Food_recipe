import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import pkg from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
import { env } from '$env/dynamic/private';

const { sign } = pkg;
const JWT_SECRET = env.JWT_SECRET;

export const load: PageServerLoad = async ({ params }) => {
  return { action: params.action };
};

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();

    if (!email || !password) {
      return fail(400, { error: 'Missing email or password' });
    }

    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!user || !(await compare(password, user.password))) {
      return fail(401, { error: 'Invalid credentials' });
    }

    const token = sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    cookies.set('token', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
    });

    return { user: { id: user.id, username: user.username, email: user.email }, token };
  },

  signup: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get('username')?.toString();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();

    if (!username || !email || !password) {
      return fail(400, { error: 'Missing fields' });
    }

    const [existingUser] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUser) {
      return fail(400, { error: 'Email or username already exists' });
    }

    const hashedPassword = await hash(password, 10);
    await db.insert(users).values({ username, email, password: hashedPassword });
    const [newUser] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    const token = sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });
    cookies.set('token', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, 
    });

    return { user: { id: newUser.id, username: newUser.username, email: newUser.email }, token };
  },
};
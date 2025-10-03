import { db } from '$lib/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { hash, compare } from 'bcrypt';

export async function verifyUser(email: string, password: string) {
  const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (!user[0]) return null;
  const isValid = await compare(password, user[0].password);
  return isValid ? user[0] : null;
}

export async function createUser(username: string, email: string, password: string) {
  const hashedPassword = await hash(password, 10);
  await db.insert(users).values({ username, email, password: hashedPassword });
  const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return user[0];
}
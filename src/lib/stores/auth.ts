import { writable } from 'svelte/store';
import type { User } from '$lib/types';

function createAuthStore() {
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('auth') : null;
  const initial = stored ? JSON.parse(stored) : { user: null, token: null };

  const { subscribe, set } = writable(initial);

  return {
    subscribe,
    set: (data: { user: User | null; token: string | null }) => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('auth', JSON.stringify(data));
      }
      set(data);
    },
    logout: () => {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('auth');
      }
      set({ user: null, token: null });
    },
  };
}

export const authStore = createAuthStore();

export async function login(email: string, password: string) {
  const response = await fetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Login failed');

  const { user, token } = await response.json();
  authStore.set({ user, token }); 
}

export async function signup(username: string, email: string, password: string) {
  const response = await fetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Signup failed');

  const { user, token } = await response.json();
  authStore.set({ user, token }); 
}

export function logout() {
  authStore.logout();
}

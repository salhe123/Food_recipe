<script lang="ts">
  import { enhance } from '$app/forms';
  import { authStore } from '$lib/stores/auth';
  import type { ActionResult } from '@sveltejs/kit';
  let error = '';

  let email = '';
  let password = '';
</script>

<div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
  <h2 class="text-2xl font-bold mb-4 text-center text-gray-800">Login</h2>

  {#if error}
    <p class="text-red-500 mb-4 text-center">{error}</p>
  {/if}

  <form
    method="POST"
    action="?/login"
    use:enhance={() => {
      error = '';
      return async ({
        result,
      }: {
        result: ActionResult<{ user: { id: number; username: string; email: string }; token: string } | { error: string }>;
      }) => {
        if (result.type === 'success' && result.data && 'user' in result.data && 'token' in result.data) {
          // persist user in localStorage via authStore
          authStore.set({ user: result.data.user, token: result.data.token });
          // redirect to homepage
          window.location.href = '/';
        } else if (result.type === 'failure' && result.data && 'error' in result.data) {
          error = result.data.error;
        } else {
          error = 'Login failed';
        }
      };
    }}
    class="space-y-4"
  >
    <input
      type="email"
      name="email"
      bind:value={email}
      placeholder="Email"
      class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="password"
      name="password"
      bind:value={password}
      placeholder="Password"
      class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
    >
      Login
    </button>
  </form>

  <p class="mt-4 text-center text-gray-600">
    Don't have an account? <a href="/auth/signup" class="text-blue-500 hover:underline">Sign up</a>
  </p>
</div>

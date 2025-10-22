<script lang="ts">
  import { enhance } from '$app/forms';
  import { authStore } from '$lib/stores/auth';
  import type { ActionResult } from '@sveltejs/kit';
  let error = '';
  let isLoading = false;

  let email = '';
  let password = '';
</script>

<div class="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 flex items-center justify-center p-4">
  <div class="max-w-md w-full">
    <!-- Logo/Brand -->
    <div class="text-center mb-8">
      <a href="/" class="inline-block">
        <h1 class="text-4xl font-bold text-white mb-2">RecipeApp</h1>
        <p class="text-white text-opacity-90">Welcome back to your kitchen</p>
      </a>
    </div>

    <!-- Login Form -->
    <div class="bg-white rounded-3xl shadow-2xl p-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
        <p class="text-gray-600">Sign in to continue your culinary journey</p>
      </div>

      {#if error}
        <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
          <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
          <span class="text-sm font-medium">{error}</span>
        </div>
      {/if}

      <form
        method="POST"
        action="?/login"
        use:enhance={() => {
          error = '';
          isLoading = true;
          return async ({
            result,
          }: {
            result: ActionResult<{ user: { id: number; username: string; email: string }; token: string } | { error: string }>;
          }) => {
            isLoading = false;
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
        class="space-y-6"
      >
        <!-- Email Field -->
        <div>
          <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
              </svg>
            </div>
            <input
              id="email"
              type="email"
              name="email"
              bind:value={email}
              placeholder="Enter your email"
              required
              class="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg"
            />
          </div>
        </div>

        <!-- Password Field -->
        <div>
          <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <input
              id="password"
              type="password"
              name="password"
              bind:value={password}
              placeholder="Enter your password"
              required
              class="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg"
            />
          </div>
        </div>

        <!-- Remember Me & Forgot Password -->
        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input type="checkbox" class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded">
            <span class="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <a href="#" class="text-sm text-orange-600 hover:text-orange-500 font-medium">Forgot password?</a>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          disabled={isLoading}
          class="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 focus:ring-4 focus:ring-orange-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
        >
          {#if isLoading}
            <div class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </div>
          {:else}
            Sign In
          {/if}
        </button>
      </form>

      <!-- Divider -->
      <div class="mt-8 mb-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">New to RecipeApp?</span>
          </div>
        </div>
      </div>

      <!-- Sign Up Link -->
      <div class="text-center">
        <a 
          href="/auth/signup" 
          class="inline-flex items-center justify-center w-full bg-white border-2 border-orange-500 text-orange-600 font-semibold py-4 px-6 rounded-xl hover:bg-orange-50 transition-all text-lg"
        >
          Create New Account
        </a>
      </div>
    </div>

    <!-- Back to Home -->
    <div class="text-center mt-6">
      <a href="/" class="text-white text-opacity-80 hover:text-opacity-100 transition-all flex items-center justify-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Home
      </a>
    </div>
  </div>
</div>

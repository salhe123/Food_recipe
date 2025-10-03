<script lang="ts">
  import { authStore } from '$lib/stores/auth';
</script>

<header class="bg-white shadow">
  <nav class="w-full px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between py-4">
      <a href="/" class="text-2xl font-bold text-blue-600">RecipeApp</a>
      <div class="flex items-center space-x-6">
        <a href="/" class="text-gray-600 hover:text-blue-500">Home</a>
        <a href="/recipes" class="text-gray-600 hover:text-blue-500">Recipes</a>
        <a href="/categories" class="text-gray-600 hover:text-blue-500">Categories</a>
        {#if $authStore.user}
          <a href="/recipes/create" class="text-gray-600 hover:text-blue-500">Create Recipe</a>
          <div class="group relative">
            <span
              class="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white"
            >
              {$authStore.user.username[0].toUpperCase()}
            </span>
            <div
              class="invisible absolute right-0 mt-2 w-32 rounded-md bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100"
            >
              <a href="/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Profile
              </a>
              <a href="/my-recipes" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                My Recipes
              </a>
              <button
                onclick={() => authStore.logout()}
                class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        {:else}
          <a href="/auth/login" class="text-gray-600 hover:text-blue-500">Login</a>
          <a href="/auth/signup" class="text-gray-600 hover:text-blue-500">Sign Up</a>
        {/if}
      </div>
    </div>
  </nav>
</header>
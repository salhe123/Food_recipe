<script lang="ts">
  import type { PageData } from './$types';
  import RecipeCard from '$lib/components/recipes/RecipeCard.svelte';

  let { data } = $props<{ data: PageData }>();
</script>

<svelte:head>
  <title>RecipeApp - {data.username}'s Recipes</title>
  <meta name="description" content="Explore recipes by {data.username}" />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <!-- User Profile Header -->
  <section class="bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-3xl p-8 sm:p-12 mb-12 text-white text-center shadow-2xl">
    <div class="max-w-2xl mx-auto">
      <div class="w-24 h-24 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
        <span class="text-4xl font-bold text-white">
          {data.username[0].toUpperCase()}
        </span>
      </div>
      <h1 class="text-4xl sm:text-5xl font-bold mb-4">{data.username}</h1>
      <p class="text-xl text-white/90 mb-6">
        Food enthusiast sharing amazing recipes with the community
      </p>
      <div class="flex items-center justify-center gap-8">
        <div class="text-center">
          <div class="text-3xl font-bold">{data.recipes.length}</div>
          <div class="text-white/80">Recipes</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold">0</div>
          <div class="text-white/80">Followers</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold">0</div>
          <div class="text-white/80">Following</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Recipes Section -->
  <section>
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-2">Recipes by {data.username}</h2>
      <p class="text-gray-600">Discover all the delicious recipes shared by this amazing cook</p>
    </div>
    
    {#if data.recipes.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {#each data.recipes as recipe}
          <RecipeCard {recipe} />
        {/each}
      </div>
    {:else}
      <div class="text-center py-16">
        <div class="w-32 h-32 mx-auto mb-8 bg-gray-200 rounded-full flex items-center justify-center">
          <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">No recipes yet</h3>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          {data.username} hasn't shared any recipes yet. Check back later for amazing culinary creations!
        </p>
        <a
          href="/recipes"
          class="inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
        >
          Browse All Recipes
        </a>
      </div>
    {/if}
  </section>
</div>
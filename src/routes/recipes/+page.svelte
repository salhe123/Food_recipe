<script lang="ts">
  import type { PageData } from './$types';
  import RecipeCard from '$lib/components/recipes/RecipeCard.svelte';
  import { page } from '$app/stores';

  let { data } = $props<{ data: PageData }>();
  let searchQuery = $state($page.url.searchParams.get('search') || '');
  let prepTime = $state($page.url.searchParams.get('prepTime') || '');
  let ingredient = $state($page.url.searchParams.get('ingredient') || '');
</script>

<svelte:head>
  <title>RecipeApp - Browse Recipes</title>
  <meta name="description" content="Browse and filter recipes on RecipeApp" />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <!-- Hero Section -->
  <section class="text-center mb-12">
    <h1 class="text-5xl sm:text-6xl font-bold text-gray-800 mb-6">Discover Amazing Recipes</h1>
    <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
      Find the perfect recipe by searching or filtering by prep time, ingredients, or categories.
    </p>
  </section>

  <!-- Search and Filter Section -->
  <section class="bg-white rounded-3xl shadow-2xl p-8 mb-12 border border-gray-100">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Search & Filter</h2>
    <form method="GET" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label for="search" class="block text-gray-700 mb-2 font-semibold">Search by Title</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              id="search"
              name="search"
              bind:value={searchQuery}
              placeholder="Enter recipe title..."
              class="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg"
            />
          </div>
        </div>
        <div>
          <label for="prepTime" class="block text-gray-700 mb-2 font-semibold">Max Prep Time</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <input
              id="prepTime"
              name="prepTime"
              type="number"
              bind:value={prepTime}
              placeholder="E.g., 30"
              class="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg"
            />
          </div>
        </div>
        <div>
          <label for="ingredient" class="block text-gray-700 mb-2 font-semibold">Ingredient</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
            </div>
            <input
              id="ingredient"
              name="ingredient"
              bind:value={ingredient}
              placeholder="E.g., Chicken"
              class="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <button
          type="submit"
          class="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
        >
          Search Recipes
        </button>
      </div>
    </form>
  </section>

  <!-- Results Section -->
  <section>
    {#if data.recipes.length > 0}
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Found {data.recipes.length} Recipe{data.recipes.length !== 1 ? 's' : ''}</h2>
        <p class="text-gray-600">Here are the recipes matching your search criteria</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {#each data.recipes as recipe}
          <RecipeCard {recipe} />
        {/each}
      </div>
    {:else}
      <div class="text-center py-16">
        <div class="w-32 h-32 mx-auto mb-8 bg-gray-200 rounded-full flex items-center justify-center">
          <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">No recipes found</h3>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          We couldn't find any recipes matching your search criteria. Try adjusting your filters or search terms.
        </p>
        <a
          href="/recipes"
          class="inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
        >
          View All Recipes
        </a>
      </div>
    {/if}
  </section>
</div>
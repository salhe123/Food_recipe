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

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
  <section class="text-center">
    <h1 class="text-4xl font-bold text-gray-800 mb-4">Browse Recipes</h1>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
      Find the perfect recipe by searching or filtering by prep time or ingredients.
    </p>
  </section>

  <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
    <form method="GET" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label for="search" class="block text-gray-700 mb-1 font-medium">Search by Title</label>
        <input
          id="search"
          name="search"
          bind:value={searchQuery}
          placeholder="Enter recipe title"
          class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label for="prepTime" class="block text-gray-700 mb-1 font-medium">Max Prep Time (min)</label>
        <input
          id="prepTime"
          name="prepTime"
          type="number"
          bind:value={prepTime}
          placeholder="E.g., 30"
          class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label for="ingredient" class="block text-gray-700 mb-1 font-medium">Ingredient</label>
        <input
          id="ingredient"
          name="ingredient"
          bind:value={ingredient}
          placeholder="E.g., Chicken"
          class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="sm:col-span-3 flex justify-end">
        <button
          type="submit"
          class="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Filter
        </button>
      </div>
    </form>
  </section>

  <section>
    {#if data.recipes.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each data.recipes as recipe}
          <RecipeCard {recipe} />
        {/each}
      </div>
    {:else}
      <p class="text-gray-600 text-center">No recipes match your criteria.</p>
    {/if}
  </section>
</div>
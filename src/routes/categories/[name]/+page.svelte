<script lang="ts">
  import type { PageData } from './$types';
  import { authStore } from '$lib/stores/auth';
  import RecipeCard from '$lib/components/recipes/RecipeCard.svelte';

  let { data } = $props<{ data: PageData }>();
</script>

<svelte:head>
  <title>RecipeApp - {data.category.name} Recipes</title>
  <meta name="description" content="Explore {data.category.name} recipes on RecipeApp" />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <!-- Hero Section -->
  <section class="text-center mb-12">
    <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
      <span class="text-4xl font-bold text-white">
        {data.category.name[0]}
      </span>
    </div>
    <h1 class="text-5xl sm:text-6xl font-bold text-gray-800 mb-6">{data.category.name} Recipes</h1>
    <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
      Discover amazing {data.category.name.toLowerCase()} recipes from our community. From quick and easy to gourmet masterpieces.
    </p>
  </section>

  <!-- Recipes Section -->
  <section>
    {#if data.recipes.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {#each data.recipes as recipe}
          <RecipeCard {recipe} />
        {/each}
      </div>
    {:else}
      <div class="text-center py-16">
        <div class="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-orange-200 to-red-200 rounded-full flex items-center justify-center">
          <svg class="w-16 h-16 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">No {data.category.name} Recipes Yet</h3>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          Be the first to share a {data.category.name.toLowerCase()} recipe with the community!
        </p>
        {#if $authStore.user}
          <a
            href="/recipes/create"
            class="inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Create First Recipe
          </a>
        {:else}
          <a
            href="/auth/signup"
            class="inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Join to Create Recipe
          </a>
        {/if}
      </div>
    {/if}
  </section>
</div>
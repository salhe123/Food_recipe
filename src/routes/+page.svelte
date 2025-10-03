<script lang="ts">
  import type { PageData } from './$types';
  import { authStore } from '$lib/stores/auth';
  import { enhance } from '$app/forms';
  import RecipeCard from '$lib/components/recipes/RecipeCard.svelte';

  let { data } = $props<{ data: PageData }>();
</script>

<svelte:head>
  <title>RecipeApp - Delicious Recipes</title>
  <meta name="description" content="Discover and share delicious recipes" />
</svelte:head>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
  <section class="bg-blue-600 text-white rounded-xl p-10 text-center">
    <h1 class="text-4xl sm:text-5xl font-bold mb-4">
      {#if $authStore.user}
        Welcome back, {$authStore.user.username}!
      {:else}
        Welcome to RecipeApp
      {/if}
    </h1>
    <p class="text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
      Explore, create, and share delicious recipes with food lovers worldwide!
    </p>
    {#if !$authStore.user}
      <a
        href="/auth/signup"
        class="inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
      >
        Get Started
      </a>
    {:else}
      <a
        href="/recipes"
        class="inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
      >
        Browse Recipes
      </a>
    {/if}
    {#if $authStore.user}
      <form method="POST" action="?/seedCategories" use:enhance class="mt-4">
        <button
          type="submit"
          class="inline-block bg-gray-200 text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-300 transition"
        >
          Seed Categories
        </button>
      </form>
    {/if}
  </section>

  <!-- Featured Recipes -->
  <section>
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Featured Recipes</h2>
    {#if data.featuredRecipes.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each data.featuredRecipes as recipe}
          <RecipeCard {recipe} />
        {/each}
      </div>
    {:else}
      <p class="text-gray-600 text-center">No featured recipes available yet.</p>
    {/if}
  </section>

  <!-- Categories Section -->
  <section>
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Browse Categories</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each data.categories as category}
        <a
          href="/categories/{category.name.toLowerCase()}"
          class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
        >
          <h3 class="text-lg font-semibold text-gray-800">{category.name}</h3>
          <p class="text-gray-600">Explore {category.name} recipes</p>
        </a>
      {/each}
    </div>
  </section>
</div>
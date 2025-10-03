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

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
  <section class="text-center">
    <h1 class="text-4xl font-bold text-gray-800 mb-4">{data.category.name} Recipes</h1>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
      Discover delicious {data.category.name.toLowerCase()} recipes to try today!
    </p>
  </section>

  <section>
    {#if data.recipes.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each data.recipes as recipe}
          <RecipeCard {recipe} />
        {/each}
      </div>
    {:else}
      <p class="text-gray-600 text-center">No {data.category.name.toLowerCase()} recipes available yet.</p>
    {/if}
  </section>
</div>
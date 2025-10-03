<script lang="ts">
  import type { PageData } from './$types';
  import RecipeCard from '$lib/components/recipes/RecipeCard.svelte';

  let { data } = $props<{ data: PageData }>();
</script>

<svelte:head>
  <title>RecipeApp - {data.username}'s Recipes</title>
  <meta name="description" content="Explore recipes by {data.username}" />
</svelte:head>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
  <section class="text-center">
    <h1 class="text-4xl font-bold text-gray-800 mb-4">{data.username}'s Recipes</h1>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
      Check out all the delicious recipes shared by {data.username}!
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
      <p class="text-gray-600 text-center">No recipes by {data.username} yet.</p>
    {/if}
  </section>
</div>
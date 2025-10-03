<script lang="ts">
  import type { PageData } from './$types';
  import { authStore } from '$lib/stores/auth';
  import { enhance } from '$app/forms';

  let { data } = $props<{ data: PageData }>();

  const categoryColors: Record<string, string> = {
    Breakfast: 'bg-yellow-100 hover:bg-yellow-200',
    Lunch: 'bg-green-100 hover:bg-green-200',
    Dinner: 'bg-blue-100 hover:bg-blue-200',
    Desserts: 'bg-pink-100 hover:bg-pink-200',
  };
</script>

<svelte:head>
  <title>RecipeApp - Browse Categories</title>
  <meta name="description" content="Explore recipe categories on RecipeApp" />
</svelte:head>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
  <section class="text-center">
    <h1 class="text-4xl font-bold text-gray-800 mb-4">Recipe Categories</h1>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
      Discover recipes by category, from hearty breakfasts to indulgent desserts.
    </p>
    {#if $authStore.user}
      <form method="POST" action="?/seedCategories" use:enhance class="mt-6">
        <button
          type="submit"
          class="inline-block bg-gray-200 text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-300 transition"
        >
          Seed Categories
        </button>
      </form>
    {/if}
  </section>

  <section>
    {#if data.categories.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each data.categories as category}
          <a
            href="/categories/{category.name.toLowerCase()}"
            class="{categoryColors[category.name] || 'bg-gray-100 hover:bg-gray-200'} p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1"
          >
            <h3 class="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
            <p class="text-gray-600">Explore {category.name} recipes</p>
          </a>
        {/each}
      </div>
    {:else}
      <p class="text-gray-600 text-center">No categories available yet.</p>
    {/if}
  </section>
</div>
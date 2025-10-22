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

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <!-- Hero Section -->
  <section class="text-center mb-12">
    <h1 class="text-5xl sm:text-6xl font-bold text-gray-800 mb-6">Recipe Categories</h1>
    <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
      Discover amazing recipes organized by category, from hearty breakfasts to indulgent desserts and everything in between.
    </p>
    {#if $authStore.user}
      <form method="POST" action="?/seedCategories" use:enhance class="mt-8">
        <button
          type="submit"
          class="inline-block bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          Seed Categories
        </button>
      </form>
    {/if}
  </section>

  <!-- Categories Grid -->
  <section>
    {#if data.categories.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {#each data.categories as category}
          <a
            href="/categories/{category.name.toLowerCase()}"
            class="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-100"
          >
            <div class="text-center">
              <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center group-hover:from-red-500 group-hover:to-pink-600 transition-all">
                <span class="text-3xl font-bold text-white">
                  {category.name[0]}
                </span>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                {category.name}
              </h3>
              <p class="text-gray-600 mb-4">Explore {category.name} recipes</p>
              <div class="flex items-center justify-center text-orange-500 group-hover:text-orange-600 transition-colors">
                <span class="text-sm font-semibold mr-2">Browse Recipes</span>
                <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {:else}
      <div class="text-center py-16">
        <div class="w-32 h-32 mx-auto mb-8 bg-gray-200 rounded-full flex items-center justify-center">
          <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">No categories available</h3>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          Categories haven't been set up yet. Contact an administrator to add recipe categories.
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
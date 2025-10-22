<script lang="ts">
  import type { PageData } from './$types';
  import { authStore } from '$lib/stores/auth';
  import { enhance } from '$app/forms';
  import RecipeCard from '$lib/components/recipes/RecipeCard.svelte';

  let { data } = $props<{ data: PageData }>();
  let searchQuery = $state('');
  let selectedCategory = $state('');

  function handleSearch() {
    if (searchQuery.trim()) {
      window.location.href = `/recipes?search=${encodeURIComponent(searchQuery)}`;
    }
  }
</script>

<svelte:head>
  <title>RecipeApp - Discover Amazing Recipes</title>
  <meta name="description" content="Discover, create, and share delicious recipes with food lovers worldwide. Find the perfect recipe for any occasion." />
</svelte:head>

<!-- Hero Section -->
<section class="relative bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 min-h-screen flex items-center">
  <div class="absolute inset-0 bg-black opacity-20"></div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
        {#if $authStore.user}
          Welcome back, <span class="text-yellow-300">{$authStore.user.username}</span>!
        {:else}
          Discover Amazing <span class="text-yellow-300">Recipes</span>
        {/if}
      </h1>
      <p class="text-xl sm:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto leading-relaxed">
        {#if $authStore.user}
          Ready to explore new flavors? Browse thousands of recipes or create your own culinary masterpiece.
        {:else}
          Join thousands of food lovers sharing their favorite recipes. From quick weeknight dinners to gourmet desserts.
        {/if}
      </p>
      
      <!-- Search Bar -->
      <div class="max-w-2xl mx-auto mb-8">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1 relative">
            <input
              type="text"
              bind:value={searchQuery}
              placeholder="Search for recipes, ingredients, or cuisines..."
              class="w-full px-6 py-4 text-lg rounded-full border-0 shadow-lg focus:ring-4 focus:ring-yellow-300 focus:outline-none text-gray-800"
              onkeydown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onclick={handleSearch}
              class="absolute right-2 top-2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-colors"
              aria-label="Search recipes"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {#if !$authStore.user}
          <a
            href="/auth/signup"
            class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Join RecipeApp
          </a>
          <a
            href="/recipes"
            class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm border border-white border-opacity-30"
          >
            Browse Recipes
          </a>
        {:else}
          <a
            href="/recipes/create"
            class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Create Recipe
          </a>
          <a
            href="/recipes"
            class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm border border-white border-opacity-30"
          >
            Browse Recipes
          </a>
        {/if}
      </div>
    </div>
  </div>
  
  <!-- Scroll indicator -->
  <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
    </svg>
  </div>
</section>

<!-- Main Content -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
  
  <!-- Categories Section -->
  <section class="text-center">
    <h2 class="text-4xl font-bold mb-4 text-gray-800">Explore by Category</h2>
    <p class="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
      Find the perfect recipe for any meal or occasion
    </p>
    <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
      {#each data.categories as category}
        <a
          href="/categories/{category.name.toLowerCase()}"
          class="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-100"
        >
          <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center group-hover:from-red-500 group-hover:to-pink-600 transition-all">
            <span class="text-2xl font-bold text-white">
              {category.name[0]}
            </span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
            {category.name}
          </h3>
        </a>
      {/each}
    </div>
  </section>

  <!-- Featured Recipes -->
  <section>
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold mb-4 text-gray-800">Featured Recipes</h2>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Handpicked recipes that are trending and loved by our community
      </p>
    </div>
    {#if data.featuredRecipes.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {#each data.featuredRecipes as recipe}
          <RecipeCard {recipe} />
        {/each}
      </div>
      <div class="text-center mt-12">
        <a
          href="/recipes"
          class="inline-block bg-gradient-to-r from-orange-400 to-red-500 hover:from-red-500 hover:to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
        >
          View All Recipes
        </a>
      </div>
    {:else}
      <div class="text-center py-16">
        <div class="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">No Featured Recipes Yet</h3>
        <p class="text-gray-600 mb-8">Be the first to create an amazing recipe!</p>
        {#if $authStore.user}
          <a
            href="/recipes/create"
            class="inline-block bg-gradient-to-r from-orange-400 to-red-500 hover:from-red-500 hover:to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Create Your First Recipe
          </a>
        {/if}
      </div>
    {/if}
  </section>

  <!-- Stats Section -->
  <section class="bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl p-12 text-white text-center">
    <h2 class="text-3xl font-bold mb-8">Join Our Growing Community</h2>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <div>
        <div class="text-4xl font-bold mb-2">1000+</div>
        <div class="text-xl opacity-90">Recipes Shared</div>
      </div>
      <div>
        <div class="text-4xl font-bold mb-2">500+</div>
        <div class="text-xl opacity-90">Happy Cooks</div>
      </div>
      <div>
        <div class="text-4xl font-bold mb-2">50+</div>
        <div class="text-xl opacity-90">Categories</div>
      </div>
    </div>
  </section>

  <!-- Admin Section (only for logged in users) -->
  {#if $authStore.user}
    <section class="text-center">
      <form method="POST" action="?/seedCategories" use:enhance>
        <button
          type="submit"
          class="inline-block bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Seed Categories
        </button>
      </form>
    </section>
  {/if}
</div>
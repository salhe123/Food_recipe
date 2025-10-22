<script lang="ts">
  import type { PageData } from './$types';
  import { enhance } from '$app/forms';
  import { authStore } from '$lib/stores/auth';
  import { page } from '$app/stores';

  let { data } = $props<{ data: PageData }>();
  let title = $state(data.recipe.title);
  let description = $state(data.recipe.description);
  let prepTime = $state(data.recipe.prepTime.toString());
  let categoryId = $state(data.recipe.categoryId.toString());
  let images = $state<File[]>([]);
  let featuredImageIndex = $state(data.recipe.images.findIndex((img: { isFeatured: any; }) => img.isFeatured) || 0);
  let ingredients = $state(data.recipe.ingredients.map((ing: { name: string; quantity: string }) => ({ name: ing.name, quantity: ing.quantity })));
  let steps = $state(data.recipe.steps.map((step: { description: string }) => ({ description: step.description })));
  let error = $state('');
  let loading = $state(false);

  $effect(() => {
    if ($page.form?.error) {
      error = $page.form.error;
      loading = false;
    } else if ($page.form?.success) {
      window.location.href = `/recipes/${data.recipe.id}`;
    }
  });

  function addIngredient() {
    ingredients = [...ingredients, { name: '', quantity: '' }];
  }

  function addStep() {
    steps = [...steps, { description: '' }];
  }

  function handleImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      images = Array.from(input.files);
    }
  }
</script>

<svelte:head>
  <title>RecipeApp - Edit Recipe</title>
  <meta name="description" content="Edit your recipe on RecipeApp" />
</svelte:head>

{#if $authStore.user && data.recipe.userId === $authStore.user.id}
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Section -->
    <section class="text-center mb-12">
      <h1 class="text-5xl sm:text-6xl font-bold text-gray-800 mb-6">Edit Recipe</h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Update your recipe details, ingredients, and instructions to make it even better.
      </p>
    </section>

    <!-- Main Form -->
    <div class="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-100">
      {#if error}
        <div class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 flex items-center gap-3">
          <svg class="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
          <span class="font-medium">{error}</span>
        </div>
      {/if}

      <form
        method="POST"
        action="?/edit"
        use:enhance={() => { loading = true; }}
        enctype="multipart/form-data"
        class="space-y-8"
      >
        <input type="hidden" name="recipeId" value={data.recipe.id} />
        
        <!-- Basic Information Section -->
        <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
          <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div class="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            Basic Information
          </h3>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label for="title" class="block text-gray-700 mb-2 font-semibold">Recipe Title</label>
              <input
                id="title"
                type="text"
                name="title"
                bind:value={title}
                placeholder="Enter recipe title"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg"
              />
            </div>
        <div>
          <label for="description" class="block text-gray-700 mb-1 font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            bind:value={description}
            placeholder="Describe your recipe"
            class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          ></textarea>
        </div>
        <div>
          <label for="prepTime" class="block text-gray-700 mb-1 font-medium">Prep Time (minutes)</label>
          <input
            id="prepTime"
            type="number"
            name="prepTime"
            bind:value={prepTime}
            placeholder="Enter prep time"
            class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="categoryId" class="block text-gray-700 mb-1 font-medium">Category</label>
          <select
            id="categoryId"
            name="categoryId"
            bind:value={categoryId}
            class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {#each data.categories as cat}
              <option value={cat.id}>{cat.name}</option>
            {/each}
          </select>
        </div>
        <div>
          <label for="images" class="block text-gray-700 mb-1 font-medium">Upload Images (select one as featured)</label>
          <input
            id="images"
            type="file"
            name="images"
            multiple
            accept="image/*"
            onchange={handleImageChange}
            class="w-full p-3 border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
          {#if images.length > 0}
            <p class="text-gray-600 mt-2">{images.length} image{images.length === 1 ? '' : 's'} selected</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {#each images as image, i}
                <div class="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview {i + 1}"
                    class="w-full h-32 object-cover rounded-md shadow-sm"
                  />
                  <label class="absolute top-2 right-2 flex items-center">
                    <input
                      type="radio"
                      name="featuredImageIndex"
                      value={i}
                      bind:group={featuredImageIndex}
                      class="mr-1"
                    />
                    <span class="text-sm text-gray-700">Featured</span>
                  </label>
                </div>
              {/each}
            </div>
          {:else if data.recipe.images.length > 0}
            <p class="text-gray-600 mt-2">Current images (upload new ones to replace):</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {#each data.recipe.images as image, i}
                <div class="relative">
                  <img
                    src={image.imageUrl}
                    alt="Current image {i + 1}"
                    class="w-full h-32 object-cover rounded-md shadow-sm"
                  />
                  {#if image.isFeatured}
                    <span class="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">Featured</span>
                  {/if}
                </div>
              {/each}
            </div>
          {/if}
        </div>
        <div>
          <label for="Block" class="block text-gray-700 mb-1 font-medium">Ingredients</label>
          {#each ingredients as ing, i}
            <div class="flex gap-2 mb-2">
              <input
                type="text"
                bind:value={ing.name}
                placeholder="Ingredient Name"
                class="w-1/2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                bind:value={ing.quantity}
                placeholder="Quantity (e.g., 1 cup)"
                class="w-1/2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          {/each}
          <button
            type="button"
            onclick={addIngredient}
            class="text-blue-500 hover:underline mt-2"
          >
            + Add Ingredient
          </button>
        </div>
        <div>
          <label for="Block" class="block text-gray-700 mb-1 font-medium">Steps</label>
          {#each steps as step, i}
            <textarea
              bind:value={step.description}
              placeholder="Describe step {i + 1}"
              class="w-full p-3 border rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
            ></textarea>
          {/each}
          <button
            type="button"
            onclick={addStep}
            class="text-blue-500 hover:underline mt-2"
          >
            + Add Step
          </button>
        </div>
        <input type="hidden" name="ingredients" value={JSON.stringify(ingredients)} />
        <input type="hidden" name="steps" value={JSON.stringify(steps)} />
        
        <!-- Submit Button -->
        <div class="pt-8 border-t border-gray-200">
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 focus:ring-4 focus:ring-orange-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-xl shadow-2xl"
            disabled={loading}
          >
            {#if loading}
              <div class="flex items-center justify-center gap-3">
                <svg class="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating Recipe...
              </div>
            {:else}
              <div class="flex items-center justify-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Update Recipe
              </div>
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>
{:else}
  <div class="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 flex items-center justify-center p-4">
    <div class="max-w-md w-full text-center">
      <div class="bg-white rounded-3xl shadow-2xl p-8">
        <div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
        <p class="text-gray-600 mb-6">You can only edit your own recipes. Please log in to access your recipes.</p>
        <div class="space-y-3">
          <a 
            href="/auth/login" 
            class="block w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
          >
            Sign In
          </a>
          <a 
            href="/recipes" 
            class="block w-full bg-white border-2 border-orange-500 text-orange-600 font-semibold py-3 px-6 rounded-xl hover:bg-orange-50 transition-all"
          >
            Browse Recipes
          </a>
        </div>
        <div class="mt-6">
          <a href="/" class="text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  </div>
{/if}
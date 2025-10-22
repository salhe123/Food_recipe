<script lang="ts">
  import type { PageData } from './$types';
  import { enhance } from '$app/forms';
  import { authStore } from '$lib/stores/auth';
  import { page } from '$app/stores';

  let { data } = $props<{ data: PageData }>();
  let title = $state('');
  let description = $state('');
  let prepTime = $state('');
  let categoryId = $state('');
  let images = $state<File[]>([]);
  let featuredImageIndex = $state(0);
  let ingredients = $state([{ name: '', quantity: '' }]);
  let steps = $state([{ description: '' }]);
  let isPremium = $state(false);
  let price = $state('');
  let error = $state('');
  let loading = $state(false);

  $effect(() => {
    if ($page.form?.error) {
      error = $page.form.error;
      loading = false;
    } else if ($page.form?.success) {
      window.location.href = '/my-recipes';
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
  <title>RecipeApp - Create Recipe</title>
  <meta name="description" content="Create a new recipe on RecipeApp" />
</svelte:head>

{#if $authStore.user}
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Section -->
    <section class="text-center mb-12">
      <h1 class="text-5xl sm:text-6xl font-bold text-gray-800 mb-6">Create Your Recipe</h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Share your culinary masterpiece with the world. Add photos, ingredients, and step-by-step instructions.
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
        action="?/create"
        use:enhance={() => { loading = true; }}
        enctype="multipart/form-data"
        class="space-y-8"
      >
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
              <label for="prepTime" class="block text-gray-700 mb-2 font-semibold">Prep Time (minutes)</label>
              <input
                id="prepTime"
                type="number"
                name="prepTime"
                bind:value={prepTime}
                placeholder="Enter prep time"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg"
              />
            </div>
          </div>
          
          <div class="mt-6">
            <label for="description" class="block text-gray-700 mb-2 font-semibold">Description</label>
            <textarea
              id="description"
              name="description"
              bind:value={description}
              placeholder="Describe your recipe, what makes it special, and any tips..."
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg min-h-[120px] resize-none"
            ></textarea>
          </div>
          
          <div class="mt-6">
            <label for="categoryId" class="block text-gray-700 mb-2 font-semibold">Category</label>
            <select
              id="categoryId"
              name="categoryId"
              bind:value={categoryId}
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg"
            >
              <option value="">Select a category</option>
              {#each data.categories as cat}
                <option value={cat.id}>{cat.name}</option>
              {/each}
            </select>
          </div>
        </div>
        <!-- Premium Recipe Section -->
        <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100">
          <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            Premium Recipe (Optional)
          </h3>
          
          <div class="flex items-center gap-4">
            <label class="flex items-center cursor-pointer">
              <input
                id="isPremium"
                type="checkbox"
                name="isPremium"
                bind:checked={isPremium}
                class="w-5 h-5 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <span class="ml-3 text-lg font-semibold text-gray-700">Make this recipe premium</span>
            </label>
          </div>
          
          {#if isPremium}
            <div class="mt-6">
              <label for="price" class="block text-gray-700 mb-2 font-semibold">Price (USD)</label>
              <input
                id="price"
                type="number"
                name="price"
                bind:value={price}
                placeholder="Enter price (e.g., 2.99)"
                step="0.01"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg"
              />
              <p class="text-sm text-gray-600 mt-2">Premium recipes require payment to view full details</p>
            </div>
          {/if}
        </div>
        <!-- Image Upload Section -->
        <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
          <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            Recipe Images
          </h3>
          
          <div class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-orange-400 transition-colors">
            <input
              id="images"
              type="file"
              name="images"
              multiple
              accept="image/*"
              onchange={handleImageChange}
              class="hidden"
            />
            <label for="images" class="cursor-pointer">
              <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-gray-700 mb-2">Upload Recipe Images</h4>
              <p class="text-gray-600 mb-4">Click to select multiple images or drag and drop</p>
              <span class="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all">
                Choose Images
              </span>
            </label>
          </div>
          
          {#if images.length > 0}
            <div class="mt-6">
              <p class="text-lg font-semibold text-gray-700 mb-4">{images.length} image{images.length === 1 ? '' : 's'} selected</p>
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {#each images as image, i}
                  <div class="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview {i + 1}"
                      class="w-full h-32 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-all"
                    />
                    <label class="absolute top-2 right-2 flex items-center bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 cursor-pointer">
                      <input
                        type="radio"
                        name="featuredImageIndex"
                        value={i}
                        bind:group={featuredImageIndex}
                        class="mr-1 text-orange-600 focus:ring-orange-500"
                      />
                      <span class="text-xs font-semibold text-gray-700">Featured</span>
                    </label>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
        <!-- Ingredients Section -->
        <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
          <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
            </div>
            Ingredients
          </h3>
          
          <div class="space-y-4">
            {#each ingredients as ing, i}
              <div class="flex gap-4 items-center">
                <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {i + 1}
                </div>
                <input
                  type="text"
                  bind:value={ing.name}
                  placeholder="Ingredient Name"
                  class="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all text-lg"
                />
                <input
                  type="text"
                  bind:value={ing.quantity}
                  placeholder="Quantity (e.g., 1 cup)"
                  class="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all text-lg"
                />
              </div>
            {/each}
          </div>
          
          <button
            type="button"
            onclick={addIngredient}
            class="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Ingredient
          </button>
        </div>

        <!-- Steps Section -->
        <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
          <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            Cooking Steps
          </h3>
          
          <div class="space-y-6">
            {#each steps as step, i}
              <div class="flex gap-4">
                <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <textarea
                  bind:value={step.description}
                  placeholder="Describe step {i + 1} in detail..."
                  class="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all text-lg min-h-[100px] resize-none"
                ></textarea>
              </div>
            {/each}
          </div>
          
          <button
            type="button"
            onclick={addStep}
            class="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Step
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
                Creating Recipe...
              </div>
            {:else}
              <div class="flex items-center justify-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Create Recipe
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
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
        <p class="text-gray-600 mb-6">Please log in to create and share your recipes with the community.</p>
        <div class="space-y-3">
          <a 
            href="/auth/login" 
            class="block w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
          >
            Sign In
          </a>
          <a 
            href="/auth/signup" 
            class="block w-full bg-white border-2 border-orange-500 text-orange-600 font-semibold py-3 px-6 rounded-xl hover:bg-orange-50 transition-all"
          >
            Create Account
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
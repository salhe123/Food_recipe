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
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Recipe</h2>
      {#if error}
        <p class="text-red-500 bg-red-50 p-4 rounded-md mb-6 text-center">{error}</p>
      {/if}
      <form
        method="POST"
        action="?/edit"
        use:enhance={() => { loading = true; }}
        enctype="multipart/form-data"
        class="space-y-6"
      >
        <input type="hidden" name="recipeId" value={data.recipe.id} />
        <div>
          <label for="title" class="block text-gray-700 mb-1 font-medium">Recipe Title</label>
          <input
            id="title"
            type="text"
            name="title"
            bind:value={title}
            placeholder="Enter recipe title"
            class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition flex justify-center items-center"
          disabled={loading}
        >
          {#if loading}
            <svg class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            Updating...
          {:else}
            Update Recipe
          {/if}
        </button>
      </form>
    </div>
  </div>
{:else}
  <div class="text-center py-8">
    <p class="text-red-500 text-lg">You can only edit your own recipes or please log in.</p>
    <a href="/auth/login" class="inline-block mt-4 text-blue-500 hover:underline">Login</a>
  </div>
{/if}
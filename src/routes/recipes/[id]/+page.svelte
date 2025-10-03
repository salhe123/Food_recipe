<script lang="ts">
  import type { PageData } from './$types';
  import { authStore } from '$lib/stores/auth';
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';

  let { data } = $props<{ data: PageData }>();
  let commentContent = $state('');
  let rating = $state(0);
  let featuredImage = data.recipe.images.find((img: { isFeatured: any }) => img.isFeatured)?.imageUrl || data.recipe.images[0]?.imageUrl;

  $effect(() => {
    if ($page.form?.success) {
      window.location.reload();
    }
  });

  function setRating(value: number) {
    rating = value;
  }
</script>

<svelte:head>
  <title>RecipeApp - {data.recipe.title}</title>
  <meta name="description" content={data.recipe.description.slice(0, 160)} />
</svelte:head>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <section class="relative bg-gray-100 rounded-xl overflow-hidden mb-8">
    {#if featuredImage}
      <img
        src={featuredImage}
        alt="{data.recipe.title} featured image"
        class="w-full h-64 sm:h-96 object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-30 flex items-end">
        <div class="p-6 text-white w-full">
          <div class="flex justify-between items-start">
            <div>
              <h1 class="text-3xl sm:text-4xl font-bold mb-2">{data.recipe.title}</h1>
              <div class="flex items-center space-x-2">
                <span class="text-yellow-400">
                  {#each Array(5) as _, i}
                    <svg
                      class="w-5 h-5 inline {i < Math.round(data.recipe.averageRating) ? 'fill-current' : 'fill-none'} stroke-current"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  {/each}
                </span>
                <span class="text-sm">({data.recipe.ratingCount} ratings)</span>
              </div>
            </div>
            {#if $authStore.user && $authStore.user.id === data.recipe.userId}
              <div class="flex space-x-2">
                <a
                  href="/recipes/{data.recipe.id}/edit"
                  class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </a>
                <form method="POST" action="?/delete" use:enhance class="inline">
                  <input type="hidden" name="recipeId" value={data.recipe.id} />
                  <button
                    type="submit"
                    class="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Delete
                  </button>
                </form>
              </div>
            {/if}
          </div>
          <p class="text-lg sm:text-xl max-w-2xl">{data.recipe.description}</p>
        </div>
      </div>
    {:else}
      <div class="w-full h-64 sm:h-96 bg-gray-200 flex items-center justify-center">
        <span class="text-gray-500 text-lg">No Image Available</span>
      </div>
    {/if}
  </section>

  {#if $authStore.user}
    <section class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
      <div class="flex flex-wrap items-center gap-4">
        <form method="POST" action="?/toggleLike" use:enhance class="inline">
          <input type="hidden" name="recipeId" value={data.recipe.id} />
          <button
            type="submit"
            class="flex items-center px-4 py-2 {data.recipe.isLiked ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'} rounded-md hover:bg-red-600 transition"
          >
            <svg class="w-5 h-5 mr-2" fill={data.recipe.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {data.recipe.isLiked ? 'Unlike' : 'Like'} ({data.recipe.likeCount})
          </button>
        </form>
        <form method="POST" action="?/toggleBookmark" use:enhance class="inline">
          <input type="hidden" name="recipeId" value={data.recipe.id} />
          <button
            type="submit"
            class="flex items-center px-4 py-2 {data.recipe.isBookmarked ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'} rounded-md hover:bg-blue-600 transition"
          >
            <svg class="w-5 h-5 mr-2" fill={data.recipe.isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            {data.recipe.isBookmarked ? 'Unbookmark' : 'Bookmark'}
          </button>
        </form>
        <form method="POST" action="?/rate" use:enhance class="inline-flex items-center">
          <input type="hidden" name="recipeId" value={data.recipe.id} />
          <input type="hidden" name="rating" value={rating} />
          {#each Array(5) as _, i}
            <button
              type="submit"
              on:click={() => setRating(i + 1)}
              class="focus:outline-none"
            >
              <svg
                class="w-6 h-6 {i < (data.recipe.userRating || rating) ? 'text-yellow-400 fill-current' : 'text-gray-400 fill-none'} stroke-current"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>
          {/each}
        </form>
      </div>
    </section>
  {/if}

  {#if data.recipe.isPremium && !$authStore.user}
    <section class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8 text-center">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Premium Recipe</h2>
      <p class="text-gray-600 mb-4">Sign in to purchase this recipe for ${data.recipe.price / 100}.</p>
      <a
        href="/auth/login"
        class="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
      >
        Sign In to Purchase
      </a>
    </section>
  {:else if data.recipe.isPremium && $authStore.user && !data.recipe.isPurchased}
    <section class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8 text-center">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Premium Recipe</h2>
      <p class="text-gray-600 mb-4">Purchase this recipe for ${data.recipe.price / 100} to view full details.</p>
      <form method="POST" action="?/purchase" use:enhance>
        <input type="hidden" name="recipeId" value={data.recipe.id} />
        <button
          type="submit"
          class="inline-block bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition"
        >
          Purchase Recipe
        </button>
      </form>
    </section>
  {/if}

  {#if !data.recipe.isPremium || data.recipe.isPurchased || ($authStore.user && $authStore.user.id === data.recipe.userId)}
    <section class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Ingredients</h2>
          <ul class="space-y-2">
            {#each data.recipe.ingredients as ing}
              <li class="flex items-center text-gray-700">
                <span class="w-4 h-4 mr-2 text-blue-500">•</span>
                <span>{ing.quantity} {ing.name}</span>
              </li>
            {/each}
          </ul>
        </div>
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Details</h2>
          <div class="space-y-2 text-gray-700">
            <p><span class="font-medium">Prep Time:</span> {data.recipe.prepTime} minutes</p>
            <p><span class="font-medium">Category:</span> {data.recipe.category.name}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Instructions</h2>
      <ol class="space-y-4">
        {#each data.recipe.steps as step, i}
          <li class="flex">
            <span class="w-8 h-8 flex-shrink-0 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">
              {i + 1}
            </span>
            <p class="text-gray-700">{step.description}</p>
          </li>
        {/each}
      </ol>
    </section>

    {#if data.recipe.images.length > 1}
      <section class="bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">More Images</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each data.recipe.images as image}
            {#if !image.isFeatured}
              <img
                src={image.imageUrl}
                alt="Recipe image"
                class="w-full h-48 object-cover rounded-md hover:shadow-lg transition"
              />
            {/if}
          {/each}
        </div>
      </section>
    {/if}
  {/if}

  <section class="bg-white rounded-xl shadow-lg p-6 sm:p-8">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
    {#if $authStore.user}
      <form method="POST" action="?/comment" use:enhance class="mb-6">
        <input type="hidden" name="recipeId" value={data.recipe.id} />
        <textarea
          name="content"
          bind:value={commentContent}
          placeholder="Add a comment..."
          class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] mb-2"
        ></textarea>
        <button
          type="submit"
          class="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          disabled={!commentContent.trim()}
        >
          Post Comment
        </button>
      </form>
    {:else}
      <p class="text-gray-600 mb-4">
        <a href="/auth/login" class="text-blue-500 hover:underline">Sign in</a> to add a comment.
      </p>
    {/if}
    {#if data.recipe.comments.length > 0}
      <div class="space-y-4">
        {#each data.recipe.comments as comment}
          <div class="border-l-4 border-blue-500 pl-4">
            <p class="text-gray-700">{comment.content}</p>
            <p class="text-sm text-gray-500 mt-1">
              By {comment.username} on {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-gray-600">No comments yet. Be the first to comment!</p>
    {/if}
  </section>
</div>
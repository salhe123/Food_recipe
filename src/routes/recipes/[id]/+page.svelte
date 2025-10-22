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

<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <!-- Hero Section -->
  <section class="relative bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-3xl overflow-hidden mb-8 shadow-2xl">
    {#if featuredImage}
      <img
        src={featuredImage}
        alt="{data.recipe.title} featured image"
        class="w-full h-80 sm:h-96 lg:h-[500px] object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      <div class="absolute inset-0 flex items-end">
        <div class="p-8 text-white w-full">
          <div class="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-4">
                <span class="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {data.recipe.category.name}
                </span>
                <span class="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {data.recipe.prepTime} min
                </span>
                {#if data.recipe.isPremium}
                  <span class="bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Premium
                  </span>
                {/if}
              </div>
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">{data.recipe.title}</h1>
              <div class="flex items-center space-x-4 mb-4">
                <div class="flex items-center space-x-1">
                  <span class="text-yellow-400">
                    {#each Array(5) as _, i}
                      <svg
                        class="w-6 h-6 inline {i < Math.round(data.recipe.averageRating) ? 'fill-current' : 'fill-none'} stroke-current"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    {/each}
                  </span>
                  <span class="text-lg font-semibold">{data.recipe.averageRating.toFixed(1)}</span>
                  <span class="text-white/80">({data.recipe.ratingCount} ratings)</span>
                </div>
              </div>
              <p class="text-xl sm:text-2xl max-w-3xl leading-relaxed text-white/90">{data.recipe.description}</p>
            </div>
            {#if $authStore.user && $authStore.user.id === data.recipe.userId}
              <div class="flex flex-col sm:flex-row gap-3">
                <a
                  href="/recipes/{data.recipe.id}/edit"
                  class="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all font-semibold"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Recipe
                </a>
                <form method="POST" action="?/delete" use:enhance class="inline">
                  <input type="hidden" name="recipeId" value={data.recipe.id} />
                  <button
                    type="submit"
                    class="inline-flex items-center px-6 py-3 bg-red-500/80 backdrop-blur-sm text-white rounded-xl hover:bg-red-600/80 transition-all font-semibold"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Recipe
                  </button>
                </form>
              </div>
            {/if}
          </div>
        </div>
      </div>
    {:else}
      <div class="w-full h-80 sm:h-96 lg:h-[500px] bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center">
        <div class="text-center text-gray-600">
          <svg class="w-24 h-24 mx-auto mb-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
          <span class="text-2xl font-semibold">No Image Available</span>
        </div>
      </div>
    {/if}
  </section>

  {#if $authStore.user}
    <section class="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-100">
      <div class="flex flex-wrap items-center justify-center gap-4">
        <form method="POST" action="?/toggleLike" use:enhance class="inline">
          <input type="hidden" name="recipeId" value={data.recipe.id} />
          <button
            type="submit"
            class="flex items-center px-6 py-3 {data.recipe.isLiked ? 'bg-red-500 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600'} rounded-xl transition-all transform hover:scale-105 font-semibold"
          >
            <svg class="w-5 h-5 mr-2" fill={data.recipe.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {data.recipe.isLiked ? 'Liked' : 'Like'} ({data.recipe.likeCount})
          </button>
        </form>
        <form method="POST" action="?/toggleBookmark" use:enhance class="inline">
          <input type="hidden" name="recipeId" value={data.recipe.id} />
          <button
            type="submit"
            class="flex items-center px-6 py-3 {data.recipe.isBookmarked ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'} rounded-xl transition-all transform hover:scale-105 font-semibold"
          >
            <svg class="w-5 h-5 mr-2" fill={data.recipe.isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            {data.recipe.isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
        </form>
        <div class="flex items-center gap-2 bg-gray-50 px-6 py-3 rounded-xl">
          <span class="text-sm font-semibold text-gray-700">Rate:</span>
          <form method="POST" action="?/rate" use:enhance class="inline-flex items-center">
            <input type="hidden" name="recipeId" value={data.recipe.id} />
            <input type="hidden" name="rating" value={rating} />
            {#each Array(5) as _, i}
              <button
                type="submit"
                onclick={() => setRating(i + 1)}
                class="focus:outline-none transform hover:scale-110 transition-transform"
                aria-label={`Rate ${i + 1} stars`}
              >
                <svg
                  class="w-6 h-6 {i < (data.recipe.userRating || rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-none hover:text-yellow-300'} stroke-current transition-colors"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </button>
            {/each}
          </form>
        </div>
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
    <section class="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-100">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
            </div>
            Ingredients
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {#each data.recipe.ingredients as ing}
              <div class="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors group">
                <div class="w-3 h-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mr-4 group-hover:scale-125 transition-transform"></div>
                <div class="flex-1">
                  <span class="font-semibold text-gray-800">{ing.quantity}</span>
                  <span class="text-gray-600 ml-2">{ing.name}</span>
                </div>
              </div>
            {/each}
          </div>
        </div>
        <div class="lg:col-span-1">
          <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            Details
          </h2>
          <div class="space-y-4">
            <div class="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-100">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <p class="font-semibold text-gray-800">Prep Time</p>
                  <p class="text-orange-600 font-bold text-lg">{data.recipe.prepTime} minutes</p>
                </div>
              </div>
            </div>
            <div class="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
                <div>
                  <p class="font-semibold text-gray-800">Category</p>
                  <p class="text-blue-600 font-bold text-lg">{data.recipe.category.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-100">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        Instructions
      </h2>
      <div class="space-y-6">
        {#each data.recipe.steps as step, i}
          <div class="flex gap-6 p-6 bg-gray-50 rounded-2xl hover:bg-orange-50 transition-colors group">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 text-white rounded-xl flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform shadow-lg">
                {i + 1}
              </div>
            </div>
            <div class="flex-1">
              <p class="text-gray-700 text-lg leading-relaxed">{step.description}</p>
            </div>
          </div>
        {/each}
      </div>
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

  <section class="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
    <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
      <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
      </div>
      Comments ({data.recipe.comments.length})
    </h2>
    
    {#if $authStore.user}
      <form method="POST" action="?/comment" use:enhance class="mb-8">
        <input type="hidden" name="recipeId" value={data.recipe.id} />
        <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <textarea
            name="content"
            bind:value={commentContent}
            placeholder="Share your thoughts about this recipe..."
            class="w-full p-4 border-0 bg-transparent focus:outline-none resize-none min-h-[120px] text-gray-700 placeholder-gray-500"
          ></textarea>
          <div class="flex justify-end pt-4 border-t border-gray-200">
            <button
              type="submit"
              class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={!commentContent.trim()}
            >
              Post Comment
            </button>
          </div>
        </div>
      </form>
    {:else}
      <div class="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 mb-8 border border-orange-200 text-center">
        <p class="text-gray-600 mb-4">
          <a href="/auth/login" class="text-orange-600 hover:text-orange-700 font-semibold underline">Sign in</a> to add a comment and join the conversation.
        </p>
      </div>
    {/if}
    
    {#if data.recipe.comments.length > 0}
      <div class="space-y-6">
        {#each data.recipe.comments as comment}
          <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:bg-orange-50 transition-colors">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold text-sm">
                  {comment.username[0].toUpperCase()}
                </span>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <span class="font-semibold text-gray-800">{comment.username}</span>
                  <span class="text-sm text-gray-500">•</span>
                  <span class="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p class="text-gray-700 leading-relaxed">{comment.content}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="text-center py-12">
        <div class="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">No comments yet</h3>
        <p class="text-gray-600">Be the first to share your thoughts about this recipe!</p>
      </div>
    {/if}
  </section>
</div>
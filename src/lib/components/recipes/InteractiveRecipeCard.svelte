<script lang="ts">
  import { authStore } from '$lib/stores/auth';
  import { recipeActions, getRecipeInteractions } from '$lib/stores/recipeInteractions';
  import { onMount } from 'svelte';

  let { recipe } = $props<{
    recipe: {
      id: number;
      title: string;
      description: string;
      prepTime: number;
      username: string;
      category: string;
      featuredImage: string | null;
      likeCount: number;
      commentCount: number;
      isLiked?: boolean;
      isBookmarked?: boolean;
    };
  }>();

  // Get reactive interactions for this recipe
  const interactions = getRecipeInteractions(recipe.id);
  
  // Initialize the recipe in the store
  onMount(() => {
    recipeActions.initializeRecipe(recipe.id, {
      isLiked: recipe.isLiked || false,
      isBookmarked: recipe.isBookmarked || false,
      likeCount: recipe.likeCount,
      commentCount: recipe.commentCount
    });
  });

  async function handleLike(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    
    if (!$authStore.user) {
      // Redirect to login or show login modal
      window.location.href = '/auth/login';
      return;
    }

    try {
      // Optimistic update
      recipeActions.toggleLike(recipe.id);
      
      // API call
      const response = await fetch(`/api/recipes/${recipe.id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        // Revert on error
        recipeActions.toggleLike(recipe.id);
        throw new Error('Failed to toggle like');
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      // Could show a toast notification here
    }
  }

  async function handleBookmark(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    
    if (!$authStore.user) {
      window.location.href = '/auth/login';
      return;
    }

    try {
      // Optimistic update
      recipeActions.toggleBookmark(recipe.id);
      
      // API call
      const response = await fetch(`/api/recipes/${recipe.id}/bookmark`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        // Revert on error
        recipeActions.toggleBookmark(recipe.id);
        throw new Error('Failed to toggle bookmark');
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  }
</script>

<div class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-100">
  <!-- Image Container -->
  <div class="relative h-48 overflow-hidden">
    <a href="/recipes/{recipe.id}" class="block w-full h-full">
      {#if recipe.featuredImage}
        <img
          src={recipe.featuredImage}
          alt={recipe.title}
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      {:else}
        <div class="w-full h-full bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center">
          <svg class="w-16 h-16 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
      {/if}
    </a>
    
    <!-- Category Badge -->
    <div class="absolute top-3 left-3">
      <span class="bg-white bg-opacity-90 backdrop-blur-sm text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
        {recipe.category}
      </span>
    </div>
    
    <!-- Prep Time Badge -->
    <div class="absolute top-3 right-3">
      <span class="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        {recipe.prepTime}m
      </span>
    </div>

    <!-- Interactive Buttons -->
    <div class="absolute bottom-3 right-3 flex gap-2">
      <!-- Like Button -->
      <button
        onclick={handleLike}
        class="bg-white bg-opacity-90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all transform hover:scale-110 {$interactions.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}"
        title={$interactions.isLiked ? 'Unlike' : 'Like'}
      >
        <svg class="w-5 h-5 {$interactions.isLiked ? 'fill-current' : 'fill-none'}" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </button>

      <!-- Bookmark Button -->
      <button
        onclick={handleBookmark}
        class="bg-white bg-opacity-90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all transform hover:scale-110 {$interactions.isBookmarked ? 'text-yellow-500' : 'text-gray-600 hover:text-yellow-500'}"
        title={$interactions.isBookmarked ? 'Remove bookmark' : 'Bookmark'}
      >
        <svg class="w-5 h-5 {$interactions.isBookmarked ? 'fill-current' : 'fill-none'}" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
        </svg>
      </button>
    </div>
  </div>
  
  <!-- Content -->
  <div class="p-6">
    <a href="/recipes/{recipe.id}" class="block">
      <h3 class="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
        {recipe.title}
      </h3>
      <p class="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
        {recipe.description}
      </p>
    </a>
    
    <!-- Author and Stats -->
    <div class="pt-4 border-t border-gray-100">
      <!-- Author -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
            <span class="text-white text-sm font-bold">
              {recipe.username[0].toUpperCase()}
            </span>
          </div>
          <span class="text-sm text-gray-600 font-medium">By {recipe.username}</span>
        </div>
        
        <!-- View Recipe Arrow -->
        <a href="/recipes/{recipe.id}" class="text-orange-500 group-hover:text-orange-600 transition-colors" aria-label="View recipe details">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      
      <!-- Like and Comment Stats -->
      <div class="flex items-center gap-4 text-sm text-gray-500">
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4 {$interactions.isLiked ? 'text-red-500 fill-current' : 'text-gray-500'}" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
          <span class="font-medium">{$interactions.likeCount}</span>
        </div>
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          <span class="font-medium">{$interactions.commentCount}</span>
        </div>
      </div>
    </div>
  </div>
</div>

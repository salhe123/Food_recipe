<script lang="ts">
  let { recipe } = $props<{
    recipe: {
      id: number;
      title: string;
      description: string;
      prepTime: number;
      username: string;
      category: string;
      featuredImage: string | null;
    };
  }>();
</script>

<a
  href="/recipes/{recipe.id}"
  class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-100"
>
  <!-- Image Container -->
  <div class="relative h-48 overflow-hidden">
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
  </div>
  
  <!-- Content -->
  <div class="p-6">
    <h3 class="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
      {recipe.title}
    </h3>
    <p class="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
      {recipe.description}
    </p>
    
    <!-- Author -->
    <div class="flex items-center justify-between pt-4 border-t border-gray-100">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
          <span class="text-white text-sm font-bold">
            {recipe.username[0].toUpperCase()}
          </span>
        </div>
        <span class="text-sm text-gray-600 font-medium">By {recipe.username}</span>
      </div>
      
      <!-- View Recipe Arrow -->
      <div class="text-orange-500 group-hover:text-orange-600 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </div>
  </div>
</a>
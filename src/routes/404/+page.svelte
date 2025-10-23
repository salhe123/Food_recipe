<script lang="ts">
  // This is a dedicated 404 page
</script>

<svelte:head>
  <title>Recipe Not Found - RecipeApp</title>
  <meta name="description" content="The recipe you're looking for could not be found" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center px-4">
  <div class="max-w-2xl mx-auto text-center text-white">
    <!-- 404 Icon -->
    <div class="text-8xl mb-8 animate-bounce">
      🍳
    </div>
    
    <!-- Error Code -->
    <div class="text-6xl font-bold mb-4 opacity-90">
      404
    </div>
    
    <!-- Error Title -->
    <h1 class="text-4xl font-bold mb-4">
      Recipe Not Found
    </h1>
    
    <!-- Error Subtitle -->
    <h2 class="text-xl mb-6 opacity-90">
      Oops! This recipe seems to have vanished from our kitchen!
    </h2>
    
    <!-- Error Description -->
    <p class="text-lg mb-8 opacity-80 leading-relaxed">
      The recipe you're looking for might have been moved, deleted, or never existed. Don't worry, we have plenty of other delicious recipes waiting for you!
    </p>
    
    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <a
        href="/recipes"
        class="bg-white text-gray-800 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
      >
        Explore Recipes
      </a>
      
      <a
        href="/"
        class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm border border-white border-opacity-30"
      >
        Go Home
      </a>
      
      <button
        onclick={() => window.history.back()}
        class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm border border-white border-opacity-30"
      >
        Go Back
      </button>
    </div>
    
    <!-- Helpful Links -->
    <div class="mt-12 p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20">
      <h3 class="text-xl font-bold mb-4">Looking for something specific?</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
        <a href="/recipes" class="flex items-center gap-3 p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all">
          <span class="text-2xl">🍽️</span>
          <div>
            <div class="font-semibold">All Recipes</div>
            <div class="text-sm opacity-80">Browse our complete collection</div>
          </div>
        </a>
        <a href="/categories" class="flex items-center gap-3 p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all">
          <span class="text-2xl">📂</span>
          <div>
            <div class="font-semibold">Categories</div>
            <div class="text-sm opacity-80">Find recipes by type</div>
          </div>
        </a>
        <a href="/recipes/create" class="flex items-center gap-3 p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all">
          <span class="text-2xl">✨</span>
          <div>
            <div class="font-semibold">Create Recipe</div>
            <div class="text-sm opacity-80">Share your own creation</div>
          </div>
        </a>
        <a href="/about" class="flex items-center gap-3 p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all">
          <span class="text-2xl">ℹ️</span>
          <div>
            <div class="font-semibold">About Us</div>
            <div class="text-sm opacity-80">Learn more about RecipeApp</div>
          </div>
        </a>
      </div>
    </div>
    
    <!-- Fun Recipe Suggestions -->
    <div class="mt-8 p-4 bg-white bg-opacity-5 rounded-lg">
      <p class="text-sm opacity-80">
        💡 <strong>Pro tip:</strong> Try searching for ingredients you have at home, or browse our trending recipes!
      </p>
    </div>
  </div>
</div>

<style>
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
</style>

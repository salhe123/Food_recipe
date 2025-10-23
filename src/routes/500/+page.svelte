<script lang="ts">
  // This is a dedicated 500 page
</script>

<svelte:head>
  <title>Server Error - RecipeApp</title>
  <meta name="description" content="We're experiencing technical difficulties" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center px-4">
  <div class="max-w-2xl mx-auto text-center text-white">
    <!-- 500 Icon -->
    <div class="text-8xl mb-8 animate-bounce">
      🔥
    </div>
    
    <!-- Error Code -->
    <div class="text-6xl font-bold mb-4 opacity-90">
      500
    </div>
    
    <!-- Error Title -->
    <h1 class="text-4xl font-bold mb-4">
      Kitchen Malfunction
    </h1>
    
    <!-- Error Subtitle -->
    <h2 class="text-xl mb-6 opacity-90">
      Our servers are having a cooking crisis!
    </h2>
    
    <!-- Error Description -->
    <p class="text-lg mb-8 opacity-80 leading-relaxed">
      Something went wrong on our end. Our chefs are working hard to fix this recipe disaster. Please try again in a few moments.
    </p>
    
    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <button
        onclick={() => window.location.reload()}
        class="bg-white text-gray-800 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
      >
        Try Again
      </button>
      
      <a
        href="/"
        class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm border border-white border-opacity-30"
      >
        Go Home
      </a>
    </div>
    
    <!-- Status Information -->
    <div class="mt-12 p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20">
      <h3 class="text-xl font-bold mb-4">What's happening?</h3>
      <div class="text-left space-y-3">
        <div class="flex items-center gap-3">
          <span class="text-2xl">👨‍🍳</span>
          <div>
            <div class="font-semibold">Our chefs are working</div>
            <div class="text-sm opacity-80">We're fixing the issue as fast as we can</div>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-2xl">⏰</span>
          <div>
            <div class="font-semibold">Usually resolved quickly</div>
            <div class="text-sm opacity-80">Most issues are fixed within a few minutes</div>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-2xl">📧</span>
          <div>
            <div class="font-semibold">Need help?</div>
            <div class="text-sm opacity-80">Contact our support team if the issue persists</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Alternative Actions -->
    <div class="mt-8 p-4 bg-white bg-opacity-5 rounded-lg">
      <p class="text-sm opacity-80 mb-3">
        While we fix this, you can:
      </p>
      <div class="flex flex-wrap justify-center gap-2">
        <a href="/recipes" class="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full hover:bg-opacity-30 transition-all">
          Browse Recipes
        </a>
        <a href="/categories" class="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full hover:bg-opacity-30 transition-all">
          View Categories
        </a>
        <a href="/about" class="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full hover:bg-opacity-30 transition-all">
          About Us
        </a>
      </div>
    </div>
    
    <!-- Fun Message -->
    <div class="mt-6 p-3 bg-white bg-opacity-5 rounded-lg">
      <p class="text-sm opacity-80">
        🍳 <strong>Don't worry!</strong> Even the best chefs have kitchen disasters sometimes. We'll be back to serving delicious recipes soon!
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
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .animate-pulse {
    animation: pulse 2s ease-in-out infinite;
  }
</style>

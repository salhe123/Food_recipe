<script lang="ts">
  import { page } from '$app/stores';
  
  $: status = $page.status;
  $: message = $page.error?.message || 'An unexpected error occurred';
  
  function getErrorInfo() {
    switch (status) {
      case 404:
        return {
          title: "Recipe Not Found",
          subtitle: "Oops! This recipe seems to have vanished from our kitchen!",
          description: "The recipe you're looking for might have been moved, deleted, or never existed. Don't worry, we have plenty of other delicious recipes waiting for you!",
          icon: "🍳",
          bgColor: "from-orange-400 to-red-500",
          buttonText: "Explore Recipes",
          buttonLink: "/recipes"
        };
      case 500:
        return {
          title: "Kitchen Malfunction",
          subtitle: "Our servers are having a cooking crisis!",
          description: "Something went wrong on our end. Our chefs are working hard to fix this recipe disaster. Please try again in a few moments.",
          icon: "🔥",
          bgColor: "from-red-500 to-pink-600",
          buttonText: "Go Home",
          buttonLink: "/"
        };
      default:
        return {
          title: "Something Went Wrong",
          subtitle: "Oops! We encountered an unexpected error",
          description: "Don't worry, it's not your fault. Our team has been notified and we're working to fix this issue.",
          icon: "😅",
          bgColor: "from-gray-500 to-gray-700",
          buttonText: "Go Home",
          buttonLink: "/"
        };
    }
  }
  
  $: errorInfo = getErrorInfo();
</script>

<svelte:head>
  <title>{errorInfo.title} - RecipeApp</title>
  <meta name="description" content="An error occurred while loading the page" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br {errorInfo.bgColor} flex items-center justify-center px-4">
  <div class="max-w-2xl mx-auto text-center text-white">
    <!-- Error Icon -->
    <div class="text-8xl mb-8 animate-bounce">
      {errorInfo.icon}
    </div>
    
    <!-- Error Code -->
    <div class="text-6xl font-bold mb-4 opacity-90">
      {status}
    </div>
    
    <!-- Error Title -->
    <h1 class="text-4xl font-bold mb-4">
      {errorInfo.title}
    </h1>
    
    <!-- Error Subtitle -->
    <h2 class="text-xl mb-6 opacity-90">
      {errorInfo.subtitle}
    </h2>
    
    <!-- Error Description -->
    <p class="text-lg mb-8 opacity-80 leading-relaxed">
      {errorInfo.description}
    </p>
    
    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <a
        href={errorInfo.buttonLink}
        class="bg-white text-gray-800 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
      >
        {errorInfo.buttonText}
      </a>
      
      {#if status === 404}
        <a
          href="/recipes"
          class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm border border-white border-opacity-30"
        >
          Browse All Recipes
        </a>
      {/if}
      
      <button
        onclick={() => window.history.back()}
        class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm border border-white border-opacity-30"
      >
        Go Back
      </button>
    </div>
    
    <!-- Additional Help for 404 -->
    {#if status === 404}
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
        </div>
      </div>
    {/if}
    
    <!-- Technical Details (only in development) -->
    {#if import.meta.env.DEV && message}
      <details class="mt-8 text-left">
        <summary class="cursor-pointer text-lg font-semibold mb-2">Technical Details</summary>
        <div class="bg-black bg-opacity-20 p-4 rounded-lg font-mono text-sm">
          <div><strong>Status:</strong> {status}</div>
          <div><strong>Message:</strong> {message}</div>
          <div><strong>URL:</strong> {$page.url.pathname}</div>
        </div>
      </details>
    {/if}
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

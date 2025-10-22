<script lang="ts">
  import { authStore } from '$lib/stores/auth';
  import { onMount } from 'svelte';
  
  let isScrolled = false;
  let isMobileMenuOpen = false;

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 20;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false;
  }
</script>

<header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <a href="/" class="flex items-center space-x-2 group">
        <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <span class="text-2xl font-bold {isScrolled ? 'text-gray-800' : 'text-white'} group-hover:text-orange-500 transition-colors">
          RecipeApp
        </span>
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-8">
        <a 
          href="/" 
          class="text-sm font-medium {isScrolled ? 'text-gray-700 hover:text-orange-600' : 'text-white hover:text-orange-200'} transition-colors"
        >
          Home
        </a>
        <a 
          href="/recipes" 
          class="text-sm font-medium {isScrolled ? 'text-gray-700 hover:text-orange-600' : 'text-white hover:text-orange-200'} transition-colors"
        >
          Recipes
        </a>
        <a 
          href="/categories" 
          class="text-sm font-medium {isScrolled ? 'text-gray-700 hover:text-orange-600' : 'text-white hover:text-orange-200'} transition-colors"
        >
          Categories
        </a>
        
        {#if $authStore.user}
          <a 
            href="/recipes/create" 
            class="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Create Recipe
          </a>
          
          <!-- User Menu -->
          <div class="group relative">
            <button class="flex items-center space-x-2 {isScrolled ? 'text-gray-700' : 'text-white'} hover:text-orange-500 transition-colors">
              <div class="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-bold">
                  {$authStore.user.username[0].toUpperCase()}
                </span>
              </div>
              <span class="text-sm font-medium">{$authStore.user.username}</span>
              <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <div class="invisible absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 border border-gray-100">
              <div class="py-2">
                <a href="/users/{$authStore.user.username}" class="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                  <div class="flex items-center space-x-3">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span>My Profile</span>
                  </div>
                </a>
                <a href="/my-recipes" class="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                  <div class="flex items-center space-x-3">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    <span>My Recipes</span>
                  </div>
                </a>
                <div class="border-t border-gray-100 my-1"></div>
                <button
                  onclick={() => authStore.logout()}
                  class="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <div class="flex items-center space-x-3">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    <span>Sign Out</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        {:else}
          <a 
            href="/auth/login" 
            class="text-sm font-medium {isScrolled ? 'text-gray-700 hover:text-orange-600' : 'text-white hover:text-orange-200'} transition-colors"
          >
            Sign In
          </a>
          <a 
            href="/auth/signup" 
            class="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Join Now
          </a>
        {/if}
      </div>

      <!-- Mobile menu button -->
      <div class="md:hidden">
        <button
          onclick={toggleMobileMenu}
          class="p-2 rounded-lg {isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'} transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    {#if isMobileMenuOpen}
      <div class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg mt-2 border border-gray-100">
          <a 
            href="/" 
            onclick={closeMobileMenu}
            class="block px-3 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
          >
            Home
          </a>
          <a 
            href="/recipes" 
            onclick={closeMobileMenu}
            class="block px-3 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
          >
            Recipes
          </a>
          <a 
            href="/categories" 
            onclick={closeMobileMenu}
            class="block px-3 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
          >
            Categories
          </a>
          
          {#if $authStore.user}
            <a 
              href="/recipes/create" 
              onclick={closeMobileMenu}
              class="block px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold text-center"
            >
              Create Recipe
            </a>
            <a 
              href="/users/{$authStore.user.username}" 
              onclick={closeMobileMenu}
              class="block px-3 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
            >
              My Profile
            </a>
            <a 
              href="/my-recipes" 
              onclick={closeMobileMenu}
              class="block px-3 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
            >
              My Recipes
            </a>
            <button
              onclick={() => { authStore.logout(); closeMobileMenu(); }}
              class="w-full text-left px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          {:else}
            <a 
              href="/auth/login" 
              onclick={closeMobileMenu}
              class="block px-3 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
            >
              Sign In
            </a>
            <a 
              href="/auth/signup" 
              onclick={closeMobileMenu}
              class="block px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold text-center"
            >
              Join Now
            </a>
          {/if}
        </div>
      </div>
    {/if}
  </nav>
</header>

<!-- Spacer to prevent content from being hidden behind fixed header -->
<div class="h-16"></div>
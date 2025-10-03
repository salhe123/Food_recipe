<script lang="ts">
  let currentYear = $state(new Date().getFullYear());
</script>

<footer class="bg-gray-800 text-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- About section -->
      <div>
        <h3 class="text-xl font-bold text-white mb-4">RecipeApp</h3>
        <p class="text-gray-400 text-sm">
          Discover, share, and create amazing recipes from around the world.  
          Join our community of food enthusiasts and elevate your cooking skills.
        </p>
      </div>

      <div>
        <h4 class="text-lg font-semibold text-white mb-4">Quick Links</h4>
        <ul class="space-y-2">
          <li><a href="/" class="hover:text-blue-400 transition" aria-label="Home">Home</a></li>
          <li><a href="/recipes" class="hover:text-blue-400 transition" aria-label="Recipes">Recipes</a></li>
          <li><a href="/categories" class="hover:text-blue-400 transition" aria-label="Categories">Categories</a></li>
          <li><a href="/auth/login" class="hover:text-blue-400 transition" aria-label="Login">Login</a></li>
          <li><a href="/auth/signup" class="hover:text-blue-400 transition" aria-label="Sign Up">Sign Up</a></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h4 class="text-lg font-semibold text-white mb-4">Contact Us</h4>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li>Email: <a href="mailto:support@recipeapp.com" class="hover:text-blue-400" aria-label="Email Support">seya@recipeapp.com</a></li>
          <li>Phone: <a href="tel:+1234567890" class="hover:text-blue-400" aria-label="Call Support">+1 2521 966782248</a></li>
          <li>Address: 123 Bole Road St, Addis Ababa ET</li>
        </ul>
      </div>
      <div>
        <h4 class="text-lg font-semibold text-white mb-4">Follow Us</h4>
        <div class="flex space-x-4">
          <a href="https://facebook.com" class="hover:text-blue-500 transition" aria-label="Follow on Facebook">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.042 3.824 9.208 8.76 9.879v-6.987h-2.64v-2.892h2.64V9.412c0-2.608 1.552-4.04 3.932-4.04 1.14 0 2.332.204 2.332.204v2.564h-1.312c-1.292 0-1.696.803-1.696 1.63v1.954h2.88l-.46 2.892h-2.42v6.987C18.176 21.208 22 17.042 22 12z"/>
            </svg>
          </a>
          <a href="https://linkedin.com" class="hover:text-blue-400 transition" aria-label="Follow on LinkedIn">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.762 0-5 2.238-5 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.762-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.027-3.064-1.868-3.064-1.869 0-2.155 1.459-2.155 2.967v5.701h-3v-10h2.882v1.367h.041c.401-.76 1.379-1.562 2.839-1.562 3.036 0 3.596 2.001 3.596 4.601v5.594z"/>
            </svg>
          </a>
          <a href="https://instagram.com" class="hover:text-pink-500 transition" aria-label="Follow on Instagram">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311 1.265-.058 1.645-.07 4.849-.07zm0-2.163C8.756 0 8.332.012 7.052.07 5.773.128 4.574.347 3.513 1.408 2.452 2.469 2.233 3.668 2.175 4.947.012 12 0 12 0s0 0 0 0h0v0c0 0 0 0 0 0 0 0 0 0 0 0 .058 1.279.277 2.478 1.338 3.539 1.061 1.061 2.26 1.28 3.539 1.338 1.279.058 1.703.07 4.948.07s3.669-.012 4.948-.07c1.279-.058 2.478-.277 3.539-1.338 1.061-1.061 1.28-2.26 1.338-3.539.058-1.279.07-1.703.07-4.948s-.012-3.669-.07-4.948c-.058-1.279-.277-2.478-1.338-3.539-1.061-1.061-2.26-1.28-3.539-1.338C15.668.012 15.244 0 12 0z"/>
              <circle cx="12" cy="12" r="3.2"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
      &copy; {currentYear} RecipeApp. All rights reserved.
    </div>
  </div>
</footer>
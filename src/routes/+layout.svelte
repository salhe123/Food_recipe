<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.css';
  let { children } = $props();
</script>

<div class="flex min-h-screen flex-col bg-gray-100 font-sans">
  <Navbar />
  <main class="mx-auto max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
    {@render children()}
  </main>
  <Footer />
</div>
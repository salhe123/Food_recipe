<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.css';
  let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50 font-sans">
  <Navbar />
  <main class="flex-1">
    {@render children()}
  </main>
  <Footer />
</div>
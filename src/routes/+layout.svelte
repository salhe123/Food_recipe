<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { page } from '$app/stores';
  import '../app.css';
  let { children } = $props();
  
  // Check if we're on an auth page
  let isAuthPage = $derived($page.url.pathname.startsWith('/auth/'));
</script>

<div class="min-h-screen bg-gray-50 font-sans">
  {#if !isAuthPage}
    <Navbar />
  {/if}
  <main class="flex-1">
    {@render children()}
  </main>
  {#if !isAuthPage}
    <Footer />
  {/if}
</div>
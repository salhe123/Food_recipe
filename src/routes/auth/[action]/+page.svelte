<script lang="ts">
  import LoginForm from '$lib/components/auth/LoginForm.svelte';
  import SignupForm from '$lib/components/auth/SignupForm.svelte';
  export let data: { action: string };
</script>

{#if data.action === 'login'}
  <LoginForm />
{:else if data.action === 'signup'}
  <SignupForm />
{:else}
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-red-500 mb-4">Invalid Action</h1>
      <a href="/" class="text-blue-500 hover:underline">Go back to home</a>
    </div>
  </div>
{/if}
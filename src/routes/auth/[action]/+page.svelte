<script lang="ts">
  import LoginForm from '$lib/components/auth/LoginForm.svelte';
  import SignupForm from '$lib/components/auth/SignupForm.svelte';
  export let data: { action: string };
</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center">
  {#if data.action === 'login'}
    <LoginForm />
  {:else if data.action === 'signup'}
    <SignupForm />
  {:else}
    <p class="text-red-500">Invalid action</p>
  {/if}
</div>
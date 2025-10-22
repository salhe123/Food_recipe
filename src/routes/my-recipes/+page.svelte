<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { authStore } from '$lib/stores/auth';

	let { data } = $props<{ data: PageData }>();
	let recipes = $state(data.recipes || []);
	let loading = $state(false);
	let error = $state('');

	let showConfirm = $state(false);
	let recipeToDelete: string | null = null;

	const confirmDelete = (id: string) => {
		recipeToDelete = id;
		showConfirm = true;
	};

	const cancelDelete = () => {
		recipeToDelete = null;
		showConfirm = false;
	};

	$effect(() => {
		if ($page.form?.error) {
			error = $page.form.error;
			loading = false;
		} else if ($page.form?.success) {
			window.location.reload();
		}
	});
</script>

<svelte:head>
	<title>RecipeApp - My Recipes</title>
	<meta name="description" content="View and manage your recipes on RecipeApp" />
</svelte:head>

{#if $authStore.user}
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<!-- Hero Section -->
		<section class="text-center mb-12">
			<h1 class="text-5xl sm:text-6xl font-bold text-gray-800 mb-6">My Recipes</h1>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
				Manage and organize your culinary creations. Edit, delete, or create new recipes to share with the community.
			</p>
		</section>

		{#if error}
			<div class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 flex items-center gap-3">
				<svg class="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
				</svg>
				<span class="font-medium">{error}</span>
			</div>
		{/if}

		{#if recipes.length === 0}
			<div class="text-center py-16">
				<div class="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-orange-200 to-red-200 rounded-full flex items-center justify-center">
					<svg class="w-16 h-16 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
					</svg>
				</div>
				<h3 class="text-2xl font-bold text-gray-800 mb-4">No Recipes Yet</h3>
				<p class="text-gray-600 mb-8 max-w-md mx-auto">
					Start your culinary journey by creating your first recipe and sharing it with the community.
				</p>
				<a
					href="/recipes/create"
					class="inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
				>
					Create Your First Recipe
				</a>
			</div>
		{:else}
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
				{#each recipes as recipe}
					<div class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-100">
						<!-- Image Container -->
						<div class="relative h-48 overflow-hidden">
							{#if recipe.featuredImage}
								<a href="/recipes/{recipe.id}">
									<img
										src={recipe.featuredImage}
										alt={recipe.title}
										class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
									/>
								</a>
							{:else}
								<div class="w-full h-full bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center">
									<svg class="w-16 h-16 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
									</svg>
								</div>
							{/if}
							
							<!-- Category Badge -->
							<div class="absolute top-3 left-3">
								<span class="bg-white bg-opacity-90 backdrop-blur-sm text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
									{recipe.category}
								</span>
							</div>
							
							<!-- Prep Time Badge -->
							<div class="absolute top-3 right-3">
								<span class="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
									</svg>
									{recipe.prepTime}m
								</span>
							</div>
						</div>
						
						<!-- Content -->
						<div class="p-6">
							<a href="/recipes/{recipe.id}">
								<h3 class="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
									{recipe.title}
								</h3>
							</a>
							<p class="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
								{recipe.description}
							</p>
							
							<!-- Action Buttons -->
							<div class="flex items-center justify-between pt-4 border-t border-gray-100">
								<div class="flex gap-2">
									<a
										href="/recipes/{recipe.id}/edit"
										class="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-semibold text-sm"
									>
										<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
										</svg>
										Edit
									</a>
									<button
										type="button"
										onclick={() => confirmDelete(recipe.id)}
										class="inline-flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-semibold text-sm"
									>
										<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
										</svg>
										Delete
									</button>
								</div>
								
								<!-- View Recipe Arrow -->
								<a href="/recipes/{recipe.id}" class="text-orange-500 group-hover:text-orange-600 transition-colors">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
									</svg>
								</a>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	{#if showConfirm}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
			<div class="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 mx-4">
				<div class="text-center">
					<div class="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
						<svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
						</svg>
					</div>
					<h2 class="text-2xl font-bold text-gray-800 mb-4">Confirm Deletion</h2>
					<p class="text-gray-600 mb-8 leading-relaxed">
						Are you sure you want to delete this recipe? This action cannot be undone and will permanently remove your recipe from the platform.
					</p>
					<div class="flex gap-4">
						<button
							onclick={cancelDelete}
							class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
						>
							Cancel
						</button>
						<form
							method="POST"
							action="?/delete"
							use:enhance={() => {
								loading = true;
							}}
							class="flex-1"
						>
							<input type="hidden" name="recipeId" value={recipeToDelete} />
							<button
								type="submit"
								class="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
							>
								Delete Recipe
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	{/if}
{:else}
	<div class="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 flex items-center justify-center p-4">
		<div class="max-w-md w-full text-center">
			<div class="bg-white rounded-3xl shadow-2xl p-8">
				<div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
					<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
					</svg>
				</div>
				<h2 class="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
				<p class="text-gray-600 mb-6">Please log in to view and manage your recipes.</p>
				<div class="space-y-3">
					<a 
						href="/auth/login" 
						class="block w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
					>
						Sign In
					</a>
					<a 
						href="/auth/signup" 
						class="block w-full bg-white border-2 border-orange-500 text-orange-600 font-semibold py-3 px-6 rounded-xl hover:bg-orange-50 transition-all"
					>
						Create Account
					</a>
				</div>
				<div class="mt-6">
					<a href="/" class="text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center gap-2">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
						</svg>
						Back to Home
					</a>
				</div>
			</div>
		</div>
	</div>
{/if}

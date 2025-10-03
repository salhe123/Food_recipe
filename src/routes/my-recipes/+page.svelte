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
	<div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
		<div class="mb-8 flex items-start justify-between">
			<h1 class="text-3xl font-extrabold tracking-tight text-gray-900">My Recipes</h1>
			<!--  -->
		</div>

		{#if error}
			<div class="mb-6 rounded-md border-l-4 border-red-400 bg-red-50 p-4">
				<p class="font-medium text-red-700">{error}</p>
			</div>
		{/if}

		{#if recipes.length === 0}
			<div class="rounded-xl bg-white p-10 text-center shadow-lg">
				<p class="mb-4 text-lg text-gray-600">✨ You haven’t created any recipes yet.</p>
				<a
					href="/recipes/create"
					class="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-blue-700"
				>
					Create Your First Recipe
				</a>
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{#each recipes as recipe}
					<div
						class="group overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-xl"
					>
						{#if recipe.featuredImage}
							<a href="/recipes/{recipe.id}">
								<img
									src={recipe.featuredImage}
									alt={recipe.title}
									class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</a>
						{:else}
							<div
								class="flex h-48 w-full items-center justify-center bg-gray-100 text-gray-400 italic"
							>
								No Image
							</div>
						{/if}
						<div class="p-5">
							<a href="/recipes/{recipe.id}">
								<h3 class="text-xl font-semibold text-gray-900 transition hover:text-blue-600">
									{recipe.title}
								</h3>
							</a>
							<p class="mt-2 line-clamp-2 text-sm text-gray-600">{recipe.description}</p>
							<div class="mt-3 space-y-1 text-sm text-gray-500">
								<p><span class="font-medium">Category:</span> {recipe.category}</p>
								<p><span class="font-medium">Prep Time:</span> {recipe.prepTime} min</p>
							</div>
							<div class="mt-5 flex justify-end space-x-2">
								<a
									href="/recipes/{recipe.id}/edit"
									class="inline-flex items-center rounded-md bg-blue-50 px-3 py-1.5 text-blue-700 transition hover:bg-blue-100"
								>
									<svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
										/>
									</svg>
									Edit
								</a>
								<button
									type="button"
									on:click={() => confirmDelete(recipe.id)}
									class="inline-flex items-center hover:cursor-pointer rounded-md bg-red-50 px-3 py-1.5 text-red-900 transition hover:bg-red-100"
								>
									<svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
									Delete
								</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	{#if showConfirm}
		<div class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center ">
			<div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
				<h2 class="mb-4 text-lg font-bold text-gray-900">Confirm Deletion</h2>
				<p class="mb-6 text-gray-600">
					Are you sure you want to delete this recipe? This action cannot be undone.
				</p>
				<div class="flex justify-end space-x-3">
					<button
						on:click={cancelDelete}
						class="rounded-md bg-gray-100 px-4 py-2 text-gray-700 transition hover:bg-gray-200"
					>
						Cancel
					</button>
					<form
						method="POST"
						action="?/delete"
						use:enhance={() => {
							loading = true;
						}}
					>
						<input type="hidden" name="recipeId" value={recipeToDelete} />
						<button
							type="submit"
							class="rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
						>
							Delete
						</button>
					</form>
				</div>
			</div>
		</div>
	{/if}
{:else}
	<div class="py-12 text-center">
		<p class="text-lg font-medium text-red-500">Please log in to view your recipes.</p>
		<a href="/auth/login" class="mt-4 inline-block font-semibold text-blue-600 hover:underline"
			>Login</a
		>
	</div>
{/if}

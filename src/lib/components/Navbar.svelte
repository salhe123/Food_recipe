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

<header
	class="fixed top-0 right-0 left-0 z-50 transition-all duration-300 {isScrolled
		? 'bg-white/95 shadow-lg backdrop-blur-md'
		: 'bg-transparent'}"
>
	<nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<a href="/" class="group flex items-center space-x-2">
				<div
					class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 transition-transform group-hover:scale-110"
				>
					<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
						></path>
					</svg>
				</div>
				<span
					class="text-2xl font-bold {isScrolled
						? 'text-gray-800'
						: 'text-black'} transition-colors group-hover:text-orange-500"
				>
					RecipeApp
				</span>
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden items-center space-x-8 md:flex">
				<a
					href="/"
					class="text-sm font-medium {isScrolled
						? 'text-gray-700 hover:text-orange-600'
						: 'text-white hover:text-orange-200'} transition-colors"
				>
					Home
				</a>
				<a
					href="/recipes"
					class="text-sm font-medium {isScrolled
						? 'text-gray-700 hover:text-orange-600'
						: 'text-white hover:text-orange-200'} transition-colors"
				>
					Recipes
				</a>
				<a
					href="/categories"
					class="text-sm font-medium {isScrolled
						? 'text-gray-700 hover:text-orange-600'
						: 'text-white hover:text-orange-200'} transition-colors"
				>
					Categories
				</a>

				{#if $authStore.user}
					<a
						href="/recipes/create"
						class="transform rounded-full bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:from-orange-100 hover:to-red-100"
					>
						Create Recipe
					</a>
					<!-- User Menu -->
					<div class="group relative">
						<button
							class="flex items-center space-x-2 {isScrolled
								? 'text-gray-700'
								: 'text-orange-500'} transition-colors hover:text-orange-500"
						>
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500"
							>
								<span class="text-sm font-bold text-white">
									{$authStore.user.username[0].toUpperCase()}
								</span>
							</div>
							<span class="text-sm font-medium">{$authStore.user.username}</span>
							<svg
								class="h-4 w-4 transition-transform group-hover:rotate-180"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								></path>
							</svg>
						</button>

						<div
							class="invisible absolute right-0 mt-2 w-48 rounded-xl border border-gray-100 bg-white opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100"
						>
							<div class="py-2">
								<a
									href="/users/{$authStore.user.username}"
									class="block px-4 py-3 text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
								>
									<div class="flex items-center space-x-3">
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
											></path>
										</svg>
										<span>My Profile</span>
									</div>
								</a>
								<a
									href="/my-recipes"
									class="block px-4 py-3 text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
								>
									<div class="flex items-center space-x-3">
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
											></path>
										</svg>
										<span>My Recipes</span>
									</div>
								</a>
								<div class="my-1 border-t border-gray-100"></div>
								<button
									onclick={() => authStore.logout()}
									class="w-full px-4 py-3 text-left text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
								>
									<div class="flex items-center space-x-3">
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
											></path>
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
						class="text-sm font-medium {isScrolled
							? 'text-gray-700 hover:text-orange-600'
							: 'text-white hover:text-orange-200'} transition-colors"
					>
						Sign In
					</a>
					<a
						href="/auth/signup"
						class="transform rounded-full bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:from-orange-100 hover:to-red-100"
					>
						Join Now
					</a>
				{/if}
			</div>

			<!-- Mobile menu button -->
			<div class="md:hidden">
				<button
					onclick={toggleMobileMenu}
					class="rounded-lg p-2 {isScrolled
						? 'text-gray-700 hover:bg-gray-100'
						: 'text-white hover:bg-white/10'} transition-colors"
					aria-label="Toggle mobile menu"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</button>
			</div>
		</div>

		<!-- Mobile Navigation -->
		{#if isMobileMenuOpen}
			<div class="md:hidden">
				<div
					class="mt-2 space-y-1 rounded-lg border border-gray-100 bg-white px-2 pt-2 pb-3 shadow-lg"
				>
					<a
						href="/"
						onclick={closeMobileMenu}
						class="block rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
					>
						Home
					</a>
					<a
						href="/recipes"
						onclick={closeMobileMenu}
						class="block rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
					>
						Recipes
					</a>
					<a
						href="/categories"
						onclick={closeMobileMenu}
						class="block rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
					>
						Categories
					</a>

					{#if $authStore.user}
						<a
							href="/recipes/create"
							onclick={closeMobileMenu}
							class="block rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-3 py-2 text-center font-semibold text-white"
						>
							Create Recipe
						</a>
						<a
							href="/users/{$authStore.user.username}"
							onclick={closeMobileMenu}
							class="block rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
						>
							My Profile
						</a>
						<a
							href="/my-recipes"
							onclick={closeMobileMenu}
							class="block rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
						>
							My Recipes
						</a>
						<button
							onclick={() => {
								authStore.logout();
								closeMobileMenu();
							}}
							class="w-full rounded-lg px-3 py-2 text-left text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
						>
							Sign Out
						</button>
					{:else}
						<a
							href="/auth/login"
							onclick={closeMobileMenu}
							class="block rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
						>
							Sign In
						</a>
						<a
							href="/auth/signup"
							onclick={closeMobileMenu}
							class="block rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-3 py-2 text-center font-semibold text-white"
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

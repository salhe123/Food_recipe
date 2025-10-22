<svelte:head>
	<title>RecipeApp - About Us</title>
	<meta name="description" content="Learn about RecipeApp - the ultimate platform for sharing and discovering amazing recipes" />
</svelte:head>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<!-- Hero Section -->
	<section class="text-center mb-16">
		<div class="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
			<svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
			</svg>
		</div>
		<h1 class="text-5xl sm:text-6xl font-bold text-gray-800 mb-6">About RecipeApp</h1>
		<p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
			The ultimate platform for food lovers to discover, create, and share amazing recipes with a global community.
		</p>
	</section>

	<!-- Mission Section -->
	<section class="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 sm:p-12 mb-12 border border-orange-100">
		<h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Our Mission</h2>
		<p class="text-lg text-gray-700 text-center leading-relaxed max-w-3xl mx-auto">
			We believe that great food brings people together. RecipeApp connects food enthusiasts from around the world, 
			allowing them to share their culinary creations, discover new flavors, and build a community centered around 
			the love of cooking and eating.
		</p>
	</section>

	<!-- Features Section -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">What Makes Us Special</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
				<div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
					<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
					</svg>
				</div>
				<h3 class="text-xl font-bold text-gray-800 mb-3">Community Driven</h3>
				<p class="text-gray-600">Built by food lovers, for food lovers. Our community creates and curates the best recipes.</p>
			</div>
			
			<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
				<div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
					<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</div>
				<h3 class="text-xl font-bold text-gray-800 mb-3">Smart Discovery</h3>
				<p class="text-gray-600">Find the perfect recipe with our advanced search and filtering system.</p>
			</div>
			
			<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
				<div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
					<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>
				<h3 class="text-xl font-bold text-gray-800 mb-3">Easy to Use</h3>
				<p class="text-gray-600">Intuitive interface designed to make recipe sharing and discovery effortless.</p>
			</div>
		</div>
	</section>

	<!-- Technology Section -->
	<section class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 sm:p-12 mb-12 border border-blue-100">
		<h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Built with Modern Technology</h2>
		<p class="text-lg text-gray-700 text-center leading-relaxed max-w-3xl mx-auto mb-8">
			RecipeApp is built using cutting-edge web technologies to provide you with the best possible experience.
		</p>
		<div class="flex flex-wrap justify-center gap-4">
			<span class="bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-sm">SvelteKit</span>
			<span class="bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-sm">TypeScript</span>
			<span class="bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-sm">Tailwind CSS</span>
			<span class="bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-sm">MySQL</span>
			<span class="bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-sm">Drizzle ORM</span>
		</div>
	</section>

	<!-- Call to Action -->
	<section class="text-center">
		<h2 class="text-3xl font-bold text-gray-800 mb-6">Join Our Community</h2>
		<p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
			Ready to start sharing your favorite recipes or discover new ones? Join thousands of food lovers on RecipeApp today!
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a
				href="/auth/signup"
				class="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
			>
				Get Started
			</a>
			<a
				href="/recipes"
				class="bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-xl font-bold text-lg transition-all"
			>
				Browse Recipes
			</a>
		</div>
	</section>
</div>

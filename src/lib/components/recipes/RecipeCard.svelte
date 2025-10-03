<script lang="ts">
  let { recipe } = $props<{
    recipe: {
      id: number;
      title: string;
      description: string;
      prepTime: number;
      username: string;
      category: string;
      featuredImage: string | null;
    };
  }>();
</script>

<a
  href="/recipes/{recipe.id}"
  class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
>
  {#if recipe.featuredImage}
    <img
      src={recipe.featuredImage}
      alt={recipe.title}
      class="h-40 w-full object-cover rounded-md mb-4"
    />
  {:else}
    <div class="h-40 w-full bg-gray-200 rounded-md mb-4"></div>
  {/if}
  <h3 class="text-lg font-semibold">{recipe.title}</h3>
  <p class="text-gray-600 line-clamp-2">{recipe.description}</p>
  <p class="text-sm text-gray-500 mt-2">By {recipe.username}</p>
  <p class="text-sm text-gray-500">Category: {recipe.category}</p>
  <p class="text-sm text-gray-500">Prep Time: {recipe.prepTime} min</p>
</a>
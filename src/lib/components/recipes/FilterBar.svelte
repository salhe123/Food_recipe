<script lang="ts">
  import { goto } from '$app/navigation';
  let { 
    categories, 
    search = $bindable(), 
    category = $bindable(), 
    creator = $bindable(), 
    prepTime = $bindable(), 
    ingredient = $bindable() 
  } = $props<{
    categories: { id: number; name: string }[];
    search: string;
    category: string;
    creator: string;
    prepTime: string;
    ingredient: string;
  }>();

  function updateFilters() {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category) params.set('category', category);
    if (creator) params.set('creator', creator);
    if (prepTime) params.set('prepTime', prepTime);
    if (ingredient) params.set('ingredient', ingredient);
    goto(`/recipes?${params.toString()}`, { replaceState: true });
  }
</script>

<section class="bg-white p-6 rounded-lg shadow">
  <h2 class="text-2xl font-bold mb-4">Find Recipes</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
    <input
      type="text"
      bind:value={search}
      placeholder="Search by title..."
      on:input={updateFilters}
      class="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <select
      bind:value={category}
      on:change={updateFilters}
      class="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Categories</option>
      {#each categories as cat}
        <option value={cat.name}>{cat.name}</option>
      {/each}
    </select>
    <input
      type="text"
      bind:value={creator}
      placeholder="Search by creator..."
      on:input={updateFilters}
      class="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <select
      bind:value={prepTime}
      on:change={updateFilters}
      class="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Prep Times</option>
      <option value="0-30">0-30 min</option>
      <option value="30-60">30-60 min</option>
      <option value="60-120">1-2 hours</option>
      <option value="120-9999">2+ hours</option>
    </select>
    <input
      type="text"
      bind:value={ingredient}
      placeholder="Search by ingredient..."
      on:input={updateFilters}
      class="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</section>
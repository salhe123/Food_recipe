import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

// Store for tracking user interactions with recipes
interface RecipeInteraction {
  recipeId: number;
  isLiked: boolean;
  isBookmarked: boolean;
  likeCount: number;
  commentCount: number;
  userRating?: number;
}

// Store for all recipe interactions
export const recipeInteractions = writable<Map<number, RecipeInteraction>>(new Map());

// Store for current user's interactions (for quick access)
export const userInteractions = writable<{
  likedRecipes: Set<number>;
  bookmarkedRecipes: Set<number>;
  ratedRecipes: Map<number, number>; // recipeId -> rating
}>({
  likedRecipes: new Set(),
  bookmarkedRecipes: new Set(),
  ratedRecipes: new Map()
});

// Derived store for a specific recipe's interactions
export function getRecipeInteractions(recipeId: number) {
  return derived(recipeInteractions, ($interactions) => {
    return $interactions.get(recipeId) || {
      recipeId,
      isLiked: false,
      isBookmarked: false,
      likeCount: 0,
      commentCount: 0,
      userRating: undefined
    };
  });
}

// Actions for managing interactions
export const recipeActions = {
  // Initialize recipe data
  initializeRecipe: (recipeId: number, data: Partial<RecipeInteraction>) => {
    recipeInteractions.update(interactions => {
      const newInteractions = new Map(interactions);
      const existing = newInteractions.get(recipeId) || {
        recipeId,
        isLiked: false,
        isBookmarked: false,
        likeCount: 0,
        commentCount: 0
      };
      
      newInteractions.set(recipeId, { ...existing, ...data });
      return newInteractions;
    });
  },

  // Toggle like
  toggleLike: async (recipeId: number) => {
    const interactions = await import('$lib/stores/recipeInteractions');
    const current = interactions.recipeInteractions;
    
    current.update(interactions => {
      const newInteractions = new Map(interactions);
      const recipe = newInteractions.get(recipeId);
      
      if (recipe) {
        const newIsLiked = !recipe.isLiked;
        const likeCountChange = newIsLiked ? 1 : -1;
        
        newInteractions.set(recipeId, {
          ...recipe,
          isLiked: newIsLiked,
          likeCount: Math.max(0, recipe.likeCount + likeCountChange)
        });
        
        // Update user interactions
        userInteractions.update(user => ({
          ...user,
          likedRecipes: newIsLiked 
            ? new Set([...user.likedRecipes, recipeId])
            : new Set([...user.likedRecipes].filter(id => id !== recipeId))
        }));
      }
      
      return newInteractions;
    });
  },

  // Toggle bookmark
  toggleBookmark: async (recipeId: number) => {
    const interactions = await import('$lib/stores/recipeInteractions');
    const current = interactions.recipeInteractions;
    
    current.update(interactions => {
      const newInteractions = new Map(interactions);
      const recipe = newInteractions.get(recipeId);
      
      if (recipe) {
        const newIsBookmarked = !recipe.isBookmarked;
        
        newInteractions.set(recipeId, {
          ...recipe,
          isBookmarked: newIsBookmarked
        });
        
        // Update user interactions
        userInteractions.update(user => ({
          ...user,
          bookmarkedRecipes: newIsBookmarked 
            ? new Set([...user.bookmarkedRecipes, recipeId])
            : new Set([...user.bookmarkedRecipes].filter(id => id !== recipeId))
        }));
      }
      
      return newInteractions;
    });
  },

  // Set rating
  setRating: async (recipeId: number, rating: number) => {
    const interactions = await import('$lib/stores/recipeInteractions');
    const current = interactions.recipeInteractions;
    
    current.update(interactions => {
      const newInteractions = new Map(interactions);
      const recipe = newInteractions.get(recipeId);
      
      if (recipe) {
        newInteractions.set(recipeId, {
          ...recipe,
          userRating: rating
        });
        
        // Update user interactions
        userInteractions.update(user => ({
          ...user,
          ratedRecipes: new Map(user.ratedRecipes).set(recipeId, rating)
        }));
      }
      
      return newInteractions;
    });
  },

  // Update comment count
  updateCommentCount: (recipeId: number, change: number) => {
    recipeInteractions.update(interactions => {
      const newInteractions = new Map(interactions);
      const recipe = newInteractions.get(recipeId);
      
      if (recipe) {
        newInteractions.set(recipeId, {
          ...recipe,
          commentCount: Math.max(0, recipe.commentCount + change)
        });
      }
      
      return newInteractions;
    });
  }
};

// Persist user interactions to localStorage
if (browser) {
  // Load from localStorage on init
  const saved = localStorage.getItem('userInteractions');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      userInteractions.set({
        likedRecipes: new Set(parsed.likedRecipes || []),
        bookmarkedRecipes: new Set(parsed.bookmarkedRecipes || []),
        ratedRecipes: new Map(parsed.ratedRecipes || [])
      });
    } catch (e) {
      console.warn('Failed to load user interactions from localStorage:', e);
    }
  }

  // Save to localStorage whenever userInteractions changes
  userInteractions.subscribe(interactions => {
    const toSave = {
      likedRecipes: Array.from(interactions.likedRecipes),
      bookmarkedRecipes: Array.from(interactions.bookmarkedRecipes),
      ratedRecipes: Array.from(interactions.ratedRecipes)
    };
    localStorage.setItem('userInteractions', JSON.stringify(toSave));
  });
}

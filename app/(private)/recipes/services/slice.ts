import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  fetchRecipes } from "./action";

type RecipeSliceState = {
  list: Recipe[];
  savedRecipes: Recipe[];
  search: string;
  total: number;
  skip: number;
  limit: number;
  loading: boolean;
  details: Recipe | null
  detailsLoading:boolean
};

const initialState: RecipeSliceState = {
  search: "",
  list: [],
  savedRecipes: [],
  total: 0,
  skip: 0,
  limit: 90,
  loading: false,
  details: null,
  detailsLoading:false
};

const recipeSlice = createSlice({
  name: "recipeSlice",
  initialState,
  reducers: {
    setRecipeSearchQuery(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    clearSearchQuery(state) {
      state.search = "";
    },
    resetRecipeList(state){
      state.list = [];
      state.search = '';
      state.total = 0;
      state.limit = 90;
      state.skip = 0;
    },
    resetRecipeDetails(state){
      state.details = null
    },
    toggleSavedRecipe(state, action: PayloadAction<Recipe>) {
      const recipe = action.payload;
      const existingRecipe = state.savedRecipes.find((item) => item.id === recipe.id);

      if (existingRecipe) {
        state.savedRecipes = state.savedRecipes.filter((item) => item.id !== recipe.id);
        return;
      }

      state.savedRecipes.push(recipe);
    },
    removeSavedRecipe(state, action: PayloadAction<number>) {
      state.savedRecipes = state.savedRecipes.filter((item) => item.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.recipes;
        state.total = action.payload.total;
        state.skip = action.payload.skip;
        state.limit = action.payload.limit;
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.loading = false;
      })
    //   .addCase(fetchRecipeById.pending, (state) => {
    //     state.detailsLoading = true;
    //   })
    //   .addCase(fetchRecipeById.fulfilled, (state, action) => {
    //     state.details = action.payload
    //     state.detailsLoading = false;
    //   })
    //   .addCase(fetchRecipeById.rejected, (state) => {
    //     state.detailsLoading = false;
    //   });
      
  },
});

export const {
  setRecipeSearchQuery,
  clearSearchQuery,
  resetRecipeList,
  resetRecipeDetails,
  toggleSavedRecipe,
  removeSavedRecipe,
} = recipeSlice.actions;
export default recipeSlice.reducer;

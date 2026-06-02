import { getApiCall } from "@/app/lib/api.method";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (params: any, thunkApi) => {
    try {
      const endpoint = params?.q ? "recipes/search" : "recipes";
      const reponse = await getApiCall(endpoint, params);
      console.log(reponse);
      return reponse;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);

// export const fetchRecipeById = createAsyncThunk(
//   "recipes/fetchRecipeById",
//   async (params: any, thunkApi) => {
//     try {
//       const response = await getApiCall(`recipes/${params.id}`);
//       return response;
//     } catch (err) {
//       return thunkApi.rejectWithValue(err);
//     }
//   },
// );

export const getRecipeById = (id: number) => getApiCall(`recipes/${id}`);

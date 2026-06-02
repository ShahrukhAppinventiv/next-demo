import { getApiCall } from "@/app/lib/api.method";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProductList = createAsyncThunk(
  "product-list",
  async (params: any, thunkApi) => {
    try {
      const endpoint = params?.q ? "products/search" : "products";
      const reponse = await getApiCall(endpoint, params);
      console.log(reponse);
      return reponse;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);

export const getProductDetails = createAsyncThunk(
  "product-details",
  async (params: any, thunkApi) => {
    try {
      const response = await getApiCall(`products/${params.id}`);
      return response;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);

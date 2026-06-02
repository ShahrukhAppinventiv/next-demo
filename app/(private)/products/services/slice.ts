import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../(private)/products/services/types";
import { getProductDetails, getProductList } from "./action";

type ProductSliceState = {
  productList: Product[];
  search: string;
  total: number;
  skip: number;
  limit: number;
  loading: boolean;
  details: Product | null
  detailsLoading:boolean
};

const initialState: ProductSliceState = {
  search: "",
  productList: [],
  total: 0,
  skip: 0,
  limit: 50,
  loading: false,
  details: null,
  detailsLoading:false
};

const searchSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    clearSearchQuery(state) {
      state.search = "";
    },
    resetProductList(state){
      state.productList = [];
      state.search = '';
      state.total = 0;
      state.limit = 50;
      state.skip = 0;
    },
    resetProductDetails(state){
      state.details = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload.products;
        state.total = action.payload.total;
        state.skip = action.payload.skip;
        state.limit = action.payload.limit;
      })
      .addCase(getProductList.rejected, (state, action) => {
        state.loading = false;
      }).addCase(getProductDetails.pending, (state) => {
        state.detailsLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.details = action.payload
        state.detailsLoading = false;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.detailsLoading = false;
      });
      
  },
});

export const { setSearchQuery, clearSearchQuery,resetProductList, resetProductDetails } = searchSlice.actions;
export default searchSlice.reducer;

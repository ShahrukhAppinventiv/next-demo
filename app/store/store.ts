import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart-slice/cartSlice";
import productReducer from "../(private)/products/services/slice";
import recipeReducer from "../(private)/recipes/services/slice";

export const store = configureStore({
  reducer: {
    productSlice: productReducer,
    recipeSlice: recipeReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


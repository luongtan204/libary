import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/products/productSlice";
import { cartReducer } from "./features/products/cartSlice";
import { deliveryOrderReducer } from "./features/products/deliveryOrderSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    deliveryOrder: deliveryOrderReducer,
  },
});

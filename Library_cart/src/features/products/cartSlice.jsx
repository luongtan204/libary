import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find((pro) => pro.id === product.id);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      toast.success("Thêm giỏ hàng thành công");
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((pro) => pro.id !== id);
      toast.success("Xoá thành công");
    },

    decreaseQuantity: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find((pro) => pro.id === product.id);

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity--;
        } else {
          state.items = state.items.filter((pro) => pro.id !== product.id);
        }
      }
    },
    getTotalItems: (state) => {
      return state.items.length;
    },
    getTotalPrice: (state) => {
      console.log(state.items);
      let total = state.items.reduce(
        (totalPrice, item) =>
          totalPrice + item.quantity * parseFloat(item.price),
        0
      );
      return total;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  getTotalItems,
  getTotalPrice,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

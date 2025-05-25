import React from 'react'
import { configureStore } from "@reduxjs/toolkit";
import OrderSlice from './features/orders/OrderSlice';
const store = configureStore({
  reducer: {
    orders: OrderSlice.reducer,
  },
});

export default store
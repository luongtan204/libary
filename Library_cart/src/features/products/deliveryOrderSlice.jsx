import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [],
  loading: false,
  error: "",
};

const API = "http://localhost:3000";

export const createDeliveryOrder = createAsyncThunk(
  "delivery/createDeliveryOrder",
  async (orderData) => {
    try {
      const response = await axios.post(`${API}/delivery-orders`, orderData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const deliveryOrder = createSlice({
  name: "deliveryOrder",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createDeliveryOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith("pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("fulfilled"),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export const deliveryOrderReducer = deliveryOrder.reducer;

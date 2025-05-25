import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3000";
const initialState = {
  productList: [],
  loading: false,
  error: "",
};

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (body) => {
    const response = await axios.post(`${API}/products`, body);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (body) => {
    const response = await axios.put(`${API}/products/${body.id}`, body);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    const response = await axios.delete(`${API}/products/${id}`);
    return response.data;
  }
);

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id) => {
    const response = await axios.get(`${API}/products/${id}`);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(buider) {
    buider
      .addCase(addProduct.fulfilled, (state, action) => {
        state.productList.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const productId = action.payload.id;
        const index = state.productList.findIndex(
          (product) => product.id === productId
        );
        if (index !== -1) {
          state.productList[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.productList = state.productList.filter(
          (product) => product.id !== action.payload.id
        );
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          if (state.loading) {
            state.loading = false;
          }
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          if (state.loading) {
            state.loading = false;
            state.error = action.error.message;
          }
        }
      );
  },
});

const productReducer = productSlice.reducer;
export default productReducer;

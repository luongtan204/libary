import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const API_URL = 'https://67ff3c6458f18d7209f06c43.mockapi.io/ok';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  }
);

// Thêm mới đơn hàng
export const addOrder = createAsyncThunk(
  'orders/addOrder',
  async (order) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error('Failed to add order');
    return response.json();
  }
);



// Xóa đơn hàng
export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete order');
    return id;
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ id, status,order}) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...order ,status }),
    });
    if (!response.ok) throw new Error('Failed to update order status');
    return response.json();
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    loading: false,
    error: null,
    statusFilter: 'all',
  },
  reducers: {
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.items = state.items.filter(order => order.id !== action.payload);
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Giảm code trùng cho pending
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      // Giảm code trùng cho rejected
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.error?.message || 'Đã có lỗi xảy ra';
        }
      )
      // Giảm code trùng cho fulfilled (chung)
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      );
  },
});
export const { setStatusFilter } = orderSlice.actions;
export default orderSlice;
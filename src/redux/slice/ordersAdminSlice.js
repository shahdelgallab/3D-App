import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchAllOrders = createAsyncThunk(
  "ordersAdmin/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/orders");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "ordersAdmin/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/orders/${orderId}`, { status });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ordersAdminSlice = createSlice({
  name: "ordersAdmin",
  initialState: {
    orders: [],
    loading: false,
    error: null,
    totalOrders: 0,
    totalSales: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handelPending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "An error occurred";
    };

    builder
      .addCase(fetchAllOrders.pending, handelPending)
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;
        state.totalSales = action.payload.reduce(
          (total, order) => total + order.totalPrice,
          0
        );
      })
      .addCase(fetchAllOrders.rejected, handleRejected)

      .addCase(updateOrderStatus.pending, handelPending)
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, handleRejected);
  },
});

export default ordersAdminSlice.reducer;

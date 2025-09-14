import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchUserOrders = createAsyncThunk(
  "order/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/orders/my-orders");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrderDetails = createAsyncThunk(
  "order/fetchOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ordersSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    ordersLoading: false,
    ordersError: null,
    orderDetails: null,
    orderDetailsLoading: false,
    orderDetailsError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.ordersLoading = true;
        state.ordersError = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.ordersLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.ordersLoading = false;
        state.ordersError = action.payload?.message || "An error occurred";
      })

      .addCase(fetchOrderDetails.pending, (state) => {
        state.orderDetailsLoading = true;
        state.orderDetailsError = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.orderDetailsLoading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.orderDetailsLoading = false;
        state.orderDetailsError =
          action.payload?.message || "An error occurred";
      });
  },
});

export default ordersSlice.reducer;

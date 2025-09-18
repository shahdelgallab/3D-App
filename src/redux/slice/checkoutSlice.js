import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async (shippingAddress, { rejectWithValue }) => {
    try {
      const response = await api.post("/checkout", { shippingAddress });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserCheckouts = createAsyncThunk(
  "checkout/fetchUserCheckouts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/checkout");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCheckoutById = createAsyncThunk(
  "checkout/fetchCheckoutById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/checkout/${id}`); 
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkouts: [],
    loading: false,
    error: null,

    currentCheckout: null,
    currentCheckoutLoading: false,
    currentCheckoutError: null,
  },
  reducers: {
    clearCheckoutDetails: (state) => {
      state.currentCheckout = null;
    },
  },
  extraReducers: (builder) => {
    const handleCurrentCheckoutPending = (state) => {
      state.currentCheckoutLoading = true;
      state.currentCheckoutError = null;
    };

    const handleCurrentCheckoutRejected = (state, action) => {
      state.currentCheckoutLoading = false;
      state.currentCheckoutError =
        action.payload?.message || "An error occurred";
    };

    const handleCurrentCheckoutFulfilled = (state, action) => {
      state.currentCheckoutLoading = false;
      state.currentCheckout = action.payload;
    };

    builder
      .addCase(createCheckout.pending, handleCurrentCheckoutPending)
      .addCase(createCheckout.fulfilled, handleCurrentCheckoutFulfilled)
      .addCase(createCheckout.rejected, handleCurrentCheckoutRejected)

      .addCase(fetchCheckoutById.pending, handleCurrentCheckoutPending)
      .addCase(fetchCheckoutById.fulfilled, handleCurrentCheckoutFulfilled)
      .addCase(fetchCheckoutById.rejected, handleCurrentCheckoutRejected)

      .addCase(fetchUserCheckouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCheckouts.fulfilled, (state, action) => {
        state.loading = false;
        state.checkouts = action.payload;
      })
      .addCase(fetchUserCheckouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An error occurred";
      });
  },
});

export const { clearCheckoutDetails } = checkoutSlice.actions;
export default checkoutSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "./authSlice";
import api from "../../api/api";


export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const guestId = localStorage.getItem("guest-id");
      const response = await api.get("/cart", {
        headers: {
          "gest-id": guestId,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, material, color, quantity }, { rejectWithValue }) => {
    try {
      const guestId = localStorage.getItem("guest-id");
      const response = await api.post(
        "/cart",
        { productId, material, color, quantity },
        {
          headers: {
            "gest-id": guestId,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, material, color, quantity }, { rejectWithValue }) => {
    try {
      const guestId = localStorage.getItem("guest-id");
      const response = await api.put(
        "/cart",
        { productId, material, color, quantity },
        {
          headers: {
            "gest-id": guestId,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async ({ productId, material, color }, { rejectWithValue }) => {
    try {
      const guestId = localStorage.getItem("guest-id");
      const response = await api.delete("/cart", {
        data: { productId, material, color },
        headers: {
          "gest-id": guestId,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async (cartItems, { rejectWithValue }) => {
    try {
      const guestId = localStorage.getItem("guest-id");
      const response = await api.put(
        "/cart/merge",
        {},
        {
          headers: {
            "gest-id": guestId,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "An error occurred";
    };

    const handleFulfilledWithCart = (state, action) => {
      state.loading = false;
      state.items = action.payload.items || [];
      state.totalPrice = action.payload.totalPrice || 0;
    };

    builder
      .addCase(fetchCartItems.pending, handlePending)
      .addCase(fetchCartItems.fulfilled, handleFulfilledWithCart)
      .addCase(fetchCartItems.rejected, handleRejected)

      .addCase(addToCart.pending, handlePending)
      .addCase(addToCart.fulfilled, handleFulfilledWithCart)
      .addCase(addToCart.rejected, handleRejected)

      .addCase(updateCartItemQuantity.pending, handlePending)
      .addCase(updateCartItemQuantity.fulfilled, handleFulfilledWithCart)
      .addCase(updateCartItemQuantity.rejected, handleRejected)

      .addCase(removeItemFromCart.pending, handlePending)
      .addCase(removeItemFromCart.fulfilled, handleFulfilledWithCart)
      .addCase(removeItemFromCart.rejected, handleRejected)

      .addCase(mergeCart.pending, handlePending)
      .addCase(mergeCart.fulfilled, handleFulfilledWithCart)
      .addCase(mergeCart.rejected, handleRejected)

      .addCase(logout, (state) => {
        state.items = [];
        state.totalPrice = 0;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;

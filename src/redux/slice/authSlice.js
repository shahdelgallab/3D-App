import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

const userFromLocalStorage = (() => {
  const user = localStorage.getItem("user");
  return user && user !== "undefined" && user !== "null"
    ? JSON.parse(user)
    : null;
})();

const getOrSetGuestId = (() => {
  let guestId = localStorage.getItem("guest-id");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!guestId && !refreshToken) {
    guestId = `guest_${Date.now()}`;
    localStorage.setItem("guest-id", guestId);
  }
  return guestId;
})();

const initialState = {
  user: userFromLocalStorage,
  guestId: getOrSetGuestId,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post(`users/login`, { email, password });
      const data = response.data.data;
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post(`users/register`, {
        name,
        email,
        password,
      });
      const data = response.data.data;
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.guestId = `guest_${Date.now()}`;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.setItem("guest-id", state.guestId);
    },
    removeGuest(state) {
      state.gestId = null;
      localStorage.removeItem("guest-id");
    },
    generateNewGuestId(state) {
      state.guestId = `gest_${Date.now()}`;
      localStorage.setItem("guest-id", state.guestId);
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const handleFulfilled = (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "An error occurred";
    };

    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleFulfilled)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleFulfilled)
      .addCase(registerUser.rejected, handleRejected);
  },
});

export const { logout, generateNewGuestId, removeGuest } = authSlice.actions;

export default authSlice.reducer;

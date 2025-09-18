import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchUsers = createAsyncThunk(
  "userAdmin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/users");
      return response.data.data.users;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addUser = createAsyncThunk(
  "userAdmin/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/users", userData);
      return response.data.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUserRole = createAsyncThunk(
  "userAdmin/updateUserRole",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/users/${userId}`, { role });
      return response.data.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "userAdmin/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/users/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const usersAdminSlice = createSlice({
  name: "userAdmin",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    builder
      .addCase(fetchUsers.pending, handlePending)
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload || [];
      })
      .addCase(fetchUsers.rejected, handleRejected)

      .addCase(addUser.pending, handlePending)
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, handleRejected)

      .addCase(updateUserRole.pending, handlePending)
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUserRole.rejected, handleRejected)

      .addCase(deleteUser.pending, handlePending)
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, handleRejected);
  },
});

export default usersAdminSlice.reducer;

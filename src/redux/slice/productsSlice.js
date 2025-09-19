import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(filters);
      const response = await api.get(`/products?${query.toString()}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSimilarProduct = createAsyncThunk(
  "products/fetchSimilarProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/${id}/similar`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    totalPages: 1,
    productsLoading: false,
    productsError: null,

    selectedProduct: null,
    selectedProductLoading: false,
    selectedProductError: null,

    similarProducts: [],
    similarProductsLoading: false,
    similarProductsError: null,

    loading: false,
    error: null,

    filters: {
      category: "",
      search: "",
      sortBy: "newest",
      limit: 12,
      page: 1,
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        search: "",
        sortBy: "newest",
        limit: 12,
        page: 1,
      };
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.productsLoading = true;
        state.productsError = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.productsLoading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.productsLoading = false;
        state.productsError = action.payload?.message || "An error occurred";
      })

      .addCase(fetchProductDetails.pending, (state) => {
        state.selectedProductLoading = true;
        state.selectedProductError = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.selectedProductLoading = false;
        state.selectedProduct = action.payload.product;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.selectedProductLoading = false;
        state.selectedProductError = action.payload?.message;
      })

      .addCase(fetchSimilarProduct.pending, (state) => {
        state.similarProductsLoading = true;
        state.similarProductsError = null;
      })
      .addCase(fetchSimilarProduct.fulfilled, (state, action) => {
        state.similarProductsLoading = false;
        state.similarProducts = action.payload.similarProducts.slice(0, 4);
      })
      .addCase(fetchSimilarProduct.rejected, (state, action) => {
        state.similarProductsLoading = false;
        state.similarProductsError =
          action.payload?.message || "An error occurred";
      })

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload.product;
        const index = state.products.findIndex(
          (p) => p._id === updatedProduct._id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
        if (state.selectedProduct?._id === updatedProduct._id) {
          state.selectedProduct = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { setFilters, clearSelectedProduct } = productSlice.actions;

export default productSlice.reducer;

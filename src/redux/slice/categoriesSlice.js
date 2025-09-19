import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: ["All", "Electronics", "Home Goods", "Apparel", "Books", "Accessories"],
  },
  reducers: {},
});

export default  categoriesSlice.reducer;

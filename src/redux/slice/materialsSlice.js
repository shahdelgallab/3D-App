import { createSlice } from "@reduxjs/toolkit";

const materialsSlice = createSlice({
  name: "categories",
  initialState: {
    materials: ["PLA"],
    colors: ["white", "black"],
  },
  reducers: {},
});

export default materialsSlice.reducer;

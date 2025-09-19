import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productsReducer from "./slice/productsSlice";
import cartReducer from "./slice/cartSlice";
import checkoutReducer from "./slice/checkoutSlice";
import ordersReducer from "./slice/ordersSlice";
import usersAdminReducer from "./slice/usersAdminSlice";
import ordersAdminReducer from "./slice/ordersAdminSlice";
import productsAdminReducer from "./slice/productsAdminSlice";
import categoriesReducer from "./slice/categoriesSlice";
import materialsReducer from "./slice/materialsSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: ordersReducer,
    usersAdmin: usersAdminReducer,
    ordersAdmin: ordersAdminReducer,
    productsAdmin: productsAdminReducer,
    categories: categoriesReducer,
    materials: materialsReducer,
  },
});

export default store;

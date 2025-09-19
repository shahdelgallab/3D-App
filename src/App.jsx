import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import { fetchCartItems } from "./redux/slice/cartSlice";
import { Toaster } from "sonner";

import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionsPage from "./pages/CollectionsPage";
import ProductDetails from "./components/Products/ProductsDetails/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrderPage from "./pages/MyOrderPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import OrderManagement from "./components/Admin/OrderManagement";
import MyCheckoutsPage from "./pages/MyCheckoutPage";
import CheckoutDetailsPage from "./pages/CheckoutDetailsPage";
import ProtectedRoutes from "./components/Common/ProtectedRoutes";
import NotFoundPage from "./pages/NotFoundPage";

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Toaster position="top-left" />
      <Routes>
        {/* User-facing routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collections" element={<CollectionsPage />} />{" "}
          {/* Corrected path */}
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />{" "}
          {/* Corrected spelling */}
          <Route
            path="order-confirmation"
            element={<OrderConfirmationPage />}
          />
          <Route path="order/:id" element={<OrderDetailsPage />} />
          <Route path="my-orders" element={<MyOrderPage />} />
          <Route path="my-checkouts" element={<MyCheckoutsPage />} />
          <Route path="/checkout/:id" element={<CheckoutDetailsPage />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<ProtectedRoutes role="admin" />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;

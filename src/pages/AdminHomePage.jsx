import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllOrders } from "../redux/slice/ordersAdminSlice";
import { fetchProductsByFilters } from "../redux/slice/productsSlice";
import StatsCardSkeleton from "../components/Admin/StatsCardSkeleton";
import RecentOrdersTableSkeleton from "../components/Admin/RecentOrdersTableSkeleton";
import Error from "../components/Common/Error";

const AdminHomePage = () => {
  const dispatch = useDispatch();

  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
    totalOrders,
    totalSales,
  } = useSelector((state) => state.ordersAdmin);

  const { 
    products, 
    productsLoading, 
    productsError 
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchProductsByFilters());
  }, [dispatch]);

  const isLoading = ordersLoading || productsLoading;
  const apyError = ordersError || productsError;

  if (apyError) {
    return <Error message={apyError} />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : (
          <>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700">Revenue</h2>
              <p className="text-3xl font-bold text-green-600">${totalSales?.toFixed(2) || '0.00'}</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700">Total Orders</h2>
              <p className="text-3xl font-bold">{totalOrders || 0}</p>
              <Link to="/admin/orders" className="text-sm text-blue-500 hover:underline">Manage Orders</Link>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700">Products</h2>
              <p className="text-3xl font-bold">{products?.length || 0}</p>
              <Link to="/admin/products" className="text-sm text-blue-500 hover:underline">Manage Products</Link>
            </div>
          </>
        )}
      </div>
      
      {/* Recent Orders Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        {isLoading ? (
          <RecentOrdersTableSkeleton />
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full text-left text-gray-600">
              <thead className="bg-gray-50 text-sm uppercase">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Total Price</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.slice(0, 5).map((order) => (
                    <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-4 font-mono text-xs">{order._id}</td>
                      <td className="p-4">{order.user?.name || 'N/A'}</td>
                      <td className="p-4 font-semibold">${order.totalPrice.toFixed(2)}</td>
                      <td className="p-4 capitalize">{order.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-gray-500">No recent orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHomePage;
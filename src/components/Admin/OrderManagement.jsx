import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, updateOrderStatus } from "../../redux/slice/ordersAdminSlice";
import { toast } from 'sonner';
import OrderTableSkeleton from "./OrderTableSkeleton";
import Error from "../Common/Error";

const OrderManagement = () => {
  const { orders, loading, error } = useSelector((state) => state.ordersAdmin);
  const dispatch = useDispatch();
  
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, status) => {
    setUpdatingOrderId(orderId);
    dispatch(updateOrderStatus({ orderId, status }))
      .unwrap()
      .then(() => toast.success(`Order #${orderId.slice(-6)} updated to ${status}.`))
      .catch((err) => toast.error(err.message || "Failed to update order."))
      .finally(() => setUpdatingOrderId(null));
  };

  if (loading && orders.length === 0) {
    return <OrderTableSkeleton />;
  }

  if (error) {
    return <Error message={error} onRetry={() => dispatch(fetchAllOrders())} />;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Order Management</h1>
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full text-left text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4 font-mono text-xs text-gray-700">#{order._id.toUpperCase()}</td>

                  <td className="p-4 font-medium text-gray-900">{order.user?.name || "N/A"}</td>
                  <td className="p-4 font-semibold">${order.totalPrice.toFixed(2)}</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}

                      disabled={updatingOrderId === order._id}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 disabled:opacity-70"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
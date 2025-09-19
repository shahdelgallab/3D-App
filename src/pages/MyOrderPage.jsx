import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserOrders } from "../redux/slice/ordersSlice";
import CheckoutSkeletonCard from "../components/Common/CheckoutSkeletonCard";
import Error from "../components/Common/Error";

const StatusBadge = ({ status }) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-green-100 text-green-800",
    delivered: "bg-emerald-100 text-emerald-800",
    canceled: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
        statusStyles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

const MyOrderPage = () => {
  const dispatch = useDispatch();
  const {
    orders,
    ordersLoading: loading,
    ordersError: error,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (loading) {
    return <CheckoutSkeletonCard />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h1>

      {!orders || orders.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-700">No Orders Yet</h2>
          <p className="text-gray-500 mt-2">
            Looks like you haven't placed an order with us.
          </p>
          <Link
            to="/collections"
            className="mt-4 inline-block px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-semibold hover:bg-gray-900"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg bg-white shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between sm:items-center border-b">
                <div>
                  <p className="text-sm text-gray-500">Order Placed</p>
                  <p className="font-medium text-gray-700">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 sm:text-right">
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-mono text-xs text-gray-600">
                    #{order._id.toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Order Body */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <StatusBadge status={order.status} />
                  <p className="text-lg font-bold text-gray-800">
                    ${order.totalPrice.toFixed(2)}
                  </p>
                </div>

                {/* Product Images Preview */}
                <div className="flex space-x-2">
                  {order.items.map((item) => (
                    <img
                      key={`${item.product._id}-${item.color}-${item.material}`}
                      src={
                        item.product?.images?.[0] || "/placeholder-image.jpg"
                      }
                      alt={item.product?.name}
                      className="w-16 h-16 rounded-md object-cover border"
                    />
                  ))}
                </div>

                {/* View Details Button */}
                <div className="text-right mt-4">
                  <Link
                    to={`/order/${order._id}`}
                    className="text-sm font-semibold text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrderPage;

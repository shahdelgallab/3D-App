import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slice/ordersSlice"; // Assuming you create this slice
import Error from "../components/Common/Error";
import CheckoutDetailsSkeleton from "../components/Common/CheckoutDetailsSkeleton";

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
      className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
        statusStyles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, orderDetailsLoading, orderDetailsError } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderDetails(id));
    }
  }, [id, dispatch]);

  if (orderDetailsLoading) {
    return <CheckoutDetailsSkeleton />;
  }

  if (orderDetailsError) {
    return <Error message={orderDetailsError} />;
  }

  if (!orderDetails) {
    return <div className="p-6 text-center">Order not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 my-10">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Order #{orderDetails._id.slice(-8).toUpperCase()}
          </h1>
          <p className="text-gray-500 mt-1">
            Placed on {new Date(orderDetails.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <StatusBadge status={orderDetails.status} />
        </div>
      </div>

      <div className="p-6 rounded-lg border bg-white">
        {/* Product List */}
        <div className="space-y-4">
          {orderDetails.items.map(
            (
              item
            ) => (
              <div
                key={item.product._id}
                className="flex items-center gap-4 border-b pb-4 last:border-b-0"
              >
                <img
                  src={item.product?.images?.[0] || "/placeholder-image.jpg"}
                  alt={item.product?.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-grow">
                  <Link
                    to={`/product/${item.product._id}`}
                    className="font-semibold hover:underline"
                  >
                    {item.product?.name}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {item.color} / {item.material}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            )
          )}
        </div>

        {/* Order Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-6 border-t">
          {/* Shipping Info */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Shipping Address</h4>
            <div className="text-gray-600">
              <p>{orderDetails.shippingAddress.address}</p>
              <p>
                {orderDetails.shippingAddress.city},{" "}
                {orderDetails.shippingAddress.postalCode}
              </p>
              <p>{orderDetails.shippingAddress.country}</p>
              <p>Phone: {orderDetails.shippingAddress.phone}</p>
            </div>
          </div>
          {/* Price Summary */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold mb-2">Price Summary</h4>
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${orderDetails.totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-800 mt-2 border-t pt-2">
              <span>Total</span>
              <span>${orderDetails.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/my-orders"
          className="text-blue-600 hover:underline font-medium"
        >
          &larr; Back to My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetailsPage;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { clearCheckoutDetails } from "../redux/slice/checkoutSlice";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();

  const {
    currentCheckout: checkout,
    currentCheckoutLoading: loading,
    currentCheckoutError: error,
  } = useSelector((state) => state.checkout);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearCheckoutDetails());
    };
  }, []);

  useEffect(() => {
    if (!loading && !checkout) {
      navigate("/");
    }
  }, [checkout, loading, navigate]);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    const deliveryDate = new Date(orderDate.setDate(orderDate.getDate() + 7));
    return deliveryDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="text-center py-20">Loading your confirmation...</div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }

  return (
    checkout && (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 my-10">
        <div className="text-center mb-8">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-4">
            Thank You for Your Order!
          </h1>
          <p className="text-gray-600 mt-2">
            Your order has been placed successfully.
          </p>
        </div>

        <div className="p-6 rounded-lg border bg-gray-50">
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b">
            <div>
              <p className="text-sm text-gray-500">Order Number</p>
              <h2 className="text-lg font-semibold text-gray-800">
                #{checkout._id?.slice(-8).toUpperCase() || "N/A"}
              </h2>
            </div>
            <div className="mt-4 sm:mt-0 sm:text-right">
              <p className="text-sm text-gray-500">Estimated Delivery</p>
              <p className="font-semibold text-green-600">
                {calculateEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="my-6 space-y-4">
            {checkout.items.map((item) => (
              <div
                key={`${item.product._id}-${item.color}-${item.material}`}
                className="flex items-center gap-4"
              >
                <img
                  src={item.product?.images?.[0] || "/placeholder-image.jpg"}
                  alt={item.product?.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-grow">
                  <h4 className="font-semibold">{item.product?.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} / {item.material}
                  </p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Total Price Section */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${checkout.totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-800 mt-2">
              <span>Total</span>
              <span>${checkout.totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="mt-8 border-t pt-6">
            <h4 className="text-lg font-semibold mb-2">Shipping to</h4>
            <div className="text-gray-600">
              <p>{checkout.shippingAddress.address}</p>
              <p>
                {checkout.shippingAddress.city},{" "}
                {checkout.shippingAddress.postalCode}
              </p>
              <p>{checkout.shippingAddress.country}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default OrderConfirmationPage;

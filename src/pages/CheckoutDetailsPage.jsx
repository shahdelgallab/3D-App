import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  fetchCheckoutById,
  clearCheckoutDetails,
} from "../redux/slice/checkoutSlice";
import Error from "../components/Common/Error";
import CheckoutDetailsSkeleton from "../components/Common/CheckoutDetailsSkeleton";

// Helper component for the payment status badge
const PaymentStatusBadge = ({ status }) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    paid: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
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

const CheckoutDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentCheckout, currentCheckoutLoading, currentCheckoutError } =
    useSelector((state) => state.checkout);

  useEffect(() => {
    if (id) {
      dispatch(fetchCheckoutById(id));
    }
    // Cleanup on unmount
    return () => {
      dispatch(clearCheckoutDetails());
    };
  }, [id, dispatch]);

  if (currentCheckoutLoading) {
    return <CheckoutDetailsSkeleton />;
  }

  if (currentCheckoutError) {
    return <Error message={currentCheckoutError} />;
  }

  if (!currentCheckout) {
    return <div className="p-6 text-center">Checkout session not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 my-10">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Checkout Summary
          </h1>
          <p className="text-gray-500 mt-1">
            Created on{" "}
            {new Date(currentCheckout.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <PaymentStatusBadge status={currentCheckout.paymentStatus} />
        </div>
      </div>

      <div className="p-6 rounded-lg border bg-white">
        {/* Product List */}
        <div className="space-y-4">
          {currentCheckout.items.map((item) => (
            <div
              key={`${item.product._id}-${item.color}-${item.material}`}
              className="flex items-center gap-4 border-b pb-4 last:border-b-0"
            >
              <img
                src={item.product?.images?.[0] || "/placeholder-image.jpg"}
                alt={item.product?.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-grow">
                <p className="font-semibold">{item.product?.name}</p>
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
          ))}
        </div>

        {/* Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-6 border-t">
          <div>
            <h4 className="text-lg font-semibold mb-2">Shipping Address</h4>
            <div className="text-gray-600">
              <p>{currentCheckout.shippingAddress.address}</p>
              <p>
                {currentCheckout.shippingAddress.city},{" "}
                {currentCheckout.shippingAddress.postalCode}
              </p>
              <p>{currentCheckout.shippingAddress.country}</p>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-semibold mb-2">Price Summary</h4>
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${currentCheckout.totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-800 mt-2 border-t pt-2">
              <span>Total</span>
              <span>${currentCheckout.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      {currentCheckout.paymentStatus === "pending" && (
        <div className="mt-8 p-6 bg-blue-50 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-blue-800">
            Complete Your Purchase
          </h3>
          <p className="text-blue-700 my-4">
            Your items are reserved. Please proceed to payment to finalize your
            order.
          </p>
          {/* You would place your payment button / component here */}
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutDetailsPage;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import {
  fetchCheckoutById,
  clearCheckoutDetails,
} from "../redux/slice/checkoutSlice";
import Error from "../components/Common/Error";
import CheckoutDetailsSkeleton from "../components/Common/CheckoutDetailsSkeleton";
import Payment from "../components/Cart/Payment";

// Helper component for the payment status badge
const PaymentStatusBadge = ({ status }) => {
  const statusStyles = {
    pending_payment: "bg-yellow-100 text-yellow-800",
    wait_payment: "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    paid: "bg-green-100 text-green-800",
    canceled: "bg-red-100 text-red-800",
    failed: "bg-red-100 text-red-800",
    expired: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`px-3 py-1.5 rounded-full text-sm font-semibold capitalize ${
        statusStyles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status?.replace("_", " ")}
    </span>
  );
};

const CheckoutDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    currentCheckout: checkout,
    currentCheckoutLoading: loading,
    currentCheckoutError: error,
  } = useSelector((state) => state.checkout);

  useEffect(() => {
    if (id) {
      dispatch(fetchCheckoutById(id));
    }
    return () => {
      dispatch(clearCheckoutDetails());
    };
  }, [id, dispatch]);

  if (loading) return <CheckoutDetailsSkeleton />;
  if (error)
    return (
      <div className="p-6">
        <Error message={error} />
      </div>
    );
  if (!checkout)
    return <div className="p-6 text-center">Checkout session not found.</div>;

  const {
    items,
    shippingAddress,
    totalPrice,
    createdAt,
    paymentStatus,
    status,
    paymentDetails,
  } = checkout;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Checkout Details
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Created on:{" "}
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Items and Payment */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Items in Your Order ({items.length})
              </h3>
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div
                    key={`${item.product._id}-${item.color}-${item.material}`}
                    className="flex items-center gap-4 py-4"
                  >
                    <img
                      src={
                        item.product?.images?.[0] || "/placeholder-image.jpg"
                      }
                      alt={item.product?.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <p className="font-semibold text-gray-700">
                        {item.product?.name}
                      </p>
                      <p className="text-sm text-gray-500 capitalize">
                        {item.color} / {item.material}
                      </p>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* --- Payment Action Section (Merged Logic) --- */}
            <div className="bg-white p-6 rounded-lg shadow-md border">
              {(() => {
                switch (status) {
                  case "wait_payment":
                    return (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          Complete Your Payment
                        </h3>
                        <Payment checkout={checkout} />
                      </div>
                    );

                  case "pending_payment":
                    return (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          Payment Instructions
                        </h3>
                        <div className="mt-4 border border-gray-200 p-4 rounded-md text-center bg-gray-50">
                          {paymentDetails?.error && (
                            <Error message={paymentDetails.error} />
                          )}
                          {paymentDetails?.redirectTo && (
                            <div className="py-4">
                              <p className="text-gray-700 mb-4">
                                Your payment is waiting. Click the button below
                                to complete your purchase securely.
                              </p>
                              <a
                                href={paymentDetails.redirectTo}
                                className="inline-block w-full max-w-xs bg-green-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-green-700 transition-colors"
                              >
                                Complete Payment
                              </a>
                            </div>
                          )}
                          {paymentDetails?.fawryCode && (
                            <div className="mb-4">
                              <p className="text-gray-700">
                                Please use this Fawry Code to pay:
                              </p>
                              <p className="text-3xl font-bold text-black my-2 tracking-wider">
                                {paymentDetails.fawryCode}
                              </p>
                            </div>
                          )}

                          {paymentDetails?.meezaQrCode && (
                            <div className="flex flex-col items-center mb-4">
                              <p className="text-gray-700 mb-3">
                                Scan the QR code with your mobile wallet app:
                              </p>
                              <div className="p-3 bg-white inline-block rounded-lg shadow-md">
                                <QRCode
                                  value={paymentDetails.meezaQrCode}
                                  size={160}
                                />
                              </div>
                              {paymentDetails.meezaReference && (
                                <p className="text-gray-700 mt-3 text-sm">
                                  Or use this reference number:{" "}
                                  <strong className="text-black">
                                    {paymentDetails.meezaReference}
                                  </strong>
                                </p>
                              )}
                            </div>
                          )}

                          {paymentDetails?.expireDate && (
                            <p className="text-xs text-gray-500 mt-4">
                              This code expires on:{" "}
                              {new Date(
                                paymentDetails.expireDate
                              ).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    );

                  case "completed":
                    return (
                      <div className="text-center py-4">
                        <h3 className="text-xl font-semibold text-green-600 mb-2">
                          Payment Successful
                        </h3>
                        <p className="text-gray-600">
                          This order has been paid and is being processed. Thank
                          you!
                        </p>
                      </div>
                    );

                  case "canceled":
                  case "failed":
                    return (
                      <div className="text-center py-4">
                        <h3 className="text-xl font-semibold text-red-600 mb-2">
                          Payment Failed or Canceled
                        </h3>
                        <p className="text-gray-600">
                          This checkout is no longer active.
                        </p>
                      </div>
                    );

                  default:
                    return (
                      <p className="text-gray-500 text-center py-4">
                        The payment status is currently unavailable.
                      </p>
                    );
                }
              })()}
            </div>
            {/* --- End of Payment Action Section --- */}
          </div>

          {/* Right Column: Summary and Shipping */}
          <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-24">
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status:</span>
                  <PaymentStatusBadge status={paymentStatus} />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium text-gray-800">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                {/* Add Shipping / Taxes here if needed */}
                <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-3 mt-3">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Shipping Address
              </h3>
              <address className="text-gray-600 not-italic">
                <p>{shippingAddress.address}</p>
                <p>
                  {shippingAddress.city}, {shippingAddress.postalCode}
                </p>
                <p>{shippingAddress.country}</p>
                <p className="mt-2">Tel: {shippingAddress.phone}</p>
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetailsPage;

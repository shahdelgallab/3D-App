import React from "react";
import { Link, useSearchParams } from "react-router-dom";

// يمكنك استخدام أي أيقونة مناسبة
const AlertCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-red-500"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const PaymentFailed = () => {
  // نقرأ رقم الطلب (checkoutId) من الرابط عشان نستخدمه في زر إعادة الدفع
  const [searchParams] = useSearchParams();
  const checkoutId = searchParams.get("checkoutId");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="mx-auto mb-4">
          <AlertCircleIcon />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Payment Failed</h1>
        <p className="text-gray-600 mt-4 mb-8">
          Unfortunately, we were unable to process your payment. Please try again or use a different payment method.
        </p>

        {checkoutId && (
          <Link
            to={`/checkout/${checkoutId}`}
            className="w-full bg-gray-800 text-white py-3 px-6 rounded-md font-semibold hover:bg-gray-700 transition-colors"
          >
            Retry Payment
          </Link>
        )}
        <Link
            to={`/`}
            className=" block mt-4 w-full text-gray-500 py-3 px-6 rounded-md font-semibold hover:text-gray-700 transition-colors"
          >
            Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailed;
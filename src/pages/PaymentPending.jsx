import React from "react";
import { Link } from "react-router-dom";

const ClockIcon = () => (
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
        className="text-yellow-500"
    >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const PaymentPending = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="mx-auto mb-4">
            <ClockIcon />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Payment is Pending</h1>
        <p className="text-gray-600 mt-4 mb-8">
            Your order has been received and is awaiting payment confirmation. We will notify you once the payment is complete.
        </p>
        <Link
          to="/"
          className="w-full bg-gray-800 text-white py-3 px-6 rounded-md font-semibold hover:bg-gray-700 transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default PaymentPending;
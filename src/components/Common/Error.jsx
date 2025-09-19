import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const Error = ({ message, onRetry }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-20 text-gray-500">
      <FiAlertTriangle className="w-12 h-12 text-red-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-700">
        Oops! Something went wrong.
      </h3>
      <p className="mb-6">{message || "An unknown error occurred."}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;
import React from 'react';

const CheckoutSkeletonCard = () => {
  return (
    <div className="border rounded-lg bg-white shadow-sm overflow-hidden animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-gray-200 p-4 flex justify-between items-center border-b">
        <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
        <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
      </div>

      {/* Body Skeleton */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
          <div className="w-16 h-8 bg-gray-300 rounded"></div>
        </div>
        
        {/* Images Skeleton */}
        <div className="flex space-x-2 mb-4">
          <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
          <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
          <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
        </div>
        
        {/* Button Skeleton */}
        <div className="flex justify-end mt-4">
            <div className="w-28 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeletonCard;
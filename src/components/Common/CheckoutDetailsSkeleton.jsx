import React from 'react';

const CheckoutDetailsSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 my-10 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-gray-300 rounded"></div>
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
        </div>
        <div className="h-8 w-24 bg-gray-300 rounded-full"></div>
      </div>

      <div className="p-6 rounded-lg border bg-white">
        {/* Items Skeleton */}
        <div className="space-y-4">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex items-center gap-4 border-b pb-4">
              <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
              <div className="flex-grow space-y-2">
                <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
              </div>
              <div className="h-5 w-12 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>

        {/* Summary Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-6 border-t">
          <div className="space-y-2">
            <div className="h-5 w-1/3 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-5 w-1/3 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-full bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetailsSkeleton;
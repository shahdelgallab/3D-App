import React from 'react';

const ProductDetailsSkeleton = () => (
  <div className="p-4 sm:p-6 bg-gray-50 min-h-screen animate-pulse">
    <div className="max-w-6xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image Gallery Skeleton */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-4">
            <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
            <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
            <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
          </div>
          <div className="flex-1 h-[550px] bg-gray-300 rounded-lg"></div>
        </div>
        {/* Product Info Skeleton */}
        <div>
          <div className="h-10 w-3/4 bg-gray-300 rounded mb-4"></div>
          <div className="h-8 w-1/4 bg-gray-300 rounded mb-6"></div>
          <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-5/6 bg-gray-300 rounded mb-8"></div>
          <div className="h-6 w-1/3 bg-gray-300 rounded mb-4"></div>
          <div className="flex gap-2">
            <div className="w-20 h-10 bg-gray-300 rounded-md"></div>
            <div className="w-20 h-10 bg-gray-300 rounded-md"></div>
          </div>
          <div className="h-12 w-full bg-gray-300 rounded-md mt-8"></div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductDetailsSkeleton;
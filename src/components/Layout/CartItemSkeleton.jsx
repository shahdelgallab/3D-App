import React from 'react';

const CartItemSkeleton = () => {
  return (
    <div className="flex gap-4 animate-pulse">
      <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
      <div className="flex-grow flex flex-col justify-between py-1">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default CartItemSkeleton;
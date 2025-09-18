import React from 'react';

const SkeletonCard = () => (
  <div className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] animate-pulse">
    <div className="w-full h-[500px] bg-gray-300 rounded-lg" />
    <div className="mt-4">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4 mt-2"></div>
    </div>
  </div>
);

export default SkeletonCard;
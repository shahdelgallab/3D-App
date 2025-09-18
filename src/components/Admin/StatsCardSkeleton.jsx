import React from 'react';

const StatsCardSkeleton = () => {
  return (
    <div className="p-4 shadow-md rounded-lg bg-white animate-pulse">
      <div className="h-6 w-1/3 bg-gray-300 rounded mb-2"></div>
      <div className="h-8 w-1/2 bg-gray-300 rounded"></div>
    </div>
  );
};

export default StatsCardSkeleton;
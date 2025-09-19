import React from 'react';

const RecentOrdersTableSkeleton = () => {
  return (
    <div className="overflow-x-auto animate-pulse">
      <div className="min-w-full">
        <div className="bg-gray-200 h-10 w-full rounded-t-lg"></div>
        <div className="space-y-2 p-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentOrdersTableSkeleton;
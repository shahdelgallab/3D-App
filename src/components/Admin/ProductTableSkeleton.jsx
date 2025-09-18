import React from 'react';

const ProductTableSkeleton = () => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow animate-pulse">
      <table className="min-w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4"><div className="h-4 bg-gray-300 rounded w-1/3"></div></th>
            <th className="p-4"><div className="h-4 bg-gray-300 rounded w-1/3"></div></th>
            <th className="p-4"><div className="h-4 bg-gray-300 rounded w-1/3"></div></th>
            <th className="p-4"><div className="h-4 bg-gray-300 rounded w-1/3"></div></th>
            <th className="p-4"><div className="h-4 bg-gray-300 rounded w-1/4"></div></th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-b">
              <td className="p-4"><div className="h-4 bg-gray-300 rounded"></div></td>
              <td className="p-4"><div className="h-4 bg-gray-300 rounded"></div></td>
              <td className="p-4"><div className="h-4 bg-gray-300 rounded"></div></td>
              <td className="p-4"><div className="h-6 w-20 bg-gray-300 rounded-full"></div></td>
              <td className="p-4 flex gap-2"><div className="h-8 w-16 bg-gray-300 rounded"></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTableSkeleton;
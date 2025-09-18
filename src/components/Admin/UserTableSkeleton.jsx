import React from 'react';

const UserTableSkeleton = () => (
  <div className="overflow-x-auto shadow-md sm:rounded-lg animate-pulse">
    <table className="min-w-full">
      <thead className="bg-gray-200">
        <tr>
          <th className="py-4 px-4"><div className="h-4 bg-gray-300 rounded w-1/3"></div></th>
          <th className="py-4 px-4"><div className="h-4 bg-gray-300 rounded w-1/3"></div></th>
          <th className="py-4 px-4"><div className="h-4 bg-gray-300 rounded w-1/3"></div></th>
          <th className="py-4 px-4"><div className="h-4 bg-gray-300 rounded w-1/3"></div></th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, i) => (
          <tr key={i} className="border-b">
            <td className="p-4"><div className="h-4 bg-gray-300 rounded"></div></td>
            <td className="p-4"><div className="h-4 bg-gray-300 rounded"></div></td>
            <td className="p-4"><div className="h-8 bg-gray-300 rounded"></div></td>
            <td className="p-4"><div className="h-10 w-24 bg-gray-300 rounded"></div></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UserTableSkeleton;
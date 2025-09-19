import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SortOptions = ({ onSortChange }) => {
  const [searchParams] = useSearchParams();

  const currentSortBy = searchParams.get('sortBy') || '';

  return (
    <div className="flex items-center">
      <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-600">Sort by:</label>
      <select
        id="sort"
        onChange={(e) => onSortChange(e.target.value)}
        value={currentSortBy}
        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      >
        <option value="newest">Newest</option>
        <option value="popularity">Popularity</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortOptions;
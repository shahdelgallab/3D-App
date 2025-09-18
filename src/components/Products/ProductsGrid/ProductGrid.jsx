import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';
import SkeletonCard from './SkeletonCard';
import ProductCard from './ProductCard';
import Error from '../../Common/Error';

const ProductGrid = ({ products, loading, error }) => {
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <Error message={error}/>
  }
  
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <h3 className="text-xl font-semibold text-gray-700">No Products Found</h3>
        <p>Try adjusting your filters or check back later.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
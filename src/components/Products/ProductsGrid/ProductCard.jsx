import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div className="group min-w-[100%] sm:min-w-[50%] lg:min-w-[30%]">
    <Link to={`/product/${product._id}`} className="block">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={product.images?.[0] || '/placeholder-image.jpg'}
          alt={product.name || 'Product image'}
          className="w-full h-[500px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          onError={(e) => { e.target.src = '/placeholder-image.jpg'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="mt-4">
        <h4 className="font-semibold text-lg text-gray-800 truncate group-hover:text-blue-600 transition-colors">
          {product.name}
        </h4>
        <p className="mt-1 text-md text-gray-600">
          ${product.price?.toFixed(2) || 'N/A'}
        </p>
      </div>
    </Link>
  </div>
);

export default ProductCard;
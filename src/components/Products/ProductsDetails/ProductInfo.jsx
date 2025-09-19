import React, { useState } from "react";
import { useSelector } from "react-redux";

const ProductInfo = ({
  product,
  selectedMaterial,
  setSelectedMaterial,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity,
  onAddToCart,
  isAddingToCart,
}) => {
  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  }; 


  const {materials, colors} = useSelector((state) => state.materials);

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        {product.name}
      </h1>
      <p className="text-2xl text-gray-700 mb-4">
        ${product.price?.toFixed(2) || "N/A"}
      </p>
      <p className="text-gray-600 leading-relaxed mb-6">
        {product.description}
      </p>

      <div className="mb-6">
        <p className="font-semibold text-gray-800 mb-2">Material:</p>
        <div className="flex flex-wrap gap-2">
          {materials.map((material) => (
            <button
              key={material}
              onClick={() => setSelectedMaterial(material)}
              className={`px-4 py-2 rounded-md border text-sm transition-colors ${
                selectedMaterial === material
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {material}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="font-semibold text-gray-800 mb-2">Color:</p>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color}
              title={color}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selectedColor === color
                  ? "border-gray-900 ring-2 ring-offset-2 ring-gray-900"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="font-semibold text-gray-800 mb-2">Quantity:</p>
        <div className="flex items-center border border-gray-300 rounded-md w-fit">
          <button
            className="px-3 py-1 text-lg"
            onClick={() => handleQuantityChange(-1)}
          >
            -
          </button>
          <span className="px-4 text-lg">{quantity}</span>
          <button
            className="px-3 py-1 text-lg"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={onAddToCart}
        disabled={isAddingToCart}
        className="w-full bg-gray-900 text-white py-3 px-6 rounded-md text-lg font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-gray-800"
      >
        {isAddingToCart ? "Adding..." : "Add To Cart"}
      </button>
    </div>
  );
};

export default ProductInfo;

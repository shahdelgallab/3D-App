import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/slice/cartSlice";

import ProductGrid from "../ProductsGrid/ProductGrid";
import ImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import { toast } from "sonner";
import {
  clearSelectedProduct,
  fetchProductDetails,
  fetchSimilarProduct,
} from "../../../redux/slice/productsSlice";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();

  const productFetchId = productId || id;

  const dispatch = useDispatch();

  const {
    selectedProduct,
    selectedProductLoading,
    selectedProductError,
    similarProducts,
    similarProductsLoading,
    similarProductsError,
  } = useSelector((state) => state.products);

  const { loading: cartLoading } = useSelector((state) => state.cart);

  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProduct(productFetchId));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, productFetchId]);

  const handleAddToCart = () => {
    if (!selectedMaterial) {
      toast.error("Please select a material.");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color.");
      return;
    }

    dispatch(
      addToCart({
        productId: selectedProduct._id,
        material: selectedMaterial,
        color: selectedColor,
        quantity,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Product added to cart!");
      })
      .catch((error) => {
        toast.error(error.message || "Failed to add product to cart.");
      });
  };

  if (selectedProductLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (selectedProductError) {
    return (
      <div className="text-center py-20 text-red-500">
        Error: {selectedProductError}
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="text-center py-20 text-gray-600">
        <h2 className="text-2xl font-semibold">Product Not Found</h2>
        <p className="mt-2">The product you are looking for does not exist.</p>
      </div>
    );
  }
  
  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ImageGallery images={selectedProduct.images || []} />
          <ProductInfo
            product={selectedProduct}
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            quantity={quantity}
            setQuantity={setQuantity}
            onAddToCart={handleAddToCart}
            isAddingToCart={cartLoading}
          />
        </div>

        <div className="mt-20 border-t pt-10">
          <h2 className="text-2xl text-center font-semibold mb-8 text-gray-800">
            You May Also Like
          </h2>
          <ProductGrid
            products={similarProducts}
            loading={similarProductsLoading}
            error={similarProductsError}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

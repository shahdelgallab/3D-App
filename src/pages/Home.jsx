import React, { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import CategoryCollectionSection from "../components/Products/CategoryCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductsDetails/ProductDetails";
import ProductGrid from "../components/Products/ProductsGrid/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slice/productsSlice";
import api from "../api/api";
import ProductDetailsSkeleton from "../components/Products/ProductsDetails/ProductDetailsSkeleton";
import Error from "../components/Common/Error";

const Home = () => {
  const dispatch = useDispatch();
  const { products, productsLoading, productsError } = useSelector(
    (state) => state.products
  );
  const [bestSeller, setBestSeller] = useState(null);
  const [bestSellerLoading, setBestSellerLoading] = useState(false);
  const [bestSellerError, setBestSellerError] = useState(false);
  const fetchBestSeller = async () => {
    setBestSellerLoading(true);
    try {
      const response = await api.get("/products/best-seller");
      const bestSeller = response.data.data.bestSellers[0];
      setBestSellerError(null);
      setBestSeller(bestSeller);
    } catch (error) {
      setBestSellerError(error.message);
      console.error("Error fetching best seller products:", error);
    } finally {
      setBestSellerLoading(false);
    }
  };
  useEffect(() => {
    dispatch(fetchProductsByFilters({ sortBy: "popularity", limit: 8 }));
    fetchBestSeller();
  }, [dispatch]);

  const renderBestSeller = () => {
    if (bestSellerLoading) {
      return <ProductDetailsSkeleton />;
    }

    if (bestSellerError) {
      return <Error message={bestSellerError} onRetry={fetchBestSeller}/>;
    }

    if (bestSeller) {
      return <ProductDetails productId={bestSeller._id} />;
    }

    return null;
  };

  return (
    <div>
      <Hero />
      {/* <CategoryCollectionSection /> */}
      <NewArrivals />
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>;
      {renderBestSeller()}
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">Top Products</h2>
        <ProductGrid
          products={products}
          loading={productsLoading}
          error={productsError}
        />
      </div>
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;

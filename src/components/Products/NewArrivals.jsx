import React, { useEffect, useState, useCallback } from "react";
import api from "../../api/api";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "./ProductsGrid/ProductCard.jsx";
import SkeletonCard from "./ProductsGrid/SkeletonCard.jsx";

import { FiAlertTriangle } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import Error from "../Common/Error.jsx";

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNewArrivals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/products/new-arrivals");
      setNewArrivals(response.data.data.newArrivals);
    } catch (err) {
      setError("Failed to load new products.");
      console.error("Error fetching new arrivals:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNewArrivals();
  }, [fetchNewArrivals]);

  const renderContent = () => {
    if (loading) {
      return Array.from({ length: 4 }).map((_, index) => (
        <SwiperSlide key={index}>
          <SkeletonCard />
        </SwiperSlide>
      ));
    }

    if (error) {
      return <Error message={error} onRetry={fetchNewArrivals} />;
    }

    return newArrivals.map((product) => (
      <SwiperSlide key={product._id}>
        <ProductCard product={product} />
      </SwiperSlide>
    ));
  };

  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Explore New Arrivals
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Discover our latest collection of unique, high-quality 3D printed
            items.
          </p>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={15}
          slidesPerView={1.2}
          navigation={true}
          loop={false}
          breakpoints={{
            640: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
          }}
          className="mySwiper"
        >
          {renderContent()}
        </Swiper>
      </div>
    </section>
  );
};

export default NewArrivals;

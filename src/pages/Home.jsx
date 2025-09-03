import React from "react";
import Hero from "../components/Layout/Hero";
import CategoryCollectionSection from "../components/Products/CategoryCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";

const placeholderProducts = [
  {
    id: 1,
    name: "product",
    price: 20,
    images: [
      {
        url: "https://wallpapers.com/images/high/teal-flower-uyyxk7fcfcqlibja.webp",
      },
    ],
  },
  {
    id: 2,
    name: "product",
    price: 20,
    images: [
      {
        url: "https://wallpapers.com/images/high/teal-flower-uyyxk7fcfcqlibja.webp",
      },
    ],
  },
  {
    id: 3,
    name: "product",
    price: 20,
    images: [
      {
        url: "https://wallpapers.com/images/high/teal-flower-uyyxk7fcfcqlibja.webp",
      },
    ],
  },
  {
    id: 4,
    name: "product",
    price: 20,
    images: [
      {
        url: "https://wallpapers.com/images/high/teal-flower-uyyxk7fcfcqlibja.webp",
      },
    ],
  },
  {
    id: 5,
    name: "product",
    price: 20,
    images: [
      {
        url: "https://wallpapers.com/images/high/teal-flower-uyyxk7fcfcqlibja.webp",
      },
    ],
  },
  {
    id: 6,
    name: "product",
    price: 20,
    images: [
      {
        url: "https://wallpapers.com/images/high/teal-flower-uyyxk7fcfcqlibja.webp",
      },
    ],
  },
  {
    id: 7,
    name: "product",
    price: 20,
    images: [
      {
        url: "https://wallpapers.com/images/high/teal-flower-uyyxk7fcfcqlibja.webp",
      },
    ],
  },
  {
    id: 8,
    name: "product",
    price: 20,
    images: [
      {
        url: "https://wallpapers.com/images/high/teal-flower-uyyxk7fcfcqlibja.webp",
      },
    ],
  },
];

const Home = () => {
  return (
    <div>
      <Hero />
      <CategoryCollectionSection />
      <NewArrivals />

      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      <ProductDetails />

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">Top Products</h2>
        <ProductGrid products={placeholderProducts} />
      </div>

      <FeaturedCollection />

      <FeaturesSection />
    </div>
  );
};

export default Home;

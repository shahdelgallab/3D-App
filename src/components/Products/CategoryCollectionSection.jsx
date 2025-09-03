import React from "react";
import { Link } from "react-router-dom";

const CategoryCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/*Category */}
        <div className="relative flex-1">
          <img
            src="https://wallpapers.com/images/high/teal-flower-uyyxk7fcfcqlibja.webp"
            alt=""
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white/90 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Category</h2>
            <Link
              to="collection/all?category=a"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/*Category */}
        <div className="relative flex-1">
          <img
            src="https://wallpapers.com/images/high/teal-flower-uyyxk7fcfcqlibja.webp"
            alt=""
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white/90 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Category</h2>
            <Link
              to="collection/all?category=a"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryCollectionSection;

import React from 'react';
import { Link } from 'react-router-dom';
import HeroImage from '../../assets/hero-3d-printing.jpg'

const FeaturedCollection = ({
  subtitle = "Featured Collection",
  title = "Discover Our Unique Creations",
  description = "Explore our latest collection of high-quality, custom-designed 3D printed items. Each piece is crafted with precision and creativity.",
  buttonText = "Shop Now",
  buttonLink = "/collections",
  imageUrl = HeroImage,
  imageAlt = "Abstract 3D printed object",
  reverseLayout = false,
}) => {
  return (
    <section className="py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${reverseLayout ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center bg-slate-100 rounded-2xl shadow-lg overflow-hidden`}>
          {/* Left Content: Text */}
          <div className="lg:w-1/2 p-8 sm:p-12 text-center lg:text-left">
            <h3 className="text-base font-semibold text-blue-600 tracking-wider uppercase">
              {subtitle}
            </h3>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              {title}
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              {description}
            </p>
            <Link
              to={buttonLink}
              className="mt-8 inline-block bg-gray-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
            >
              {buttonText}
            </Link>
          </div>

          {/* Right Content: Image */}
          <div className="lg:w-1/2 h-80 lg:h-auto">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;  
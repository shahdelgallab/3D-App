import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const { categories } = useSelector((state) => state.categories);

  const midpoint = Math.ceil(categories.length / 2);
  const firstColumn = categories.slice(0, midpoint);
  const secondColumn = categories.slice(midpoint);

  return (
    <footer className="border-t border-gray-200 py-12 bg-white">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between gap-8 px-4 text-center md:text-left">
        {/* Newsletter Section  */}
        {
        <div className="md:w-1/4 px-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Newsletter
          </h3>
          <p className="text-gray-500 mb-4">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800"
            >
              Subscribe
            </button>
          </form>
        </div> 
        }

        <div className="md:w-1/2 px-8">
          {" "}
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <ul className="space-y-2 text-gray-600">
              {firstColumn.map((category) => (
                <li key={category}>
                  <Link
                    to={`/collections?category=${category}`}
                    className="hover:text-gray-900 transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="space-y-2 text-gray-600">
              {secondColumn.map((category) => (
                <li key={category}>
                  <Link
                    to={`/collections?category=${category}`}
                    className="hover:text-gray-900 transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:w-1/4 px-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-900">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-900">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-900">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:w-1/4 px-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Follow Us
          </h3>
          <div className="flex items-center justify-center md:justify-start space-x-4 mb-6">
            <a href="#" className="hover:text-gray-500">
              <TbBrandMeta size={20} />
            </a>
            <a href="#" className="hover:text-gray-500">
              <IoLogoInstagram size={20} />
            </a>
            <a href="#" className="hover:text-gray-500">
              <RiTwitterXLine size={20} />
            </a>
          </div>
          <p className="text-gray-500">Call Us</p>
          <p className="font-semibold text-gray-700">
            <FiPhoneCall className="inline-block mr-2" />
            0123-456-789
          </p>
        </div>
      </div>

      <div className="container mx-auto mt-12 px-4 border-t border-gray-200 pt-6">
        <p className="text-gray-500 text-sm text-center">
          © 2025, 3D App, All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

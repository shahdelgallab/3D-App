import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";

const CollectionsPage = () => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    //close sidebar when clicking outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    //add eventlistent for clicks
    document.addEventListener("mousedown", handleClickOutside);

    //clean event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
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
      setProducts(fetchedProducts);
    }, 1000);
  }, []);
  return (
    <div className="flex flex-col lg:flex-row">
      {/*mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border border-gray-200 p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" />
        Filters
      </button>

      {/*filter sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All collections</h2>
        {/*sort options */}
        <SortOptions />

        {/*product grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionsPage;

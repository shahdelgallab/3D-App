import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProductsByFilters } from "../redux/slice/productsSlice";

import ProductGrid from "../components/Products/ProductsGrid/ProductGrid";
import Pagination from "../components/Common/Pagination";
import SortOptions from "../components/Products/SortOptions";
import { X } from "lucide-react";

const CollectionsPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { categories } = useSelector((state) => state.categories);

  const { products, productsLoading, productsError, totalPages } = useSelector(
    (state) => state.products
  );

  const activeCategory = searchParams.get("category") || "All";
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchTerm = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "newest";

  useEffect(() => {
    let filters = { limit: 12 };
    if (currentPage) filters.page = currentPage;
    if (activeCategory && activeCategory !== "All")
      filters.category = activeCategory;
    if (searchTerm) filters.search = searchTerm;
    if (sortBy) filters.sortBy = sortBy;

    dispatch(fetchProductsByFilters(filters));
  }, [dispatch, searchParams]);

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      prev.set("page", String(newPage));
      return prev;
    });
  };

  const handleCategoryChange = (category) => {
    setSearchParams((prev) => {
      if (category === "All") {
        prev.delete("category");
      } else {
        prev.set("category", category);
      }
      prev.set("page", "1");
      return prev;
    });
  };

  const handleSortChange = (newSortBy) => {
    setSearchParams((prev) => {
      if (newSortBy) {
        prev.set("sortBy", newSortBy);
      } else {
        prev.delete("sortBy");
      }
      prev.set("page", "1");
      return prev;
    });
  };

  const handleClearSearch = () => {
    setSearchParams((prev) => {
      prev.delete("search");
      return prev;
    });
  };

  return (
    <main className="container mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {searchTerm ? `Results for "${searchTerm}"` : "Our Collections"}
          </h1>

          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="p-1 rounded-full hover:bg-gray-200"
              title="Clear search"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-center flex-wrap gap-2 sm:gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-gray-900 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex justify-end mb-6">
        <SortOptions onSortChange={handleSortChange} />
      </div>

      <div>
        <ProductGrid
          products={products}
          loading={productsLoading}
          error={productsError}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default CollectionsPage;


import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null; // Don't show pagination if there's only one page
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="flex items-center justify-center space-x-4 mt-12">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="p-2 rounded-md border bg-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiChevronLeft />
      </button>

      <span className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md border bg-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiChevronRight />
      </button>
    </nav>
  );
};

export default Pagination;
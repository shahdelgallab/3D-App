import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();

    if (location.pathname === "/collections") {
      setSearchParams((prev) => {
        if (trimmedSearchTerm) {
          prev.set("search", trimmedSearchTerm);
        } else {
          prev.delete("search");
        }
        prev.set("page", "1");
        return prev;
      });
    } else {
      navigate(`/collections?search=${encodeURIComponent(trimmedSearchTerm)}`);
    }
  };

  return (
    <div ref={containerRef} className="relative flex items-center">
      <form onSubmit={handleSearch} className="relative">
        {/* Search Icon inside the input */}
        <motion.div
          layout
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        >
          <Search size={20} />
        </motion.div>

        {/* The Input Field */}
        <motion.input
          ref={inputRef}
          layout
          initial={{ width: "40px" }}
          animate={{ width: isOpen ? "250px" : "40px" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onFocus={() => setIsOpen(true)}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-10 rounded-full bg-gray-100 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
        />

        {/* Clear (X) Button */}
        <AnimatePresence>
          {searchTerm && isOpen && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
              aria-label="Clear search"
            >
              <X size={18} />
            </motion.button>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default SearchBar;

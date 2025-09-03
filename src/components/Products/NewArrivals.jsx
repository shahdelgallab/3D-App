import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [scrollRight, setScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const newArrivals = [
    {
      id: "1",
      name: "product",
      price: 33,
      images: [
        {
          url: "https://wallpapers.com/images/high/teal-flower-uyyxk7fcfcqlibja.webp",
          altText: "product",
        },
      ],
    },
    {
      id: "2",
      name: "product",
      price: 33,
      images: [
        {
          url: "https://wallpapers.com/images/high/teal-flower-uyyxk7fcfcqlibja.webp",
          altText: "product",
        },
      ],
    },
    {
      id: "3",
      name: "product",
      price: 33,
      images: [
        {
          url: "https://wallpapers.com/images/high/teal-flower-uyyxk7fcfcqlibja.webp",
          altText: "product",
        },
      ],
    },
    {
      id: "4",
      name: "product",
      price: 33,
      images: [
        {
          url: "https://wallpapers.com/images/high/teal-flower-uyyxk7fcfcqlibja.webp",
          altText: "product",
        },
      ],
    },
    {
      id: "5",
      name: "product",
      price: 33,
      images: [
        {
          url: "https://wallpapers.com/images/high/teal-flower-uyyxk7fcfcqlibja.webp",
          altText: "product",
        },
      ],
    },
    {
      id: "6",
      name: "product",
      price: 33,
      images: [
        {
          url: "https://wallpapers.com/images/high/teal-flower-uyyxk7fcfcqlibja.webp",
          altText: "product",
        },
      ],
    },
    {
      id: "7",
      name: "product",
      price: 33,
      images: [
        {
          url: "https://wallpapers.com/images/high/teal-flower-uyyxk7fcfcqlibja.webp",
          altText: "product",
        },
      ],
    },
    {
      id: "8",
      name: "product",
      price: 33,
      images: [
        {
          url: "https://wallpapers.com/images/high/teal-flower-uyyxk7fcfcqlibja.webp",
          altText: "product",
        },
      ],
    },
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;

    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  //update scroll buttons
  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, []);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
          excepturi?
        </p>

        {/*scroll buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border  border-gray-200 ${
              canScrollLeft
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`p-2 rounded border border-gray-200 ${
              canScrollRight
                ? "bg-white text-black "
                : "bg-gray-200 text-gray-400"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/*scrollable content */}
      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUpOrLeave}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {newArrivals.map((product) => (
          <div
            key={product.id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
          >
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="w-full h-[500px] object-cover rounded-lg"
              draggable="false"
            />
            <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${product.id}`} className="block">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;

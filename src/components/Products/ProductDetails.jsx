import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const selectProduct = {
  name: "product",
  price: 20,
  originalPrice: 10,
  description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  brand: "xxxxx",
  material: "xxxx",
  sizes: ["S", "M", "L"],
  colors: ["Red", "Black"],
  images: [
    {
      url: "https://wallpapers.com/images/high/teal-flower-uyyxk7fcfcqlibja.webp",
      altText: "product",
    },
    {
      url: "https://4kwallpapers.com/images/walls/thumbs_3t/23766.png",
      altText: "product",
    },
  ],
};

const similarProducts = [
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
];

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (selectProduct?.images?.length > 0) {
      setMainImage(selectProduct.images[0].url);
    }
  }, [selectProduct]);

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color before adding to cart.", {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabled(true);

    setTimeout(() => {
      toast.success("Product added to cart", {
        duration: 1000,
      });
      setIsButtonDisabled(false);
    }, 500);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/*left thumbnail */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectProduct.images.map((image, index) => (
              <img
                src={image.url}
                alt={image.altText || `$thumnail{index}`}
                key={index}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/*main image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt=""
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
          {/*mobile thumnail */}
          <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
            {selectProduct.images.map((image, index) => (
              <img
                src={image.url}
                alt={image.altText || `$thumnail{index}`}
                key={index}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/*right side */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectProduct.name}
            </h1>

            <p className="text-lg text-gray-600 line-through">
              {selectProduct.originalPrice && `${selectProduct.originalPrice}`}
            </p>
            <p className="text-xl text-gray-500 mb-2">${selectProduct.price}</p>
            <p className="text-gray-600 mb-4">{selectProduct.description}</p>

            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor === color
                        ? "border-4 border-black"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: color.toLocaleLowerCase(),
                      filter: "brightness(0.5)",
                    }}
                  ></button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border border-gray-200 ${
                      selectedSize === size ? "bg-black text-white" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                  onClick={() => handleQuantityChange("minus")}
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                  onClick={() => handleQuantityChange("plus")}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${
                isButtonDisabled
                  ? "cursor-not-allowed bg-black/50"
                  : "hover:bg-gray-900"
              }`}
            >
              {isButtonDisabled ? "Adding..." : "Add To Cart"}
            </button>

            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">
            You May Also Like
          </h2>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

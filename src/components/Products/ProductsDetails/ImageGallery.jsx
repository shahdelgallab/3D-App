import React, { useState, useEffect } from 'react';

const ImageGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    if (images.length > 0) {
      setMainImage(images[0]);
    }
  }, [images]);

  if (images.length === 0) {
    return <img src="/placeholder-image.jpg" alt="Placeholder" className="w-full h-auto object-cover rounded-lg" />;
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
        {images.map((image, index) => (
          <img
            src={image}
            alt={`Thumbnail ${index + 1}`}
            key={index}
            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${
              mainImage === image ? "border-blue-500" : "border-gray-200"
            }`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
      <div className="flex-1">
        <img
          src={mainImage}
          alt="Main product"
          className="w-full h-auto max-h-[550px] object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImageGallery;
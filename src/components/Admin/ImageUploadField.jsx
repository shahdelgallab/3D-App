import React, { useState } from 'react';
import api from '../../api/api';
import { toast } from 'sonner';
import { Upload, X, Loader2 } from 'lucide-react';

const ImageUploadField = ({ images, setFormData }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setIsUploading(true);

    try {
      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, response.data.url]
      }));
      toast.success('Image uploaded successfully.');
    } catch (error) {
      toast.error('Image upload failed.');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (urlToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(url => url !== urlToRemove)
    }));
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Images</label>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {images.map((url, index) => (
          <div key={index} className="relative group">
            <img src={url} alt={`Product image ${index + 1}`} className="w-24 h-24 object-cover rounded-md border" />
            <button
              type="button"
              onClick={() => handleRemoveImage(url)}
              className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        
        <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50">
          {isUploading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Upload size={24} className="text-gray-400" />
              <span className="text-xs text-gray-500 mt-1">Add Image</span>
            </>
          )}
          <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
        </label>
      </div>
    </div>
  );
};

export default ImageUploadField;
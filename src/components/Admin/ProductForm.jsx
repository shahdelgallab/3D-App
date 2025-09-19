import React, { useState, useEffect } from 'react';
import ImageUploadField from './ImageUploadField';

const ProductForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    images: [],
    tags: [],
    dimensions: {
        length: 0,
        width: 0,
        height: 0,
    },
    weight: 0,
    isPublished: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || 0,
        category: initialData.category || '',
        images: initialData.images || [],
        tags: initialData.tags || [],
        dimensions: initialData.dimensions || { length: 0, width: 0, height: 0 },
        weight: initialData.weight || 0,
        isPublished: initialData.isPublished || false,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        dimensions: {
            ...prev.dimensions,
            [name]: value
        }
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" required />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" required />
      </div>
      
      <ImageUploadField images={formData.images} setFormData={setFormData} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" required step="0.01" />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" required />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium">Tags (comma separated)</label>
        <input 
            type="text" 
            name="tags" 
            value={formData.tags.join(', ')} 
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()) }))}
            className="mt-1 w-full p-2 border rounded-md" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Dimensions (cm)</label>
        <div className="grid grid-cols-3 gap-4">
            <div>
                <label className="text-xs">Length</label>
                <input type="number" name="length" value={formData.dimensions.length} onChange={handleDimensionChange} className="mt-1 w-full p-2 border rounded-md" step="0.1" />
            </div>
            <div>
                <label className="text-xs">Width</label>
                <input type="number" name="width" value={formData.dimensions.width} onChange={handleDimensionChange} className="mt-1 w-full p-2 border rounded-md" step="0.1" />
            </div>
            <div>
                <label className="text-xs">Height</label>
                <input type="number" name="height" value={formData.dimensions.height} onChange={handleDimensionChange} className="mt-1 w-full p-2 border rounded-md" step="0.1" />
            </div>
        </div>
      </div>

       <div>
          <label className="block text-sm font-medium">Weight (g)</label>
          <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" step="0.1" />
        </div>

      <div className="flex items-center">
        <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} className="h-4 w-4 rounded" />
        <label className="ml-2 text-sm">Publish this product</label>
      </div>
      
      <div className="flex justify-end gap-4 pt-4 sticky bottom-0 bg-white">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-blue-300">
          {loading ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from '@headlessui/react';
import { toast } from 'sonner';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../redux/slice/productsAdminSlice';

import ProductForm from './ProductForm';
import Error from '../Common/Error';
import ProductTableSkeleton from './ProductTableSkeleton'; // ✅ 1. Import the skeleton
import { Plus, Edit, Trash2 } from 'lucide-react';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.productsAdmin);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id))
        .unwrap()
        .then(() => toast.success('Product deleted.'))
        .catch((err) => toast.error(err.message || 'Failed to delete product.'));
    }
  };

  const handleFormSubmit = (productData) => {
    const action = editingProduct
      ? updateProduct({ id: editingProduct._id, productData })
      : createProduct(productData);

    dispatch(action)
      .unwrap()
      .then(() => {
        toast.success(`Product ${editingProduct ? 'updated' : 'created'} successfully!`);
        setIsModalOpen(false);
      })
      .catch((err) => toast.error(err.message || 'Failed to save product.'));
  };

  const renderContent = () => {
    // ✅ 2. Handle the loading state
    if (loading && products.length === 0) {
      return <ProductTableSkeleton />;
    }
    
    // ✅ 3. Handle the error state
    if (error) {
      return <Error message={error} onRetry={() => dispatch(fetchProducts())} />;
    }

    // Success / Empty state
    return (
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan="5" className="p-6 text-center text-gray-500">No products found.</td></tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">${product.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${product.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {product.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => handleOpenEditModal(product)} className="text-blue-600 hover:text-blue-800"><Edit size={18}/></button>
                    <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-800"><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <button onClick={handleOpenCreateModal} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus size={18} className="mr-2" />
          Add Product
        </button>
      </div>

      {renderContent()}

      {/* Create/Edit Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg bg-white rounded-lg p-6">
            <Dialog.Title className="text-xl font-semibold mb-4">
              {editingProduct ? 'Edit Product' : 'Create New Product'}
            </Dialog.Title>
            <ProductForm
              initialData={editingProduct}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsModalOpen(false)}
              loading={loading}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductManagement;